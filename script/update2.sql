drop table if exists subkas cascade;
create table subkas (
	kas_kode	varchar(30),
	un_id		varchar(20),
	kas_nama	varchar(50),
	kas_benda	varchar(30),
	akun_kode	varchar(20),
	constraint subkas_pk primary key(kas_kode)
);
drop table if exists subkas_balances cascade;
create table subkas_balances(
	cb_id			varchar(50),
	cb_seq			integer,
	cb_realdate		date,
	cb_date			timestamp default current_timestamp,
	kas_kode		varchar(20),
	akun_kode		varchar(30),
	cb_debit		numeric(22,4) default 0,
	cb_credit		numeric(22,4) default 0,
	cb_balance		numeric(22,4) default 0,
	cb_desc			varchar(250),
	cb_refmode		integer default 0,
	src_code	varchar(20),
	ori_code	varchar(20),
	cb_refno		varchar(50),
	cb_refname		varchar(100),
	cb_reftype		smallint default 0,
	afix			integer default 0,
	mark			smallint default 0,
	modi_by			varchar(30),
	modi_date		timestamp default current_timestamp,
	constraint subkas_bal_pk primary key(cb_id),
	constraint subkas_bal_fk1 foreign key (kas_kode) references kas(kas_kode) on delete cascade
);
create index subkas_balances_idx1 on subkas_balances(kas_kode);
create index subkas_balances_idx2 on subkas_balances(cb_refno);
create index subkas_balances_idx3 on subkas_balances(kas_kode,cb_seq);
create index subkas_balances_idx4 on subkas_balances(kas_kode,cb_seq,cb_realdate);

create or replace view subkas_balance_lists
as
select c.*,a.akun_nama,k.kas_nama,k.un_id,k.kas_benda from subkas_balances c
join subkas k on (c.kas_kode=k.kas_kode)
left join akun a on(c.akun_kode=a.akun_kode); 


-- update je_masters

alter table je_masters
add jm_refno			varchar(30);

alter table je_masters
add jm_refname			varchar(50);

alter table belanja_masters
add 	bm_tot			numeric(24,2) default 0;
alter table belanja_masters
add bm_totpot		numeric(24,2) default 0;

alter table belanja_masters
add bm_totpajak		numeric(24,2) default 0;

drop view if exists belanja_master_lists;
create or replace view belanja_master_lists
as
select m.*,p.prog_nama,k.keg_nama,u.un_nama,b.pn_nama as bm_bendanama
from belanja_masters m
left join units u on (m.un_id=u.un_id)
left join pns  b on (m.bm_benda=b.pn_nip)
left join programs  p on (m.prog_kode=p.prog_kode)
left join kegiatans k on (m.keg_kode=k.keg_kode);

create or replace view je_master_lists
as
select m.*,u.un_nama
from je_masters m
left join units u on (m.un_id=u.un_id);


 CREATE OR REPLACE FUNCTION je_masters_bef_ins0() RETURNS TRIGGER AS $$
	 
	BEGIN
		 
		if (new.jm_id is null or new.jm_id='0') then
			new.jm_id :=   trim(to_char(nextval('je_masters_jm_id_seq'),'0000000000')); 
		end if;
		if (new.jm_no is null or new.jm_no=' ' or new.jm_no=' ') then
			if (new.jm_type=0) then
				new.jm_no := 'JU'||trim(to_char(nextval('je_masters_jm_id_seq'),'0000000000')); 
			else
				new.jm_no := 'JT'||trim(to_char(nextval('je_masters_jm_id_seq'),'0000000000')); 
			end if;
		end if;
		RETURN NEW;
	END;
$$ LANGUAGE 'plpgsql';
DROP TRIGGER IF EXISTS je_masters_bef_ins0 on je_masters;
CREATE TRIGGER je_masters_bef_ins0  BEFORE INSERT ON je_masters FOR EACH ROW  EXECUTE PROCEDURE je_masters_bef_ins0();
 