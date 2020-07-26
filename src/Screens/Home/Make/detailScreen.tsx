import React, {useState} from 'react';
import {View, Text, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import Card from '~/components/Card';
import SQLite from 'react-native-sqlite-storage';

interface Props {
    route:any;
    navigation:any;
}

const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height

const cardWidth = deviceWidth * (8 / 10);
const cardHeight = cardWidth * (9 / 16);

const saveCard = (fullData:string) => new Promise((resolve, reject) => {
    const db = SQLite.openDatabase(
        {
            name: 'mat.db',
            location: 'Library',
            createFromLocation: 1,
        },
        () => {
            console.log('open success');
        },
        (error) => {
            console.log('open fail', error);
        },
        );
        
        db.transaction(
            (tx) => {
              tx.executeSql('insert into myCard(fullData) values(?)', [fullData], (tx, result) => {
                // console.log('#transaction success# ', result.rows);
                console.log('insert success')
                resolve(result)
              });
            },
            (err) => {console.log('insert fail'); reject(err)}
          );
}) 

const DetailScreen = ({route, navigation}: Props) => {
    const data = route.params;

    return (<View style={styles.wrapper}>
        <View style={styles.cardContainer} >
            <Card data={data} parentWidth={deviceWidth*1.5} />
        </View>
        
        <TouchableOpacity
              style={styles.btnFinish}
              onPress={() => saveCard(JSON.stringify(data)).then(() => navigation.navigate('Home'))}>
              <Text style={styles.btnText}>저장</Text>
        </TouchableOpacity>

        <TouchableOpacity
              style={styles.btnBack}
              onPress={() => navigation.goBack()}>
              <Text style={styles.btnText}>이전</Text>
        </TouchableOpacity>
    </View>);
}

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        height: '100%',
        // backgroundColor: 'green',
        // alignItems: 'center',
        // justifyContent: 'space-between'
    },
    // cardConatiner: {
    //     width: cardWidth,
    //     height: cardHeight,
    //     elevation: 5,
    //     backgroundColor: 'white',
    //     borderRadius: 5,
    //     // padding: 5,
    //     marginTop: 15,
    //     borderWidth: 0,
    //     borderColor: 'blue'
    // }
    cardContainer: {
        marginTop: 50,
        width: '100%',
        height: deviceWidth,
        transform: [{rotate: '90deg'}],
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnContainer: {
        width: '10%',
        height: deviceWidth,
        borderColor: 'orange',
        borderWidth: 4,
        transform: [{rotate: '90deg'}],
    },
    btnFinish: {
        position: 'absolute',
        left: '25%',
        top: '85%',
        width: 70,
        height: 40,
        backgroundColor: '#6078EA',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        transform: [{rotate: '90deg'}]
      },
      btnBack: {
        position: 'absolute',
        left: '60%',
        top: '85%',
        width: 70,
        height: 40,
        backgroundColor: '#333333',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        transform: [{rotate: '90deg'}]
      },
      btnText: {
        fontFamily: 'sd_gothic_m',
        fontSize: 20,
        color: 'white',
      },
})

export default DetailScreen;