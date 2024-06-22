import { PullToRefresh, Button, Swiper, Toast, Space } from "antd-mobile";
import { useNavigate } from "react-router-dom";
import styles from "@/assets/css/home.less";
import {useState} from "react";
const colors = ["#ace0ff", "#bcffbd", "#e4fabd", "#ffcfac"];
import logo from '@/assets/logo.png'
import banner from '@/assets/banner1.png'

const Home = () => {
  const [news,setNews] = useState(
    [
      {title:'Tideswap关于 ETH 的币本位 7月5日、7月26日、8月29日交割合约正式上线的公告',time:'2024/06/11 15:25:00'},
      {title:'Tideswap关于 XRP 下线的公告',time:'2024/06/11 15:25:00'},
      {title:'Tideswap关于 ETH 的币本位',time:'2024/06/11 15:25:00'},
      {title:'Tideswap关于 ETH 的币本位',time:'2024/06/11 15:25:00'},
      {title:'Tideswap关于 ETH 的币本位',time:'2024/06/11 15:25:00'},
      {title:'Tideswap关于 ETH 的币本位',time:'2024/06/11 15:25:00'},
    ]
  )
  const navigate = useNavigate();
  const items = colors.map((color, index) => (
    <Swiper.Item key={index}>
      <img
        className={styles.swiperItem}
        style={{ background: color }}
        src={banner}
        onClick={() => {
          Toast.show(`你点击了卡片 ${index + 1}`);
        }}
      >
        {/* {index + 1} */}
      </img>
    </Swiper.Item>
  ));
  const gotoDetial = ()=>{
    navigate('/notice');
  }
  return (
    <div className={styles.indexContainer}>
      <div className={styles.logoBox}>
        <img src={logo} className={styles.logo} />
      </div>
      <div className={styles.swiperBox}>
        <Swiper
          indicator={(total, current) => (
            <div className={styles.customIndicator}>
              {current + 1} / <span>{total}</span>
            </div>
          )}
        >
          {items}
        </Swiper>
      </div>
      <div className={styles.line}></div>
      <div className={styles.title}>
        公告
      </div>
      <div className={styles.line2}></div>
      <div className={styles.newsBox}>

      {
        news.map((item,index)=>{
          return(
            <div key={index} className={styles.newsItme}>
              <div className={styles.titles}>{item.title}</div>
              <div className={styles.time}>{item.time}</div>
            </div>
          )
        })
      }
        <div className={styles.more} onClick={gotoDetial}>查看更多</div>
       </div>
    </div>
  );
};

export default Home;
