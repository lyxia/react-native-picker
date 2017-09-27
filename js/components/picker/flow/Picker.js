//@flow

import PropTypes from 'prop-types'

import {
    StyleSheet,
} from 'react-native'

type renderItemFunc = (data: any, index: number, currentIndex: number) => PropTypes.element

export type PickerScrollViewProps = {
    renderItem: renderItemFunc,
    datas: Array<any>,
    itemHeight: number,
    style: any,
    lineStyle: any,
    total: number,
    defaultIndex: number,

}