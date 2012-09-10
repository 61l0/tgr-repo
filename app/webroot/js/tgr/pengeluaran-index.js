var urlsppsearch=HOST_PATH+'/spp/searchspp';
var  urlbendasearch=HOST_PATH+'/pns/searchbenda';
var MyDesktop = new Ext.app.App({
	init :function(){
		  
	},
	 
	getModules : function(){
		return [
		        new MyDesktop.SPMGridWindow(),
		        new MyDesktop.EntrySPMForm(),
		        new MyDesktop.SP2DGridWindow(),
		        new MyDesktop.EntrySP2DForm()
		        
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