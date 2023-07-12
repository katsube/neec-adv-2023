<?php
/*
 * 共通処理ライブラリ
 *
 */

//--------------------------------------------
// 全体
//--------------------------------------------

/**
 * レスポンスを返却する
 *
 * @param boolean $status		ステータス(true:成功, false:失敗)
 * @param mixed		$data			データ
 * @return void
 */
function sendResponse($status, $data){
	$result = ['status' => $status];
	if( $status ){
		$result['data'] = $data;
	}
	else{
		$result['error'] = $data;
	}

	header('Content-type: application/json');		// MIMEタイプ
	header('Cache-Control: no-cache');					// ブラウザなどにキャッシュさせない
	header('Access-Control-Allow-Origin: *');		// クロスドメイン対応
	echo json_encode($result);
}
