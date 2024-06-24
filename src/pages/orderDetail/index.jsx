import styles from "./index.less";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "@/components/Header";
import tips_black from "../../assets/tips_black.png";
import copy from "../../assets/copy.png";
import { ImageUploader,Image } from "antd-mobile";
// import { lorem } from 'demos'
// 1:待付款 2：交易中
const demoSrc =
  "https://images.unsplash.com/photo-1567945716310-4745a6b7844b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=60";
export default function AboutPage() {
  const { type,status } = useParams();
  const [fileList, setFileList] = useState([]);
  function mockUpload(file) {
    console.log(file, "files");
    return {
      url: URL.createObjectURL(file),
    };
  }
  const navigate = useNavigate();
  const gotoAppeal = () =>{
    navigate('/appeal/1')
  }
  const  hashCopy = (hash) => {
    const copyInput = document.createElement("input");
    copyInput.setAttribute("value", hash);
    document.body.appendChild(copyInput);
    copyInput.select();
    document.execCommand("copy");
    document.body.removeChild(copyInput);
  }
  // const navigate = useNavigate();
  return (
    <div className={styles.outBox}>
      <div style={{ padding: "0 14px", marginBottom: "42px" }}>
        <Header name={"订单详情"} />
      </div>
      <div className={styles.header}>
        <div className={styles.title}>待付款</div>
        <div className={styles.flexBox}>
          <div className={styles.time}>57:15</div>
          <div className={styles.tips}>内卖家未同意交易，将自动取消订单</div>
        </div>
      </div>
      <div className={styles.lines}></div>
      <div className={styles.infoBox}>
        <div className={styles.user}>
          <div className={styles.userPic}></div>
          <div>鸿运集团</div>
        </div>
        <div className={styles.title}>订单信息</div>
        <div className={styles.items}>
          <div className={styles.label}>订单编号</div>
          <div className={styles.content}>
            1266889945678906789<img src={copy} className={styles.copyImg} onClick={()=>hashCopy()}></img>
          </div>
        </div>
        <div className={styles.items}>
          <div className={styles.label}>下单时间</div>
          <div className={styles.content}>2022-07-15 08:00:00</div>
        </div>
        <div className={styles.items}>
          <div className={styles.label}>单价</div>
          <div className={styles.content1}>￥0.95</div>
        </div>
        <div className={styles.items}>
          <div className={styles.label}>数量</div>
          <div className={styles.content1}>1000 DCP</div>
        </div>
        <div className={styles.items}>
          <div className={styles.label}>应付金额</div>
          <div className={styles.content1}>￥950.00</div>
        </div>
        <div className={styles.items}>
          <div className={styles.label}>卖家收款方式</div>
          <div className={styles.content1}>
            <div className={styles.smallLine}></div>
            微信支付
          </div>
        </div>
        <div className={styles.bigTips}>
          <img src={tips_black}></img>
          <div className={styles.content}>
            注：计时结束前未确认支付，订单将自动取消。请勿在订单即将结束时进行支付，因超时无法提交支付造成损失由自己承担
          </div>
        </div>
      </div>
      <div className={styles.lines}></div>
      <div className={styles.infoBox}>
        <div className={styles.title}>账户信息</div>
        <div className={styles.items}>
          <div className={styles.label}>购买方</div>
          <div className={styles.content}>
            18200098880<img src={copy} className={styles.copyImg} onClick={()=>hashCopy()}></img>
          </div>
        </div>
        <div className={styles.items}>
          <div className={styles.label}>出售方</div>
          <div className={styles.content}>
            15288665559<img src={copy} className={styles.copyImg} onClick={()=>hashCopy()}></img>
          </div>
        </div>
      </div>
      <div className={styles.lines}></div>
      <div className={styles.infoBox}>
        <div className={styles.title} style={{ marginBottom: "15px" }}>
          支付信息
        </div>
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
            <div>张三</div>
            <div className={styles.line}></div>
            <div style={{ display: "flex", alignItems: "center" }}>
              Zsy908<img src={copy} className={styles.copyImg} onClick={()=>hashCopy()}></img>
            </div>
          </div>
        </div>
        <div style={{ marginBottom: "20px" }}>
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
            <div>张三</div>
            <div className={styles.line}></div>
            <div style={{ display: "flex", alignItems: "center" }}>
              6226 0988 3211 089
              <img src={copy} className={styles.copyImg} onClick={()=>hashCopy()}></img>
            </div>
          </div>
          <div className={styles.payDetail}>
            <div className={styles.line} style={{ marginLeft: 0 }}></div>
            <div>交通银行北京中关村支行</div>
          </div>
        </div>
      </div>
      {type == 1 && status == 1&& (
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
            <div className={styles.btn}>确认支付</div>
          </div>
        </div>
      )}
      {type == 1 && status == 2&&(
        <div>
          <div className={styles.lines}></div>
          <div className={styles.infoBox} style={{ paddingBottom: "20px" }}>
            <div className={styles.title} style={{ marginBottom: "15px" }}>
              支付凭证
            </div>
            <Image src={demoSrc} width={115} height={115} fit='fill' />
          </div>
        </div>
      )}
      {type == 2 && status == 2&&(
        <div>
          <div className={styles.lines}></div>
          <div className={styles.infoBox} style={{ paddingBottom: "20px" }}>
            <div className={styles.title} style={{ marginBottom: "15px" }}>
              支付凭证
            </div>
            <Image src={demoSrc} width={115} height={115} fit='fill' />
          </div>
          <div className={styles.lines} style={{ height: "1px" }}></div>
          <div className={styles.submit}>
            <div className={styles.leftBtn} onClick={gotoAppeal}>申诉</div>
            <div className={styles.btn}>确认收货</div>
          </div>
        </div>
      )}
    </div>
  );
}
