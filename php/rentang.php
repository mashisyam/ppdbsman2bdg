<?php

include_once('koneksi.php');

header('Cache-Control: no-cache, must-revalidate');

$array = array();

$query = mysql_query('select id, no_pendaftaran, nama_pendaftar, asal_pendaftar, asal_sekolah, n_total from tbl_pendaftaran where n_total>=' . $_GET['awal'] . ' and n_total<=' . $_GET['akhir'] . ' order by n_total desc, n_indonesia desc, n_inggris desc, n_matematika desc, n_ipa desc, no_pendaftaran asc');
$i = 1;
while ($row = mysql_fetch_assoc($query)) {
	$row['id'] = $i;
	$array[$i] = $row;
	$i++;
}

echo json_encode($array);
