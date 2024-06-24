
import styles from "./index.less";
import { useEffect, useState } from "react";
import dropDown from "../../assets/dropDown.png";
import { Popup, PullToRefresh, List, InfiniteScroll } from 'antd-mobile'
import { sleep } from 'antd-mobile/es/utils/sleep'
import check from "../../assets/check.png";
import { useNavigate, useParams } from "react-router-dom";
import Header from '@/components/Header'
import arrow_right from "../../assets/arrow_right_1.png";
// import { lorem } from 'demos'
export default function AboutPage() {
  const { type } = useParams();
  const [curentType, setCurentType] = useState(1)
  const [selectItem, setSelectItem] = useState([
    { name: '全部', status: true, line: false, type: 1 },
    { name: '银行卡', status: false, line: 'rgba(247, 181, 0, 1)', type: 2 },
    { name: '支付宝', status: false, line: 'rgba(0, 160, 232, 1)', type: 3 },
    { name: '微信支付', status: false, line: 'rgba(46, 175, 100, 1)', type: 4 },
  ])
  const [status, setStatus] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const navigate = useNavigate();
  const [data, setData] = useState(() => getNextData())
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

  const checkStatus = (type) => {
    setStatus(type)
  }
  const reset = () => {
    const newArr = [...selectItem]
    newArr.forEach(item => {
      item.status = false
    })
    newArr[0].status = true
    setSelectItem(newArr)
  }
  const checkType = (e) =>{
    setCurentType(e)
  }

  const gotoDetail = (item) => {
    console.log(132132)
    navigate(`/orderDetail/${type}/2`);
  }
  return (
    <div className={styles.outBox}>
      <div style={{padding:'0 14px' }}>
        <Header name={'订单'}  />
      </div>
      <div className={styles.header}>
        <div className={styles.switchBox}>
          <div className={`${status == 2 ? styles.noActive:styles.none} ${styles.itemBox} `} onClick={() => checkStatus(1)}>
            <div className={styles.name}>进行中</div>
            <div className={styles.line}></div>
          </div>
          <div className={`${status == 1 ? styles.noActive:styles.none} ${styles.itemBox} `} onClick={() => checkStatus(2)}>
            <div className={styles.name}>已结束</div>
            <div className={styles.line}></div>
          </div>
        </div>
      </div>
      {
           status == 2&&(<div className={styles.statusBox}>
              <div className={curentType == 1?styles.active:''} onClick={()=>checkType(1)}>全部</div>
              <div className={curentType == 2?styles.active:''} onClick={()=>checkType(2)}>已完成</div>
              <div className={curentType == 3?styles.active:''} onClick={()=>checkType(3)}>已取消</div>
            </div>)
      }
      <div className={styles.scrollBox}>
        <PullToRefresh
          style={{ minHeight: '100%' }}
          onRefresh={async () => {
            await sleep(1000)
            setData([...getNextData(), ...data])
          }}
        >
          <List style={{ flex: 1 }}>
            {data.map((item, index) => (
              <List.Item key={index} className={styles.itembox} arrow={false} onClick={()=>gotoDetail(item)}>
                <div className={styles.comheader}>
                  <div><span style={{ color: type == 1 ? 'rgba(45, 191, 100, 1)' : 'rgba(235, 75, 110, 1)' }}>{type == 1 ? '购买' : '出售'}</span>DCP</div>
                  <div className={styles.rightBtn}>已完成           
                    <img src={arrow_right} style={{ width: '13px', height: '13px', marginLeft: '7px' }}></img>
                    </div>
                </div>
                <div className={styles.comNumber}>
                  2023-08-15 08:00:00
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '9px' }}>
                  <div>
                    <div className={styles.numberItem} style={{ marginBottom: '4px' }}>
                      <div>单号</div>
                      <div>OTC-ORDER-202308274</div>
                    </div>
                    <div className={styles.numberItem} style={{ marginBottom: '4px' }}>
                      <div>价格</div>
                      <div>1.00 CNY</div>
                    </div>
                    <div className={styles.numberItem}>
                      <div>数量</div>
                      <div>12,004.93 DCP</div>
                    </div>
                  </div>
                  <div className={styles.button}>3000.00 CNY</div>
                </div>
                <div className={styles.typeBox}>
                  <div className={styles.name}>微信支付</div>
                </div>
              </List.Item>
            ))}
          </List>
          <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
        </PullToRefresh>
      </div>
    </div>
  );
}
