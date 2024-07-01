
import styles from "./index.less";
import { useEffect, useState } from "react";
import dropDown from "../../assets/dropDown.png";
import { sleep } from 'antd-mobile/es/utils/sleep'
import transfer from "../../assets/transfer.png";
import Header from '@/components/Header'
import { useNavigate } from "react-router-dom";
import close from "../../assets/icon_close.png";
import { Form, Input, PullToRefresh,InfiniteScroll } from 'antd-mobile'
import { LeftOutline } from 'antd-mobile-icons'
import { axiosCustom } from "@/Common";
import { BrowserRouter as Router, Route, Link, useParams } from 'react-router-dom';
import order from "../../assets/record.png";
// import { lorem } from 'demos'
export default function AboutPage() {
  const { type } = useParams();
  const [status, setStatus] = useState(1)
  const [hasMore, setHasMore] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [countPage,setCountPage] = useState(1)
  const navigate = useNavigate();
  const [data, setData] = useState([])
  const handleClick = () => {
    // 返回上一页
    navigate(-1);
  };
  useEffect(() => {
    let params = {
      page:1,
      size:20,
      type:1
    }
    axiosCustom({ cmd: "/donation/list",params }).then(res => {
      setCountPage(res.totalPage)
      setData(res.data)
      console.log(res,'res')
    })

  }, [])
  async function loadMore() {
    let params = {
      page:currentPage+1,
      size:20,
      type:1
    }
    setCurrentPage(currentPage=>currentPage+1)
    axiosCustom({ cmd: "/donation/list",params }).then(res => {
      setCountPage(res.totalPage)
      setData([...data,...res.data])
      console.log(res,'res')
    })
  }
  function getNextData() {
    const ret = []
    for (let i = 0; i < 18; i++) {
      ret.unshift({ name: i })
    }
    return ret
  }
  const checkStatus = (type) =>{
    setCurrentPage(1)
    setStatus(type)
    let params = {
      page:1,
      size:20,
      type
    }
    axiosCustom({ cmd: "/donation/list",params }).then(res => {
      setCountPage(res.totalPage)
      setData(res.data)
    })
  }
  return (
    <div className={styles.outBox}>
      <div className={styles.box}>
        <LeftOutline fontSize={16} className={styles.back} onClick={handleClick} />
        转赠记录
      </div>
      <div className={styles.switchBox}>
        <div className={status == 1 ? styles.leftON : styles.leftOFF} onClick={() => checkStatus(1)}>转出</div>
        <div className={status == 1 ? styles.rightOFF : styles.rightON} onClick={() => checkStatus(2)}>转入</div>
      </div>
      <PullToRefresh
        style={{ minHeight: '100%' }}
        onRefresh={async () => {
          checkStatus(status)
        }}
      >
        
      <div className={styles.scrollBox}>
          <div style={{ flex: 1 }}>
            {data.map((item, index) => (
              <div key={index} className={styles.itembox} >
                <div className={styles.leftBox}>
                  <div>转赠至{status == 1?item.buy_login_name:item.sell_login_name}</div>
                  <div>{item.create_time}</div>
                </div>
                <div className={styles.rightBox}>{item.num} DCP</div>
              </div>
            ))}
          </div>
          <InfiniteScroll loadMore={loadMore} hasMore={currentPage<countPage} threshold={10} />
        </div>
        </PullToRefresh>
    </div>
  );
}
