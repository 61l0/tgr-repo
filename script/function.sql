create or replace function fixAccBalDel1(aakun_kode varchar(30),aab_seq integer) returns varchar as $$
declare
	 
	last_balance numeric(22,4);
	ab_cursor refcursor;
	ab record;
	i integer;
	aakun_normal integer;
begin
	if (aab_seq=1) then
		last_balance:=0;
		i:=0;
	else 
		select ab_balance into last_balance from akun_bal1s where akun_kode=aakun_kode and ab_seq=aab_seq-1;
		i:=aab_seq-1;
		 
	end if;
	select akun_normal into aakun_normal from akun where akun_kode=aakun_kode;
	-- mengakses record2 dibawahnya 
	open ab_cursor for select * from akun_bal1s 
			where   akun_kode=aakun_kode and ab_seq>aab_seq  

			order by ab_realdate asc,ab_id asc;
	
	loop
	fetch ab_cursor into ab;
	exit when not found; 
		i:=i+1;
		if (aakun_normal=0) then
			last_balance:=last_balance+(coalesce(ab.ab_debit,0)-coalesce(ab.ab_credit,0));
		else 
			last_balance:=last_balance+(coalesce(ab.ab_credit,0)-coalesce(ab.ab_debit,0));
		end if;
		update akun_bal1s set ab_seq=i,ab_balance=last_balance where ab_id=ab.ab_id;
		
	end loop;
	close ab_cursor;
	return 'OK';
	
end;
$$ language 'plpgsql';
/* -------------------------- */
create or replace function fixAccBalSeq1(abb_id varchar(50)) returns varchar as $$
declare
	ab_cursor refcursor;
	ab record;
	i integer;
	last_balance numeric(22,4);
	  
	last_ab record;
begin
	 
	last_balance:=0;
 
	select * into last_ab from akun_bal1s where ab_id=abb_id;
	if (last_ab.afix=1) then
		update akun_bal1s set afix=0 where ab_id=abb_id;
		i:=last_ab.ab_seq;
		last_balance:=last_ab.ab_balance;
		-- mengakses record2 dibawahnya 
		open ab_cursor for select * from akun_bal1s 
				where   akun_kode=last_ab.akun_kode and ab_realdate>=last_ab.ab_realdate and ab_id > last_ab.ab_id
				order by ab_realdate asc,ab_id asc;
	
		loop
		fetch ab_cursor into ab;
		exit when not found; 
			i:=i+1;
			if (last_ab.akun_normal=0) then
				last_balance:=last_balance+(coalesce(ab.ab_debit,0)-coalesce(ab.ab_credit,0));
			else 
				last_balance:=last_balance+(coalesce(ab.ab_credit,0)-coalesce(ab.ab_debit,0));
			end if;
			update akun_bal1s set ab_seq=i,ab_balance=last_balance,afix=0 where ab_id=ab.ab_id;
		
		end loop;
		close ab_cursor;
	end if;
 
	return 'OK';
end;
$$ language 'plpgsql';
/*--------------------------------------*/


create or replace function fixAccBalDel2(aakun_kode varchar(30),aun_id varchar(30), aab_seq integer) returns varchar as $$
declare
	 
	last_balance numeric(22,4);
	ab_cursor refcursor;
	ab record;
	i integer;
	aakun_normal integer;
begin
	if (aab_seq=1) then
		last_balance:=0;
		i:=0;
	else 
		select ab_balance into last_balance from akun_bal2s where akun_kode=aakun_kode and un_id=aun_id and ab_seq=aab_seq-1;
		i:=aab_seq-1;
		 
	end if;
	select akun_normal into aakun_normal from akun where akun_kode=aakun_kode;
	-- mengakses record2 dibawahnya 
	open ab_cursor for select * from akun_bal2s 
			where   akun_kode=aakun_kode and ab_seq>aab_seq  

			order by ab_realdate asc,ab_id asc;
	
	loop
	fetch ab_cursor into ab;
	exit when not found; 
		i:=i+1;
		if (aakun_normal=0) then
			last_balance:=last_balance+(coalesce(ab.ab_debit,0)-coalesce(ab.ab_credit,0));
		else 
			last_balance:=last_balance+(coalesce(ab.ab_credit,0)-coalesce(ab.ab_debit,0));
		end if;
		update akun_bal2s set ab_seq=i,ab_balance=last_balance where ab_id=ab.ab_id;
		
	end loop;
	close ab_cursor;
	return 'OK';
	
end;
$$ language 'plpgsql';
/* -------------------------- */
create or replace function fixAccBalSeq2(abb_id varchar(50),aun_id varchar(30)) returns varchar as $$
declare
	ab_cursor refcursor;
	ab record;
	i integer;
	last_balance numeric(22,4);
	  
	last_ab record;
begin
	 
	last_balance:=0;
 
	select * into last_ab from akun_bal2s where ab_id=abb_id and un_id=aun_id;
	if (last_ab.afix=1) then
		update akun_bal2s set afix=0 where ab_id=abb_id;
		i:=last_ab.ab_seq;
		last_balance:=last_ab.ab_balance;
		-- mengakses record2 dibawahnya 
		open ab_cursor for select * from akun_bal2s 
				where   akun_kode=last_ab.akun_kode and un_id=aun_id and ab_realdate>=last_ab.ab_realdate and ab_id > last_ab.ab_id
				order by ab_realdate asc,ab_id asc;
	
		loop
		fetch ab_cursor into ab;
		exit when not found; 
			i:=i+1;
			if (last_ab.akun_normal=0) then
				last_balance:=last_balance+(coalesce(ab.ab_debit,0)-coalesce(ab.ab_credit,0));
			else 
				last_balance:=last_balance+(coalesce(ab.ab_credit,0)-coalesce(ab.ab_debit,0));
			end if;
			update akun_bal2s set ab_seq=i,ab_balance=last_balance,afix=0 where ab_id=ab.ab_id;
		
		end loop;
		close ab_cursor;
	end if;
	return 'OK';
end;
$$ language 'plpgsql';
/*--------------------------------------*/


create or replace function fixCashSeq(abb_id varchar(50)) returns varchar as $$
declare
	cb_cursor refcursor;
	cb record;
	i integer;
	last_balance numeric(22,4);
	  
	last_cb record;
begin
	 
	last_balance:=0;
 
	select * into last_cb from kas_balances where cb_id=abb_id;
	if (last_cb.afix=1) then
		update kas_balances set afix=0 where cb_id=abb_id;
		i:=last_cb.cb_seq;
		last_balance:=last_cb.cb_balance;
		-- mengakses record2 dibawahnya 
		open cb_cursor for select * from kas_balances 
				where   kas_kode=last_cb.kas_kode and cb_realdate>=last_cb.cb_realdate and cb_id > last_cb.cb_id
				order by cb_realdate asc,cb_id asc;
	
		loop
		fetch cb_cursor into cb;
		exit when not found; 
			i:=i+1;
			 
			last_balance:=last_balance+(coalesce(cb.cb_debit,0)-coalesce(cb.cb_credit,0));
		 
			update kas_balances set cb_seq=i,cb_balance=last_balance,afix=0 where cb_id=cb.cb_id;
		
		end loop;
		close cb_cursor;
	end if;
	return 'OK';
end;
$$ language 'plpgsql';
/*--------------------------------------*/

create or replace function fixCashDel(akas_kode varchar(30),aab_seq integer) returns varchar as $$
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
		select cb_balance into last_balance from kas_balances where kas_kode=akas_kode and cb_seq=aab_seq-1;
		i:=aab_seq-1;
		 
	end if;
	 
	-- mengakses record2 dibawahnya 
	open ab_cursor for select * from kas_balances 
			where   kas_kode=akas_kode and cb_seq>aab_seq  
 			order by cb_realdate asc,cb_id asc;
	
	loop
	fetch ab_cursor into ab;
	exit when not found; 
		i:=i+1;
	 	last_balance:=last_balance+(coalesce(ab.cb_debit,0)-coalesce(ab.cb_credit,0));
		 
		update kas_balances set cb_seq=i,cb_balance=last_balance where cb_id=ab.cb_id;
		
	end loop;
	close ab_cursor;
	return 'OK';
	
end;
$$ language 'plpgsql';
/* -------------------------- */


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
				order by bb_realdate asc,_bbid asc;
	
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
 			order by bb_realdate asc,_bbid asc;
	
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


create or replace function fixCashSeq2(abb_id varchar(50)) returns varchar as $$
declare
	cb_cursor refcursor;
	cb record;
	i integer;
	last_balance numeric(22,4);
	  
	last_cb record;
begin
	 
	last_balance:=0;
 
	select * into last_cb from subkas_balances where cb_id=abb_id;
	if (last_cb.afix=1) then
		update subkas_balances set afix=0 where cb_id=abb_id;
		i:=last_cb.cb_seq;
		last_balance:=last_cb.cb_balance;
		-- mengakses record2 dibawahnya 
		open cb_cursor for select * from subkas_balances 
				where   kas_kode=last_cb.kas_kode and cb_realdate>=last_cb.cb_realdate and cb_id > last_cb.cb_id
				order by cb_realdate asc,cb_id asc;
	
		loop
		fetch cb_cursor into cb;
		exit when not found; 
			i:=i+1;
			 
			last_balance:=last_balance+(coalesce(cb.cb_debit,0)-coalesce(cb.cb_credit,0));
		 
			update subkas_balances set cb_seq=i,cb_balance=last_balance,afix=0 where cb_id=cb.cb_id;
		
		end loop;
		close cb_cursor;
	end if;
	return 'OK';
end;
$$ language 'plpgsql';
/*--------------------------------------*/

create or replace function fixCashDel2(akas_kode varchar(30),aab_seq integer) returns varchar as $$
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
		select cb_balance into last_balance from subkas_balances where kas_kode=akas_kode and cb_seq=aab_seq-1;
		i:=aab_seq-1;
		 
	end if;
	 
	-- mengakses record2 dibawahnya 
	open ab_cursor for select * from subkas_balances 
			where   kas_kode=akas_kode and cb_seq>aab_seq  
 			order by cb_realdate asc,cb_id asc;
	
	loop
	fetch ab_cursor into ab;
	exit when not found; 
		i:=i+1;
	 	last_balance:=last_balance+(coalesce(ab.cb_debit,0)-coalesce(ab.cb_credit,0));
		 
		update subkas_balances set cb_seq=i,cb_balance=last_balance where cb_id=ab.cb_id;
		
	end loop;
	close ab_cursor;
	return 'OK';
	
end;
$$ language 'plpgsql';
/* -------------------------- */
