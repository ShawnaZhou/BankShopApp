import React from "react";
import { View } from "react-native";
import { Title, Caption, Button } from "react-native-paper";
import ProductChart from "./ProductChart";

const ProductDetail = () => {
  return (
    <View style={{ marginTop: 10 }}>
      <ProductChart />
      <View
        style={{
          marginTop: 10,
          width: "100%",
          height: 200,
          flexDirection: "row",
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: "48%",
            height: "100%",
            backgroundColor: "white",
            borderRadius: 5,
          }}
        >
          <Title>收益率：3.4%</Title>
          <Caption style={{ width: "80%", textAlign: "center" }}>
            {new Date().toString()}
          </Caption>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: "48%",
            height: "100%",
            backgroundColor: "white",
            marginLeft: "4%",
          }}
        >
          <Title>lorem</Title>
          <Button icon={"cart"}>Buy Now </Button>
        </View>
      </View>
    </View>
  );
};

export default ProductDetail;

