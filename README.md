# Time Tracker

## 소개
시간별로 무엇을 했는지 기록하고 집계할 수 있는 페이지입니다.

1. `START` 버튼을 눌러 기록을 시작합니다. 
2. 시작 시간과 종료 시간, 작업 내용을 입력합니다. `휴식`을 체크하면 자동으로 휴식 텍스트가 입력됩니다.
3. `추가`, `삭제` 버튼을 누르면 입력 블록이 추가/삭제됩니다.
4. `YOUR TRACK`을 눌러 작업별 시간과 전체 입력 시간을 확인합니다.
<img src = "https://user-images.githubusercontent.com/40853572/153449045-9bf96a77-bec4-473f-ba02-85cc5558c4af.gif" width=700>

## 동기
재택 근무 중에는 업무 내용과 함께 시간을 기록해야 했다. A를 하고 잠시 쉬었다가 B를 하고, 밥 먹고 와서 다시 A를 하고... 이런 식으로 작업 하다보니 각 업무에 쓴 총 시간이 얼마인지 계산하는 일이 매우 귀찮았다.

모바일 앱 대신 웹 브라우저로 시간을 기록하고 싶었고, 마침 JS 기초도 배운 차에 직접 만들어야겠다고 결심했다.

## 사용 도구
HTML + CSS + JavaScript

## 주요 기능&함수
### 1. 입력 블록 추가
<img src = "https://user-images.githubusercontent.com/40853572/154849017-3b0f9980-6980-48e9-a3b8-94b7e871293a.png" width = 700>
이 페이지에서 가장 중요한 기능을 가진 블록이다. 시작 시간+종료 시간+기록을 입력값으로 받고 해당 블록을 
