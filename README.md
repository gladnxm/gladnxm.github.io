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

3. store의 중복되는 reducer들을 개선함
같은 로직이 반복되면 바깥에 함수로 빼면 되는거였음
근데 고치고나니 같은품목 장바구니에 여러번 담으면 개수가 안늘어남
처음1개에서 2개까지는 늘어나는데 계속 담아도 2개에서 늘지않음
결론부터 말하면 개수증가로직이 매우아주살짝 잘못됐었음
const updateItem = {
    ...cart[itemIndex],
    count: cart[itemIndex].count + quantity,
    totalPrice: cart[itemIndex].pricePerPiece * (cart[itemIndex].count + quantity)
  }
cart[itemIndex]으로 했어야할걸 그냥 item으로 해서 문제였던거임
cart[itemIndex]으로하면 현재 장바구니에 담겨있는 아이템을 기준으로해서
장바구니에 지금있는 타이틀이면 그것의 count에 수량quantity를 더하는 방식임
근데 item으로 하면 App.jsx에 있듯이
const temp = {
  title: item.title,
  alc: item.alc,
  pricePerPiece: item.price,
  totalPrice: item.price,
  count: 1,
} 
dispatch(addItemToCart({item: temp, tableNumber}))  
매번 이렇게 count가 1인 새상품? 으로 들어와버리니까
count가 계속 기존값+quantity가 아닌 1+quantity로 반복되는거였음
temp(=handleCartItem에서의 item)는 
현재 장바구니에 담겨있는 값이 아니라 App.jsx에서 담기버튼 누를때마다 새로 보내주는 값임
담기버튼 여러번 클릭했는데 딱 최초1회만 수량이 증가하고(1에서 2로증가) 그다음부터는 작동을안했음
작동이 첨부터 아예안되거나 계속되거나 하면 헷갈리지 않았을텐데
한번은 되는데 그담부터안되니까 이게뭔가해서 계속 헤맸음
사실은 한번만 된게아니고 계속해서 count에 1+1이 들어간거였는데

4. App.jsx에서 메뉴를 쭉 불러오잖아
return 안에서 snapshot.docs.map 쓰니까 안됐음
gpt한테 물어보니 비동기 어쩌구 하면서 useEffect를 쓰라는거임
useEffect안에서 docs불러와서 그거를 state에 따로 담고
그 state를 return안에서 매핑하니까 그제서야 되더라
포인트는 로직이 틀린게 아니였음 로직자체는 맞음
근데 useEffect안에서 먼저 메뉴목록을 불러왔어야 했음 
return안에서 바로 직접 불러오면 안되는거였음 왜그런지 이유는 모르겠음 

5. db crud에서 u만 살짝씩안됨 
아예 안되는건 아니고 기본적으로 돌아는 가는데 예를들면
메뉴를 수정했는데 이미지는 수정안하고 기존꺼 그대로 냅뒀다?
그러면 기존이미지가 날라가고 이상한 쓰레기값이 들어가는거임
이미지파일의 경로와 별개로 파일 자체를 객체 속성으로 넣어버림
파일 자체를 stringify로 묶어서 넣고 parse로 풀어서 꺼내는 식으로 해결함
이렇게해서 기존에 들어왔던 파일을 그대로 유지함
수정 컴포넌트가 재랜더링 될떄마다 파일 state가 null로 초기화되는데
이미지를 수정안하고 냅두니까 이미지 파일의 state값인 null이 다시 쓰이는거라 그런거였음




디테일 개선사항
1.메뉴판에서 현재 카테고리 빨간 글자
2.장바구니 담으면 alert대신 쪼만한 팝업창 뜨고 .5초후에 사라지기 


장바구니에 담긴것들
-> 주문내역에는 장바구니랑 똑같이 겹치는거는 수량+1
-> 오더스테이터스는 그대로 어펜드해서 수량증가없이 그대로 추가됨
결국 장바구니에 담긴 객체가 그대로 두 페이지로 전달되는거임
추가되는 로직도 상품이 장바구니에 담기는것과 유사
근데 살짝만 다르게 하는 거지

그럴려면? 오더스데이터스를 스토어에
블루하와이 2 이렇게 ''+이름+수량 으로 문자열 만들어서 배열에 그대로 어펜드
안되면 `${}`하고
그냥 눈으로 뭐들어왔나 확인만 하면 기능이 끝이니까

주문내역도 스토어에
주문내역은 장바구니랑 비슷하게 해야함
기존값있어? 수량만+1해 사실상 로직 똑같다봐도됨

그렇게 해서 오더스테이터스에서 그 테이블의 결제버튼 누르면 
그 테이블의 주문내역이 쫙 나오는거지
결제완료하면 손님이 다먹고 나간거니까 장바구니와 주문내역 비우기
나중에 토스페이먼츠같은거로 진짜결제 되게끔 해볼수도