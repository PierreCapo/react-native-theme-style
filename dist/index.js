import * as React from "react";
import { StyleSheet } from "react-native";
/**
 * Configure the theme by using a context
 */
export function configureTheme(context) {
    return function useTheme(styles, params) {
        var styling = StyleSheet.create(styles);
        var theme = React.useContext(context);
        var handleProperties = {
            get: function (obj, prop) {
                return typeof obj[prop] === "function" ? obj[prop](theme, params) : obj[prop];
            }
        };
        return new Proxy(styling, handleProperties);
    };
}
//# sourceMappingURL=index.js.map