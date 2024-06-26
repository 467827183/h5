import styles from "./index.less";
import user from  "../../assets/user.png";
import china from  "../../assets/china.png";
import dpc from  "../../assets/dcp.png";
import asset from  "../../assets/asset.png";
import accout from  "../../assets/icon_accout.png";
import customer from  "../../assets/icon_customer.png";
import set from  "../../assets/icon_set.png";
import arrow_right from  "../../assets/arrow_right.png";
import { useNavigate } from "react-router-dom";
function MyPage(props) {
  const navigate = useNavigate();
  const gotoDetail = () =>{
    navigate('/dcp');
  }
  const gotoAsset = ()=>[
    navigate('/assetDetail/1')
  ]
  const gotoAccount =() =>{
    navigate('/account')
  }
  const gotoSetting =()=>{
    navigate('/setting')
  }
  return (
    <div className={styles.box}>
      <div className={styles.headerPic}>
        <img src={user} className={styles.userPic}></img>
      </div>
      <div className={styles.userInfo}>
        <div className={styles.userName}>295***@qq.com</div>
        <div className={styles.city}>
          <img src={china}></img>
          <div className={styles.country}>中国</div>
          <div className={styles.line}></div>
          <div className={styles.date}>注册日期:2024/06/10</div>
        </div>
        <img src={dpc} className={styles.dcp} onClick={gotoDetail}></img>
      </div>
      <div className={styles.line}></div>
      <div className={styles.assets}>
        <div className={styles.title}>
          <img src={asset}></img>
          <div>我的资产</div>
        </div>
        <div className={styles.assetBox}>
          <div className={styles.item} onClick={gotoAsset}>
            <div>流通信用分</div>
            <div>105622.00</div>
          </div>
          <div className={styles.item}>
            <div>流通信用分</div>
            <div>105622.00</div>
          </div>
          <div className={styles.item}>
            <div>流通信用分</div>
            <div>105622.00</div>
          </div>
        </div>
      </div>
      <div className={styles.line}></div>
      <div className={styles.menu}>
        <div className={styles.item}>
          <div className={styles.left} onClick={gotoAccount}>
              <img src={accout}></img>
              <div>收款账号管理</div>
          </div>
          <img src={arrow_right} className={styles.right}></img>
        </div>
        <div className={styles.item}>
          <div className={styles.left}>
              <img src={customer}></img>
              <div>联系客服</div>
          </div>
          <img src={arrow_right} className={styles.right}></img>
        </div>
        <div className={styles.item} onClick={gotoSetting}>
          <div className={styles.left}>
              <img src={set}></img>
              <div>设置</div>
          </div>
          <img src={arrow_right} className={styles.right}></img>
        </div>
      </div>
    </div>
  );
}

export default MyPage;
