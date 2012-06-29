<?php

include_once('koneksi.php');

header('Cache-Control: no-cache, must-revalidate');

$query = mysql_query('select * from tbl_pendaftaran where no_pendaftaran="' . $_GET['id'] . '" limit 0,1');
$row = mysql_fetch_assoc($query);

$query = mysql_query('select no_pendaftaran from tbl_pendaftaran where asal_pendaftar=' . $row['asal_pendaftar'] . ' order by n_total desc, n_indonesia desc, n_inggris desc, n_matematika desc, n_ipa desc, no_pendaftaran asc');
$i = 1;
while ($row2 = mysql_fetch_assoc($query)) {
	if ($row2['no_pendaftaran'] == $_GET['id']) {
		$row['posisi'] = $i;
	}
	$i++;
}

$row['count'] = $i - 1;

echo json_encode($row);
