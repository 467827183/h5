import styles from "./index.less";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "@/components/Header";
import tips_black from "../../assets/tips_black.png";
import arrow_down from "../../assets/arrow_down.png";
import { PasscodeInput , Toast, Input, CenterPopup, Popup } from "antd-mobile";
// import { lorem } from 'demos'
import check from "../../assets/check.png";
import unCheck from "../../assets/unCheck.png";
// 1:待付款 2：交易中
import close from "../../assets/icon_close.png";
const demoSrc =
  "https://images.unsplash.com/photo-1567945716310-4745a6b7844b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=60";
  import { axiosCustom, storage } from "@/Common";
export default function AboutPage() {
  const { type, status } = useParams();
  const [visible, setVisible] = useState(false)
  const [text, setText] = useState("");
  const [number, setNumber] = useState('')
  const [fileList, setFileList] = useState([]);
  const [inputValue, setInputValue] = useState('')
  const [selectItem, setSelectItem] = useState([
    { name: '银行卡', status: true, line: 'rgba(247, 181, 0, 1)', type: 1 },
    { name: '支付宝', status: false, line: 'rgba(0, 160, 232, 1)', type: 2 },
    { name: '微信支付', status: false, line: 'rgba(46, 175, 100, 1)', type: 3 },
  ])
  const [subVisible, setSubVisible] = useState(false)
  const [bank,setBank] = useState('')
  const [current, setCurrent] = useState(selectItem[0])
  const [error, setError] = useState(false)
  const navigate = useNavigate();
  function mockUpload(file) {
    return {
      url: URL.createObjectURL(file),
    };
  }
  useEffect(()=>{

    if(type != 1){
      axiosCustom({ cmd: "/receipt/receipt" }).then(res => {
        //支付宝
        if(type == 3){
          setCurrent(selectItem[2])
          setText(res.wechat.true_name)
          setNumber(res.wechat.account)
          console.log(current, 'current')
        } else if (type == 4){
          setCurrent(selectItem[0])
          setText(res.bank.bank_holder)
          setNumber(res.bank.card_no)
          setBank(res.bank.bank_name)
        } else {
          setText(res.alipay.true_name)
          setNumber(res.alipay.account)
        }
    })  
    }
  },[])
  const getCurrentItem = () => {
    const newArr = [...selectItem]
    let result = newArr.filter(item => {
      return item.status
    })
    return result[0]
  }
  const onChange = (value) => {
    setError(false)
    setInputValue(value)
  }
  const beforeUp = (file, files) => {
    const allowedTypes = ["image/png", "image/jpg", "image/pdf"];
    const selectedFile = files;
    if (!allowedTypes.includes(selectedFile[0].type)) {
      Toast.show({
        content: "只能上传JPG,PNG,PDF格式的图片",
      });
      return false;
    } else {
      return file;
    }
  };

  const submit = () => {
    const newArr = [...selectItem]
    let result = newArr.filter(item => {
      return item.status
    })
    setCurrent(result[0])
    setVisible(false);

  }
  const hashCopy = (hash) => {
    const copyInput = document.createElement("input");
    copyInput.setAttribute("value", hash);
    document.body.appendChild(copyInput);
    copyInput.select();
    document.execCommand("copy");
    document.body.removeChild(copyInput);
  };
  const itemClick = (index) => {
    const newArr = [...selectItem]
    newArr.forEach(item => {
      item.status = false
    })
    newArr[index].status = true
    setSelectItem(newArr)
    setText('')
    setNumber('')
    setBank('')
  }
  const TextAreafun = (e) => {
    setText(e);
  };
  const numberfun = (e) => {
    setNumber(e);
  };
  const bankfun = (e) => {
    setBank(e);
  };
  const name = () => {

    let params = {
      1: '银行账号',
      2: '支付宝账号',
      3: '微信账号'
    }
    return params[current.type]
  }
  const oversubmit = () =>{
    if(!text){
      return Toast.show('请输入姓名')
    }
    if(!number){
      return Toast.show('请输入账号')
    }
    if(current.type == 1 &&!bank){
      return Toast.show('请输开户银行')
    }
    setSubVisible(true)
  }
  const modelClose2 = () => {
    setInputValue('')
    setSubVisible(false)
  }
  const modelCloseInput = () => {
    if(inputValue.length<6){
      setError(true)
    } else{
      let data = {
        account:number,
        name:text,
        password:inputValue
      }
      if(current.type == 2){
        axiosCustom({ cmd: "/receipt/alipay",method:'post',data }).then(res => {
          Toast.show(`${type == 1?'添加':'修改'}成功`)
          navigate('/account',{replace:true})
        })  
      }
      if(current.type== 3){
        axiosCustom({ cmd: "/receipt/wechat",method:'post',data }).then(res => {
          Toast.show(`${type == 1?'添加':'修改'}成功`)
          navigate('/account',{replace:true})
        })  
      }
      if(current.type == 1){
        let newData = {
          card_no:number,
          bank_name:bank,
          bank_holder:text,
          password:inputValue
        }
        axiosCustom({ cmd: "/receipt/bank",method:'post',data:newData }).then(res => {
          Toast.show(`${type == 1?'添加':'修改'}成功`)
          navigate('/account',{replace:true})
        })  
      }

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
          <div className={styles.popHeader}>收款方式</div>
          {
            selectItem.map((item, index) => {
              return <div className={styles.item} key={index} onClick={() => itemClick(index)}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {item.line && (
                    <div style={{ backgroundColor: item.line }} className={styles.line}></div>
                  )}
                  <div className={styles.name} style={{ fontWeight: 600 }}>{item.name}</div>
                </div>
                {
                  item.status ? <img src={check} /> : <img src={unCheck} />
                }
              </div>
            })
          }
        </div>
        <div className={styles.bottomBox}>

          <div className={styles.btnRight} onClick={submit}>
            确认
          </div>
        </div>
      </Popup>
      <div style={{ padding: "0 14px", marginBottom: "22px" }}>
        <Header name={type == 1 ? '添加收款账号' : '编辑收款账号'} />
      </div>
      <div className={styles.contentBox}>
        <div className={styles.title}>收款方式</div>
        <div className={styles.inputBox} onClick={() => setVisible(true)} style={{ marginBottom: '0px' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ backgroundColor: current?.line }} className={styles.line}></div>
            <div className={styles.name} style={{ fontWeight: 400 }}>{current?.name}</div>
          </div>
          {/* <Input placeholder="选择收款方式" value={inputValue} readOnly /> */}
          <img src={arrow_down}></img>
        </div>
        <div className={styles.tips}>
          某些支付方式可能会有支付服务提供方设定的手续费和每日限额，请联系支付服务提供方了解详情
        </div>
        <div className={styles.title}>姓名<span style={{color:'red'}}>*</span></div>
        <div className={styles.inputBox}>
          <Input
            value={text}
            placeholder="请输入姓名"
            onChange={TextAreafun}
          />
        </div>
        <div className={styles.title}>{name()}<span style={{color:'red'}}>*</span></div>
        <div className={styles.inputBox}>
          <Input
            value={number}
            type="number"
            placeholder={`请输入${name()}`}
            onChange={numberfun}
          />
        </div>
        {
          current.type == 1 && <div>
            <div className={styles.title}>开户银行<span style={{color:'red'}}>*</span></div>
            <div className={styles.inputBox}>
              <Input
                value={bank}
                placeholder={`请输入开户银行`}
                onChange={bankfun}
              />
            </div>
          </div> 
        }

        <div className={styles.btns} onClick={oversubmit}>完成{type == 1?'添加':'修改'}</div>
      </div>
    </div>
  );
}
        // <div>
        //     <div className={styles.title}>二维码</div>
        //     <ImageUploader
        //       style={{ "--cell-size": "115px", marginBottom: "15px" }}
        //       value={fileList}
        //       onChange={setFileList}
        //       upload={mockUpload}
        //       beforeUpload={beforeUp}
        //       multiple
        //       maxCount={1}
        //       showUpload={fileList.length < 2}
        //     />
        //   </div>