import { StatusBar } from 'expo-status-bar';
import { FontAwesome, Entypo, MaterialIcons } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Box, Text,  Heading, VStack, Icon, Button,  HStack,Pressable, Stack, FlatList, Modal } from 'native-base';

export default function Index() {
  const navigation = useNavigation();
  const [aberto, setAberto] = useState([]);
  const [fechado, setFechado] = useState([]);
  const [chamadosAbertos, setChamadosAbertos] = useState(true);
  const [quantidadeChamados, setQuantidadeChamados] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [chamadoSelecionado, setChamadoSelecionado] = useState(null);
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const fetchAberto = async () => {
    const url = 'http://10.0.0.120/apiHelpdesk/chamado/aberto';
    try {
      const response = await fetch(url);
      const responseData = await response.json();

      if (responseData && responseData.resposta) {
        if (responseData.tipo === 'sucesso') {
          setAberto(responseData.resposta);
        } else if (responseData.tipo === 'erro') {
          console.log('sem registro');
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchFechado = async () => {
    const url = 'http://10.0.0.120/apiHelpdesk/chamado/fechado';
    try {
      const response = await fetch(url);
      const responseData = await response.json();

      if (responseData.tipo === 'sucesso') {
        setFechado(responseData.resposta);
      } else if (responseData.tipo === 'erro') {
        console.log('sem registro');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChamadosPress = (chamado) => {
    setChamadoSelecionado(chamado);
    setModalVisible(true);
    console.log('Visualizar Chamados');
  };

  const handleFloatingButtonPress = () => {
    console.log('Criar Chamado');
    navigation.navigate('Novo Chamado');
  };

  const handleOpenPress = () => {
    setChamadosAbertos(true); // Atualiza o estado para exibir chamados abertos
  };

  const handleClosePress = () => {
    setChamadosAbertos(false); // Atualiza o estado para exibir chamados fechados
  };

  useEffect(() => {
    if (chamadosAbertos) {
      fetchAberto();
    } else {
      fetchFechado();
    }

    const intervalId = setInterval(() => {
      if (chamadosAbertos) {
        fetchAberto();
      } else {
        fetchFechado();
      }
    }, 5000);

    return () => clearInterval(intervalId);
  }, [chamadosAbertos]);

  useEffect(() => {
    // Atualiza a quantidade de chamados com base no estado aberto ou fechado
    const quantidade = chamadosAbertos ? aberto.length : fechado.length;
    setQuantidadeChamados(quantidade);
  }, [aberto, fechado, chamadosAbertos]);

  const renderUserItem = ({ item }) => (
    <Box>
      <Pressable mt={2} onPress={() => handleChamadosPress(item)}>
        {({ isHovered, isFocused, isPressed }) => (
          <Box
            w="full"
            h={20}
            borderColor="black"
            borderRadius={15}
            bg={isPressed || isHovered ? '#fff' : '#fff'}
            style={{ transform: [{ scale: isPressed ? 0.96 : 1 }] }}
          >
            <HStack h="full" borderTopLeftRadius={15} borderBottomLeftRadius={15}>
              <Box
                h="full"
                w={2}
                bg={chamadosAbertos ? '#04B2D9' : '#CF0620'}
                borderTopLeftRadius={15}
                borderBottomLeftRadius={15}
              ></Box>
              <VStack p={2}>
                <Heading size="sm">#{item.id}</Heading>
                <Heading size="sm">{item.titulo}</Heading>
                <Text size="sm">{item.descricao.substring(0, 42)}...</Text>
              </VStack>
            </HStack>
          </Box>
        )}
      </Pressable>
    </Box>
  );

  return (
    <Box w="full" p={6}>
      <HStack h="20%" mt={4} alignItems="center" justifyContent="space-between">
        <VStack>
          <Heading>Helpdesk</Heading>
          <Text>Registre o chamado!</Text>
        </VStack>
        <FontAwesome name="user-circle" size={35} color="black" />
      </HStack>

      <Stack h="20%" justifyContent="center" alignItems="center">
        <HStack>
          <Pressable onPress={handleOpenPress}>
            {({ isHovered, isFocused, isPressed }) => (
              <Box
                bg="#04B2D9"
                w={140}
                h={9}
                style={{ transform: [{ scale: isPressed ? 0.96 : 1 }] }}
                borderTopLeftRadius={10}
                borderBottomLeftRadius={10}
                justifyContent="center"
                alignItems="center"
              >
                <Heading size="sm" color="white">
                  Abertos
                </Heading>
              </Box>
            )}
          </Pressable>
          <Pressable onPress={handleClosePress}>
            {({ isHovered, isFocused, isPressed }) => (
              <Box
                bg="#CF0620"
                style={{ transform: [{ scale: isPressed ? 0.96 : 1 }] }}
                w={140}
                h={9}
                borderTopRightRadius={10}
                borderBottomRightRadius={10}
                justifyContent="center"
                alignItems="center"
              >
                <Heading size="sm" color="white">
                  Fechados
                </Heading>
              </Box>
            )}
          </Pressable>
        </HStack>
      </Stack>

      <Stack h="60%">
        <HStack justifyContent="space-between" w="full">
          <Heading size="sm">Chamados</Heading>
          <Heading size="sm">N°{quantidadeChamados}</Heading>
        </HStack>

        <Box mt={4} mb={9}>
          <FlatList
            data={chamadosAbertos ? aberto : fechado} // Exibe a lista de chamados abertos ou fechados de acordo com o estado
            renderItem={renderUserItem}
            keyExtractor={(item) => item.id.toString()}
          />
        </Box>
      </Stack>

      <Pressable position="absolute" bottom={6} right={6} zIndex={10} onPress={handleFloatingButtonPress}>
        {({ isPressed, isHovered }) => (
          <Box
            bg={isPressed || isHovered ? '#04B2F8' : '#04B2D9'}
            borderRadius="full"
            p={3}
            style={{ transform: [{ scale: isPressed ? 0.96 : 1 }] }}
          >
            <Icon as={MaterialIcons} name="add" color="white" size={6} />
          </Box>
        )}
      </Pressable>

      <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)} initialFocusRef={initialRef} finalFocusRef={finalRef}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Opções</Modal.Header>
          <Modal.Body>
            {chamadoSelecionado && (
              <>
                <Button  onPress={() => console.log('Detalhes')}>Detalhes</Button>
                <Button mt={1} onPress={() => console.log('Acompanhamento')}>Acompanhamento</Button>
                <Button mt={1} onPress={() => console.log('Fechar Chamado')}>Fechar</Button>
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button onPress={() => setModalVisible(false)}>Sair</Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Box>
  );
}
