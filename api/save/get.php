<?php
/**
 * セーブデータを返却する
 *
 *  ■リクエスト
 *  GET /api/save/get.php?id=セーブデータ用ID
 *
 *  ■レスポンス
 *  ・成功時
 *      {"status":true, "data":セーブデータ(JSON)}
 *  ・失敗時
 *      {"status":false, "error":"エラーメッセージ"}
 */

//--------------------------------------------
// ライブラリ
//--------------------------------------------
require_once('../lib.php');
require_once('./saveUtil.php');

//--------------------------------------------
// パラメーターを取得
//--------------------------------------------
$id = empty($_GET['id'])? null:$_GET['id'];

// validation(バリデーション)
if( $id === null || ! validSaveId($id) ){
	sendResponse(false, 'idが未指定です');
	exit();
}

//--------------------------------------------
// ファイルから読み込む
//--------------------------------------------
// ファイル名を決定
$filename = createSaveFileName($id);

// ファイルの存在チェック
if( ! existsSaveId($id) ){
	sendResponse(false, 'データが存在しません');
	exit();
}

// ファイルを読み込む
$fp = fopen($filename, 'r');
if( $fp === false ){
	sendResponse(false, 'ファイルのオープンに失敗しました');
	exit();
}

flock($fp, LOCK_SH);											// ロック
$data = fread($fp, filesize($filename));	// ファイルを読み込む
flock($fp, LOCK_UN);											// ロックを解除
fclose($fp);

// JSONにデコードする
$json = json_decode($data, true);

//--------------------------------------------
// レスポンスを返す
//--------------------------------------------
sendResponse(true, $json);
