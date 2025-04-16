import { FC, Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { Alert, Pressable, Text, PermissionsAndroid, StyleSheet, useWindowDimensions, View, InteractionManager } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation, { GeolocationResponse } from '@react-native-community/geolocation';
import { SafeAreaView } from 'react-native-safe-area-context';

import { RootStackScreenProps } from '../routes';
import { usePlaceState } from '../hooks/usePlaceState';

interface Props extends RootStackScreenProps<'Home'> {}

const HomeScreen: FC<Props> = ({ navigation, route }) => {
    const LATITUDE_DELTA = 0.6;
    const { width, height } = useWindowDimensions();
    const [position, setPosition] = useState<GeolocationResponse>();
    const { state } = usePlaceState();
    const mapRef = useRef<MapView>(null);

    const getCurrentPosition = () => {
        Geolocation.setRNConfiguration({ locationProvider: 'playServices', skipPermissionRequests: true });
        Geolocation.getCurrentPosition(
            pos => setPosition(pos),
            error => Alert.alert('GetCurrentPosition Error', error.message),
            {
                enableHighAccuracy: true,
            },
        );
    };

    const requestCameraPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
                title: 'Access Location Permission',
                message: 'We need the access to the current location, so we can show on the map.',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
            });

            return granted === PermissionsAndroid.RESULTS.GRANTED;
        } catch (err) {
            console.warn(err);
        }
    };

    useFocusEffect(
        useCallback(() => {
            const task = InteractionManager.runAfterInteractions(() => {
                async function checkPermission() {
                    const hasCoarseAccessPermission = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
                    if (!hasCoarseAccessPermission) {
                        const granted = await requestCameraPermission();
                        if (!granted) {
                            Alert.alert('Permission denied', 'Location permission is required to use this feature.');
                        }
                    }

                    getCurrentPosition();
                }

                checkPermission();
            });

            return () => task.cancel();
        }, []),
    );

    useEffect(() => {
        if (state.selectedPlace && state.selectedPlace.details && mapRef) {
            mapRef.current?.animateToRegion(
                {
                    latitude: state.selectedPlace.details.location.lat,
                    longitude: state.selectedPlace.details.location.lng,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LATITUDE_DELTA * (width / height),
                },
                700,
            );
        }
    }, [state.selectedPlace]);

    const onPlacesPress = () => {
        navigation.navigate('Places');
    };

    return (
        <SafeAreaView style={styles.container}>
            {position && (
                <MapView
                    ref={mapRef}
                    style={styles.map}
                    initialRegion={{
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LATITUDE_DELTA * (width / height),
                    }}>
                    {state.selectedPlace && state.selectedPlace.details && (
                        <Marker
                            title={state.selectedPlace.structured_formatting.main_text}
                            description={state.selectedPlace.description}
                            coordinate={{
                                latitude: state.selectedPlace.details.location.lat,
                                longitude: state.selectedPlace.details.location.lng,
                            }}></Marker>
                    )}
                </MapView>
            )}

            <Pressable onPress={onPlacesPress} style={styles.navBtn}>
                <Text style={styles.navBtnText}>Search Place</Text>
            </Pressable>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    navBtn: {
        position: 'absolute',
        bottom: 25,
        backgroundColor: '#B9D9EB',
        padding: 10,
        width: '40%',
        borderRadius: 50,
    },
    navBtnText: {
        fontSize: 16,
        textAlign: 'center',
        color: '#000',
    },
});

export default HomeScreen;
