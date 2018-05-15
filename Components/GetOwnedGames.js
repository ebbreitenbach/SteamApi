import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View} from 'react-native';

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
      // 76561198013145972
      apiKey = '43FA3F3D29F3513F781013538C50EEF3';

      fetch('http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=43FA3F3D29F3513F781013538C50EEF3&steamid=76561198013145972&format=json')
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
        <ScrollView contentContainerStyle = {styles.container}>
          <Text style = {styles.textStyle}>
            Number of games owned: {this.state.checkOwned}
          </Text>
          <Text style = {styles.textStyle}>
            Games Owned:
          </Text>
            {gamesArr}
        </ScrollView>
      )
    }
  }

  const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingTop: '15%'
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
