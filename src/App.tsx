import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RootStackParamList } from './routes';
import HomeScreen from './screens/HomeScreen';
import PlacesScreen from './screens/PlacesScreen';
import { Text } from '@react-navigation/elements';

function App() {
    const Stack = createNativeStackNavigator<RootStackParamList>();

    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName='Home'>
                    <Stack.Screen
                        name='Home'
                        component={HomeScreen}
                        options={({ navigation }) => (
                            { 
                                title: 'Maps',
                                headerTitleAlign: 'center',
                                headerRight: () => (
                                    <Text style={styles.btnRight} onPress={() => navigation.navigate("Places")}>Places</Text>
                                )
                            }
                        )}
                    />

                    <Stack.Screen
                        name='Places'
                        component={PlacesScreen}
                        options={{
                            title: 'Places',
                            headerTitleAlign: 'center',
                        }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    btnRight: {
        fontSize: 13,
    },
});

export default App;
