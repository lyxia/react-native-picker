import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import PickerScrollView from './js/components/picker/library/PickerScrollView'

export default class App extends React.Component {

    _renderItem = (data, index, currentIndex) => {
        let color = 'gray'
        if(index === currentIndex) {
            color = 'blue'
        }

        return (
            <View style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <Text style={{color: color}}>{data}</Text>
            </View>
        )
    }

  render() {
    return (
      <View style={styles.container}>
          <PickerScrollView
              renderItem = {this._renderItem}
              datas = {['1','2','3','4','1','2','3','4']}
              itemHeight = {30}
              style={{width: 200}}
              total={5}
              defaultIndex={3}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
