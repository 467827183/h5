
import styles from "./index.less";
import { useEffect, useState } from "react";
import dropDown from "../../assets/dropDown.png";
import { sleep } from 'antd-mobile/es/utils/sleep'
import transfer from "../../assets/transfer.png";
import Header from '@/components/Header'
import { useNavigate } from "react-router-dom";
import close from "../../assets/icon_close.png";
import { Form, Toast, PullToRefresh, InfiniteScroll, Popup, DatePickerView } from 'antd-mobile'
import { LeftOutline } from 'antd-mobile-icons'
import { BrowserRouter as Router, Route, Link, useParams } from 'react-router-dom';
import clean from "../../assets/clean.png";
import check from "../../assets/check.png";
import moment from 'moment';
import unCheck from "../../assets/unCheck.png";
const currentDate = moment();
const oneMonthAgo = currentDate.clone().subtract(1, 'months');
const startDate = oneMonthAgo.startOf('month')
const endDate = currentDate.endOf('month')
// import { lorem } from 'demos'
export default function AboutPage() {
  const { type } = useParams();
  const [status, setStatus] = useState(1)
  const [currentTime, setCurrentTime] = useState(1)
  const [hasMore, setHasMore] = useState(false)
  const [visible, setVisible] = useState(false)
  const navigate = useNavigate();
  const [data, setData] = useState(() => getNextData())
  const [selectItem, setSelectItem] = useState([
    { name: '虚假转账凭证', status: false, line: 'rgba(247, 181, 0, 1)', type: 2 },
    { name: '转账金额不足', status: false, line: 'rgba(0, 160, 232, 1)', type: 3 },
  ])
  const [timeStatus,setTimeStatus] = useState(false)
  const minDate = new Date();
  minDate.setMonth(minDate.getMonth() - 1);
  const maxDate = new Date();
  const now = new Date()
  const [leftTime,setLeftTime] = useState(now)
  const [rightTime,setRightTime] = useState(now)
  const [value, setValue] = useState(now)
  const handleClick = () => {
    // 返回上一页
    navigate(-1);
  };
  const submit = () => {
    const newArr = [...selectItem]
    let result = newArr.filter(item => {
      return item.status
    })
    // setInputValue(result[0].name)
    setVisible(false);

  }
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
  const itemClick = (index) => {
    const newArr = [...selectItem]
    newArr.forEach(item => {
      item.status = false
    })
    newArr[index].status = true
    setSelectItem(newArr)
  }
  const setTime1 = () =>{
    setValue(moment('2024-06-22')._d)
    setCurrentTime(1)
  }
  const setTime2 = () =>{
    setValue(moment('2024-06-22')._d)
    setCurrentTime(2)
  }

  const timeClose = () =>{
    const left = moment(leftTime)
    const right = moment(rightTime)
    if(left.isAfter(right)){
      Toast.show({
        content: "结束时间不能大于开始时间",
        duration: 3000,
        maskClassName:'special'
      });
      return
    }
    setTimeStatus(false)
  }
  return (
    <div className={styles.outBox}>
      <Popup visible={timeStatus}>
        <div className={styles.header}>
          <div className={styles.itemd} onClick={setTime1}>
            <div style={{color:currentTime == 1?'#2DBF64':'black'}}>开始日期 </div>
            <div>{moment(leftTime).format('YYYY-MM-DD')}</div>
          </div>
          <div className={styles.line}></div>
          <div className={styles.itemd} onClick={setTime2}>
            <div style={{color:currentTime == 2?'#2DBF64':'black'}}> 结束日期</div>
            <div>{moment(rightTime).format('YYYY-MM-DD')}</div>
          </div>
        </div>
        <DatePickerView
          value={value}
           min={minDate}
          max={maxDate}
          onChange={val => {
            if(currentTime == 1){
              setLeftTime(val)
            } else {
              setRightTime(val)
            }
          }}
        />
        <div className={styles.btns} onClick={timeClose}>确定</div>
      </Popup>
      <Popup
        visible={visible}
        onMaskClick={() => {
          setVisible(false);
        }}
        bodyStyle={{
          borderTopLeftRadius: "8px",
          borderTopRightRadius: "8px",
          minHeight: "50vh",
          padding: "24px 15px 18px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          <div className={styles.popHeader}>类型</div>
          {selectItem.map((item, index) => {
            return (
              <div
                className={styles.item}
                key={index}
                onClick={() => itemClick(index)}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div
                    className={styles.name}
                  >
                    {item.name}
                  </div>
                </div>
                {item.status ? <img src={check} /> : <img src={unCheck} />}
              </div>
            );
          })}
        </div>
        <div className={styles.bottomBox}>

          <div className={styles.btnRight} onClick={submit}>
            确认
          </div>
        </div>
      </Popup>
      <div className={styles.backBox}>
        <div className={styles.box}>
          <LeftOutline fontSize={16} className={styles.back} onClick={handleClick} />
          资产明细
        </div>
        <div className={styles.numberBox}>
          <div className={styles.items}>
            <div>流通信用分</div>
            <div>2662685.66</div>
          </div>
        </div>
      </div>
      <div className={styles.flexBox}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div className={styles.right_select} onClick={() => { setVisible(true) }}>
            <div>类型</div>
            <img src={dropDown}></img>
          </div>
          <div className={styles.right_select} onClick={() => { setTimeStatus(true) }}>
            <div>日期</div>
            <img src={dropDown}></img>
          </div>
        </div>
        <img src={clean}></img>
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
