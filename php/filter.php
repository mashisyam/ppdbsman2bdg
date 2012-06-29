<?php

include_once('koneksi.php');

header('Cache-Control: no-cache, must-revalidate');

$array = array();

$query2  = 'select id, no_pendaftaran, nama_pendaftar, asal_pendaftar, asal_sekolah, n_total from tbl_pendaftaran where ';
if ($_GET['kriteria'] == 'nama_pendaftar') {
	$query2 .= $_GET['kriteria'] . ' like "%' . $_GET['value'] . '%"';
} else {
	$query2 .= $_GET['kriteria'] . '="' . $_GET['value'] . '"';
}
$query2 .= ' order by n_total desc, n_indonesia desc, n_inggris desc, n_matematika desc, n_ipa desc, no_pendaftaran asc';

$query = mysql_query($query2);
$i = 1;
while ($row = mysql_fetch_assoc($query)) {
	$row['id'] = $i;
	$array[$i] = $row;
	$i++;
}

echo json_encode($array);
