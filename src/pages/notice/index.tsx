import { useState, useEffect } from "react";
import styles from "./index.less";
import Header from '@/components/Header'
import { InfiniteScroll, Button, Swiper, Toast, Space } from "antd-mobile";
import { useNavigate, useParams } from "react-router-dom";
import { axiosCustom, storage } from "@/Common";
export default function AboutPage() {
  const navigate = useNavigate();
  const [news, setNews] = useState<any>(
    []
  )
  const [listInfo,setListInfo] = useState<any>()
  useEffect(() => {
    getNews(1, 10)
  }, [])
  const getNews = (page: number, size: number) => {
    let params = {
      page,
      size
    }
    axiosCustom({ cmd: "/notice/list", params }).then(res => {
      setListInfo(res)
      setNews(res.data)
    })
  }
  const goto = (id: number) => {
    navigate(`/listDetail/${id}`);
  }
  const [hasMore, setHasMore] = useState(true)
  async function loadMore() {
    if(listInfo){
      setHasMore(listInfo?.page<listInfo?.totalPage)
      if(listInfo.page<listInfo.totalPage){
        let params = {
          page:listInfo.page+1,
          size:10
        }
        let result:any = await axiosCustom({ cmd: "/notice/list", params })
        setNews([...news, ...result.data])
        setListInfo(result)
      }
    }
  }
  return (
    <div className={styles.box}>
      <Header />
      <div className={styles.title}>公告列表</div>
      <div className={styles.newsBox}>
        {
          news.map((item:any, index:number) => {
            return (
              <div key={index} className={styles.newsItme} onClick={() => goto(item.id)}>
                <div className={styles.titles}>{item.title}</div>
                <div className={styles.time}>{item.time}</div>
              </div>
            )
          })
        }
        <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
      </div>
    </div>
  );
}
