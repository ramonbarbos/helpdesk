import React, { useEffect, useState } from 'react';

import { useNavigation } from '@react-navigation/native';

import {  Box, Center, Input, Heading, FormControl, VStack, Icon,Button, Checkbox, HStack,Image, Select, CheckIcon, TextArea} from "native-base";

import { FontAwesome , Entypo, MaterialIcons } from '@expo/vector-icons';

import SelectUsuario from '../model/SelectUsuario';
import SelectCliente from '../model/SelectCliente';
import SelectCategoria from '../model/SelectCategoria';

const NewChamado = () => {
  const [entidade, setEntidade] = useState('');
  const [cliente, setCliente] = useState('');
  const [usuario, setUsuario] = useState('');


  const navigation = useNavigation();

  const handleSelectCategoria = async (item) =>{
    setCliente(item.id)
    console.log(item)
    handleSelectEntidade(cliente)
  }

  const handleSelectCliente = async (item) =>{
    setCliente(item.id)
    console.log(item)
    handleSelectEntidade(cliente)
  }

  const handleSelectEntidade = async (item) =>{
    let id = item
    const url = `http://10.0.0.120/apiHelpdesk/cliente/entidade/${id}`;

 
  
      try {
        const response = await fetch(url);
        const responseData = await response.json();

        if (responseData && responseData.resposta) {
          console.log(responseData.resposta)
          setEntidade(responseData.resposta);
        }
      } catch (error) {
        console.error(error);
      }
  


  }

  const handleSelectUsuario = async (item) =>{
    setUsuario(item.id)
    console.log(item)
  }



  const handleRegister = async () => {
    //console.log(login, senha,nome,cidade);

    try {
      const requestBody = {
       
      };

      const response = await fetch('http://10.0.0.120/apiHelpdesk/usuarios/cadastrar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const responseData = await response.json();
      console.log('Resposta da API:', responseData);


      if (responseData.tipo == 'sucesso') {
        alert("Novo Chamado Cadastrado!")
        navigation.navigate('Login')
      } else {
        console.log('Request failed:', response.status);
      }
    } catch (error) {
      console.error('Erro:', error);
    }
  };



  return (
    <Center height="full">
     

      <VStack width="full" p={10}>
        <Heading color="primary.500">
           Novo Chamado
        </Heading>
        <Box width="full">

       

       <SelectCategoria onValueChange={handleSelectCategoria}/>

          <SelectCliente  onValueChange={handleSelectCliente}/>
                
          <Input
              disabled
              placeholder='Entidade'
              size="md" 
              mt={5}
              value={entidade.entidade}
         
              //onChangeText={}
            />

          <SelectUsuario onValueChange={handleSelectUsuario}/>

          <Box mt={5}> 
            <Select
             
              minWidth="200"
              accessibilityLabel="Choose Service"
              placeholder="Status"
              _selectedItem={{
                bg: 'teal.600',
                endIcon: <CheckIcon size="5" />,
              }}
              mt={1}
              
            >
             
                <Select.Item label="Aberto" value="a"/>
                <Select.Item label="Fechado" value="f"/>
            
            </Select>
          </Box>

          <FormControl>
            <Input
              placeholder='Titulo'
              size="md"
              mt={5}
              //onChangeText={setLogin}
            />
          </FormControl>
          
          <TextArea mt={5} h={20} placeholder="Descrição" w="100%"  />
          
          <Button size="sm" mt={7}  variant="subtle"  onPress={() => handleRegister()} >Criar</Button>

        </Box>
      </VStack>
    </Center>
  );
};


export default NewChamado;