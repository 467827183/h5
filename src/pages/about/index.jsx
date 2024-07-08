
import styles from "./index.less";
import { useEffect, useState } from "react";
import dropDown from "../../assets/dropDown.png";
import { Popup,PullToRefresh, List,InfiniteScroll  } from 'antd-mobile'
import { sleep } from 'antd-mobile/es/utils/sleep'
import check from "../../assets/check.png";
import { useNavigate } from "react-router-dom";
import unCheck from "../../assets/unCheck.png";
import order from "../../assets/order.png";
// import { lorem } from 'demos'
import { axiosCustom, storage } from "@/Common";
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
  const [currentPage, setCurrentPage] = useState(1)
  const [countPage,setCountPage] = useState(1)
  const navigate = useNavigate();
  const [data, setData] = useState([])
  useEffect(()=>{
    originRequest()
  },[])
  const originRequest = () =>{
    let params =
    {
      page:1,
      size:1000,
      type:active
    }
    axiosCustom({ cmd: "/market-separate/shop-list",params }).then(res => {
      setCountPage(res.totalPage)
      setData(res.data)
    })
  }
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
  async function loadMore() {
    let params = {
      page:currentPage+1,
      size:1000,
      type:active
    }
    setCurrentPage(currentPage=>currentPage+1)
    axiosCustom({ cmd: "/market-separate/shop-list",params }).then(res => {
      setCountPage(res.totalPage)
      setData([...data,...res.data])
    })
  }
  const checkStatus = (type) =>{
    setData([])
    setCurrentPage(1)
    setActive(type)
    let params = {
      page:1,
      size:1000,
      type
    }
    axiosCustom({ cmd: "/market-separate/shop-list",params }).then(res => {
      setCountPage(res.totalPage)
      setData(res.data)
    })
  }
  function getNextData() {
    const ret= []
    for (let i = 0; i < 18; i++) {
      ret.unshift({name:i})
    }
    return ret
  }
  const gotoOrder = () =>{
    let type = 1
    if(active == 1){
      type = 2
    } else{
      type = 1
    }
    navigate(`/order/${type}`);
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
  const gotoDetail =(active,id) =>{
    let type = 1
    if(active == 1){
      type = 2
    } else{
      type = 1
    }
    navigate(`/transaction/${type}/${id}`);
  }
  const getNumber = (item) =>{
    const result = item.surplus / item.num;
    return result.toFixed(2)*100; // 保留两位小数并返回字符串
  }
  return (
    <div className={styles.outBox}>
      <div className={styles.order} onClick={gotoOrder}>
        <img src={order}/>
        <div style={{marginTop:'5px'}}>订单</div>
      </div>
      <div className={styles.header}>
        <div className={styles.switchBox}>
          <div className={active == 2 ? styles.active : styles.noActive} onClick={() => checkStatus(2)}>购买</div>
          <div className={active == 1 ? styles.active : styles.noActive} onClick={() => checkStatus(1)}>出售</div>
        </div>
        {/* <div className={styles.right_select} onClick={()=>{setVisible(true)}}>
          <div>支付方式</div>
          <img src={dropDown}></img>
        </div> */}
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
          setData([])
          originRequest()
        }}
      >
        <List style={{ flex:1 }}>
          {data.map((item, index) => (
            <List.Item key={index} className={styles.itembox}>
              <div className={styles.comheader}>
                <img className={styles.btm} src={item.user_face}></img>
                {item.nick_name}
              </div>
              {/* <div className={styles.comNumber}>
                <div>成交量 {item.num - item.surplus}</div>
                <div className={styles.point}></div>
                <div>{getNumber(item)}%成交率</div>
              </div> */}
              <div className={styles.number}><span className={styles.unit}>￥</span>{item.price}</div>
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'9px'}}>
                <div>
                  <div className={styles.numberItem} style={{marginBottom:'4px'}}>
                    <div>数量</div>
                    <div>{item.surplus} DCP</div>
                  </div>
                  <div className={styles.numberItem}>
                    <div>限额</div>
                    <div>{item.min_num}-{item.max_num} CNY</div>
                  </div>
                </div>
                <div className={styles.button} style={{background:active==2?'#2DBF64':"rgba(235, 75, 110, 1)"}} onClick={()=>gotoDetail(active,item.id)}>{active == 2?'购买':'出售'}</div>
              </div>
              <div style={{display:'flex'}}>
              {
                  item?.receipt?.includes('1')&&(
                    <div className={styles.typeBox}>
                    <div className={styles.line} style={{backgroundColor:'rgba(0, 160, 232, 1)'}}></div>
                    <div className={styles.name}>支付宝</div>
                  </div>
                  )
                }
                {
                  item?.receipt?.includes('2')&&(
                    <div className={styles.typeBox}>
                    <div className={styles.line}></div>
                    <div className={styles.name}>微信支付</div>
                  </div>
                  )
                }
                {
                  item?.receipt?.includes('3')&&(
                    <div className={styles.typeBox}>
                    <div className={styles.line} style={{backgroundColor:'rgba(247, 181, 0, 1)'}}></div>
                    <div className={styles.name}>银行卡</div>
                  </div>
                  )
                }

              </div>
            </List.Item>
          ))}
        </List>
        <InfiniteScroll loadMore={loadMore} hasMore={currentPage<countPage} threshold={10} />
      </PullToRefresh>
      </div>
    </div>
  );
}
