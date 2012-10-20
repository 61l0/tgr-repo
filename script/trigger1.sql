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
		 
		if (new.sp2dm_id is null or new.sp2dm_id='0') then
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

CREATE OR REPLACE FUNCTION spp_masters_bef_ins0() RETURNS TRIGGER AS $$
	 
	BEGIN
		 
		if (new.sppm_id is null or new.sppm_id='0') then
			new.sppm_id :=   trim(to_char(nextval('spp_masters_sppm_id_seq'),'0000000000')); 
		end if;
		RETURN NEW;
	END;
$$ LANGUAGE 'plpgsql';
DROP TRIGGER IF EXISTS spp_masters_bef_ins0 on spp_masters;
CREATE TRIGGER spp_masters_bef_ins0  BEFORE INSERT ON spp_masters FOR EACH ROW  EXECUTE PROCEDURE spp_masters_bef_ins0();
 
CREATE OR REPLACE FUNCTION spp_detail1s_bef_ins1() RETURNS TRIGGER AS $$
	 
	BEGIN
		 
		if (new.sppd_id is null or new.sppd_id='0') then
			new.sppd_id :=   trim(to_char(nextval('spp_detail1s_sppd_id_seq'),'0000000000')); 
		end if;
		RETURN NEW;
	END;
$$ LANGUAGE 'plpgsql';
DROP TRIGGER IF EXISTS spp_detail1s_bef_ins1 on spp_detail1s;
CREATE TRIGGER spp_detail1s_bef_ins1  BEFORE INSERT ON spp_detail1s FOR EACH ROW  EXECUTE PROCEDURE spp_detail1s_bef_ins1();

 
CREATE OR REPLACE FUNCTION spp_detail2s_bef_ins1() RETURNS TRIGGER AS $$
	 
	BEGIN
		 
		if (new.sppd_id is null or new.sppd_id='0') then
			new.sppd_id :=   trim(to_char(nextval('spp_detail2s_sppd_id_seq'),'0000000000')); 
		end if;
		RETURN NEW;
	END;
$$ LANGUAGE 'plpgsql';
DROP TRIGGER IF EXISTS spp_detail2s_bef_ins1 on spp_detail2s;
CREATE TRIGGER spp_detail2s_bef_ins1  BEFORE INSERT ON spp_detail2s FOR EACH ROW  EXECUTE PROCEDURE spp_detail2s_bef_ins1();

 
 
CREATE OR REPLACE FUNCTION gaji_masters_bef_ins0() RETURNS TRIGGER AS $$
	 
	BEGIN
		 
		if (new.gm_id is null or new.gm_id='0') then
			new.gm_id :=   trim(to_char(nextval('gaji_masters_gm_id_seq'),'0000000000')); 
		end if;
		RETURN NEW;
	END;
$$ LANGUAGE 'plpgsql';
DROP TRIGGER IF EXISTS gaji_masters_bef_ins0 on gaji_masters;
CREATE TRIGGER gaji_masters_bef_ins0  BEFORE INSERT ON gaji_masters FOR EACH ROW  EXECUTE PROCEDURE gaji_masters_bef_ins0();
 
CREATE OR REPLACE FUNCTION gaji_detail1s_bef_ins1() RETURNS TRIGGER AS $$
	 
	BEGIN
		 
		if (new.gd_id is null or new.gd_id='0') then
			new.gd_id :=   trim(to_char(nextval('gaji_detail1s_gd_id_seq'),'0000000000')); 
		end if;
		RETURN NEW;
	END;
$$ LANGUAGE 'plpgsql';
DROP TRIGGER IF EXISTS gaji_detail1s_bef_ins1 on gaji_detail1s;
CREATE TRIGGER gaji_detail1s_bef_ins1  BEFORE INSERT ON gaji_detail1s FOR EACH ROW  EXECUTE PROCEDURE gaji_detail1s_bef_ins1();

 
CREATE OR REPLACE FUNCTION gaji_detail2s_bef_ins1() RETURNS TRIGGER AS $$
	 
	BEGIN
		 
		if (new.gd_id is null or new.gd_id='0') then
			new.gd_id :=   trim(to_char(nextval('gaji_detail2s_gd_id_seq'),'0000000000')); 
		end if;
		RETURN NEW;
	END;
$$ LANGUAGE 'plpgsql';
DROP TRIGGER IF EXISTS gaji_detail2s_bef_ins1 on gaji_detail2s;
CREATE TRIGGER gaji_detail2s_bef_ins1  BEFORE INSERT ON gaji_detail2s FOR EACH ROW  EXECUTE PROCEDURE gaji_detail2s_bef_ins1();


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



CREATE OR REPLACE FUNCTION acara_masters_bef_ins0() RETURNS TRIGGER AS $$
	 
	BEGIN
		 
		if (new.am_id is null or new.am_id='0') then
			new.am_id :=   trim(to_char(nextval('acara_masters_am_id_seq'),'0000000000')); 
		end if;
		RETURN NEW;
	END;
$$ LANGUAGE 'plpgsql';
DROP TRIGGER IF EXISTS acara_masters_bef_ins0 on acara_masters;
CREATE TRIGGER acara_masters_bef_ins0  BEFORE INSERT ON acara_masters FOR EACH ROW  EXECUTE PROCEDURE acara_masters_bef_ins0();
 
CREATE OR REPLACE FUNCTION acara_details_bef_ins1() RETURNS TRIGGER AS $$
	 
	BEGIN
		 
		if (new.ad_id is null or new.ad_id='0') then
			new.ad_id :=   trim(to_char(nextval('acara_details_ad_id_seq'),'0000000000')); 
		end if;
		RETURN NEW;
	END;
$$ LANGUAGE 'plpgsql';
DROP TRIGGER IF EXISTS acara_details_bef_ins1 on acara_details;
CREATE TRIGGER acara_details_bef_ins1  BEFORE INSERT ON acara_details FOR EACH ROW  EXECUTE PROCEDURE acara_details_bef_ins1();



CREATE OR REPLACE FUNCTION bansos_masters_bef_ins0() RETURNS TRIGGER AS $$
	 
	BEGIN
		 
		if (new.bm_id is null or new.bm_id='0') then
			new.bm_id :=   trim(to_char(nextval('bansos_masters_bm_id_seq'),'0000000000')); 
		end if;
		RETURN NEW;
	END;
$$ LANGUAGE 'plpgsql';
DROP TRIGGER IF EXISTS bansos_masters_bef_ins0 on bansos_masters;
CREATE TRIGGER bansos_masters_bef_ins0  BEFORE INSERT ON bansos_masters FOR EACH ROW  EXECUTE PROCEDURE bansos_masters_bef_ins0();
 
CREATE OR REPLACE FUNCTION bansos_details_bef_ins1() RETURNS TRIGGER AS $$
	 
	BEGIN
		 
		if (new.bd_id is null or new.bd_id='0') then
			new.bd_id :=   trim(to_char(nextval('bansos_details_bd_id_seq'),'0000000000')); 
		end if;
		RETURN NEW;
	END;
$$ LANGUAGE 'plpgsql';
DROP TRIGGER IF EXISTS bansos_details_bef_ins1 on bansos_details;
CREATE TRIGGER bansos_details_bef_ins1  BEFORE INSERT ON bansos_details FOR EACH ROW  EXECUTE PROCEDURE bansos_details_bef_ins1();



CREATE OR REPLACE FUNCTION geser_kas_bef_ins1() RETURNS TRIGGER AS $$
	 
	BEGIN
		 
		if (new.gk_id is null or new.gk_id='0') then
			new.gk_id :=   trim(to_char(nextval('geser_kas_gk_id_seq'),'0000000000')); 
		end if;
		RETURN NEW;
	END;
$$ LANGUAGE 'plpgsql';
DROP TRIGGER IF EXISTS geser_kas_bef_ins1 on geser_kas;
CREATE TRIGGER geser_kas_bef_ins1  BEFORE INSERT ON geser_kas FOR EACH ROW  EXECUTE PROCEDURE geser_kas_bef_ins1();




CREATE OR REPLACE FUNCTION belanja_masters_bef_ins0() RETURNS TRIGGER AS $$
	 
	BEGIN
		 
		if (new.bm_id is null or new.bm_id='0') then
			new.bm_id :=   trim(to_char(nextval('belanja_masters_bm_id_seq'),'0000000000')); 
		end if;
		RETURN NEW;
	END;
$$ LANGUAGE 'plpgsql';
DROP TRIGGER IF EXISTS belanja_masters_bef_ins0 on belanja_masters;
CREATE TRIGGER belanja_masters_bef_ins0  BEFORE INSERT ON belanja_masters FOR EACH ROW  EXECUTE PROCEDURE belanja_masters_bef_ins0();
 
CREATE OR REPLACE FUNCTION belanja_details_bef_ins1() RETURNS TRIGGER AS $$
	 
	BEGIN
		 
		if (new.bd_id is null or new.bd_id='0') then
			new.bd_id :=   trim(to_char(nextval('belanja_details_bd_id_seq'),'0000000000')); 
		end if;
		RETURN NEW;
	END;
$$ LANGUAGE 'plpgsql';
DROP TRIGGER IF EXISTS belanja_details_bef_ins1 on belanja_details;
CREATE TRIGGER belanja_details_bef_ins1  BEFORE INSERT ON belanja_details FOR EACH ROW  EXECUTE PROCEDURE belanja_details_bef_ins1();

CREATE OR REPLACE FUNCTION belanja_detail1s_bef_ins1() RETURNS TRIGGER AS $$
	 
	BEGIN
		 
		if (new.bd_id is null or new.bd_id='0') then
			new.bd_id :=   trim(to_char(nextval('belanja_detail1s_bd_id_seq'),'0000000000')); 
		end if;
		RETURN NEW;
	END;
$$ LANGUAGE 'plpgsql';
DROP TRIGGER IF EXISTS belanja_detail1s_bef_ins1 on belanja_detail1s;
CREATE TRIGGER belanja_detail1s_bef_ins1  BEFORE INSERT ON belanja_detail1s FOR EACH ROW  EXECUTE PROCEDURE belanja_detail1s_bef_ins1();


CREATE OR REPLACE FUNCTION belanja_detail2s_bef_ins1() RETURNS TRIGGER AS $$
	 
	BEGIN
		 
		if (new.bd_id is null or new.bd_id='0') then
			new.bd_id :=   trim(to_char(nextval('belanja_detail2s_bd_id_seq'),'0000000000')); 
		end if;
		RETURN NEW;
	END;
$$ LANGUAGE 'plpgsql';
DROP TRIGGER IF EXISTS belanja_detail2s_bef_ins1 on belanja_detail2s;
CREATE TRIGGER belanja_detail2s_bef_ins1  BEFORE INSERT ON belanja_detail2s FOR EACH ROW  EXECUTE PROCEDURE belanja_detail2s_bef_ins1();

CREATE OR REPLACE FUNCTION pembiayaans_bef_ins1() RETURNS TRIGGER AS $$
	 
	BEGIN
		 
		if (new.bia_id is null or new.bia_id='0') then
			new.bia_id :=   trim(to_char(nextval('pembiayaans_bia_id_seq'),'0000000000')); 
		end if;
		RETURN NEW;
	END;
$$ LANGUAGE 'plpgsql';
DROP TRIGGER IF EXISTS pembiayaans_bef_ins1 on pembiayaans;
CREATE TRIGGER pembiayaans_bef_ins1  BEFORE INSERT ON pembiayaans FOR EACH ROW  EXECUTE PROCEDURE pembiayaans_bef_ins1();


CREATE OR REPLACE FUNCTION limpah_ups_bef_ins1() RETURNS TRIGGER AS $$
	 
	BEGIN
		 
		if (new.lu_id is null or new.lu_id='0') then
			new.lu_id :=   trim(to_char(nextval('limpah_ups_lu_id_seq'),'0000000000')); 
		end if;
		RETURN NEW;
	END;
$$ LANGUAGE 'plpgsql';
DROP TRIGGER IF EXISTS limpah_ups_bef_ins1 on limpah_ups;
CREATE TRIGGER limpah_ups_bef_ins1  BEFORE INSERT ON limpah_ups FOR EACH ROW  EXECUTE PROCEDURE limpah_ups_bef_ins1();


 CREATE OR REPLACE FUNCTION kembali_masters_bef_ins0() RETURNS TRIGGER AS $$
	 
	BEGIN
		 
		if (new.km_id is null or new.km_id='0') then
			new.km_id :=   trim(to_char(nextval('kembali_masters_km_id_seq'),'0000000000')); 
		end if;
		RETURN NEW;
	END;
$$ LANGUAGE 'plpgsql';
DROP TRIGGER IF EXISTS kembali_masters_bef_ins0 on kembali_masters;
CREATE TRIGGER kembali_masters_bef_ins0  BEFORE INSERT ON kembali_masters FOR EACH ROW  EXECUTE PROCEDURE kembali_masters_bef_ins0();
 
CREATE OR REPLACE FUNCTION kembali_details_bef_ins1() RETURNS TRIGGER AS $$
	 
	BEGIN
		 
		if (new.kd_id is null or new.kd_id='0') then
			new.kd_id :=   trim(to_char(nextval('kembali_details_kd_id_seq'),'0000000000')); 
		end if;
		RETURN NEW;
	END;
$$ LANGUAGE 'plpgsql';
DROP TRIGGER IF EXISTS kembali_details_bef_ins1 on kembali_details;
CREATE TRIGGER kembali_details_bef_ins1  BEFORE INSERT ON kembali_details FOR EACH ROW  EXECUTE PROCEDURE kembali_details_bef_ins1();



 CREATE OR REPLACE FUNCTION je_masters_bef_ins0() RETURNS TRIGGER AS $$
	 
	BEGIN
		 
		if (new.jm_id is null or new.jm_id='0') then
			new.jm_id :=   trim(to_char(nextval('je_masters_jm_id_seq'),'0000000000')); 
		end if;
		RETURN NEW;
	END;
$$ LANGUAGE 'plpgsql';
DROP TRIGGER IF EXISTS je_masters_bef_ins0 on je_masters;
CREATE TRIGGER je_masters_bef_ins0  BEFORE INSERT ON je_masters FOR EACH ROW  EXECUTE PROCEDURE je_masters_bef_ins0();
 
CREATE OR REPLACE FUNCTION je_details_bef_ins0() RETURNS TRIGGER AS $$
	 
	BEGIN
		 
		if (new.jd_id is null or new.jd_id='0') then
			new.jd_id :=   trim(to_char(nextval('je_details_jd_id_seq'),'0000000000')); 
		end if;
		RETURN NEW;
	END;
$$ LANGUAGE 'plpgsql';
DROP TRIGGER IF EXISTS je_details_bef_ins0 on je_details;
CREATE TRIGGER je_details_bef_ins0  BEFORE INSERT ON je_details FOR EACH ROW  EXECUTE PROCEDURE je_details_bef_ins0();



CREATE OR REPLACE FUNCTION akun_bal1s_bef_ins0() RETURNS TRIGGER AS $$
	 
	BEGIN
		 
		if (new.ab_id is null or new.ab_id='0') then
			new.ab_id :=   trim(to_char(nextval('akun_bal1s_ab_id_seq'),'0000000000')); 
		end if;
		RETURN NEW;
	END;
$$ LANGUAGE 'plpgsql';
DROP TRIGGER IF EXISTS akun_bal1s_bef_ins0 on akun_bal1s;
CREATE TRIGGER akun_bal1s_bef_ins0  BEFORE INSERT ON akun_bal1s FOR EACH ROW  EXECUTE PROCEDURE akun_bal1s_bef_ins0();



CREATE OR REPLACE FUNCTION akun_bal2s_bef_ins0() RETURNS TRIGGER AS $$
	 
	BEGIN
		 
		if (new.ab_id is null or new.ab_id='0') then
			new.ab_id :=   trim(to_char(nextval('akun_bal2s_ab_id_seq'),'0000000000')); 
		end if;
		RETURN NEW;
	END;
$$ LANGUAGE 'plpgsql';
DROP TRIGGER IF EXISTS akun_bal2s_bef_ins0 on akun_bal2s;
CREATE TRIGGER akun_bal2s_bef_ins0  BEFORE INSERT ON akun_bal2s FOR EACH ROW  EXECUTE PROCEDURE akun_bal2s_bef_ins0();



CREATE OR REPLACE FUNCTION kas_balances_bef_ins0() RETURNS TRIGGER AS $$
	 
	BEGIN
		 
		if (new.cb_id is null or new.cb_id='0') then
			new.cb_id :=   trim(to_char(nextval('kas_balances_cb_id_seq'),'0000000000')); 
		end if;
		RETURN NEW;
	END;
$$ LANGUAGE 'plpgsql';
DROP TRIGGER IF EXISTS kas_balances_bef_ins0 on kas_balances;
CREATE TRIGGER kas_balances_bef_ins0  BEFORE INSERT ON kas_balances FOR EACH ROW  EXECUTE PROCEDURE kas_balances_bef_ins0();



CREATE OR REPLACE FUNCTION subkas_balances_bef_ins0() RETURNS TRIGGER AS $$
	 
	BEGIN
		 
		if (new.cb_id is null or new.cb_id='0') then
			new.cb_id :=   trim(to_char(nextval('subkas_balances_cb_id_seq'),'0000000000')); 
		end if;
		RETURN NEW;
	END;
$$ LANGUAGE 'plpgsql';
DROP TRIGGER IF EXISTS subkas_balances_bef_ins0 on subkas_balances;
CREATE TRIGGER subkas_balances_bef_ins0  BEFORE INSERT ON subkas_balances FOR EACH ROW  EXECUTE PROCEDURE subkas_balances_bef_ins0();


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
