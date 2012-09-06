drop view if exists dpa_master_lists;
create or replace view dpa_master_lists as

select m.*,u.un_kode, u.un_nama,coalesce((select sum(dpad_nilai) from dpa_details d where d.dpam_id=m.dpam_id),0) dpam_totangg from dpa_masters m
left join units u on (m.un_id=u.un_id)