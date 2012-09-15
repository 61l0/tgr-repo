insert into units(un_id,un_kode,un_nama,un_lvl,un_akronim,un_alamat,un_telp,un_type)
select trim(unitkey),trim(kdunit),trim(nmunit),to_number(trim(kdlevel),'99'),trim(akrounit),trim(alamat),trim(telepon),trim("type") from dafunits;
 
insert into pns(pn_nip,pn_nama,pn_kdgol,un_id,pn_jabatan,pn_pddk)
select trim(nip),trim(nama),trim(kdgol),trim(unitkey),trim(jabatan),trim(pddk) from pegawais;
 
insert into programs(prog_kode,prog_nourut,prog_nama,un_id)
select trim(idprgrm),trim(nuprgrm),trim(nmprgrm),trim(unitkey) from mpgrms;
 
insert into kegiatans(keg_kode,prog_kode,keg_nourut,keg_nama,keg_perspektif,keg_level,keg_type)
select trim(kdkegunit),trim(idprgrm),trim(nukeg),trim(nmkegunit),trim(kdperspektif),trim(levelkeg),trim(mtype) from mkegiatans;

 
 
insert into keg_units(ku_id,ku_tahap,un_id,keg_kode,prog_kode,ku_noprior,ku_kdsifat,ku_nip,ku_tglakhir,ku_tglawal,ku_targetp,ku_lokasi,
	ku_jumlahmin1,ku_pagu,ku_jumlahpls1,ku_sasaran,ku_ket)
select trim(to_char(id,'99999999')),trim(kdtahap),trim(unitkey),trim(kdkegunit),trim(idprgrm),trim(noprior),trim(kdsifat),trim(nip),tglakhir,
tglawal,trim(targetp),trim(lokasi),jumlahmin1,pagu,jumlahpls1,sasaran,ketkeg from kegunits;

 
insert into anggarans(angg_kode,angg_kodeper,angg_namaper,angg_level,angg_kdkhusus,angg_type)
select trim(mtgkey),trim(kdper),trim(nmper),trim(mtglevel),trim(kdkhusus),trim(xtype) from matangrs;
 

insert into dpa_masters (dpam_id,un_id,dpam_tahap,dpam_tipe,dpam_no,dpam_tgl,dpam_nosah,dpam_ket,dpam_tglvalid,dpam_idxttd1,dpam_idxttd2)
select trim(idxdask),trim(unitkey),trim(kdtahap),trim(idxkode),trim(nodask),tgldask,trim(nosah),trim(ketdask),tglvalid,ttd1,ttd2
from skdasks; 

 

insert into dpa_details( dpam_id,keg_kode,angg_kode,un_id,dpad_nilai)
select  trim(idxdask),trim(kdkegunit),trim(mtgkey),trim(unitkey),nilai from daskrs;

insert into dpa_details(dpam_id,angg_kode,un_id,dpad_nilai)
select  trim(idxdask), trim(mtgkey),trim(unitkey),nilai from daskrtls;

--select angg_kodeper,trim(substring(angg_kodeper,0,length(angg_kodeper))) from anggarans
--menghilangkan titik di belakang
update anggarans set angg_kodeper=trim(substring(angg_kodeper,0,length(angg_kodeper)));