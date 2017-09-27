//@flow

import {
    StyleSheet,
} from 'react-native'

export default StyleSheet.create({
    scrollView: {
        height: 200,
        backgroundColor: 'red'
    },
    lineStyle: {
        position: 'absolute',
        left: 0,
        right: 0,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: 'gray'
    }
})