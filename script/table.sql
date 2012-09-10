 
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
	akun_kode	varchar(30),
	constraint banks_pk primary key (bank_norek)
);

-- 
drop table if exists kas cascade;
create table kas (
	kas_kode	varchar(20),
	un_id		varchar(20),
	kas_nama	varchar(50),
	kas_benda	varchar(20),
	akun_kode	varchar(20),
	constraint kas_pk primary key(kas_kode)
);

drop table if exists potongans cascade;
create table potongans (
	ptg_kode 	varchar(50),
	ptg_nama	varchar(80),
	ptg_catatan	varchar(150),
	constraint potongan_pk primary key(ptg_kode);
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
	spmd_sisa		numeric(24,2) default 0,
	

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
	spmd_sisa		numeric(24,2) default 0,
	

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
	spmd_sisa		numeric(24,2) default 0,
	

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
	spmd_sisa		numeric(24,2) default 0,
	

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

-- register SPD
drop table if exists reg_spds cascade;
create table reg_spds( 
	rs_id		varchar(20),
	rs_no		varchar(50),
	rs_tgl		date,
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
drop table if exists spp_masters(
	sppm_id		varchar(20),
	sppm_no		varchar(50),
	sppm_tgl	date,
	un_id		varchar(20),
	spdm_tipe	varchar(3),
	spdm_no		varchar(50),
	sppm_sisaspd	numeric
	sppm_total	numeric(24,2) default 0,
	bank_kode	varchar(20),
	constraint spp_masters_pk primary key (sppm_id)
);
create index spp_masters_idx0 on spp_masters(sppm_no);

--spdm_detail1s -- untuk daftar dpa
create table spp_detail1s(
	sppd_id	varchar(20),
	sppm_id	varchar(20),
	dpam_no		varchar(50),
	sppd_nilai	numeric(24,2) default 0,
	constraint spp_detail1s_pk primary key(sppd_id),
	constraint spp_detail1s_fk1 foreign key (sppm_id) references spp_masters(sppm_id) on delete cascade 
);

create index spp_detail1s_idx0 spp_detail2s(dpam_no);

--spdm_detail2s -- untuk daftar kode rekening
create table spp_detail2s(
	sppd_id	varchar(20),
	sppm_id	varchar(20),
	akun_kode	varchar(30),
	sppd_nilai	numeric(24,2) default 0,
	constraint spp_detail2s_pk primary key(sppd_id),
	constraint spp_detail2s_fk1 foreign key (sppm_id) references spp_masters(sppm_id) on delete cascade 
);

create index spp_details2s_idx0 spp_detail2s(akun_kode);
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
	spm_no		varchar(50),
	
	sp2dm_benda	varchar(30),
	bank_norek	varchar(30),
	npwp_no		varchar(30),
	sp2dm_ket	varchar(500),
 	
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
	spmd_nilai		numeric(22,4) default 0,
	spmd_ket		varchar(150),
	constraint sp2d_detail3s_pk primary key (sp2dd_id),
	constraint sp2d_detail3s_fk1 foreign key (sp2dm_id) references sp2d_masters(sp2dm_id) on delete cascade 
);


