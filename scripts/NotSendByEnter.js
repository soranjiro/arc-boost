// 日本語入力確定のEnterでチャットを送信しないようにする
document.addEventListener('DOMContentLoaded', () => {
  console.log("running boost...");

  // XPathで要素を取得する関数
  function getElementByXPath(xpath) {
    const result = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
    return result.singleNodeValue;
  }

  // 質問するテキストエリアをXPathで指定（XPathはNotebooklm）
  const xpath = '/html/body/labs-tailwind-root/div/notebook/div/div[2]/div/div/div[2]/chat-layout/div/omnibar/div/div[2]/div[2]/query-box/div/div/form/textarea';

  function handleKeydown(e, cmdEnter) {
    console.log("Keydown event detected:", e);

    // 押されたキーがCmd + Enterだった場合のみ
    if (e.key === 'Enter' && e.metaKey) {
      console.log("Cmd + Enter detected");
      cmdEnter.value = true;
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
      cmdEnter.value = false;
      return;
    }

    // それ以外の場合はイベントの伝播を中止する(日本語の確定は行われる)
    if (e.key === 'Enter' && !cmdEnter.value) {
      console.log("Stopping immediate propagation");
      e.preventDefault();
      e.stopImmediatePropagation();
    }
  }

  function checkForTextarea() {
    const textarea = getElementByXPath(xpath);
    if (textarea) {
      console.log("Textarea found:", textarea);
      console.log("Textarea content:", textarea.value);

      const cmdEnter = { value: false };

      // そのエリア内でのキーダウン(キーの入力)のイベントを検知
      textarea.addEventListener('keydown', (e) => handleKeydown(e, cmdEnter), true); // capture フェーズでイベントリスナーを設定
    } else {
      console.error("Textarea not found. XPath:", xpath);
      setTimeout(checkForTextarea, 1000); // 1秒後に再チェック
    }
  }

  checkForTextarea();
});
