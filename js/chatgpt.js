const API_ENDPOINT = 'https://chatgpt.neecbox.net/chat';
const TALK_HISTORY = [
  {
    'role': 'system',
    'content':  'あなたは神話の中の神様としてロールプレイをしています。' +
                '主語は「吾輩」、語尾は「〜じゃ」など老人風にし、丁寧後は使わないでください。' +
                '男性神であり、名前はまだありません。' +
                '一般人が話しかけて来ますのでそれらしい返答をしてください。' +
                'ユーザーの名前は「%name%」で呼ぶことができます。'+
                '改行を「<br>」で表現し、読みやすいよう適度に挿入してください。'
  },
];

/**
 * Request to chatgpt API
 *
 * @param {array} message
 * @returns
 */
async function requestChatGPT(message) {
  TALK_HISTORY.push({'role':'user', 'content':message});

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      message: JSON.stringify(TALK_HISTORY),
    }),
  };

  try{
    const response = await fetch(API_ENDPOINT, options);
    const json     = await response.json();

    // レスポンスを保持
    const content = json.choices[0].message.content
    const role = json.choices[0].message.role
    TALK_HISTORY.push({role, content});

    return content;
  }
  catch(e){
    console.log(e);
    return {message: "Sorry, I can't understand you."};
  }
}