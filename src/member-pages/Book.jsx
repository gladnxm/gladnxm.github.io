import { useEffect, useRef, useState } from "react"
import { collection, doc, getDoc, getDocs, query, updateDoc } from "firebase/firestore"
import { auth, db } from "../firebase"
import styled, {css} from "styled-components"

const Wrapper = styled.div`
  width: 100%;
`
const Nav = styled.nav`
  position: sticky;
  z-index: 1;
  top: 0;
  display: flex;
  justify-content: space-around;
  width: 100%;
  height: 50px;
  display: flex;
  button {
    width: 20%;
  }
`
const Section = styled.section`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`
const Item = styled.div`
  width: 50%;
  border: 1px solid orange;
  box-sizing: border-box;
  img { 
    width : 50%;
    ${props => props.coloring || css`filter: grayscale(1);`}
  }
  p {
    width: 100%;
    height: 20px;
    ${props => props.coloring && css`color: green;`}
  }
`

function Book() {
  const [category, setCategory] = useState('cocktail')
  const [menu, setMenu] = useState(null) // 메뉴아이템들
  const [userCollection, setUserCollection] = useState(null) // 주문한거 제목모은배열 그회원꺼 통째로, .category로 접근
  const [userPoint, setUserPoint] = useState(null) // 포인트 발급여부배열 그회원꺼 통째로, .category로 접근
  const uid = useRef(auth.currentUser.uid)

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
      <Nav>
        <button onClick={()=>setCategory('cocktail')}>칵테일</button>
        <button onClick={()=>setCategory('beer')}>맥주</button>
        <button onClick={()=>setCategory('wine')}>와인</button>
        <button onClick={()=>setCategory('whiskey')}>위스키</button>
        <button onClick={()=>setCategory('dish')}>안주</button>
      </Nav>
      <div className="btns">
        <p>{`${userCollection[category].length} / ${menu.length}`}</p>
        <p>{`보유포인트 : ${userPoint.myPoint}`}</p>
        <button 
          disabled={!(userCollection[category].length >= 5 && userPoint[category][0])} 
          onClick={()=>earnPoints(5,10000,0)}
        >5개 달성
        </button>
        <button 
          disabled={!(userCollection[category].length >= 10 && userPoint[category][1])} 
          onClick={()=>earnPoints(10,20000,1)}
        >10개 달성
        </button>
        <button 
          disabled={!(userCollection[category].length >= 15 && userPoint[category][2])} 
          onClick={()=>earnPoints(15,30000,2)}
        >15개 달성
        </button>
      </div>      
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