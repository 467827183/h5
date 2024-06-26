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
  const { type, status } = useParams();
  const [fileList, setFileList] = useState([{}]);
  function mockUpload(file) {
    console.log(file, "files");
    return {
      url: URL.createObjectURL(file),
    };
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
    navigate("/setAccount/1");
  };
  const hashCopy = (hash) => {
    const copyInput = document.createElement("input");
    copyInput.setAttribute("value", hash);
    document.body.appendChild(copyInput);
    copyInput.select();
    document.execCommand("copy");
    document.body.removeChild(copyInput);
  };
  const gotoEdit  = (type) =>{
    navigate(`/accountDetail/${type}`);
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
        收款账号管理
        {
          fileList.length>0&&        <img
          src={icon_add}
          className={styles.order}
          onClick={() => gotoOrder()}
        ></img>
        }

      </div>
      <div className={styles.contentBox}>
        <div className={styles.bigTips}>
          <img src={tips_black}></img>
          <div>
            <div className={styles.content} style={{ marginBottom: '10px' }}>
              买家将直接使用您选择的收款方式付款。交易时，请始终检查您的收款账户以确认您已收到全额付款。
            </div>
            <div className={styles.content}>
              请确保您设置的账户为本人实名账户，非本人实名账户收款会导致订单失败且账号冻结。
            </div>
          </div>
        </div>
      </div>
      {
        !fileList.length && (
          <div className={styles.noData}>
            <img src={noData}></img>
            <div className={styles.title}>暂无收款账号</div>
            <div className={styles.des}>为保障交易安全，请添加实名收款号</div>
            <div className={styles.btn}>立即添加</div>
          </div>
        )
      }
      {
        fileList.length>0 && (
          <div className={styles.infoBox}>
            <div style={{ paddingBottom: "25px", borderBottom: '1px solid #EAEAEA', marginBottom: '25px' }} onClick={()=>gotoEdit(1)}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: 'space-between',
                  marginBottom: "15px",
                }}
              >
                <div style={{
                  display: "flex",
                  alignItems: "center",
                }}>
                  <div className={styles.smallLine} style={{ background: '#00A0E8' }}></div>
                  <div className={styles.paymentTitle}>支付宝</div>
                </div>
                <img src={arrow_right_1} style={{ width: '14px', height: '14px' }}></img>
              </div>
              <div className={styles.payDetail}>
                <div>张三</div>
                <div className={styles.line}></div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  Zsy908
                </div>
                <div className={styles.line}></div>
                <img src={qrCode} style={{ width: '14px', height: '14px' }}></img>
              </div>
            </div>
            <div style={{ paddingBottom: "25px", borderBottom: '1px solid #EAEAEA', marginBottom: '25px' }} onClick={()=>gotoEdit(2)}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: 'space-between',
                  marginBottom: "15px",
                }}
              >
                <div style={{
                  display: "flex",
                  alignItems: "center",
                }}>
                  <div className={styles.smallLine}></div>
                  <div className={styles.paymentTitle}>微信支付</div>
                </div>
                <img src={arrow_right_1} style={{ width: '14px', height: '14px' }}></img>
              </div>
              <div className={styles.payDetail}>
                <div>张三</div>
                <div className={styles.line}></div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  Zsy908
                </div>
              </div>
            </div>
            <div style={{ paddingBottom: "25px", marginBottom: '25px' }} onClick={()=>gotoEdit(3)}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: 'space-between',
                  marginBottom: "15px",
                }}
              >
                <div style={{
                  display: "flex",
                  alignItems: "center",
                }}>
                  <div className={styles.smallLine} style={{ background: '#F7B500' }}></div>
                  <div className={styles.paymentTitle}>银行卡</div>
                </div>
                <img src={arrow_right_1} style={{ width: '14px', height: '14px' }}></img>
              </div>
              <div className={styles.payDetail}>
                <div>张三</div>
                <div className={styles.line}></div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  6226 0988 3211 089
                </div>
              </div>
              <div className={styles.payDetail}>
                <div className={styles.line} style={{ marginLeft: 0 }}></div>
                <div>交通银行北京中关村支行</div>
              </div>
            </div>
          </div>
        )
      }

    </div>
  );
}
