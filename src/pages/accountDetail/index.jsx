import styles from "./index.less";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "@/components/Header";
import tips_black from "../../assets/tips_black.png";
import arrow_right_1 from "../../assets/arrow_right_1.png";
import noData from "../../assets/noData.png";
import qrCode from "../../assets/qrCode.png";
import { ImageUploader, Image } from "antd-mobile";
import { LeftOutline } from "antd-mobile-icons";
// import { lorem } from 'demos'
// 1:待付款 2：交易中
import icon_add from "../../assets/icon_add.png";
const demoSrc =
  "https://images.unsplash.com/photo-1567945716310-4745a6b7844b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=60";
export default function AboutPage() {
  const { type } = useParams();
  const [fileList, setFileList] = useState([{}]);
  function mockUpload(file) {
    console.log(file, "files");
    return {
      url: URL.createObjectURL(file),
    };
  }
  const typeParams = {
    1: '微信支付',
    2: '支付宝',
    3: '银行卡'
  }
  const navigate = useNavigate();
  const gotoAppeal = () => {
    navigate("/appeal/1");
  };
  const handleClick = () => {
    // 返回上一页
    navigate(-1);
  };
  const gotoOrder = () => {
    navigate("/order/1");
  };
  const hashCopy = (hash) => {
    const copyInput = document.createElement("input");
    copyInput.setAttribute("value", hash);
    document.body.appendChild(copyInput);
    copyInput.select();
    document.execCommand("copy");
    document.body.removeChild(copyInput);
  };
  const gotoEdit = () => {
    navigate("/setAccount/2");
  }
  // const navigate = useNavigate();
  return (
    <div className={styles.outBox}>
      <div className={styles.box}>
        <LeftOutline
          fontSize={16}
          className={styles.back}
          onClick={handleClick}
        />
        {typeParams[type]}
      </div>
      <div className={styles.contentBox}>
        <div className={styles.flexBox}>
          <div className={styles.name}>姓名</div>
          <div className={styles.content}>张三</div>
        </div>
        {
          type == 3 && (
            <div>
              <div className={styles.flexBox}>
                <div className={styles.name}>银行账号</div>
                <div className={styles.content}>Zsy908</div>
              </div>
              <div className={styles.flexBox} style={{ marginBottom: '51px' }}>
                <div className={styles.name}>开户银行</div>
                <div className={styles.content}>Zsy908</div>
              </div>
            </div>
          )
        }
        {
          type != 3 && (
            <div>
              <div className={styles.flexBox}>
                <div className={styles.name}>微信账号</div>
                <div className={styles.content}>Zsy908</div>
              </div>
              <div className={styles.flexBox} style={{ marginBottom: '51px' }}>
                <div className={styles.name}>二维码</div>
                <div className={styles.content}>
                  <img src={qrCode} style={{ width: "14px", height: '14px', marginRight: '9px' }}></img>
                  <img src={arrow_right_1} style={{ width: "14px", height: '14px' }}></img>
                </div>
              </div>
            </div>
          )
        }

        <div className={styles.btn1} onClick={gotoEdit}>
          更改
        </div>
        <div className={styles.btn2}>
          删除
        </div>
      </div>

    </div>
  );
}
