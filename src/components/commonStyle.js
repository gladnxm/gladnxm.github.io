import styled, { css } from "styled-components"

const WrapperStyles = css` //admin페이지에서 가운데정렬할때 필요한 랩퍼
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
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
const OrderListStyles = css`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 20px 0;
  span {
    text-align: center;
    &:nth-child(1) { flex: 5; }
    &:nth-child(2) { flex: 1; }
    &:nth-child(3) { flex: 1; }
    &:nth-child(4) { flex: 2; }
  }
`

export { WrapperStyles, HeaderStyles, OrderListStyles }