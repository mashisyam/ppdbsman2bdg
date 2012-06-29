<?php

/**
 * Sistem Informasi Perkembangan Pendaftaran Penerimaan Peserta Didik Baru 2012
 * Sekolah Menengah Atas (SMA) Negeri 2 Bandung
 * Jalan Cihampelas no. 173 Bandung 40131 - Telp. (022) 2032462
 * 
 * Dikelola oleh Divisi Teknologi Informasi dan Komunikasi - SMA Negeri 2 Bandung
 * Sistem dibuat oleh Muhammad Saiful Islam <muhammad@saiful.web.id>
 */

include_once('koneksi.php');

header('Cache-Control: no-cache, must-revalidate');
//header('Content-Type: application/json');

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
