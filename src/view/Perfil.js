import React, { useState, useEffect, useContext, useRef } from 'react';
import { Text, VStack, Box, Center, HStack, Divider, Image, Stack, Heading, Button } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { AuthContext } from '../control/auth';

const Perfil = () => {
  const { user } = useContext(AuthContext);
  const route = useRoute();
  
  const [profileImage, setProfileImage] = useState(null);
  const selectedImageRef = useRef(null);
  
  const { id } = route.params;
  
  const fetchProfileImage = async () => {
    try {
      const response = await fetch(`http://10.0.0.120/apiHelpdesk/usuarios/fotoperfil/${id}`);
      const imageUri = response.url;
      setProfileImage(imageUri);
    } catch (error) {
      console.error('Erro ao buscar a imagem de perfil', error);
    }
  };
  
  useEffect(() => {
    fetchProfileImage();
  }, []);
  
  const handleImageUpload = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
  
      if (!result.cancelled && result.assets.length > 0) {
        const selectedImage = result.assets[0];
  
        const response = await fetch(selectedImage.uri);
        const blob = await response.blob();
  
        const reader = new FileReader();
        reader.onload = async () => {
          const base64data = reader.result.split(',')[1]; // Extrai apenas a parte base64
  
          const requestData = {
            imagem: base64data,
          };
  
          const apiResponse = await fetch(`http://10.0.0.120/apiHelpdesk/usuarios/upimagem/${user.id}`, {
            method: 'PUT',
            body: JSON.stringify(requestData),
            headers: {
              'Content-Type': 'application/json',
            },
          });
  
          const responseData = await apiResponse.json();
          console.log(responseData);

          // Atualize a imagem do perfil após o upload bem-sucedido
          fetchProfileImage();
        };
  
        reader.readAsDataURL(blob);
      }
    } catch (error) {
      console.error('Erro ao fazer upload da imagem:', error);
    }
  };
  
  return (
    <Center>
      <Box>
        <Stack mt={5} color="black" >
          <Image size={150}   borderRadius={100} source={{ uri: profileImage || "https://wallpaperaccess.com/full/317501.jpg" }} alt="Alternate Text" />
          <Heading mt={1}>{user.nome} {user.sobrenome}</Heading>
        </Stack>
  
        <Box alignItems={'center'} w={'100%'}>
          <VStack>
            <Divider bg={'black'} />
            <TouchableOpacity onPress={handleImageUpload}>
              <Box w={'100%'} h={55} justifyContent={'center'}>
                <Text ><FontAwesome5 name="user-edit" size={20} color="black" />  Alterar foto Perfil </Text>
              </Box>
            </TouchableOpacity>
            <Divider bg={'black'} />
            <TouchableOpacity>
              <Box w={'100%'} h={55}  justifyContent={'center'}>
                <Text><MaterialCommunityIcons name="theme-light-dark" size={20} color="black" /> Tema</Text>
              </Box>
            </TouchableOpacity>
            <Divider bg={'black'} />
          
          </VStack>
        </Box>
      </Box>
    </Center>
  );
};
  
export default Perfil;
