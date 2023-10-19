import { useEffect, useRef, useState } from "react"
import { collection, doc, getDoc, getDocs, query, updateDoc } from "firebase/firestore"
import { auth, db } from "../firebase"
import styled, {css} from "styled-components"

const Wrapper = styled.div`
  width: 100%;
`
const Nav = styled.nav`
  position: sticky;
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
  }
`

function Book() {
  const [category, setCategory] = useState('cocktail')
  const [menu, setMenu] = useState([]) // 메뉴아이템들
  const userCollection = useRef([]) // 주문한거 제목모은배열 그회원꺼 통째로, .category로 접근
  const userPoint = useRef([]) // 포인트 발급여부배열 그회원꺼 통째로, .category로 접근
  const uid = useRef(auth.currentUser.uid)

  useEffect(()=>{
    const init = async() => {
      let point = await getDoc(doc(db, 'UserPoint', uid.current))
      userPoint.current = point.data()
      let collect = await getDoc(doc(db, 'UserCollection', uid.current))
      userCollection.current = collect.data()
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
    const temp = [...userPoint.current[category]]
    temp[idx] = false
    await updateDoc(
      doc(db, "UserPoint", uid.current), 
      { 
      myPoint: userPoint.current.myPoint + price, 
      category: temp     
      }
    )
    alert(price + " 포인트 적립됨. 다음 주문시 사용 가능")
  }

  return (
    <Wrapper>
      <Nav>
        <button onClick={()=>setCategory('cocktail')}>칵테일</button>
        <button onClick={()=>setCategory('beer')}>맥주</button>
        <button onClick={()=>setCategory('wine')}>와인</button>
        <button onClick={()=>setCategory('whiskey')}>위스키</button>
        <button onClick={()=>setCategory('dish')}>안주</button>
      </Nav>
      <div>
        <p>{`${userCollection.current[category].length} / ${menu.length}`}</p>
        <button disabled={userPoint.current[category][0]} onClick={()=>earnPoints(5,10000,0)}>qq</button>
        <button disabled={userPoint.current[category][1]} onClick={()=>earnPoints(10,20000,1)}>dd</button>
        <button disabled={userPoint.current[category][2]} onClick={()=>earnPoints(15,30000,2)}>ss</button>
      </div>
      <Section>
      {
        menu.map((el, i) => {
          return (
            <Item key={i} coloring={userCollection.current[category].includes(el.title)} >
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