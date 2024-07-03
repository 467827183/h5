import { PullToRefresh, Button, Swiper, Toast, Space } from "antd-mobile";
import { useNavigate } from "react-router-dom";
import styles from "@/assets/css/home.less";
import {useState,useEffect} from "react";
const colors = ["#ace0ff", "#bcffbd", "#e4fabd", "#ffcfac"];
import logo from '@/assets/logo.png'
import { axiosCustom,storage } from "@/Common";
import banner from '@/assets/banner1.png'

const Home = () => {
  const [news,setNews] = useState(
    [
    ]
  )

  const [banner,setBanner] = useState([])
  useEffect(()=>{
    axiosCustom({ cmd: "/home/home" }).then(res => {
      // setCountry(res)
      setBanner(res.banner)
      setNews(res.notice)
    })

  },[])
  const navigate = useNavigate();
  const items = banner.map((item, index) => (
    <Swiper.Item key={index}>
      <img
        className={styles.swiperItem}
        src={item.image}
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
  const goto = (id) =>{
    navigate(`/listDetail/${id}`);
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
            <div key={index} className={styles.newsItme} onClick={()=>goto(item.id)}>
              <div className={styles.titles}>{item.title}</div>
              <div className={styles.create_time}>{item.create_time}</div>
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
