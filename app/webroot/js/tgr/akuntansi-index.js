var urlsppsearch=HOST_PATH+'/spp/searchspp';
var  urlbendasearch=HOST_PATH+'/pns/searchbenda';
var urlbanksearch=HOST_PATH+'/bank/searchbank';
var urlskpdsearch=HOST_PATH+'/skpd/searchskpd';
var urldpablsearch=HOST_PATH+'/dpa/searchdpabl';
var urldpabtlsearch=HOST_PATH+'/dpa/searchdpabtl';
var urlspdsearch=HOST_PATH+'/spd/getforcombo';
var urldpabtlsearchbyun=HOST_PATH+'/dpa/searchdpabtlbyun';
var urldpadetailsearchbykeg=HOST_PATH+'/dpa/searchdpadetailbykeg';
var urlkegsearch=HOST_PATH+'/kegiatan/getkeglist';
var urlprogsearch=HOST_PATH+'/kegiatan/getproglist';
var urlspmsearch=HOST_PATH+'/spm/searchspm';
var urlanggsearch=HOST_PATH+'/dpa/searchangg';
var MyDesktop = new Ext.app.App({
	init :function(){
		  
	},
	 
	getModules : function(){
		return [
		        new MyDesktop.EntryKembaliForm(),
		        new MyDesktop.KembaliGridWindow(),
		        new MyDesktop.EntryJeForm(),
		        new MyDesktop.JeGridWindow(),
		        new MyDesktop.AccBalGridWindow(),
		        new MyDesktop.BankBalGridWindow(),
		        new MyDesktop.KasBalGridWindow()
		        
		];
		
	},
	getSingleModule:function (name){
		return this.getModule(name);
	}
});

var sppComboTpl = new Ext.XTemplate(
	    '<tpl for="."><div class="search-spp"><p style="padding:3px">',
	        '{sppm_no} (<b>{un_nama}</b>) </p>',
	        '',
	    '</div></tpl>'
	);

var spmComboTpl = new Ext.XTemplate(
	    '<tpl for="."><div class="search-spm"><p style="padding:3px">',
	        '{spmm_no} (<b>{un_nama}</b>) </p>',
	        '',
	    '</div></tpl>'
	);

var programComboTpl = new Ext.XTemplate(
	    '<tpl for="."><div class="search-program"><p style="padding:3px">',
	        '{prog_kode} (<b>{prog_nama}</b>) </p>',
	        '',
	    '</div></tpl>'
	);
var kegiatanComboTpl = new Ext.XTemplate(
	    '<tpl for="."><div class="search-kegiatan"><p style="padding:3px">',
	        '{keg_kode} (<b>{keg_nama}</b>) </p>',
	        '',
	    '</div></tpl>'
	);
var bendaComboTpl = new Ext.XTemplate(
	    '<tpl for="."><div class="search-benda"><p style="padding:3px">',
	        '{pn_nama} (<b>{pn_nip}</b>) </p>',
	        '',
	    '</div></tpl>'
	);

var bankComboTpl = new Ext.XTemplate(
	    '<tpl for="."><div class="search-bank"><p style="padding:3px">',
	        '{bank_norek} (<b>{bank_nama}</b>) </p>',
	        '',
	    '</div></tpl>'
	);

var skpdComboTpl = new Ext.XTemplate(
	    '<tpl for="."><div class="search-skpd"><p style="padding:3px">',
	        '{un_nama} (<b>{un_kode}</b>) </p>',
	        '',
	    '</div></tpl>'
	);

var dpaBTLComboTpl= new Ext.XTemplate(
	    '<tpl for="."><div class="search-dpabtl"><p style="padding:3px">',
        '{akun_kode} (<b>{akun_nama}</b>) </p>',
        '',
    '</div></tpl>'
);
var dpaBLComboTpl= new Ext.XTemplate(
	    '<tpl for="."><div class="search-dpabl"><p style="padding:3px">',
        '{dpam_no} (<b>{un_nama}</b>)<hr/><p>{keg_nama} ({keg_kode}) </p>',
        '',
    '</div></tpl>'
);
var anggaranComboTpl= new Ext.XTemplate(
	    '<tpl for="."><div class="search-anggaran"><p style="padding:3px">',
        '{angg_kodeper} (<b>{angg_namaper}</b>)</p>',
        '',
    '</div></tpl>'
);

var AnggaranSearchStore = new Ext.data.Store({
    proxy: new Ext.data.HttpProxy({
        url: urlanggsearch
    }),
    reader: new Ext.data.JsonReader({
        root: 'anggarans',
        totalProperty: 'total',
        id: 'angg_kodeper'
    }, [
        {name:'angg_namaper'},
        {name: 'angg_kodeper'},
        {name: 'akun_kode',mapping:'angg_kodeper'},
        {name:'akun_nama',mapping:'angg_namaper'},
        
        
    ])
});
var dpaBLSearchStore = new Ext.data.Store({
    proxy: new Ext.data.HttpProxy({
        url: urldpablsearch
    }),
    reader: new Ext.data.JsonReader({
        root: 'dpadetails',
        totalProperty: 'total',
        id: 'dpam_no'
    }, [
        {name:'dpam_id'},
        {name: 'dpam_no'},
        {name: 'un_id'},
       
        {name: 'un_kode'},
        {name: 'un_nama'},
        {name:'keg_kode'},
        {name:'keg_nama'},
        {name:'nilaiangg',type:'float'},
        {name:'nilaiakum',type:'float'},
        {name:'nilaitersedia',type:'float'}
        
        
        
    ])
});
//view dpa_btl berdasarkan akun
var dpaBTLSearchStore = new Ext.data.Store({
    proxy: new Ext.data.HttpProxy({
        url: urldpabtlsearch
    }),
    reader: new Ext.data.JsonReader({
        root: 'dpadetails',
        totalProperty: 'total',
        id: 'akun_kode'
    }, [
        {name: 'angg_kode'},
        {name:'akun_kode'},
        {name: 'akun_nama'},
        {name: 'nilaiangg',type:'float'},
      
        {name: 'nilaiakum',type:'float'},
        {name: 'nilaitersedia',type:'float'} 
       
        
    ])
});
var dpaBTLByUNSearchStore = new Ext.data.Store({
    proxy: new Ext.data.HttpProxy({
        url: urldpabtlsearchbyun
    }),
    reader: new Ext.data.JsonReader({
        root: 'dpadetails',
        totalProperty: 'total',
        id: 'akun_kode'
    }, [
        {name: 'angg_kode'},
        {name:'akun_kode'},
        {name: 'akun_nama'},
        {name: 'nilaiangg',type:'float'},
      
        {name: 'nilaiakum',type:'float'},
        {name: 'nilaitersedia',type:'float'} 
       
        
    ])
});


var dpaDetailByKegSearchStore = new Ext.data.Store({
    proxy: new Ext.data.HttpProxy({
        url: urldpadetailsearchbykeg
    }),
    reader: new Ext.data.JsonReader({
        root: 'dpadetails',
        totalProperty: 'total',
        id: 'dpad_id'
    }, [
        {name: 'angg_kode'},
        {name:'akun_kode'},
        {name: 'akun_nama'},
        {name: 'dpad_nilai',type:'float'} 
       
        
    ])
});
var sppSearchStore = new Ext.data.Store({
    proxy: new Ext.data.HttpProxy({
        url: urlsppsearch
    }),
    reader: new Ext.data.JsonReader({
        root: 'sppmasters',
        totalProperty: 'total',
        id: 'sppm_id'
    }, [
        {name: 'sppm_id'},
        {name: 'sppm_no'},
        {name: 'sppm_tgl'},
        {name: 'un_id'},
        {name: 'un_nama'},
        {name: 'un_nama'},
        {name: 'sppm_benda'},
        {name: 'sppm_bendanama'},
        {name: 'bank_norek'},
        {name: 'bank_nama'},
        
        {name:'sppm_total'},
        {name: 'spdm_no'},
        {name: 'spdm_tgl'},
        {name: 'spdm_uraian'}
        
        
    ])
});

var spmSearchStore = new Ext.data.Store({
    proxy: new Ext.data.HttpProxy({
        url: urlspmsearch
    }),
    reader: new Ext.data.JsonReader({
        root: 'spmmasters',
        totalProperty: 'total',
        id: 'spmm_id'
    }, [
        {name: 'spmm_id'},
        {name: 'spmm_no'},
        {name: 'spmm_tgl'},
        
        {name: 'spmm_total'},
        {name: 'sppm_no'},
        {name: 'sppm_tgl'},
        {name: 'un_id'},
        {name: 'un_nama'},
      
        {name: 'sppm_benda'},
        {name: 'sppm_bendanama'},
        {name: 'bank_norek'},
        {name: 'bank_nama'},
        
        {name:'sppm_total'},
        {name: 'spdm_no'},
        {name: 'spdm_tgl'},
        {name: 'spdm_uraian'}
        
        
    ])
});
function StateChange(val){
	if(val =="0"){
	      return '<span style="color:green;"><img src="'+HOST_PATH+'/img/ext/pending.png"/></span>';
	}else {
	    return '<span style="color:red;"><img src="'+HOST_PATH+'/img/ext/lock.png"/></span>';
	}
};  
var bendaSearchStore = new Ext.data.Store({
    proxy: new Ext.data.HttpProxy({
        url: urlbendasearch
    }),
    reader: new Ext.data.JsonReader({
        root: 'pns',
        totalProperty: 'total',
        id: 'pn_nip'
    }, [
        {name: 'pn_nip'},
        {name: 'pn_nama'},
        {name: 'pn_jabatan'} 
    ])
});
var skpdSearchStore = new Ext.data.Store({
    proxy: new Ext.data.HttpProxy({
        url: urlskpdsearch
    }),
    reader: new Ext.data.JsonReader({
        root: 'skpds',
        totalProperty: 'total',
        id: 'id'
    }, [
        {name: 'id'},
        {name:'un_id'},
        {name: 'un_kode'},
        {name: 'un_nama'},
        {name: 'dpa_angg',type:'float'},
        {name: 'dpa_akum',type:'float'},
        {name: 'dpa_tersedia',type:'float'} 
        
        
        
    ])
});

var spdSearchStore = new Ext.data.Store({
    proxy: new Ext.data.HttpProxy({
        url: urlspdsearch
    }),
    reader: new Ext.data.JsonReader({
        root: 'spdmasters',
        totalProperty: 'total',
        id: 'id'
    }, [
        {name: 'id'},
        {name: 'spdm_no'},
        {name: 'un_nama'}
        
        
    ])
});


var bankSearchStore = new Ext.data.Store({
    proxy: new Ext.data.HttpProxy({
        url: urlbanksearch
    }),
    reader: new Ext.data.JsonReader({
        root: 'banks',
        totalProperty: 'total',
        id: 'bank_norek'
    }, [
        {name: 'bank_norek'},
        {name: 'bank_nama'},
        {name: 'bank_cabang'}
        
        
    ])
});


var programSearchStore = new Ext.data.Store({
    proxy: new Ext.data.HttpProxy({
        url: urlprogsearch
    }),
    reader: new Ext.data.JsonReader({
        root: 'data',
        totalProperty: 'total',
        id: 'prog_kode'
    }, [
        {name: 'prog_kode'},
        {name: 'un_id'},
        {name: 'prog_nama'}
        
        
    ])
});



var kegiatanSearchStore = new Ext.data.Store({
    proxy: new Ext.data.HttpProxy({
        url: urlkegsearch
    }),
    reader: new Ext.data.JsonReader({
        root: 'data',
        totalProperty: 'total',
        id: 'keg_kode'
    }, [
        {name: 'prog_kode'},
        {name: 'keg_kode'},
        {name: 'un_id'},
        {name: 'keg_nama'}
        
        
    ])
});