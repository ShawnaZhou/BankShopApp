import * as SecureStore from "expo-secure-store";

/**
 *
 * @param {*} key: 保存信息的key值，*
 * @param {*} value ：保存信息的value值 *
 */
export async function SaveToStore(key, value) {
  await SecureStore.setItemAsync(key, value);
}

/**
 *
 * @param {*} key 获取信息的key值 *
 * @param {*} option 可选
 * @returns 查找的结果，若不存在则返回空对象
 */
export async function GetFromStore(key, option) {
  try {
    let result = await SecureStore.getItemAsync(key);
    if (result) {
      return result;
    } else {
      throw new Error("Error: Failed to get item");
    }
  } catch (err) {
    console.log(err);
    return null;
  }
}
/**
 * @param {*} key 删除项的key值*
 * void
 */
export async function DeleteFromStore(key) {
  await SecureStore.deleteItemAsync(key);
}

/**
 * 
 * @returns 返回是否开启SecureStore
 */
export async function CheckStoreValid() {
  let result = await SecureStore.isAvailableAsync();
  return result;
}
