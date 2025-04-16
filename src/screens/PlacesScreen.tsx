import { Suspense, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
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

interface Props extends RootStackScreenProps<'Places'> {}

const PlacesScreen: React.FC<Props> = ({ navigation, route }) => {
    const [url, setUrl] = useState<string>();
    const [placesDetailUrl, setPlacesDetailUrl] = useState<string>();
    const [place, setPlace] = useState<GooglePlaces>();
    const { dispatch } = usePlaceState();
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

    useEffect(() => {
        if (place && placeDetail) {
            const newObj: GooglePlaces = { ...place, details: placeDetail.result.geometry };
            setPlace(newObj);
            dispatch({ type: PlacesActions.ADD_PLACE, payload: newObj });
            navigation.goBack();
        }
    }, [placeDetail]);

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
});

export default PlacesScreen;
