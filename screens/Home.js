import React, { useState } from "react";
import {
  View,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  IconButton,
  Divider,
} from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import ProductDetail from "../components/ProductDetail";
import Products from "../components/Products";

const Home = () => {
  const navigation = useNavigation();
  const [isShow, setIsShow] = useState(true);
  const data = [
    {
      id: 0,
      title: "title1",
      date: new Date(),
      content: "content1",
    },
    {
      id: 1,
      title: "title2",
      date: new Date(),
      content: "content1",
    },
    {
      id: 2,
      title: "title3",
      date: new Date(),
      content: "content3",
    },
    {
      id: 3,
      title: "title4",
      date: new Date(),
      content: "content4",
    },
    {
      id: 4,
      title: "title5",
      date: new Date(),
      content: "content5",
    },
  ];
  const logOut = () => {
    navigation.navigate("auth");
  };
  const handleExtraContent = () => {
    console.log("q");
  };
  const renderExtraContent = () => {
    return (
      <TouchableOpacity
        style={{
          width: 100,
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
        }}
        onPress={() => handleExtraContent()}
      >
        <Button icon={"arrow-right-bold"}>More</Button>
      </TouchableOpacity>
    );
  };
  const renderItem = ({ item }) => <Products data={item} />;
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scroll}>
        <Card>
          <Card.Title
            title="Nickname"
            subtitle="Subtitle"
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
          data={data}
          renderItem={renderItem}
          ListFooterComponent={renderExtraContent}
          keyExtractor={(item) => item.id}
        />
        <ProductDetail />
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

