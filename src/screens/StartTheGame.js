import React, { Component, useEffect, useState, useRef } from "react";
import { View, Text, SafeAreaView, StatusBar, Image, TouchableOpacity, Modal, Animated, Dimensions, StyleSheet, Alert } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const { width, height } = Dimensions.get('window');
import axios from 'axios';
import { AppColorGreen, Black, White } from '../helpers/colors'
import Headers from "../components/Header"
import { ww, uniqueArr, wh } from "../helpers";
import CountDown from 'react-native-countdown-component';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Root, Popup } from 'popup-ui'

const StartTheGame = ({ navigation, route }) => {
  const [categoryName, setCategoryName] = useState("")
  const [difficulty, setDifficulty] = useState("")
  const [allQuestions, setQuestions] = useState([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [currentOptionSelected, setCurrentOptionSelected] = useState(null);
  const [correctOption, setCorrectOption] = useState(null);
  const [isOptionsDisabled, setIsOptionsDisabled] = useState(false);
  const [score, setScore] = useState(0)
  const [showNextButton, setShowNextButton] = useState(false)
  const [showScoreModal, setShowScoreModal] = useState(false)
  const [timerCount, setTimer] = useState(15)
  const [leaderboard, setLeaderboard] = useState([])
  const dropDownAlertRef = useRef(null);

  useEffect(() => {
    getData();

    AsyncStorage.getItem('leaderBoard',).then(data => {
      if (data == null) {
        return;
      }
      else {
        setLeaderboard(JSON.parse(data))
      }
    });
  }, []);

  const getData = async () => {
    setCategoryName(route.params.categoryName)
    setDifficulty(route.params.difficulty)
    var config = {
      method: 'get',
      url: `https://opentdb.com/api.php?amount=10&category=${route.params.categoryName}&difficulty=${route.params.difficulty}`,
    };
    console.log("config", config)
    axios(config)
      .then(function (response) {
        setQuestions(response.data.results)

        console.log("sorular ne ?", response)
      })
      .catch(function (error) { console.log("error geldin mi?", error) });

  };

  const validateAnswer = (selectedOption) => {
    let correct_option = allQuestions[currentQuestionIndex]['correct_answer'];
    setCurrentOptionSelected(selectedOption);
    setCorrectOption(correct_option);
    setIsOptionsDisabled(true);

    if (selectedOption == correct_option) {
      // Set Score
      if (route.params.difficulty === "easy") setScore(score + 10)
      else if (route.params.difficulty === "medium") setScore(score + 25)
      else if (route.params.difficulty === "hard") setScore(score + 45)
      handleNext()
      setTimer(16)
    }
    else {
      setTimer(0)
      Popup.show({
        type: 'Danger',
        button: true,
        textBody: 'Yanlış cevap verdiniz',
        buttonText: 'Tamam',
        callback: () => navigation.goBack()
      })
    }
  }
  const handleNext = () => {
    if (currentQuestionIndex == allQuestions.length - 1) {
      // Last Question
      // Show Score Modal
      setShowScoreModal(true)

    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setCurrentOptionSelected(null);
      //  setCorrectOption(null);
      setIsOptionsDisabled(false);

    }
  }


  const renderQuestion = () => {
    return (
      <View style={{
      }}>
        {/* Question */}
        <Text style={{
          color: Black,
          fontSize: ww(0.05),

        }}>{allQuestions[currentQuestionIndex]?.question}</Text>
      </View>
    )
  }
  const renderOptions = () => {
    const list = allQuestions[currentQuestionIndex]?.incorrect_answers
    if (list != undefined) {
      list.push(allQuestions[currentQuestionIndex]?.correct_answer)
    }
    return (
      <View>
        {
          list != undefined && (
            list.sort().map((option, index) => (
              <TouchableOpacity
                onPress={() => validateAnswer(option)}
                disabled={isOptionsDisabled}
                key={option}
                style={{
                  borderWidth: 1,
                  borderColor: option == correctOption
                    ? "green"
                    : option == currentOptionSelected
                      ? "red"
                      : '#000',
                  height: wh(0.05), borderRadius: 5,
                  flexDirection: 'row',
                  alignItems: 'center', justifyContent: 'space-between',
                  paddingHorizontal: ww(0.05),
                  marginVertical: wh(0.01)
                }}
              >
                <Text style={{ fontSize: ww(0.04), color: Black }}>{option}</Text>

              </TouchableOpacity>
            ))
          )

        }
      </View>
    )
  }

  return (
    <Root>
      <View style={{ flex: 1 }}>
        <Headers icon={"left"} onPress={() => { navigation.goBack() }} />
        <CountDown
          size={30}
          until={timerCount}
          onFinish={() => {
            setTimer(16)
            Popup.show({
              type: 'Danger',
              button: true,
              textBody: 'Süreniz doldu!',
              buttonText: 'Tamam',
              callback: () => {
                navigation.goBack()
              }
            })
          }}
          digitStyle={{ backgroundColor: '#FFF', borderWidth: 2, borderColor: '#1CC625' }}
          digitTxtStyle={{ color: '#1CC625' }}
          timeLabelStyle={{ color: 'red', fontWeight: 'bold' }}
          separatorStyle={{ color: '#1CC625' }}
          timeToShow={['S']}
          timeLabels={{ m: null, s: null }}
          showSeparator
          running={true}
        />
        <View style={{
          flex: 1,
          paddingVertical: 40,
          paddingHorizontal: 16,
          backgroundColor: White,
          position: 'relative'
        }}>
          {renderQuestion()}

          {renderOptions()}
          {
            showScoreModal &&
            <Modal
              animationType="slide"
              transparent={true}
              visible={showScoreModal}
            >
              <View style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: '#fff'
              }}>
                <View style={{
                  backgroundColor: "#fff",
                  borderColor: '#000',
                  borderWidth: 1,
                  width: '90%',
                  borderRadius: 10,
                  padding: 20,
                  alignItems: 'center'
                }}>

                  <Text style={{
                    fontSize: ww(0.06),
                    color: Black
                  }}>Skorunuz</Text>
                  <View style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    marginVertical: 20
                  }}>

                    <Text style={{
                      fontSize: ww(0.06),
                      color: score > (allQuestions.length / 2) ? Black : 'red'
                    }}>{score}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      const newLeaderboard = {
                        skor: score,
                        difficulty: route.params.difficulty,
                        categoryName: route.params.categoryName
                      }
                      AsyncStorage.setItem('leaderBoard', JSON.stringify([newLeaderboard, ...leaderboard])).then(data => {
                        navigation.goBack()
                      }, () => {
                      },
                      );
                    }}
                    style={{
                      backgroundColor: '#00a896',
                      padding: 20, width: '100%', borderRadius: 20
                    }}>
                    <Text style={{
                      textAlign: 'center', color: "#fff", fontSize: 20
                    }}>Kapat</Text>
                  </TouchableOpacity>

                </View>

              </View>
            </Modal>
          }
        </View>

      </View>
    </Root>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: White
  },
  containerTimer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  questionNo: {
    color: 'red',
    fontSize: 25,
    margin: 20,
  },
  Question: {
    fontSize: 30,
    margin: 25,
  },
  nextButton: {
    height: 50,
    width: '20%',
    backgroundColor: '#3700B3',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    margin: 20,
    borderRadius: 15,
  }
});
export default StartTheGame;
