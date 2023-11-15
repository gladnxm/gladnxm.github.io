/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import styled from "styled-components";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import { WrapperStyles } from "../style";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

const Wrapper = styled.div`
  ${WrapperStyles}
  gap: 30px;
`

const CustomCalendar = () => {
  const [month, setMonth] = useState(11);
  const [day, setDay] = useState(16);
  const [monthSales, setMonthSales] = useState(0);
  const [daySales, setDaySales] = useState(0);
  
  useEffect(()=>{
    (async()=>{
      let a = await getDoc(doc(db, "Sales", `${month}`))
      a = a.data()
      setDaySales(a[day])
      setMonthSales(Object.values(a).reduce((acc, cur) => acc + cur, 0))
    })()
  }, [day, month])
  
  const handleDateChange = selectedDate => {
    const selectedMoment = moment(selectedDate)
    setMonth(selectedMoment.month() + 1)
    setDay(selectedMoment.date())
  };

  return (
    <Wrapper>
      <Calendar 
        onChange={handleDateChange} 
        formatDay={(locale, date) => moment(date).format("DD")}
      >          
      </Calendar>
      <div>
        <p>월 매출 : {monthSales}</p>
        <p>일 매출 : {daySales}</p>
      </div>
    </Wrapper>
  );
};

export default CustomCalendar;