import React from "react";

import { View, Platform, Animated } from "react-native";

import { observable, toJS } from "mobx";
import { observer } from "mobx-react";

import DefaultStyle from "../styles/defaultStyle";
import { IObservableValue } from "mobx/lib/types/observablevalue";


type ItemProps = {
  renderItem: (
    datas: any[],
    data: any,
    index: number,
    currentIndex: number,
    animatedValue: Animated.Value
  ) => JSX.Element;
  itemHeight: number;
  data: any;
  datas: any[];
  index: number;
  currentIndex: IObservableValue<number>;
  animatedValue: Animated.Value;
};

@observer
class Item extends React.Component<ItemProps> {
  render() {
    const {
      datas,
      itemHeight,
      renderItem,
      data,
      index,
      currentIndex,
      animatedValue
    } = this.props;

    return (
      <View style={{ height: itemHeight }}>
        {renderItem(datas, data, index, currentIndex.get(), animatedValue)}
      </View>
    );
  }
}

export type Props = {
  renderItem: (
    datas: any[],
    data: any,
    index: number,
    currentIndex: number,
    animatedValue: Animated.Value
  ) => JSX.Element;
  datas: Array<any>;
  itemHeight: number;
  style: any;
  lineStyle: any;
  total: number;
  defaultIndex: number;
  onChange: (index: number) => void,
};
export default class PickerScrollView extends React.Component<Props> {
  fillHeight: number;
  currentIndex: IObservableValue<number>;
  scrollView: any;
  animatedValue: Animated.Value;

  scrollTimeout: any;

  constructor(props) {
    super(props);

    this._calculateFillHeight();
    this.currentIndex = observable(this.props.defaultIndex)
    this.animatedValue = new Animated.Value(39)
  }

  componentDidMount() {
    // this._scrollToIndex(this.props.defaultIndex, false);
  }

  componentWillUnmount() {
    this.scrollTimeout && clearTimeout(this.scrollTimeout);
  }

  _calculateFillHeight = () => {
    const { itemHeight, total } = this.props;
    this.fillHeight = (total - 1) * 0.5 * itemHeight;
  };

  _onMomentumScrollBegin = () => {
    this.scrollTimeout && clearTimeout(this.scrollTimeout);
  };

  _onMomentumScrollEnd = ({ nativeEvent }) => {
    this._calculateIndex(nativeEvent);
  };

  _onScrollEndDrag = ({ nativeEvent }) => {
    this._calculateIndex(nativeEvent);
  };

  _calculateIndex = nativeEvent => {
    const { contentOffset } = nativeEvent;
    const offsetY = contentOffset.y;
    const { itemHeight } = this.props;
    const index = offsetY / itemHeight;
    this._scrollToIndex(Math.round(index));
  };

  _scrollToIndex = (index, animated = true) => {
    const { datas, itemHeight } = this.props;
    if (index < 0 || index >= datas.length) return;

    if (Platform.OS === "ios") {
      this.currentIndex.set(index);
      this.props.onChange(index)
    } else {
      this.scrollTimeout && clearTimeout(this.scrollTimeout);
      this.scrollTimeout = setTimeout(() => {
        this.scrollView && this.scrollView.scrollTo({ y: index * itemHeight, animated: animated });
        this.currentIndex.set(index);
        this.props.onChange(index)
      }, 0);
    }
  };

  render() {
    const { datas, style, lineStyle, itemHeight, total, defaultIndex } = this.props;
    const height = total * itemHeight;
    return (
      <View style={[DefaultStyle.scrollView, style, { height: height }]}>
        <Animated.ScrollView
          showsVerticalScrollIndicator={false}
          onMomentumScrollBegin={this._onMomentumScrollBegin}
          onMomentumScrollEnd={this._onMomentumScrollEnd}
          onScrollEndDrag={this._onScrollEndDrag}
          snapToInterval={itemHeight}
          snapToAlignment={"start"}
          ref={scrollView => {
            if(scrollView) {
              this.scrollView = scrollView ? scrollView.getNode() : null;
              this._scrollToIndex(this.props.defaultIndex, false);
            }
          }}
          contentOffset={{x: 0, y: defaultIndex * itemHeight}}
          scrollEventThrottle={Platform.select({ ios: 8, android: 16 })}
          onScroll={Animated.event(
            [
              {
                nativeEvent: { contentOffset: { y: this.animatedValue } }
              }
            ],
            {
              useNativeDriver: false,
            }
          )}
        >
          <View style={{ height: this.fillHeight }} />
          {datas.map((data, index) => {
            return (
              <Item
                {...this.props}
                data={data}
                index={index}
                currentIndex={this.currentIndex}
                key={index}
                animatedValue={this.animatedValue}
              />
            );
          })}
          <View style={{ height: this.fillHeight }} />
        </Animated.ScrollView>
        <View
          pointerEvents="none"
          style={[
            DefaultStyle.lineStyle,
            lineStyle,
            {
              height: itemHeight,
              top: this.fillHeight
            }
          ]}
        />
      </View>
    );
  }
}
