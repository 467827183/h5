import { useEffect, useState } from "react";
import styles from "./index.less";
import ratio from "../../assets/ratio.png";
import tips from "../../assets/tips.png";
import switchIcon from "../../assets/switch.png";
import oneWayIcon from "../../assets/one-way.png";
import close from "../../assets/icon_close.png";
import { Form, Input, CenterPopup, PasscodeInput } from 'antd-mobile'
export default function HomePage() {
  const [typeArr, setTypeArr] = useState(
    [
      { name1: "流通信用分", icon: switchIcon, name2: '通证DCP', active: true, type: 1 },
      { name1: "通证DCP", icon: switchIcon, name2: '流通信用分', active: false, type: 2 },
      { name1: "流通信用分", icon: oneWayIcon, name2: 'Digibuy', active: false, type: 3 },
    ]
  )
  const [submitValue, setSubmitValue] = useState('')
  const [visible, setVisible] = useState(false)
  const [subVisible, setSubVisible] = useState(false)
  const [inputValue,setInputValue] = useState('')
  const [currentItem, setCurrentItem] = useState(typeArr[0])
  const [error, setError] = useState(false)
  const itemclick = (index: number) => {
    const newArr = [...typeArr]
    newArr.forEach(item => {
      item.active = false
    })
    newArr[index].active = true
    setCurrentItem(newArr[index])
    setTypeArr(newArr)
  }
  const inputChange = (e: any) => {
    setSubmitValue(e)
  }
  const submit = () => {
    if (!currentItem) {
      return
    }
    setSubVisible(true)
  }
  const modelShow = () => {
    setVisible(true)
    // Modal.alert({
    //   title: '流动池规则',
    //   content: '右上角有个关闭的小图标，点击它也可以关闭弹窗',
    //   showCloseButton: true,
    // })
  }
  const modelClose = () => {
    setVisible(false)
  }
  const modelCloseInput = () => {
    if(inputValue.length<6){
      setError(true)

    } else{
      setSubVisible(false)
    }
  }
  
  const onChange = (value: string) => {
    setError(false)
    setInputValue(value)
  }

  return (
    <div className={styles.outBox}>
      <CenterPopup
        visible={visible}
        onMaskClick={() => {
          setVisible(false)
        }}
      >
        <div className={styles.popBox}>
          <img src={close} className={styles.close} onClick={modelClose}></img>
          <div className={styles.title}>流动池规则</div>
          <div className={styles.info}>
            <div>1. 7*24小时支持流通信用分与通证的闪兑</div>
            <div>2. 流通信用分兑出手续费为5%;</div>
            <div>3. 流通信用分兑出数量为10 - 10000:</div>
            <div>4. 通证兑出数量为10 - 10000:</div>
            <div>5. 流通信用分兑出分为5%的消费通证与95%的通证:</div>
          </div>
          <div className={styles.know} onClick={modelClose}>
            知道了
          </div>
        </div>
        {/* <div className={styles.myContent}>Hello</div> */}
      </CenterPopup>
      <CenterPopup
        visible={subVisible}

        onMaskClick={() => {
          setSubVisible(false)
        }}
      >
        <div className={styles.popBox} style={{ padding: '27px 20px 22px' }}>
          <img src={close} className={styles.close} onClick={modelClose}></img>
          <div className={styles.title} style={{ marginBottom: '32px' }}>请输入支付密码</div>
          {/* <div className={styles.info}>
            <div>1. 7*24小时支持流通信用分与通证的闪兑</div>
            <div>2. 流通信用分兑出手续费为5%;</div>
            <div>3. 流通信用分兑出数量为10 - 10000:</div>
            <div>4. 通证兑出数量为10 - 10000:</div>
            <div>5. 流通信用分兑出分为5%的消费通证与95%的通证:</div>
          </div> */}
          <PasscodeInput seperated style={{ marginBottom: '32px' }}  onChange={onChange}
          value={inputValue}
            error={error} />
          <div className={styles.know} onClick={modelCloseInput} style={{ width: '100%' }}>
            确认
          </div>
        </div>
        {/* <div className={styles.myContent}>Hello</div> */}
      </CenterPopup>
      <div className={styles.flowBox}>
        <div className={styles.flow_top}>
          <div className={styles.topTips}>
            当前流动池参与
            <img src={tips} onClick={() => modelShow()}></img>
          </div>
          <div className={styles.numberBox}>
            <div className={styles.item}>
              <div className={styles.top}>1662685.6655</div>
              <div className={styles.bottom}>流通信用分</div>
            </div>
            <div className={styles.item}>
              <div className={styles.top}>37893576.2652</div>
              <div className={styles.bottom}>通证DCP</div>
            </div>
          </div>
        </div>
        <div className={styles.flow_right_top}>
          <img src={ratio}></img>
          <div className={styles.number}>1 : 1.2</div>
        </div>
      </div>
      <div className={styles.typeBox}>
        {
          typeArr.map((item, index) => {
            return (
              <div className={`${item.active ? styles.img1 : styles.img2} ${styles.common}`} onClick={() => itemclick(index)} key={index}>
                <div>{item.name1}</div>
                <img src={item.icon} className={styles.typeIMG}></img>
                <div>{item.name2}</div>
              </div>
            )
          })
        }
      </div>
      <div className={styles.sumbitBox}>
        <div className={styles.title}>
          {currentItem.name1}{(currentItem.type == 1 || currentItem.type == 2) ? '兑换' : '转入'}{currentItem.name2}
        </div>
        <div className={styles.top}>
          <div className={styles.header}>
            <div>{(currentItem.type == 1 || currentItem.type == 2) ? '兑换' : '转入'}数量</div>
            <span>可用：500.00</span>
          </div>
          <Form layout='horizontal'>
            <Form.Item
              extra={
                <div className={styles.extraPart}>
                  全部
                </div>
              }
            >
              <Input placeholder='0.00' clearable type="number" value={submitValue} onChange={(e) => inputChange(e)} />
            </Form.Item>
          </Form>
          {
            currentItem.type == 1 && <div className={styles.greenTips}>*兑换后5%自动添加流动池</div>
          }
        </div>
        {
          currentItem.type == 1 && (
            <div className={styles.type1Info}>
              <div className={styles.typeItem}>
                <div>0.00</div>
                <div>通证DCP(95%)</div>
              </div>
              <div className={styles.line}>

              </div>
              <div className={styles.typeItem}>
                <div>0.00</div>
                <div>消费通证(5%) </div>
              </div>
            </div>
          )
        }
        {
          currentItem.type == 3 && (
            <div className={styles.type3Info}>
              <div>0.00</div>
              <div>流通信用分</div>
            </div>
          )
        }
        <div className={`${styles.submitBtn} ${!submitValue && styles.submitBtnNoData}`} onClick={() => submit()}>
          确认{(currentItem.type == 1 || currentItem.type == 2) ? '兑换' : '转入'}
        </div>
      </div>
    </div>
  );
}
