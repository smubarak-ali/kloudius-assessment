import { FC } from "react";
import { ActivityIndicator } from "react-native";

interface Props {}

const Loader: FC<Props> = () => {
    return <ActivityIndicator size="large" color="#000" />;
};

export default Loader;