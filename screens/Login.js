import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";
import { Button, TextInput } from "react-native-paper";

const Login = ({ navigation }) => {
  const [text, setText] = useState("");
  const [password, setPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState(true);

  const handleLogin = () => {
    navigation.navigate("drawer");
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ fontSize: 40, fontWeight: "bold", marginBottom: "15%" }}>
        登陆
      </Text>
      <TextInput
        label="手机号"
        onChangeText={setText}
        value={text}
        placeholder="输入手机号"
        style={{ width: "90%", marginTop: "5%" }}
        right={<TextInput.Affix text="/11" />}
      />
      <TextInput
        secureTextEntry={passwordValid ? true : false}
        label="密码"
        value={password}
        onChangeText={setPassword}
        type="password"
        onChange={(e) => setText(e.target.value)}
        placeholder="输入密码"
        style={{ width: "90%", marginTop: "5%" }}
        right={
          <TextInput.Icon
            onPress={() => setPasswordValid(!passwordValid)}
            name={passwordValid ? "eye" : "eye-off"}
          />
        }
      />
      <Button
        mode="contained"
        color="#fff"
        icon="account-multiple-check"
        dark={true}
        style={{
          marginTop: "15%",
          width: "50%",
          color: "white",
          backgroundColor: "green",
        }}
        onPress={() => handleLogin()}
      >
        登陆
      </Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Login;

