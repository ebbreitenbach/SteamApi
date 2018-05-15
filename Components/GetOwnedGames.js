import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View } from 'react-native';
  import PlayerSummary from './GetPlayerSummary.js';

  export default class GetOwnedGames extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        checkOwned: '',
        gamesOwned: [],
      }
    }

    componentDidMount() {
      let newGamesArr = [];
      //Aaron 76561198013145972
      //Eric 76561197994058272
      apiKey = '43FA3F3D29F3513F781013538C50EEF3';

      fetch('http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=43FA3F3D29F3513F781013538C50EEF3&steamid=76561197994058272&')
        .then((res) => {
          return res.json();
        })
        .then((owned) => {
          let data = owned.response.games;
          for(let i = 0; i < data.length; i++) {
            newGamesArr.push(data[i]);
          }
          this.setState({
            checkOwned: owned.response.game_count,
            gamesOwned: newGamesArr
          })
        })
        .catch((err) => {
          console.log(err)
        })
      }

    render() {
      let gamesArr = [];
      for(let i = 0; i < this.state.gamesOwned.length; i++) {
        gamesArr.push(
          <Text
            style = {styles.games}
            key={i}>{this.state.gamesOwned[i].appid}
          </Text>
        )
      }
      return(
        <View>
          <View>
            <PlayerSummary />
          </View>
          <ScrollView contentContainerStyle = {styles.container}>
            <Text style = {styles.textStyle}>
              Number of games owned: {this.state.checkOwned}
            </Text>
            <Text style = {styles.textStyle}>
              Games Owned:
            </Text>
              {gamesArr}
          </ScrollView>
        </View>
      )
    }
  }

  const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: 400
  },
  games: {
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  textStyle: {
    fontWeight: 'bold',
    fontSize: 15
  }
})
