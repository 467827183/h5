
import styles from "./index.less";
import { useEffect, useState } from "react";
import dropDown from "../../assets/dropDown.png";
import { Popup,PullToRefresh, List,InfiniteScroll  } from 'antd-mobile'
import { sleep } from 'antd-mobile/es/utils/sleep'
import check from "../../assets/check.png";
import unCheck from "../../assets/unCheck.png";
// import { lorem } from 'demos'
export default function AboutPage() {
  const [active, setActive] = useState(2)
  const [visible, setVisible] = useState(false)
  const [selectItem,setSelectItem] = useState([
    {name:'全部',status:true,line:false,type:1},
    {name:'银行卡',status:false,line:'rgba(247, 181, 0, 1)',type:2},
    {name:'支付宝',status:false,line:'rgba(0, 160, 232, 1)',type:3},
    {name:'微信支付',status:false,line:'rgba(46, 175, 100, 1)',type:4},
  ])
  const [hasMore, setHasMore] = useState(true)

  const [data, setData] = useState(() => getNextData())
  const itemClick = (index )=>{
    const newArr = [...selectItem]
    if(index != 0){
      newArr[0].status = false
    } else {
      let arr = [1,2,3]
      arr.forEach(element => {
        newArr[element].status = false
      });
    }
    newArr[index].status = !newArr[index].status
    let number = 0
    newArr.forEach(item=>{
      if(item.status){
        number++
      }
    })
    if(number == 0){
      newArr[0].status = true
    }
    setSelectItem(newArr)
  }
  async function loadMore() {
    // const append = await mockRequest()
    // setData(val => [...val, ...append])
    setHasMore(data.length > 0)
  }
  function getNextData() {
    const ret= []
    for (let i = 0; i < 18; i++) {
      ret.unshift({name:i})
    }
    return ret
  }
  const reset = () =>{
    const newArr = [...selectItem]
    newArr.forEach(item=>{
      item.status = false
    })
    newArr[0].status = true
    setSelectItem(newArr)
  }
  const submit = () =>{
    setVisible(false)
  }
  return (
    <div className={styles.outBox}>
      <div className={styles.order}>
        <img src={unCheck}/>
        <div>订单</div>
      </div>
      <div className={styles.header}>
        <div className={styles.switchBox}>
          <div className={active == 1 ? styles.active : styles.noActive} onClick={() => setActive(1)}>购买</div>
          <div className={active == 2 ? styles.active : styles.noActive} onClick={() => setActive(2)}>出售</div>
        </div>
        <div className={styles.right_select} onClick={()=>{setVisible(true)}}>
          <div>支付方式</div>
          <img src={dropDown}></img>
        </div>
      </div>
      <Popup
        visible={visible}
        onMaskClick={() => {
          setVisible(false)
        }}
        bodyStyle={{
          borderTopLeftRadius: '8px',
          borderTopRightRadius: '8px',
          minHeight: '50vh',
          padding:'24px 15px 18px',
          display:'flex',
          flexDirection:'column',
          justifyContent:'space-between'
        }}
      >
        <div>

       
        <div className={styles.popHeader}>
          支付方式
        </div>
        {
          selectItem.map((item,index)=>{
            return <div className={styles.item} key={index} onClick={()=>itemClick(index)}>
              <div style={{display:'flex',alignItems:'center'}}>
              {item.line&&(
                <div style={{backgroundColor:item.line}} className={styles.line}></div>
                )}
              <div className={styles.name} style={{fontWeight:index==0?400:600}}>{item.name}</div>
              </div>
              {
                item.status?<img src={check}/>:<img src={unCheck}/>
              }
            </div>
          })
        }
         </div>
        <div className={styles.bottomBox}>
          <div className={styles.btnLeft} onClick={reset}>重置</div>
          <div className={styles.btnRight} onClick={submit}>确认</div>
        </div>
      </Popup>
      <div className={styles.scrollBox}>
      <PullToRefresh
        style={{minHeight:'100%'}}
        onRefresh={async () => {
          await sleep(1000)
          setData([...getNextData(), ...data])
        }}
      >
        <List style={{ flex:1 }}>
          {data.map((item, index) => (
            <List.Item key={index} className={styles.itembox}>
              <div className={styles.comheader}>
                <div className={styles.btm}>鸿</div>
                鸿运集团
              </div>
              <div className={styles.comNumber}>
                <div>成交量 476</div>
                <div className={styles.point}></div>
                <div>99.37%成交率</div>
              </div>
              <div className={styles.number}><span className={styles.unit}>￥</span>1.00</div>
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'9px'}}>
                <div>
                  <div className={styles.numberItem} style={{marginBlock:'4px'}}>
                    <div>数量</div>
                    <div>12,004.93 DCP</div>
                  </div>
                  <div className={styles.numberItem}>
                    <div>限额</div>
                    <div>100-20000 CNY</div>
                  </div>
                </div>
                <div className={styles.button} style={{background:active==1?'#2DBF64':"rgba(235, 75, 110, 1)"}}>{active == 1?'购买':'出售'}</div>
              </div>
              <div className={styles.typeBox}>
                <div className={styles.line}></div>
                <div className={styles.name}>微信支付</div>
              </div>
            </List.Item>
          ))}
        </List>
        <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
      </PullToRefresh>
      </div>
    </div>
  );
}
