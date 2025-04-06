import { FC, useCallback, useState } from 'react';
import { Alert, Pressable, Text, PermissionsAndroid, StyleSheet, useWindowDimensions, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import MapView from 'react-native-maps';
import Geolocation, { GeolocationResponse } from '@react-native-community/geolocation';

import { RootStackScreenProps } from '../routes';

interface Props extends RootStackScreenProps<'Home'> {}

const HomeScreen: FC<Props> = ({ navigation, route }) => {
    const LATITUDE_DELTA = 0.0922;
    const { width, height } = useWindowDimensions();
    const [position, setPosition] = useState<GeolocationResponse>();

    const getCurrentPosition = () => {
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
        }, []),
    );

    const onPlacesPress = () => {
        navigation.navigate('Places');
    }

    return (
        <View style={styles.container}>
            {position && (
                <>
                    <MapView
                        style={{ width: '100%', height: '100%' }}
                        region={{
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                            latitudeDelta: LATITUDE_DELTA,
                            longitudeDelta: LATITUDE_DELTA * (width / height),
                        }}
                    />

                    <Pressable onPress={onPlacesPress} style={styles.navBtn}>
                        <Text style={styles.navBtnText}>Search Place</Text>
                    </Pressable>
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    navBtn: {
        position: 'absolute',
        bottom: 25,
        backgroundColor: '#B9D9EB',
        padding: 10,
        width: "40%",
        borderRadius: 50,
    },
    navBtnText: {
        fontSize: 16,
        textAlign: 'center',
        color: '#000',
    }
});

export default HomeScreen;
