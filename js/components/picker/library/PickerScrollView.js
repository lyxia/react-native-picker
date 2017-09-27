//@flow

import React, {Component} from 'react'

import {
    ScrollView,
    StyleSheet,
    View,
    Platform,
} from 'react-native'

import {observable} from 'mobx'
import {observer} from 'mobx-react'

import DefaultStyle from '../styles/defaultStyle'

import {
    PickerScrollViewProps
} from '../flow/Picker'

@observer
class Item extends Component {
    render() {
        const {itemHeight, renderItem, data, index, currentIndex} = this.props

        return (
            <View style={{height: itemHeight}}>
                {renderItem(data, index, currentIndex.get())}
            </View>
        )
    }
}

export default class PickerScrollView extends Component {
    props: PickerScrollViewProps
    fillHeight: number
    currentIndex = observable(0)
    scrollView: any

    scrollTimeout: any

    constructor() {
        super(...arguments)

        this._calculateFillHeight()
    }

    componentDidMount() {
        this._scrollToIndex(this.props.defaultIndex, false)
    }

    componentWillUnmount() {
        this.scrollTimeout && clearTimeout(this.scrollTimeout)
    }

    _calculateFillHeight = () => {
        const {itemHeight, total} = this.props
        this.fillHeight = (total - 1) * 0.5 * itemHeight
    }

    _onMomentumScrollBegin = () => {
        this.scrollTimeout && clearTimeout(this.scrollTimeout)
    }

    _onMomentumScrollEnd = ({nativeEvent}) => {
        this._calculateIndex(nativeEvent)
    }

    _onScrollEndDrag = ({nativeEvent}) => {
        this._calculateIndex(nativeEvent)
    }

    _calculateIndex = (nativeEvent) => {
        const {contentOffset} = nativeEvent
        const offsetY = contentOffset.y
        const {itemHeight} = this.props
        const index = offsetY / itemHeight
        this._scrollToIndex(Math.round(index))
    }

    _scrollToIndex = (index, animated = true) => {
        const {datas, itemHeight} = this.props
        if(index < 0 || index >= datas.length) return

        if(Platform.OS === 'ios') {
            this.currentIndex.set(index)
        } else {
            this.scrollTimeout && clearTimeout(this.scrollTimeout)
            this.scrollTimeout = setTimeout(() => {
                this.scrollView.scrollTo({y: index * itemHeight, animated: animated})
                this.currentIndex.set(index)
            }, 0)
        }
    }

    render() {
        const {
            datas,
            style,
            lineStyle,
            itemHeight,
            total,
        } = this.props
        const height = total * itemHeight
        return (
            <View style={[
                DefaultStyle.scrollView,
                style,
                {height: height}
            ]}>
                <ScrollView
                    showsVerticalScrollIndicator = {false}
                    onMomentumScrollBegin = {this._onMomentumScrollBegin}
                    onMomentumScrollEnd = {this._onMomentumScrollEnd}
                    onScrollEndDrag = {this._onScrollEndDrag}
                    snapToInterval = {itemHeight}
                    snapToAlignment = {'start'}
                    ref = {(scrollView)=>{this.scrollView = scrollView}}
                >
                    <View style={{height: this.fillHeight}}/>
                    {
                        datas.map((data, index) => {
                            return (
                                <Item
                                    {...this.props}
                                    data = {data}
                                    index = {index}
                                    currentIndex = {this.currentIndex}
                                    key={index}
                                />
                            )
                        })
                    }
                    <View style={{height: this.fillHeight}}/>
                </ScrollView>
                <View
                    pointerEvents = 'none'
                    style={[
                        DefaultStyle.lineStyle,
                        lineStyle,
                        {
                            height: itemHeight,
                            top: this.fillHeight,
                        }
                       ]}/>
            </View>
        )
    }
}
