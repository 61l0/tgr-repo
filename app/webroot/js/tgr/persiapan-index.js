var  urlbendasearch=HOST_PATH+'/pns/searchbenda';
var  urlppkdsearch=HOST_PATH+'/pns/searchppkd';
var urlskpdsearch=HOST_PATH+'/skpd/searchskpd';
var urldpasearch=HOST_PATH+'/dpa/searchdpa';
var urldpadetailsearch=HOST_PATH+'/dpa/detailsearch';
var MyDesktop = new Ext.app.App({
	init :function(){
		  
	},
	 
	getModules : function(){
		return [
		        new MyDesktop.SPDPerGridWindow(),
		        new MyDesktop.EntrySPDPerForm()
		];
		
	},
	getSingleModule:function (name){
		return this.getModule(name);
	}
});
var dpadetailComboTpl= new Ext.XTemplate(
	    '<tpl for="."><div class="search-dpadetail"><p style="padding:3px">',
        '{akun_kode} (<b>{akun_nama}</b>) </p>',
        '',
    '</div></tpl>'
);
var skpdComboTpl = new Ext.XTemplate(
	    '<tpl for="."><div class="search-skpd"><p style="padding:3px">',
	        '{un_nama} (<b>{un_kode}</b>) </p>',
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
        {name: 'un_kode'},
        {name: 'un_nama'},
        {name: 'dpa_angg',type:'float'},
        {name: 'dpa_akum',type:'float'},
        {name: 'dpa_tersedia',type:'float'} 
        
        
        
    ])
});

var dpaDetailSearchStore = new Ext.data.Store({
    proxy: new Ext.data.HttpProxy({
        url: urldpadetailsearch
    }),
    reader: new Ext.data.JsonReader({
        root: 'dpadetails',
        totalProperty: 'total',
        id: 'dpad_id'
    }, [
        {name: 'angg_kode'},
        {name:'akun_kode'},
        {name: 'akun_nama'},
        {name: 'dpad_nilai'},
      
        {name: 'dpad_nilai',type:'float'} 
        
        
        
        
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


var dpaSearchStore = new Ext.data.Store({
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