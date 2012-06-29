<?php

include_once('koneksi.php');

header('Cache-Control: no-cache, must-revalidate');

$array = array();

$query = mysql_query('select id, no_pendaftaran, nama_pendaftar, asal_pendaftar, asal_sekolah, n_total from tbl_pendaftaran order by id desc limit 0,5');
while ($row = mysql_fetch_assoc($query)) {
	$array[$row['id']] = $row;
}

echo json_encode($array);
