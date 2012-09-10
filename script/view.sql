

drop view if exists spdper_master_lists;
create or replace view spdper_master_lists as
select m.*,u.un_kode,u.un_nama,p.pn_nama as spdm_bendanama, p2.pn_nama as spdm_ppkdnama
from spdper_masters m
left join units u on (m.un_id=u.un_id)
left join pns p on (m.spdm_benda=p.pn_nip)
left join pns p2 on (m.spdm_ppkd=p2.pn_nip);

drop view if exists spd_master_lists cascade;
create or replace view spd_master_lists as
select m.*,u.un_kode,u.un_nama,p.pn_nama as spdm_bendanama, p2.pn_nama as spdm_ppkdnama
from spd_masters m
left join units u on (m.un_id=u.un_id)
left join pns p on (m.spdm_benda=p.pn_nip)
left join pns p2 on (m.spdm_ppkd=p2.pn_nip);

/* nilai total per dpa */ 
drop view if exists dpa_total cascade;
create or replace view dpa_total as
select m.*,u.un_kode, u.un_nama,coalesce((select sum(dpad_nilai) from dpa_details d where d.dpam_id=m.dpam_id),0) dpam_totangg from dpa_masters m
left join units u on (m.un_id=u.un_id);

/* total nilai dpa per skpd */
drop view if exists dpa_total_skpd cascade;
create or replace view dpa_total_skpd as
select to_char(dpam_tglvalid,'YYYY') as dpam_year,sum(dpam_totangg) as dpam_totangg,un_id,un_kode,un_nama 
from dpa_total 
group by to_char(dpam_tglvalid,'YYYY'),un_id,un_kode,un_nama ;

/* akumulasi spd per skpd */
drop view if exists spd_akum_skpd cascade;
create or replace view spd_akum_skpd
as
select to_char(spdm_total,'YYYY') as spd_year,un_id,un_kode,un_nama, sum(spdm_total) as spd_akum from spd_master_lists
group by to_char(spdm_total,'YYYY'),un_id,un_kode,un_nama;

/* daftar skpd beserta total anggaran dan akumulasinya per tahun
*/
drop view if exists skpd_lists cascade;
create or replace view skpd_lists
as
select trim(d.un_id||''|| (d.dpam_year )) as id,d.un_id,d.un_kode,d.un_nama, d.dpam_year as dpa_year,d.dpam_totangg as dpa_angg,coalesce(s.spd_akum,0) as dpa_akum, d.dpam_totangg-(coalesce(s.spd_akum,0)) as dpa_tersedia
from dpa_total_skpd d
left join spd_akum_skpd s on (d.un_id=s.un_id and d.dpam_year=s.spd_year) ;

drop view if exists dpa_akum cascade;
create or replace view dpa_akum
as
select dpam_no,sum(spdd_nilai) dpam_akum from spd_detail1s
group by dpam_no;

drop view if exists dpa_master_lists cascade;
create or replace view dpa_master_lists as
select m.*,u.un_kode, u.un_nama,coalesce(t.dpam_totangg,0) dpam_angg,coalesce(a.dpam_akum,0) as dpam_akum,coalesce(t.dpam_totangg,0)-coalesce(a.dpam_akum,0) as dpam_tersedia
from dpa_masters m
left join units u on (m.un_id=u.un_id)
left join dpa_total t on (m.dpam_no=t.dpam_no)
left join dpa_akum a on (m.dpam_no=a.dpam_no);

/* ini untuk daftar belanja langsung */
drop view if exists dpa_bl0 cascade;
create or replace view dpa_bl0 as
select  d.dpam_id,d.keg_kode,k.keg_nama,m.dpam_no,m.un_id,m.un_kode,m.un_nama,sum(d.dpad_nilai) nilaiangg 
from dpa_details d 
left join kegiatans k on (d.keg_kode=k.keg_kode)
left join dpa_master_lists m on (d.dpam_id=m.dpam_id)
where d.keg_kode is not null
group by d.dpam_id,d.keg_kode,k.keg_nama,m.dpam_no,m.un_id,m.un_kode,m.un_nama 
order by d.dpam_id;

drop view if exists dpa_bl1 cascade;
create or replace view dpa_bl1 as
select dpam_no,sum(spdd_nilai)spdd_akum from spd_detail1s
group by dpam_no;

drop view if exists dpa_bl cascade;
create or replace view dpa_bl as
select m.*,coalesce(d.spdd_akum,0) as nilaiakum
from dpa_bl0 m
left join dpa_bl1 d on (m.dpam_no=d.dpam_no);

/* untuk daftar belanja tidak langsung/gaji */
drop view if exists dpa_btl0 cascade;
create or replace view dpa_btl0 as
select  d.dpam_id,d.angg_kode,a.angg_kodeper as akun_kode,a.angg_namaper as akun_nama ,m.dpam_no,m.un_id,m.un_kode,m.un_nama,sum(d.dpad_nilai) nilaiangg 
from dpa_details d 
left join anggarans a on (d.angg_kode=a.angg_kode)
left join dpa_master_lists m on (d.dpam_id=m.dpam_id)
where d.keg_kode is  null
group by d.dpam_id,d.angg_kode,a.angg_kodeper,a.angg_namaper,m.dpam_no,m.un_id,m.un_kode,m.un_nama 
order by d.dpam_id;

drop view if exists dpa_btl1 cascade;
create or replace view dpa_btl1 as
select dpam_no,akun_kode,sum(spdd_nilai) as spdd_akum from spdper_detail2s
group by dpam_no,akun_kode;

drop view if exists dpa_btl cascade;
create or replace view dpa_btl as
select m.*,coalesce(d.spdd_akum,0) as nilaiakum
from dpa_btl0 m
left join dpa_bl1 d on (m.dpam_no=d.dpam_no);



