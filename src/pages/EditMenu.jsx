import { collection, deleteDoc, doc, getDocs, query, updateDoc } from "firebase/firestore"
import { db, storage } from "../firebase"
import { useEffect, useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import EditForm from "../components/EditForm";
import "../style/EditMenu.scss"
import { deleteObject, ref } from "firebase/storage";

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
      //아래코드를 줄인건데 만약되던게 안되면 아래코드로 다시롤백    
      
      // const temp = snapshot.docs.map(doc => {
      //   const {title, price, alc, explanation, imgURL} = doc.data()
      //   return {
      //     title, 
      //     price, 
      //     alc, 
      //     explanation, 
      //     imgURL,
      //     docID: doc.id
      //   }
      // })
      setMenu(temp)
    }
    fetchMenu()
  }, [currentCategory])

  return (
    <>
    <div className="edit-menu">
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
            <div className='item' key={i}>  
              <span>{item.title}</span>
              <span>{item.alc && item.alc + '%'}</span>
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
            </div>
          )
        })
      }
      <button className="plus" onClick={add}>
        <FontAwesomeIcon className='icon' icon={faPlus} />
      </button>
    </div>
    {edit && <EditForm setEdit={setEdit} item={selected} />}
    </>
  )
}
export default EditMenu