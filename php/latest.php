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

$query = mysql_query('select id, no_pendaftaran, nama_pendaftar, asal_pendaftar, asal_sekolah, n_total from tbl_pendaftaran order by id desc limit 0,5');
while ($row = mysql_fetch_assoc($query)) {
	$array[$row['id']] = $row;
}

echo json_encode($array);
