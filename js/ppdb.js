/**
 * Sistem Informasi Perkembangan Pendaftaran Penerimaan Peserta Didik Baru 2012
 * Sekolah Menengah Atas (SMA) Negeri 2 Bandung
 * Jalan Cihampelas no. 173 Bandung 40131 - Telp. (022) 2032462
 * 
 * Dikelola oleh Divisi Teknologi Informasi dan Komunikasi - SMA Negeri 2 Bandung
 * Sistem dibuat oleh Muhammad Saiful Islam <muhammad@saiful.web.id>
 */

var utama = './php/',
    filter_pil2 = '',
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
	    o += (jenis == 'last' ? 'ID Database' : (jenis == 'filter' ? 'Nomor' : 'Posisi Global'));
	    o += '</th><th width="100">ID Pendaftar</th><th width="300">Nama Lengkap</th><th>Asal Sekolah</th><th width="60">Nilai</th><th width="80">Detil</th></tr></thead><tbody>';
	
	if (array == '[]') {
		o += '<tr><td align="center" colspan="6" style="cursor: auto; ">Tidak ada data.</td></tr>';
	} else {
		var data = $.parseJSON(array);
		
		if (jenis == 'last') data.sort(function(a,b) { return b.id - a.id });
		
		$.each(data, function(k,a) {
			tr =  "<tr onclick=\"javascript:detil('" + a.no_pendaftaran + "')\"";
			tr += (a.asal_pendaftar == '1' ? ' class="luar">' : '>');
			tr += '<td align="center">' + (jenis == 'last' ? (a.id - 1) : a.id) + '</td>';
			tr += '<td align="center">' + a.no_pendaftaran + (a.asal_pendaftar == '1' ? '' : '') + '</td>';
			tr += '<td>' + a.nama_pendaftar + '</td>';
			tr += '<td>' + a.asal_sekolah + '</td>';
			tr += '<td align="center">' + a.n_total + '</td>';
			tr += '<td align="center">Klik di sini</td>';
			o += tr;
		});
	}
	
	table.html(o + data + '</tbody>');
}
function pilihan_kedua() {
	$('#pilihankedua .updating').show();
	
	$.get(utama + 'pilihan_2.php', function(data) {
		var array = $.parseJSON(data), tr = '', o = '';
		
		$.each(array, function(k,a) {
			tr  = "<tr onclick=\"javascript:detil_pil_2('" + a.pilihan_2 + "')\">";
			tr += '<td align="center">' + nama_pil_2(a.pilihan_2) + '</td><td align="center"><strong>' + a.total + ' orang</strong></td></tr>';
			o += tr;
		});
		
		$('#pilihankedua tbody').html(o);
		$('#pilihankedua .updating').hide();
	});
}
function koreksi() {
	$('#koreksi .updating').show();
	
	$.get(utama + 'koreksi.php', function(data) {
		var array = $.parseJSON(data), tr = '', o = '', i = 0;
		
		$.each(array, function(k,a) {
			tr  = "<tr>";
			tr += '<td align="center">' + a.id + '</td><td align="center">' + a.date + '</td><td>' + a.keterangan + '</td><td>' + a.editor + '</td></tr>';
			o += tr;
			i++;
		});
		
		$('#koreksi tbody').html(o);
		$('#count_koreksi').html(i);
		$('#koreksi .updating').hide();
	});
}
function latest_entries() {
	$('#latest .updating').show();
	
	$.get(utama + 'latest.php', function(data) {
		table_maker($('#latest > table'), data, 'last');
		$('#latest .updating').hide();
	});
}
function filter(kriteria, penentu, holder_isi, holder_update, holder_penentu) {
	if (holder_update !== '') holder_update.show();
	
	var holder_penentu_value = (kriteria == 'pilihan_2' ? nama_pil_2(penentu) : penentu);
	if (holder_penentu !== '') holder_penentu.html(holder_penentu_value);
	
	$.get(utama + 'filter.php?kriteria=' + kriteria + '&value=' + penentu, function(data) {
		table_maker(holder_isi, data, 'filter');
		if (holder_update !== '') holder_update.hide();
	});
}
function detil_pil_2(sekolah) {
	$('#detilkedua').fadeIn('slow');
	filter_pil2 = sekolah;
	filter('pilihan_2', sekolah, $('#detilkedua table'), $('#detilkedua .updating'), $('#detilkedua h2 strong'));
}
function rentang(awal, akhir) {
	$('#rentang .updating').show();
	
	$.get(utama + 'rentang.php?awal=' + awal + '&akhir=' + akhir, function(data) {
		var i = 0;
		
		table_maker($('#rentang table'), data, 'filter');
		
		var hitung = $.parseJSON(data);
		$.each(hitung, function(k,a) { i++; });
		$('#hasil_count_rentang').html('Ada ' + i + ' orang dengan rentang NEM di atas.');
		
		$('#rentang .updating').hide();
	});
}
function cari_nama(nama) {
	filter('nama_pendaftar', nama, $('#cari_nama table'), $('#findnama .updating'), '');
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
			$('#update strong.update_data').html('Koneksi gagal. Reconnecting...');
		} else if ($('#update strong.update_data').html() !== data) {
			$('#update strong.update_data').html(data);
			update_ring();
			
			latest_entries();
			panggil_data();
			pilihan_kedua();
			koreksi();
			if (filter_pil2 !== '') detil_pil_2(filter_pil2);
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
	$('#popup .updating').show();
	
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
		
		$('#popup .updating').hide();
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
	
	$('#cari_nomor .nomor_pendaftaran').mask('999-9999');
	$('#cari_nem input[type="text"]').mask('99.99');
	
	/** Kode untuk close popup. */
	$('#popup .close').click(function() {
		$('#popup').fadeOut('slow');
	});
	
	$('#cari_nomor').submit(function() {
		detil($('#cari_nomor .nomor_pendaftaran').val());
		return false;
	});
	$('#cari_nem').submit(function() {
		rentang($('#cari_nem .nem_awal').val(), $('#cari_nem .nem_akhir').val());
		return false;
	});
	$('#cari_nama').submit(function() {
		cari_nama($('#cari_nama .nama_pendaftar').val());
		return false;
	});
});
