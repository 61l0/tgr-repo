--trigger for posting journal, kas,
CREATE OR REPLACE FUNCTION belanja_masters_aft_ins3() RETURNS TRIGGER AS $$
DECLARE
	check_master integer;
	check_kas	integer;
	check_akun 	integer;
	kas record;
BEGIN
	select  count(*) into check_master from je_masters where jm_refno=new.bm_no and jm_refname='belanja_masters';
	if (check_master<=0) then
	 	if (new.bm_tot>0) then
			insert into je_masters(jm_type,un_id,jm_date, jm_totaldebit,jm_totalcredit,jm_refno,jm_refname,jm_note)
			values(1,new.un_id,current_date,new.bm_tot-new.bm_totpot,0,new.bm_no,'belanja_masters','Belanja');
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


CREATE OR REPLACE FUNCTION belanja_detail1s_aft_ins3() RETURNS TRIGGER AS $$
DECLARE
	master record;
	check_akun integer;
	kas record;
	akun record;
	ajm_id	varchar(50);
BEGIN
	if (new.bd_nilai > 0) then
		select * into master from belanja_masters where bm_id=new.bm_id;
		
		--cek kas SKPD,
		select count(*) into check_akun from akun where akun_kode=(select akun_kode from potongan where ptg_kode=new.ptg_kode);
		if (check_akun>0) then
			select * into akun from akun where akun_kode=(select akun_kode from potongan where ptg_kode=new.ptg_kode);
			
		 	---masukkan ke jurnal detail
		 	--ambil jm_id
		 	
			select jm_id into ajm_id from je_masters where jm_refno=master.bm_no and jm_refname='belanja_masters';
			if (ajm_id is not null) then
	  			insert into je_details(jm_id,akun_kode,jd_desc,jd_debit,jd_credit)
				values(ajm_id,new.akun_kode,'Potongan Belanja',0,new.bd_nilai);
			end if;
		end if;
	end if;
	RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';
DROP TRIGGER IF EXISTS belanja_detail1s_aft_ins3 ON belanja_detail1s;
CREATE TRIGGER belanja_detail1s_aft_ins3  AFTER INSERT ON belanja_detail1s FOR EACH ROW  EXECUTE PROCEDURE belanja_detail1s_aft_ins3();
 /*------------------------------ */


CREATE OR REPLACE FUNCTION belanja_detail1s_aft_upd3() RETURNS TRIGGER AS $$
DECLARE
	master record;
	check_akun integer;
	kas record;
	akun record;
	ajm_id	varchar(50);
	check_jd integer;
BEGIN
	if (new.bd_nilai > 0) then
		select * into master from belanja_masters where bm_id=new.bm_id;
		
		--cek kas SKPD,
		select count(*) into check_akun from akun where akun_kode=(select akun_kode from potongan where ptg_kode=new.ptg_kode);
		if (check_akun>0) then
			select * into akun from akun where akun_kode=(select akun_kode from potongan where ptg_kode=new.ptg_kode);
			
		 	---masukkan ke jurnal detail
		 	--ambil jm_id
		 	
			select jm_id into ajm_id from je_masters where jm_refno=master.bm_no and jm_refname='belanja_masters';
			if (ajm_id is not null) then
				select count(*) into check_jd from je_details where jm_id=ajm_id and akun_kode=akun.akun_kode;
				if (check_jd>0) then
					update je_details set jd_debit=0,jd_credit=new.bd_nilai where jm_id=ajm_id and akun_kode=akun.akun_kode;
				else
	  				insert into je_details(jm_id,akun_kode,jd_desc,jd_debit,jd_credit)
					values(ajm_id,akun.akun_kode,'Potongan Belanja',0,new.bd_nilai);
				end if;
			end if;
		end if;
		
	end if;
	RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';
DROP TRIGGER IF EXISTS belanja_detail1s_aft_upd3 ON belanja_detail1s;
CREATE TRIGGER belanja_detail1s_aft_upd3  AFTER UPDATE ON belanja_detail1s FOR EACH ROW  EXECUTE PROCEDURE belanja_detail1s_aft_upd3();
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

--trigger for posting gaji
CREATE OR REPLACE FUNCTION gaji_masters_aft_ins3() RETURNS TRIGGER AS $$
DECLARE
	check_master integer;
	
BEGIN
	select  count(*) into check_master from je_masters where jm_refno=new.gm_no and jm_refname='gaji_masters';
	if (check_master<=0) then
	 	if (new.gm_bulat>0) then
			insert into je_masters(jm_type,un_id,jm_date, jm_totaldebit,jm_totalcredit,jm_refno,jm_refname,jm_note)
			values(1,new.un_id,current_date,new.gm_bulat,0,new.gm_no,'gaji_masters','Gaji');
			
		end if;		
	end if;
	RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';
DROP TRIGGER IF EXISTS gaji_masters_aft_ins3 ON gaji_masters;
CREATE TRIGGER gaji_masters_aft_ins3  AFTER INSERT ON gaji_masters FOR EACH ROW  EXECUTE PROCEDURE gaji_masters_aft_ins3();
 /*------------------------------ */


CREATE OR REPLACE FUNCTION gaji_masters_aft_upd3() RETURNS TRIGGER AS $$
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
		if (new.gm_bulat>0) then 
			insert into je_masters(jm_type,jm_date,un_id, jm_totaldebit,jm_totalcredit,jm_refno,jm_refname,jm_note)
			values(1,current_date,new.un_id,new.gm_bulat,0,new.gm_no,'gaji_masters','Gaji');
		end if;
	else
		if (new.bm_bulat>0) then
			update je_masters set jm_totaldebit=new.gm_total where jm_refno=new.gm_no and jm_refname='gaji_masters';
		end if;	
	end if;
	
	RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';
DROP TRIGGER IF EXISTS gaji_masters_aft_upd3 ON gaji_masters;
CREATE TRIGGER gaji_masters_aft_upd3  AFTER UPDATE ON gaji_masters FOR EACH ROW  EXECUTE PROCEDURE gaji_masters_aft_upd3();



CREATE OR REPLACE FUNCTION gaji_detail1s_aft_ins3() RETURNS TRIGGER AS $$
DECLARE
	master record;
	check_kas integer;
	kas record;
	akun record;
	ajm_id	varchar(50);
BEGIN
	if (new.gd_nilai > 0) then
		select * into master from gaji_masters where gm_id=new.gm_id;
		 	---masukkan ke jurnal detail
		 	--ambil jm_id
			select jm_id into ajm_id from je_masters where jm_refno=master.gm_no and jm_refname='gaji_masters';
			if (ajm_id is not null) then
	  			insert into je_details(jm_id,akun_kode,jd_desc,jd_debit,jd_credit)
				values(ajm_id,new.akun_kode,'Gaji',new.gd_nilai,0);
			end if;
		
	end if;
	RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';
DROP TRIGGER IF EXISTS gaji_detail1s_aft_ins3 ON gaji_detail1s;
CREATE TRIGGER gaji_detail1s_aft_ins3  AFTER INSERT ON gaji_detail1s FOR EACH ROW  EXECUTE PROCEDURE gaji_detail1s_aft_ins3();
 /*------------------------------ */

CREATE OR REPLACE FUNCTION gaji_detail1s_aft_upd3() RETURNS TRIGGER AS $$
DECLARE
	master record;
	check_kas integer;
	check_bal	integer;
	check_jd	integer;
	kas record;
	ajm_id	varchar(50);
	akun record;
BEGIN
	if (new.gd_nilai > 0) then
	select * into master from gaji_masters where gm_id=new.gm_id;
	
	 	---masukkan ke jurnal detail
	 	--ambil jm_id
		select jm_id into ajm_id from je_masters where jm_refno=master.gm_no and jm_refname='gaji_masters';
		if (ajm_id is not null) then
  		
			--cek apakah sudah ada di jurnal detail
			select count(*) into check_jd from je_details where akun_kode=new.akun_kode and jm_id=ajm_id;
			if (check_jd<=0 )then
				insert into je_details(jm_id,akun_kode,jd_desc,jd_debit,jd_credit)
				values(ajm_id,new.akun_kode,'Gaji',new.gd_nilai,0);
			else
				update je_details set jd_debit=new.gd_nilai where akun_kode=new.akun_kode and jm_id=ajm_id;
			end if;
		end if;
	
	end if;
	RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';
DROP TRIGGER IF EXISTS gaji_detail1s_aft_upd3 ON gaji_detail1s;
CREATE TRIGGER gaji_detail1s_aft_upd3  AFTER UPDATE ON gaji_detail1s FOR EACH ROW  EXECUTE PROCEDURE gaji_detail1s_aft_upd3();
 /*------------------------------ */

