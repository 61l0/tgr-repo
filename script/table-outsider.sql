
CREATE TABLE dafunits
(
  unitkey character varying(10) NOT NULL,
  kdlevel character varying(2) NOT NULL,
  kdunit character varying(30),
  nmunit character varying(200),
  akrounit character varying(30),
  alamat character varying(200),
  telepon character varying(20),
  "type" character varying(2),
  CONSTRAINT dafunits_pkey PRIMARY KEY (unitkey)
)
/*  table master dpa
 * idx_kode -> ini tipe dpa nya
 *  	2: langsung
 * 		3: tidak langsung
 * kdtahap : -> 1->3
 */
CREATE TABLE skdasks
(
  id serial NOT NULL,
  unitkey character varying(10) NOT NULL,
  idxdask character varying(10) NOT NULL,
  kdtahap character varying(2) NOT NULL,
  idxkode character varying(10) NOT NULL,
  idxttd1 character varying(10),
  idxttd2 character varying(10),
  nodask character varying(50),
  tgldask date,
  nosah character varying(50),
  ketdask character varying(254),
  tglvalid date,
  ttd1 integer,
  ttd2 integer,
  CONSTRAINT skdasks_pkey PRIMARY KEY (id)
)
/* dpa detail LANGSUNG */
CREATE TABLE daskrs
(
  id serial NOT NULL,
  kdkegunit character varying(10),
  mtgkey character varying(10),
  unitkey character varying(10),
  idxdask character varying(10),
  nilai numeric(20,4)
)

/* dpa detail TIDAK LANGSUNG*/
CREATE TABLE daskrtls
(
  id serial NOT NULL,
  mtgkey character varying(10),
  unitkey character varying(10),
  idxdask character varying(10),
  nilai numeric(15,2),
  skdask_id integer,
  akundetail_id integer,
  CONSTRAINT daskrtls_pkey PRIMARY KEY (id)
)
/* master anggaran LANGSUNG dan TIDAK LANSUNG*/
CREATE TABLE matangrs
(
  mtgkey character varying(10),
  kdper character varying(30),
  nmper character varying(200),
  mtglevel character varying(2),
  kdkhusus character varying(1),
  xtype character varying(2)
)


CREATE TABLE kegunits
(
  id serial NOT NULL,
  kdtahap character varying(2) NOT NULL,
  unitkey character varying(10) NOT NULL,
  kdkegunit character varying(10) NOT NULL,
  idprgrm character varying(10) NOT NULL,
  noprior character varying(10),
  kdsifat character varying(10) NOT NULL,
  nip character varying(30),
  tglakhir date,
  tglawal date,
  targetp character varying(200),
  lokasi character varying(250),
  jumlahmin1 numeric(13,2),
  pagu numeric(13,2),
  jumlahpls1 numeric(13,2),
  sasaran text,
  ketkeg text,
  CONSTRAINT kegunits_pkey PRIMARY KEY (id)
)