import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  FlatList,
  Button,
} from 'react-native';

export default class shop extends React.Component {
  state = {
    refresh: false,
  };

  buy = cost => {
    if (this.props.cookies > cost) {
      this.props.buyFromShop(cost);
      this.refresh()
    }
  };

  refresh = () => this.setState({ refresh: !this.state.refresh })

  render() {
    return (
      <View>
        <FlatList
          data={this.props.shops}
          extraData={this.state.refresh}
          keyExtractor={item => item.cost}
          renderItem={({ item }) => (
            <ListItem
              cost={item.cost}
              clicks_per_second={item.clicks_per_second}
              id={item.id}
              buy={this.buy}
              amount_owned={this.props.amount_owned}
            />
          )}
        />
      </View>
    );
  }
}

class ListItem extends React.Component {
  render() {
    return (
      <TouchableOpacity onPress={() => this.props.buy(this.props.cost)}>
        <View style={styles.container}>
          <Text style={styles.text}>
            Cost: ${this.props.cost}, Clicks Per Second:{' '}
            {this.props.clicks_per_second}
          </Text>
          <Text style={styles.text}>
            Amount Owned: {this.props.amount_owned[this.props.id]}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    textAlign: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: 15,
  },
});
