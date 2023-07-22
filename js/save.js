/*
 * セーブ・ロード処理
 * (ページ読み込み時に実行)
 *
 */
window.addEventListener('load', ()=>{
  const data = new SaveData();

  //----------------------------------------
  // セーブボタン押下
  //----------------------------------------
  const saveButton = document.querySelector('#btn-save');
  saveButton.addEventListener('click', ()=>{
    const result = data.save(STATUS);      // グローバル変数STATUSを用意してください
    if( result ){
      alert('セーブに成功しました！');
    }
    else{
      alert('セーブに失敗しました orz');
    }
  });

  //----------------------------------------
  // ロードボタン押下
  //----------------------------------------
  const loadButton = document.querySelector('#btn-load');
  loadButton.addEventListener('click', async ()=>{
    let _load = true;   // ロード中フラグを立てる

    // サーバからデータを取得する
    const result = await data.load();
    if( result === false ){
      alert('ロードに失敗しました orz');
      _load = false;    // ロード中フラグを下ろす
      return(false);
    }

    //----------------------------------------
    // ロードしたデータをSTATUSに上書き
    //----------------------------------------
    STATUS = result;

    //----------------------------------------
    // ロードしたデータを画面に反映
    //----------------------------------------
    // アセットの事前ロード完了時の処理
    window.addEventListener('assetsLoadEnd', () => {    // assetsLoadEndはassets.jsで発火されるカスタムイベント
      console.log('assetsLoadEnd', STATUS);
      // ロード中フラグが立っていなければ何もしない
      if( ! _load ){
        return(false);
      }

      // ゲーム画面にロードしたデータを反映する
      setBgImage(result.bg);                    // 背景をセット
      playBGM(result.bgm);                      // BGMを再生
      setCharactor([1, result.chara1]);         // キャラクター1をセット
      setCharactor([2, result.chara2]);         // キャラクター2をセット
      setCharactor([3, result.chara3]);         // キャラクター3をセット
      setMessage(scenario[result.current][1]);  // メッセージをセット
      playVoice(scenario[result.current][2]);   // ボイスを再生

      // ロード中フラグを下ろす
      _load = false;
    });

    // シナリオのロード ➔ アセットの事前ロード
    loadScenario(result.scenario, result.current);
  });
})


/**
 * セーブデータ クラス
 *
 *  ※注意
 * ・SaveDataクラスはrequest.jsに依存しています。事前にscriptタグで読み込んでください。
 *
 * @class SaveData
 * @example
 *  const data = new SaveData();
 *
 *  // セーブ
 *  const result = await data.save(STATUS);
 *  if( result ){
 *    alert('セーブに成功しました！');
 *  }
 *
 *  // ロード
 *  const result = await data.load();   // セーブIDはlocalStorageから取得
 *  if( result !== false ){
 *    alert('ロードに成功しました！');
 *    return(false);
 *  }
 */
class SaveData{
  //----------------------------------------
  // プロパティ
  //----------------------------------------
  // オブジェクト入れ
  #API = null;

  // セーブID
  #SAVE_ID_KEY = 'saveID';    // localStorageのキー
  #saveID = null;             // セーブID


  /**
   * コンストラクター
   */
  constructor(){
    this.#API = new requestAPI();

    // 保存済みのセーブIDを取得（存在しない場合はnull）
    this.#saveID = this.#getSaveID();
  }

  /**
   * サーバにセーブする
   *
   * @param {object} data
   * @returns {boolean}
   */
  async save(data){
    const saveID = this.#saveID;
    const params = {'data': JSON.stringify({
              name: data.name,      // ユーザー名
          scenario: data.scenario,  // シナリオID
           current: data.current,   // scenario配列の添字
               bgm: data.bgm,       // BGM
            chara1: data.chara1,    // キャラクター画像1
            chara2: data.chara2,    // キャラクター画像2
            chara3: data.chara3,    // キャラクター画像3
                bg: data.bg,        // 背景画像(gamewindow)
            bgbody: data.bgbody     // 背景画像(bodyタグ)
      })
    };

    // localStorageにセーブIDがあれば詰め込む
    if( saveID !== null ){
      params.id = saveID;
    }

    // APIへリクエスト
    const res  = await this.#API.post('./api/save/set.php', params);
    const json = await res.json();
    if(json.status !== true){
      return(false);
    }

    // 新規で保存した場合、セーブIDをlocalStorageに保存
    if( saveID === null ){
      this.#setSaveID(json.data);     // json.dataにはセーブIDが入っている
    }

    return(true);
  }

  /**
   * サーバからデータを取得する
   *
   * @returns {object|boolean} セーブデータ or false
   */
  async load(){
    const saveID = this.#saveID;
    if(saveID === null){
      return(false);
    }

    // APIへリクエスト
    const res = await this.#API.get('./api/save/get.php', {id: saveID});
    const json = await res.json();
    if(json.status !== true){
      return(false);
    }

    return(json.data);
  }

  /**
   * localStorage内のセーブIDを取得
   *
   * @returns {string|null} セーブID
   */
  #getSaveID(){
    const key = this.#SAVE_ID_KEY;
    return localStorage.getItem(key);   // null or string
  }

  /**
   * localStorageにセーブIDを保存
   *
   * @param {string} saveID
   * @throws {Error} localStorageへの保存に失敗した場合
   */
  #setSaveID(saveID){
    const key = this.#SAVE_ID_KEY;
    localStorage.setItem(key, saveID);
  }
}