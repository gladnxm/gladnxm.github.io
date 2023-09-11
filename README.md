트러블슈팅
1. 칵테일이 아닌 다른 품목(맥주,위스키,와인..)의 상세보기를 누르고
뒤로가기 하면 현재 카테고리가 자꾸 칵테일로 된다
가령 위스키 정보를 보고 상세보기를 닫았는데 메뉴판에 보이는 메뉴들이 칵테일로 됨 
맨처음 들어왔을 때처럼
상세보기가 페이지면 뒤로가기도 페이지 이동이라 메뉴판이 재랜더링돼서
현재카테고리 state도 초기값으로 리셋되는거임 
그래서 상세보기를 페이지에서 팝업창 방식으로 바꿔서 해결
닫기버튼 누르면 팝업창을 팝업보여주기 state에 따라 보여주고 가리고만 바꾸는게 되니
메뉴판이 재렌더링 될일도 없으니 현재카테고리 state도 그대로~

2. 장바구니에서 수량조절하면 합계가 잘 바뀐다
그런데 메뉴판에서 같은 품목 여러번 담으면 개수만 늘어나고 합계 변경이 안됨
exist ? exist.count++ : state[tableNumber].push(item)
여기가 문제였음
: 일때는 기존 배열에 푸쉬를 함으로써 새로운 state로 변경이 되는데
? 일때는 단지 의 내부값 exist.count만 1 늘린거라 새로운 state로 변경안된거였음
?일때 plusCount의 로직(새객체 만들어서 꽂아넣기)이 진행되게끔 하니 자연스럽게 state가 변경되는 구조로 됨
다시 말해서 +버튼으로 수량 1 늘리거나 같은 제품을 또 담거나 
같은 로직(개수늘고 그거에맞춰 그제품의 토탈값도 증가)이 작동하는 형태


디테일 개선사항
1.메뉴판에서 현재 카테고리 빨간 글자
2.장바구니 담으면 alert대신 쪼만한 팝업창 뜨고 .5초후에 사라지기 