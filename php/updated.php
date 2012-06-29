<?php

include_once('koneksi.php');

header('Cache-Control: no-cache, must-revalidate');

$query = mysql_query("select * from log order by id desc limit 0,1");
$row = mysql_fetch_assoc($query);
echo $row['timestamp'];
