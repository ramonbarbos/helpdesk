import React, { useState, useEffect } from 'react';
import { Text, VStack, Box,Center, HStack, Divider } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Perfil = () => {
 
  return (
    <Center>
      
        <Box >
          <Text color="black">
            Foto de Perfil | Nome | Cargo
          </Text>
          <Box alignItems={'center'} w={'100%'}>

         
            <VStack >
                <Divider  bg={'black'} />
                  <TouchableOpacity>
                    <Box w={'100%'} h={55} bg={'amber.50'}  justifyContent={'center'}>
                      <Text ><FontAwesome5  name="user-edit" size={24} color="black" />  Alterar foto Perfil </Text>
                    </Box>
                  </TouchableOpacity>
                  <Divider  bg={'black'} />
                  <TouchableOpacity>
                    <Box w={'100%'} h={55} bg={'amber.50'}  justifyContent={'center'}>
                      <Text><MaterialCommunityIcons name="theme-light-dark" size={24} color="black" /> Tema</Text>
                    </Box>
                  </TouchableOpacity>
                  <Divider  bg={'black'} />
            </VStack>
          </Box>
        </Box>

    </Center>
  );
};

export default Perfil;
