/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import styled from "styled-components";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import { WrapperStyles } from "../style";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { setMonth, setDay, addSales, updateSales } from '../store.js'

const Wrapper = styled.div`
  ${WrapperStyles}
`
const Main = styled.main`
  display: flex;
  gap: 30px;
  width: 40%;
  height: 50%;
  /* border: 1px solid #60c6d8; */
`
const Sales = () => {
  // const [month, setMonth] = useState(11);
  // const [day, setDay] = useState(16);
  const [monthSales, setMonthSales] = useState(0);
  // const [daySales, setDaySales] = useState(0);
  const month = useSelector(state => state.adminInfo.month)
  const day = useSelector(state => state.adminInfo.day)
  const daySales = useSelector(state => state.adminInfo.daySales)
  const dispatch = useDispatch()

  useEffect(()=>{
    (async()=>{
      let a = await getDoc(doc(db, "Sales", `${month}`))
      a = a.data()
      // dispatch(addSales(a[day]))      
      setMonthSales(Object.values(a).reduce((acc, cur) => acc + cur, 0))
    })()
  }, [day, month])
  
  const handleDateChange = selectedDate => {
    const selectedMoment = moment(selectedDate)
    dispatch(setMonth(selectedMoment.month() + 1))
    dispatch(setDay(selectedMoment.date()))
    // dispatch(updateSales())
  };

  return (
    <Wrapper>
    <Main>
      <Calendar 
        onChange={handleDateChange} 
        formatDay={(locale, date) => moment(date).format("DD")}
      >          
      </Calendar>
      <div>
        <p>월 매출 : {monthSales}</p>
        <p>일 매출 : {daySales}</p>
      </div>
    </Main>
    </Wrapper>
  );
};

export default Sales;