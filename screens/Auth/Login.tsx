import {
  SafeAreaView,
  StyleSheet,
  Platform,
  TextInput,
  Alert,
} from "react-native";
import { Text, View } from "../../components/Themed";
import useColorScheme from "../../hooks/useColorScheme";
import { useState } from "react";
import BigColoredButton from "../../components/BigColoredButton";
import useUserStore from "../../store/userStore";

const Login = () => {
  const theme = useColorScheme();
  const [name, setName] = useState<string>("Yogesh");
  const [email, setEmail] = useState<string>("yogesh@bhawsar.dev");

  const setUser = useUserStore((state) => state.setUser);

  const submit = async () => {
    try {
      await setUser({
        name,
        email,
      });
    } catch (err) {
      Alert.alert("Please fill the details");
    }
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: theme === "dark" ? "#000" : "#fff",
          paddingTop: Platform.OS === "android" ? 32 : 0,
        },
      ]}
    >
      <View style={styles.loginHeaderView}>
        <Text style={styles.loginHeader}>Login</Text>
      </View>
      <View style={styles.inputView}>
        <View style={styles.labelAndInput}>
          <Text style={styles.label}>Enter Your Name</Text>
          <TextInput
            style={[
              styles.input,
              {
                color: theme === "dark" ? "#fff" : "#000",
                backgroundColor: theme === "dark" ? "#1E1E1E" : "#F2F2F2",
              },
            ]}
            textContentType="name"
            value={name}
            onChangeText={(e) => setName(e)}
            placeholder="Name"
            placeholderTextColor={theme === "dark" ? "#bcbcbc" : "#6b7280"}
            selectionColor={theme === "dark" ? "#d1d5db" : "#BDBDBD"}
            clearButtonMode="while-editing"
          />
        </View>
        <View style={styles.labelAndInput}>
          <Text style={styles.label}>Enter Your Email</Text>
          <TextInput
            style={[
              styles.input,
              {
                color: theme === "dark" ? "#fff" : "#000",
                backgroundColor: theme === "dark" ? "#1E1E1E" : "#F2F2F2",
              },
            ]}
            textContentType="emailAddress"
            value={email}
            onChangeText={(e) => setEmail(e)}
            placeholder="Email"
            placeholderTextColor={theme === "dark" ? "#bcbcbc" : "#6b7280"}
            selectionColor={theme === "dark" ? "#d1d5db" : "#BDBDBD"}
            clearButtonMode="while-editing"
          />
        </View>
        <View style={styles.labelAndInput}>
          <BigColoredButton
            text="Submit"
            onPress={submit}
            disabled={name?.length === 0 && email?.length === 0}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  loginHeader: {
    fontSize: 36,
    fontWeight: "700",
  },
  loginHeaderView: {
    padding: 16,
  },
  input: {
    fontSize: 16,
    paddingVertical: 16,
    paddingHorizontal: 16,
    alignItems: "center",
    borderRadius: 8,
  },
  inputView: {
    paddingHorizontal: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    paddingVertical: 8,
  },
  labelAndInput: {
    paddingTop: 8,
  },
});
