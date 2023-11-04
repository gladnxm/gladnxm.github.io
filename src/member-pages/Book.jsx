import { useEffect, useRef, useState } from "react"
import { collection, doc, getDoc, getDocs, query, updateDoc } from "firebase/firestore"
import { auth, db } from "../firebase"
import styled, {css} from "styled-components"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { HeaderStyles } from "../components/commonStyle";

const Wrapper = styled.div`
  width: 100%;
`
const Header = styled.header`
  ${HeaderStyles}
`
const Nav = styled.nav`
  display: flex;
  justify-content: space-around;
  height: 50px;
  display: flex;
  button {
    width: 20%;
    border: 1px dashed #60c6d8;
    border-left: none;
    border-right: none;
    font-size: 14px;
    &:nth-child(odd) {
      background-color: #fff;
    }
    &:nth-child(even) {
      background-color: #8bd2df;
      color: #fff;
    }
  }
`
const Btns = styled.div`
  height: 140px;
  position: relative;
  button {
    text-align: left;
    position: absolute;
    right: 0;
    display: block;
    width: 110px;
    height: 40px;
    &:nth-of-type(1) { top: 0; }
    &:nth-of-type(2) { top: 45px; }
    &:nth-of-type(3) { top: 90px; }
  }
`
const Section = styled.section`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`
const Item = styled.div`
  width: 50%;
  text-align: center;
  border: 1px solid #b4b4b4;
  box-sizing: border-box;
  img { 
    margin-top: 20px;
    box-sizing: border-box;
    width : 40%;
    border-radius: 50%;
    ${props => props.coloring || css`filter: grayscale(1);`}
  }
  p {
    width: 100%;
    height: 20px;
    ${props => props.coloring && css`color: #74cada;`}
    ${props => props.coloring && css`font-weight: bold;`}
  }
`

function Book() {
  const navigate = useNavigate()
  const [category, setCategory] = useState('cocktail')
  const [menu, setMenu] = useState(null) // 메뉴아이템들
  const [userCollection, setUserCollection] = useState(null) // 주문한거 제목모은배열 그회원꺼 통째로, .category로 접근
  const [userPoint, setUserPoint] = useState(null) // 포인트 발급여부배열 그회원꺼 통째로, .category로 접근
  const uid = useRef(auth.currentUser.uid)
  const guide = `
  1. 한 번 주문한 메뉴는 도감에 등록됩니다. 
  2. 다양한 메뉴를 주문해서 개수를 채우고 포인트를 적립하세요
  3. 다음 주문시 사용하면 할인됩니다.
  `
  useEffect(()=>{
    const init = async() => {
      let point = await getDoc(doc(db, 'UserPoint', uid.current))
      let collect = await getDoc(doc(db, 'UserCollection', uid.current))
      console.log("fuck...", collect.data())
      setUserPoint(point.data())
      setUserCollection(collect.data())
    }
    init()
  }, [])

  useEffect(()=>{
    const fetchMenu = async() => {
      const menuQuery = query(collection(db, category))
      const snapshot = await getDocs(menuQuery)
      const menu = snapshot.docs.map(doc => ({title: doc.data().title, imgURL: doc.data().imgURL}))
      setMenu(menu)
    }
    fetchMenu()
  }, [category])

  const earnPoints = async(acc, price, idx) => {
    const temp = [...userPoint[category]]
    temp[idx] = false //버튼을 최초로 누르는건지 에대한여부
    const renewaled = {
      ...userPoint,
      myPoint: userPoint.myPoint + price, 
      [category]: temp 
    }
    await updateDoc(doc(db, "UserPoint", uid.current), renewaled)
    setUserPoint(renewaled)
    alert(price + " 포인트 적립됨. 다음 주문시 사용 가능")
  }

  if(!(menu && userCollection && userPoint)) return <p>로딩중</p>
  return (
    <Wrapper>
      <Header>
        <FontAwesomeIcon className="icon" icon={faArrowLeft} onClick={()=>navigate(-1)} />
        <span>나의 도감</span>
        <FontAwesomeIcon className="icon" icon={faQuestionCircle} />
      </Header>
      <Nav>
        <button onClick={()=>setCategory('cocktail')}>칵테일</button>
        <button onClick={()=>setCategory('beer')}>맥주</button>
        <button onClick={()=>setCategory('wine')}>와인</button>
        <button onClick={()=>setCategory('whiskey')}>위스키</button>
        <button onClick={()=>setCategory('dish')}>안주</button>
      </Nav>
      <Btns>
        <p>{`개수 : ${userCollection[category].length} / ${menu.length}`}</p>
        <p>{`보유포인트 : ${userPoint.myPoint}`}</p>
        <button 
          disabled={!(userCollection[category].length >= 5 && userPoint[category][0])} 
          onClick={()=>earnPoints(5,10000,0)}
        >5개 : 5000원
        </button>
        <button 
          disabled={!(userCollection[category].length >= 10 && userPoint[category][1])} 
          onClick={()=>earnPoints(10,20000,1)}
        >10개 : 10000원
        </button>
        <button 
          disabled={!(userCollection[category].length >= 15 && userPoint[category][2])} 
          onClick={()=>earnPoints(15,30000,2)}
        >15개 : 20000원
        </button>
      </Btns>      
      <Section>
      {
        menu.map((el, i) => {
          return (
            <Item key={i} coloring={userCollection[category].includes(el.title)} >
              <img src={el.imgURL} alt="메뉴이미지" />
              <p>{el.title}</p>
            </Item>
          )
        })
      }
      </Section> 
    </Wrapper> 
  )
}
export default Book