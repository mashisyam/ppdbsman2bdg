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
$array['tertinggi_dk'] = 0.00;
$array['tertinggi_lk'] = 0.00;
$array['pendaftar_dk'] = 0;
$array['pendaftar_lk'] = 0;

$query = mysql_query('select * from tbl_pendaftaran order by n_total desc, n_indonesia desc, n_inggris desc, n_matematika desc, n_ipa desc, no_pendaftaran asc');
$i = 1;
while ($row = mysql_fetch_assoc($query)) {
	if ($row['asal_pendaftar'] == '0') {
		if ($array['tertinggi_dk'] == 0.00) $array['tertinggi_dk'] = $row['n_total'];
		$array['terendah_dk'] = $row['n_total'];
		$array['pendaftar_dk']++;
	} else {
		if ($array['tertinggi_lk'] == 0.00) $array['tertinggi_lk'] = $row['n_total'];
		$array['terendah_lk'] = $row['n_total'];
		$array['pendaftar_lk']++;
	}
}

echo json_encode($array);
