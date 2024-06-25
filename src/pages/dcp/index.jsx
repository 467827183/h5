
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
import leftON from "../../assets/leftON.png";
// import leftOFF from "../../assets/leftOFF.png";
// import rightON from "../../assets/rightON.png";
import rightOFF from "../../assets/rightOFF.png";
import { Form, Input, InfiniteScroll, PullToRefresh, TextArea, List } from 'antd-mobile'
import { BrowserRouter as Router, Route, Link, useParams } from 'react-router-dom';
// import { lorem } from 'demos'
export default function AboutPage() {
  const [value1, setValue1] = useState('')
  const [value2, setValue2] = useState('')
  const [value3, setValue3] = useState('')
  const [text, setText] = useState("");
  const { type } = useParams();
  const [visible, setVisible] = useState(false)
  const [status, setStatus] = useState(1)
  const [statusBottom, setStatusBottom] = useState(1)
  const [phone, setPhone] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [hasMore, setHasMore] = useState(true)
  const [data, setData] = useState(() => getNextData())
  const navigate = useNavigate();

  const handleClick = () => {
    // 返回上一页
    navigate(-1);
  };
  const checkStatus = (type) => {
    setStatusBottom(type)
  }
  const gotoOrder = () =>{
    navigate('/order/1');
  }
  const gotoTransfer = () =>[
    navigate('/transferDcp')
  ]
  const inputChange = (e) => {
    console.log(e)
  }
  const TextAreafun = (e) => {
    setText(e);
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
        DCP商家
        <img src={order} className={styles.order} onClick={()=>gotoOrder()}></img>
      </div>
      <PullToRefresh
        style={{ minHeight: '100%' }}
        onRefresh={async () => {
          await sleep(1000)
          setData([...getNextData(), ...data])
        }}
      >
        <div className={styles.topBox}>
          <img src={user} className={styles.user}></img>
          <div className={styles.rightBox}>
            <div>白云悠悠</div>
            <img src={dcp} className={styles.dcpImg}></img>
          </div>
        </div>
        <div className={styles.dcpBox}>
          <div className={styles.title}>DCP</div>
          <div className={styles.number}>32000.54</div>
          <div className={styles.btn} onClick={()=>gotoTransfer()}> 转赠DCP</div>
        </div>
        <div className={styles.switchBox}>
          <div className={status == 1 ? styles.leftON : styles.leftOFF} onClick={() => setStatus(1)}>收购</div>
          <div className={status == 1 ? styles.rightOFF : styles.rightON} onClick={() => setStatus(2)}>出售</div>
        </div>
        <div className={styles.inputBox}>
          <div className={styles.title}>数量</div>
          <Input placeholder='0.00' clearable type="number" value={value1} onChange={(e) => inputChange(e)} disabled />
          <div className={styles.unit}>DCP</div>
        </div>
        <div className={styles.inputBox}>
          <div className={styles.title}>价格</div>
          <Input placeholder='0.00' clearable type="number" value={value2} onChange={(e) => inputChange(e)} disabled />
          <div className={styles.unit}>CNY</div>
        </div>
        <div className={styles.inputBox}>
          <div className={styles.title}>金额</div>
          <Input placeholder='0.00' clearable type="number" value={value3} onChange={(e) => inputChange(e)} />
          <div className={styles.unit}>CNY</div>
        </div>
        <div className={styles.section}>
          <div className={styles.inputBox} style={{ marginBottom: '0px' }}>
            <div className={styles.title}>限额</div>
            <Input placeholder='0.00' clearable type="number" value={value3} onChange={(e) => inputChange(e)} />
          </div>
          <div className={styles.line}>~</div>
          <div className={styles.inputBox} style={{ marginBottom: '0px' }}>
            <div className={styles.title}>限额</div>
            <Input placeholder='0.00' clearable type="number" value={value3} onChange={(e) => inputChange(e)} />
          </div>
        </div>
        <div className={styles.payment}>
          <div className={styles.title}>支付方式</div>
          <div className={styles.payType}>
            <div className={styles.items}>
              <div className={styles.line}></div>
              <div className={styles.name}>微信支付</div>
            </div>
            <div className={styles.items}>
              <div className={styles.line} style={{ background: 'rgba(0, 160, 232, 1)' }}></div>
              <div className={styles.name}>支付宝</div>
            </div>
            <div className={styles.items}>
              <div className={styles.line} style={{ background: "rgba(247, 181, 0, 1)" }}></div>
              <div className={styles.name}>银行卡</div>
            </div>
          </div>
        </div>
        <div className={styles.payTitle}>
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
        </div>
        <div className={styles.submitBox}>
          确认收购
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
                    已完成
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
                    <div className={styles.numberItem} style={{ marginBottom: '4px' }}>
                      <div>数量</div>
                      <div>12,004.93 DCP</div>
                    </div>
                    <div className={styles.numberItem}>
                      <div>限额</div>
                      <div>12,004.93 DCP</div>
                    </div>
                  </div>
                </div>
                <div className={styles.typeBox}>
                  <div style={{display:'flex'}}>
                    <div className={styles.btns} style={{marginRight:'9px'}}>隐藏</div>
                    <div className={styles.btns}>取消</div>
                  </div>
                </div>
              </List.Item>
            ))}
          </List>
          <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
        </div>
      </PullToRefresh>
    </div>

  );
}
