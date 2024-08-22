document.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementById('input-button');
  const input = document.getElementById('userInput');
  const todoDiv = document.getElementById('Todo');
  const chatArea = document.getElementById('chat');

  const botList = [
    [
      'こいつ{input}らしいぞ！',
      'え！？まじかよ',
      'お疲れさまだな',
      'そうだな、今日はもう休めよ！',
      'うん、頑張ったもんな！',
    ],
    [
      'え、{input}！？',
      'まじかよ！？',
      '頑張ったな！！',
      'お疲れ様！！',
      '疲れたよな、もう休めよ'
    ],
    [
      '{input}の！？',
      '最高じゃねぇか',
      '今日はもう頑張ったよ',
      'お前の頑張りは俺たちが知ってるからな',
      'お疲れ様！'
    ]
  ];

  const icons = ['🎤','🎸','🥁','🎹','⚡'];
  let shuffledIcons = shuffleArray([...icons]);

  function shuffleArray(array) {
    for (let i = array.length -1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  
  function RandomIcon() {
    if (shuffledIcons.length === 0) {
      shuffledIcons = shuffleArray([...icons]);
    }
    return shuffledIcons.pop();
  } 
  
  function RandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++){
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  
  function RandomDelay() {
    return Math.floor(Math.random() * 1000) + 500;
  }

  function FixedPraise(input, index, list) {
    return list[index % list.length].replace('{input}', input);
  }

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

      const randomList = botList[Math.floor(Math.random() * botList.length)];

      let cumulativeDelay = 0;

      randomList.forEach((template, index) => {
        const delay = RandomDelay();
        cumulativeDelay += delay;

        setTimeout(() => {
          setTimeout(() => {
            const botMessage = document.createElement('div');
            botMessage.classList.add('todo-item','bot-message');

            const icon = document.createElement('div');
            icon.classList.add('icon');
            icon.style.backgroundColor = RandomColor();
            icon.textContent = RandomIcon();
            botMessage.appendChild(icon);

            const botMessageContent = document.createElement('div');
            botMessageContent.classList.add('message','bot');
            botMessageContent.textContent = FixedPraise(userInput,index,randomList);
            botMessage.appendChild(botMessageContent);

            todoDiv.appendChild(botMessage);

            scrollToBottom(chatArea);

            if (index === randomList.length -1) {
              button.disabled = false;
            }
          },1000);
          
        }, cumulativeDelay);
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
});
