// 日本語入力確定のEnterでチャットを送信しないようにする
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

    // 押されたキーがCmd + Enterだった場合のみ
    if (e.key === 'Enter') {
      console.log("Enter detected");
      if (doubleEnter === true) {
        console.log("double Enter detected")
        doubleEnter = false;
        return;
      } else {
        console.log("Stopping immediate propagation");
        doubleEnter = true;
        e.preventDefault();
        e.stopImmediatePropagation();
      }
    } else {
      doubleEnter = false;
    }
  }

  function checkForTextarea() {
    const textarea = getElementByClassName(className);
    if (textarea) {
      console.log("Textarea found:", textarea);
      console.log("Textarea content:", textarea.value);

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
