import { collection, deleteDoc, doc, getDocs, query } from "firebase/firestore"
import { db, storage } from "../firebase"
import { useEffect, useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import EditForm from "../components/EditForm";
import { deleteObject, ref } from "firebase/storage";
import styled from "styled-components";
import { WrapperStyles } from "../components/commonStyle";

const Wrapper = styled.div`
  ${WrapperStyles}
`
const Main = styled.main`
  width: 40%;
  height: 60%;
  border: 1px solid #60c6d8;
`
const Nav = styled.nav`
  width: 100%;
  height: 15%;
  display: flex;
  background-color: #f8f8f8;
  button { 
    width: 70px;
    height: 100%;
    background-color: transparent;
    border: none;
    &:last-of-type { margin-right:50px; }
  }
  .add-menu {
    display: flex;
    align-items: center;
    gap: 5px;
    color: orange;
    svg { width: 20px; }
    span { font-size: 14px; }
  }
`
const List = styled.section`
  width: 100%;
  height: 85%;
  overflow-y: scroll;
`
const Item = styled.div`
  display: flex;
  font-size: 14px;
  width: 100%;
  height: 50px;
  align-items: center;
  border-bottom: 1px solid #000;
  .icon { font-size:16px; }
  * { flex: 1; }
  span:first-of-type { flex: 5; }
`

function EditMenu() {
  const [currentCategory, setCurrentCategory] = useState('cocktail')
  const [menu, setMenu] = useState([])
  const [selected, setSelected] = useState(null) //수정연필 클릭한거. state아닌 일반변수로 하면 작동안함.
  const [edit, setEdit] = useState(false) //편집창 켜는 여부
  
  const add = () => {
    setSelected(null)
    setEdit(prev=>!prev)
  }
  const modify = item => {
    setSelected(item) 
    setEdit(prev=>!prev)
  }
  const remove = item => {
    const ok = confirm("지울거임?")
    if(!ok) return
    deleteDoc( doc(db, `${currentCategory}`, item.docID) )
    deleteObject( ref(storage, `${currentCategory}/${item.title}`) )
    alert("삭제됨")
  }
    
  useEffect(()=>{
    (async() => {
      const snapshot = await getDocs(query(collection(db, currentCategory)))
      const temp = snapshot.docs.map(doc => ({...doc.data(), docID: doc.id}))
      setMenu(temp)
    })()// data fetching
  }, [currentCategory])

  return (
    <Wrapper>
    <Main>
      <Nav>
        <button onClick={()=>setCurrentCategory('cocktail')}>칵테일</button>
        <button onClick={()=>setCurrentCategory('beer')}>맥주</button>
        <button onClick={()=>setCurrentCategory('wine')}>와인</button>
        <button onClick={()=>setCurrentCategory('whiskey')}>위스키</button>
        <button onClick={()=>setCurrentCategory('dish')}>안주</button>
        <div className="add-menu" onClick={add}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
          </svg>
          <span>메뉴 추가</span>
        </div>
      </Nav> 
      <List>
      {
        menu.map((item, i) => {
          return (
            <Item key={i}>  
              <span>{item.title}</span>
              <span>{item.alc ? item.alc + '%' : ''}</span>
              <span>{'￦' + item.price}</span>
              <FontAwesomeIcon
                className='icon' 
                icon={faPen}//수정 연필아이콘 
                onClick={() => modify(item)}
              />
              <FontAwesomeIcon 
                className='icon' 
                icon={faTrash} //삭제 휴지통아이콘 
                onClick={() => remove(item)}
              />
            </Item>
          )
        })
      }
      </List>      
    {edit && <EditForm setEdit={setEdit} item={selected} />}
    </Main>
    </Wrapper>
  )
}
export default EditMenu