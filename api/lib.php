<?php
/*
 * ライブラリ
 *
 */


/**
 * レスポンスを返却する
 *
 * @param bool $status
 * @param mixed $data
 * @return void
 */
function sendResponse(bool $status, mixed $data){
	$result = ['status' => $status];

	if( $status === true ){
		$result['data'] = $data;
	}
	else{
		$result['error'] = $data;
	}

	// 出力
	header('Content-Type: application/json');
	header('Access-Control-Allow-Origin: *');
	echo json_encode($result);
}