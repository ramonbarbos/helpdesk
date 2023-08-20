import React, { useState, useEffect } from 'react';
import { Text, VStack, Box } from 'native-base';

const ChatMessages = ({ id }) => {
  const [mensagensEnviadas, setMensagensEnviadas] = useState([]);

  const fetchListarMensagem = async () => {
    const url = `http://10.0.0.120/apiHelpdesk/acompanhamento/mensagem/${id}`;

    try {
      const response = await fetch(url);
      const responseData = await response.json();

      if (responseData.tipo === 'sucesso') {
        setMensagensEnviadas([...mensagensEnviadas, ...responseData.resposta.map(item => ({ message: item.mensagem, sender: 'other' }))]);
      } else if (responseData.tipo === 'erro') {
        console.log('sem registro');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchListarMensagem();
  }, []);

  return (
    <VStack>
      {mensagensEnviadas.map((mensagem, index) => (
        <Box key={index} bg={mensagem.sender === 'user' ? 'green.100' : 'blue.100'} p={2} m={2} alignSelf={mensagem.sender === 'user' ? 'flex-end' : 'flex-start'} borderRadius={10}>
          <Text color="black">
            {mensagem.message}
          </Text>
        </Box>
      ))}
    </VStack>
  );
};

export default ChatMessages;
