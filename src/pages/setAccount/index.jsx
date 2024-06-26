import styles from "./index.less";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "@/components/Header";
import tips_black from "../../assets/tips_black.png";
import arrow_down from "../../assets/arrow_down.png";
import { ImageUploader, Toast, Input, TextArea, Popup } from "antd-mobile";
// import { lorem } from 'demos'
import check from "../../assets/check.png";
import unCheck from "../../assets/unCheck.png";
// 1:待付款 2：交易中
const demoSrc =
  "https://images.unsplash.com/photo-1567945716310-4745a6b7844b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=60";
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
  const [current, setCurrent] = useState(selectItem[0])
  function mockUpload(file) {
    return {
      url: URL.createObjectURL(file),
    };
  }
  const getCurrentItem = () => {
    const newArr = [...selectItem]
    let result = newArr.filter(item => {
      return item.status
    })
    return result[0]
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
    setInputValue(result[0].name)
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
  }
  const TextAreafun = (e) => {
    setText(e);
  };
  const numberfun = (e) => {
    setNumber(e);
  };
  const name = () => {

    let params = {
      1: '银行账号',
      2: '支付宝账号',
      3: '微信账号'
    }
    return params[current.type]
  }
  // const navigate = useNavigate();
  return (
    <div className={styles.outBox}>
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
            {
              current && current.type != 1 && <div className={styles.specialTitle}>及时支付</div>
            }

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
          current.type == 1 ? <div>
            <div className={styles.title}>开户银行<span style={{color:'red'}}>*</span></div>
            <div className={styles.inputBox}>
              <Input
                value={number}
                type="number"
                placeholder={`请输入${name()}`}
                onChange={numberfun}
              />
            </div>
          </div> : <div>
            <div className={styles.title}>二维码</div>
            <ImageUploader
              style={{ "--cell-size": "115px", marginBottom: "15px" }}
              value={fileList}
              onChange={setFileList}
              upload={mockUpload}
              beforeUpload={beforeUp}
              multiple
              maxCount={1}
              showUpload={fileList.length < 2}
            />
          </div>
        }
        <div className={styles.btns}>完成添加</div>
      </div>
    </div>
  );
}
