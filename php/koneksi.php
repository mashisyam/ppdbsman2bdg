<?php

ini_set( "display_errors", 1);

//if (!mysql_connect('192.168.100.128:4545', 'root', 'adminppdb')) {
if (!mysql_connect('localhost', 'root', '')) {
	die('error koneksi');
}
mysql_select_db('ppdb2012') or die('Database gagal.');
