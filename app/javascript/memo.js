function memo() {
  const submit = document.getElementById("submit");
  submit.addEventListener("click", (e) => {
    const formData = new FormData(document.getElementById("form"));
    const XHR = new XMLHttpRequest();
    XHR.open("POST", "/posts", true);
    XHR.responseType = "json";
    XHR.send(formData);
    XHR.onload = () => {
      if (XHR.status != 200) {
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        return null;
      }
      // itemはレスポンスとして返却されたメモのレコードデータ
      const item = XHR.response.post;
      const list = document.getElementById("list");
      const formText = document.getElementById("content");
      const HTML = `
        <div class="post" data-id=${item.id}>
          <div class="post-date">
            投稿日時：${item.created_at}
          </div>
          <div class="post-content">
          ${item.content}
          </div>
        </div>`;
      // listという要素に対して、HTMLを追加。afterendなので要素listの直後に挿入
      list.insertAdjacentHTML("afterend", HTML);
      // 下行で入力フォームに入力された内容を削除する働きをもている
      formText.value = "";
    };
    e.preventDefault();
  });
}

window.addEventListener("load", memo);