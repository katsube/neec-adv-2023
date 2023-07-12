<?php

require_once('lib.php');

//--------------------------------------------
// ファイルの定義
//--------------------------------------------
$list = [
  'part2' => '../js/scenario2.js',
  'part3' => '../js/scenario3.js'
];

//--------------------------------------------
// パラメーターを取得
//--------------------------------------------
$id = empty($_GET['id'])? null:$_GET['id'];

// validation(バリデーション)
if( $id === null ){
	sendResponse(false, 'idが未指定です');
	exit();
}
if( ! array_key_exists($id, $list) ){
	sendResponse(false, 'idが存在しません');
	exit();
}

//--------------------------------------------
// ファイルを読み込み
//--------------------------------------------
$data = '';
$fp = fopen($list[$id], 'r');
while( ($buff = fgets($fp)) !== false ){
	$data .= $buff;
}
fclose($fp);

//--------------------------------------------
// JSON形式で返却する
//--------------------------------------------
$json = json_decode($data);
sendResponse(true, $json);
