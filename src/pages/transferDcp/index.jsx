
import styles from "./index.less";
import { useEffect, useState } from "react";
import dropDown from "../../assets/dropDown.png";
import { sleep } from 'antd-mobile/es/utils/sleep'
import transfer from "../../assets/transfer.png";
import Header from '@/components/Header'
import { useNavigate } from "react-router-dom";
import close from "../../assets/icon_close.png";
import { Form, Input, CenterPopup,Toast } from 'antd-mobile'
import { LeftOutline } from 'antd-mobile-icons'
import { BrowserRouter as Router, Route, Link, useParams } from 'react-router-dom';
import order from "../../assets/record.png";
import { axiosCustom } from "@/Common";
// import { lorem } from 'demos'
export default function AboutPage() {
  const { type } = useParams();
  const [visible, setVisible] = useState(false)
  const [status, setStatus] = useState(1)
  const [dcpInfo,setDcpInfo] = useState({})
  const [account,setAccount] = useState('')
  const [password,setPassword] = useState('')
  const [phone, setPhone] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [submitValue,setSubmitValue] = useState('')
  const checkStatus = (type) => {
    setStatus(type)
  }
  useEffect(()=>{
    axiosCustom({ cmd: "/donation/donation-conf" }).then(res => {
      setDcpInfo(res)
    })
    
  },[])
  const navigate = useNavigate();
  const submitFunc = () => {
    if(!account){
      Toast.show('请输入转赠账户')
      return
    }
    if(!password){
      Toast.show('请输入支付密码')
      return
    }
    if(!submitValue){
      Toast.show('请输入数额')
      return
    }
    let data = {
      type:2,
      num:submitValue,
      phone:account,
      password
    }
    axiosCustom({ cmd: "/donation/donation",method:'post',data }).then(res => {
      Toast.show('转赠成功')
      navigate(-1,{replace:true});
    })
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
  const accountChange = (e) =>{
    setAccount(e)
  }
  const passwordChange = (e) =>{
    setPassword(e)
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
  const handleClick = () => {
    // 返回上一页
    navigate(-1);
  };
  const gotoOrder = () =>{
    navigate('/transferRecord');
  }
  const setMax = () =>{
    setSubmitValue(dcpInfo?.dcp)
  }
  return (
    <div className={styles.outBox}>
      <CenterPopup
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
        {/* <div className={styles.myContent}>Hello</div> */}
      </CenterPopup>
      <div className={styles.box}>
        <LeftOutline fontSize={16} className={styles.back} onClick={handleClick} />
        转赠DCP
        <div className={styles.rightBox} onClick={()=>gotoOrder()}>
          <img src={order} className={styles.order} ></img>
          记录
        </div>
      </div>
      {/* <Header name={'转赠DCP'} /> */}
      <div className={styles.header}>
        <img src={transfer} className={styles.icon}></img>
        <div>
          <div className={styles.top}>转赠DCP</div>
          <div className={styles.bottom}>
            <div>{dcpInfo?.ps}</div>
          </div>
        </div>
      </div>
      <div className={styles.opera}>
        <div className={styles.switchBox}>
          <div className={` ${styles.itemBox} `} >
            <div className={styles.name}>转赠数量</div>
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
        <div className={styles.money}>
          <div>可用</div><div>{dcpInfo?.dcp}</div>
        </div>

      </div>
      <div className={styles.storeInfo}>
        <div className={styles.items}>
          <div>到账数量</div>
          <div className={styles.rightMoney}>
            <div>{submitValue}</div>
            <div>DCP</div>
          </div>
        </div>
      </div>
      <div className={styles.inputTitle}>转赠账户</div>
      <div className={styles.inputBox}>
        <Input  clearable value={account} onChange={(e) => accountChange(e)} />
      </div>
      <div className={styles.inputTitle}>支付密码</div>
      <div className={styles.inputBox} style={{marginBottom:'45px'}}>
        <Input  clearable value={password} type='password' onChange={(e) => passwordChange(e)} />
      </div>
      <div className={styles.overBtn} onClick={submitFunc}>
          确认转赠
      </div>
    </div>
  );
}
