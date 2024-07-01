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
import { useEffect, useState } from "react";
import { axiosCustom, storage } from "@/Common";
function MyPage(props) {
  const navigate = useNavigate();
  const [userInfo,setUserInfo] = useState({})
  useEffect(()=>{
    axiosCustom({ cmd: "/user/info" }).then(res => {
      let arr = []
      for(let i in res.prop){
        arr.push(res.prop[i])
      }
      res.asset = arr
      setUserInfo(res)
    })
  },[])
  const gotoDetail = () =>{
    navigate('/dcp');
  }
  const gotoAsset = (type)=>[
    navigate(`/assetDetail/${type}`)
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
        <img src={userInfo?.user?.avatar} className={styles.userPic}></img>
      </div>
      <div className={styles.userInfo}>
        <div className={styles.userName}>{userInfo?.user?.login_name}</div>
        {/* <div className={styles.city}>
          <img src={china}></img>
          <div className={styles.country}>{userInfo?.user?.city_name}</div>
          <div className={styles.line}></div>
          <div className={styles.date}>注册日期:2024/06/10</div>
        </div> */}
        {
          userInfo?.user?.is_marketer&&(
            <img src={dpc} className={styles.dcp} onClick={gotoDetail}></img>
          )
        }
      </div>
      <div className={styles.line}></div>
      <div className={styles.assets}>
        <div className={styles.title}>
          <img src={asset}></img>
          <div>我的资产</div>
        </div>
        <div className={styles.assetBox}>
          {
            userInfo?.asset?.map((items,index)=>{
              console.log(items, '123123')
              return(
                <div className={styles.item} onClick={()=>gotoAsset(index+1)}>
                <div>{items.name}</div>
                <div>{items.value}</div>
              </div>
              )
            })
          }
          {/* <div className={styles.item}>
            <div>流通信用分</div>
            <div>105622.00</div>
          </div>
          <div className={styles.item}>
            <div>流通信用分</div>
            <div>105622.00</div>
          </div> */}
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
