import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, Text, View, TextInput } from "react-native";
import { Button, Caption } from "react-native-paper";

const Register = ({ navigation }) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [cardId, setCardId] = useState("");
  const [phone, setPhone] = useState("");
  const [provePassword, setProvePassword] = useState("");
  const [nameValid, setNameValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  //const [provePasswordValid, setProvePasswordValid] = useState(false);
  const [cardIdValid, setCardIdValid] = useState(false);
  const [phoneValid, setPhoneValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (loading) return;
    try {
      let data = {
        name: name,
        password: password,
        cardId: cardId,
        phone: phone,
      };
      setLoading(true);
      console.log(data);
      await fetch("***", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((res) => {
          console.log("result", res);
        })
        .finally((e) => {
          setLoading(false);
          navigation.navigate("drawer");
        });
    } catch (err) {}
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.items}>
          <Text style={styles.label}>手机号</Text>
          <TextInput
            keyboardType={"phone-pad"}
            clearButtonMode={"while-editing"}
            style={styles.textInput}
            value={phone}
            placeholder="手机号"
            onChangeText={setPhone}
            onBlur={() => setPhoneValid(true)}
          />
        </View>
        {phoneValid && phone.length !== 11 && (
          <Caption style={{ alignSelf: "flex-start", marginLeft: 100 }}>
            请输入正确的手机号
          </Caption>
        )}
        <View style={styles.items}>
          <Text style={styles.label}>身份证号</Text>
          <TextInput
            clearButtonMode={"while-editing"}
            keyboardType={"number-pad"}
            value={cardId}
            style={styles.textInput}
            placeholder="身份证号"
            onChangeText={setCardId}
            onBlur={() => setCardIdValid(true)}
          />
        </View>
        {cardIdValid && cardId.length !== 18 && (
          <Caption style={{ alignSelf: "flex-start", marginLeft: 100 }}>
            请输入正确的身份证号
          </Caption>
        )}
        <View style={styles.items}>
          <Text style={styles.label}>姓名</Text>
          <TextInput
            clearButtonMode={"while-editing"}
            style={styles.textInput}
            value={name}
            placeholder="姓名"
            onChangeText={setName}
            onBlur={() => setNameValid(true)}
          />
        </View>
        {nameValid && name.length <= 1 && (
          <Caption style={{ alignSelf: "flex-start", marginLeft: 100 }}>
            请输入正确的姓名
          </Caption>
        )}
        <View style={styles.items}>
          <Text style={styles.label}>密码</Text>
          <TextInput
            clearButtonMode={"while-editing"}
            style={styles.textInput}
            secureTextEntry={true}
            value={password}
            placeholder="密码"
            onChangeText={setPassword}
            onBlur={() => setPasswordValid(true)}
          />
        </View>
        {passwordValid && password.length < 6 && (
          <Caption style={{ alignSelf: "flex-start", marginLeft: 100 }}>
            密码必须大于6位
          </Caption>
        )}
        <View style={styles.items}>
          <Text style={styles.label}>确认密码</Text>
          <TextInput
            clearButtonMode={"while-editing"}
            secureTextEntry={true}
            value={provePassword}
            style={styles.textInput}
            placeholder="确认密码"
            onChangeText={setProvePassword}
          />
        </View>
        {provePassword !== password && (
          <Caption style={{ alignSelf: "flex-start", marginLeft: 100 }}>
            请输入正确的密码
          </Caption>
        )}
        <Button
          icon="account-check"
          loading={loading}
          disabled={
            !(
              name.length >= 2 &&
              phone.length == 11 &&
              cardId.length == 18 &&
              password.length >= 6 &&
              password == provePassword
            )
          }
          labelStyle={{ color: "white" }}
          style={{ width: "50%", marginTop: "5%" }}
          mode={"contained"}
          onPress={() => handleRegister()}
        >
          注册
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  items: {
    flexDirection: "row",
    height: 40,
    width: "90%",
    marginHorizontal: "5%",
    marginVertical: "3%",
    alignItems: "center",
  },
  label: {
    width: 60,
  },
  textInput: {
    marginLeft: "4%",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 4,
    flex: 1,
    height: 40,
    paddingHorizontal: "3%",
  },
  content: {
    width: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Register;

