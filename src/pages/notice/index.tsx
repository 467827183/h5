import {useState} from "react";
import styles from "./index.less";
import Header from '@/components/Header'
export default function AboutPage() {
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
  return (
    <div className={styles.box}>
      <Header/>
      <div className={styles.title}>公告列表</div>
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
        </div>
    </div>
  );
}
