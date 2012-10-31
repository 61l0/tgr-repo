--trigger for posting journal, kas,
CREATE OR REPLACE FUNCTION belanja_masters_aft_ins3() RETURNS TRIGGER AS $$
DECLARE
	check_master integer;
	
BEGIN
	select  count(*) into check_master from je_masters where jm_refno=new.bm_no and jm_refname='belanja_masters';
	if (check_master<=0) then
	 	if (new.bm_tot>0) then
			insert into je_masters(jm_type,un_id,jm_date, jm_totaldebit,jm_totalcredit,jm_refno,jm_refname,jm_note)
			values(1,new.un_id,current_date,new.bm_tot-new.bm_totpot,0,new.bm_no,'belanja_masters','Belanja');
		end if;		
	end if;
	RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';
DROP TRIGGER IF EXISTS belanja_masters_aft_ins3 ON belanja_masters;
CREATE TRIGGER belanja_masters_aft_ins3  AFTER INSERT ON belanja_masters FOR EACH ROW  EXECUTE PROCEDURE belanja_masters_aft_ins3();
 /*------------------------------ */


CREATE OR REPLACE FUNCTION belanja_masters_aft_upd3() RETURNS TRIGGER AS $$
DECLARE
	check_master integer;
	
BEGIN
	select  count(*) into check_master from je_masters where jm_refno=new.bm_no and jm_refname='belanja_masters';
	if (check_master<=0) then
		if (new.bm_tot>0) then 
				insert into je_masters(jm_type,jm_date,un_id, jm_totaldebit,jm_totalcredit,jm_refno,jm_refname,jm_note)
			values(1,current_date,new.un_id,new.bm_tot-new.bm_totpot,0,new.bm_no,'belanja_masters','Belanja');
		end if;
	else
		if (new.bm_tot>0) then
			update je_masters set jm_totaldebit=new.bm_tot-new.bm_totpot where jm_refno=new.bm_no and jm_refname='belanja_masters';
		end if;
	end if;
	
	RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';
DROP TRIGGER IF EXISTS belanja_masters_aft_upd3 ON belanja_masters;
CREATE TRIGGER belanja_masters_aft_upd3  AFTER UPDATE ON belanja_masters FOR EACH ROW  EXECUTE PROCEDURE belanja_masters_aft_upd3();
 /*------------------------------ */


CREATE OR REPLACE FUNCTION belanja_details_aft_ins3() RETURNS TRIGGER AS $$
DECLARE
	master record;
	check_kas integer;
	kas record;
	akun record;
	ajm_id	varchar(50);
BEGIN
	if (new.bd_nilai > 0) then
		select * into master from belanja_masters where bm_id=new.bm_id;
		
		--cek kas SKPD,
		select count(*) into check_kas from kas where un_id=master.un_id;
		if (check_kas>0) then
			--masukkan ke kas balance
			select * into kas from kas where un_id=master.un_id;
			select * into akun from akun where akun_kode=new.akun_kode;
			insert into kas_balances(kas_kode, akun_kode, cb_debit,cb_credit, cb_realdate,cb_refno,cb_refname,cb_refmode,cb_desc)
					values(kas.kas_kode,new.akun_kode, 0,new.bd_nilai,master.bm_tgl,trim(master.bm_no||'-'||new.bd_id),'Belanja',0,akun.akun_nama);
		
		end if;
		 	---masukkan ke jurnal detail
		 	--ambil jm_id
			select jm_id into ajm_id from je_masters where jm_refno=master.bm_no and jm_refname='belanja_masters';
			if (ajm_id is not null) then
	  			insert into je_details(jm_id,akun_kode,jd_desc,jd_debit,jd_credit)
				values(ajm_id,new.akun_kode,'Belanja',new.bd_nilai,0);
			end if;
		
	end if;
	RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';
DROP TRIGGER IF EXISTS belanja_details_aft_ins3 ON belanja_details;
CREATE TRIGGER belanja_details_aft_ins3  AFTER INSERT ON belanja_details FOR EACH ROW  EXECUTE PROCEDURE belanja_details_aft_ins3();
 /*------------------------------ */

CREATE OR REPLACE FUNCTION belanja_details_aft_upd3() RETURNS TRIGGER AS $$
DECLARE
	master record;
	check_kas integer;
	check_bal	integer;
	check_jd	integer;
	kas record;
	ajm_id	varchar(50);
	akun record;
BEGIN
	if (new.bd_nilai > 0) then
	select * into master from belanja_masters where bm_id=new.bm_id;
	
	--cek kas SKPD,
	select count(*) into check_kas from kas where un_id=master.un_id;
	if (check_kas>0) then
		--masukkan ke kas balance
		select * into kas from kas where un_id=master.un_id;
			--cek di balance
			select count(*) into check_bal from kas_balances where cb_refno=trim(master.bm_no||'-'||new.bd_id) and cb_refname='Belanja';
			select * into akun from akun where akun_kode=new.akun_kode;
			if (check_bal>0) then
			
				update kas_balance set afix=1, cd_debit=0,cd_credit=new.bd_nilai where akun_kode=new.akun_kode and cb_refno=trim(master.bm_no||'-'||new.bd_id) and cb_refname='Belanja';
			else
			
				insert into kas_balances(kas_kode, akun_kode,cb_debit,cb_credit, cb_realdate,cb_refno,cb_refname,cb_refmode,cb_desc)
				values(kas.kas_kode, new.akun_kode,0,new.bd_nilai,master.bm_tgl,trim(master.bm_no||'-'||new.bd_id),'Belanja',0,akun.akun_nama);
			end if;
		
	end if;
	 	---masukkan ke jurnal detail
	 	--ambil jm_id
		select jm_id into ajm_id from je_masters where jm_refno=master.bm_no and jm_refname='belanja_masters';
		if (ajm_id is not null) then
  		
			--cek apakah sudah ada di jurnal detail
			select count(*) into check_jd from je_details where akun_kode=new.akun_kode and jm_id=ajm_id;
			if (check_jd<=0 )then
				insert into je_details(jm_id,akun_kode,jd_desc,jd_debit,jd_credit)
				values(ajm_id,new.akun_kode,'Belanja',new.bd_nilai,0);
			else
				update je_details set jd_debit=new.bd_nilai where akun_kode=new.akun_kode and jm_id=ajm_id;
			end if;
		end if;
	
	end if;
	RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';
DROP TRIGGER IF EXISTS belanja_details_aft_upd3 ON belanja_details;
CREATE TRIGGER belanja_details_aft_upd3  AFTER UPDATE ON belanja_details FOR EACH ROW  EXECUTE PROCEDURE belanja_details_aft_upd3();
 /*------------------------------ */
