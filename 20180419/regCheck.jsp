<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<% request.setCharacterEncoding("utf-8"); %>
<!doctype  html> <!-- regCheck.jsp -->
<html lang="ko">
 <head>
   <meta charset="utf-8"/>
   <meta name="viewport" content="width=device-width, initial-scale=1"/>
   <title>폼 학습</title>
 </head>
 <body>
  <section><h2>이름/이메일</h2>
   <h2>이름:<%=request.getParameter("stud_name")%>, 이메일:<%=request.getParameter("stud_email")%>, , 전화:<%=request.getParameter("stud_phone")%><br/></h2>
<h2>아이디/비밀번호</h2>
<h2>아이디:<%=request.getParameter("stud_id")%>, 비밀번호:<%=request.getParameter("stud_passwd")%><br/></h2>
<h2>성별/취미</h2>
<h2>성별:<%=request.getParameter("stud_gender")%>, 취미:<%=request.getParameter("stud_hobby");%>
<% if(uHobby == null) {out.println("입력내용없음");}
   else{ for(int i =0; i<uHobby.length; i++) { out.println(uHobby[i]; } } %>
<br/>
</h2>
</section>
</section>
 </body>
</html>
