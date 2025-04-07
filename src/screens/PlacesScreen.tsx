import { ScrollView, StyleSheet, Text } from 'react-native';

import { RootStackScreenProps } from '../routes';
import { usePlaceState } from '../hooks/usePlaceState';
import DebounceInput from '../components/DebounceInput';

interface Props extends RootStackScreenProps<'Places'> {}

const PlacesScreen: React.FC<Props> = ({ navigation, route }) => {
    const { dispatch, state } = usePlaceState();

    const onSearchChange = (value: string) => {
        console.log('Search value: ', value);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={{ color: "#000"}}>tTesting oiliansdlkfjalksdjf</Text>
            <DebounceInput placeholder="Please enter the keyword here for search" onValueChange={onSearchChange} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: '3%'
    },
});

export default PlacesScreen;
