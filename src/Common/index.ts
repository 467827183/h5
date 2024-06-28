import axios from "axios";
import { Toast } from "antd-mobile";
export function axiosCustom({
  api = "https://test-api.tideswap.io/v1",
  cmd = "",
  headers = {
    "Content-Type": "application/json",
  },
  params = {},
  method = "get",
  data = {},
  successCode = 0,
  showToast = true,
}) {
  return new Promise(async (resolve, reject) => {
    if(storage.get("token")){
        headers['access-token'] = storage.get("token").access_token
    }
    console.log(headers, 'asdasdasd')
    try {
      const res = await axios({
        url: api + cmd,
        method: method,
        headers,
        params,
        data,
      });
      const resData = res.data;
      if (resData.status === 0) {
        resolve(resData.data);
      } else {
        console.log(res, "res=+++");
        Toast.show({content:resData.message,maskStyle:{"--z-index":10000000},duration:0});
        reject({
          cmd: api + cmd,
          method: method,
          msg: resData.msg,
          code: resData.code,
        });
      }
    } catch (e) {
      reject({
        cmd: api + cmd,
        method: method,
        msg: e,
      });
    }
  });
}
// 封装一个localStorage操作对象
export const storage = {
  // 获取存储的数据
  get: function (key: any) {
    try {
      const serializedValue = localStorage.getItem(key);
      if (serializedValue === null) {
        return undefined;
      }
      return JSON.parse(serializedValue);
    } catch (err) {
      console.error("Error getting data from localStorage:", err);
      return undefined;
    }
  },

  // 存储数据
  set: function (key: any, value: any) {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    } catch (err) {
      console.error("Error saving data to localStorage:", err);
    }
  },

  // 移除存储的数据
  remove: function (key: any) {
    try {
      localStorage.removeItem(key);
    } catch (err) {
      console.error("Error removing data from localStorage:", err);
    }
  },

  // 清空所有存储的数据
  clear: function () {
    try {
      localStorage.clear();
    } catch (err) {
      console.error("Error clearing localStorage:", err);
    }
  },
};
