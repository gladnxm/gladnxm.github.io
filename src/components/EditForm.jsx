/* eslint-disable react/prop-types */
import { useState } from "react";
import { db, storage } from "../firebase";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore"
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage"
import styled from "styled-components";

const Form = styled.form`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #918383;
  box-sizing: border-box;
  padding: 20px;
  z-index: 5;
  label {
    position: absolute;
  }
  label:nth-child(1) {
    top: 0px;
    left: 20px;
  }
  label:nth-child(2) {
    top: 40px;
    left: 20px;
  }
  label:nth-child(3) {
    top: 80px;
    left: 20px;
  }
  label:nth-child(4) {
    top: 120px;
    left: 20px;
  }
  label:nth-child(5) {
    top: 200px;
    left: 20px;
  }
  label:nth-child(6) {
    top: 200px;
    right: 0;
  }
  textarea {
    width: 150px;
    height: 40px;
    resize: none;
  }
  img {
    position: absolute;
    top: 0;
    right: 0;
    width: 130px;
  }
  button {
    position: absolute;
    right: 0;
    &:first-of-type {bottom: 30px;}
    &:last-of-type {bottom: 0;}
  }
  input[type="file"] {
    display: none;
  }
`


function EditForm({setEdit, item}) {
  const [img, setImg] = useState(item ? item.imgURL : "");
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState(item ? item.title : "");
  const [price, setPrice] = useState(item ? item.price : "");
  const [alc, setAlc] = useState(item ? item.alc : "");
  const [explanation, setExplanation] = useState(item ? item.explanation : "");
  const [category, setCategory] = useState(item ? item.category : "cocktail");

  const onImageChange = e => {    
    const f = e.target.files[0]; 
    setImg(URL.createObjectURL(f))
    setFile(f)
  }
  const onSubmit = async e => {
    e.preventDefault()    
    if(!item) { //생성
      const photoRef = ref(storage, `${category}/${title}`)
      const result = await uploadBytes(photoRef, file)
      const url = await getDownloadURL(result.ref)
      await addDoc(
        collection(db, category),
        { title, price:parseInt(price), alc:parseFloat(alc), explanation, category, imgURL: url }
      )
    } else { // 수정 
      let url = item.imgURL;
      if(img !== item.imgURL) {
        let photoRef = ref(storage, `${item.category}/${item.title}`)
        await deleteObject(photoRef)
        photoRef = ref(storage, `${category}/${title}`)
        const result = await uploadBytes(photoRef, file)
        url = await getDownloadURL(result.ref)
      }
      await updateDoc(
        doc(db, category, item.docID),
        { title, price:parseInt(price), alc:parseFloat(alc), explanation, category, imgURL: url }
      )
    }
    
    alert("등록됨")
    setEdit(prev=>!prev)
  }

  return (
    <Form 
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
    </Form>
  )
}
export default EditForm