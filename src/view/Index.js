import { StatusBar } from 'expo-status-bar';
import { FontAwesome , Entypo, MaterialIcons } from '@expo/vector-icons';
import {  Box, Text,Center, Input, Heading, FormControl, VStack, Icon,Button, Checkbox, HStack,Image, Stack} from "native-base";

export default function Index() {
  return (
     <Box w={'full'} p={6} >

       <HStack h={'20%'}  bg={'blue.100'} alignItems={'center'} justifyContent={'space-between'} >
        <VStack>
          <Heading>Helpdesk</Heading>
          <Text>Registre o chamado!</Text>
        </VStack>
        <FontAwesome name="user-circle" size={35} color="black" />
      </HStack>

      <Stack h={'20%'}  bg={'blue.200'} justifyContent={'center'} alignItems={'center'} >
        <HStack>
          <Box bg={'#04B2D9'} w={140} h={9} borderTopLeftRadius={10} borderBottomLeftRadius={10} justifyContent={'center'} alignItems={'center'}>
            <Text color={'white'}>Abertos</Text>
          </Box>
          <Box bg={'#CF0620'} w={140} h={9} borderTopRightRadius={10} borderBottomRightRadius={10} justifyContent={'center'} alignItems={'center'}>
            <Text color={'white'}>Fechados</Text>
          </Box>
        </HStack>
       
      </Stack>

      <Stack h={'60%'}  bg={'blue.300'}  >
        <HStack justifyContent={'space-between'} w={'full'}>
          <Heading size={'sm'}>Chamados</Heading>
          <Heading size={'sm'}>0</Heading>
        </HStack>
       
       <Box   w={'full'} h={20} >
          <HStack h={'full'} bg={'light.100'} borderTopLeftRadius={15} borderBottomLeftRadius={15}>
            <Box h={'full'} w={2} bg={'#04B2D9'} borderTopLeftRadius={15} borderBottomLeftRadius={15}></Box>
           <VStack p={2}>
              <Heading size={'sm'}>#1</Heading>
              <Heading size={'sm'}>Ficha financeira em branco</Heading>
              <Text size={'sm'}>Ao gerar a ficha financeiro da matricula...</Text>
           </VStack>

              
          </HStack>
       </Box>

      </Stack>

    </Box>
  );
}

