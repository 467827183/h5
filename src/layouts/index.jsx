import { Outlet } from "umi";
import { useNavigate, matchRoutes, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import router from "../config/routers";
import "lib-flexible";
import { TabBar, SafeArea, Toast } from "antd-mobile";
import { AppOutline, HeartOutline, UserOutline } from "antd-mobile-icons";
import "normalize.css/normalize.css"; //全局引入
import styles from "./index.less";
import homeActive from "../assets/home_active.png";
import home from "../assets/home.png";
import flowActive from "../assets/flow_active.png";
import flow from "../assets/flow.png";
import transactionActive from "../assets/transaction_active.png";
import transaction from "../assets/transaction.png";
import myActive from "../assets/my_active.png";
import { axiosCustom,storage } from "@/Common";
import my from "../assets/my.png";
export default function Layout() {
  const location = useLocation();
  const [defaultSelectedKeys, setDefaultSelectedKeys] = useState([]);
  const [defaultOpenKeys, setDefaultOpenKeys] = useState([]);
  const [isInit, setIsInit] = useState(false);
  const navigate = useNavigate();
  const [userInfo,setUserInfo] = useState({})
  const { pathname } = location;
  useEffect(() => {
    const routes = matchRoutes(router.routes, location.pathname); // 返回匹配到的路由数组对象，每一个对象都是一个路由对象
    const pathArr = [];
    if (routes !== null) {
      routes.forEach((item) => {
        const path = item.route.path;
        if (path) {
          pathArr.push(path);
        }
      });
    }
    setDefaultSelectedKeys(pathArr);
    setDefaultOpenKeys(pathArr);
    setIsInit(true);
  }, [location.pathname]);

  if (!isInit) {
    return null;
  }

  const setRouteActive = (value) => {
    const values = storage.get('user')
    if(value == '/flow'){
      if(values?.pay_password){
        navigate(value);
      } else {
        axiosCustom({ cmd: "/user/info" }).then(res => {
          storage.set('user',res.user)
          if(res.user.pay_password){
            navigate(value);
          } else {
            Toast.show('请设置支付密码')
          }
        })
      }
    } else {
      navigate(value);
    }
  };
  const imgItem = (name)=>{
    return <img src={name} style={{width:'100%',height:'100%'}}/>
  }
  const tabs = [
    {
      key: "/home",
      title: "首页",
      icon: (active) =>
        active ? imgItem(homeActive) : imgItem(home),
      
    },
    {
      key: "/flow",
      title: "流动池",
      icon: (active) =>
        active ? imgItem(flowActive) : imgItem(flow),
    },
    {
      key: "/about",
      title: "交易(C2C)",
      icon: (active) =>
        active ? imgItem(transactionActive) : imgItem(transaction),
    },

    {
      key: "/my",
      title: "我的",
      icon: (active) =>
        active ? imgItem(myActive) : imgItem(my),
    },
  ];
  return (
    <>
    <div className={styles.outBox}>
      <div className={styles.app}>
        <SafeArea position="top" />
        <Outlet />
      </div>
      {["/home", '/flow',"/about", "/my"].includes(pathname) && (
        <div className={styles.bottom}>
          <TabBar
            defaultActiveKey="/home"
            className={styles.tabbar}
            activeKey={pathname}
            onChange={(value) => setRouteActive(value)}
          >
            {tabs.map((item) => (
              <TabBar.Item
                className={styles.tabbarItem}
                key={item.key}
                icon={item.icon}
                title={item.title}
              />
            ))}
          </TabBar>
          <SafeArea position="bottom" />
        </div>
      )}
      </div>
    </>
  );
}
