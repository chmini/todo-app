<a name="readme-top"></a>

# Simple Todo List

<p>
  MUI, React Query를 이용한 todo list앱 입니다.
</p>
<a href="https://papa-todo-app.vercel.app">데모 보기</a>

<details>
  <summary>
    <h4>목차</h4>
  </summary>
  <div>
    <ol>
      <li><a href="#page_facing_up-개요">:page_facing_up: 개요</a></li>
      <li>
        <a href="#wrench-설치">:wrench: 설치</a>
        <ul>
          <li><a href="#env-file">env file</a></li>
          <li><a href="#개발환경-실행">개발환경 실행</a></li>
        </ul>
      </li>      
      <li><a href="#file_folder-폴더구조">:file_folder: 폴더구조</a></li>
      <li><a href="#grin-고민">:grin: 고민</a></li>
      <li><a href="#rocket-개선점">:rocket: 개선점</a></li>
    </ol>
  </div>
</details>

## :page_facing_up: 개요

제목과 내용으로 구성된 간단한 todo list입니다.<br/>
가독성이 높은 코드를 짜고 UX 만족도가 높을 수 있는 앱을 만드는 것을 목표로 했습니다.

[![image](https://user-images.githubusercontent.com/39076382/216623592-4f1b98d6-15e2-470b-b92a-688f3e1f3bbb.png)](https://papa-todo-app.vercel.app)

## :wrench: 설치

### env file

```
VITE_API_ENDPOINT="http://localhost:8080" // 또는 배포해둔 백엔드 API 서버 주소
```

### 개발환경 실행

```bash
$ git clone https://github.com/chmini/todo-app.git
$ yarn
$ yarn workspace backend dev
$ yarn workspace frontend dev
```

## :file_folder: 폴더구조

```bash
src
├── api             # API 관리
├── components      # 공통 컴포넌트
├── pages           # 페이지 
│   └── components  # 페이지 내부에서만 사용되는 컴포넌트
├── store           # 전역 상태 관리를 위함
├── styles          # 스타일 파일
└── utils           # 코드 전체적으로 어디에서나 쓰일 수 있는 함수들을 모아두기 위함
```

## :grin: 고민

#### 왜 상태관리 도구로 zustand를 사용했는가?

처음에는 편리한 상태관리로 유명한 recoil을 사용했지만 zustand로 바꾸게 된 이유는 **컴포넌트 외부에서의 상태 접근** 때문입니다.<br/>
API 요청인스턴스를 따로 모듈화를 해두고 요청 헤더에 필요한 토큰을 전역 상태로부터 얻도록 설계했습니다.<br/>
토큰을 로컬스토리지에 저장하는 방식으로 간단히 구현했지만 그렇다고 하더라도 직접적인 접근은 지양하는 것이 좋다고 판단했습니다.<br/>
아쉽게도 recoil에서도 컴포넌트 외부에서 상태 접근 방법을 찾지 못해서 zustand라는 도구를 사용하게 되었습니다.

#### Modal 상태관리 전역? 지역?

MUI를 이용해 TodoListItem 컴포넌트를 구성하고 모달 상태는 useModal이라는 커스텀 훅으로 관리하도록 설계를 했지만 
ListItem내에서 트리거 되는 모달이 2가지 였고 커스텀 훅을 사용하더라도 트리거(버튼)와 Modal을 분리함으로써 props로 전달하게 되고 복잡함이 늘어나고 가독성 또한 해치게 되었습니다.<br />
따라서 모달 상태를 전역으로 두고 관리하는 포인트를 하나로 두고 액션(open, close)만 ListItem에서 활용하게 함으로써 가독성이 개선되고 사용성 또한 좋아지게 되었습니다.

## :rocket: 개선점

#### React Query 커스텀 훅

useQuery, useMutation을 컴포넌트 내부에서 사용함으로 인해서 가독성을 해친다는 느낌은 전혀 없었습니다. 가독성이 상대적인 기준이라 그럴 수도 있습니다.<br />
하지만 리액트 쿼리의 컨셉이 클라이언트, 서버 상태를 구분하는 점을 생각해서 
폴더 하나에 도메인 기준으로 묶어두는 것이 응집도를 높이고 가독성 또한 높일 수 있을 것이라 예상되어 1차 마무리 시점(02.03)이후에 바로 시도할 것입니다.

  
  
  
  
  
  
  
  
  
  
  
