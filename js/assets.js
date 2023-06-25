window.addEventListener('load', () => {
  const assets = {};

  //--------------------------------------------------
  // 対象ファイルをリストアップ
  //--------------------------------------------------
  // シナリオから自動的にリストアップ
  for(let i=0; i<scenario.length; i++){
    switch(scenario[i][0]){
      case 'SERIF':
        if( scenario[i][2] !== undefined || scenario[i][2] !== null ){
          assets[`audio/voice/${scenario[i][2]}`] = 'sound';
        }
        break;
      case 'BG':
        assets[`image/back/${scenario[i][1]}`] = 'image';
        break;
      case 'BGM':
        assets[`audio/bgm/${scenario[i][1]}`] = 'sound';
        break;
    }
  }

  //--------------------------------------------------
  // 監視タイマーをスタート
  //--------------------------------------------------
  ASSETS['_loadTotal'] = Object.keys(assets).length;    // ロードするファイルの数
  ASSETS['_loaded'] = 0;                                // ロード済みのファイル数

  // ロード完了を監視
  const timer = setInterval(() => {
    if( ASSETS['_loadTotal'] === ASSETS['_loaded'] ){
      clearInterval(timer);           // タイマーを止める
      delete ASSETS['_loadTotal'];   // お掃除
      delete ASSETS['_loaded'];      // お掃除

      // ゲーム開始
      finishLoading();
    }
  }, 500);  // 0.5秒ごとにチェック

  //--------------------------------------------------
  // リストアップしたファイルをロード
  //--------------------------------------------------
  for(let key in assets){
    switch(assets[key]){
      case 'image':
        loadImage(key);
        break;
      case 'sound':
        loadSound(key);
        break;
    }
  }
});

/**
 * 画像をロードする
 *
 * @param {string} url
 */
function loadImage(url){
  const image = new Image();

  // ロード完了時
  image.addEventListener('load', () => {
    ASSETS[url] = image;
    ASSETS['_loaded']++;
  });
  // ロード失敗時
  image.addEventListener('error', () => {
    alert('画像のロードに失敗しました。直前のページに戻ります。');
    history.back();
  });

  // ロード開始
  image.src = url;
}

/**
 * 音声ファイルをロードする
 *
 * @param {string} url
 */
function loadSound(url){
  const audio = new Audio();

  // ロード完了時
  audio.addEventListener('canplaythrough', () => {   // すべて読み込むわけではないので注意
    ASSETS[url] = audio;
    ASSETS['_loaded']++;
  });
  // ロード失敗時
  audio.addEventListener('error', () => {
    alert('音声ファイルのロードに失敗しました。直前のページに戻ります。');
    history.back();
  });

  // ロード開始
  audio.src = url;
}

/**
 * ゲーム開始
 *
 */
function finishLoading(){
  // ロード画面を非表示
  const nowloading = document.querySelector('#nowloading');
  nowloading.style.display = 'none';

  // ゲーム画面を表示
  const game = document.querySelector('#gamewindow');
  game.style.display = 'block';
}