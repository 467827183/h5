
import styles from "./index.less";
import { useEffect, useState } from "react";
import dropDown from "../../assets/dropDown.png";
import { sleep } from 'antd-mobile/es/utils/sleep'
import transfer from "../../assets/transfer.png";
import Header from '@/components/Header'
import { useNavigate } from "react-router-dom";
import close from "../../assets/icon_close.png";
import { Form, Input, PullToRefresh,InfiniteScroll } from 'antd-mobile'
import { LeftOutline } from 'antd-mobile-icons'
import { BrowserRouter as Router, Route, Link, useParams } from 'react-router-dom';
import order from "../../assets/record.png";
// import { lorem } from 'demos'
export default function AboutPage() {
  const { type } = useParams();
  const [status, setStatus] = useState(1)
  const [hasMore, setHasMore] = useState(false)
  const navigate = useNavigate();
  const [data, setData] = useState(() => getNextData())
  const handleClick = () => {
    // 返回上一页
    navigate(-1);
  };
  async function loadMore() {
    // const append = await mockRequest()
    // setData(val => [...val, ...append])
    setHasMore(data.length > 0)
  }
  function getNextData() {
    const ret = []
    for (let i = 0; i < 18; i++) {
      ret.unshift({ name: i })
    }
    return ret
  }
  return (
    <div className={styles.outBox}>
      <div className={styles.box}>
        <LeftOutline fontSize={16} className={styles.back} onClick={handleClick} />
        转赠记录
      </div>
      <div className={styles.switchBox}>
        <div className={status == 1 ? styles.leftON : styles.leftOFF} onClick={() => setStatus(1)}>转出</div>
        <div className={status == 1 ? styles.rightOFF : styles.rightON} onClick={() => setStatus(2)}>转入</div>
      </div>
      <PullToRefresh
        style={{ minHeight: '100%' }}
        onRefresh={async () => {
          await sleep(1000)
          setData([...getNextData(), ...data])
        }}
      >
        
      <div className={styles.scrollBox}>
          <div style={{ flex: 1 }}>
            {data.map((item, index) => (
              <div key={index} className={styles.itembox} >
                <div className={styles.leftBox}>
                  <div>转赠至139****6426</div>
                  <div>2023-08-11 15:25:00</div>
                </div>
                <div className={styles.rightBox}>2650.00 DCP</div>
              </div>
            ))}
          </div>
          <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
        </div>
        </PullToRefresh>
    </div>
  );
}
