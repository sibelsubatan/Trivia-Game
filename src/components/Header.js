import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';;
import { ww } from '../helpers/responsive';
import { AppColorGreen, AppColorBlue, Black, White } from '../helpers/colors'
import { Header } from "react-native-elements";
import { MenuIcon, CheckIcon, SearchIcon, BackIcon, ArrowLeftIcon } from '../assets/icons';

const Headers = ({ title, onPress, icon, onPressRight, rightIconn, titlee }) => {
    return (
        <Header
            statusBarProps={{ barStyle: 'light-content' }}
            containerStyle={{ backgroundColor: 'transparent', borderBottomColor: 'transparent', borderBottomWidth: 0 }}
            leftComponent={
                <>
                    {
                        icon === "left" &&
                        <TouchableOpacity onPress={onPress} style={styles.leftIcon}>
                            <ArrowLeftIcon color={Black} size={ww(.06)} />
                            <Text style={{
                                color: '#fff',
                                fontSize: ww(.04),
                                left: ww(.04)
                            }}>{titlee}</Text>
                        </TouchableOpacity>
                    }

                    {
                        icon === "menu" &&
                        <TouchableOpacity onPress={onPress} style={styles.leftIcon}>
                            <MenuIcon color={Black} size={ww(.06)} />
                        </TouchableOpacity>
                    }

                </>
            }
            centerComponent={{
                text: title,
                style: {
                    color: Black,
                    fontSize: ww(.04),
                },
            }}
            rightComponent={
                <>

                    {
                        rightIconn === "search" &&
                        <TouchableOpacity onPress={onPressRight} style={styles.rightIcon}>
                            <SearchIcon color={Black} size={ww(.06)} />
                        </TouchableOpacity>
                    }
                </>
            }
        />
    );
};

export default Headers;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: "center"
    },
    iconContainer: {
        // position:"absolute",
        width: ww(0.15),
        height: ww(0.15),
        alignItems: 'flex-start',
        justifyContent: 'center',
        left: ww(0.055),
    },
    title: {
        width: ww(0.65),
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: "center",
        height: ww(0.15),
    },
    titleText: {
        color: '#fff',
        fontSize: ww(0.04),
        fontFamily: 'Montserrat-Black',
    },
    rightIcon: {
        marginRight: ww(.04),
        alignItems: "center",
        justifyContent: "center"
    },
    leftIcon: {
        marginRight: ww(.04),
        alignItems: "center",
        justifyContent: "center",
        flexDirection: 'row',
    }
});