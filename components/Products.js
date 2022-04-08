import React, { useState, useEffect } from "react";
import { View, TouchableOpacity } from "react-native";
import { Subheading, Caption, Paragraph } from "react-native-paper";

const Products = (props) => {
  console.log(props.data);
  const data = props.data;
  console.log(data);
  const handleProductDetailShow = () => {
    console.log("nothing");
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
      <Subheading>{props.data?.title}</Subheading>
      <Caption>{props.data?.date.toString()}</Caption>
      <Paragraph>{props?.data?.content} </Paragraph>
    </TouchableOpacity>
  );
};

export default Products;

