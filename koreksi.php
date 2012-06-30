<?php

include_once('./php/koneksi.php');

if (isset($_POST['submit'])) {
	if ($_POST['password'] == 'Ch@rets173') {
		$query = mysql_query("insert into koreksi (keterangan, editor) values ('" . mysql_escape_string($_POST['keterangan']) . "', '" . mysql_escape_string($_POST['editor']) . "')");
		if ($query) { echo "kueri berhasil"; } else { echo "gagal"; }
	} else { echo "salah pass"; }
}

?>

<h2>Input koreksi data</h2>
<form action="koreksi.php" method="post">
	<table border="0">
		<tr>
			<td>Keterangan:</td>
			<td><input type="text" name="keterangan"  style="width: 700px;" /></td>
		</tr>
		<tr>
			<td>Editor:</td>
			<td><input type="text" name="editor" maxlength="11" /></td>
		</tr>
		<tr>
			<td>Password:</td>
			<td><input type="password" name="password" /></td>
		</tr>
		<tr>
			<td></td><td><input type="submit" name="submit" value="kirim" /></td>
		</tr>
	</table>
</form>
