-- untuk   accounting

CREATE OR REPLACE FUNCTION akun_bal1s_bef_ins1() RETURNS TRIGGER AS $$
DECLARE
	old_balance		numeric(22,4);	
	rcount integer;
	last_seq integer;
	aab_id varchar(50);
	aab_seq integer;
	anormal int;
BEGIN
	 
	--mencari apakah ada record sebelum ini
	select into rcount count(ab_id) from akun_bal1s where akun_kode=new.akun_kode and ab_realdate<=new.ab_realdate and ab_id < new.ab_id;
	aab_id:='';
	select akun_normal into anormal from akun where akun_kode=new.akun_kode limit 1;
	if (rcount> 0) then -- bila ada
		-- ambil ab_seq terakhir sebelum yg ini  
		select into aab_seq coalesce(max(ab_seq),0) from akun_bal1s where akun_kode=new.akun_kode and ab_realdate<=new.ab_realdate and ab_id < new.ab_id;
		
		if (aab_seq >0 ) then
			select into old_balance,aab_seq coalesce(ab_balance,0),ab_seq from akun_bal1s where akun_kode=NEW.akun_kode and ab_seq=aab_seq;
			--cari tau normal nya si acc ini apa, debit apa credit
			
			
			IF (old_balance IS NOT NULL) THEN
				if (anormal=0) then
					NEW.ab_balance=old_balance+(coalesce(NEW.ab_debit,0)-coalesce(NEW.ab_credit,0));
				else NEW.ab_balance=old_balance+(coalesce(NEW.ab_credit,0)-coalesce(NEW.ab_debit,0));
				end if;
				new.ab_seq:=aab_seq+1;
			ELSE
				if (anormal=0) then
					NEW.ab_balance = (coalesce(NEW.ab_debit,0)-coalesce(NEW.ab_credit,0));
				else 
					NEW.ab_balance = (coalesce(NEW.ab_credit,0)-coalesce(NEW.ab_debit,0));
				end if;
				new.ab_seq:=1;
			END IF;
		else 
			--ini bila kosong
			if (anormal=0) then
				NEW.ab_balance = (coalesce(NEW.ab_debit,0)-coalesce(NEW.ab_credit,0));
			else 
				NEW.ab_balance = (coalesce(NEW.ab_credit,0)-coalesce(NEW.ab_debit,0));
			end if;
			new.ab_seq:=1;
		end if; 
		 
	else -- bila tidak ada
		if (anormal=0) then 
			NEW.ab_balance = (coalesce(NEW.ab_debit,0)-coalesce(NEW.ab_credit,0));
		else 
			NEW.ab_balance = (coalesce(NEW.ab_credit,0)-coalesce(NEW.ab_debit,0));
		end if;
		new.ab_seq:=1; 
	end if;
	new.afix=1;
	RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';
DROP TRIGGER IF EXISTS akun_bal1s_bef_ins1 ON akun_bal1s;
CREATE TRIGGER akun_bal1s_bef_ins1  BEFORE INSERT ON akun_bal1s FOR EACH ROW  EXECUTE PROCEDURE akun_bal1s_bef_ins1();
 /*------------------------------ */
 
 
CREATE OR REPLACE FUNCTION akun_bal1s_bef_upd1() RETURNS TRIGGER AS $$
DECLARE
	old_balance		numeric(22,4);	
	rcount integer;
	last_seq integer;
	aab_id varchar(50);
	aab_seq integer;
	anormal int;
	the_ab record;
	 
BEGIN
	if (new.afix=1) then
		 
			select into rcount count(ab_id) from akun_bal1s where akun_kode=new.akun_kode and ab_realdate<=new.ab_realdate and ab_id < new.ab_id;
		 
		aab_id:='';
		select akun_normal into anormal from akun where akun_kode=new.akun_kode limit 1;
		if (rcount> 0) then -- bila ada
			 
			 select into aab_seq coalesce(max(ab_seq),0) from akun_bal1s where akun_kode=new.akun_kode and ab_realdate<=new.ab_realdate and ab_id < new.ab_id;
		 
			if (aab_seq >0 ) then
				select into old_balance,aab_seq coalesce(ab_balance,0),ab_seq from akun_bal1s where akun_kode=NEW.akun_kode and ab_seq=aab_seq;
				--cari tau normal nya si acc ini apa, debit apa credit
				
				
				IF (old_balance IS NOT NULL) THEN
					if (anormal=0) then
						NEW.ab_balance=old_balance+(coalesce(NEW.ab_debit,0)-coalesce(NEW.ab_credit,0));
					else NEW.ab_balance=old_balance+(coalesce(NEW.ab_credit,0)-coalesce(NEW.ab_debit,0));
					end if;
					new.ab_seq:=aab_seq+1;
				ELSE
					if (anormal=0) then 
						NEW.ab_balance = (coalesce(NEW.ab_debit,0)-coalesce(NEW.ab_credit,0));
					else 
						NEW.ab_balance = (coalesce(NEW.ab_credit,0)-coalesce(NEW.ab_debit,0));
					end if;
					new.ab_seq:=1;
				END IF;
			else 
				--ini bila kosong
				if (anormal=0) then
					NEW.ab_balance = (coalesce(NEW.ab_debit,0)-coalesce(NEW.ab_credit,0));
				else 
					NEW.ab_balance = (coalesce(NEW.ab_credit,0)-coalesce(NEW.ab_debit,0));
				end if;
				new.ab_seq:=1;
			end if; 
			 
		else -- bila tidak ada
			if (anormal=0) then 
				NEW.ab_balance = (coalesce(NEW.ab_debit,0)-coalesce(NEW.ab_credit,0));
			else 
				NEW.ab_balance = (coalesce(NEW.ab_credit,0)-coalesce(NEW.ab_debit,0));
			end if;
			new.ab_seq:=1; 
		end if;
	end  if;
	RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';
DROP TRIGGER IF EXISTS akun_bal1s_bef_upd1 ON akun_bal1s;
CREATE TRIGGER akun_bal1s_bef_upd1  BEFORE UPDATE ON akun_bal1s FOR EACH ROW  EXECUTE PROCEDURE akun_bal1s_bef_upd1();
 /*------------------------------ */
 
 
CREATE OR REPLACE FUNCTION akun_bal1s_aft_ins1() RETURNS TRIGGER AS $$
DECLARE
	 
BEGIN
	--setelah diinsert yg baru apa yg terjadi, simak berikut ini
	perform fixAccBalSeq1(new.ab_id);
	RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';
DROP TRIGGER IF EXISTS akun_bal1s_aft_ins1 ON akun_bal1s;
CREATE TRIGGER akun_bal1s_aft_ins1  AFTER INSERT ON akun_bal1s FOR EACH ROW  EXECUTE PROCEDURE akun_bal1s_aft_ins1();
 /*------------------------------ */
 
 

 CREATE OR REPLACE FUNCTION akun_bal1s_aft_upd1() RETURNS TRIGGER AS $$
DECLARE
	 
BEGIN
	--setelah diinsert yg baru apa yg terjadi, simak berikut ini
	perform fixAccBalSeq1(new.ab_id);
	RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';
DROP TRIGGER IF EXISTS akun_bal1s_aft_upd1 ON akun_bal1s;
CREATE TRIGGER akun_bal1s_aft_upd1  AFTER UPDATE ON akun_bal1s FOR EACH ROW  EXECUTE PROCEDURE akun_bal1s_aft_upd1();

CREATE OR REPLACE FUNCTION akun_bal1s_aft_del1() RETURNS TRIGGER AS $$
DECLARE
	 
BEGIN
	--setelah didelete yg baru apa yg terjadi, simak berikut ini
	perform fixAccBalDel1(old.akun_kode,old.ab_seq);
	RETURN OLD;
END;
$$ LANGUAGE 'plpgsql';
DROP TRIGGER IF EXISTS akun_bal1s_aft_del1 ON akun_bal1s;
CREATE TRIGGER akun_bal1s_aft_del1  AFTER DELETE ON akun_bal1s FOR EACH ROW  EXECUTE PROCEDURE akun_bal1s_aft_del1();
 /*------------------------------ */




CREATE OR REPLACE FUNCTION je_master_bef_del1() RETURNS TRIGGER AS $$
	DECLARE
		
	BEGIN
		delete from je_details where jm_id=old.jm_id;
		RETURN OLD;
	END;
$$ LANGUAGE 'plpgsql';
DROP TRIGGER IF EXISTS je_master_bef_del1 ON je_masters;
CREATE TRIGGER je_master_bef_del1  BEFORE DELETE ON je_masters FOR EACH ROW  EXECUTE PROCEDURE je_master_bef_del1();
 /*------------------------------ */
 
CREATE OR REPLACE FUNCTION je_details_aft_ins1() RETURNS TRIGGER AS $$
	DECLARE
		 master record;
	BEGIN
		select *  into master from je_masters where jm_id=new.jm_id; 
		insert into akun_bal1s(un_id,akun_kode,ab_action,ab_debit,ab_credit, ab_realdate,ab_refno,ab_refname,ab_refmode,ab_desc)
		values(master.un_id,new.akun_kode,'J',new.jd_debit,new.jd_credit,master.jm_date,master.jm_no||'-'||new.jd_id,'Journal Entry',0,master.jm_note);
		insert into akun_bal2s(un_id,akun_kode,ab_action,ab_debit,ab_credit, ab_realdate,ab_refno,ab_refname,ab_refmode,ab_desc)
		values(master.un_id,new.akun_kode,'J',new.jd_debit,new.jd_credit,master.jm_date,master.jm_no||'-'||new.jd_id,'Journal Entry',0,master.jm_note);
		RETURN NEW;
	END;
$$ LANGUAGE 'plpgsql';
DROP TRIGGER IF EXISTS je_details_aft_ins1 ON je_details;
CREATE TRIGGER je_details_aft_ins1  AFTER INSERT ON je_details FOR EACH ROW  EXECUTE PROCEDURE je_details_aft_ins1();
 /*------------------------------ */
 
CREATE OR REPLACE FUNCTION je_details_aft_upd1() RETURNS TRIGGER AS $$
	DECLARE
		 master record;
		 rcount integer;
	BEGIN
		select *  into master from je_masters where jm_id=new.jm_id; 
		 --cari dulu di balance ada gak
		 -- kalau gak ada maka insert, supaya gak loss
		 select count(*) into rcount from akun_bal1s where ab_refno=(master.jm_no||'-'||new.jd_id);
		 if (rcount> 0 ) then
				update akun_bal1s set ab_desc=master.jm_note,ab_credit=new.jd_credit,ab_debit=new.jd_debit,ab_refmode=1,ab_realdate=master.jm_date,afix=1 
				where (ab_refno)=(master.jm_no||'-'||new.jd_id);
				update akun_bal2s set ab_desc=master.jm_note,ab_credit=new.jd_credit,ab_debit=new.jd_debit,ab_refmode=1,ab_realdate=master.jm_date,afix=1 
				where (ab_refno)=(master.jm_no||'-'||new.jd_id);
		 else
		 		insert into akun_bal1s(un_id,akun_kode,ab_action,ab_debit,ab_credit, ab_realdate,ab_refno,ab_refname,ab_refmode,ab_desc)
				values(master.un_id,new.akun_kode,'J',new.jd_debit,new.jd_credit,master.jm_date, (master.jm_no||'-'||new.jd_id),'Journal Entry',0,master.jm_note);
				insert into akun_bal2s(un_id,akun_kode,ab_action,ab_debit,ab_credit, ab_realdate,ab_refno,ab_refname,ab_refmode,ab_desc)
				values(master.un_id,new.akun_kode,'J',new.jd_debit,new.jd_credit,master.jm_date, (master.jm_no||'-'||new.jd_id),'Journal Entry',0,master.jm_note);
		 end if;
		RETURN NEW;
	END;
$$ LANGUAGE 'plpgsql';
DROP TRIGGER IF EXISTS je_details_aft_upd1 ON je_details;
CREATE TRIGGER je_details_aft_upd1  AFTER UPDATE ON je_details FOR EACH ROW  EXECUTE PROCEDURE je_details_aft_upd1();
 /*------------------------------ */
CREATE OR REPLACE FUNCTION je_details_aft_del1() RETURNS TRIGGER AS $$
	DECLARE
		 master record;
		 accbal record;
	BEGIN
		select *  into master from je_masters where jm_id=old.jm_id; 
		delete from akun_bal1s where ab_refno=master.jm_no||'-'||old.jd_id;
		delete from akun_bal2s where ab_refno=master.jm_no||'-'||old.jd_id;
		RETURN OLD;
	END;
$$ LANGUAGE 'plpgsql';
DROP TRIGGER IF EXISTS je_details_aft_del1 ON je_details;
CREATE TRIGGER je_details_aft_del1  AFTER DELETE ON je_details FOR EACH ROW  EXECUTE PROCEDURE je_details_aft_del1();
 /*------------------------------ */



CREATE OR REPLACE FUNCTION akun_bal2s_bef_ins1() RETURNS TRIGGER AS $$
DECLARE
	old_balance		numeric(22,4);	
	rcount integer;
	last_seq integer;
	aab_id varchar(50);
	aab_seq integer;
	anormal int;
BEGIN
	 
	--mencari apakah ada record sebelum ini
	select into rcount count(ab_id) from akun_bal2s where un_id=new.un_id and akun_kode=new.akun_kode and ab_realdate<=new.ab_realdate and ab_id < new.ab_id;
	aab_id:='';
	select akun_normal into anormal from akun where akun_kode=new.akun_kode limit 1;
	if (rcount> 0) then -- bila ada
		-- ambil ab_seq terakhir sebelum yg ini  
		select into aab_seq coalesce(max(ab_seq),0) from akun_bal2s where akun_kode=new.akun_kode and ab_realdate<=new.ab_realdate and ab_id < new.ab_id;
		
		if (aab_seq >0 ) then
			select into old_balance,aab_seq coalesce(ab_balance,0),ab_seq from akun_bal2s where akun_kode=NEW.akun_kode and un_id=new.un_id and ab_seq=aab_seq;
			--cari tau normal nya si acc ini apa, debit apa credit
			
			
			IF (old_balance IS NOT NULL) THEN
				if (anormal=0) then
					NEW.ab_balance=old_balance+(coalesce(NEW.ab_debit,0)-coalesce(NEW.ab_credit,0));
				else NEW.ab_balance=old_balance+(coalesce(NEW.ab_credit,0)-coalesce(NEW.ab_debit,0));
				end if;
				new.ab_seq:=aab_seq+1;
			ELSE
				if (anormal=0) then
					NEW.ab_balance = (coalesce(NEW.ab_debit,0)-coalesce(NEW.ab_credit,0));
				else 
					NEW.ab_balance = (coalesce(NEW.ab_credit,0)-coalesce(NEW.ab_debit,0));
				end if;
				new.ab_seq:=1;
			END IF;
		else 
			--ini bila kosong
			if (anormal=0) then
				NEW.ab_balance = (coalesce(NEW.ab_debit,0)-coalesce(NEW.ab_credit,0));
			else 
				NEW.ab_balance = (coalesce(NEW.ab_credit,0)-coalesce(NEW.ab_debit,0));
			end if;
			new.ab_seq:=1;
		end if; 
		 
	else -- bila tidak ada
		if (anormal=0) then 
			NEW.ab_balance = (coalesce(NEW.ab_debit,0)-coalesce(NEW.ab_credit,0));
		else 
			NEW.ab_balance = (coalesce(NEW.ab_credit,0)-coalesce(NEW.ab_debit,0));
		end if;
		new.ab_seq:=1; 
	end if;
	new.afix=1;
	RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';
DROP TRIGGER IF EXISTS akun_bal2s_bef_ins1 ON akun_bal2s;
CREATE TRIGGER akun_bal2s_bef_ins1  BEFORE INSERT ON akun_bal2s FOR EACH ROW  EXECUTE PROCEDURE akun_bal2s_bef_ins1();
 /*------------------------------ */
 
 
CREATE OR REPLACE FUNCTION akun_bal2s_bef_upd1() RETURNS TRIGGER AS $$
DECLARE
	old_balance		numeric(22,4);	
	rcount integer;
	last_seq integer;
	aab_id varchar(50);
	aab_seq integer;
	anormal int;
	the_ab record;
	 
BEGIN
	if (new.afix=1) then
		 
			select into rcount count(ab_id) from akun_bal2s where akun_kode=new.akun_kode and un_id=new.un_id and ab_realdate<=new.ab_realdate and ab_id < new.ab_id;
		 
		aab_id:='';
		select akun_normal into anormal from akun where akun_kode=new.akun_kode limit 1;
		if (rcount> 0) then -- bila ada
			 
			 select into aab_seq coalesce(max(ab_seq),0) from akun_bal2s where akun_kode=new.akun_kode and un_id=new.un_id and ab_realdate<=new.ab_realdate and ab_id < new.ab_id;
		 
			if (aab_seq >0 ) then
				select into old_balance,aab_seq coalesce(ab_balance,0),ab_seq from akun_bal2s where akun_kode=NEW.akun_kode and un_id=new.un_id and  ab_seq=aab_seq;
				--cari tau normal nya si acc ini apa, debit apa credit
				
				
				IF (old_balance IS NOT NULL) THEN
					if (anormal=0) then
						NEW.ab_balance=old_balance+(coalesce(NEW.ab_debit,0)-coalesce(NEW.ab_credit,0));
					else NEW.ab_balance=old_balance+(coalesce(NEW.ab_credit,0)-coalesce(NEW.ab_debit,0));
					end if;
					new.ab_seq:=aab_seq+1;
				ELSE
					if (anormal=0) then 
						NEW.ab_balance = (coalesce(NEW.ab_debit,0)-coalesce(NEW.ab_credit,0));
					else 
						NEW.ab_balance = (coalesce(NEW.ab_credit,0)-coalesce(NEW.ab_debit,0));
					end if;
					new.ab_seq:=1;
				END IF;
			else 
				--ini bila kosong
				if (anormal=0) then
					NEW.ab_balance = (coalesce(NEW.ab_debit,0)-coalesce(NEW.ab_credit,0));
				else 
					NEW.ab_balance = (coalesce(NEW.ab_credit,0)-coalesce(NEW.ab_debit,0));
				end if;
				new.ab_seq:=1;
			end if; 
			 
		else -- bila tidak ada
			if (anormal=0) then 
				NEW.ab_balance = (coalesce(NEW.ab_debit,0)-coalesce(NEW.ab_credit,0));
			else 
				NEW.ab_balance = (coalesce(NEW.ab_credit,0)-coalesce(NEW.ab_debit,0));
			end if;
			new.ab_seq:=1; 
		end if;
	end  if;
	RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';
DROP TRIGGER IF EXISTS akun_bal2s_bef_upd1 ON akun_bal2s;
CREATE TRIGGER akun_bal2s_bef_upd1  BEFORE UPDATE ON akun_bal2s FOR EACH ROW  EXECUTE PROCEDURE akun_bal2s_bef_upd1();
 /*------------------------------ */
 
 
CREATE OR REPLACE FUNCTION akun_bal2s_aft_ins1() RETURNS TRIGGER AS $$
DECLARE
	 
BEGIN
	--setelah diinsert yg baru apa yg terjadi, simak berikut ini
 perform fixAccBalSeq2(new.ab_id,new.un_id);
	RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';
DROP TRIGGER IF EXISTS akun_bal2s_aft_ins1 ON akun_bal2s;
CREATE TRIGGER akun_bal2s_aft_ins1  AFTER INSERT ON akun_bal2s FOR EACH ROW  EXECUTE PROCEDURE akun_bal2s_aft_ins1();
 /*------------------------------ */
 
 

 CREATE OR REPLACE FUNCTION akun_bal2s_aft_upd1() RETURNS TRIGGER AS $$
DECLARE
	 
BEGIN
	--setelah diinsert yg baru apa yg terjadi, simak berikut ini
	perform fixAccBalSeq2(new.ab_id,new.un_id);
	RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';
DROP TRIGGER IF EXISTS akun_bal2s_aft_upd1 ON akun_bal2s;
CREATE TRIGGER akun_bal2s_aft_upd1  AFTER UPDATE ON akun_bal2s FOR EACH ROW  EXECUTE PROCEDURE akun_bal2s_aft_upd1();

CREATE OR REPLACE FUNCTION akun_bal2s_aft_del1() RETURNS TRIGGER AS $$
DECLARE
	 
BEGIN
	--setelah didelete yg baru apa yg terjadi, simak berikut ini
	perform fixAccBalDel2(old.akun_kode,old.un_id,old.ab_seq);
	RETURN OLD;
END;
$$ LANGUAGE 'plpgsql';
DROP TRIGGER IF EXISTS akun_bal2s_aft_del1 ON akun_bal2s;
CREATE TRIGGER akun_bal2s_aft_del1  AFTER DELETE ON akun_bal2s FOR EACH ROW  EXECUTE PROCEDURE akun_bal2s_aft_del1();
 /*------------------------------ */


 

CREATE OR REPLACE FUNCTION kas_balances_bef_ins1() RETURNS TRIGGER AS $$
DECLARE
	 old_balance		numeric(22,4);	
	rcount integer;
	last_seq integer;
	acb_id varchar(50);
	acb_seq integer;
 
BEGIN
	--mencari apakah ada record sebelum ini
	select into rcount count(cb_id) from kas_balances where kas_kode=new.kas_kode and cb_realdate<=new.cb_realdate and cb_id < new.cb_id;
	acb_id:='';
	 
	if (rcount> 0) then -- bila ada
		-- ambil cb_seq terakhir sebelum yg ini  
		select into acb_seq coalesce(max(cb_seq),0) from kas_balances where kas_kode=new.kas_kode and cb_realdate<=new.cb_realdate and cb_id < new.cb_id;
		
		if (acb_seq >0 ) then
			select into old_balance,acb_seq coalesce(cb_balance,0),cb_seq from kas_balances where kas_kode=NEW.kas_kode and cb_seq=acb_seq;
			--cari tau normal nya si acc ini apa, debit apa credit
			
			
			IF (old_balance IS NOT NULL) THEN
			 
					NEW.cb_balance=old_balance+(coalesce(NEW.cb_debit,0)-coalesce(NEW.cb_credit,0));
			 
				new.cb_seq:=acb_seq+1;
			ELSE
				 
					NEW.cb_balance = (coalesce(NEW.cb_debit,0)-coalesce(NEW.cb_credit,0));
				 
				new.cb_seq:=1;
			END IF;
		else 
			 
				NEW.cb_balance = (coalesce(NEW.cb_debit,0)-coalesce(NEW.cb_credit,0));
			 
			new.cb_seq:=1;
		end if; 
		 
	else -- bila tidak ada
		 
			NEW.cb_balance = (coalesce(NEW.cb_debit,0)-coalesce(NEW.cb_credit,0));
		 
		new.cb_seq:=1; 
	end if;
	new.afix=1;
	RETURN NEW;
	
END;
$$ LANGUAGE 'plpgsql';
DROP TRIGGER IF EXISTS kas_balances_bef_ins1 ON kas_balances;
CREATE TRIGGER kas_balances_bef_ins1  BEFORE INSERT ON kas_balances FOR EACH ROW  EXECUTE PROCEDURE kas_balances_bef_ins1();
 /*------------------------------ */
 
CREATE OR REPLACE FUNCTION kas_balances_bef_upd1() RETURNS TRIGGER AS $$
DECLARE
	old_balance		numeric(22,4);	
	rcount integer;
	last_seq integer;
	acb_id varchar(50);
	acb_seq integer;
	anormal int;
	the_ab record;
	 
BEGIN
	if (new.afix=1) then
		 
			select into rcount count(cb_id) from kas_balances where kas_kode=new.kas_kode and cb_realdate<=new.cb_realdate and cb_id < new.cb_id;
		 
		acb_id:='';
		 
		if (rcount> 0) then -- bila ada
			 
			 select into acb_seq coalesce(max(cb_seq),0) from kas_balances where kas_kode=new.kas_kode and cb_realdate<=new.cb_realdate and cb_id < new.cb_id;
		 
			if (acb_seq >0 ) then
				select into old_balance,acb_seq coalesce(cb_balance,0),cb_seq from kas_balances where kas_kode=NEW.kas_kode and cb_seq=acb_seq;
				--cari tau normal nya si acc ini apa, debit apa credit
				
				
				IF (old_balance IS NOT NULL) THEN
			 
						NEW.cb_balance=old_balance+(coalesce(NEW.cb_debit,0)-coalesce(NEW.cb_credit,0));
					 
					new.cb_seq:=acb_seq+1;
				ELSE
					 
						NEW.cb_balance = (coalesce(NEW.cb_debit,0)-coalesce(NEW.cb_credit,0));
					 
					new.cb_seq:=1;
				END IF;
			else 
				 
					NEW.cb_balance = (coalesce(NEW.cb_debit,0)-coalesce(NEW.cb_credit,0));
				 
				new.cb_seq:=1;
			end if; 
			 
		else -- bila tidak ada
			 
				NEW.cb_balance = (coalesce(NEW.cb_debit,0)-coalesce(NEW.cb_credit,0));
			 
			new.cb_seq:=1; 
		end if;
	end  if;
	RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';
DROP TRIGGER IF EXISTS kas_balances_bef_upd1 ON kas_balances;
CREATE TRIGGER kas_balances_bef_upd1  BEFORE UPDATE ON kas_balances FOR EACH ROW  EXECUTE PROCEDURE kas_balances_bef_upd1();
 /*------------------------------ */
 
create or replace function kas_balances_aft_ins1() returns trigger as $$
 
begin
	 
	--setelah diinsert yg baru apa yg terjadi, simak berikut ini
	perform fixCashSeq(new.cb_id);
	RETURN NEW;
	 
end;
$$ language 'plpgsql';
DROP TRIGGER IF EXISTS kas_balances_aft_ins1 ON kas_balances;
CREATE TRIGGER kas_balances_aft_ins1  AFTER INSERT ON kas_balances FOR EACH ROW  EXECUTE PROCEDURE kas_balances_aft_ins1();
/*------------------------------------- */ 



 CREATE OR REPLACE FUNCTION kas_balances_aft_upd1() RETURNS TRIGGER AS $$
DECLARE
	 
BEGIN
	--setelah diinsert yg baru apa yg terjadi, simak berikut ini
	perform fixCashSeq(new.cb_id);
	RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';
DROP TRIGGER IF EXISTS kas_balances_aft_upd1 ON kas_balances;
CREATE TRIGGER kas_balances_aft_upd1  AFTER UPDATE ON kas_balances FOR EACH ROW  EXECUTE PROCEDURE kas_balances_aft_upd1();

CREATE OR REPLACE FUNCTION kas_balances_aft_del1() RETURNS TRIGGER AS $$
DECLARE
	 
BEGIN
	--setelah didelete yg baru apa yg terjadi, simak berikut ini
	perform fixCashDel(old.kas_kode,old.cb_seq);
	RETURN OLD;
END;
$$ LANGUAGE 'plpgsql';
DROP TRIGGER IF EXISTS kas_balances_aft_del1 ON kas_balances;
CREATE TRIGGER kas_balances_aft_del1  AFTER DELETE ON kas_balances FOR EACH ROW  EXECUTE PROCEDURE kas_balances_aft_del1();
 /*------------------------------ */
 



CREATE OR REPLACE FUNCTION bank_balances_bef_ins1() RETURNS TRIGGER AS $$
DECLARE
	 old_balance		numeric(22,4);	
	rcount integer;
	last_seq integer;
	abb_id varchar(50);
	abb_seq integer;
 
BEGIN
	--mencari apakah ada record sebelum ini
	select into rcount count(bb_id) from bank_balances where bank_norek=new.bank_norek and bb_realdate<=new.bb_realdate and bb_id < new.bb_id;
	abb_id:='';
	 
	if (rcount> 0) then -- bila ada
		-- ambil bb_seq terakhir sebelum yg ini  
		select into abb_seq coalesce(max(bb_seq),0) from bank_balances where bank_norek=new.bank_norek and bb_realdate<=new.bb_realdate and bb_id < new.bb_id;
		
		if (abb_seq >0 ) then
			select into old_balance,abb_seq coalesce(bb_balance,0),bb_seq from bank_balances where bank_norek=NEW.bank_norek and bb_seq=abb_seq;
			--cari tau normal nya si acc ini apa, debit apa credit
			
			
			IF (old_balance IS NOT NULL) THEN
			 
					NEW.bb_balance=old_balance+(coalesce(NEW.bb_debit,0)-coalesce(NEW.bb_credit,0));
			 
				new.bb_seq:=abb_seq+1;
			ELSE
				 
					NEW.bb_balance = (coalesce(NEW.bb_debit,0)-coalesce(NEW.bb_credit,0));
				 
				new.bb_seq:=1;
			END IF;
		else 
			 
				NEW.bb_balance = (coalesce(NEW.bb_debit,0)-coalesce(NEW.bb_credit,0));
			 
			new.bb_seq:=1;
		end if; 
		 
	else -- bila tidak ada
		 
			NEW.bb_balance = (coalesce(NEW.bb_debit,0)-coalesce(NEW.bb_credit,0));
		 
		new.bb_seq:=1; 
	end if;
	new.afix=1;
	RETURN NEW;
	
END;
$$ LANGUAGE 'plpgsql';
DROP TRIGGER IF EXISTS bank_balances_bef_ins1 ON bank_balances;
CREATE TRIGGER bank_balances_bef_ins1  BEFORE INSERT ON bank_balances FOR EACH ROW  EXECUTE PROCEDURE bank_balances_bef_ins1();
 /*------------------------------ */
 
CREATE OR REPLACE FUNCTION bank_balances_bef_upd1() RETURNS TRIGGER AS $$
DECLARE
	old_balance		numeric(22,4);	
	rcount integer;
	last_seq integer;
	abb_id varchar(50);
	abb_seq integer;
	anormal int;
	the_ab record;
	 
BEGIN
	if (new.afix=1) then
		 
			select into rcount count(bb_id) from bank_balances where bank_norek=new.bank_norek and bb_realdate<=new.bb_realdate and bb_id < new.bb_id;
		 
		abb_id:='';
		 
		if (rcount> 0) then -- bila ada
			 
			 select into abb_seq coalesce(max(bb_seq),0) from bank_balances where bank_norek=new.bank_norek and bb_realdate<=new.bb_realdate and bb_id < new.bb_id;
		 
			if (abb_seq >0 ) then
				select into old_balance,abb_seq coalesce(bb_balance,0),bb_seq from bank_balances where bank_norek=NEW.bank_norek and bb_seq=abb_seq;
				--cari tau normal nya si acc ini apa, debit apa credit
				
				
				IF (old_balance IS NOT NULL) THEN
			 
						NEW.bb_balance=old_balance+(coalesce(NEW.bb_debit,0)-coalesce(NEW.bb_credit,0));
					 
					new.bb_seq:=abb_seq+1;
				ELSE
					 
						NEW.bb_balance = (coalesce(NEW.bb_debit,0)-coalesce(NEW.bb_credit,0));
					 
					new.bb_seq:=1;
				END IF;
			else 
				 
					NEW.bb_balance = (coalesce(NEW.bb_debit,0)-coalesce(NEW.bb_credit,0));
				 
				new.bb_seq:=1;
			end if; 
			 
		else -- bila tidak ada
			 
				NEW.bb_balance = (coalesce(NEW.bb_debit,0)-coalesce(NEW.bb_credit,0));
			 
			new.bb_seq:=1; 
		end if;
	end  if;
	RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';
DROP TRIGGER IF EXISTS bank_balances_bef_upd1 ON bank_balances;
CREATE TRIGGER bank_balances_bef_upd1  BEFORE UPDATE ON bank_balances FOR EACH ROW  EXECUTE PROCEDURE bank_balances_bef_upd1();
 /*------------------------------ */
 
create or replace function bank_balances_aft_ins1() returns trigger as $$
 
begin
	 
	--setelah diinsert yg baru apa yg terjadi, simak berikut ini
	perform fixBankSeq(new.bb_id);
	RETURN NEW;
	 
end;
$$ language 'plpgsql';
DROP TRIGGER IF EXISTS bank_balances_aft_ins1 ON bank_balances;
CREATE TRIGGER bank_balances_aft_ins1  AFTER INSERT ON bank_balances FOR EACH ROW  EXECUTE PROCEDURE bank_balances_aft_ins1();
/*------------------------------------- */ 



 CREATE OR REPLACE FUNCTION bank_balances_aft_upd1() RETURNS TRIGGER AS $$
DECLARE
	 
BEGIN
	--setelah diinsert yg baru apa yg terjadi, simak berikut ini
	perform fixBankSeq(new.bb_id);
	RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';
DROP TRIGGER IF EXISTS bank_balances_aft_upd1 ON bank_balances;
CREATE TRIGGER bank_balances_aft_upd1  AFTER UPDATE ON bank_balances FOR EACH ROW  EXECUTE PROCEDURE bank_balances_aft_upd1();

CREATE OR REPLACE FUNCTION bank_balances_aft_del1() RETURNS TRIGGER AS $$
DECLARE
	 
BEGIN
	--setelah didelete yg baru apa yg terjadi, simak berikut ini
	perform fixBankDel(old.bank_norek,old.bb_seq);
	RETURN OLD;
END;
$$ LANGUAGE 'plpgsql';
DROP TRIGGER IF EXISTS bank_balances_aft_del1 ON bank_balances;
CREATE TRIGGER bank_balances_aft_del1  AFTER DELETE ON bank_balances FOR EACH ROW  EXECUTE PROCEDURE bank_balances_aft_del1();
 /*------------------------------ */
 

CREATE OR REPLACE FUNCTION subkas_balances_bef_ins1() RETURNS TRIGGER AS $$
DECLARE
	 old_balance		numeric(22,4);	
	rcount integer;
	last_seq integer;
	acb_id varchar(50);
	acb_seq integer;
 
BEGIN
	--mencari apakah ada record sebelum ini
	select into rcount count(cb_id) from subkas_balances where kas_kode=new.kas_kode and cb_realdate<=new.cb_realdate and cb_id < new.cb_id;
	acb_id:='';
	 
	if (rcount> 0) then -- bila ada
		-- ambil cb_seq terakhir sebelum yg ini  
		select into acb_seq coalesce(max(cb_seq),0) from subkas_balances where kas_kode=new.kas_kode and cb_realdate<=new.cb_realdate and cb_id < new.cb_id;
		
		if (acb_seq >0 ) then
			select into old_balance,acb_seq coalesce(cb_balance,0),cb_seq from subkas_balances where kas_kode=NEW.kas_kode and cb_seq=acb_seq;
			--cari tau normal nya si acc ini apa, debit apa credit
			
			
			IF (old_balance IS NOT NULL) THEN
			 
					NEW.cb_balance=old_balance+(coalesce(NEW.cb_debit,0)-coalesce(NEW.cb_credit,0));
			 
				new.cb_seq:=acb_seq+1;
			ELSE
				 
					NEW.cb_balance = (coalesce(NEW.cb_debit,0)-coalesce(NEW.cb_credit,0));
				 
				new.cb_seq:=1;
			END IF;
		else 
			 
				NEW.cb_balance = (coalesce(NEW.cb_debit,0)-coalesce(NEW.cb_credit,0));
			 
			new.cb_seq:=1;
		end if; 
		 
	else -- bila tidak ada
		 
			NEW.cb_balance = (coalesce(NEW.cb_debit,0)-coalesce(NEW.cb_credit,0));
		 
		new.cb_seq:=1; 
	end if;
	new.afix=1;
	RETURN NEW;
	
END;
$$ LANGUAGE 'plpgsql';
DROP TRIGGER IF EXISTS subkas_balances_bef_ins1 ON subkas_balances;
CREATE TRIGGER subkas_balances_bef_ins1  BEFORE INSERT ON subkas_balances FOR EACH ROW  EXECUTE PROCEDURE subkas_balances_bef_ins1();
 /*------------------------------ */
 
CREATE OR REPLACE FUNCTION subkas_balances_bef_upd1() RETURNS TRIGGER AS $$
DECLARE
	old_balance		numeric(22,4);	
	rcount integer;
	last_seq integer;
	acb_id varchar(50);
	acb_seq integer;
	anormal int;
	the_ab record;
	 
BEGIN
	if (new.afix=1) then
		 
			select into rcount count(cb_id) from subkas_balances where kas_kode=new.kas_kode and cb_realdate<=new.cb_realdate and cb_id < new.cb_id;
		 
		acb_id:='';
		 
		if (rcount> 0) then -- bila ada
			 
			 select into acb_seq coalesce(max(cb_seq),0) from subkas_balances where kas_kode=new.kas_kode and cb_realdate<=new.cb_realdate and cb_id < new.cb_id;
		 
			if (acb_seq >0 ) then
				select into old_balance,acb_seq coalesce(cb_balance,0),cb_seq from subkas_balances where kas_kode=NEW.kas_kode and cb_seq=acb_seq;
				--cari tau normal nya si acc ini apa, debit apa credit
				
				
				IF (old_balance IS NOT NULL) THEN
			 
						NEW.cb_balance=old_balance+(coalesce(NEW.cb_debit,0)-coalesce(NEW.cb_credit,0));
					 
					new.cb_seq:=acb_seq+1;
				ELSE
					 
						NEW.cb_balance = (coalesce(NEW.cb_debit,0)-coalesce(NEW.cb_credit,0));
					 
					new.cb_seq:=1;
				END IF;
			else 
				 
					NEW.cb_balance = (coalesce(NEW.cb_debit,0)-coalesce(NEW.cb_credit,0));
				 
				new.cb_seq:=1;
			end if; 
			 
		else -- bila tidak ada
			 
				NEW.cb_balance = (coalesce(NEW.cb_debit,0)-coalesce(NEW.cb_credit,0));
			 
			new.cb_seq:=1; 
		end if;
	end  if;
	RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';
DROP TRIGGER IF EXISTS subkas_balances_bef_upd1 ON subkas_balances;
CREATE TRIGGER subkas_balances_bef_upd1  BEFORE UPDATE ON subkas_balances FOR EACH ROW  EXECUTE PROCEDURE subkas_balances_bef_upd1();
 /*------------------------------ */
 
create or replace function subkas_balances_aft_ins1() returns trigger as $$
 
begin
	 
	--setelah diinsert yg baru apa yg terjadi, simak berikut ini
	perform fixCashSeq2(new.cb_id);
	RETURN NEW;
	 
end;
$$ language 'plpgsql';
DROP TRIGGER IF EXISTS subkas_balances_aft_ins1 ON subkas_balances;
CREATE TRIGGER subkas_balances_aft_ins1  AFTER INSERT ON subkas_balances FOR EACH ROW  EXECUTE PROCEDURE subkas_balances_aft_ins1();
/*------------------------------------- */ 



 CREATE OR REPLACE FUNCTION subkas_balances_aft_upd1() RETURNS TRIGGER AS $$
DECLARE
	 
BEGIN
	--setelah diinsert yg baru apa yg terjadi, simak berikut ini
	perform fixCashSeq2(new.cb_id);
	RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';
DROP TRIGGER IF EXISTS subkas_balances_aft_upd1 ON subkas_balances;
CREATE TRIGGER subkas_balances_aft_upd1  AFTER UPDATE ON subkas_balances FOR EACH ROW  EXECUTE PROCEDURE subkas_balances_aft_upd1();

CREATE OR REPLACE FUNCTION subkas_balances_aft_del1() RETURNS TRIGGER AS $$
DECLARE
	 
BEGIN
	--setelah didelete yg baru apa yg terjadi, simak berikut ini
	perform fixCashDel2(old.kas_kode,old.cb_seq);
	RETURN OLD;
END;
$$ LANGUAGE 'plpgsql';
DROP TRIGGER IF EXISTS subkas_balances_aft_del1 ON subkas_balances;
CREATE TRIGGER subkas_balances_aft_del1  AFTER DELETE ON subkas_balances FOR EACH ROW  EXECUTE PROCEDURE subkas_balances_aft_del1();
 /*------------------------------ */
 
