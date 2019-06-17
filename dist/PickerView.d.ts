import React from "react";
import { Props as PickerScrollProps } from "./library/PickerScrollView";
declare type Props = Omit<PickerScrollProps, 'renderItem' | 'itemHeight' | 'lineStyle' | 'total'> & {
    activeTextSize?: number;
    inactiveTextSize?: number;
    itemHeight?: number;
    lineStyle?: any;
    total?: number;
    textColor?: string;
};
export default class PickerView extends React.Component<Props> {
    _renderItem: (datas: any, data: any, index: any, currentIndex: any, animatedValue: any) => JSX.Element;
    render(): JSX.Element;
}
export {};
