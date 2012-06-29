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

$query = mysql_query("select * from log order by id desc limit 0,1");
$row = mysql_fetch_assoc($query);
echo $row['timestamp'];
