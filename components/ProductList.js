import React from "react";
import { View } from "react-native-web";

const ProductList = (props) => {
  const { data } = props.data;
  console.log("receive", data);
  return <View>ProductList</View>;
};

export default ProductList;
