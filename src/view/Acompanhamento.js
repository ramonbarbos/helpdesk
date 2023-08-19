import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Box, Center, Text, Input, Heading, FormControl, VStack, Icon, Button, Select, CheckIcon, TextArea, HStack, Stack } from "native-base";
import { Ionicons } from '@expo/vector-icons';

const Acompanhamento = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [chamado, setChamado] = useState(null);

  const { id } = route.params;

  const fetchChamado = async () => {
    const url = `http://10.0.0.120/apiHelpdesk/chamado/listar/${id}`;

    try {
      const response = await fetch(url);
      const responseData = await response.json();

      if (responseData.tipo === 'sucesso') {
        setChamado(responseData.resposta);
      } else if (responseData.tipo === 'erro') {
        console.log('sem registro');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchChamado();
  }, []);

  return (
    <Box height="full" justifyContent={'space-between'} >
      <VStack h={'85%'}>
        <Stack w={'100%'} p={2} bg={'white'} alignItems={'center'}>
          <Text>Chamado: {id}</Text>
        </Stack>

        {chamado && (
          <Box bg="blue.100" p={2} m={2} alignSelf="flex-end" borderRadius={10}>
            <VStack>
              <Box>
                <Heading color="black">
                {chamado.nome_usuario}
                </Heading>
              </Box>

              <Box>
                <Text color="black">
                  {chamado.descricao}
                </Text>
              </Box>
            </VStack>
          </Box>
        )}
      </VStack>

      <HStack h={'15%'} p={3} bg={'white'}>
        <TextArea h={20} placeholder="Digite sua interação..." w="80%" />
        <Box w="20%" justifyContent={'center'} alignItems={'center'}>
          <Button borderRadius={50}>
            <Ionicons name="send" size={24} color="white" />
          </Button>
        </Box>
      </HStack>
    </Box>
  );
};

export default Acompanhamento;
