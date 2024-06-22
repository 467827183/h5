import styles from "./index.less";
import { LeftOutline } from 'antd-mobile-icons'
import { useNavigate } from 'react-router-dom';

export default function Header(props) {
    const { name } = props;
    const navigate = useNavigate();
    console.log(name,'name')

  const handleClick = () => {
    // 返回上一页
    navigate(-1);
  };
    return (
      <div className={styles.box}>
        <LeftOutline fontSize={16} className={styles.back}  onClick={handleClick}/>
        {name}
      </div>
    );
  }
  