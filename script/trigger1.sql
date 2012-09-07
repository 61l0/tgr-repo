CREATE OR REPLACE FUNCTION keg_units_bef_ins0() RETURNS TRIGGER AS $$
	 
	BEGIN
		 
		if (new.ku_id is null or new.ku_id='0') then
			new.ku_id :=   trim(to_char(nextval('keg_units_ku_id_seq'),'0000000000')); 
		end if;
		RETURN NEW;
	END;
$$ LANGUAGE 'plpgsql';
DROP TRIGGER IF EXISTS keg_units_bef_ins0 on keg_units;
CREATE TRIGGER keg_units_bef_ins0  BEFORE INSERT ON keg_units FOR EACH ROW  EXECUTE PROCEDURE keg_units_bef_ins0();


CREATE OR REPLACE FUNCTION dpa_details_bef_ins0() RETURNS TRIGGER AS $$
	 
	BEGIN
		 
		if (new.dpad_id is null or new.dpad_id='0') then
			new.dpad_id :=   trim(to_char(nextval('dpa_details_dpad_id_seq'),'0000000000')); 
		end if;
		RETURN NEW;
	END;
$$ LANGUAGE 'plpgsql';
DROP TRIGGER IF EXISTS dpa_details_bef_ins0 on dpa_details;
CREATE TRIGGER dpa_details_bef_ins0  BEFORE INSERT ON dpa_details FOR EACH ROW  EXECUTE PROCEDURE dpa_details_bef_ins0();



CREATE OR REPLACE FUNCTION spdper_masters_bef_ins0() RETURNS TRIGGER AS $$
	 
	BEGIN
		 
		if (new.spdm_id is null or new.spdm_id='0') then
			new.spdm_id :=   trim(to_char(nextval('spdper_masters_spdm_id_seq'),'0000000000')); 
		end if;
		RETURN NEW;
	END;
$$ LANGUAGE 'plpgsql';
DROP TRIGGER IF EXISTS spdper_masters_bef_ins0 on spdper_masters;
CREATE TRIGGER spdper_masters_bef_ins0  BEFORE INSERT ON spdper_masters FOR EACH ROW  EXECUTE PROCEDURE spdper_masters_bef_ins0();


CREATE OR REPLACE FUNCTION spdper_detail0s_bef_ins0() RETURNS TRIGGER AS $$
	 
	BEGIN
		 
		if (new.spdd_id is null or new.spdd_id='0') then
			new.spdd_id :=   trim(to_char(nextval('spdper_detail0s_spdd_id_seq'),'0000000000')); 
		end if;
		RETURN NEW;
	END;
$$ LANGUAGE 'plpgsql';
DROP TRIGGER IF EXISTS spdper_detail0s_bef_ins0 on spdper_detail0s;
CREATE TRIGGER spdper_detail0s_bef_ins0  BEFORE INSERT ON spdper_detail0s FOR EACH ROW  EXECUTE PROCEDURE spdper_detail0s_bef_ins0();


CREATE OR REPLACE FUNCTION spdper_detail1s_bef_ins0() RETURNS TRIGGER AS $$
	 
	BEGIN
		 
		if (new.spdd_id is null or new.spdd_id='0') then
			new.spdd_id :=   trim(to_char(nextval('spdper_detail1s_spdd_id_seq'),'0000000000')); 
		end if;
		RETURN NEW;
	END;
$$ LANGUAGE 'plpgsql';
DROP TRIGGER IF EXISTS spdper_detail1s_bef_ins0 on spdper_detail1s;
CREATE TRIGGER spdper_detail1s_bef_ins0  BEFORE INSERT ON spdper_detail1s FOR EACH ROW  EXECUTE PROCEDURE spdper_detail1s_bef_ins0();


CREATE OR REPLACE FUNCTION spdper_detail2s_bef_ins0() RETURNS TRIGGER AS $$
	 
	BEGIN
		 
		if (new.spdd_id is null or new.spdd_id='0') then
			new.spdd_id :=   trim(to_char(nextval('spdper_detail2s_spdd_id_seq'),'0000000000')); 
		end if;
		RETURN NEW;
	END;
$$ LANGUAGE 'plpgsql';
DROP TRIGGER IF EXISTS spdper_detail2s_bef_ins0 on spdper_detail2s;
CREATE TRIGGER spdper_detail2s_bef_ins0  BEFORE INSERT ON spdper_detail2s FOR EACH ROW  EXECUTE PROCEDURE spdper_detail2s_bef_ins0();




CREATE OR REPLACE FUNCTION spd_masters_bef_ins0() RETURNS TRIGGER AS $$
	 
	BEGIN
		 
		if (new.spdm_id is null or new.spdm_id='0') then
			new.spdm_id :=   trim(to_char(nextval('spd_masters_spdm_id_seq'),'0000000000')); 
		end if;
		RETURN NEW;
	END;
$$ LANGUAGE 'plpgsql';
DROP TRIGGER IF EXISTS spd_masters_bef_ins0 on spd_masters;
CREATE TRIGGER spd_masters_bef_ins0  BEFORE INSERT ON spd_masters FOR EACH ROW  EXECUTE PROCEDURE spd_masters_bef_ins0();

CREATE OR REPLACE FUNCTION spd_detail0s_bef_ins0() RETURNS TRIGGER AS $$
	 
	BEGIN
		 
		if (new.spdd_id is null or new.spdd_id='0') then
			new.spdd_id :=   trim(to_char(nextval('spd_detail0s_spdd_id_seq'),'0000000000')); 
		end if;
		RETURN NEW;
	END;
$$ LANGUAGE 'plpgsql';
DROP TRIGGER IF EXISTS spd_detail0s_bef_ins0 on spd_detail0s;
CREATE TRIGGER spd_detail0s_bef_ins0  BEFORE INSERT ON spd_detail0s FOR EACH ROW  EXECUTE PROCEDURE spd_detail0s_bef_ins0();



CREATE OR REPLACE FUNCTION spd_detail1s_bef_ins0() RETURNS TRIGGER AS $$
	 
	BEGIN
		 
		if (new.spdd_id is null or new.spdd_id='0') then
			new.spdd_id :=   trim(to_char(nextval('spd_detail1s_spdd_id_seq'),'0000000000')); 
		end if;
		RETURN NEW;
	END;
$$ LANGUAGE 'plpgsql';
DROP TRIGGER IF EXISTS spd_detail1s_bef_ins0 on spd_detail1s;
CREATE TRIGGER spd_detail1s_bef_ins0  BEFORE INSERT ON spd_detail1s FOR EACH ROW  EXECUTE PROCEDURE spd_detail1s_bef_ins0();


CREATE OR REPLACE FUNCTION spd_detail2s_bef_ins0() RETURNS TRIGGER AS $$
	 
	BEGIN
		 
		if (new.spdd_id is null or new.spdd_id='0') then
			new.spdd_id :=   trim(to_char(nextval('spd_detail2s_spdd_id_seq'),'0000000000')); 
		end if;
		RETURN NEW;
	END;
$$ LANGUAGE 'plpgsql';
DROP TRIGGER IF EXISTS spd_detail2s_bef_ins0 on spd_detail2s;
CREATE TRIGGER spd_detail2s_bef_ins0  BEFORE INSERT ON spd_detail2s FOR EACH ROW  EXECUTE PROCEDURE spd_detail2s_bef_ins0();