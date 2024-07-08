import { Checkbox, Input, Button, Popup, Toast } from "antd-mobile";
import { useState, useEffect,useRef } from "react";
import { getCaptcha, getCaptchaMock } from "@/api/user.js";
import { useNavigate } from "react-router-dom";
import styles from "@/assets/css/login.less";
import logo from '@/assets/logo.png'
import { axiosCustom,storage } from "@/Common";
import dropDown from "@/assets/dropdown2.png";
export default function LoginPage() {
  const handler = useRef()
  const [type, setType] = useState(1)
  const [type2, setType2] = useState(1)
  const [visible, setVisible] = useState(false)
  const [text, setText] = useState('')
  const [areCode, setArecCode] = useState(86)
  const [codeSent, setCodeSent] = useState(false);
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('')
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(0);
  const [country, setCountry] = useState([])
  useEffect(() => {
    axiosCustom({ cmd: "/home/country" }).then(res => {
      setCountry(res)
    })
    let res = storage.get('token')
    if(res){
      navigate('/home')
    }
    // console.log(res, 'res+++')
  }, [])
  const checkType = (type) => {
    setText('')
    setType(type)
  }
  const checkType2 = (type) => {
    setPhone('')
    setPassword('')
    setType2(type)
  }
  const TextAreafun = (e) => {
    setText(e)
  }
  const clickCountry = (e) => {
    setArecCode(e)
    setVisible(false)
  }
  const handleChangePhone = (e) => {
    setPhone(e);
  };
  const handlepassword = (e) => {
    setPassword(e);
  };
  const handleGetCode = async() => {
    if (!text) {
      Toast.show(`请输入${type == 1 ? '手机号' : '邮箱'}`)
      return
    }
    if (codeSent) {
      return
    }
    // 这里可以调用发送验证码的API，这里使用setTimeout模拟异步请求
    // 假设请求成功后会收到一个确认信息或者成功状态
    // 在真实应用中，请替换成实际的请求逻辑
    let data = {
      phone:text
    }
    if(type == 1){
      data.country = areCode
    }
    const res = await axiosCustom({
      cmd: "/sms/login-code", method: "put", data,
    })
    Toast.show('发送成功')
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
  const loginFun = async() => {
    handler.current = Toast.show({
      icon: 'loading',
      content: '登录中',
      duration: 0,
    })
    // 验证码登录
    if(type2 == 1){
      let data = {
        code:phone,
        login_name:text
      }
      if(type == 1){
        data.country = areCode
      }
      let res = await axiosCustom({
        cmd: "/account/in-code", method: "post", data,
      })
      storage.set('token',res)
      handler.current?.close()
      Toast.show('登录成功')
      axiosCustom({ cmd: "/user/info" }).then(res => {
        storage.set('user',res.user)
      })
      navigate('/home')
    } else {
      let data = {
        login_name:text,
        password
      }
      if(type == 1){
        data.country = areCode
      }
      let res = await axiosCustom({
        cmd: "/account/in-pass", method: "post", data,
      })
      storage.set('token',res)
      handler.current?.close()
      Toast.show('登录成功')
      axiosCustom({ cmd: "/user/info" }).then(res => {
        storage.set('user',res.user)
      })
      navigate('/home')
    }

  }
  const submit = () => {
    setVisible(false);
  }
  return (
    <div className={styles.outBOx}>
      <Popup
        visible={visible}
        onMaskClick={() => {
          setVisible(false);
        }}
        bodyStyle={{
          borderTopLeftRadius: "8px",
          borderTopRightRadius: "8px",
          height: "80vh",
          padding: "24px 15px 18px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div style={{ height: '100%' }}>
          <div className={styles.popHeader}>选择国家或地区</div>
          <div className={styles.overflow}>
            {
              country.map((item, index) => {
                return (
                  <div className={styles.items} key={index} onClick={() => clickCountry(item.phone_code)}>
                    <div className={styles.title}>{item.chinese_name}</div>
                    <div className={styles.number}>+{item.phone_code}</div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </Popup>
      <img src={logo} className={styles.logo} />
      <div className={styles.title}>登录</div>
      <div className={styles.tab}>
        <div className={type == 1 ? styles.active : ''} onClick={() => checkType(1)}>手机号</div>
        <div className={type == 2 ? styles.active : ''} onClick={() => checkType(2)}>邮箱</div>
      </div>
      {
        type == 1 && <div className={styles.inputBox}>
          <div style={{ display: 'flex', alignItems: 'center' }} onClick={() => setVisible(true)}>
            <div>+{areCode}</div>
            <img className={styles.box} src={dropDown}></img>
          </div>

          <div className={styles.line}></div>
          <Input
            value={text}
            placeholder='请输入手机号'
            clearable
            onChange={TextAreafun}
          />
        </div>
      }
      {
        type == 2 && <div className={styles.inputBox}>
          <Input
            value={text}
            placeholder='请输入邮箱'
            onChange={TextAreafun}
          />
        </div>
      }
      <div className={styles.tabBox}>
        <div className={type2 == 1 ? styles.active : ''} onClick={() => checkType2(1)}>验证码登录</div>
        <div className={styles.special}>/</div>
        <div className={type2 == 2 ? styles.active : ''} onClick={() => checkType2(2)}>密码登录</div>
      </div>
      {
        type2 == 1 && <div>
          <div className={styles.inputBox}>
            <Input placeholder='请输入验证码' clearable style={{ 'flex': '1' }} value={phone} onChange={handleChangePhone} />
            <div className={styles.time} onClick={handleGetCode}>{codeSent ? `重新发送(${countdown}s)` : '获取验证码'}</div>
          </div>
        </div>
      }
      {
        type2 == 2 && <div>
          <div className={styles.inputBox}>
            <Input placeholder='请输入密码' type="password" clearable value={password} onChange={handlepassword} />
          </div>
        </div>
      }
      <div className={styles.login} onClick={loginFun}>登录</div>
    </div>
  );
}
