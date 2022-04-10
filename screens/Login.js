import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { SaveToStore } from "../components/SecureStore";
import Toast from "react-native-root-toast";
import { loginAPI } from "../api";

const Login = ({ navigation }) => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState(true);
  const [loading, setLoading] = useState(false);
  const handleLogin = async () => {
    try {
      let data = {
        phone: phone,
        password: password,
      };
      setLoading(true);
      await fetch(loginAPI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.code == 200) {
            SaveToStore("userInfo", JSON.stringify(res.msg));
            Toast.show("登录成功.", {
              duration: Toast.durations.SHORT,
            });
            navigation.navigate("drawer");
          } else {
            Toast.show(
              "Request failed to verify. Maybe your phone or password typed wrong",
              {
                duration: Toast.durations.LONG,
              }
            );
          }
        })
        .finally((e) => {
          setLoading(false);
        });
    } catch (err) {
      console.log("error", err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ fontSize: 40, fontWeight: "bold", marginBottom: "15%" }}>
        登陆
      </Text>
      <TextInput
        label="手机号"
        onChangeText={setPhone}
        value={phone}
        type="phone"
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
        loading={loading}
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

