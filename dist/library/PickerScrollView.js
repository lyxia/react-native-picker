var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import React from "react";
import { View, Platform, Animated } from "react-native";
import { observable } from "mobx";
import { observer } from "mobx-react";
import DefaultStyle from "../styles/defaultStyle";
let Item = class Item extends React.Component {
    render() {
        const { datas, itemHeight, renderItem, data, index, currentIndex, animatedValue } = this.props;
        return (React.createElement(View, { style: { height: itemHeight } }, renderItem(datas, data, index, currentIndex.get(), animatedValue)));
    }
};
Item = __decorate([
    observer
], Item);
export default class PickerScrollView extends React.Component {
    constructor(props) {
        super(props);
        this._calculateFillHeight = () => {
            const { itemHeight, total } = this.props;
            this.fillHeight = (total - 1) * 0.5 * itemHeight;
        };
        this._onMomentumScrollBegin = () => {
            this.scrollTimeout && clearTimeout(this.scrollTimeout);
        };
        this._onMomentumScrollEnd = ({ nativeEvent }) => {
            this._calculateIndex(nativeEvent);
        };
        this._onScrollEndDrag = ({ nativeEvent }) => {
            this._calculateIndex(nativeEvent);
        };
        this._calculateIndex = nativeEvent => {
            const { contentOffset } = nativeEvent;
            const offsetY = contentOffset.y;
            const { itemHeight } = this.props;
            const index = offsetY / itemHeight;
            this._scrollToIndex(Math.round(index));
        };
        this._scrollToIndex = (index, animated = true) => {
            const { datas, itemHeight } = this.props;
            if (index < 0 || index >= datas.length)
                return;
            if (Platform.OS === "ios") {
                this.currentIndex.set(index);
                this.props.onChange(index);
            }
            else {
                this.scrollTimeout && clearTimeout(this.scrollTimeout);
                this.scrollTimeout = setTimeout(() => {
                    this.scrollView && this.scrollView.scrollTo({ y: index * itemHeight, animated: animated });
                    this.currentIndex.set(index);
                    this.props.onChange(index);
                }, 0);
            }
        };
        this._calculateFillHeight();
        this.currentIndex = observable(this.props.defaultIndex);
        this.animatedValue = new Animated.Value(39);
    }
    componentDidMount() {
        // this._scrollToIndex(this.props.defaultIndex, false);
    }
    componentWillUnmount() {
        this.scrollTimeout && clearTimeout(this.scrollTimeout);
    }
    render() {
        const { datas, style, lineStyle, itemHeight, total, defaultIndex } = this.props;
        const height = total * itemHeight;
        return (React.createElement(View, { style: [DefaultStyle.scrollView, style, { height: height }] },
            React.createElement(Animated.ScrollView, { showsVerticalScrollIndicator: false, onMomentumScrollBegin: this._onMomentumScrollBegin, onMomentumScrollEnd: this._onMomentumScrollEnd, onScrollEndDrag: this._onScrollEndDrag, snapToInterval: itemHeight, snapToAlignment: "start", ref: scrollView => {
                    if (scrollView) {
                        this.scrollView = scrollView ? scrollView.getNode() : null;
                        this._scrollToIndex(this.props.defaultIndex, false);
                    }
                }, contentOffset: { x: 0, y: defaultIndex * itemHeight }, scrollEventThrottle: Platform.select({ ios: 8, android: 16 }), onScroll: Animated.event([
                    {
                        nativeEvent: { contentOffset: { y: this.animatedValue } }
                    }
                ], {
                    useNativeDriver: false,
                }) },
                React.createElement(View, { style: { height: this.fillHeight } }),
                datas.map((data, index) => {
                    return (React.createElement(Item, Object.assign({}, this.props, { data: data, index: index, currentIndex: this.currentIndex, key: index, animatedValue: this.animatedValue })));
                }),
                React.createElement(View, { style: { height: this.fillHeight } })),
            React.createElement(View, { pointerEvents: "none", style: [
                    DefaultStyle.lineStyle,
                    lineStyle,
                    {
                        height: itemHeight,
                        top: this.fillHeight
                    }
                ] })));
    }
}
//# sourceMappingURL=PickerScrollView.js.map