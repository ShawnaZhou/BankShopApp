import React, { useState, useEffect } from "react";
import { View, FlatList } from "react-native";

const LatestOrders = (props) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    if (props.data) {
      setData(props.data);
    }
  }, [props.data]);
  const renderItem=()=>{
      
  }
  return (
    <View>
      <FlatList
        data={data}
        renderItem={renderItem}
        onEndReached={() => getProductList()}
        keyExtractor={(item) => item.productId}
      />
    </View>
  );
};

export default LatestOrders;

