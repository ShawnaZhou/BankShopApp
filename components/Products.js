import React, { useState, useEffect } from "react";
import { View, TouchableOpacity } from "react-native";
import { Subheading, Caption, Paragraph } from "react-native-paper";

const Products = (props) => {
  const { productChoosed, index } = props;
  const handleProductDetailShow = () => {
    productChoosed(index);
  };
  return (
    <TouchableOpacity
      style={{
        width: 200,
        paddingVertical: 10,
        backgroundColor: "#fff",
        paddingHorizontal: 10,
        marginTop: 0,
        flexDirection: "column",
        borderRightWidth: 0.5,
        borderRightColor: "#f5f5f5",
        justifyContent: "center",
      }}
      onPress={() => handleProductDetailShow()}
    >
      <Subheading>{props.data?.productName}</Subheading>
      <Caption>{props.data?.productStartProfitDate}</Caption>
      <Paragraph>{props.data?.productEndProfitMethod} </Paragraph>
    </TouchableOpacity>
  );
};

export default Products;

