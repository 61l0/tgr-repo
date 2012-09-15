var  urlbendasearch=HOST_PATH+'/pns/searchbenda';
var  urlppkdsearch=HOST_PATH+'/pns/searchppkd';
var urlskpdsearch=HOST_PATH+'/skpd/searchskpd';
var urldpasearch=HOST_PATH+'/dpa/searchdpa';
var urldpablsearch=HOST_PATH+'/dpa/searchdpabl';
var urldpabtlsearch=HOST_PATH+'/dpa/searchdpabtl';
var urldpabtllist=HOST_PATH+'/dpa/dpabtllist';
var urldpabllist=HOST_PATH+'/dpa/dpabllist';
var urldpadetailsearch=HOST_PATH+'/dpa/detailsearch';
var urlspdsearch=HOST_PATH+'/spd/getforcombo';
var urlspdpersearch=HOST_PATH+'/spdper/searchspd';
var urldpamasterbtlsearch=HOST_PATH+'/dpa/searchmasterbtl';
var MyDesktop = new Ext.app.App({
	init :function(){
		  
	},
	 
	getModules : function(){
		return [
		        new MyDesktop.SPDPerGridWindow(),
		        new MyDesktop.EntrySPDPerForm(),
		        new MyDesktop.SPDGridWindow (),
		        new MyDesktop.EntrySPDForm(),
		        new MyDesktop.RegSPDGridWindow(),
		        new MyDesktop.EntryRegSPDForm()
		];
		
	},
	getSingleModule:function (name){
		return this.getModule(name);
	}
});

Ext.namespace('Ext.monthlist');
//itm_type -> 0 =service, 1=stock,2=non_stock
Ext.monthlist.data = [
    ['1', 'Januari'],
  	['2', 'Pebruari'],
	['3', 'Maret'],
	['4', 'April'],
	['5', 'Mei'],
	['6', 'Juni'],
  	['7', 'Juli'],
	['8', 'Agustus'],
	['9', 'September'],
	['10', 'Okter'],
	['11', 'November'],
	['12', 'November']
	
  ];

var monthlistStore = new Ext.data.ArrayStore({
  fields: ['id', 'name'],
  data : Ext.monthlist.data
});

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
var skpdComboTpl = new Ext.XTemplate(
	    '<tpl for="."><div class="search-skpd"><p style="padding:3px">',
	        '{un_nama} (<b>{un_kode}</b>) </p>',
	        '',
	    '</div></tpl>'
	);
var spdComboTpl = new Ext.XTemplate(
	    '<tpl for="."><div class="search-spd"><p style="padding:3px">',
	        '{spdm_no} (<b>{un_nama}</b>) </p>',
	        '',
	    '</div></tpl>'
	);
var dpaComboTpl = new Ext.XTemplate(
	    '<tpl for="."><div class="search-dpa"><p style="padding:3px">',
	        '{dpam_no} (<b>{un_nama}</b>) </p>',
	        '',
	    '</div></tpl>'
	);
var bendaComboTpl = new Ext.XTemplate(
	    '<tpl for="."><div class="search-benda"><p style="padding:3px">',
	        '{pn_nama} (<b>{pn_nip}</b>) </p>',
	        '',
	    '</div></tpl>'
	);
var ppkdComboTpl = new Ext.XTemplate(
	    '<tpl for="."><div class="search-ppkd"><p style="padding:3px">',
	        '{pn_nama} (<b>{pn_nip}</b>) </p>',
	        '',
	    '</div></tpl>'
	);
function StateChange(val){
	if(val =="0"){
	      return '<span style="color:green;"><img src="'+HOST_PATH+'/img/ext/pending.png"/></span>';
	}else {
	    return '<span style="color:red;"><img src="'+HOST_PATH+'/img/ext/lock.png"/></span>';
	}
};  

var spdperSearchStore = new Ext.data.Store({
    proxy: new Ext.data.HttpProxy({
        url: urlspdpersearch
    }),
    reader: new Ext.data.JsonReader({
        root: 'spdpermasters',
        totalProperty: 'total',
        id: 'id'
    }, [
        {name: 'id'},
        {name: 'spdm_no'},
        {name: 'un_nama'}
        
        
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


var ppkdSearchStore = new Ext.data.Store({
    proxy: new Ext.data.HttpProxy({
        url: urlppkdsearch
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
var dpaMasterSearchStore = new Ext.data.Store({
    proxy: new Ext.data.HttpProxy({
        url: urldpasearch
    }),
    reader: new Ext.data.JsonReader({
        root: 'dpamasters',
        totalProperty: 'total',
        id: 'dpam_id'
    }, [
        {name:'dpam_id'},
        {name: 'dpam_no'},
        {name: 'un_id'},
        {name: 'un_kode'},
        {name: 'un_nama'},
        {name:'dpam_angg',type:'float'},
        {name:'dpam_akum',type:'float'},
        {name:'dpam_tersedia',type:'float'}
        
        
        
    ])
});

var dpaMasterBtlSearchStore = new Ext.data.Store({
    proxy: new Ext.data.HttpProxy({
        url: urldpamasterbtlsearch
    }),
    reader: new Ext.data.JsonReader({
        root: 'dpamasters',
        totalProperty: 'total',
        id: 'dpam_id'
    }, [
        {name:'dpam_id'},
        {name: 'dpam_no'},
        {name: 'un_id'},
        {name: 'un_kode'},
        {name: 'un_nama'},
        {name:'dpam_angg',type:'float'},
        {name:'dpam_akum',type:'float'},
        {name:'dpam_tersedia',type:'float'}
        
        
        
    ])
});