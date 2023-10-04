/* eslint-disable react/prop-types */
import "../style/EditForm.scss"
import { useState } from "react";
import { db, storage } from "../firebase";
import { addDoc, collection, updateDoc } from "firebase/firestore"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"

function EditForm({setEdit, item}) {
  // const [imgFile, setImgFile] = useState(item.imgURL || null);
  const [img, setImg] = useState(item ? item.imgURL : "");
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState(item ? item.title : "");
  const [price, setPrice] = useState(item ? item.price : "");
  const [alc, setAlc] = useState(item ? item.alc : "");
  const [explanation, setExplanation] = useState(item ? item.explanation : "");
  const [category, setCategory] = useState("cocktail");

  const onImageChange = e => {    
    const f = e.target.files[0];    
    const reader = new FileReader();
    reader.onload = e => setImg(e.target.result)
    reader.readAsDataURL(f)
    //실제 파일을 업로드하는 로직과 form에서 미리보기 띄우는 로직이 구분됨
    const {files} = e.target;
    (files && files.length === 1) && setFile(files[0]);
  }
  const onSubmit = async e => {
    e.preventDefault()
    // const locationRef = ref(storage, `${category}/${item.title}/${item.title}`)
    const locationRef = ref(storage, `${category}/${title}`)
    const result = await uploadBytes(locationRef, file)
    const url = await getDownloadURL(result.ref)
    // const newMenu = await addDoc(collection(db, `${category}/${category}`), {
    const newMenu = await addDoc(collection(db, category), {
      title,
      price,
      alc,
      explanation,
      imgURL: url
    })
    
    alert("등록됨")
    setImg(null)
    setFile(null)
    setEdit(prev=>!prev)
  }

  return (
    <form 
      action="#" 
      className="editform" 
      onSubmit={onSubmit}
    >
      <label>이름
        <input 
          type="text" 
          name="title" 
          value={title} 
          onChange={e=>setTitle(e.target.value)} 
        />
      </label>
      <label>가격
        <input 
          type="number" 
          name="price" 
          value={price} 
          onChange={e=>setPrice(e.target.value)} 
        />
      </label>
      <label>알코올
        <input 
          type="number" 
          name="alc" 
          value={alc} 
          onChange={e=>setAlc(e.target.value)} 
        />
      </label>
      <label>설명
        <textarea 
          name="explanation" 
          value={explanation} 
          onChange={e=>setExplanation(e.target.value)}>
        </textarea>
      </label>
      <label>카테고리
        <select 
          name="category" 
          value={category} 
          onChange={e=>setCategory(e.target.value)}
        >
          <option value="cocktail">칵테일</option>
          <option value="whiskey">위스키</option>
          <option value="wine">와인</option>
          <option value="beer">맥주</option>
          <option value="dish">안주</option>
        </select>
      </label>
      <label>이미지 첨부
        <input 
          type="file" 
          name="img" 
          accept="image/*" 
          onChange={onImageChange}  
        />
      </label>

      {img && <img src={img} alt="미리보기" />}
      <button type="button" onClick={()=>setEdit(prev=>!prev)}>취소</button>
      <button type="submit">완료</button>
    </form>
  )
}
export default EditForm