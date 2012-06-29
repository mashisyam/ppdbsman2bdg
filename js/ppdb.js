/**
 * Sistem Informasi Perkembangan Pendaftaran Penerimaan Peserta Didik Baru 2012
 * Sekolah Menengah Atas (SMA) Negeri 2 Bandung
 * Jalan Cihampelas no. 173 Bandung 40131 - Telp. (022) 2032462
 * 
 * Dikelola oleh Divisi Teknologi Informasi dan Komunikasi - SMA Negeri 2 Bandung
 * Sistem dibuat oleh Muhammad Saiful Islam <muhammad@saiful.web.id>
 */

var utama = './php/',
    koneksi = true,
    versi = '';

function tanggal_indonesia(data) {
	var tahun = data.substr(0,4),
	    bulan = data.substr(5,2),
	    tanggal = data.substr(8,2);
	    
	switch(bulan) {
		case '01': bulan = 'Januari'; break;
		case '02': bulan = 'Februari'; break;
		case '03': bulan = 'Maret'; break;
		case '04': bulan = 'April'; break;
		case '05': bulan = 'Mei'; break;
		case '06': bulan = 'Juni'; break;
		case '07': bulan = 'Juli'; break;
		case '08': bulan = 'Agustus'; break;
		case '09': bulan = 'September'; break;
		case '10': bulan = 'Oktober'; break;
		case '11': bulan = 'November'; break;
		case '12': bulan = 'Desember'; break;
	}
	
	return tanggal + ' ' + bulan + ' ' + tahun;
}
function tanggal_pendaftaran(data) {
	var tanggal = data.substr(8,2);
	
	switch(tanggal) {
		case '25': tanggal = 'Senin'; break;
		case '26': tanggal = 'Selasa'; break;
		case '27': tanggal = 'Rabu'; break;
		case '28': tanggal = 'Kamis'; break;
		case '29': tanggal = 'Jumat'; break;
		case '30': tanggal = 'Sabtu'; break;
	}
	
	return tanggal + ', ';
}

function table_maker(table, array, jenis) {
	var tr = '',
	    o  = '<thead><tr><th width="100">';
	    o += (jenis == 'last' ? 'ID Database' : 'Posisi Global');
	    o += '</th><th width="100">ID Pendaftar</th><th width="300">Nama Lengkap</th><th>Asal Sekolah</th><th width="60">Nilai</th><th width="80">Detil</th></tr></thead><tbody>';
	
	var data = $.parseJSON(array);
	$.each(data, function(k,a) {
		tr =  "<tr onclick=\"javascript:detil('" + a.no_pendaftaran + "')\"";
		tr += (a.asal_pendaftar == '1' ? ' class="luar">' : '>');
		tr += '<td align="center">' + (jenis == 'last' ? (a.id - 1) : a.id) + '</td>';
		tr += '<td align="center">' + a.no_pendaftaran + (a.asal_pendaftar == '1' ? '*' : '') + '</td>';
		tr += '<td>' + a.nama_pendaftar + '</td>';
		tr += '<td>' + a.asal_sekolah + '</td>';
		tr += '<td align="center">' + a.n_total + '</td>';
		tr += '<td align="center">Klik di sini</td>';
		o += tr;
	});
	
	table.html(o + data + '</tbody>');
}
function latest_entries() {
	$('#latest .updating').show();
	
	$.get(utama + 'latest.php', function(data) {
		table_maker($('#latest > table'), data, 'last');
		$('#latest .updating').hide();
	});
}
function panggil_data() {
	var pendaftar_dalam = 0,
	    high_dalam = '0.00',
	    low_dalam = '0.00',
	    pendaftar_luar = 0,
	    high_luar = '0.00',
	    low_luar = '0.00';
	
	$('#data .updating').show();
	
	$.get(utama + 'data.php', function(data) {
		table_maker($('#data > table'), data, 'data');
		$('#data .updating').hide();
		
		var rkp = $.parseJSON(data);
		$.each(rkp, function(k,a) {
			if (a.asal_pendaftar == '0') {
				pendaftar_dalam++;
				high_dalam = (high_dalam == '0.00' ? a.n_total : high_dalam);
				low_dalam = a.n_total;
			} else {
				pendaftar_luar++;
				high_luar = (high_luar == '0.00' ? a.n_total : high_luar);
				low_luar = a.n_total;
			}
		});
		
		$('#rekap tbody tr:first-child').html('<td>' + pendaftar_dalam + '</td><td>' + high_dalam + '</td><td>' + low_dalam + '</td><td>' + pendaftar_luar + '</td><td>' + high_luar + '</td><td>' + low_luar + '</td>');
	});
}
function cek_update() {
	$('#update .updating').show();
	$.get(utama + 'updated.php', function(data) {
		if (data == 'error koneksi') {
			koneksi = false;
			$('#update strong.update_data').html('Koneksi gagal. Mencoba re-connect beberapa saat lagi.');
		} else if ($('#update strong.update_data').html() !== data) {
			koneksi = true;
			
			$('#update strong.update_data').html(data);
			update_ring();
			
			latest_entries();
			panggil_data();
		}
		
		$('#update .updating').hide();
	});
}
function cek_app() {
	$.get('./versi.txt?v=' + new Date().getTime(), function(data) {
		$('#update strong.versi_app').html(data);
		if (versi == '') {
			versi = data;
			//console.log('sama');
		} else {
			//console.log('sudah diset');
			if (versi !== data) {
				//console.log('beda');
				//window.location.reload();
				location.reload(true);
			} else {
				//console.log('sama');
			}
		}
	});
}
function nama_pil_2(data) {
	for (i = 1; i <= 27; i++) {
		if (data == i + 55) {
			return 'SMA NEGERI ' + (data - 55) + ' BANDUNG';
		} else if (data == 83) {
			return 'MA NEGERI 1 BANDUNG';
		} else if (data == 84) {
			return 'MA NEGERI 2 BANDUNG';
		} else if (data == -1) {
			return 'Tidak Memilih';
		}
	}
}
function detil(identifier) {
	$('#popup').fadeIn('slow');
	$('#popup .load_big').show();
	$('#detil table').hide();
	
	var tr = '';
	
	$.get(utama + 'detil.php?id=' + identifier, function(mentah) {
		var data = $.parseJSON(mentah);
		
		tr  = '<tr><th>Nomor Pendaftar</th><td>' + data.no_pendaftaran + '</td></tr>';
		tr += '<tr><th>Tanggal Pendaftaran</th><td>' + tanggal_pendaftaran(data.tanggal_pendaftaran) + tanggal_indonesia(data.tanggal_pendaftaran) + '</td></tr>';
		tr += '<tr><th>Nomor Ujian Nasional</th><td>' + data.no_uan + '</td></tr>';
		tr += '<tr><th>Nama Peserta</th><td>' + data.nama_pendaftar + '</td></tr>';
		tr += '<tr><th>Jenis Kelamin</th><td>' + (data.jenis_kelamin == 'L' ? 'Laki-laki' : 'Perempuan') + '</td></tr>';
		tr += '<tr><th>Tempat, Tanggal Lahir</th><td>' + data.tempat_lahir + ', ' + tanggal_indonesia(data.tanggal_lahir) + '</td></tr>';
		tr += '<tr><th>Asal Daerah</th><td>' + (data.asal_pendaftar == '1' ? 'Luar Kota Bandung' : 'Kota Bandung') + '</td></tr>';
		tr += '<tr><th>Asal Sekolah</th><td>' + data.asal_sekolah + '</td></tr>';
		tr += '<tr><th>Sekolah Pilihan 1</th><td>SMA NEGERI 2 BANDUNG</td></tr>';
		tr += '<tr><th>Sekolah Pilihan 2</th><td>' + nama_pil_2(data.pilihan_2) + '</td></tr>';
		
		$('#detil_pribadi').html(tr);
		
		tr  = '<tr><th>B. Indonesia</th><th>B. Inggris</th><th>Matematika</th><th>IPA</th><th>Total</th></tr>';
		tr += '<tr><td>' + data.n_indonesia + '</td>';
		tr += '<td>' + data.n_inggris + '</td>';
		tr += '<td>' + data.n_matematika + '</td>';
		tr += '<td>' + data.n_ipa + '</td>';
		tr += '<td><strong>' + data.n_total + '</strong></td></tr>';
		
		$('#detil_nilai').html(tr);
		
		tr  = '<tr><th>Posisi di ' + (data.asal_pendaftar == '1' ? 'Luar Kota Bandung' : 'Kota Bandung') + '</th><td><strong>' + data.posisi + '</strong> dari ' + data.count + ' pendaftar.</td></tr>';
		
		$('#detil_posisi').html(tr);
		
		$('#detil table').show();
		$('#popup .load_big').hide();
	});
}
function switchpage(page) {
	for (i = 1; i <= 4; i++) {
		$('#page' + i).fadeOut('slow');
		$('.menupage' + i).removeClass('active');
	}
	$('.menupage' + page).addClass('active');
	setTimeout(function() {
		$('#page' + page).fadeIn('slow');
	}, 500);
}
function update_ring() {
	var sound = document.getElementById('audioupdate');
	if (sound) sound.play();
}

/** All system ready. Run up! */
$(function() {
	/** Initial checks. */
	cek_update();
	cek_app();
	
	/** Update setiap 5 detik * 1.000 ms = 30.000 ms */
	setInterval('cek_update()', 5000);
	setInterval('cek_app()', 5000);
	
	/** Kode untuk close popup. */
	$('#popup .close').click(function() {
		$('#popup').fadeOut('slow');
	});
});
