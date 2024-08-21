document.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementById('input-button');
  const input = document.getElementById('userInput');
  const todoDiv = document.getElementById('Todo');
  const chatArea = document.getElementById('chat');

  const botReplies = [
    'すごいですね！',
    '素晴らしいです！',
    '頑張りましたね！',
    'その調子です！',
    '感動しました！',
    'すごい成果です！',
    '続けて頑張ってください！',
    'あなたは素晴らしい！',
    'この調子でいきましょう！',
    'あなたの努力が実ります！',
  ];

  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  function getRandomIcon() {
    const icons = ['🤖', '💬', '🎉', '🚀', '🧠'];
    return icons[Math.floor(Math.random() * icons.length)];
  }

  button.addEventListener('click', () => {
    const userInput = input.value.trim();

    if (userInput) {
      // ボタンを無効に
      button.disabled = true;

      // ユーザーのメッセージを作成
      const userMessage = document.createElement('div');
      userMessage.classList.add('todo-item', 'user-message');

      const userMessageContent = document.createElement('div');
      userMessageContent.classList.add('message', 'user');
      userMessageContent.textContent = userInput;
      userMessage.appendChild(userMessageContent);

      // チャットエリアの最後にユーザーのメッセージを追加
      todoDiv.appendChild(userMessage);

      // チャットエリアを一番下までスクロール
      scrollToBottom(chatArea);

      // ボットのメッセージをランダムに選択して5つ表示
      const shuffledReplies = botReplies
        .sort(() => Math.random() - 0.5)
        .slice(0, 5); // 5つを選択

      shuffledReplies.forEach((reply, index) => {
        setTimeout(() => {
          const botMessage = document.createElement('div');
          botMessage.classList.add('todo-item', 'bot-message');

          // アイコンを作成
          const icon = document.createElement('div');
          icon.classList.add('icon');
          icon.style.backgroundColor = getRandomColor();
          icon.textContent = getRandomIcon();
          botMessage.appendChild(icon);

          // ボットメッセージを作成
          const botMessageContent = document.createElement('div');
          botMessageContent.classList.add('message', 'bot');
          botMessageContent.textContent = reply;
          botMessage.appendChild(botMessageContent);

          // ユーザーのメッセージの次にボットのメッセージを追加
          todoDiv.appendChild(botMessage);

          // 新しいメッセージが追加された後にスクロール
          scrollToBottom(chatArea);

          // 最後のボットメッセージの後にボタンを再度有効に
          if (index === shuffledReplies.length - 1) {
            button.disabled = false; // ボタンを有効に
          }
        }, 2000 * (index + 1)); // 2秒間隔で返信
      });

      // 入力フィールドをクリア
      input.value = '';
    }
  });

  function scrollToBottom(element) {
    setTimeout(() => {
      element.scrollTop = element.scrollHeight;
    }, 100); // スクロールを少し遅らせることでDOMの更新を待つ
  }
});
