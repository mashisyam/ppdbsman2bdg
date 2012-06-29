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

$array = array();

$query = mysql_query('select id, no_pendaftaran, nama_pendaftar, asal_pendaftar, asal_sekolah, n_total from tbl_pendaftaran order by n_total desc, n_indonesia desc, n_inggris desc, n_matematika desc, n_ipa desc, no_pendaftaran asc');
$i = 1;
while ($row = mysql_fetch_assoc($query)) {
	$row['id'] = $i;
	$array[$i] = $row;
	$i++;
}

echo json_encode($array);
