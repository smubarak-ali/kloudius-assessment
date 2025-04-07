import { ScrollView, StyleSheet, TextInput } from 'react-native';
import { RootStackScreenProps } from '../routes';

interface Props extends RootStackScreenProps<'Places'> {}

const PlacesScreen: React.FC<Props> = ({ navigation, route }) => {
    return (
        <>
            <ScrollView style={styles.container}>
                <TextInput placeholder="Type place name here..." />
            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});

export default PlacesScreen;
