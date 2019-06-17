import React from "react";
import { StyleSheet, View, Animated, Platform } from "react-native";
import PickerScrollView from "./library/PickerScrollView";
import LinearGradient from "react-native-linear-gradient";
export default class PickerView extends React.Component {
    constructor() {
        super(...arguments);
        this._renderItem = (datas, data, index, currentIndex, animatedValue) => {
            let style = { color: this.props.textColor || "#2B3547" };
            const inputRange = datas.map((x, i) => i * 39);
            const sizeRange = inputRange.map((v, i) => {
                if (i === index) {
                    return this.props.activeTextSize || 18;
                }
                return this.props.inactiveTextSize || 14;
            });
            const fontSize = animatedValue.interpolate({
                inputRange,
                outputRange: sizeRange,
                extrapolate: "clamp"
            });
            return (React.createElement(View, { style: {
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center"
                } },
                React.createElement(Animated.Text, { allowFontScaling: false, style: [
                        style,
                        {
                            fontSize
                        }
                    ] }, data)));
        };
    }
    render() {
        const total = this.props.total | 5;
        const itemRadio = Number((1 / total).toFixed(2));
        const lineStart = Number(((1 - itemRadio) / 2).toFixed(2));
        const lineEnd = lineStart + itemRadio;
        return (React.createElement(View, { style: this.props.style },
            React.createElement(PickerScrollView, Object.assign({ renderItem: this._renderItem, itemHeight: 39, lineStyle: { borderColor: "#EDEDED" }, total: total }, this.props)),
            React.createElement(View, { style: [StyleSheet.absoluteFill, { backgroundColor: "transparent" }], pointerEvents: "none" }, Platform.select({
                ios: (React.createElement(LinearGradient, { locations: [0, lineStart, lineEnd], colors: ["#ffffffff", "#ffffff00", "#ffffff00", "#ffffffff"], style: { flex: 1 } })),
                android: (React.createElement(LinearGradient, { locations: [0, lineStart, lineEnd, 1], colors: ["white", "rgba(0,0,0,0)", "rgba(0,0,0,0)", "white"], style: { flex: 1 } }))
            }))));
    }
}
//# sourceMappingURL=PickerView.js.map