<?php
/**
 * セーブ・ロードの共通処理
 *
 */


/**
 * セーブデータ用のIDを作成する
 *
 * @return string
 */
function createSaveId(){
	$count = 0;

	do{
		// 'savee106c002acf64d7a9ccabd893e6bdac483a4b790' のような文字列を作成
		$id =  sprintf('save%s', sha1(uniqid()));

		// 10回以上ループしたら例外を返す
		if(++$count >= 10){
			throw new Exception('セーブデータ用IDの作成に失敗しました');
		}
	}
	while( existsSaveId($id) );		// 既にファイルが存在している場合は、もう一度作り直す

	return $id;
}

/**
 * セーブデータ用IDが存在するか
 *
 * @param string $id
 * @return boolean
 */
function existsSaveId($id){
	$filename = createSaveFileName($id);
	return file_exists($filename);
}

/**
 * セーブデータ用のファイル名を作成する
 *
 * @param string $id  savefc78d651e14c116ba4e16daaf5495e1f35a87c2a
 * @return string
 */
function createSaveFileName($id){
	return sprintf('./data/%s.json', $id);
}

/**
 * セーブデータ用IDのバリデーション
 *
 * @param string $id
 * @return boolean
 */
function validSaveId($id){
	return(
		($id === null)
		||
		(
			(is_string($id))
			&& (preg_match('/^save[a-f0-9]{40}$/', $id) === 1)
		)
	);
}

/**
 * セーブデータのバリデーション
 *
 * @param string $data
 * @return boolean
 */
function validSaveData($data){
	if( $data === null || ! is_string($data)){
		return false;
	}
	$json = json_decode($data, true);

	return(
		($json !== null)													// json_decode()は失敗するとnullを返す

		// 連想配列内にキーが存在しているか
		&& (array_key_exists('name',     $json)) 	// $jsonにキーnameが存在しているか
		&& (array_key_exists('scenario', $json)) 	// $jsonにキーscenarioが存在しているか
		&& (array_key_exists('current',  $json)) 	// $jsonにキーcurrentが存在しているか
		&& (array_key_exists('bgm',      $json)) 	// $jsonにキーbgmが存在しているか
		&& (array_key_exists('chara1',   $json)) 	// $jsonにキーchara1が存在しているか
		&& (array_key_exists('chara2',   $json)) 	// $jsonにキーchara2が存在しているか
		&& (array_key_exists('chara3',   $json)) 	// $jsonにキーchara3が存在しているか
		&& (array_key_exists('bg',       $json)) 	// $jsonにキーbgが存在しているか
		&& (array_key_exists('bgbody',   $json)) 	// $jsonにキーbgbodyが存在しているか

		// 値のチェック
		&& (is_null($json['name']) || is_string($json['name']))				// $json['name']がnullか文字列か
		&& (is_string($json['scenario']))															// $json['scenario']が文字列か
		&& (is_int($json['current']))																	// $json['current']が数値か(文字列の数字はダメ)
		&& (is_null($json['bgm'])    || is_string($json['bgm']))			// $json['bgm']がnullか文字列か
		&& (is_null($json['chara1']) || is_string($json['chara1']))		// $json['chara1']がnullか文字列か
		&& (is_null($json['chara2']) || is_string($json['chara2']))		// $json['chara2']がnullか文字列か
		&& (is_null($json['chara3']) || is_string($json['chara3']))		// $json['chara3']がnullか文字列か
		&& (is_null($json['bg'])     || is_string($json['bg']))				// $json['bg']がnullか文字列か
		&& (is_null($json['bgbody']) || is_string($json['bgbody']))		// $json['bgbody']がnullか文字列か
	);
}