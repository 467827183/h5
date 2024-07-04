import styles from "./index.less";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "@/components/Header";
import tips_black from "../../assets/tips_black.png";
import copy from "../../assets/copy.png";
import { ImageUploader,Image,CenterPopup,PasscodeInput, Toast } from "antd-mobile";
import { axiosCustom, storage } from "@/Common";
// import { lorem } from 'demos'
import moment  from "moment";
// 1:待付款 2：交易中
const demoSrc =
  "https://images.unsplash.com/photo-1567945716310-4745a6b7844b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=60";
export default function AboutPage() {
  const { type,id } = useParams();
  const [fileList, setFileList] = useState([]);
  const [info,setInfo] = useState({})
  const [subVisible, setSubVisible] = useState(false)
  const [inputValue,setInputValue] = useState('')
  const [error, setError] = useState(false)
  const [fileData,setFileData] = useState('')
  function mockUpload(file) {
    setFileData(file)
    return {
      url: URL.createObjectURL(file),
    };
  }
  useEffect(()=>{
    console.log(id, 'id+++++')
    let params = {
      id
    }
    axiosCustom({ cmd: "/market-separate/order",params }).then(res => {
      setInfo(res)
      console.log(res, 'res++++')
    })
  },[])
  const navigate = useNavigate();
  const gotoAppeal = (orderNumber) =>{
    navigate(`/appeal/${type}/${orderNumber}`)
  }
  const  hashCopy = (hash) => {
    const copyInput = document.createElement("input");
    copyInput.setAttribute("value", hash);
    document.body.appendChild(copyInput);
    copyInput.select();
    document.execCommand("copy");
    document.body.removeChild(copyInput);
  }
  const overSubmit = () =>{
    if(info.status == 1){
      if(!fileData){
        Toast.show('请上传支付凭证')
        return
      }
    }
    setSubVisible(true)
  }
  const onChange = (value) => {
    setError(false)
    setInputValue(value)
  }
  const modelClose2 = () => {
    setInputValue('')
    setSubVisible(false)
  }
  const modelCloseInput1 = () => {
    if(inputValue.length<6){
      setError(true)
    } else{
      let data = {
        id,
        pay_password:inputValue
      }
      axiosCustom({ cmd: "/market-separate/buy-confirm",method:'post',data }).then((res) => {
        Toast.show('确认完成')
        setInputValue('')
        navigate(-1,{replace:true})
      })
    }
  }
  const [timeLeft, setTimeLeft] = useState('');

  // 在组件挂载时开始倒计时
  useEffect(() => {
    let time = info.status == 1?info.pay_expire_time:info.confirm_expire_time
    if(!time){
      return
    }
    const interval = setInterval(() => {
      // 计算时间差
      const now = moment();
      const diffDuration = moment.duration(moment(time).diff(now));

      // 格式化时间差为 mm:ss
      const formattedTime = moment.utc(diffDuration.as('milliseconds')).format('mm:ss');
      
      // 更新时间状态
      setTimeLeft(formattedTime);

      // 如果倒计时结束，执行相应操作
      if (formattedTime === '00:00') {
        clearInterval(interval); // 清除定时器
        Toast.show('订单超时');
        history.replace(-1); // 替换当前页面
      }
    }, 1000);

    // 组件卸载时清除定时器
    return () => clearInterval(interval);
  }, [info.pay_expire_time]);
  const modelCloseInput2 = () => {
    if(inputValue.length<6){
      setError(true)
    } else{
      const headers = {
        'Content-Type': 'multipart/form-data'
      }
      const formData = new FormData();
      formData.append('id', id); // 添加额外的参数
      formData.append('file', fileData)
      formData.append('pay_password', inputValue)
      // formData.append('file', file); // 'file' 是后端需要接收的字段名
      axiosCustom({ cmd: "/market-separate/buy-pay",method:'post',data:formData,headers }).then(res => {
        Toast.show('确认完成')
        setInputValue('')
        navigate(-1,{replace:true})
      })  
    }
  }
  // const navigate = useNavigate();
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
          <PasscodeInput seperated style={{ marginBottom: '32px' }}  onChange={onChange}
          value={inputValue}
            error={error} />
          <div className={styles.know} onClick={info.status == 1?modelCloseInput2:modelCloseInput1} style={{ width: '100%' }}>
            确认
          </div>
        </div>
        {/* <div className={styles.myContent}>Hello</div> */}
      </CenterPopup>
      <div style={{ padding: "0 14px", marginBottom: "42px" }}>
        <Header name={"订单详情"} />
      </div>
      <div className={styles.header}>
        <div className={styles.title}>{info.status_name}</div>
        <div className={styles.flexBox}>
          <div className={styles.time}>{timeLeft}</div>
          <div className={styles.tips}>内卖家未同意交易，将自动取消订单</div>
        </div>
      </div>
      <div className={styles.lines}></div>
      <div className={styles.infoBox}>
        <div className={styles.user}>
          <div className={styles.userPic} style={{backgroundImage:`url(${info.type == 'sell'?info?.buy_user?.user_face:info?.sell_user?.user_face})`}}></div>
          <div>{info.type == 'sell'?info?.buy_user?.nick_name:info?.sell_user?.nick_name}</div>
        </div>
        <div className={styles.title}>订单信息</div>
        <div className={styles.items}>
          <div className={styles.label}>订单编号</div>
          <div className={styles.content}>
          {info?.order_number}<img src={copy} className={styles.copyImg} onClick={()=>hashCopy(info?.order_number)}></img>
          </div>
        </div>
        <div className={styles.items}>
          <div className={styles.label}>下单时间</div>
          <div className={styles.content}>{info.buy_time}</div>
        </div>
        <div className={styles.items}>
          <div className={styles.label}>单价</div>
          <div className={styles.content1}>￥{info.price}</div>
        </div>
        <div className={styles.items}>
          <div className={styles.label}>数量</div>
          <div className={styles.content1}>{info.num} DCP</div>
        </div>
        <div className={styles.items}>
          <div className={styles.label}>应付金额</div>
          <div className={styles.content1}>￥{info.market_price}</div>
        </div>
        {/* <div className={styles.items}>
          <div className={styles.label}>卖家收款方式</div>
          <div className={styles.content1}>
            <div className={styles.smallLine}></div>
            微信支付
          </div>
        </div> */}
        <div className={styles.bigTips}>
          <img src={tips_black}></img>
          <div className={styles.content} dangerouslySetInnerHTML={{ __html: info?.mark }}>
          </div>
        </div>
      </div>
      <div className={styles.lines}></div>
      <div className={styles.infoBox}>
        <div className={styles.title}>账户信息</div>
        <div className={styles.items}>
          <div className={styles.label}>购买方</div>
          <div className={styles.content}>
            {info?.buy_user?.login_name}<img src={copy} className={styles.copyImg} onClick={()=>hashCopy(info?.buy_user?.login_name)}></img>
          </div>
        </div>
        <div className={styles.items}>
          <div className={styles.label}>出售方</div>
          <div className={styles.content}>
          {info?.sell_user?.login_name}<img src={copy} className={styles.copyImg} onClick={()=>hashCopy(info?.sell_user?.login_name)}></img>
          </div>
        </div>
      </div>
      <div className={styles.lines}></div>
      <div className={styles.infoBox}>
        <div className={styles.title} style={{ marginBottom: "15px" }}>
          支付信息
        </div>
        {
          info?.receipt?.wechat&&(
            <div style={{ marginBottom: "20px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "8px",
              }}
            >
              <div className={styles.smallLine}></div>
              <div className={styles.paymentTitle}>微信支付</div>
            </div>
            <div className={styles.payDetail}>
              <div>{info?.receipt?.wechat[0].name}</div>
              <div className={styles.line}></div>
              <div style={{ display: "flex", alignItems: "center" }}>
              {info?.receipt?.wechat[0].value}<img src={copy} className={styles.copyImg} onClick={()=>hashCopy(info?.receipt?.wechat[0].value)}></img>
              </div>
            </div>
          </div>
          )
        }
        {
          info?.receipt?.bank&&<div style={{ marginBottom: "20px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "8px",
            }}
          >
            <div className={styles.smallLine}></div>
            <div className={styles.paymentTitle}>银行卡</div>
          </div>
          <div className={styles.payDetail}>
            <div>{info?.receipt?.bank[2].value}</div>
            <div className={styles.line}></div>
            <div style={{ display: "flex", alignItems: "center" }}>
              {info?.receipt?.bank[0].value}
              <img src={copy} className={styles.copyImg} onClick={()=>hashCopy(info?.receipt?.bank[0].value)}></img>
            </div>
          </div>
          <div className={styles.payDetail}>
            <div className={styles.line} style={{ marginLeft: 0 }}></div>
            <div>{info?.receipt?.bank[1].value}</div>
          </div>
        </div>
        }

      </div>
      {info.type == 'buy' && info.status == '1'&& (
        <div>
          <div className={styles.lines}></div>
          <div className={styles.infoBox} style={{ paddingBottom: "20px" }}>
            <div className={styles.title} style={{ marginBottom: "15px" }}>
              支付凭证
            </div>
            <ImageUploader
              style={{ "--cell-size": "115px", height: "115px" }}
              value={fileList}
              onChange={setFileList}
              upload={mockUpload}
              multiple
              maxCount={1}
              showUpload={fileList.length < 2}
            />
          </div>
          <div className={styles.lines} style={{ height: "1px" }}></div>
          <div className={styles.submit}>
            <div className={styles.btn} onClick={()=>overSubmit()}>确认支付</div>
          </div>
        </div>
      )}
      {/* {type == 1 && status == 2&&(
        <div>
          <div className={styles.lines}></div>
          <div className={styles.infoBox} style={{ paddingBottom: "20px" }}>
            <div className={styles.title} style={{ marginBottom: "15px" }}>
              支付凭证
            </div>
            <Image src={demoSrc} width={115} height={115} fit='fill' />
          </div>
        </div>
      )} */}
      {info.type == 'sell' && info.status == '2'&&(
        <div>
          <div className={styles.lines}></div>
          <div className={styles.infoBox} style={{ paddingBottom: "20px" }}>
            <div className={styles.title} style={{ marginBottom: "15px" }}>
              支付凭证
            </div>
            <Image src={info.voucher} width={115} height={115} fit='fill' />
          </div>
          <div className={styles.lines} style={{ height: "1px" }}></div>
          <div className={styles.submit}>
            <div className={styles.leftBtn} onClick={()=>gotoAppeal(info.order_number)}>申诉</div>
            <div className={styles.btn} onClick={()=>overSubmit()}>确认收货</div>
          </div>
        </div>
      )}
    </div>
  );
}
