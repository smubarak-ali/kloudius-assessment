import React, { FC, PropsWithChildren, useEffect, useState } from 'react';
import { TextInput, TextInputProps } from 'react-native';

interface Props extends TextInputProps {
    onValueChange?: (value: string) => void;
}

const DebounceInput: FC<Props & PropsWithChildren> = props => {
    const [inputValue, setInputValue] = useState<string>();
    const [debounceInputValue, setDebouncedInputValue] = useState<string>();

    const handleInputChange = (value: string) => {
        setInputValue(value);
    };

    useEffect(() => {
        const timeoutId = setTimeout(() => setDebouncedInputValue(inputValue), 800);

        return () => clearTimeout(timeoutId);
    }, [inputValue]);

    useEffect(() => {
        if (debounceInputValue) {
            props.onValueChange?.(debounceInputValue);
        }
    }, [debounceInputValue]);

    return (
        <TextInput
            value={inputValue}
            onChangeText={handleInputChange}
            placeholderTextColor={'#000'}
            style={[{ color: '#000' }, props.style]}
            {...props}
        />
    );
};

export default DebounceInput;
