
create table akun(
	akun_id		serial,
	akun_kode	varchar(30),
	akun_nama	varchar(150),
	akun_lft	integer,
	akun_right	integer,
	akun_parent	integer,
	constraint akun_pk primary key (akun_id)
	
);
create unique index akun_idx0 on akun(akun_kode);
create index akun_idx1 on akun(akun_parent);
 
create table akun_detail(
		ad_id	serial,
		ad_saldoawal	numeric(24,2) default 0,
		ad_periode		numeric(24,2) default 0,
		akun_id			integer,
		constraint akun_detail_pk primary key (ad_id),
		constraint akun_detail_fk1 foreign key (akun_id) references akun(akun_id) on delete cascade 
);
create index akun_detail_idx0 on akun_detail(akun_id);


create table akun_balances(
	ab_id		varchar(50),
	ab_seq		integer,
	akun_kode		varchar(30),
	ab_action	varchar(2) default 'J',
	ab_debit	numeric(22,4) default 0,
	ab_credit	numeric(22,4) default 0,
	ab_balance	numeric(22,4) default 0,
	ab_realdate	date,
	ab_date		timestamp default current_timestamp,
	ab_refno	varchar(50),
	ab_refname	varchar(50),
	ab_refmode		smallint default 0,
	ab_desc		varchar(250),
	afix		integer default 0,
	constraint akun_balance_pk primary key(ab_id),
	constraint akun_balance_fk1 foreign key (akun_kode) references akun(akun_kode) on delete cascade
);
 
create index akun_balance_idx1 on account_balances(ab_refno);
create index akun_balance_idx2 on account_balances(akun_kode,ab_seq);

/*
 * angg_kode=mtgkey
 * 
 */
drop table if exists banks cascade;
create table banks (
	bank_norek	varchar(30),
	bank_nama	varchar(100),
	bank_alamat	varchar(150),	
	bank_kota	varchar(30),
	bank_cabang	varchar(30),
	un_id		varchar(20),
	akun_kode		varchar(30),
	constraint banks_pk primary key (bank_norek)
);

--  data kas digenerate saja pake kode SKPD
drop table if exists kas cascade;
create table kas (
	kas_kode	varchar(30),
	un_id		varchar(20),
	kas_nama	varchar(50),
 
	akun_kode	varchar(20),
	constraint kas_pk primary key(kas_kode)
);

drop table if exists potongans cascade;
create table potongans (
	ptg_kode 	varchar(50),
	ptg_nama	varchar(80),
	ptg_catatan	varchar(150),
	constraint potongan_pk primary key(ptg_kode)
);

drop table if exists pajaks cascade;
create table pajaks (
	pjk_kode	varchar(20),
	pjk_persen	numeric(10,2) default 0,
	pjk_catatan	varchar(250),
	constraint pajaks_pk primary key(pjk_kode)
);
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
 
drop table if exists pns;
create table pns (
	pn_nip		varchar(30),
	pn_nama		varchar(125),
	pn_kdgol	varchar(10),
	un_id		varchar(20),
	pn_jabatan	varchar(200),
	pn_pddk		varchar(20),
	constraint pns_pk primary key(pn_nip)
);
create index pns_idx0 on pns(un_id);
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
 * total per skpd
 * angg per skpd
 * akum per skpd
 * sisa per skpd
 
 */
drop table if exists spdper_masters cascade;
create table spdper_masters(
	spdm_id			varchar(20),
	spdm_no			varchar(50),
	spdm_tgl		date,
	spdm_state		integer default 0,
	un_id			varchar(20),
	spdm_benda		varchar(30),
	spdm_ppkd		varchar(30),
	spdm_uraian		varchar(500),
	spdm_ketentuan	varchar(500),
   	spdm_total		numeric(24,2) default 0,
   	spdm_akum		numeric(24,2) default 0,
    spdm_angg		numeric(24,2) default 0,
    spdm_sisa		numeric(24,2) default 0,
    spdm_bln1		integer default 1,
	spdm_bln2		integer default 2,
	constraint spdper_master_pk primary key(spdm_id)
	

);
create index spdper_masters_idx0 on spdper_masters(spdm_id);
create index spdper_masters_idx1 on spdper_masters(un_id);

/*untuk menyimpan DPA Belanja Tidak Langsung */
drop table if exists spdper_detail0s cascade;
create table spdper_detail0s(
	spdd_id			varchar(20),
	spdm_id			varchar(20),
	dpam_no			varchar(50),
	 
	spdd_angg		numeric(24,2) default 0,
	spdd_akum		numeric(24,2) default 0,
	spdd_nilai		numeric(24,2) default 0,
	spdd_sisa		numeric(24,2) default 0,
	

	constraint spdper_detail0s_pk primary key(spdd_id),
	constraint spdper_detail0s_fk1 foreign key (spdm_id) references spdper_masters(spdm_id) on delete cascade 
);


-- untuk menyimpan dpa belanja tidak langsung (gaji)
drop table if exists spd_detail0s cascade;
create table spd_detail0s(
	spdd_id			varchar(20),
	spdm_id			varchar(20),
	dpam_no			varchar(50),
	 
	spdd_angg		numeric(24,2) default 0,
	spdd_akum		numeric(24,2) default 0,
	
	spdd_nilai		numeric(24,2) default 0,
	spdd_sisa		numeric(24,2) default 0,
	

	constraint spd_detail0s_pk primary key(spdd_id),
	constraint spd_detail0s_fk1 foreign key (spdm_id) references spd_masters(spdm_id) on delete cascade 
);

-- detail 1 daftar dpa-kegiatan
/*
 * _bln1 = untuk kebutuhan dari bulan 1 s/d bulan 2
 * _bln2= sda
 * _akum= akumulasi SPD sebelumnya
 * _sisa=sisa akumulasi SPD
 * _total=total nilai yg di SPD kan melalui transaksi ini
 * _sisa=sisa nilai anggaran yg sekarang 
*/


drop table if exists spdper_detail1s cascade;
create table spdper_detail1s(
	spdd_id			varchar(20),
	spdm_id			varchar(20),
	dpam_no			varchar(50),
	 
	spdd_angg		numeric(24,2) default 0,
	spdd_akum		numeric(24,2) default 0,
	spdd_nilai		numeric(24,2) default 0,
	spdd_sisa		numeric(24,2) default 0,
	

	constraint spdper_detail1s_pk primary key(spdd_id),
	constraint spdper_detail1s_fk1 foreign key (spdm_id) references spdper_masters(spdm_id) on delete cascade 
);
 
--detail2 daftar rekening  
drop table if exists spdper_detail2s cascade;
create table spdper_detail2s(
	spdd_id			varchar(20),
	spdm_id			varchar(20),
	dpam_no			varchar(50),
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


drop table if exists spd_masters cascade;
create table spd_masters(
	spdm_id			varchar(20),
	spdm_no			varchar(50),
	spdper_no		varchar(50),
	spdm_tgl		date,
	spdm_ketentuan	varchar(500),
	spdm_state		integer default 0,
	un_id			varchar(20),
	spdm_benda		varchar(30),
	spdm_ppkd		varchar(30),
	spdm_uraian		varchar(500),
   	spdm_total		numeric(24,2) default 0,
   	spdm_akum		numeric(24,2) default 0,
    spdm_angg		numeric(24,2) default 0,
    spdm_sisa		numeric(24,2) default 0,
    spdm_bln1		integer default 1,
	spdm_bln2		integer default 2,
	constraint spd_master_pk primary key(spdm_id)
	

);
create index spd_masters_idx0 on spd_masters(spdm_id);
create index spd_masters_idx1 on spd_masters(un_id);

-- detail 1 daftar dpa-kegiatan
/*
 * _bln1 = untuk kebutuhan dari bulan 1 s/d bulan 2
 * _bln2= sda
 * _akum= akumulasi SPD sebelumnya
 * _sisa=sisa akumulasi SPD
 * _total=total nilai yg di SPD kan melalui transaksi ini
 * _sisa=sisa nilai anggaran yg sekarang 
*/
drop table if exists spd_detail1s cascade;
create table spd_detail1s(
	spdd_id			varchar(20),
	spdm_id			varchar(20),
	dpam_no			varchar(50),
	 
	spdd_angg		numeric(24,2) default 0,
	spdd_akum		numeric(24,2) default 0,
	spdd_nilai		numeric(24,2) default 0,
	spdd_sisa		numeric(24,2) default 0,
	

	constraint spd_detail1s_pk primary key(spdd_id),
	constraint spd_detail1s_fk1 foreign key (spdm_id) references spd_masters(spdm_id) on delete cascade 
);
 
--detail2 daftar rekening  
drop table if exists spd_detail2s cascade;
create table spd_detail2s(
	spdd_id			varchar(20),
	spdm_id			varchar(20),
	dpam_no			varchar(50),
	akun_kode		varchar(50),
	spdd_angg		numeric(24,2) default 0,
	spdd_akum		numeric(24,2) default 0,
	spdd_nilai		numeric(24,2) default 0,
 	spdd_sisa		numeric(24,2) default 0,
	constraint spd_detail2s_pk primary key(spdd_id),
	constraint spd_detail2s_fk1 foreign key (spdm_id) references spd_masters(spdm_id) on delete cascade 
);

-- register SPD, mencatat permohonan yg masuk
drop table if exists reg_spds cascade;
create table reg_spds( 
	rs_id		varchar(20),
	rs_no		varchar(50),
	rs_tgl		date,
	un_id		varchar(20),
	spdper_no	varchar(50),
	spdm_no		varchar(50),
	rs_catatan	varchar(500),
	rs_ttd1		varchar(30),
	rs_ttd2		varchar(30),
	constraint reg_spd_pk primary key(rs_id)
);
create index reg_spds_idx0 on reg_spds(rs_no);

-- SPP
-- spdm_no = NO SPD
-- UP/TU cukup spp_masters

-- spdm_tipe=UP/GU/TU/LS
drop table if exists spp_masters;
create table spp_masters(
	sppm_id		varchar(20),
	sppm_no		varchar(50),
	sppm_tgl	date,
	un_id		varchar(20),
	sppm_tipe	varchar(3),
	spdm_no		varchar(50),
	sppm_sisaspd	numeric(24,2) default 0,
	sppm_total	numeric(24,2) default 0,
	bank_norek	varchar(20),
	sppm_benda	varchar(30),
	spdm_bln1		integer default 1,
	spdm_bln2		integer default 2,
	
	sppm_namaper		varchar(100),
	sppm_bentukper		varchar(100),
	sppm_pimpper		varchar(100),
	sppm_alamatper		varchar(250),
	sppm_bankper		varchar(125),
	sppm_norekper		varchar(50),
	sppm_nokontrakper	varchar(100),
	sppm_keglanjut		integer default 0,
	sppm_waktulaksana	varchar(150),
	sppm_deskripsikerja	varchar(250),
	constraint spp_masters_pk primary key (sppm_id)
);
create index spp_masters_idx0 on spp_masters(sppm_no);

--spdm_detail1s -- untuk daftar dpa
create table spp_detail1s(
	sppd_id	varchar(20),
	sppm_id	varchar(20),
	dpam_no		varchar(50),
	sppd_angg	numeric(24,2) default 0,
	sppd_akum	numeric(24,2) default 0,
	sppd_nilai	numeric(24,2) default 0,
	sppd_sisa	numeric(24,2) default 0,
	
	constraint spp_detail1s_pk primary key(sppd_id),
	constraint spp_detail1s_fk1 foreign key (sppm_id) references spp_masters(sppm_id) on delete cascade 
);

create index spp_detail1s_idx0 on spp_detail1s(dpam_no);

--spdm_detail2s -- untuk daftar kode rekening
create table spp_detail2s(
	sppd_id	varchar(20),
	sppm_id	varchar(20),
	dpam_no		varchar(50),
	akun_kode	varchar(30),
	sppd_angg	numeric(24,2) default 0,
	sppd_akum	numeric(24,2) default 0,
	sppd_nilai	numeric(24,2) default 0,
	sppd_sisa	numeric(24,2) default 0,
	sppd_nobelanja	varchar(50),
	constraint spp_detail2s_pk primary key(sppd_id),
	constraint spp_detail2s_fk1 foreign key (sppm_id) references spp_masters(sppm_id) on delete cascade 
);

create index spp_details2s_idx0 on spp_detail2s(akun_kode);
create index spp_details2s_idx1 on spp_detail2s(dpam_no);
--
---SPM
/*
 * spm_tipe -> 0 -> LS, 1:UP,2:GU,3:TU
 */
drop table if exists spm_masters cascade;
create table spm_masters(
	spmm_id		varchar(20),
	spmm_no		varchar(50),
	spmm_tgl	date,
	spmm_state	integer default 0,
	sppm_no		varchar(50),
	spmm_benda	varchar(30),
	bank_norek	varchar(30),
	npwp_no		varchar(30),
	spmm_ket	varchar(500),
	spmm_total	numeric(24,2) default 0,
 	spm_tipe	integer default 0,
	constraint spm_masters_pk primary key(spmm_id)
);

create index spm_master_idx0 on spm_masters(spmm_no);

-- daftar potongan spm
drop table if exists spm_detail1s cascade;
create table spm_detail1s (
	spmd_id		varchar(20),
	spmm_id		varchar(20),
	 
	ptg_kode	varchar(20),
	spmd_nilai	numeric(24,2) default 0,
	spmd_ket	varchar(150),
	constraint spm_detail1s_pk primary key(spmd_id),
	constraint spm_detail1s_fk1 foreign key (spmm_id) references spm_masters(spmm_id) on delete cascade 
);
-- spm pajak
drop table if exists spm_detail2s cascade;
create table spm_detail2s (
	spmd_id		varchar(20),
	spmm_id		varchar(20),
	pjk_kode	varchar(20),
	spmd_nilai	numeric(24,2) default 0,
	spmd_ket	varchar(150),
	constraint spm_detail2s_pk primary key (spmd_id),
	constraint spm_detail2s_fk1 foreign key (spmm_id) references spm_masters(spmm_id) on delete cascade 
);
---beban rekening
drop table if exists spm_detail3s cascade;
create table spm_detail3s (
	spmd_id		varchar(20),
	spmm_id		varchar(20),
	akun_kode		varchar(30),
	spmd_nilai		numeric(22,4) default 0,
	spmd_ket		varchar(150),
	constraint spm_detail3s_pk primary key (spmd_id),
	constraint spm_detail3s_fk1 foreign key (spmm_id) references spm_masters(spmm_id) on delete cascade 
);


 
---SP2D, mengaju pake SPM
drop table if exists sp2d_masters cascade;
create table sp2d_masters(
	sp2dm_id		varchar(20),
	sp2dm_no		varchar(50),
	sp2dm_tgl	date,
	sp2dm_tipe		integer default 0,
	sp2dm_state	integer default 0,
	spmm_no		varchar(50),
	
	sp2dm_benda	varchar(30),
	bank_norek	varchar(30),
	npwp_no		varchar(30),
	sp2dm_ket	varchar(500),
 	sp2dm_total	numeric(24,2) default 0,
	sp2dm_norek2	varchar(30),
	sp2dm_bank2		varchar(50),
	sp2dm_npwp2	varchar(30),
	sp2dm_nama2	varchar(100),
	sp2dm_ket2	varchar(500),
	
	constraint sp2dm_masters_pk primary key(sp2dm_id)
);

create index sp2dm_master_idx0 on sp2d_masters(sp2dm_no);

-- daftar potongan spm
drop table if exists sp2d_detail1s cascade;
create table sp2d_detail1s (
	sp2dd_id		varchar(20),
	sp2dm_id		varchar(20),
	ptg_kode	varchar(20),
	sp2dd_nilai	numeric(24,2) default 0,
	sp2dd_ket	varchar(150),
	constraint sp2d_detail1s_pk primary key(sp2dd_id),
	constraint sp2d_detail1s_fk1 foreign key (sp2dm_id) references sp2d_masters(sp2dm_id) on delete cascade 
);
-- spm pajak
drop table if exists sp2d_detail2s cascade;
create table sp2d_detail2s (
	sp2dd_id		varchar(20),
	sp2dm_id		varchar(20),
	pjk_kode	varchar(20),
	sp2dd_nilai	numeric(24,2) default 0,
	sp2dd_ket	varchar(150),
	constraint sp2d_detail2s_pk primary key (sp2dd_id),
	constraint sp2d_detail2s_fk1 foreign key (sp2dm_id) references sp2d_masters(sp2dm_id) on delete cascade 
);
---beban rekening
drop table if exists sp2d_detail3s cascade;
create table sp2d_detail3s (
	sp2dd_id		varchar(20),
	sp2dm_id		varchar(20),
	
	akun_kode		varchar(30),
	sp2dd_nilai		numeric(22,4) default 0,
	ss2dd_ket		varchar(150),
	constraint sp2d_detail3s_pk primary key (sp2dd_id),
	constraint sp2d_detail3s_fk1 foreign key (sp2dm_id) references sp2d_masters(sp2dm_id) on delete cascade 
);



create table je_masters (
	jm_id		varchar(50),
	jm_no		varchar(30),
	jm_date		date,
	jm_note		varchar(250),
	un_id			varchar(20),
	astate			smallint default 0,
	locked			smallint default 0,
	posted			smallint default 0,
	proc			smallint default 0,
	voided			smallint default 0,
	jm_totaldebit		numeric(22,4) default 0,
	jm_totalcredit		numeric(22,4) default 0,
	 
	constraint je_master_pk primary key(jm_id)
);

create unique index je_master_idx1 on je_masters(jm_no);
create index je_master_idx2 on je_masters(un_id);
/* jd_idx is for grid identifier, usefull for sorting in visual */
-- _idx must have in exjts 4 for easier visual 
-- so for other table which edited with grid editor
create table je_details(
	jd_id		varchar(50),
	jd_idx		varchar(50),
	jm_id		varchar(50),
	akun_kode		varchar(30),
	jd_desc		varchar(250),
	jd_debit	numeric(22,4) default 0,
	jd_credit	numeric(22,4) default 0,
	 
	constraint je_detail_pk primary key(jd_id),
	constraint je_detail_fk1 foreign key (jm_id) references je_masters(jm_id) on delete cascade 
);
create index je_detail_idx1 on  je_details(akun_kode);
 

create table gaji_masters(
	gm_id	varchar(20),
	gm_tgl	date,
	gm_no		varchar(50),
	un_id	varchar(20),
	gm_bulan	integer,
	gm_tahun 	integer,
 
	gm_kotor	numeric(24,2) default 0,
	gm_potongan	numeric(24,2) default 0,
	
	gm_bersih	numeric(24,2) default 0,
	gm_bulat	numeric(24,2) default 0,
	constraint gaji_masters_pk primary key(gm_id)
);
-- rekening gaji
create table gaji_detail1s(
	gm_id	varchar(20),
	gd_id	varchar(20),
	akun_kode		varchar(30),
	gd_nilai	numeric(24,2) default 0,
	constraint gaji_detail1s_pk primary key(gd_id),
	constraint gaji_detail1s_fk1 foreign key (gm_id) references gaji_masters(gm_id) on delete cascade 

);
create index gaji_detail1s_idx0 on gaji_detail1s(akun_kode);
--- ini untuk potongan2
create table gaji_detail2s(
	gm_id	varchar(20),
	gd_id	varchar(20),
	gd_nama		varchar(100),
	gd_nilai	numeric(24,2) default 0,
	constraint gaji_detail2s_pk primary key(gd_id),
	constraint gaji_detail2s_fk1 foreign key (gm_id) references gaji_masters(gm_id) on delete cascade 

);
 
-- berita acara
-- ada program/kegiatan, makan selalu gunakan DPA saja
create table  acara_masters(
	am_id	varchar(30),
	am_no	varchar(50),
	am_tgl	date,
	un_id	varchar(20),
	prog_kode	varchar(30),
	keg_kode	varchar(30),
	am_pihak1 varchar(100),
	am_pihak2 varchar(100),
	constraint acara_masters_pk primary key(am_id)
);
create index acara_masters_idx0 on acara_masters(un_id);

create table  acara_details( 
	am_id	varchar(30),
	ad_id	varchar(30),
	akun_kode		varchar(30),
	ad_nilai	numeric(24,2) default 0,
	constraint acara_details_pk primary key(ad_id),
	constraint acara_details_fk foreign key (am_id) references acara_masters(am_id) on delete cascade 
);
create index acara_details_idx0 on acara_details(akun_kode);

create table bansos_masters(
	bm_id	varchar(30),
	bm_no	varchar(50),
	bm_tgl	date,
	bm_tentang varchar(250),
	un_id	varchar(20),
	prog_kode	varchar(30),
	keg_kode	varchar(30),
	constraint bansos_masters_pk primary key(bm_id)
);

create table bansos_details(
	bm_id	varchar(30),
	bd_id	varchar(20),
	akun_kode		varchar(30),
	bd_nilai	numeric(24,2) default 0,
	constraint bansos_details_pk primary key(bd_id),
	constraint bansos_details_fk foreign key (bm_id) references bansos_masters(bm_id) on delete cascade 
);

create index bansos_details_idx0 on bansos_details(akun_kode);
create table belanja_masters(
	bm_id	varchar(20),
	bm_no	varchar(50),
	bm_tgl	date,
	dpam_no	varchar(30),
	constraint belanja_masters_pk primary key(bm_id)
);

create table belanja_details( 
	bd_id	varchar(20),
	akun_kode		varchar(30),
	bd_nilai	numeric(24,2) default 0,
	constraint belanja_details_pk primary key(bd_id),
	constraint belanja_details_fk foreign key (bm_id) references belanja_masters(bm_id) on delete cascade 
);

create table pembiayaans (
	bia_id	varchar(20),
	bia_no	varchar(50),
	bia_tgl	date,
	bia_nonota	varchar(50),
	akun_kode	varchar(30),
	bia_tglsp2d	date,
	constraint pembiayaan_pk primary key(bia_id)
);
-- pengembalian belanja
create table kembali_masters (
	km_id		varchar(20),
	un_id		varchar(20),
	km_no		varchar(50),
	km_tgl	 	date,
	dpam_no		varchar(50),
	constraint kembali_master_pk primary key (km_id)
	 
);
create index kembali_master_idx0 kembali_masters(km_no);

create table kembali_details(
	kd_id		varchar(20),
	km_id		varchar(20),
	akun_kode	varchar(30),
	km_nilaiblj	numeric(24,2) default 0,
	km_nilaikmbl	numeric(24,2) default 0,
	constraint kembali_details_pk primary key(kd_id),
	constraint kembali_details_fk foreign key (km_id) references kembali_details(km_id) on delete cascade 
);

create index kembali_details_idx0 kembali_details(akun_kode);

create table geser_kas( 
	gk_id		varchar(20),
	un_id		varchar(20),
	gk_no		varchar(50),
	gk_tgl		date,
	gk_tipe		integer default 0,
	gk_nilai	numeric(24,2) default 0,
	constraint geser_kas_pk primary key (gk_id)
);
create index geser_kas_idx0 on geser_kas(un_id);

create table skp_masters(
	sm_id	varchar(20),
	sm_no	varchar(50),
	sm_tgl	date,
	sm_masa		integer default 0.
	sm_tahun	integer default 0,
	sm_nama	varchar(125),
	sm_alamat		varchar(250),
	sm_npwp		varchar(100),
	sm_tgltempo	date,
	constraint skp_masters_pk primary key(sm_id)
);

create index skp_masters_idx0 on skp_masters(sm_no);

create table skp_details(
	sd_id		varchar(20),
	sm_id		varchar(20),
	akun_kode		varchar(30),
	sd_pokok		numeric(24,2) default 0,
	sd_bunga		numeric(24,2) default 0,
	sd_kenaikan		numeric(24,2) default 0,
	sd_subtotal		numeric(24,2) default 0,
	constraint skp_details_pk primary key (sd_id),
	constraint skp_details_fk1 foreign key (km_id) references skp_masters(sm_id) on delete cascade 
);
create index skp_details_idx0 on skp_details(akun_kode);


--SKR
create table skr_masters(
	sm_id	varchar(20),
	sm_no	varchar(50),
	sm_tgl	date,
	sm_masa		integer default 0.
	sm_tahun	integer default 0,
	sm_nama	varchar(125),
	sm_alamat		varchar(250), 
	sm_npwr		varchar(100),
	sm_tgltempo	date,
	constraint skr_masters_pk primary key(sm_id)
);

create index skr_masters_idx0 on skr_masters(sm_no);

create table skr_details(
	sd_id		varchar(20),
	sm_id		varchar(20),
	akun_kode		varchar(30),
	sd_pokok		numeric(24,2) default 0,
	sd_bunga		numeric(24,2) default 0,
	sd_kenaikan		numeric(24,2) default 0,
	sd_subtotal		numeric(24,2) default 0,
	constraint skr_details_pk primary key (sd_id),
	constraint skr_details_fk1 foreign key (sm_id) references skr_masters(sm_id) on delete cascade 
);
create index skr_details on skr_details(akun_kode);

-- tanda bukti pembayaran (bagian penerimaan)
-- tipe: 0 :tunai, 1 : transfer
create table bayar_masters (
	bm_id		varchar(20),
	bm_no		varchar(50),
	bm_tgl		date,
	bm_trm_oleh	 varchar(125),
	bm_trm_dari		varchar(125),
	bm_trm_tgl		date,
	bm_tipe		integer default 0,
	bm_alamat		varchar(250),
	bm_untuk		varchar(250),
	constraint bayar_masters_pk primary key(bm_id)
);
create index bayar_masters_idx0 on bayar_masters(bm_no);

create table bayar_details(
	bd_id		varchar(20),
	bm_id		varchar(20),
	akun_kode	varchar(30),
	bd_nilai		numeric(24,2) default 0,
	constraint bayar_detail_pk primary key(bd_id),
	constraint bayar_detail_fk1 foreign key (bm_id) references bayar_masters(bm_id) on delete cascade 
);
create index bayar_detail_idx0 on bayar_details(akun_kode);
--tanda setoran
create table sts_masters(
	sm_id		varchar(20),
	sm_no		varchar(50),
	sm_tgl		date,
	bank_norek		varchar(50),
	sm_tglsetor		date,
	sm_total		numeric(24,2) default 0,
	constraint sts_masters_pk primary key(sm_id)
);


create table sts_details(
	sd_id		varchar(20),
	sm_id		varchar(20),
	akun_kode	varchar(30),
	sd_nilai	numeric(24,2) default 0,
	constraint sts_details_pk primary key (sd_id),
	constraint sts_details_fk1 foreign key (sm_id) references sts_masters(sm_id) on delete cascade 
);

create index sts_details_idx0 on sts_details(akun_kode);
--
-- sk_tipe : tunai, 1:check
create table setor_kasdas(
	sk_id		varchar(20),
	sk_tgl		date,
	sk_no	varchar(30),
	bank_norek	varchar(50),
	sk_setoroleh	varchar(125),
	sk_tipe		integer default 0
	sk_nocheck	varchar(50),
	sk_nilai	numeric(24,2) default 0,
	constraint setor_kasdas_pk primary key(sk_id)
);

create table dana_imbangs(
	di_id		varchar(20),
	di_no		varchar(50),
	di_tgl		date,
	akun_kode		varchar(30),
	di_nosk		varchar(50),
	di_tglsk		date,
	di_nilai		numeric(24,2) default 0,
	di_tglterima	date,
	constraint dana_imbang_pk primary key(di_id)
);
create index data_imbangs_idx0 on dana_imbangs(di_no);

create table trm_pembiayaans(
	tp_id		varchar(20),
	tp_no		varchar(50),
	tp_tgl		date,
	tp_notakredit	varchar(50),
	tp_srthutang	varchar(50),
	tp_nilai		numeric(24,2) default 0,
	tp_tgltrm		date,
	constraint trm_pk primary key(tp_id)
);
