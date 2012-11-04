alter table bansos_masters
add bm_tot		numeric(24,2) default 0;

--drop view if exists bansos_master_lists cascade;
drop view if exists bansos_master_lists;
create or replace view bansos_master_lists
as
select m.*,p.prog_nama,k.keg_nama,u.un_nama
from bansos_masters m
left join units u on (m.un_id=u.un_id)
left join programs  p on (m.prog_kode=p.prog_kode)
left join kegiatans k on (m.keg_kode=k.keg_kode);

alter table acara_masters
add am_tot	numeric(24,2) default 0;

drop view if exists acara_master_lists;
create or replace view acara_master_lists
as
select m.*,p.prog_nama,k.keg_nama,u.un_nama
from acara_masters m
left join units u on (m.un_id=u.un_id)
left join programs  p on (m.prog_kode=p.prog_kode)
left join kegiatans k on (m.keg_kode=k.keg_kode);

alter table sp2d_masters
add sp2dm_pajak	numeric(24,2) default 0;

alter table sp2d_masters
add 	sp2dm_pot	numeric(24,2) default 0;

drop view sp2d_master_lists;
create or replace view sp2d_master_lists
as
select m.*,b.bank_nama,s.un_id,s.un_nama, s.spmm_tgl,s.sppm_tipe,s.sppm_no,s.sppm_tgl,s.sppm_benda,s.sppm_bendanama,s.spdm_no,s.spdm_tgl,s.spdm_uraian from sp2d_masters m
left join spm_master_lists s on (m.spmm_no=s.spmm_no)
left join banks b on (m.bank_norek=b.bank_norek);

alter table sp2d_detail3s
add sp2dd_ket		varchar(150);

drop view sp2d_detail3_lists;
create or replace view sp2d_detail3_lists
as
select d.*,a.angg_namaper as akun_nama
from sp2d_detail3s d
left join anggarans a on (d.akun_kode=a.angg_kodeper);

