document.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementById('input-button');
  const input = document.getElementById('userInput');
  const todoDiv = document.getElementById('Todo');
  const chatArea = document.getElementById('chat');
  const bgm = document.getElementById('bgm');
  bgm.volume = 0.8;
  bgm.loop = true;

  let isPlaying = false;

  const botList = [
    [
      'こいつ{input}ってよ！',
      'え！？まじで！？',
      'お疲れさまだな',
      'そうだね、今日はもう休みなよ！',
      'うん、頑張ったもんね！',
    ],
    [
      'え、{input}！？',
      '凄いじゃん！尊敬だよ...。',
      '頑張ったね！！',
      'お疲れ様！！',
      '疲れたよな、今日はもう休めよ'
    ],
    [
      '{input}の！？',
      '最高じゃねぇか',
      '今日はもう頑張ったよ',
      'お前の頑張りは俺たちが知ってるからな',
      'お疲れ様！ちゃんと休むんだよ！'
    ],
    [
      '{input}んだってよ！',
      'え？そうなの！？お祝いしないとじゃん',
      'そんなに大事にしなくても...。',
      'それぐらい頑張ったねってことだよ',
      'そうだね、お疲れ様！'
    ],
    [
      'ん？どうしたの？',
      '{input}って言ってるんだよ',
      'よし、じゃあご褒美だな！',
      'うん、とっても頑張ってたもんね',
      'お疲れ様！しっかり休んでね！'
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

      if (!isPlaying) {
        fadeIn(bgm,1000);
        isPlaying = true;
      }


      randomList.forEach((template, index) => {
        const delay = 1700;
        
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
            fadeOut(bgm,1000);
            isPlaying = false;
          }
        }, index * delay + 1000);
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

function fadeIn(audio, duration = 200) {
  if (audio.paused) {
    audio.volume = 0;
    audio.play();
  }
  const step = 0.1;
  const interval = duration / (1 / step);

  const fade = setInterval(() => {
    if (audio.volume < 1) {
      audio.volume = Math.min(audio.volume + step, 1);
    }
    else {
      clearInterval(fade);
    }
  },interval)
}

function fadeOut(audio,duration = 200) {
  const step = 0.1;
  const interval = duration / (1 / step);

  const fade = setInterval(() => {
    if (audio.volume > 0) {
      audio.volume = Math.max(audio.volume - step, 0);
    }else {
      audio.pause();
      audio.currentTime = 0;
      clearInterval(fade);
    }
  },interval);
}