import { useEffect, useRef, useState } from "react"
import { collection, doc, getDoc, getDocs, query } from "firebase/firestore"
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
  console.log("book 컴포넌트 마운트")
  const [category, setCategory] = useState('cocktail')
  const [book, setBook] = useState([])
  // const [collection, setCollection] = useState([])
  const collect = useRef([])
  
  useEffect(()=>{
    const coloring = async() => {
      const ref = doc(db, 'UserCollection', auth.currentUser.uid)
      let getCollect = await getDoc(ref)
      collect.current = Object.values(getCollect.data()).flat()
      // setCollection(collection)
    }
    coloring()
  })
  useEffect(()=>{
    const fetchMenu = async() => {
      const menuQuery = query(collection(db, category))
      const snapshot = await getDocs(menuQuery)
      const temp = snapshot.docs.map(doc => ({title: doc.data().title, imgURL: doc.data().imgURL}))
      setBook(temp)
    }    
    fetchMenu()
  }, [category])

  return (
    <Wrapper>
      <Nav>
        <button onClick={()=>setCategory('cocktail')}>칵테일</button>
        <button onClick={()=>setCategory('beer')}>맥주</button>
        <button onClick={()=>setCategory('wine')}>와인</button>
        <button onClick={()=>setCategory('whiskey')}>위스키</button>
        <button onClick={()=>setCategory('dish')}>안주</button>
      </Nav>
      <Section>
      {
        book.map((el, i) => {
          return (
            <Item key={i} coloring={collect.current.includes(el.title)} >
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