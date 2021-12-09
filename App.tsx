import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { Text } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Amplify, { Auth, DataStore } from "aws-amplify";
import { withAuthenticator } from "aws-amplify-react-native";
import config from "./src/aws-exports";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { User } from "./src/models";

Amplify.configure({
  ...config,
  Analytics: {
    disabled: true,
  },
});

function Test() {
  // useEffect(() => {
  // const fetchUser = async () => {
  // const user = await Auth.currentAuthenticatedUser();
  // const dbUser = await DataStore.query(User, user.attributes.sub);
  // console.log(user.attributes.sub);
  // Auth.signOut();
  // };
  // fetchUser();
  // }, []);

  const logOut = () => {
    Auth.signOut();
  };

  return (
    <>
      <Text>hello </Text>
      <Text>hello </Text>
      <Text style={{ fontSize: 40 }} onPress={logOut}>
        Logout
      </Text>
    </>
  );
}

function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        {/* <Test /> */}
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}

export default withAuthenticator(App);
// export default App;
