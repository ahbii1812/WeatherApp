import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  Button,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
let x = 1;
let timer = 100000;
export default function RetrieveWeather() {
  const [iconColor, setIconColor] = useState('');
  const [textColor, setTextColor] = useState('black');
  const [openWeather, setOpenWeather] = useState('');
  const [isOnline, setIsOnline] = useState('');
  const [backgroundColor, setBackgrounColor] = useState('');
  const [userInput, setUserInput] = useState('');
  const search = () => {
    console.log(userInput);
    fetch(
      'http://api.openweathermap.org/data/2.5/weather?q=' +
        userInput +
        '&appid=a51fdc2ab92bde81479d6a1091f5cde2',
    )
      .then(res => res.json())
      .then(result => {
        setOpenWeather(result);
        getTime(openWeather.dt);
        while (timer >= 0) {
          timer--;
          console.log(timer);
        }
        if (timer <= 0 && openWeather.dt !== undefined) {
          setIsOnline(true);
        } else {
          setIsOnline(false);
          Alert.alert(openWeather.message);
        }
      })
      .catch(function(error) {
        setIsOnline(false);
        console.log(
          'There has been a problem with your fetch operation: ' +
            error.message,
        );
        // ADD THIS THROW error
        throw error;
      });
  };
  const getTime = unixTime => {
    if (isOnline) {
      let unix_timeStamp = unixTime;
      var date = new Date(unix_timeStamp * 1000);
      var hours = '0' + date.getHours();
      var minutes = '0' + date.getMinutes();
      var day = date.getDay();
      let days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ];
      if (x > 0 && hours >= 19) {
        setIconColor('white');
        setTextColor('white');
        setBackgrounColor('#313745');
        x--;
      } else if (x > 0 && hours >= 5) {
        setIconColor('grey');
        setTextColor('black');
        setBackgrounColor('#E5ECF4');
        x--;
      }
      return days[day] + '  ' + hours.substr(-2) + ':' + minutes.substr(-2);
    }
  };
  const getGreeting = unixTime => {
    let unix_timeStamp = unixTime;
    var date = new Date(unix_timeStamp * 1000);
    var hours = '0' + date.getHours();
    if (hours >= 19) {
      return 'Good Night';
    } else if (hours >= 16) {
      return 'Good Evening';
    } else if (hours >= 12) {
      return 'Good Afternoon';
    } else if (hours >= 0) {
      return 'Good Morning';
    }
  };
  const getSunTime = props => {
    if (isOnline) {
      let unix_timeStamp = props.currTime;
      var date = new Date(unix_timeStamp * 1000);
      var currHours = '0' + date.getHours();
      let unix_sunriseTime = props.sunriseTime;
      var currSunriseTime = new Date(unix_sunriseTime * 1000);
      var currSunriseHours = '0' + currSunriseTime.getHours();
      var currSunriseMinutes = '0' + currSunriseTime.getMinutes();
      let unix_sunsetTime = props.sunsetTime;
      var currSunsetTime = new Date(unix_sunsetTime * 1000);
      var currSunrsetHours = '0' + currSunsetTime.getHours();
      var currSunrsetMinutes = '0' + currSunsetTime.getMinutes();

      if (currHours >= 19) {
        return (
          currSunrsetHours.substr(-2) + ':' + currSunrsetMinutes.substr(-2)
        );
      } else if (currHours >= 5) {
        return (
          currSunriseHours.substr(-2) + ':' + currSunriseMinutes.substr(-2)
        );
      } else if (currHours >= 0) {
        return (
          currSunrsetHours.substr(-2) + ':' + currSunrsetMinutes.substr(-2)
        );
      }
    }
  };
  const getSunDescription = props => {
    let unix_timeStamp = props;
    var date = new Date(unix_timeStamp * 1000);
    var currHours = '0' + date.getHours();
    if (currHours >= 19) {
      return 'SUNSET';
    } else if (currHours >= 5) {
      return 'SUNRISE';
    } else if (currHours >= 0) {
      return 'SUNSET';
    }
  };
  const titleStyle = {
    color: textColor,
    fontSize: 30,
    paddingTop: 30,
    textAlign: 'center',
  };
  const dateStyle = {
    color: textColor,
    textAlign: 'center',
  };
  const tempStyle = {
    color: textColor,
    textAlign: 'center',
    fontSize: 40,
    fontWeight: 'bold',
  };
  const greetingStyle = {
    color: textColor,
    textAlign: 'center',
    fontSize: 15,
  };
  const normalTextStyle = {
    color: textColor,
  };
  if (isOnline) {
    return (
      <View style={styles.container} backgroundColor={backgroundColor}>
        <View>
          <Text style={titleStyle}> {openWeather.name}</Text>
          <Text style={dateStyle}> {getTime(openWeather.dt)}</Text>
        </View>
        <View>
          <Image
            style={styles.logo}
            source={{
              uri:
                'http://openweathermap.org/img/wn/' +
                openWeather.weather[0].icon +
                '@2x.png',
            }}
          />
          <Text style={tempStyle}>
            {Math.round(openWeather.main.temp - 273.15)} ℃
          </Text>
          <Text style={greetingStyle}>{getGreeting(openWeather.dt)}</Text>
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.bottomIconContainer}>
            <Image
              source={require('./Icon/SunRise.png')}
              style={styles.tinyLogo}
              tintColor={iconColor}
            />
            <Text style={normalTextStyle}>
              {getSunDescription(openWeather.dt)}
            </Text>
            <Text style={normalTextStyle}>
              {getSunTime({
                currTime: openWeather.dt,
                sunriseTime: openWeather.sys.sunrise,
                sunsetTime: openWeather.sys.sunset,
              })}
            </Text>
          </View>
          <View style={styles.bottomIconContainer}>
            <Image
              source={require('./Icon/WindWhite.png')}
              style={styles.tinyLogo}
              tintColor={iconColor}
            />
            <Text style={normalTextStyle}>WIND</Text>
            <Text style={normalTextStyle}>
              {Math.round(openWeather.wind.speed)} m/s
            </Text>
          </View>
          <View style={styles.bottomIconContainer}>
            <Image
              source={require('./Icon/TempWhite.png')}
              style={styles.tinyLogo}
              tintColor={iconColor}
            />
            <Text style={normalTextStyle}>TEMPERATURE</Text>
            <Text style={normalTextStyle}>
              {Math.round(openWeather.main.feels_like - 273.15)} ℃
            </Text>
          </View>
        </View>
      </View>
    );
  } else {
    return (
      <View>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <TextInput
            style={styles.inputField}
            placeholder={'userInput'}
            onChangeText={val => setUserInput(val)}
            value={userInput}
            clearTextOnFocus={true}
          />
        </TouchableWithoutFeedback>
        <Button title={'LOL'} onPress={search} />
        <Text> {userInput} </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputField: {
    textAlign: 'center',
    width: 400,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 40,
  },
  bottomIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'space-around',
    flex: 1,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  logo: {
    width: 300,
    height: 300,
  },
});
