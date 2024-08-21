document.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementById('input-button');
  const input = document.getElementById('userInput');
  const todoDiv = document.getElementById('Todo');
  const chatArea = document.getElementById('chat');

  const botReplies = [
    '頑張ったね！','さすがだね','えらいよ！','いつもありがとう','お疲れ様！','すごいね！','大変だったね','仕事が早い！！','え！もうできたの！？','よくできてるね！',
  ];

  function SendMessage() {
    const userInput = input.value.trim();

    if (userInput) {
      button.disabled = true;

      const userMessage = document.createElement('div');
      userMessage.classList.add('todo-item', 'user-message');

      const userMessageContent = document.createElement('div');
      userMessageContent.classList.add('message','user');
      userMessageContent.textContent = userInput;
      userMessage.appendChild(userMessageContent);
      
      todoDiv.appendChild(userMessage);

      scrollToBottom(chatArea);

      const shuffledReplies = botReplies.sort(() => Math.random() - 0.5).slice(0,9);
      
      shuffledReplies.forEach((reply, index) => {
        setTimeout(() => {
          const botMessage = document.createElement('div');
          botMessage.classList.add('todo-item','bot-message');

          const botMessageContent = document.createElement('div');
          botMessageContent.classList.add('message','bot');
          botMessageContent.textContent = reply;
          botMessage.appendChild(botMessageContent);

          todoDiv.appendChild(botMessage);

          scrollToBottom(chatArea);

          if (index === shuffledReplies.length -1) {
            button.disabled = false;
          }
        }, 100 * (index +1));
      });

      input.value = '';
    }
  }

  function scrollToBottom(element) {
    setTimeout(() => {
      element.scrollTop = element.scrollHeight;
    },100);
  }

  button.addEventListener('click',SendMessage);

  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      SendMessage();
    }
  })
});