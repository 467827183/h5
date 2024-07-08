
import styles from "./index.less";
import { useEffect, useState } from "react";
import dropDown from "../../assets/dropDown.png";
import { sleep } from 'antd-mobile/es/utils/sleep'
import buy from "../../assets/buy.png";
import sell from "../../assets/sell.png";
import Header from '@/components/Header'
import { useNavigate } from "react-router-dom";
import close from "../../assets/icon_close.png";
import { Form, Input, CenterPopup,Toast,PasscodeInput } from 'antd-mobile'
import { BrowserRouter as Router, Route, Link, useParams } from 'react-router-dom';
import { axiosCustom, storage } from "@/Common";
// import { lorem } from 'demos'
export default function AboutPage() {
  const [submitValue, setSubmitValue] = useState('')
  const { type,id } = useParams();
  const [visible, setVisible] = useState(false)
  const [status, setStatus] = useState(1)
  const [phone, setPhone] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [info,setInfo] = useState({})
  const [subVisible, setSubVisible] = useState(false)
  const [inputValue,setInputValue] = useState('')
  const [error, setError] = useState(false)
  const checkStatus = (type) => {
    setStatus(type)
  }
  useEffect(()=>{
    let params = {
      id
    }
    axiosCustom({ cmd: "/market-separate/issue-order",params }).then(res => {
      setInfo(res)
      console.log(res, 'res++++')
    })
  },[])
  const navigate = useNavigate();
  const submitFunc = () => {
    if(!submitValue){
      Toast.show('请输入数量')
      return
    }
    if(Number(submitValue)>Number(info.dcp)&&type == 2){
      Toast.show(`数量不可超过可用`)
      return
    }
    if(submitValue<info.min_num){
      Toast.show(`数量不可小于${info.min_num}`)
      return
    }
    if(submitValue>info.max_num){
      Toast.show(`数量不可大于${info.max_num}`)
      return
    }
      setSubVisible(true)
  }
  const beforeClose = () =>{
    setVisible(false)
    setPhone('')
  }
  const modelClose = () => {
    if(!phone){
      Toast.show({
        content: '请输入验证码',
      })
      return
    }
    beforeClose()
    navigate(-1);
  }
  const inputChange = (e) =>{
    setSubmitValue(e)
  }
  const handleGetCode = () => {
    if(codeSent){

      return
    }
    // 这里可以调用发送验证码的API，这里使用setTimeout模拟异步请求
    // 假设请求成功后会收到一个确认信息或者成功状态
    // 在真实应用中，请替换成实际的请求逻辑
    setTimeout(() => {
      // 假设请求成功后开始倒计时60秒
      setCodeSent(true);
      setCountdown(60);

      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) {
            clearInterval(timer);
            setCodeSent(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }, 1000); // 假设这里模拟请求发送的延迟
  };
  const handleChangePhone = (e) => {
    setPhone(e);
  };
  const modelClose2 = () => {
    setInputValue('')
    setSubVisible(false)
  }
  const setMax = () =>{
    if(type == 1){
      setSubmitValue(info.max_num)
    } else {
      setSubmitValue(info.dcp)
    }
  }
  const onChange = (value) => {
    setError(false)
    setInputValue(value)
  }
  const modelCloseInput = () => {
    if(inputValue.length<6){
      setError(true)
    } else{
      let data = {
        id,
        num:submitValue,
        pay_password:inputValue
      }
      axiosCustom({ cmd: "/market-separate/booking-order",method:'post',data }).then((res) => {
        navigate(-1,{replace:true})
        // commonFun()
        // setSubmitValue('')
        // setInputValue('')
        // setTypeNumber({num1:'0.00',num2:'0.00'})
        // setType2Number('0.00')
        // Toast.show('闪兑成功！')
        // setSubVisible(false)
      })
    }
  }
  return (
    <div className={styles.outBox}>
            <CenterPopup
        visible={subVisible}
        style={{'--z-index':'10000000'}}
        onMaskClick={() => {
          setSubVisible(false)
        }}
      >
        <div className={styles.popBox} style={{ padding: '27px 20px 22px' }}>
          <img src={close} className={styles.close} onClick={modelClose2}></img>
          <div className={styles.title} style={{ marginBottom: '32px' }}>请输入支付密码</div>
          {/* <div className={styles.info}>
            <div>1. 7*24小时支持流通信用分与通证的闪兑</div>
            <div>2. 流通信用分兑出手续费为5%;</div>
            <div>3. 流通信用分兑出数量为10 - 10000:</div>
            <div>4. 通证兑出数量为10 - 10000:</div>
            <div>5. 流通信用分兑出分为5%的消费通证与95%的通证:</div>
          </div> */}
          <PasscodeInput seperated style={{ marginBottom: '32px' }}  onChange={onChange}
          value={inputValue}
            error={error} />
          <div className={styles.know} onClick={modelCloseInput} style={{ width: '100%' }}>
            确认
          </div>
        </div>
        {/* <div className={styles.myContent}>Hello</div> */}
      </CenterPopup>
      {/* <CenterPopup
        visible={visible}
        onMaskClick={() => {
          setVisible(false)
        }}
      >
        <div className={styles.popBox}>
          <img src={close} className={styles.close} onClick={beforeClose}></img>
          <div className={styles.title}>请输入验证码进行交易</div>
          <div className={styles.password}>
            <Input placeholder='请输入验证码' clearable style={{'flex':'1'}} value={phone}  onChange={handleChangePhone}/>
            <div className={styles.time} onClick={handleGetCode}>{codeSent ? `重新发送(${countdown}s)` : '获取验证码'}</div>
          </div>
          {
            codeSent&&(
              <div className={styles.tips}>我们刚向您的手机尾号<span>5665</span>发送了验证码</div>
            )
          }
          <div className={styles.know} onClick={modelClose}>
            确认
          </div>
        </div>
      </CenterPopup> */}
      <Header name={type == 1 ? '购买' : '出售'} />
      <div className={styles.header}>
        <img src={type == 1 ? buy : sell} className={styles.icon}></img>
        <div>
          <div className={styles.top}>{type == 1 ? '购买' : '出售'} DCP</div>
          <div className={styles.bottom}>
            <div>单价</div>
            <div>￥{info.price}</div>
            {/* <div>00:42</div> */}
          </div>
        </div>
      </div>
      <div className={styles.opera}>
        <div className={styles.switchBox}>
          {/* <div className={`${status == 2 && styles.noActive} ${styles.itemBox} `} onClick={() => checkStatus(1)}>
            <div className={styles.name}>按金额</div>
            <div className={styles.line}></div>
          </div> */}
          <div className={` ${styles.itemBox} `}>
            <div className={styles.name}>按数量</div>
            <div className={styles.line}></div>
          </div>
        </div>
        <Form layout='horizontal' style={{ '--border-top': 'none', borderColor: 'red', marginBottom: '9px' }}>
          <Form.Item
            extra={
              <div className={styles.extraPart}>
                <div>DCP</div>
                <div></div>
                <div onClick={setMax}>最大</div>
              </div>
            }
          >
            <Input placeholder='0.00' clearable type="number" value={submitValue} onChange={(e) => inputChange(e)} />
          </Form.Item>
        </Form>
        <div>
          <div className={styles.money}>
            <div>限额</div><div>{info.min_num}-{info.max_num} DCP</div>
          </div>
          {
            type == 2 && (
              <div className={styles.money}>
                <div>可出售</div><div>{info.dcp} DCP</div>
              </div>
            )
          }
          <div className={styles.overMoney}>
            <div>{type == 1 ? '应付' : '出售'}</div><div>{submitValue} {type == 1 ? 'CNY' : 'DCP'}</div>
          </div>
        </div>

      </div>
      {
        type == 1 && (
          <div className={styles.payment}>
            <div className={styles.title}>支付方式</div>
            <div className={styles.payType}>
              {
                info?.receipt?.includes('1')&&                            <div className={styles.items}>
                <div className={styles.line} style={{ background: 'rgba(0, 160, 232, 1)' }}></div>
                <div className={styles.name}>支付宝</div>
              </div>
              }
              {
                info?.receipt?.includes('2')&&              <div className={styles.items}>
                <div className={styles.line}></div>
                <div className={styles.name}>微信支付</div>
              </div>
              }
                            {
                info?.receipt?.includes('3')&&               <div className={styles.items}>
                <div className={styles.line} style={{ background: "rgba(247, 181, 0, 1)" }}></div>
                <div className={styles.name}>银行卡</div>
              </div>
              }

             
            </div>
          </div>
        )
      }

      <div className={styles.storeInfo}>
        <div className={styles.title}>商家信息</div>
        {/* <div className={styles.items}>
          <div>规定支付时长</div>
          <div>{info.tips}</div>
        </div> */}
        <div className={styles.items}>
          <div>商家昵称</div>
          <div>{info.nick_name}</div>
        </div>
        <div className={styles.tips}>
          <div className={styles.title}>交易提醒</div>
          <div className={styles.value} dangerouslySetInnerHTML={{ __html: info?.mark }}>
            {/* <div>必须使用本人实名账号转账。</div>
            <div>转账时请不要备注任何信息。</div>
            <div>请不要设置延迟到账</div> */}
          </div>
        </div>
      </div>
      <div className={styles.overBtn} onClick={submitFunc}>
        {type == 1 ? '购买' : '出售'}DCP
      </div>
    </div>
  );
}
