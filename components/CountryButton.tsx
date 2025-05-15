import React from 'react';
import { Text, TouchableOpacity, ViewStyle } from "react-native";
import { ItemTemplateProps } from "../types/Types";

function ensureNumeric(value: string | number | undefined | null): number | undefined {
    if (value === undefined || value === null) return undefined;
    const num = Number(value);
    return isNaN(num) ? undefined : num;
}

function processStyle(style: ViewStyle | undefined): ViewStyle {
    if (!style) return {};
    const processed = { ...style };
    
    processed.borderRadius = ensureNumeric(processed.borderRadius);
    processed.borderWidth = ensureNumeric(processed.borderWidth);
    processed.borderTopWidth = ensureNumeric(processed.borderTopWidth);
    processed.borderBottomWidth = ensureNumeric(processed.borderBottomWidth);
    processed.borderLeftWidth = ensureNumeric(processed.borderLeftWidth);
    processed.borderRightWidth = ensureNumeric(processed.borderRightWidth);
    processed.borderTopLeftRadius = ensureNumeric(processed.borderTopLeftRadius);
    processed.borderTopRightRadius = ensureNumeric(processed.borderTopRightRadius);
    processed.borderBottomLeftRadius = ensureNumeric(processed.borderBottomLeftRadius);
    processed.borderBottomRightRadius = ensureNumeric(processed.borderBottomRightRadius);
    
    return processed;
}

export const CountryButton = ({ item, name, style, ...rest }: ItemTemplateProps) => (
    <TouchableOpacity
        style={[processStyle(styles.countryButton), processStyle(style?.countryButtonStyles)]}
        testID="countryCodesPickerCountryButton"
        {...rest}
    >
        <Text style={[
            {
                flex: 0.2
            },
            style?.flag
        ]}>
            {item?.flag}
        </Text>
        <Text style={[{
            flex: 0.3,
        }, style?.dialCode]}>
            {item?.dial_code}
        </Text>
        <Text style={[{
            flex: 1
        }, style?.countryName]}>
            {name}
        </Text>
    </TouchableOpacity>
);

type StyleKeys = 'countryButton';

const styles: { [key in StyleKeys]: ViewStyle } = {
    countryButton: {
        paddingVertical: 10,
        backgroundColor: '#f5f5f5',
        width: '100%',
        height: 50,
        paddingHorizontal: 25,
        alignItems: 'center',
        marginVertical: 2,
        flexDirection: 'row',
        borderRadius: 10,
    },
};
