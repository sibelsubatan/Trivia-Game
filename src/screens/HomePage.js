import React, { Component, useEffect, useState, useRef } from "react";
import {
  Platform,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Alert, Image, ImageBackground,
  Animated,
  useWindowDimensions, Text
} from 'react-native';
import { FormControl, Select, Center, CheckIcon, WarningOutlineIcon, NativeBaseProvider, Button, Box } from "native-base";
const { width, height } = Dimensions.get('window');
import { AppColorGreen, White, Black } from '../helpers/colors'
import Headers from "../components/Header";
import axios from 'axios';
import DropDownPicker from 'react-native-dropdown-picker';
import { ww } from "../helpers";
import { Root, Popup } from 'popup-ui'

const HomePage = ({ navigation, route }) => {

  const [categoryList, setCategoryList] = useState([])
  const [categoryName, setCategoryName] = useState("")
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [DifficultyOpen, setDifficultyOpen] = useState(false);
  const [error, setError] = useState(false);
  const [value, setValue] = useState(null);
  const [difficultyValue, setDifficultyValue] = useState(null);

  const [difficulty, setDifficulty] = useState([
    { label: 'Kolay', value: 'easy' },
    { label: 'Orta', value: 'medium' },
    { label: 'Zor', value: 'hard' }
  ]);
  useEffect(() => {
    getData();
  }, []);


  const getData = async () => {
    var config = {
      method: 'get',
      url: `https://opentdb.com/api_category.php`,
    };
    axios(config)
      .then(function (response) {
        const list = []
        response.data.trivia_categories.filter((item, index) => {
          list.push({ label: item.name, value: item.id })
          return setCategoryList(list);
        })
        console.log("liste ne geldi", categoryList)

      })
      .catch(function (error) { console.log("error geldin mi?", error) });
  };

  const Choose = () => {
    if (difficultyValue != null && value != null) {
      console.log("difficultyValue", difficultyValue)

      console.log("value", value)
      navigation.navigate("StartTheGame", { categoryName: value, difficulty: difficultyValue })
    }
    else if (value === null || difficultyValue === null) {
      Popup.show({
        type: 'Danger',
        button: true,
        textBody: 'Kategori ve zorluk derecesi se??iniz',
        buttonText: 'Tamam',
        callback: () => {
          Popup.hide()
        },

      })
    }

  }
  return (
    <Root>
      <View style={styles.container}>
        <Headers title={'Anasayfa'} />
        <View style={{ alignSelf: 'center', paddingHorizontal: ww(0.1), paddingVertical: ww(0.05), zIndex: 2, }}>
          <DropDownPicker
            placeholder="Kategori se??iniz"
            placeholderStyle={{
              color: "grey",
            }}
            open={categoryOpen}
            value={value}
            items={categoryList}
            setOpen={setCategoryOpen}
            setValue={setValue}
            setItems={setCategoryList}
            style={{ backgroundColor: 'transparent' }}
          />
        </View>

        <View style={{ alignSelf: 'center', paddingHorizontal: ww(0.1), paddingVertical: ww(0.05), zIndex: 1 }}>
          <DropDownPicker
            placeholder="Zorluk derecesi se??iniz"
            placeholderStyle={{
              color: "grey",
            }}
            open={DifficultyOpen}
            value={difficultyValue}
            items={difficulty}
            setOpen={setDifficultyOpen}
            setValue={setDifficultyValue}
            setItems={setDifficulty}
            style={{ backgroundColor: 'transparent' }}
          />
        </View>
        <NativeBaseProvider>
          <Center>
            <Button style={{ backgroundColor: '#00a896', }} onPress={() => { Choose() }}>Oyunu Ba??lat</Button>
          </Center>
        </NativeBaseProvider>

      </View>
    </Root>

  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});
export default HomePage;
