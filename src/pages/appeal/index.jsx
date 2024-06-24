import styles from "./index.less";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "@/components/Header";
import tips_black from "../../assets/tips_black.png";
import arrow_down from "../../assets/arrow_down.png";
import { ImageUploader, Toast, Input, TextArea,Popup } from "antd-mobile";
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
  const [fileList, setFileList] = useState([]);
  const [inputValue,setInputValue] = useState('')
  const [selectItem,setSelectItem] = useState([
    {name:'虚假转账凭证',status:false,line:'rgba(247, 181, 0, 1)',type:2},
    {name:'转账金额不足',status:false,line:'rgba(0, 160, 232, 1)',type:3},
  ])
  function mockUpload(file) {
    return {
      url: URL.createObjectURL(file),
    };
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
  const TextAreafun = (e) => {
    setText(e);
  };
  const submit = () =>{
    const newArr = [...selectItem]
    let result = newArr.filter(item=>{
       return item.status
    })
    setInputValue(result[0].name)
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
  const itemClick = (index )=>{
    const newArr = [...selectItem]
    newArr.forEach(item=>{
      item.status = false
    })
    newArr[index].status = true
    setSelectItem(newArr)
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
          <div className={styles.popHeader}>申述类型</div>
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
      <div style={{ padding: "0 14px", marginBottom: "22px" }}>
        <Header name={"申诉"} />
      </div>
      <div className={styles.contentBox}>
        <div className={styles.title}>申述类型</div>
        <div className={styles.inputBox} onClick={()=>setVisible(true)}>
          <Input placeholder="选择申述类型" value={inputValue} readOnly />
          <img src={arrow_down}></img>
        </div>
        <div className={styles.title}>申诉原因</div>
        <div className={styles.inputBox}>
          <TextArea
            value={text}
            placeholder="请填写申诉描述"
            showCount
            maxLength={200}
            onChange={TextAreafun}
          />
        </div>
        <div className={styles.title}>添加凭证</div>
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
        <div className={styles.tips1}>
          添加相关转账证明或证明材料（仅支持png、jpg、pdf格式）
        </div>
        <div className={styles.btns}>提交申述</div>
      </div>
    </div>
  );
}
