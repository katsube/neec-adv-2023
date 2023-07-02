<?php
/**
 * 次のシナリオを返却する
 */

//-----------------------------------------------
// ライブラリ
//-----------------------------------------------
require_once('lib.php');
require_once('list.php');

//-----------------------------------------------
// パラメータを取得
//-----------------------------------------------
// 次のシナリオ
$id = empty($_GET['id'])?  'start' : $_GET['id'];

//-----------------------------------------------
// validation
//-----------------------------------------------
// $idの存在チェック
if( ! array_key_exists($id, $SCENARIO_LIST) ){
	sendResponse(false, 'パラメータが不正です');
	exit;
}
// $idのファイル存在チェック
if( ! file_exists($SCENARIO_LIST[$id]) ){
	sendResponse(false, 'シナリオファイルが存在しません');
	exit;
}

//-----------------------------------------------
// 次のシナリオを返却
//-----------------------------------------------
$result = readScenario($SCENARIO_LIST[$id]);
if( $result !== false ){
	sendResponse(true, $result);
}
else{
	sendResponse(false, 'シナリオファイルの読み込みに失敗しました');
}


/**
 * シナリオを読み込む
 *
 * @param string $file
 * @return string
 */
function readScenario(string $file){
	$result = '';

	$fp = fopen($file, 'r');
	if( $fp === false ){
		return(false);
	}
	while( ($buff = fgets($fp)) !== false ){
		$result .= $buff;
	}
	fclose($fp);

	return( $result );
}