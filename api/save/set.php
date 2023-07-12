<?php
/**
 * セーブデータを保存する
 *
 *  ■リクエスト
 *  POST /api/save/set.php
 *  id=セーブデータ用ID&data=セーブデータ(JSON)
 *
 *  ■レスポンス
 *  ・成功時
 *      {"status":true, "id":"保存されたセーブデータ用ID"}
 *  ・失敗時
 * 	    {"status":false, "error":"エラーメッセージ"}
 */

//--------------------------------------------
// ライブラリ
//--------------------------------------------
require_once('../lib.php');
require_once('./saveUtil.php');

//--------------------------------------------
// パラメーターを取得
//--------------------------------------------
$id   = empty($_POST['id'])? null:$_POST['id'];
$data = empty($_POST['data'])? null:$_POST['data'];

//--------------------------
// validation
//--------------------------
// id
if( ($id !== null) && ! validSaveId($id) ){		// nullの場合は新規に作成する
	sendResponse(false, 'idに利用できない文字が含まれています');
	exit();
}
// data(セーブデータ)
if( ($data === null) || ! validSaveData($data) ){
	sendResponse(false, 'dataが未指定か不正な値です');
	exit();
}

//--------------------------------------------
// idの有無によって処理を分岐する
//--------------------------------------------
// 未指定の場合は新規に作成
if( $id === null ){
	try{
		$id = createSaveId();	// 新規にIDを作成
	}
	catch(Exception $e){		// 生成時に例外(エラー)が発生した場合はエラー終了
		sendResponse(false, $e->getMessage());
		exit();
	}
}
// IDが存在しない場合はエラー終了
else if( ! existsSaveId($id) ){
	sendResponse(false, 'データが存在しません');	// セキュリティ上、このエラーメッセージ/仕様はやめた方が良い(総当り攻撃に利用される)
	exit();
}

//--------------------------------------------
// ファイルに保存する
//--------------------------------------------
// ファイル名を決定
$filename = createSaveFileName($id);

// ファイルに保存
$fp = fopen($filename, 'a+');
if( $fp === false ){
	sendResponse(false, 'ファイルのオープンに失敗しました');
	exit();
}

flock($fp, LOCK_EX);		// ロック
ftruncate($fp, 0);			// ファイルを真っ白にする
fseek($fp, 0);					// ファイルポインタを先頭に戻す
fwrite($fp, $data);			// ファイルに書き込む
flock($fp, LOCK_UN);		// ロックを解除
fclose($fp);

//--------------------------------------------
// レスポンスを返す
//--------------------------------------------
sendResponse(true, $id);
