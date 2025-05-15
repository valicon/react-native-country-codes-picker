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
    
    // Handle all numeric properties
    const numericProps = [
        'borderRadius',
        'borderWidth',
        'borderTopWidth',
        'borderBottomWidth',
        'borderLeftWidth',
        'borderRightWidth',
        'borderTopLeftRadius',
        'borderTopRightRadius',
        'borderBottomLeftRadius',
        'borderBottomRightRadius',
        'width',
        'height',
        'minWidth',
        'maxWidth',
        'minHeight',
        'maxHeight',
        'margin',
        'marginTop',
        'marginBottom',
        'marginLeft',
        'marginRight',
        'marginHorizontal',
        'marginVertical',
        'padding',
        'paddingTop',
        'paddingBottom',
        'paddingLeft',
        'paddingRight',
        'paddingHorizontal',
        'paddingVertical',
        'top',
        'bottom',
        'left',
        'right',
        'flex',
        'flexGrow',
        'flexShrink',
        'flexBasis',
        'aspectRatio',
        'zIndex',
        'opacity',
        'elevation',
        'shadowOpacity',
        'shadowRadius',
        'shadowOffset',
        'transform',
        'scale',
        'scaleX',
        'scaleY',
        'translateX',
        'translateY',
        'rotate',
        'rotateX',
        'rotateY',
        'perspective',
        'skewX',
        'skewY'
    ];

    numericProps.forEach(prop => {
        if (prop in processed) {
            processed[prop] = ensureNumeric(processed[prop]);
        }
    });

    // Handle shadowOffset separately since it's an object
    if (processed.shadowOffset) {
        processed.shadowOffset = {
            width: ensureNumeric(processed.shadowOffset.width),
            height: ensureNumeric(processed.shadowOffset.height)
        };
    }

    // Handle transform array separately
    if (Array.isArray(processed.transform)) {
        processed.transform = processed.transform.map(transform => {
            const newTransform = { ...transform };
            Object.keys(newTransform).forEach(key => {
                newTransform[key] = ensureNumeric(newTransform[key]);
            });
            return newTransform;
        });
    }
    
    return processed;
}

export const CountryButton = ({ item, name, style, ...rest }: ItemTemplateProps) => (
    <TouchableOpacity
        style={[processStyle(styles.countryButton), processStyle(style?.countryButtonStyles)]}
        testID="countryCodesPickerCountryButton"
        {...rest}
    >
        <Text style={[
            processStyle({
                flex: 0.2
            }),
            processStyle(style?.flag)
        ]}>
            {item?.flag}
        </Text>
        <Text style={[
            processStyle({
                flex: 0.3,
            }),
            processStyle(style?.dialCode)
        ]}>
            {item?.dial_code}
        </Text>
        <Text style={[
            processStyle({
                flex: 1
            }),
            processStyle(style?.countryName)
        ]}>
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
