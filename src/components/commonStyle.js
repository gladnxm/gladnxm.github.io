import { css } from "styled-components"

const WrapperStyles = css` //admin페이지에서 가운데정렬할때 필요한 랩퍼
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`
const HeaderStyles = css`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  height: 50px;
  span {
    font-size: 18px;
    font-weight: bold;
  }
  .icon {    
    font-size: 24px;
  }
`
export { WrapperStyles, HeaderStyles }