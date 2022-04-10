import React, { useEffect, useState } from "react";
import { View, StyleSheet, ImageBackground, StatusBar } from "react-native";
import { Button, Text, Caption } from "react-native-paper";
import { GetFromStore, CheckStoreValid } from "../components/SecureStore";
import AuthBack from "../assets/authback.jpg";

const Auth = ({ navigation }) => {
  useEffect(() => {
    let storeValid = CheckStoreValid();
    console.log("storeValid", storeValid);
    checkAuth();
  }, []);

  const checkAuth = () => {
    GetFromStore("userInfo").then((userInfo) => {
      if (userInfo) {
        navigation.navigate("drawer");
      }
    });
  };

  return (
    <>
      <ImageBackground
        source={AuthBack}
        resizeMode="cover"
        style={styles.background}
      >
        <View style={styles.container}>
          <View style={styles.topics}>
            <Text
              style={{
                color: "white",
                fontSize: 50,
                fontWeight: "bold",
                letterSpacing: 15,
              }}
            >
              三湘银行
            </Text>
            <Text style={{ color: "gray", letterSpacing: 8, marginTop: 10 }}>
              BANK OF SANXIANG
            </Text>
          </View>
          <Button
            icon="feather"
            mode="contained"
            color={"#000"}
            style={styles.buttons}
            labelStyle={{
              fontSize: 16,
              fontWeight: "bold",
              letterSpacing: 6,
              color: "white",
            }}
            onPress={() => navigation.navigate("login")}
          >
            登陆
          </Button>
          <Button
            color={"#fff"}
            style={{
              width: "80%",
              height: 40,
              marginTop: "8%",
              borderRadius: 25,
              justifyContent: "center",
            }}
            mode="contained"
            labelStyle={{
              fontSize: 16,
              fontWeight: "bold",
              letterSpacing: 6,
            }}
            icon="account-key"
            onPress={() => navigation.navigate("register")}
          >
            注册
          </Button>
        </View>
      </ImageBackground>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.7)",
    alignItems: "center",
    color: "white",
    justifyContent: "center",
  },
  background: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  topics: {
    marginBottom: "20%",
    flex: 0.4,
    alignItems: "center",
    justifyContent: "center",
  },
  buttons: {
    marginVertical: "5%",
    width: "80%",
    borderRadius: 25,
    height: 45,
    justifyContent: "center",
  },
});

export default Auth;

