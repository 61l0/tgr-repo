var urlsppsearch=HOST_PATH+'/spp/searchspp';
var  urlbendasearch=HOST_PATH+'/pns/searchbenda';
var urlskpdsearch=HOST_PATH+'/skpd/searchskpd';
var urldpablsearch=HOST_PATH+'/dpa/searchdpabl';
var urldpabtlsearch=HOST_PATH+'/dpa/searchdpabtl';
var MyDesktop = new Ext.app.App({
	init :function(){
		  
	},
	 
	getModules : function(){
		return [
		        new MyDesktop.SPMGridWindow(),
		        new MyDesktop.EntrySPMForm(),
		        new MyDesktop.SP2DGridWindow(),
		        new MyDesktop.EntrySP2DForm(),
		        new MyDesktop.GajiGridWindow(),
		        new MyDesktop.EntryGajiForm()
		        
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
var bendaComboTpl = new Ext.XTemplate(
	    '<tpl for="."><div class="search-benda"><p style="padding:3px">',
	        '{pn_nama} (<b>{pn_nip}</b>) </p>',
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
        '{akun_kode} (<b>{akun_nama}</b>)',
        '',
    '</div></tpl>'
);
var dpaBLComboTpl= new Ext.XTemplate(
	    '<tpl for="."><div class="search-dpabl"><p style="padding:3px">',
        '{dpam_no} (<b>{un_nama}</b>)<hr/><p>{keg_nama} ({keg_kode}) </p>',
        '',
    '</div></tpl>'
);

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
var sppSearchStore = new Ext.data.Store({
    proxy: new Ext.data.HttpProxy({
        url: urlsppsearch
    }),
    reader: new Ext.data.JsonReader({
        root: 'sppmasters',
        totalProperty: 'total',
        id: 'id'
    }, [
        {name: 'id'},
        {name: 'sppm_no'},
        {name: 'un_nama'}
        
        
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
