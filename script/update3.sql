

CREATE OR REPLACE FUNCTION bank_balances_bef_ins0() RETURNS TRIGGER AS $$
	 
	BEGIN
		 
		if (new.bb_id is null or new.bb_id='0') then
			new.bb_id :=   trim(to_char(nextval('bank_balances_bb_id_seq'),'0000000000')); 
		end if;
		RETURN NEW;
	END;
$$ LANGUAGE 'plpgsql';
DROP TRIGGER IF EXISTS bank_balances_bef_ins0 on bank_balances;
CREATE TRIGGER bank_balances_bef_ins0  BEFORE INSERT ON bank_balances FOR EACH ROW  EXECUTE PROCEDURE bank_balances_bef_ins0();

create or replace function fixBankSeq(abb_id varchar(50)) returns varchar as $$
declare
	bb_cursor refcursor;
	bb record;
	i integer;
	last_balance numeric(22,4);
	  
	last_bb record;
begin
	 
	last_balance:=0;
 
	select * into last_bb from bank_balances where bb_id=abb_id;
	if (last_bb.afix=1) then
		update bank_balances set afix=0 where bb_id=abb_id;
		i:=last_bb.bb_seq;
		last_balance:=last_bb.bb_balance;
		-- mengakses record2 dibawahnya 
		open bb_cursor for select * from bank_balances 
				where   bank_norek=last_bb.bank_norek and bb_realdate>=last_bb.bb_realdate and bb_id > last_bb.bb_id
				order by bb_realdate asc,bb_id asc;
	
		loop
		fetch bb_cursor into bb;
		exit when not found; 
			i:=i+1;
			 
			last_balance:=last_balance+(coalesce(bb.bb_debit,0)-coalesce(bb.bb_credit,0));
		 
			update bank_balances set bb_seq=i,_bbbalance=last_balance,afix=0 where bb_id=bb.bb_id;
		
		end loop;
		close bb_cursor;
	end if;
	return 'OK';
end;
$$ language 'plpgsql';
/*--------------------------------------*/
create or replace function fixBankDel(abank_norek varchar(30),aab_seq integer) returns varchar as $$
declare
	 
	last_balance numeric(22,4);
	ab_cursor refcursor;
	ab record;
	i integer;
	 
begin
	if (aab_seq=1) then
		last_balance:=0;
		i:=0;
	else 
		select bb_balance into last_balance from bank_balances where bank_norek=abank_norek and bb_seq=aab_seq-1;
		i:=aab_seq-1;
		 
	end if;
	 
	-- mengakses record2 dibawahnya 
	open ab_cursor for select * from bank_balances 
			where   bank_norek=abank_norek and bb_seq>aab_seq  
 			order by bb_realdate asc,bb_id asc;
	
	loop
	fetch ab_cursor into ab;
	exit when not found; 
		i:=i+1;
	 	last_balance:=last_balance+(coalesce(ab.bb_debit,0)-coalesce(ab.bb_credit,0));
		 
		update bank_balances set bb_seq=i,_bbbalance=last_balance where bb_id=ab.bb_id;
		
	end loop;
	close ab_cursor;
	return 'OK';
	
end;
$$ language 'plpgsql';
/* -------------------------- */
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
	kas record;
	check_kas integer;
	check_akun integer;
	current_jmid varchar(50);
	current_jdid	varchar(50);
	check_jd	integer;
BEGIN
	select  count(*) into check_master from je_masters where jm_refno=new.bm_no and jm_refname='belanja_masters';
	if (check_master<=0) then
		if (new.bm_tot>0) then 
			insert into je_masters(jm_type,jm_date,un_id, jm_totaldebit,jm_totalcredit,jm_refno,jm_refname,jm_note)
			values(1,current_date,new.un_id,new.bm_tot-new.bm_totpot,0,new.bm_no,'belanja_masters','Belanja');
			current_jmid:='JT'||trim(to_char(currval('je_masters_jm_id_seq'),'0000000000')); 
			
			--cari kode akun dari kas
			select count(*) into check_kas from kas where un_id=new.un_id;
			if (check_kas >0) then
				select * into kas from kas where un_id=new.un_id limit 1;
				select count(*) into check_akun from akun where akun_kode=kas.akun_kode;
				if (check_akun>0) then
					 	insert into je_details(jm_id,akun_kode,jd_desc,jd_debit,jd_credit)
						values(current_jmid,kas.akun_kode,'Belanja',0,new.bd_nilai);
				end if;
				
			end if;
		end if;
	else
		if (new.bm_tot>0) then
			update je_masters set jm_totaldebit=new.bm_tot-new.bm_totpot where jm_refno=new.bm_no and jm_refname='belanja_masters';
			--cari kode akun dari kas
			select jm_id into current_jmid from je_masters where jm_refno=new.bm_no and jm_refname='belanja_masters';
			if (length(current_jmid)>5) then
				
				select count(*) into check_kas from kas where un_id=new.un_id;
				if (check_kas >0) then
					select * into kas from kas where un_id=new.un_id limit 1;
					select count(*) into check_akun from akun where akun_kode=kas.akun_kode;
					if (check_akun>0) then
						--cek apakah sudah ada di je_details
						select count(*) into check_jd from je_details where akun_kode=kas.akun_kode and jm_id=current_jmid;
						if (check_jd>0) then
							update je_details set jd_debit=0,jd_credit=new.bd_nilai where akun_kode=kas.akun_kode and jm_id=current_jmid;
						else
						 	insert into je_details(jm_id,akun_kode,jd_desc,jd_debit,jd_credit)
							values(current_jmid,kas.akun_kode,'Belanja',0,new.bd_nilai);
						end if;
					end if;
					
				end if;
			end if;
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
			select * into kas from kas where un_id=master.un_id limit 1;
			select * into akun from akun where akun_kode=new.akun_kode limit 1;
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
		select * into kas from kas where un_id=master.un_id limit 1;
			--cek di balance
			select count(*) into check_bal from kas_balances where cb_refno=trim(master.bm_no||'-'||new.bd_id) and cb_refname='Belanja';
			select * into akun from akun where akun_kode=new.akun_kode;
			if (check_bal>0) then
			
				update kas_balances set afix=1, cb_debit=0,cb_credit=new.bd_nilai where akun_kode=new.akun_kode and cb_refno=trim(master.bm_no||'-'||new.bd_id) and cb_refname='Belanja';
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


--geser kas dari bank
CREATE OR REPLACE FUNCTION geser_kas_aft_ins3() RETURNS TRIGGER AS $$
DECLARE
	 
	bank record;
	kas record;
	check_bank integer;
	check_kas integer;
BEGIN
	select count(*) into check_bank from banks where un_id=new.un_id ;
	if (check_bank>0) then
	
		select * into bank from banks where un_id=new.un_id limit 1;
		if (new.gk_tipe=0) then
			insert into bank_balances(bank_norek, akun_kode,bb_debit,bb_credit, bb_realdate,bb_refno,bb_refname,bb_refmode,bb_desc)
				values(bank.bank_norek,'',0,new.gk_nilai,new.gk_tgl,new.gk_no,'Pergeseran Kas',0,'Pergeseran Kas, Bank ke Kas');
		else
			insert into bank_balances(bank_norek, akun_kode,bb_debit,bb_credit, bb_realdate,bb_refno,bb_refname,bb_refmode,bb_desc)
				values(bank.bank_norek,'',new.gk_nilai,0,new.gk_tgl,new.gk_no,'Pergeseran Kas',0,'Pergeseran Kas, Kas ke Bank');
		
		end if;
	end if;
	select count(*) into check_kas from kas where un_id=new.un_id;
	if (check_kas>0) then
		select * into kas from kas where un_id=new.un_id limit 1;
		if (new.gk_tipe=0) then
			insert into kas_balances(kas_kode, akun_kode,cb_debit,cb_credit, cb_realdate,cb_refno,cb_refname,cb_refmode,cb_desc)
				values(kas.kas_kode, '',new.gk_nilai,0,new.gk_tgl,new.gk_no,'Pergeseran Kas',0,'Pergeseran Kas, Bank ke Kas');
		else
			insert into kas_balances(kas_kode, akun_kode,cb_debit,cb_credit, cb_realdate,cb_refno,cb_refname,cb_refmode,cb_desc)
				values(kas.kas_kode, '',0,new.gk_nilai,new.gk_tgl,new.gk_no,'Pergeseran Kas',0,'Pergeseran Kas, Kas ke Bank');
		end if;
	end if;
	RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';
DROP TRIGGER IF EXISTS geser_kas_aft_ins3 ON geser_kas;
CREATE TRIGGER geser_kas_aft_ins3  AFTER INSERT ON geser_kas FOR EACH ROW  EXECUTE PROCEDURE geser_kas_aft_ins3();
 /*------------------------------ */



CREATE OR REPLACE FUNCTION geser_kas_aft_upd3() RETURNS TRIGGER AS $$
DECLARE
	 
	bank record;
	kas record;
	check_bank integer;
	check_bb integer;
	check_cb integer;
	check_kas integer;
BEGIN
	select count(*) into check_bank from banks where un_id=new.un_id ;
	if (check_bank>0) then
	
		select * into bank from banks where un_id=new.un_id limit 1;
		if (new.gk_tipe=0) then
			select count(*) into check_bb from bank_balances where  bb_refno=new.gk_id and bb_refname='Pergeseran Kas';
			if (check_bb>0) then
				update bank_balances set afix=1, bb_debit=0,bb_credit=new.gk_nilai where bb_refno=new.gk_id and bb_refname='Pergeseran Kas';
			else
				insert into bank_balances(bank_norek, akun_kode,bb_debit,bb_credit, bb_realdate,bb_refno,bb_refname,bb_refmode,bb_desc)
					values(bank.bank_norek,'',0,new.gk_nilai,new.gk_tgl,new.gk_id,'Pergeseran Kas',0,'Pergeseran Kas, Bank ke Kas');
				
			end if;
		else
			select count(*) into check_bb from bank_balances where  bb_refno=new.gk_id and bb_refname='Pergeseran Kas';
			if (check_bb>0) then
				update bank_balances set afix=1, bb_debit=new.gk_nilai,bb_credit=0 where bb_refno=new.gk_id and bb_refname='Pergeseran Kas';
			else
				insert into bank_balances(bank_norek, akun_kode,bb_debit,bb_credit, bb_realdate,bb_refno,bb_refname,bb_refmode,bb_desc)
				values(bank.bank_norek,'',new.gk_nilai,0,new.gk_tgl,new.gk_id,'Pergeseran Kas',0,'Pergeseran Kas, Kas ke Bank');
			end if;
		end if;
	end if;
	select count(*) into check_kas from kas where un_id=new.un_id;
	if (check_kas>0) then
		select * into kas from kas where un_id=new.un_id limit 1;
		if (new.gk_tipe=0) then
			select count(*) into check_cb from kas_balances where  cb_refno=new.gk_id and cb_refname='Pergeseran Kas';
			if (check_cb>0) then
				update kas_balances set afix=1, cb_debit=new.gk_nilai,cb_credit=0 where cb_refno=new.gk_id and cb_refname='Pergeseran Kas';
			else
				insert into kas_balances(kas_kode, akun_kode,cb_debit,cb_credit, cb_realdate,cb_refno,cb_refname,cb_refmode,cb_desc)
				values(kas.kas_kode, '',new.gk_nilai,0,new.gk_tgl,new.gk_id,'Pergeseran Kas',0,'Pergeseran Kas, Bank ke Kas');
			end if;				
		else
			select count(*) into check_cb from kas_balances where  cb_refno=new.gk_id and cb_refname='Pergeseran Kas';
			if (check_cb>0) then
				update kas_balances set afix=1, cb_credit=new.gk_nilai,cb_debit=0 where cb_refno=new.gk_id and cb_refname='Pergeseran Kas';
			else
				insert into kas_balances(kas_kode, akun_kode,cb_debit,cb_credit, cb_realdate,cb_refno,cb_refname,cb_refmode,cb_desc)
				values(kas.kas_kode, '',0,new.gk_nilai,new.gk_tgl,new.gk_id,'Pergeseran Kas',0,'Pergeseran Kas, Kas ke Bank');
			
			end if;
		end if;
	end if;
	RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';
DROP TRIGGER IF EXISTS geser_kas_aft_upd3 ON geser_kas;
CREATE TRIGGER geser_kas_aft_upd3  AFTER UPDATE ON geser_kas FOR EACH ROW  EXECUTE PROCEDURE geser_kas_aft_upd3();
 /*------------------------------ */