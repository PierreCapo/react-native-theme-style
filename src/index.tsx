import * as React from "react";
import { TextStyle, ViewStyle, ImageStyle, StyleSheet } from "react-native";

// Define the style type for the style object
type IStyle = TextStyle | ViewStyle | ImageStyle;
type IFunctionalStyle<T, K> = (theme: T, optionalObject: K) => IStyle;

// Export the type for the style object
export interface ThemeStyle<T, K = {}> {
  [key: string]: IStyle | IFunctionalStyle<T, K>;
}

// Define the type for the function
type StyleType<O> = StyleSheet.NamedStyles<any> | StyleSheet.NamedStyles<O>;
interface IStyles<K> {
  [key: string]: StyleType<K>;
}
/**
 * Configure the theme by using a context
 */
export function configureTheme<T>(context: React.Context<T>) {
  return function useTheme<O extends IStyles<React.ContextType<any>>, T>(
    styles: O,
    params?: T
  ): { [P in keyof O]: StyleSheet.NamedStyles<any> } {
    const styling = StyleSheet.create(styles);
    const theme = React.useContext(context);

    const handleProperties = {
      get: (obj: any, prop: string) =>
        typeof obj[prop] === "function" ? obj[prop](theme, params) : obj[prop]
    };

    return new Proxy(styling, handleProperties);
  };
}
