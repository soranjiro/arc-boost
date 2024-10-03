// 日本語入力確定のEnterでチャットを送信しないようにする
document.addEventListener('DOMContentLoaded', () => {
  console.log("running boost...");

  // クラス名で要素を取得する関数
  function getElementByClassName(className) {
    return document.querySelector(`.${className}`);
  }

  // 質問するテキストエリアをクラス名で指定
  const className = 'query-box-input';
  let cmdEnter = false;

  function handleKeydown(e) {
    console.log("Keydown event detected:", e);

    // 押されたキーがCmd + Enterだった場合のみ
    if (e.key === 'Enter' && e.metaKey) {
      console.log("Cmd + Enter detected");
      cmdEnter = true;
      // プログラム的に Enter キーの押下イベントを発生させる
      const enterEvent = new KeyboardEvent('keydown', {
        key: 'Enter',
        code: 'Enter',
        keyCode: 13,
        which: 13,
        bubbles: true,
        cancelable: true
      });
      e.target.dispatchEvent(enterEvent);
      cmdEnter = false;
      return;
    }

    // それ以外の場合はイベントの伝播を中止する(日本語の確定は行われる)
    if (e.key === 'Enter' && !cmdEnter) {
      console.log("Stopping immediate propagation");
      e.preventDefault();
      e.stopImmediatePropagation();
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
      setTimeout(checkForTextarea, 1000); // 1秒後に再チェック
    }
  }

  checkForTextarea();
});
