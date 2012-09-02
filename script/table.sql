
-- daftar skpd/unit
create table units(
	un_id	serial,
	un_kode	varchar(30),
	un_nama	varchar(80),
	un_lvl	integer,
	un_akronim	varchar(50),
	un_alamat varchar(250),
	un_telp	varchar(60),
	un_type	varchar(5),
	constraint  units_pk primary key (un_id)
);
create index  units_idx0 on units(un_kode);
/* master program
 * 
 */
create table programs (
	prog_id		serial,
	prog_kode	varchar(30),
	prog_nourut	varchar(10),
	prog_nama	varchar(150),
	un_kode	varchar(30),
	
	constraint program_pk primary key(prog_id);
);
create index programs_idx on programs(prog_kode);


/* master kegiatan
 * 
 */
create table kegiatans(
	keg_id		serial,
	keg_kode	varchar(30),
	prog_kode	varchar(30),
	keg_nourut	varchar(10),
	keg_nama	varchar(150),
	keg_level	varchar(20),
	keg_type	varchar(20),
	constraint kegiatan_pk primary key (keg_id)
	
);
create index kegiatans_idx0 on kegiatans(keg_kode);
create index kegiatans_idx1 on kegiatans(prog_kode);
/*  permohonan spd
 * spdper => SPD Permohonan
 * _benda=bendahara pengeluaran
 
 */
create table spdper_masters(
	spdm_id			serial,
	spdm_no			varchar(50),
	spdm_tgl		date,
	un_kode			varchar(30),
	spdm_benda		varchar(30),
	spdm_ppkd		varchar(30),
	spdm_uraian		varchar(500),
   	spdm_total		numeric(24,2) default 0,
    spdm_angg		numeric(24,2) default 0,
	constraint spd_master_pk primary key(spdm_id)
	

);
create index spdper_masters_idx0 on spdper_masters(spdm_id);
create index spdper_masters_idx1 on spdper_masters(un_kode);

-- detail 1 daftar dpa-kegiatan
/*
 * _bln1 = untuk kebutuhan dari bulan 1 s/d bulan 2
 * _bln2= sda
 * _akum= akumulasi SPD sebelumnya
 * _sisa=sisa akumulasi SPD
 * _total=total nilai yg di SPD kan melalui transaksi ini
 * _sisa=sisa nilai anggaran yg sekarang 
*/
create table spdper_detail1s(
	spdd_id			serial,
	spdm_id			integer,
	dpa_no			varchar(50),
	 
	spdd_angg		numeric(24,2) default 0,
	spdd_akum		numeric(24,2) default 0,
	spdd_total		numeric(24,2) default 0,
	spmd_sisa	numeric(24,2) default 0,
	spdm_bln1		integer default 1,
	spdm_bln2		integer default 2,

	constraint spdper_detail1s_pk primary key(spdd_id),
	constraint spdper_detail1s_fk1 foreign key (spdm_id) references spdper_masters(spdm_id) on delete cascade 
);
 
--detail2 daftar rekening  
create table spdper_detail2s(
	spdd_id			serial,
	spdm_id			integer,
	dpa_no			varchar(50),
	akun_kode		varchar(50),
	spdd_angg		numeric(24,2) default 0,
	spdd_akum		numeric(24,2) default 0,
	spdd_nilai		numeric(24,2) default 0,
 	spdd_sisa		numeric(24,2) default 0,
	constraint spdper_detail2s_pk primary key(spdd_id),
	constraint spdper_detail2s_fk1 foreign key (spdm_id) references spdper_masters(spdm_id) on delete cascade 
);

/*
 * SPD
 * penjelasan
 * _benda=bendahara pengeluaran
 * _noper=transaksi selalu berdasarkan nomor permohonan
   
 * spd_app-> di approve atau tidak
**/

create table spds(
	spd_id			serial,
	spd_no			varchar(50),
	spd_noper		varchar(50),
	spd_tgl			date,
	un_kode			varchar(30),
	spd_benda		varchar(30),
	spd_ppkd		varchar(30),
	spd_uraian		varchar(500),
	spd_angg		numeric(24,2) default 0,
	spd_akum		numeric(24,2) default 0,
   	spd_total		numeric(24,2) default 0,
    spd_sisa		numeric(24,2) default 0,
    spd_app			integer default 0,
    spd_catatan		varchar(500),
	constraint spd_master_pk primary key(spdm_id)
	

);
create index spds_idx0 on spds(un_kode);
create index spds_idx1 on spds(spd_no);
create index spds_idx2 on spds(spd_noper);
 
