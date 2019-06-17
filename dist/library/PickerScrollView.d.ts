import React from "react";
import { Animated } from "react-native";
import { IObservableValue } from "mobx/lib/types/observablevalue";
export declare type Props = {
    renderItem: (datas: any[], data: any, index: number, currentIndex: number, animatedValue: Animated.Value) => JSX.Element;
    datas: Array<any>;
    itemHeight: number;
    style: any;
    lineStyle: any;
    total: number;
    defaultIndex: number;
    onChange: (index: number) => void;
};
export default class PickerScrollView extends React.Component<Props> {
    fillHeight: number;
    currentIndex: IObservableValue<number>;
    scrollView: any;
    animatedValue: Animated.Value;
    scrollTimeout: any;
    constructor(props: any);
    componentDidMount(): void;
    componentWillUnmount(): void;
    _calculateFillHeight: () => void;
    _onMomentumScrollBegin: () => void;
    _onMomentumScrollEnd: ({ nativeEvent }: {
        nativeEvent: any;
    }) => void;
    _onScrollEndDrag: ({ nativeEvent }: {
        nativeEvent: any;
    }) => void;
    _calculateIndex: (nativeEvent: any) => void;
    _scrollToIndex: (index: any, animated?: boolean) => void;
    render(): JSX.Element;
}
