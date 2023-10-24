import { collection, deleteDoc, doc, getDocs, query, updateDoc } from "firebase/firestore"
import { db, storage } from "../firebase"
import { useEffect, useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import EditForm from "../components/EditForm";
import { deleteObject, ref } from "firebase/storage";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 700px;
  height: 400px;
  position: relative;
  border: 1px solid #b0e691;
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow-y: scroll;
  nav {
    height: 50px;
    display: flex;
    gap: 10px;
    justify-content: space-evenly;
    border-bottom: 1px solid #b0e691;
    button { width: 70px; }
  }
`
const Item = styled.div`
  background-color: rgb(231, 225, 225);
  width: 600px;
  height: 40px;
  line-height: 2.5;
  span {display: inline-block;}
  span:nth-of-type(1) {width: 250px;}
  span:nth-of-type(2) {width: 70px;}
  span:nth-of-type(3) {width: 80px;}
  .icon {width: 40px;} 
`
const PlusBtn = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  right: 20px;
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
  const modify = async item => {
    setSelected(item) 
    setEdit(prev=>!prev)
  }
  const remove = async item => {
    const ok = confirm("지울거임?")
    if(!ok) return
    await deleteDoc(doc(db, `${currentCategory}`, item.docID))
    const photoRef = ref(storage, `${currentCategory}/${item.title}`)
    await deleteObject(photoRef)
    alert("삭제됨")
  }
    
  useEffect(()=>{
    const fetchMenu = async() => {
      const menuQuery = query(collection(db, currentCategory))
      const snapshot = await getDocs(menuQuery)
      const temp = snapshot.docs.map(doc => ({...doc.data(), docID: doc.id}))
      setMenu(temp)
    }
    fetchMenu()
  }, [currentCategory])

  return (
    <>
    <Wrapper>
      <nav>
        <button onClick={()=>setCurrentCategory('cocktail')}>칵테일</button>
        <button onClick={()=>setCurrentCategory('beer')}>맥주</button>
        <button onClick={()=>setCurrentCategory('wine')}>와인</button>
        <button onClick={()=>setCurrentCategory('whiskey')}>위스키</button>
        <button onClick={()=>setCurrentCategory('dish')}>안주</button>
      </nav> 
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
      <PlusBtn onClick={add}>
        <FontAwesomeIcon className='icon' icon={faPlus} />
      </PlusBtn>
    </Wrapper>
    {edit && <EditForm setEdit={setEdit} item={selected} />}
    </>
  )
}
export default EditMenu