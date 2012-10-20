create sequence gaji_detail3s_gd_id_seq increment 1;

alter table belanja_masters
add bm_benda		varchar(30);


drop view if exists belanja_master_lists cascade;
create or replace view belanja_master_lists
as
select m.*,p.prog_nama,k.keg_nama,u.un_nama
from belanja_masters m
left join units u on (m.un_id=u.un_id)
left join programs  p on (m.prog_kode=p.prog_kode)
left join kegiatans k on (m.keg_kode=k.keg_kode);

alter table gaji_detail2s
add ptg_kode	varchar(20);


create table gaji_detail3s(
	gm_id	varchar(20),
	gd_id	varchar(20),
	gd_nama		varchar(100),
	pjk_kode	varchar(20),
	gd_nilai	numeric(24,2) default 0,
	constraint gaji_detail3s_pk primary key(gd_id),
	constraint gaji_detail3s_fk1 foreign key (gm_id) references gaji_masters(gm_id) on delete cascade 

);
create or replace view gaji_detail3_lists as
select d.*, m.gm_no,m.gm_tgl,m.un_id,m.un_kode,m.un_nama 
from gaji_detail3s d
left join gaji_master_lists m on (d.gm_id=m.gm_id);


CREATE OR REPLACE FUNCTION gaji_detail3s_bef_ins1() RETURNS TRIGGER AS $$
	 
	BEGIN
		 
		if (new.gd_id is null or new.gd_id='0') then
			new.gd_id :=   trim(to_char(nextval('gaji_detail3s_gd_id_seq'),'0000000000')); 
		end if;
		RETURN NEW;
	END;
$$ LANGUAGE 'plpgsql';
DROP TRIGGER IF EXISTS gaji_detail3s_bef_ins1 on gaji_detail3s;
CREATE TRIGGER gaji_detail3s_bef_ins1  BEFORE INSERT ON gaji_detail3s FOR EACH ROW  EXECUTE PROCEDURE gaji_detail3s_bef_ins1();

