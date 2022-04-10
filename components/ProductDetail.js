import React, { useEffect, useState } from "react";
import { View } from "react-native";
import {
  Title,
  Caption,
  Button,
  Subheading,
  Dialog,
  Portal,
  HelperText,
  TextInput,
} from "react-native-paper";
import Md5 from "crypto-js/md5";
import Toast from "react-native-root-toast";
import ProductChart from "./ProductChart";
import { buyAPI } from "../api";


const ProductDetail = (props) => {
  const [userId, setUserId] = useState(0);
  const [data, setData] = useState({});
  const [visible, setVisible] = useState(false);
  const [money, setMoney] = useState(0);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (props.data && props.userId) {
      console.log(props);
      setData(props.data);
      setUserId(props.userId);
      setMoney(props.data.productStartMoney);
    }
  }, [props?.data]);

  const handleBuy = async () => {
    setLoading(true);
    let nowDate = new Date();
    let Data = {
      stockId: data.strToStockId,
      addSale: Number(money),
      userId: userId,
      currentDate: nowDate.toString(),
      productName: data.productName,
    };
    // stockId userId currentDate
    console.log(Data.stockId + userId + nowDate);
    let pwd = Md5(Data.stockId + userId + nowDate);
    console.log("result: ", pwd.toString(), nowDate);
    await fetch(buyAPI + pwd, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Data),
    })
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        console.log(json);
        if (json.code == 200) {
          Toast.show("购买成功.", {
            duration: Toast.durations.LONG,
          });
        } else {
          Toast.show(json.msg ? json.msg : "Request failed to send.", {
            duration: Toast.durations.LONG,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setVisible(false);
        setLoading(false);
        setMoney(data.productStartMoney);
      });
  };
  const hasErrors = () => {
    return (Number(money) - data.productStartMoney) % data.productIncMoney ==
      0 && money > 0
      ? false
      : true;
  };
  return (
    <>
      {!data.productId && (
        <View
          style={{
            width: "100%",
            flex: 1,
            height: 200,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Caption>请选择一款产品</Caption>
        </View>
      )}
      {data.productId && (
        <View style={{ marginTop: 10 }}>
          <Portal>
            <Dialog visible={visible} onDismiss={() => setVisible(false)}>
              <Dialog.Title>继续</Dialog.Title>
              <Dialog.Content>
                <Caption>
                  {data.productStartMoney}元起购,单人限额
                  {data.productDayLimitMoney}元，递增金额为
                  {data.productIncMoney}元
                </Caption>
                <TextInput
                  keyBoardType="number-pad"
                  value={money.toString()}
                  onChangeText={setMoney}
                  left={<TextInput.Affix text="¥" />}
                  mode="outlined"
                />
                <HelperText type="error" visible={hasErrors()}>
                  输入数字不符合规则
                </HelperText>
              </Dialog.Content>
              <Dialog.Actions>
                <Button
                  onPress={() => {
                    setVisible(false);
                    setMoney(data.productStartMoney);
                  }}
                >
                  取消
                </Button>
                <Button
                  loading={loading}
                  disabled={hasErrors()}
                  onPress={() => handleBuy()}
                >
                  完成
                </Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
          <View
            style={{
              padding: 10,
              backgroundColor: "white",
              height: 50,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Subheading>{data.productName}</Subheading>
            <Caption>{data.productEndProfitMethod}</Caption>
          </View>
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
              <Title>年化利率：{data?.productYearProfit}%</Title>
              <Caption style={{ width: "80%", textAlign: "center" }}>
                起息日：{data?.productStartProfitDate?.slice(0, 10)}
              </Caption>
              <Caption style={{ width: "80%", textAlign: "center" }}>
                结息日：{data?.productExpireTime?.slice(0, 10)}
              </Caption>
              <Caption style={{ width: "80%", textAlign: "center" }}>
                风险等级：{data?.productRiskLevel}
              </Caption>
              <Caption style={{ width: "80%", textAlign: "center" }}>
                起售价：{data?.productStartMoney}元
              </Caption>
              <Caption style={{ width: "80%", textAlign: "center" }}>
                产品期限：{data?.productLimit}
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
              <Caption>递增金额：{data.productIncMoney}元</Caption>
              <Caption>单人限额：{data.productSingleLimitMoney}元</Caption>
              <Caption>单日限额：{data.productDayLimitMoney}元</Caption>
              <Button onPress={() => setVisible(true)} icon={"cart"}>
                现在购买
              </Button>
            </View>
          </View>
        </View>
      )}
    </>
  );
};

export default ProductDetail;

