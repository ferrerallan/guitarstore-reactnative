import React, { useEffect, useState } from "react";
import {
  Platform,
  TouchableOpacity,
  ScrollView,
  Alert,
  View,
} from "react-native";
import {
  Container,
  Header,
  Title,
  DeletLabel,
  Upload,
  PickeImageButton,
  Form,
  InputGroup,
  InputGroupHeader,
  MaxCharacter,
  Label,
} from "./styles";

import * as ImagePicker from "expo-image-picker";
import firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";
import { useRoute, useNavigation } from "@react-navigation/native";
import { ProductNavigationProps } from "@src/@types/navigation";
import { ProductProps } from "@components/ProductCard";

import { InputPrice } from "@components/InputPrice";
import { ButtonBack } from "@components/ButtonBack";
import { Photo } from "@components/Photo";
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import axios from 'axios';

type pizzaResponse = ProductProps & {
  photo_path: string;
  prices_sizes: {
    p: string;
    m: string;
    g: string;
  };
};

type PizzaResponse = ProductProps & {
  photo_path: string;
  price_sizes: {
    p: string;
    m: string;
    g: string;
  }
}

export function Product() {
  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [priceString6, setPriceString6] = useState('');
  const [priceString7, setPriceString7] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [photoPath,setPhotoPath]=useState('');
  const navigation = useNavigation();
  

  const route = useRoute();
  const {id} = route.params as ProductNavigationProps;
  
  
  async function handlePickerImage(){
    const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status === 'granted'){
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
      });

      if (!result.cancelled){
        setImage(result.uri);
      }
    }
  }

  async function handleIntegrateAzure(){
    const handleClick = async () => {
        axios.post('your url', {
        { 
          id: `${new Date().getTime()}`,
          Manufacturer: name,
          NumberOfStrings: "7",
          ActivePickup: true
        })
        .then(response => console.log(response.data));
  };
  }

  async function handleAdd(){
    const requiredFields = [[name,'name'], 
                            [description,'description'],
                            [priceString6,'price 6'],
                            [priceString7,'price 7'],
                            [image,'imagem']];
    let errors="";
    requiredFields.forEach(field => {
      if (!field[0]){
        errors+=`Field ${field[1]} is required.\n`;
      }
    });
    if (errors)
      return Alert.alert('Erro', errors);  
      
    setIsLoading(true);

    const fileName = `${new Date().getTime()}`;
    const reference = storage().ref(`/images/${fileName}.png`);
    
    await reference.putFile(image);
    const photo_url = await reference.getDownloadURL();

    firestore().collection('guitars').add({
      name, 
      name_lower: name.toLowerCase().trim(),
      description,
      price_sizes:{
        s6: priceString6,
        s7: priceString7,
      },
      photo_url,
      photo_path:reference.fullPath,
    })
    .then(()=>{      
      Alert.alert('Success', 'Guitar has been added!');      
    })
    .then(()=>{
      navigation.navigate('home');
    })
    .catch(()=>{
      Alert.alert('Erro', 'Erro on adding guitar!');
    })
    .finally(()=>{
      setIsLoading(false);
    })
  }

  async function handleLoadProduct(){
    firestore()
    .collection('products')
    .doc(id)
    .get()
    .then(response=>{
      const data = response.data() as PizzaResponse;
      setName(data.name);
      setDescription(data.description);
      setPriceString6(data.price_sizes.p);
      setPriceString7(data.price_sizes.m);
      setImage(data.photo_url);
      setPhotoPath(data.photo_path);
    })
  }

  function handleGoBack(){
    navigation.goBack();
  }

  function handleDelete(){
    firestore()
    .collection('products')
    .doc(id)
    .delete()
    .then(()=>{
      storage()
      .ref(photoPath)
      .delete()
      .then(()=>{
        navigation.navigate('home');
      })
    })
  }

  useEffect(()=>{
    if (id){
      console.log('tem id');
      handleLoadProduct();
    }
  },[id]);

  return (
    <Container behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <ScrollView showsVerticalScrollIndicator={false}>
      <Header>
        <ButtonBack onPress={handleGoBack}/>
        <Title>
          Register new guitar
        </Title>
        {
          id ?
            <TouchableOpacity>
              <DeletLabel onPress={handleDelete}>Delete</DeletLabel>
            </TouchableOpacity>
           : <View style={{width:20}} />
        }
      </Header>
      <Upload>
        <Photo uri={image}/>
        {
          !id &&
            <PickeImageButton 
              title="Load" 
              type="secondary"
              onPress={handlePickerImage}/>
         
        }
      </Upload>
      <Form>
        <InputGroup>
          <Label>Name</Label>
          <Input onChangeText={setName} value={name}/>
        </InputGroup>
        <InputGroup>
          <InputGroupHeader>
            <Label>Description</Label>            
            <MaxCharacter>0 of 60 chars</MaxCharacter>          
          </InputGroupHeader>
          <Input 
            multiline={true}
            maxLength={60}
            style={{height: 80}}
            onChangeText={setDescription} value={description}
          />
        </InputGroup>

        <InputGroup>
          <Label>Price by number of strings</Label>
          <InputPrice size="s6" onChangeText={setPriceString6} value={priceString6}/>
          <InputPrice size="s7" onChangeText={setPriceString7} value={priceString7}/>
        </InputGroup>
        {
          !id &&
            <Button 
              title="Save"
              isLoading={isLoading}
              onPress={handleAdd}
            />
        }
      </Form>
      </ScrollView>
    </Container>
  );
}
