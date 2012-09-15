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



/* -------------- SPD ---------------------*/
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


CREATE OR REPLACE FUNCTION reg_spds_bef_ins0() RETURNS TRIGGER AS $$
	 
	BEGIN
		 
		if (new.rs_id is null or new.rs_id='0') then
			new.rs_id :=   trim(to_char(nextval('reg_spds_rs_id_seq'),'0000000000')); 
		end if;
		RETURN NEW;
	END;
$$ LANGUAGE 'plpgsql';
DROP TRIGGER IF EXISTS reg_spds_bef_ins0 on reg_spds;
CREATE TRIGGER reg_spds_bef_ins0  BEFORE INSERT ON reg_spds FOR EACH ROW  EXECUTE PROCEDURE reg_spds_bef_ins0();


CREATE OR REPLACE FUNCTION spm_masters_bef_ins0() RETURNS TRIGGER AS $$
	 
	BEGIN
		 
		if (new.spmm_id is null or new.spmm_id='0') then
			new.spmm_id :=   trim(to_char(nextval('spm_masters_spmm_id_seq'),'0000000000')); 
		end if;
		RETURN NEW;
	END;
$$ LANGUAGE 'plpgsql';
DROP TRIGGER IF EXISTS spm_masters_bef_ins0 on spm_masters;
CREATE TRIGGER spm_masters_bef_ins0  BEFORE INSERT ON spm_masters FOR EACH ROW  EXECUTE PROCEDURE spm_masters_bef_ins0();



CREATE OR REPLACE FUNCTION spm_detail1s_bef_ins0() RETURNS TRIGGER AS $$
	 
	BEGIN
		 
		if (new.spmd_id is null or new.spmd_id='0') then
			new.spmd_id :=   trim(to_char(nextval('spm_detail1s_spmd_id_seq'),'0000000000')); 
		end if;
		RETURN NEW;
	END;
$$ LANGUAGE 'plpgsql';
DROP TRIGGER IF EXISTS spm_detail1s_bef_ins0 on spm_detail1s;
CREATE TRIGGER spm_detail1s_bef_ins0  BEFORE INSERT ON spm_detail1s FOR EACH ROW  EXECUTE PROCEDURE spm_detail1s_bef_ins0();


CREATE OR REPLACE FUNCTION spm_detail1s_bef_ins0() RETURNS TRIGGER AS $$
	 
	BEGIN
		 
		if (new.spmd_id is null or new.spmd_id='0') then
			new.spmd_id :=   trim(to_char(nextval('spm_detail1s_spmd_id_seq'),'0000000000')); 
		end if;
		RETURN NEW;
	END;
$$ LANGUAGE 'plpgsql';
DROP TRIGGER IF EXISTS spm_detail1s_bef_ins0 on spm_detail1s;
CREATE TRIGGER spm_detail1s_bef_ins0  BEFORE INSERT ON spm_detail1s FOR EACH ROW  EXECUTE PROCEDURE spm_detail1s_bef_ins0();


 
CREATE OR REPLACE FUNCTION spm_detail2s_bef_ins0() RETURNS TRIGGER AS $$
	 
	BEGIN
		 
		if (new.spmd_id is null or new.spmd_id='0') then
			new.spmd_id :=   trim(to_char(nextval('spm_detail2s_spmd_id_seq'),'0000000000')); 
		end if;
		RETURN NEW;
	END;
$$ LANGUAGE 'plpgsql';
DROP TRIGGER IF EXISTS spm_detail2s_bef_ins0 on spm_detail2s;
CREATE TRIGGER spm_detail2s_bef_ins0  BEFORE INSERT ON spm_detail2s FOR EACH ROW  EXECUTE PROCEDURE spm_detail2s_bef_ins0();


CREATE OR REPLACE FUNCTION spm_detail3s_bef_ins0() RETURNS TRIGGER AS $$
	 
	BEGIN
		 
		if (new.spmd_id is null or new.spmd_id='0') then
			new.spmd_id :=   trim(to_char(nextval('spm_detail3s_spmd_id_seq'),'0000000000')); 
		end if;
		RETURN NEW;
	END;
$$ LANGUAGE 'plpgsql';
DROP TRIGGER IF EXISTS spm_detail3s_bef_ins0 on spm_detail3s;
CREATE TRIGGER spm_detail3s_bef_ins0  BEFORE INSERT ON spm_detail3s FOR EACH ROW  EXECUTE PROCEDURE spm_detail3s_bef_ins0();

/* ---------------------- SP2D */


CREATE OR REPLACE FUNCTION sp2d_masters_bef_ins0() RETURNS TRIGGER AS $$
	 
	BEGIN
		 
		if (new.sp2dm_id is null or new.spdm_id='0') then
			new.sp2dm_id :=   trim(to_char(nextval('sp2d_masters_sp2dm_id_seq'),'0000000000')); 
		end if;
		RETURN NEW;
	END;
$$ LANGUAGE 'plpgsql';
DROP TRIGGER IF EXISTS sp2d_masters_bef_ins0 on sp2d_masters;
CREATE TRIGGER sp2d_masters_bef_ins0  BEFORE INSERT ON sp2d_masters FOR EACH ROW  EXECUTE PROCEDURE sp2d_masters_bef_ins0();
 
CREATE OR REPLACE FUNCTION sp2d_detail1s_bef_ins1() RETURNS TRIGGER AS $$
	 
	BEGIN
		 
		if (new.sp2dd_id is null or new.sp2dd_id='0') then
			new.sp2dd_id :=   trim(to_char(nextval('sp2d_detail1s_sp2dd_id_seq'),'0000000000')); 
		end if;
		RETURN NEW;
	END;
$$ LANGUAGE 'plpgsql';
DROP TRIGGER IF EXISTS sp2d_detail1s_bef_ins1 on sp2d_detail1s;
CREATE TRIGGER sp2d_detail1s_bef_ins1  BEFORE INSERT ON sp2d_detail1s FOR EACH ROW  EXECUTE PROCEDURE sp2d_detail1s_bef_ins1();

 
CREATE OR REPLACE FUNCTION sp2d_detail2s_bef_ins1() RETURNS TRIGGER AS $$
	 
	BEGIN
		 
		if (new.sp2dd_id is null or new.sp2dd_id='0') then
			new.sp2dd_id :=   trim(to_char(nextval('sp2d_detail2s_sp2dd_id_seq'),'0000000000')); 
		end if;
		RETURN NEW;
	END;
$$ LANGUAGE 'plpgsql';
DROP TRIGGER IF EXISTS sp2d_detail2s_bef_ins1 on sp2d_detail2s;
CREATE TRIGGER sp2d_detail2s_bef_ins1  BEFORE INSERT ON sp2d_detail2s FOR EACH ROW  EXECUTE PROCEDURE sp2d_detail2s_bef_ins1();

 
CREATE OR REPLACE FUNCTION sp2d_detail3s_bef_ins1() RETURNS TRIGGER AS $$
	 
	BEGIN
		 
		if (new.sp2dd_id is null or new.sp2dd_id='0') then
			new.sp2dd_id :=   trim(to_char(nextval('sp2d_detail3s_sp2dd_id_seq'),'0000000000')); 
		end if;
		RETURN NEW;
	END;
$$ LANGUAGE 'plpgsql';
DROP TRIGGER IF EXISTS sp2d_detail3s_bef_ins1 on sp2d_detail3s;
CREATE TRIGGER sp2d_detail3s_bef_ins1  BEFORE INSERT ON sp2d_detail3s FOR EACH ROW  EXECUTE PROCEDURE sp2d_detail3s_bef_ins1();

 
CREATE OR REPLACE FUNCTION reg_spds_bef_ins1() RETURNS TRIGGER AS $$
	 
	BEGIN
		 
		if (new.rs_id is null or new.rs_id='0') then
			new.rs_id :=   trim(to_char(nextval('reg_spds_rs_id_seq'),'0000000000')); 
		end if;
		RETURN NEW;
	END;
$$ LANGUAGE 'plpgsql';
DROP TRIGGER IF EXISTS reg_spds_bef_ins1 on reg_spds;
CREATE TRIGGER reg_spds_bef_ins1  BEFORE INSERT ON reg_spds FOR EACH ROW  EXECUTE PROCEDURE reg_spds_bef_ins1();

 