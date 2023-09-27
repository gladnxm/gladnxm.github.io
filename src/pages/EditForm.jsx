// pc화면 사이즈에 맞춰서

import { useNavigate } from "react-router-dom"
import "../style/EditForm.scss"
import { useState } from "react";

function EditForm() {
  const navigate = useNavigate()
  const [image, setImage] = useState(null);
  const handleImageChange = e => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = e => setImage(e.target.result)
      reader.readAsDataURL(file)
    }
  }

  return (
    <form action="#" className="editform">
      <label>이름
        <input type="text" name="title" />
      </label>

      <label>가격
        <input type="number" name="price" />
      </label>

      <label>알코올
        <input type="number" name="alc" />
      </label>

      <label>설명
        <textarea name="explanation" id="" ></textarea>
      </label>

      <label>카테고리
        <select name="category">
          <option value="cocktail">칵테일</option>
          <option value="whiskey">위스키</option>
          <option value="wine">와인</option>
          <option value="beer">맥주</option>
          <option value="dish">안주</option>
        </select>
      </label>

      <label>이미지 첨부하기
        <input 
          type="file" 
          name="img" 
          accept="image/*" 
          onChange={handleImageChange}  
        />
      </label>

      {image && <img src={image} alt="미리보기" />}
      <button type="button" onClick={()=>confirm("취소해?")}>취소</button>
      <button type="submit" onClick={()=>confirm("진짜올립니다?")}>완료</button>
    </form>
  )
}
export default EditForm