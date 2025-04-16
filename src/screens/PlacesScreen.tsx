import { Suspense, useCallback, useEffect, useState } from 'react';
import { FlatList, Keyboard, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import useSWR from 'swr';

import { RootStackScreenProps } from '../routes';
import { usePlaceState } from '../hooks/usePlaceState';
import DebounceInput from '../components/DebounceInput';
import Loader from '../components/Loader';
import { GooglePlaces, GooglePlacesAutocompleteResponse } from '../utils/model/GooglePlaces';
import { AppConfig } from '../utils/config';
import Dropdown from '../components/Dropdown';
import { fetcher } from '../utils/config/fetcher';
import { PlacesActions } from '../contexts/places/action';
import { useFocusEffect } from '@react-navigation/native';

interface Props extends RootStackScreenProps<'Places'> {}

const PlacesScreen: React.FC<Props> = ({ navigation, route }) => {
    const [hideHistory, setHideHistory] = useState(false);
    const [url, setUrl] = useState<string>();
    const [placesDetailUrl, setPlacesDetailUrl] = useState<string>();
    const [place, setPlace] = useState<GooglePlaces>();
    const { dispatch, state } = usePlaceState();
    const { data } = useSWR<GooglePlacesAutocompleteResponse>(url, fetcher);
    const { data: placeDetail, isLoading } = useSWR(placesDetailUrl, fetcher);

    const onSearchChange = (value: string) => {
        const apiUrl = AppConfig.API_URL(value);
        setUrl(apiUrl);
    };

    const onPlaceSelect = (place: GooglePlaces) => {
        setUrl('');
        setPlace(place);
        setPlacesDetailUrl(AppConfig.GOOGLE_PLACE_DETAIL_API_URL(place.place_id));
    };

    useFocusEffect(
        useCallback(() => {
            const hideSubscription = Keyboard.addListener('keyboardDidShow', () => {
                setHideHistory(true);
            });
            const showSubscription = Keyboard.addListener('keyboardDidHide', () => {
                setHideHistory(false);
            });

            return () => {
                hideSubscription.remove();
                showSubscription.remove();
            };
        }, []),
    );

    useEffect(() => {
        if (place && placeDetail) {
            const newObj: GooglePlaces = { ...place, details: placeDetail.result.geometry };
            setPlace(newObj);
            dispatch({ type: PlacesActions.ADD_PLACE, payload: newObj });
            navigation.goBack();
        }
    }, [placeDetail]);

    const onLoadPlaceFromHistory = (item: GooglePlaces) => {
        dispatch({ type: PlacesActions.SELECT_PLACE, payload: item });
        navigation.goBack();
    };

    const onRenderHistory = ({ item }: { item: GooglePlaces }) => {
        return (
            <Pressable onPress={() => onLoadPlaceFromHistory(item)}>
                <View style={styles.historyItemView}>
                    <Text style={styles.historyItemTitle}>{item.structured_formatting.main_text}</Text>
                    <Text style={styles.historyItemDescription}>{item.description}</Text>
                </View>
            </Pressable>
        );
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {isLoading && <Loader />}
            <View style={styles.container}>
                <DebounceInput
                    placeholder="Please enter the keyword here for search"
                    onValueChange={onSearchChange}
                    style={styles.searchInput}
                    placeholderTextColor={'#a0a0a0'}
                />

                {data && <Dropdown data={data.predictions} onPlaceSelect={onPlaceSelect} />}

                {!hideHistory && (
                    <>
                        <Text style={styles.historyTitle}>HISTORY</Text>
                        <FlatList data={state.places} keyExtractor={item => item.place_id} renderItem={onRenderHistory} />
                    </>
                )}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: '3%',
    },
    searchInput: {
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 5,
        padding: 10,
        color: '#000',
    },
    historyTitle: {
        paddingVertical: 10,
        fontSize: 15,
        fontWeight: 'bold',
        color: '#000',
    },
    historyItemView: {
        flexDirection: 'column',
        paddingHorizontal: 12,
        paddingVertical: 8,
        elevation: 1,
        borderRadius: 2,
        marginBottom: 10
    },
    historyItemTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000',
    },
    historyItemDescription: {
        fontSize: 14,
        color: '#000',
    },
});

export default PlacesScreen;
