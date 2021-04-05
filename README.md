# SPA_Project

<br/>

<br/>

***

### Description

- 최근 하드웨어의 성능 향상과 데이터 수집 기술의 발달, 공공데이터의 개방 등의 요인으로 계산과학 분야에서 대용량의 데이터가 축적되었으며, 이를 바탕으로 매우 다양한 데이터 분석활동이 진행되고 있다. 하지만 연구자들의 분석활동으로 만들어진 결과물들은 대부분이 문석, 소스 파일의 형태로 존재한다. 이렇듯 결과물은 프로그램 의 형태를 띄고 있지 못하므로 결과를 사용하고자 하는 사용자들에게 많은 제약과 불 편함이 따른다.
- 본 SPA_Edison 프로젝트는 이러한 제약, 불편을 해소하기 위해 수집 데이터를 기 반으로 사용자에게 시뮬레이션 작업 환경을 제공하는 프레임워크를 개발하고자 하는 취지를 가진다. 
- 본 코드들의 경우 SPA_Edison 프레임 워크 웹 시스템 부분에 해당된다.

<br/>

<br/>

***

### Install

client, server 디렉토리 각각에서 다음 명령어를 실행한다.

```
npm install
```

### Usage

React 실행

```
cd client
npm run start
```

Node 서버 실행

```
cd server
node main.js or nodemon main.js
```

React, Node Server 동시 실행

```
cd client
npm run dev
```

<br/>

<br/>

***

### Page View

![image](https://user-images.githubusercontent.com/57346455/113567554-ccf02000-9649-11eb-88ee-70a5232cff7c.png)

웹페이지 홈 화면에서는 본 시스템의 주요 페이지 3화면의 설명을 보고 이동할 수 있도록 버튼을 제공하고 있다.

<br/>

![image](https://user-images.githubusercontent.com/57346455/113567892-71726200-964a-11eb-9825-9449f362abc6.png)

introduction 페이지에서는 해당 프로젝트의 System Architecture, 주요 기능, Publication, 참여 인원들을 확인해볼 수 있다.

<br/>

![image](https://user-images.githubusercontent.com/57346455/113567839-530c6680-964a-11eb-84ed-4c852dfd7c98.png)

Time Estimation 페이지에서는 Cluster type, App name, Paramter set 이렇게 3가지 종류의 정보들을 선택 및 입력해야 한다.

![image](https://user-images.githubusercontent.com/57346455/113568072-c8783700-964a-11eb-8d10-feb9ec5caa63.png)

모든 정보를 입력하고 submit 버튼을 클릭할 시 해당하는 정보에 대한 시뮬레이션 추정시간을 서버에서 받아볼 수 있다. 또한 Reset 버튼을 통해 다시 조건을 선택해 추정시간을 알아볼 수 있다.

<br/>

![image](https://user-images.githubusercontent.com/57346455/113568211-12f9b380-964b-11eb-83b1-66d78e8d33c0.png)

Param Statistics 페이지의 경우에도 Time Estimation 페이지와 유사하게 Cluster type, App name 두가지 데이터를 선택할 시 가장 많이 검색해본 해당 App의 상위 10개 parameter set을 확인해 볼 수 있다. 이 페이지 또한 Reset 버튼을 통해 다른 App들의 Statistics도 확인해볼 수 있다.

<br/>

<br/>

***

### License

본 프로젝트는 DEAL Lab의 프로젝트 일환으로 구체적 라이센스는 [DEAL Lab](https://sites.google.com/view/knudeal) 에서 소유하고 있다.

