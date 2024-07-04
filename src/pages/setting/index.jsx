import styles from "./index.less";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "@/components/Header";
import tips_black from "../../assets/tips_black.png";
import arrow_right_1 from "../../assets/arrow_right_1.png";
import noData from "../../assets/noData.png";
import imageEdit from "../../assets/imageEdit.png";
import { ImageUploader, Dialog,Popup,Input, Toast } from "antd-mobile";
import { LeftOutline } from "antd-mobile-icons";
// import { lorem } from 'demos'
// 1:待付款 2：交易中
import { axiosCustom, storage } from "@/Common";
import icon_add from "../../assets/icon_add.png";
const demoSrc =
  "https://images.unsplash.com/photo-1567945716310-4745a6b7844b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=60";
export default function AboutPage() {
  const { type } = useParams();
  const [fileList, setFileList] = useState([]);
  const [text, setText] = useState("");
  const [visible, setVisible] = useState(false)
  const [info, setInfo ] = useState({})
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
  useEffect(()=>{
    commonRequest()
  },[])
  const commonRequest = () =>{
    axiosCustom({ cmd: "/user/info" }).then(res => {
      setInfo(res)
  })  
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
  const TextAreafun = (e) => {
    setText(e);
  };
  const hashCopy = (hash) => {
    const copyInput = document.createElement("input");
    copyInput.setAttribute("value", hash);
    document.body.appendChild(copyInput);
    copyInput.select();
    document.execCommand("copy");
    document.body.removeChild(copyInput);
  };
  const setImage = (e) => {
    console.log(e, 'e++++')
  }
  const beforFun = (file,files) =>{
    console.log(file, files)
    const formData = new FormData();
    formData.append('pre', 'face'); // 添加额外的参数
    formData.append('file', file)
    const headers = {
      'Content-Type': 'multipart/form-data'
    }
    // formData.append('file', file); // 'file' 是后端需要接收的字段名
    console.log(formData,  'asdasdasd')
    axiosCustom({ cmd: "/home/upload",method:'post',data:formData,headers }).then(res => {
      let data = {
        avatar:res.path
      }
      axiosCustom({ cmd: "/user/info",method:'post',data }).then(res => {
        Toast.show('修改成功')
        commonRequest()
      })  
      // Toast.show('修改成功')
      // commonRequest()
      // setText('')
  })  
    return false
  }
  const submit = () =>{
    if(!text){
      Toast.show('昵称不可为空')
    }
    let data = {
      nick_name:text
    }
    axiosCustom({ cmd: "/user/info",method:'post',data }).then(res => {
      Toast.show('修改成功')
      commonRequest()
      setText('')
      setVisible(false)
    })  
  }
  const gohome = () =>{
    axiosCustom({ cmd: "/account/out" }).then(res => {
      storage.clear()
      navigate('/');
    }).catch(res=>{
      storage.clear()
      navigate('/');
    })
  }

  // const navigate = useNavigate();
  return (
    <div className={styles.outBox}>
            <Popup
        visible={visible}
        onMaskClick={() => {
          setVisible(false);
        }}
        bodyStyle={{
          borderTopLeftRadius: "8px",
          borderTopRightRadius: "8px",
          minHeight: "50vh",
          padding: "24px 15px 18px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          <div className={styles.popHeader}>修改昵称</div>
          <div className={styles.inputBox}>
          <Input
            value={text}
            placeholder="请输入昵称"
            onChange={TextAreafun}
            style={{height:'21px'}}
          />
        </div>
        </div>
        <div className={styles.bottomBox}>
          <div className={styles.btnRight} onClick={submit}>
            确认
          </div>
        </div>
      </Popup>
      <div className={styles.box}>
        <LeftOutline
          fontSize={16}
          className={styles.back}
          onClick={handleClick}
        />
        设置
      </div>
      <div className={styles.picBox}>
        <div className={styles.user} style={{backgroundImage:`url(${info?.user?.avatar})`}}>
          <ImageUploader onChange={(e) => setImage(e)}  beforeUpload={beforFun}>
            <img src={imageEdit} className={styles.imges}></img>
          </ImageUploader>
        </div>
        <div className={styles.email}>{info?.user?.login_name}</div>
      </div>
      <div className={styles.contentBox}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: "space-between", marginBottom: '30px' }}>
          <div className={styles.titles}>昵称</div>
          <div style={{ display: 'flex', alignItems: 'center' }} onClick={()=>setVisible(true)}>
            <div className={styles.name}>{info?.user?.nick_name}</div>
            <img src={arrow_right_1} style={{ width: '14px', height: '14px' }}></img>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: "space-between", marginBottom: '30px' }} onClick={() => {
          Dialog.confirm({
            content: <div style={{ padding: '0 12px' }}>
              <div className={styles.titles1}>清除缓存</div>
              <div className={styles.values}>您确定要清除缓存吗？</div>
            </div>,

            onConfirm: async () => {

              Toast.show({
                icon: 'success',
                content: '清除成功',
                position: 'bottom',
              })
            },
          })
        }}>
          <div className={styles.titles} >清除缓存</div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src={arrow_right_1} style={{ width: '14px', height: '14px' }}></img>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: "space-between", marginBottom: '30px' }}>
          <div className={styles.titles}>关于Tideswap</div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src={arrow_right_1} style={{ width: '14px', height: '14px' }}></img>
          </div>
        </div>
        <div className={styles.btn2} onClick={gohome}>
          退出当前账户
        </div>
      </div>

    </div>
  );
}
