 
/*
 * angg_kode=mtgkey
 * 
 */

-- daftar skpd/unit
drop table  IF EXISTS units cascade;
create table units(
 	
	un_id	varchar(30),
	un_kode	varchar(30),
	un_nama	varchar(80),
	un_lvl	integer,
	un_akronim	varchar(50),
	un_alamat varchar(250),
	un_telp	varchar(60),
	un_type	varchar(5),
	constraint  units_pk primary key (un_id)
);
create index units_idx0 on units(un_kode);
 
/* master program
 * 
 */
drop table  IF EXISTS programs cascade;
create table programs (
 
	prog_kode	varchar(30),
	prog_nourut	varchar(10),
	prog_nama	varchar(150),
	un_id	varchar(20),
	
	constraint program_pk primary key(prog_kode)
);
 


/* master kegiatan
 * 
 */
drop table  IF EXISTS kegiatans cascade;
create table kegiatans(
 
	keg_kode	varchar(30),
	prog_kode	varchar(30),
	keg_nourut	varchar(10),
	keg_nama	varchar(250),
	keg_perspektif varchar(10),
	keg_level	varchar(20),
	keg_type	varchar(20),
	constraint kegiatan_pk primary key (keg_kode)
	
);
 
create index kegiatans_idx1 on kegiatans(prog_kode);
   
drop table IF EXISTS anggarans cascade;
create table anggarans
(
	angg_kode	varchar(20),
	angg_kodeper	varchar(30),
	angg_namaper	varchar(200),
	angg_level		varchar(2),
	angg_kdkhusus	varchar(1),
	angg_type		varchar(2),
	constraint anggarans_pk primary key (angg_kode)
);
create index anggarans_idx0 on anggarans(angg_kodeper);
/*
 * ku_id autogenerate
 */
drop table IF EXISTS keg_units cascade;

create table keg_units
(
	ku_id	varchar(20),
	ku_tahap	varchar(20),
	un_id		varchar(20),
	keg_kode	varchar(20),
	prog_kode	varchar(20),
	ku_noprior	varchar(10),
	ku_kdsifat	varchar(10),
	ku_nip		varchar(30),
	ku_tglakhir	date,
	ku_tglawal	date,
	ku_targetp	varchar(200),
	ku_lokasi	varchar(250),
	ku_jumlahmin1	numeric(24,2) default 0,
	ku_pagu		numeric(24,2) default 0,
	ku_jumlahpls1	numeric(24,2) default 0,
	ku_sasaran	text,
	ku_ket		text,
	constraint keg_units_pk primary key(ku_id)
	
);
create index keg_unit_idx0 on keg_units(keg_kode,prog_kode);

/* 
 * table DPA Master
 * tipe=idxkode di tabel lama 
 * tahap=1-5
 * dpam_id=idxdask
 * */
drop table IF EXISTS dpa_masters cascade;
create table dpa_masters
(
	dpam_id	varchar(20), 
	un_id 	varchar(20),
	
	dpam_tahap	varchar(2),
	dpam_tipe	varchar(10),
	dpam_no		varchar(50),
	dpam_tgl 	date,
	dpam_nosah	varchar(50),
	dpam_ket	varchar(250),
	dpam_tglvalid	date,
	dpam_idxttd1	varchar(10),
	dpam_idxttd2	varchar(10),
	dpam_ttd1	integer,
	dpam_ttd2	integer,
	constraint dpa_master_pk primary key(dpam_id)
);
 
create index dpa_masters_idx1 on dpa_masters(un_id);
create index dpa_masters_idx2 on dpa_masters(dpam_no);
create index dpa_masters_idx3 on dpa_masters(dpam_nosah);
 
  /*
   * ku_code=kegiatan unit
   */
drop table IF EXISTS dpa_details cascade;
create table dpa_details
(
	dpad_id		varchar(20),
	dpam_id		varchar(20),
	keg_kode		varchar(20),
	angg_kode	varchar(20),
	un_id		varchar(20),
	dpad_nilai	numeric(22,4) default 0,
	constraint dpa_details_pk primary key(dpad_id),
	constraint dpa_details_fk1 foreign key (dpam_id) references dpa_masters(dpam_id) on delete cascade 
);
create index dpa_details_idx0 on dpa_details(keg_kode);
create index dpa_details_idx1 on dpa_details(un_id);
create index dpa_details_idx2 on dpa_details(angg_kode);
/*  permohonan spd
 * spdper => SPD Permohonan
 * _benda=bendahara pengeluaran
 
 */
create table spdper_masters(
	spdm_id			varchar(20),
	spdm_no			varchar(50),
	spdm_tgl		date,
	un_id			varchar(20),
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
	spdd_id			varchar(20),
	spdm_id			varchar(20),
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
	spd_id			varchar(20),
	spd_no			varchar(50),
	spd_noper		varchar(50),
	spd_tgl			date,
	un_id			varchar(30),
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
create index spds_idx0 on spds(un_id);
create index spds_idx1 on spds(spd_no);
create index spds_idx2 on spds(spd_noper);
 
