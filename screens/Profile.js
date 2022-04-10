import React, { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { Title, Caption, Text } from "react-native-paper";
import { orderAPI } from "../api";
import { GetFromStore } from "../components/SecureStore";
import Toast from "react-native-root-toast";
import Ionicons from "@expo/vector-icons/Ionicons";

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [start, setStart] = useState(0);
  const [data, setData] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    getUserInfo();
  }, []);

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      style={{ marginBottom: 5 }}
      onPress={() => updateList(index)}
    >
      <View
        style={{
          backgroundColor: "#fff",
          height: 90,
          width: "100%",
          alignItems: "center",
          flexDirection: "row",
          paddingHorizontal: 10,
          justifyContent: "space-between",
        }}
      >
        <View>
          <Text>{item.productName}</Text>
          <Caption>
            {new Date(item.orderCreateDate).toString().slice(0, 21)}
          </Caption>
          <Caption>订单编号：{item.stockOrderId}</Caption>
        </View>
        <View>
          <Text>{item.choosed}</Text>
          <Ionicons
            name={item.choosed ? "chevron-up-sharp" : "chevron-down-sharp"}
            size={25}
            color="grey"
          />
        </View>
      </View>
      {item.choosed && (
        <View
          style={{
            backgroundColor: "rgba(255,255,255,0.6)",
            borderTopWidth: 0.3,
            borderTopColor: "gray",
            height: 100,
            padding: 10,
          }}
        >
          <Text>订单状态：{item.orderStatus == 0 ? "未付款" : "已付款"}</Text>
          <Caption>产品ID：{item.productId}</Caption>
          <Caption>价格:{item.addSale}</Caption>
        </View>
      )}
    </TouchableOpacity>
  );

  const updateList = (index) => {
    let tempData = data;
    tempData[index].choosed = !data[index].choosed;
    setData(tempData);
    setUpdate(!update);
  };

  const getUserInfo = async () => {
    await GetFromStore("userInfo")
      .then((userInfo) => {
        setUserInfo(JSON.parse(userInfo));
        return JSON.parse(userInfo);
      })
      .then((json) => {
        getLatestOrder(json.userId, false);
      });
  };
  /**
   *
   * @param {*} userId
   * @param {*} init
   * @returns
   */
  const getLatestOrder = async (userId, init) => {
    if (init) {
      setStart(0);
      setData([]);
    } else {
      if (start % 10 !== 0) return;
    }
    setLoading(true);
    await fetch(
      orderAPI + `userId=${userInfo.userId}&page=${start}&pageSize=10`
    )
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        if (json.code == 200 && json.msg.length > 0) {
          for (let i = 0; i < json.msg.length; i++) {
            json.msg[i].choosed = false;
          }
          console.log("handled: ", json.msg);
          setData((prev) => prev.concat(json.msg));
          setStart(json.msg.length + start);
        } else {
          Toast.show("暂无数据.", {
            duration: Toast.durations.SHORT,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          height: 50,
          backgroundColor: "#fff",
          width: "100%",
          paddingLeft: 10,
          justifyContent: "center",
        }}
      >
        <Title>最近订单</Title>
      </View>
      <View
        style={{
          flex: 1,
          width: "100%",
          marginTop: 5,
        }}
      >
        <FlatList
          data={data}
          refreshing={loading}
          renderItem={renderItem}
          onRefresh={() => getLatestOrder(userInfo.userId, true)}
          onEndReached={() => getLatestOrder(userInfo.userId, false)}
          keyExtractor={(item) => item.stockOrderId + item.selected}
          extraData={update}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Profile;

