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