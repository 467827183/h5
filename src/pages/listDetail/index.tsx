import {useState,useEffect} from "react";
import styles from "./index.less";
import Header from '@/components/Header'
import { useNavigate, useParams } from "react-router-dom";
import { axiosCustom,storage } from "@/Common";
export default function AboutPage() {
  const { id } = useParams();
  const [content,setContent] = useState({})

  useEffect(()=>{
    console.log(id, 'id')
    axiosCustom({ cmd: "/notice/info",params:{id} }).then(res => {
      setContent(res)
    })
  },[])
  return (
    <div className={styles.box}>
      <Header/>
      <div className={styles.title}>{content?.title}</div>
      <div className={styles.time}>{content?.time}</div>
      <div dangerouslySetInnerHTML={{ __html: content?.content }}>

      </div>
    </div>
  );
}
