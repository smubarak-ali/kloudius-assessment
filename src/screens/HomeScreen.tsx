import { FC } from 'react';

import { RootStackScreenProps } from '../routes';
import { StyleSheet, View } from 'react-native';

interface Props extends RootStackScreenProps<"Home"> {}

const HomeScreen: FC<Props> = ({ navigation, route }) => {

    return (
        <View style={styles.container}>
        
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
});

export default HomeScreen;