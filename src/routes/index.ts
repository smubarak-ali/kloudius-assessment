import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
    Home: undefined;
    Places: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
    NativeStackScreenProps<RootStackParamList, T>;
