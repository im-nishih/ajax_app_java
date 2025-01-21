const buildHTML = (XHR) => {
  //コントローラからの値
  const item = XHR.response;
  //設定するhtml
  const html = `
    <div class="post">
      <div class="post-date">
        投稿日時：${item.createdAt}
      </div>
      <div class="post-content">
        ${item.content}
      </div>
    </div>`;
  return html;
};

function post (){
  const submit = document.getElementById("submit");
  submit.addEventListener("click", (e) => {
    e.preventDefault();

    const form = document.getElementById("form");
    const formData = new FormData(form);

    const XHR = new XMLHttpRequest();
    XHR.open("POST", "/posts", true);
    XHR.responseType = "json";

    XHR.send(formData);

    //ロード時
    XHR.onload = () => {
      //レスポンス200チェック
      if (XHR.status != 200) {
        alert(`Error ${XHR.status}: ${XHR.response.error}`);
        return null;
      };

      //要素取得
      const list = document.getElementById("list");
      const formText = document.getElementById("content");
      
      //リスト部分を更新
      list.insertAdjacentHTML("afterend", buildHTML(XHR));
      formText.value = "";
    };
  });
 };
 
 window.addEventListener('load', post);