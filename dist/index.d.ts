import * as React from "react";
import { TextStyle, ViewStyle, ImageStyle, StyleSheet } from "react-native";
declare type IStyle = TextStyle | ViewStyle | ImageStyle;
declare type IFunctionalStyle<T, K> = (theme: T, optionalObject: K) => IStyle;
export interface ThemeStyle<T, K = {}> {
    [key: string]: IStyle | IFunctionalStyle<T, K>;
}
declare type StyleType<O> = StyleSheet.NamedStyles<any> | StyleSheet.NamedStyles<O>;
interface IStyles<K> {
    [key: string]: StyleType<K>;
}
/**
 * Configure the theme by using a context
 */
export declare function configureTheme<T>(context: React.Context<T>): <O extends IStyles<{}>, T_1>(styles: O, params?: T_1 | undefined) => { [P in keyof O]: StyleSheet.NamedStyles<any>; };
export {};
