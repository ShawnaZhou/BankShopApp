import React, { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  FlatList,
} from "react-native";
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  IconButton,
  Divider,
  ActivityIndicator,
  Colors,
} from "react-native-paper";
import Toast from "react-native-root-toast";
import { useNavigation } from "@react-navigation/native";
import ProductDetail from "../components/ProductDetail";
import Products from "../components/Products";
import { DeleteFromStore, GetFromStore } from "../components/SecureStore";
import { stockAPI } from "../api";

const Home = () => {
  const navigation = useNavigation();
  const [isShow, setIsShow] = useState(true);
  const [productList, setProductList] = useState([]);
  const [start, setStart] = useState(0);
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState("");
  const [choosedItem, setChoosedItem] = useState({});
  useEffect(() => {
    getUserInfo();
    getProductList();
  }, []);

  const getUserInfo = async () => {
    GetFromStore("userInfo").then((userInfo) => {
      console.log(userInfo);
      setUserInfo(JSON.parse(userInfo));
    });
  };
  const getProductList = async () => {
    if (start % 5 !== 0) return;
    setLoading(true);
    await fetch(stockAPI + `page=${start}&pageSize=5`,{
      headers: {'Content-Type': 'application/json;charset=UTF-8'}
    })
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        console.log(json.msg);
        if (json?.code == 200 && json?.msg.length > 0) {
          setProductList((prev) => prev.concat(json.msg));
          setStart(json.msg.length + start);
          setChoosedItem(productList[0]);
        } else {
          Toast.show("暂无数据.", {
            duration: Toast.durations.SHORT,
          });
        }
      })
      .catch((err) => {
        consol.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const logOut = () => {
    DeleteFromStore("userInfo");
    navigation.navigate("auth");
  };

  const renderExtraContent = () => {
    return (
      <View
        style={{
          width: loading ? 100 : 0,
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
        }}
      >
        <ActivityIndicator animating={loading} color={Colors.red800} />
      </View>
    );
  };

  const renderItem = ({ item, index }) => (
    <Products productChoosed={handleProductChoosed} data={item} index={index} />
  );

  const handleProductChoosed = (index) => {
    console.log("INDEX:", index);
    setChoosedItem(productList[index]);
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scroll}>
        <Card>
          <Card.Title
            title={userInfo.userName}
            subtitle={userInfo.userPhone}
            left={(props) => <Avatar.Icon {...props} icon="folder" />}
            right={(props) => (
              <IconButton {...props} icon="logout" onPress={() => logOut()} />
            )}
          />
          {isShow && (
            <>
              <Card.Content>
                <Divider />
                <Paragraph>
                  lorem ipsum dolor sit amet, consectetur,lorem ipsum dolor sit
                  amet, consectetur
                </Paragraph>
              </Card.Content>
              <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
            </>
          )}
          <Card.Actions>
            <Button onPress={() => setIsShow(!isShow)}>
              {isShow ? "Ok" : "More"}
            </Button>
          </Card.Actions>
        </Card>
        <View style={styles.listHead}>
          <Title style={{ marginLeft: 10, marginTop: 5 }}>秒杀专区</Title>
        </View>
        <FlatList
          horizontal={true}
          data={productList}
          ListFooterComponent={renderExtraContent}
          renderItem={renderItem}
          onEndReached={() => getProductList()}
          keyExtractor={(item) => item.productId}
        />
        <ProductDetail userId={userInfo.userId} data={choosedItem} />
      </ScrollView>
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
  scroll: {
    flex: 1,
    width: "100%",
  },
  listHead: {
    backgroundColor: "#fff",
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#a5f5e6",
    height: 60,
    justifyContent: "center",
  },
  items: {
    backgroundColor: "white",
    height: 80,
    marginVertical: 5,
  },
});
export default Home;

