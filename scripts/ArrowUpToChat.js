// 一つ上のメッセージを上矢印で取得するようにする
document.addEventListener('DOMContentLoaded', () => {
  console.log("running boost...");

  // クラス名で要素を取得する関数
  function getElementByClassName(className) {
    return document.querySelector(`.${className}`);
  }

  // 質問するテキストエリアをクラス名で指定
  const className = 'query-box-input';
  let doubleEnter = false;

  function handleKeydown(e) {
    console.log("Keydown event detected:", e);

    // 上矢印キーが押された場合
    if (e.key === 'ArrowUp') {
      const queryBox = getElementByClassName(className);
      if (queryBox && queryBox.value === '') {
        // 特定のセレクタを持つ要素をすべて取得
        const nthChildElements = document.querySelectorAll('.mat-mdc-card .mat-mdc-card-content .message-text-content p');
        const totalElements = nthChildElements.length;
        const nthChildIndex = totalElements - 1; // 最後から2番目
        const targetElement = nthChildElements[nthChildIndex];

        if (targetElement) {
          queryBox.value = targetElement.textContent || targetElement.innerText;
        }
      }
    }
  }

  function checkForTextarea() {
    const textarea = getElementByClassName(className);
    if (textarea) {
      // console.log("Textarea found:", textarea);
      // console.log("Textarea content:", textarea.value);

      // そのエリア内でのキーダウン(キーの入力)のイベントを検知
      textarea.addEventListener('keydown', handleKeydown, true); // capture フェーズでイベントリスナーを設定
    } else {
      console.error("Textarea not found. ClassName:", className);
      console.log("text")
      setTimeout(checkForTextarea, 1000); // 1秒後に再チェック
    }
  }

  checkForTextarea();
});
