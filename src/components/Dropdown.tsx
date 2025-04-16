import { FC } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

import { GooglePlaces } from '../utils/model/GooglePlaces';

interface Props {
    data: GooglePlaces[];
    onPlaceSelect: (place: GooglePlaces) => void;
}

const Dropdown: FC<Props> = ({ data, onPlaceSelect }) => {
    const renderItem = ({ item }: { item: GooglePlaces }) => {
        return (
            <Pressable onPress={() => onSelect(item)} style={styles.item}>
                <Text style={{ color: '#000' }}>{item.description}</Text>
            </Pressable>
        );
    };

    const onSelect = (place: GooglePlaces) => onPlaceSelect(place);

    return (
        <FlatList
            contentContainerStyle={styles.dropdownContainer}
            data={data}
            keyExtractor={item => item.place_id}
            renderItem={renderItem}
        />
    );
};

const styles = StyleSheet.create({
    dropdownContainer: {
        position: 'relative',
        maxHeight: 300,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        elevation: 2,
        zIndex: 6,
    },
    item: {
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
});

export default Dropdown;
