import React, { Component, useEffect, useState, useRef } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View, FlatList
} from 'react-native';


import AsyncStorage from '@react-native-async-storage/async-storage';
import { wh, ww } from '../helpers';
import { AppColorGreen, Black, White } from '../helpers/colors';
import Headers from "../components/Header"

const ScoreTable = ({ navigation, route }) => {
  const [leaderboard, setLeaderboard] = useState([])

  useEffect(() => {
    AsyncStorage.getItem('leaderBoard').then(data => {
      if (data != undefined) {
        setLeaderboard(JSON.parse(data))
      }
    });
  }, [leaderboard]);


  return (
    <View style={styles.container}>
      <Headers title={'Skor Tablosu'} />
      <View style={{
        justifyContent: "space-evenly",
        backgroundColor: '#FFF',
        height: wh(0.05),
        borderRadius: 0,
        borderBottomWidth: 1,
        borderBottomColor: "lightgray",
        shadowColor: '#000',
        shadowOffset: {
          width: 6,
          height: 6,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 4,
        flexDirection: 'row', marginBottom: wh(0.01), width: ww(0.9), alignSelf: 'center'
      }}>
        <Text style={{ textAlign: 'left', alignSelf: 'center', color: '#000' }}>Skor</Text>
        <Text style={{ textAlign: 'left', alignSelf: 'center', color: '#000' }}>Zorluk Derecesi</Text>
      </View>
      <FlatList
        data={leaderboard}
        renderItem={(item, index) => {
          return (
            <View
              style={{
                justifyContent: "space-evenly",
                backgroundColor: '#FFF',
                height: wh(0.05),
                borderRadius: 0,
                borderBottomWidth: 1,
                borderBottomColor: "lightgray",
                shadowColor: '#000',
                shadowOffset: {
                  width: 6,
                  height: 6,
                },
                shadowOpacity: 0.1,
                shadowRadius: 3,
                elevation: 4,
                flexDirection: 'row', marginBottom: wh(0.02), width: ww(0.9), alignSelf: 'center'
              }}>
              <View style={{ alignContent: 'flex-start' }}>
                <Text style={{ alignSelf: 'center', color: '#000' }}>{item.item.skor}</Text>
              </View>
              <View style={{ alignContent: 'flex-start' }}>
                <Text style={{ alignSelf: 'center', color: '#000' }}>{item.item.difficulty}</Text>
              </View>
            </View>
          )
        }}>

      </FlatList>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: White
  },
});
export default ScoreTable;
