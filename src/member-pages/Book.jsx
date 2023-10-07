import { useEffect, useState } from "react"
import { collection, deleteDoc, doc, getDocs, query, updateDoc } from "firebase/firestore"
import { db, storage } from "../firebase"
// import "../style/book.scss"
import styled from "styled-components"

const Wrapper = styled.div`
  background-color: red;
  width: 100vw;
  /* background-color: #b0e691; */
  background-color: yellow;
  box-sizing: border-box;
`
const Nav = styled.nav`
  position: sticky;
  top: 0;
  display: flex;
  justify-content: space-around;
  background-color: red;
  width: 100%;
  height: 50px;
  display: flex;
  button {
    width: 20%;
  }
`

const Item = styled.div`
  width: 50%;
  border: 1px solid orange;
  img { 
    width : 50%;
    opacity: .5;
  }
  p {
    width: 100%;
    height: 20px;
  }
`

function Book() {
  // const currentUser = 0
  console.log("book 컴포넌트 마운트")
  const [category, setCategory] = useState('cocktail')
  const [book, setBook] = useState([])

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
      {
        book.map((el, i) => {
          return (
            <Item key={i}>
              <img src={el.imgURL} alt="메뉴이미지" />
              <p>{el.title}</p>
            </Item>
          )
        })
      }
    </Wrapper> 
  )
}
export default Book