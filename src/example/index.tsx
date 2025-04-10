const Example = () => {
  // const canvas = new fabric.Canvas("canvas-id");
  // canvas.add(new fabric.Rect({ width: 100, height: 100, fill: "red" }));

  return (
    <div>
      <p>예시 페이지</p>
      <hr />

      {/*
            용도: JavaScript에서 암호화(Encryption/Decryption) 기능을 제공.
            기능: SHA, MD5, AES 등 다양한 해시 및 암호화 알고리즘 사용 가능.
            사용 예시: 비밀번호를 해싱하거나, 민감한 정보를 암호화할 때.
         */}
      <div>
        <p>crypto-js"</p>
        <div>{CryptoJS.SHA256("myPassword").toString()}</div>
      </div>

      <div>
        <p>Fabric</p>
        <div></div>
      </div>

      <div>
        <p>mime</p>
        <textarea>
          용도: 파일 확장자에 따른 MIME 타입 추론. 기능: jpg → image/jpeg, pdf →
          application/pdf 등으로 변환. 사용 예시: 파일 업로드나 다운로드 시
          Content-Type 지정할 때 유용.
        </textarea>
        <div>mime.getType('example.pdf');</div>
      </div>

      <div>
        {/* 용도: PDF 파일을 클라이언트 사이드에서 생성/수정할 수 있게 해주는 라이브러리.
기능: 페이지 추가, 텍스트 삽입, 이미지 삽입, PDF 병합 등.
사용 예시: 전자 서명, PDF 템플릿 채우기, PDF 생성 툴 등. */}
        <p>pdf-lib</p>
        <div></div>
      </div>

      <div>
        <p>Fabric</p>
        <div></div>
      </div>
    </div>
  );
};

export default Example;
