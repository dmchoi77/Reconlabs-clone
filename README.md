# 리콘랩스 3D모델 페이지 클론코딩

## 미리보기

![Hnet-image](https://user-images.githubusercontent.com/76215166/168752720-a73d8f2f-48cc-49ec-a628-3e3379304a04.gif)

<br>

## 사용 기술

JavaScript, React, Emotion.js(styled-components), view3D

<br>

## 구현 TODO 리스트

  * ## 3D 뷰어 우측 상단에 모달 아이콘 존재하며, 클릭 시 사용법 가이드 모달이 켜짐

    ![Hnet-image (2)](https://user-images.githubusercontent.com/76215166/168755494-a3e29ebe-b375-4ed2-b5d4-d19460f61f70.gif)

    <br>

  * ## 반응형 페이지
    최소: 768 * 1024 최대: 1920 * 1280
    ```javascript
    const defaultStyle = css`
      body {
        min-width: 768px;
        max-width: 1920px;

        min-height: 1024px;
        max-height: 1280px;
      }
    `;

    function GlobalStyle() {
      return <Global styles={defaultStyle} />;
    }
    ```

  * ## 3D모델 뷰어

    ## view3D

    3D모델 뷰어는 공식 문서가 읽기 쉽게 작성되어 있는 [view3D](https://naver.github.io/egjs-view3d/)를 선택함

    * ### 문제 발생과 해결
    
      공식 문서의 예제 코드를 그대로 적용했더니 에러가 발생했음. 콘솔에 찍힌 에러 메세지를 보고 나서 이유를 알 수 있었는데,

      view3D 생성자 함수는 DOM을 조작해서 뷰어를 구현하는데, 리액트는 컴포넌트가 렌더링 될 때 함수들이 먼저 실행된 후에 DOM이 그려지기 때문에 예제의 자바스크립트 코드를 그대로 사용하니      에러가 발생하는 것이었음

      이 문제는 useEffect를 사용하여 DOM이 그려진 후에 view3D 생성자 함수가 실행되도록하여 해결
  
    <br>
    
    ## 모델을 불러올 수 있으며, 새로고침 마다 무작위로 모델이 보인다.
  
    모델들의 파일명을 json file로 따로 관리함

    json을 import하여 배열에 저장하고 Math.random()를 이용해 모델을 무작위로 불러올 수 있게 함

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
    
    버튼 클릭 시, 현재 브라우저의 URL이 클립보드에 저장 됨

    클립보드에 저장 기능을 구현하는 방법에 대해 알아보니 대표적으로 [execCommand](https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand) 과 [Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/writeText)를 사용하는 방법이 있다는 것을 알게 됨
  
    그런데 execCommand는 Deprecated 돼서 Clipboard API를 사용

  * ## QR 코드

    <img width="400" alt="스크린샷 2022-05-17 오후 5 51 53" src="https://user-images.githubusercontent.com/76215166/168771241-8cb0930b-fdfa-45c6-b302-ccb83cd35556.png">

    ## QR 코드 촬영 시 https://plicar.io/ 로 연결

    ## QR 코드 이미지 다운 받기 버튼

      자바스크립트에서 파일 다운로드를 어떻게 구현하는지에 대해 알아보니 a tag와 download 속성으로 간단하게 구현할 수 있다고 함

      그러나 이 방법은 IE에서는 동작하지 않는다는 문제가 있어 다른 방법을 찾아 보았고, 결국 axios와 blob을 사용해 구현할 수 있었음

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

      다음과 같은 과정으로 axios 요청에서 반환 된 promise를 처리함

        1.Blob 객체를 나타내는 URL을 생성

        2.createElement속성을 사용하여 a 태그를 만들고 여기에 download 및 href 속성 할당

        3.이 링크를 body에 추가하고 click 이벤트를 발생시켜 파일을 다운로드함

        4.다운로드가 끝난 리소스를 해제
