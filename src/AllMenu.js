function EditForm({setEdit, item}) {
  const [img, setImg] = useState(item ? item.imgURL : "");
  const [file, setFile] = useState(item ? JSON.parse(item.file) : null);

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
    if(!item) { //생성
      const photoRef = ref(storage, `${category}/${title}`)
      const result = await uploadBytes(photoRef, file)
      const url = await getDownloadURL(result.ref)
      await addDoc(
        collection(db, category),
        { file:JSON.stringify(file), imgURL: url }
      )
    } else { // 수정 
      let url = item.imgURL;
      if(file !== item.file) {
        let photoRef = ref(storage, `${item.category}/${item.title}`)
        await deleteObject(photoRef)
        photoRef = ref(storage, `${category}/${title}`)
        const result = await uploadBytes(photoRef, file)
        url = await getDownloadURL(result.ref)
      }
      await updateDoc(
        doc(db, category, item.docID),
        {  file:JSON.stringify(file), imgURL: url }
      )
    }
  }

  return (
    <form 
      action="#" 
      className="editform" 
      onSubmit={onSubmit}
    >      
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