import React, {useState} from 'react';
import S from 'styled-components/native';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  PermissionsAndroid,
  Button,
  Image,
  Dimensions,
  ToastAndroid,
} from 'react-native';
import Header from '~/components/MakeHeader';
import TextInputS from '~/components/TextInputS';
import ImagePicker from 'react-native-image-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {PERMISSIONS, RESULTS, request} from 'react-native-permissions';
import {header1, loadLogo} from '~/Assets/Images';

const deviceWidth = Dimensions.get('window').width;

const requestPermission = async (
  data: any,
  setIsImg: any,
  isImg: number,
  addData: any,
) => {
  await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE).then((result) => {
    if (result === RESULTS.GRANTED) {
      ImagePicker.launchImageLibrary(
        {
          title: 'Load Photo',
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
        },
        (response) => {
          if (response.didCancel) {
            console.log('## loading photo is canceled ##');
          } else if (response.error) {
            console.log('## loading photo error ##', response);
          } else {
            // console.log('### img data ###', response.data)
            // data.valueLogo = response.data
            const fileSize = (response.data.length * (3 / 4) - 2) / 1024 / 1024;
            console.log('# fileSize #', fileSize);
            if (fileSize > 0.5) {
              ToastAndroid.show(
                '0.5MB 이상의 이미지는 사용하실 수 없습니다',
                ToastAndroid.SHORT,
              );
            } else {
              addData(response.data, 'valueLogo');
              setIsImg(isImg + 1);
            }
          }
        },
      );
    }
  });
};

interface Props {
  navigation: any;
}
let data = Object();
const InputData = ({navigation}: Props) => {
  const [isImg, setIsImg] = useState(0);

  const addData = (text: string, name: string) => {
    if (text.length > 0) {
      data[name] = text;
    }
  };

  return (
    <View style={styles.body}>
      <View style={styles.header}>
        {/* <Header current={1} finish={{}}/> */}
        <Image
          source={header1}
          style={{width: deviceWidth, height: '70%', marginTop: '3%'}}
        />
      </View>
      <View style={styles.scrollViewContainer}>
        <ScrollView>
          <TextInputS
            placeholder="명함 이름"
            isNeeded={true}
            onEndEditing={addData}
            name="cardName"
          />
          <TextInputS
            placeholder="내 이름"
            isNeeded={true}
            onEndEditing={addData}
            name="valueName"
          />
          <TextInputS
            placeholder="전화번호"
            isNeeded={true}
            onEndEditing={addData}
            name="valuePhone"
          />
          <TextInputS
            placeholder="이메일"
            isNeeded={false}
            onEndEditing={addData}
            name="valueEmail"
          />
          <TextInputS
            placeholder="회사명"
            isNeeded={true}
            onEndEditing={addData}
            name="valueCompany"
          />
          <TextInputS
            placeholder="직책"
            isNeeded={true}
            onEndEditing={addData}
            name="valuePosition"
          />
          <TextInputS
            placeholder="부서"
            isNeeded={false}
            onEndEditing={addData}
            name="valueTeam"
          />
          <TextInputS
            placeholder="회사번호"
            isNeeded={true}
            onEndEditing={addData}
            name="valueComNum"
          />
          <TextInputS
            placeholder="회사주소"
            isNeeded={true}
            onEndEditing={addData}
            name="valueComAddr"
          />
          <TextInputS
            placeholder="FAX"
            isNeeded={false}
            onEndEditing={addData}
            name="valueFax"
          />

          <Text style={{fontSize: 15, marginTop: 15, fontWeight: 'bold'}}>
            {' '}
            * 아래 버튼을 눌러 회사 로고(.png)를 추가해주세요{' '}
          </Text>
          <View style={styles.logoContainer}>
            <TouchableOpacity
              key={isImg}
              style={styles.btnOpenLibrary}
              onPressOut={() =>
                requestPermission(data, setIsImg, isImg, addData)
              }>
              <AntDesign name="picture" size={70} />
              {/* <Image source={loadLogo} style={{width:70, height:70}} /> */}
            </TouchableOpacity>

            {isImg ? (
              <View style={styles.logoSuccess}>
                <Text style={styles.textSuccessLogo}>
                  {' '}
                  로고가 추가되었습니다{' '}
                </Text>
              </View>
            ) : null}
          </View>

          <View style={styles.btnConatiner}>
            <TouchableOpacity
              style={styles.btnNext}
              onPress={() => navigation.navigate('SelectMatLayout', data)}>
              <Text style={styles.btnText}>다음</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  header: {
    flex: 1,
  },
  scrollViewContainer: {
    flex: 8,
    width: '90%',
    left: '5%',
  },
  processContainer: {
    flex: 5,
  },
  processDescription: {
    flex: 1,
  },
  btnConatiner: {
    marginVertical: 20,
    width: '90%',
    left: '5%',
    flexDirection: 'row-reverse',
  },
  btnNext: {
    width: 70,
    height: 40,
    backgroundColor: '#6078EA',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontFamily: 'sd_gothic_m',
    fontSize: 20,
    color: 'white',
  },
  btnOpenLibrary: {
    width: '35%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoSuccess: {
    width: '65%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textSuccessLogo: {
    fontSize: 20,
    fontFamily: 'sd_githic_m',
    fontWeight: 'bold',
  },
});

export default InputData;
