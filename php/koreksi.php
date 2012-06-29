<?php

include_once('koneksi.php');

header('Cache-Control: no-cache, must-revalidate');

$query = mysql_query('select * from koreksi');

$i = 1;
while ($row = mysql_fetch_assoc($query)) {
	$data[$i] = $row;
	$i++;
}

echo json_encode($data);
