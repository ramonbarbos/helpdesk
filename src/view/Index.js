import { StatusBar } from 'expo-status-bar';
import { FontAwesome, Entypo, MaterialIcons } from '@expo/vector-icons';
import { Box, Text, Center, Input, Heading, FormControl, VStack, Icon, Button, Checkbox, HStack, Image, Pressable, Stack, FlatList } from "native-base";

import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';


export default function Index() {
  const navigation = useNavigation();
  const [aberto, setAberto] = useState([]);
  const [fechado, setFechado] = useState([]);
  const [chamadosAbertos, setChamadosAbertos] = useState(true); // Estado para controlar a exibição de chamados abertos ou fechados
  const fetchAberto = async () => {
    const url = `http://10.0.0.120/apiHelpdesk/chamado/aberto`;
    try {
      const response = await fetch(url);
      const responseData = await response.json();

      if (responseData && responseData.resposta) {
        setAberto(responseData.resposta);
       
        
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchFechado = async () => {
    const url = `http://10.0.0.120/apiHelpdesk/chamado/fechado`;
    try {
      const response = await fetch(url);
      const responseData = await response.json();

      if (responseData && responseData.resposta) {
        setFechado(responseData.resposta);
      }else{
        console.log('sem registro')
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChamadosPress = () => {
    console.log('Visualizar Chamados');
  };

  const handleFloatingButtonPress = () => {
    console.log('Criar Chamado');
    navigation.navigate("Novo Chamado");
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

  const renderUserItem = ({ item }) => (
    <Box>
      <Pressable mt={2} onPress={() => handleChamadosPress()}>
        {({ isHovered, isFocused, isPressed }) => (
          <Box w={'full'} h={20} borderColor="black" borderRadius={15} bg={isPressed ? '#fff' : isHovered ? '#fff' : '#fff'} style={{ transform: [{ scale: isPressed ? 0.96 : 1 }] }}>
           
           
           
                <HStack h={'full'} borderTopLeftRadius={15} borderBottomLeftRadius={15}>
            <Box h={'full'} w={2} bg={chamadosAbertos ? '#04B2D9' : '#CF0620'} borderTopLeftRadius={15} borderBottomLeftRadius={15}></Box>
              <VStack p={2}>
                <Heading size={'sm'}>{item.id}</Heading>
                <Heading size={'sm'}>{item.titulo}</Heading>
                <Text size={'sm'}>{item.descricao.substring(0, 42)}...</Text>
              </VStack>
            </HStack>
          
           
          </Box>
        )}
      </Pressable>
    </Box>
  );

  return (
    <Box w={'full'} p={6}>
      <HStack h={'20%'} mt={4} alignItems={'center'} justifyContent={'space-between'}>
        <VStack>
          <Heading>Helpdesk</Heading>
          <Text>Registre o chamado!</Text>
        </VStack>
        <FontAwesome name="user-circle" size={35} color="black" />
      </HStack>

      <Stack h={'20%'} justifyContent={'center'} alignItems={'center'}>
        <HStack>
          <Pressable onPress={() => handleOpenPress()}>
            {({ isHovered, isFocused, isPressed }) => (
              <Box bg={'#04B2D9'} w={140} h={9} style={{ transform: [{ scale: isPressed ? 0.96 : 1 }] }} borderTopLeftRadius={10} borderBottomLeftRadius={10} justifyContent={'center'} alignItems={'center'}>
                <Heading size={'sm'} color={'white'}>Abertos</Heading>
              </Box>
            )}
          </Pressable>
          <Pressable onPress={() => handleClosePress()}>
            {({ isHovered, isFocused, isPressed }) => (
              <Box bg={'#CF0620'} style={{ transform: [{ scale: isPressed ? 0.96 : 1 }] }} w={140} h={9} borderTopRightRadius={10} borderBottomRightRadius={10} justifyContent={'center'} alignItems={'center'}>
                <Heading size={'sm'} color={'white'}>Fechados</Heading>
              </Box>
            )}
          </Pressable>
        </HStack>
      </Stack>

      <Stack h={'60%'}>
        <HStack justifyContent={'space-between'} w={'full'}>
          <Heading size={'sm'}>Chamados</Heading>
          <Heading size={'sm'}>0</Heading>
        </HStack>
        <FlatList
          data={chamadosAbertos ? aberto : fechado} // Exibe a lista de chamados abertos ou fechados de acordo com o estado
          renderItem={renderUserItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </Stack>

      <Pressable
        position="absolute"
        bottom={6}
        right={6}
        zIndex={10}
        onPress={handleFloatingButtonPress}
      >
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
    </Box>
  );
}
