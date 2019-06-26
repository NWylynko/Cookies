import * as React from 'react';
import { View, StyleSheet, Button, FlatList } from 'react-native';
import { Constants } from 'expo';

// You can import from local files
import CookieButton from './components/cookie';
import Shop from './components/shop';
import shops from './components/shops.json';

export default class App extends React.Component {
  state = {
    cookies: 0,
    cps: 0,
    amount_owned: [0, 0, 0, 0, 0],
    shops: require(shops),
  };

  addCookies = amount =>
    this.setState({ cookies: this.state.cookies + amount });

  buyFromShop = cost => {
    for (let i = 0; i < this.state.shops.length; i++) {
      if (this.state.shops[i].cost == cost) {
        this.setState(state => {
          const amount_owned = state.amount_owned.map((item, j) => {
            if (j === i) {
              return item + 1;
            } else {
              return item;
            }
          });
          return { amount_owned };
        });
        this.setState({ cookies: this.state.cookies - cost });
      }
    }
  };

  calcCPS = () => {
    let individual = this.state.shops.map(a => {
      const ind = a.clicks_per_second * this.state.amount_owned[a.id];
      return ind
    });
    let output = 0 
    individual.map(i => { output += i })
    this.setState({ cps: output })
    this.addCookies(output)
  };

  componentDidMount() {
    let autoCPS = setInterval(this.calcCPS, 1000);
  }

  render() {
    return (
      <View style={styles.container}>
        <CookieButton
          cookies={this.state.cookies}
          addCookies={this.addCookies}
          cps={this.state.cps}
        />
        <Shop
          shops={this.state.shops}
          cookies={this.state.cookies}
          buyFromShop={this.buyFromShop}
          amount_owned={this.state.amount_owned}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
  },
});
