import React from 'react';
import {
  Image,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View } from 'react-native';

  export default class PlayerSummary extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        userData: []
      }
    }

    componentDidMount() {
      fetch('http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=43FA3F3D29F3513F781013538C50EEF3&steamids=76561197994058272format=json')
        .then((res) => {
          return res.json();
        })
        .then((playerSum) => {
          this.setState({
            userData: [playerSum.response.players[0]]
          })
          console.log(this.state.userData, "hi");
        })
        .catch((err) => {
          console.log(err);
        })

    }

    render() {
      let avatar = this.state.userData.map((v) => v.avatar);
      return(
        <View style={styles.top}>
          <View style={styles.image}>
            <Image style={{width: 50, height: 50}} source={{uri: avatar[0]}} />
          </View>
          <View>
            <Text style={styles.text}>{this.state.userData.map((v) => v.personaname)}</Text>
          </View>
        </View>
      )
    }
  }

  const styles = StyleSheet.create({
    top: {
      flexDirection: 'row',
      paddingTop: '15%'
    },
    image: {
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
    },
    text: {
      fontWeight: 'bold',
      fontSize: 20,
      paddingLeft: '5%',
      paddingTop: '3%'
    }
  })
