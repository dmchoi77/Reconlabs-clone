# 리콘랩스 3D모델 페이지 클론코딩

## 미리보기

![Hnet-image](https://user-images.githubusercontent.com/76215166/168752720-a73d8f2f-48cc-49ec-a628-3e3379304a04.gif)

<br>

## 사용 기술

JavaScript, React, Emotion.js(styled-components), view3D

<br>

## 구현 TODO 리스트

  * ## 최상단에 로고가 존재
  
    <img width="1000" alt="스크린샷 2022-05-17 오후 4 29 35" src="https://user-images.githubusercontent.com/76215166/168828287-b461b8e9-9102-448b-9aff-3d9198fc7733.png">

    <br>

  * ## 3D 뷰어 우측 상단에 모달 아이콘 존재하며, 클릭 시 사용법 가이드 모달이 켜짐

    ![Hnet-image (2)](https://user-images.githubusercontent.com/76215166/168755494-a3e29ebe-b375-4ed2-b5d4-d19460f61f70.gif)

    <br>

  * ## 반응형 페이지(최소: 768 * 1024, 최대: 1920 * 1280)

    ```javascript
    import React from "react";
    import { Global, css } from "@emotion/react";

    const defaultStyle = css`
      height: clamp(1024px, 50%, 1280px);
      width: clamp(768px, 50%, 1920px);
    `;

    function GlobalStyle() {
      return <Global styles={defaultStyle} />;
    }

    export default GlobalStyle;
    ```
    
    전역으로 적용되도록 Global 컴포넌트를 사용하였으며, 반응형 페이지를 간결하게 구현할 수 있는 css의 clamp 함수를 사용하였습니다.

  <br>


  * ## 3D모델 뷰어

    ## view3D

    3D모델 뷰어는 model-viewer보다 view3D의 공식 문서가 읽기 쉽게 작성되어 있다고 생각해 [view3D](https://naver.github.io/egjs-view3d/)를 선택했습니다.

    * ### 문제 발생과 해결
    
      공식 문서의 예제 코드를 그대로 적용했더니 에러가 발생했습니다. 콘솔에 찍힌 에러 메세지를 보고 나서 이유를 알 수 있었습니다.

      view3D 생성자 함수는 DOM을 조작해서 뷰어를 구현하는데, 리액트는 컴포넌트가 렌더링 될 때 함수들이 먼저 실행된 후에 DOM이 그려지기 때문에 예제의 자바스크립트 코드를 그대로 사용하니      에러가 발생하는 것이었습니다.

      이 문제는 useEffect를 사용하여 DOM이 그려진 후에 view3D 생성자 함수가 실행되도록하여 해결했습니다.
  
    <br>
    
    ## 모델을 불러올 수 있으며, 새로고침 마다 무작위로 모델이 보인다.
  
    모델들의 파일명을 json file로 따로 관리하였습니다.

    json을 import하여 배열에 저장하고 Math.random()를 이용해 모델을 무작위로 불러올 수 있게 하였습니다.

    ```javascript
    (Viewer.js code 일부)

    import names from "../names.json";

    ...

    const modelList = [...names];
    const randomFIle = Math.floor(Math.random() * modelList.length);

    useEffect(() => {
      new View3D("#wrapper-el", {
        src: `/models/${modelList[randomFIle].name}.glb`,
        envmap: "/egjs-view3d/texture/artist_workshop_1k.hdr",
      });
    }, []);
    ```

<br>

  * ## 코드 복사하기 버튼
    
    버튼 클릭 시, 현재 브라우저의 URL이 클립보드에 저장됩니다.

    클립보드에 저장 기능을 구현하는 방법에 대해 알아보니 대표적으로 [execCommand](https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand) 과 [Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/writeText)를 사용하는 방법이 있다는 것을 알게 되었습니다. 
  
    그런데 execCommand는 Deprecated 돼서 Clipboard API를 사용했습니다.

  * ## QR 코드

    <img width="400" alt="스크린샷 2022-05-17 오후 5 51 53" src="https://user-images.githubusercontent.com/76215166/168771241-8cb0930b-fdfa-45c6-b302-ccb83cd35556.png">

    ## QR 코드 촬영 시 https://plicar.io/ 로 연결

    ## QR 코드 이미지 다운 받기 버튼

      자바스크립트에서 파일 다운로드를 어떻게 구현하는지에 대해 알아보니 a tag와 download 속성으로 간단하게 구현할 수 있다는 것을 알게 되었습니다. 

      그러나 이 방법은 IE에서는 동작하지 않는다는 문제가 있어 다른 방법을 찾아 보았고, 결국 axios와 blob을 사용해 구현할 수 있었습니다.

      ```javascript
      async function downloadImage() {
        const response = await axios.get(
          "http://localhost:3000/images/qrcode.png",
          { responseType: "blob" }
        );

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "QR_CODE.jpg");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      }
      ```

      다음과 같은 과정으로 axios 요청에서 반환 된 promise를 처리합니다.

        1.Blob 객체를 나타내는 URL을 생성

        2.createElement속성을 사용하여 a 태그를 만들고 여기에 download 및 href 속성 할당

        3.이 링크를 body에 추가하고 click 이벤트를 발생시켜 파일을 다운로드함

        4.다운로드가 끝난 리소스를 해제


## 후기
 
3D 모델이 흥미로운 주제이기도 하고 3D 관련 라이브러리를 다뤄 본 적이 없어서 기대 반, 설렘 반으로 시작했습니다.

기능들을 구현하면서 view3D, Clipboard API 등 관련 라이브러리나 API가 어떤 것들이 있는지 알게 되었고, 공식 문서를 보면서 직접 적용해본 것이 재미있었습니다.

또한 리액트 컴포넌트에서 렌더링 순서와 useEffect가 언제 실행되는지 등에 대해 다시 생각해볼 수 있는 시간이었습니다.
