
import styles from "./index.less";
import { useEffect, useState } from "react";
import dropDown from "../../assets/dropDown.png";
import { sleep } from 'antd-mobile/es/utils/sleep'
import buy from "../../assets/buy.png";
import sell from "../../assets/sell.png";
import Header from '@/components/Header'
import { useNavigate } from "react-router-dom";
import { LeftOutline } from 'antd-mobile-icons'
import dcp from "../../assets/dcp.png";
import order from "../../assets/order_black.png";
import user from "../../assets/user.png";
import { axiosCustom, storage } from "@/Common";
import leftON from "../../assets/leftON.png";
// import leftOFF from "../../assets/leftOFF.png";
// import rightON from "../../assets/rightON.png";
import rightOFF from "../../assets/rightOFF.png";
import { Form, Input, InfiniteScroll, PullToRefresh, TextArea, List, Toast } from 'antd-mobile'
import { BrowserRouter as Router, Route, Link, useParams } from 'react-router-dom';
// import { lorem } from 'demos'
export default function AboutPage() {
  const [value1, setValue1] = useState('')
  const [value2, setValue2] = useState('')
  const [value3, setValue3] = useState('')
  const [value4, setValue4] = useState('')
  const [value5, setValue5] = useState('')
  const [text, setText] = useState("");
  const [userInfo, setUserInfo] = useState({})
  const { type } = useParams();
  const [visible, setVisible] = useState(false)
  const [status, setStatus] = useState(1)
  const [statusBottom, setStatusBottom] = useState(1)
  const [phone, setPhone] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [hasMore, setHasMore] = useState(true)
  const [data, setData] = useState(() => getNextData())
  const [priceInfo, setPriceInfo] = useState({})
  const [payInfo, setPayInfo] = useState({})
  const [list, setList] = useState({})
  const navigate = useNavigate();
  useEffect(() => {
    commonRequest(1)
    request1()

  }, [])
  const request1 = () =>{
    axiosCustom({ cmd: "/user/info" }).then(res => {
      res.dcpValue = res?.prop[2]?.value
      setUserInfo(res)
    })
    axiosCustom({ cmd: "/market-separate/conf" }).then(res => {
      setValue2(res.buy_price)
      setPriceInfo(res)
    })
    axiosCustom({ cmd: "/receipt/receipt" }).then(res => {
      setPayInfo(res)
    })
  }
  const commonRequest = (type) => {
    let params = {
      page: 1,
      size: 200,
      type,
      my: 1
    }
    axiosCustom({ cmd: "/market-separate/shop-list", params }).then(res => {
      setList(res)
      setData(res.data)
      console.log(res)
    })
  }
  const handleClick = () => {
    // 返回上一页
    navigate(-1);
  };
  const checkStatus = (type) => {
    setStatusBottom(type)
    commonRequest(type)
  }
  const gotoOrder = () => {
    navigate('/order/1');
  }
  const gotoTransfer = () => [
    navigate('/transferDcp')
  ]
  const inputChange = (e) => {
    setValue1(e)
    setValue3(e * value2)
    console.log(e)
  }
  const inputValue4 = (e) => {
    setValue4(e)
  }
  const inputValue5 = (e) => {
    setValue5(e)
  }
  const TextAreafun = (e) => {
    setText(e);
  };
  async function loadMore() {
    // const append = await mockRequest()
    // setData(val => [...val, ...append])
    setHasMore(data.length > 0)
  }
  function truncateDecimals(number) {
    var multiplier = Math.pow(10, 2);
    var adjustedNum = number * multiplier;
    var truncatedNum = Math.floor(adjustedNum) / multiplier;
    return truncatedNum;
  }
  function getNextData() {
    const ret = []
    for (let i = 0; i < 18; i++) {
      ret.unshift({ name: i })
    }
    return ret
  }
  const submit = () => {
    console.log(payInfo, 'payInfo')
    let arr = []
    if (payInfo.alipay) {
      arr.push(1)
    }
    if (payInfo.bank) {
      arr.push(2)
    }
    if (payInfo.wechat) {
      arr.push(3)
    }
    if (!value1) {
      return Toast.show('请输入数量')
    }
    if (!value4) {
      return Toast.show('请输入最小限额')
    }
    if (!value5) {
      return Toast.show('请输入最大限额')
    }
    if (value4 < priceInfo.separate_min) {
      return Toast.show(`最小限额不该小于${priceInfo.separate_min}`)
    }
    if (value4 > value1) {
      return Toast.show('最小限额应小于数量')
    }
    if (value5 > value1) {
      return Toast.show('最大限额应小于数量')
    }
    let data = {
      num: value1,
      receipt_type: arr.toString(','),
      separate_min: value4,
      separate_max: value5,
      type: status
    }
    console.log(data, 'data++++')
    axiosCustom({
      cmd: "/market-separate/issue-order", method: "post", data,
    }).then(res => {
      commonRequest(statusBottom)
    })
  }
  const hidden = (id,hidden) => {
    let data = {
      id,
      hidden
    }
    axiosCustom({
      cmd: "/market-separate/hidden-order", method:"post",data,
    }).then(res => {
      Toast.show(hidden == 1?'隐藏成功':'上架成功')
      commonRequest(statusBottom)
    })
  }
  const close = (id) => {
    let data = {
      id,
    }
    axiosCustom({
      cmd: "/market-separate/issue-order", method:'DELETE',data,
    }).then(res => {
      Toast.show('取消成功')
      commonRequest(statusBottom)
    })
  }
  return (

    <div className={styles.outBox}>
      <div className={styles.box}>
        <LeftOutline fontSize={16} className={styles.back} onClick={handleClick} />
        DCP商家
        <img src={order} className={styles.order} onClick={() => gotoOrder()}></img>
      </div>
      <PullToRefresh
        style={{ minHeight: '100%' }}
        onRefresh={async () => {
          setStatusBottom(1)
          commonRequest(1)
          request1()
        }}
      >
        <div className={styles.topBox}>
          <img src={user} className={styles.user}></img>
          <div className={styles.rightBox}>
            <div>{userInfo?.user?.login_name}</div>
            <img src={dcp} className={styles.dcpImg}></img>
          </div>
        </div>
        <div className={styles.dcpBox}>
          <div className={styles.title}>DCP</div>
          <div className={styles.number}>{userInfo?.dcpValue}</div>
          <div className={styles.btn} onClick={() => gotoTransfer()}> 转赠DCP</div>
        </div>
        <div className={styles.switchBox}>
          <div className={status == 1 ? styles.leftON : styles.leftOFF} onClick={() => setStatus(1)}>收购</div>
          <div className={status == 1 ? styles.rightOFF : styles.rightON} onClick={() => setStatus(2)}>出售</div>
        </div>
        <div className={styles.inputBox}>
          <div className={styles.title}>数量</div>
          <Input placeholder='0.00' clearable type="number" value={value1} onChange={(e) => inputChange(e)} />
          <div className={styles.unit}>DCP</div>
        </div>
        <div className={styles.inputBox}>
          <div className={styles.title}>价格</div>
          <Input placeholder='0.00' clearable type="number" value={value2} disabled />
          <div className={styles.unit}>CNY</div>
        </div>
        <div className={styles.inputBox}>
          <div className={styles.title}>金额</div>
          <Input placeholder='0.00' clearable type="number" value={truncateDecimals(value3)} disabled />
          <div className={styles.unit}>CNY</div>
        </div>
        <div className={styles.section}>
          <div className={styles.inputBox} style={{ marginBottom: '0px' }}>
            <div className={styles.title}>限额</div>
            <Input placeholder={priceInfo.separate_min} clearable type="number" value={value4} onChange={(e) => inputValue4(e)} />
          </div>
          <div className={styles.line}>~</div>
          <div className={styles.inputBox} style={{ marginBottom: '0px' }}>
            <div className={styles.title}>限额</div>
            <Input placeholder={priceInfo.separate_max} clearable type="number" value={value5} onChange={(e) => inputValue5(e)} />
          </div>
        </div>
        <div className={styles.payment}>
          <div className={styles.title}>{status == 1 ? '支付' : '出售'}方式</div>
          <div className={styles.payType}>
            {
              payInfo.wechat && <div className={styles.items}>
                <div className={styles.line}></div>
                <div className={styles.name}>微信支付</div>
              </div>
            }
            {
              payInfo.alipay && <div className={styles.items}>
                <div className={styles.line} style={{ background: 'rgba(0, 160, 232, 1)' }}></div>
                <div className={styles.name}>支付宝</div>
              </div>
            }
            {
              payInfo.bank && <div className={styles.items}>
                <div className={styles.line} style={{ background: "rgba(247, 181, 0, 1)" }}></div>
                <div className={styles.name}>银行卡</div>
              </div>
            }

          </div>
        </div>
        {/* <div className={styles.payTitle}>
          交易提示
        </div>
        <div className={styles.textBox}>
          <TextArea
            value={text}
            placeholder="请输入您的交易提示信息！"
            showCount
            maxLength={200}
            onChange={TextAreafun}
          />
        </div> */}
        <div className={styles.submitBox} onClick={submit}>
          确认{status == 1 ? '收购' : '出售'}
        </div>
        <div className={styles.switchBox1}>
          <div className={`${statusBottom == 2 ? styles.noActive : styles.none} ${styles.itemBox} `} onClick={() => checkStatus(1)}>
            <div className={styles.name}>收购订单</div>
            <div className={styles.line}></div>
          </div>
          <div className={`${statusBottom == 1 ? styles.noActive : styles.none} ${styles.itemBox} `} onClick={() => checkStatus(2)}>
            <div className={styles.name}>出售订单</div>
            <div className={styles.line}></div>
          </div>
        </div>
        <div className={styles.scrollBox}>
          <List style={{ flex: 1 }}>
            {data.map((item, index) => (
              <List.Item key={index} className={styles.itembox} arrow={false} >
                <div className={styles.comheader}>
                  <div><span style={{ color: statusBottom == 1 ? 'rgba(45, 191, 100, 1)' : 'rgba(235, 75, 110, 1)' }}>{statusBottom == 1 ? '收购' : '出售'}</span>DCP</div>
                  <div className={styles.rightBtn}>
                    {item.is_hidden == 1?'已隐藏':item.status_name}
                  </div>
                </div>
                <div className={styles.comNumber}>
                  {item.create_time}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '9px' }}>
                  <div>
                    <div className={styles.numberItem} style={{ marginBottom: '4px' }}>
                      <div>单号</div>
                      <div>{item.order_number}</div>
                    </div>
                    <div className={styles.numberItem} style={{ marginBottom: '4px' }}>
                      <div>价格</div>
                      <div>{item.price} CNY</div>
                    </div>
                    <div className={styles.numberItem} style={{ marginBottom: '4px' }}>
                      <div>数量</div>
                      <div>{item.num} DCP</div>
                    </div>
                    <div className={styles.numberItem}>
                      <div>限额</div>
                      <div>{item.min_num} DCP  - {item.max_num} DCP</div>
                    </div>
                  </div>
                </div>
                {
                  item.status == 1 && (
                    <div className={styles.typeBox}>
                      <div style={{ display: 'flex' }}>
                        <div className={styles.btns} style={{ marginRight: '9px' }} onClick={() => hidden(item.id,item.is_hidden == 1?2:1)}>{item.is_hidden == 1?'上架':'隐藏'}</div>
                        <div className={styles.btns} onClick={()=>close(item.id)}>取消</div>
                      </div>
                    </div>
                  )
                }

              </List.Item>
            ))}
          </List>
          {/* <InfiniteScroll loadMore={loadMore} hasMore={hasMore} /> */}
        </div>
      </PullToRefresh>
    </div>

  );
}
