
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Modal,
    ActivityIndicator
} from 'react-native';
import I18n from "../translations/I18n";

const Loader = props => {
    const {
        loading,
        text,
        ...attributes
    } = props;
    return (
        <Modal
            transparent={true}
            animationType={'none'}
            visible={loading}
            onRequestClose={() => {console.log('close modal')}}>
            <View style={styles.modalBackground}>
                <View style={styles.activityIndicatorWrapper}>
                    <ActivityIndicator
                        size={'large'}
                        animating={loading} />
                        <Text style={styles.activityIndicatorText}>{text === undefined ? I18n.t('loading') : text}</Text>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000040'
    },
    activityIndicatorWrapper: {
        backgroundColor: '#FFFFFF',
        height: 120,
        width: 120,
        borderRadius: 10,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    activityIndicatorText:{
        marginTop:10,
        textAlign:'center',
        paddingHorizontal:10,
        color:'#000'
    }
});

export default Loader;
