/*   SPD */
var  urlspdmaster=HOST_PATH+'/spd/getall'; 
var urladdspdmaster=HOST_PATH+'/spd/add';
var urladdspddetail0=HOST_PATH+'/spd/adddetail0';
var urlgetspddetail0=HOST_PATH+'/spdper/getdetail0';
var urlgetspddetail1=HOST_PATH+'/spdper/readdetail_bl';
var urlgetspddetail2=HOST_PATH+'/spdper/readdetail_btl';
var urlgetspdpercombo=HOST_PATH+'/spdper/getforcombo';
var urlgetspdpersingle=HOST_PATH+'/spdper/getsingle';


var detailPer2Store = new Ext.data.Store({
    proxy: new Ext.data.HttpProxy({
        url: urlgetspddetail2
    }),
    reader: new Ext.data.JsonReader({
        root: 'data',
        totalProperty: 'total',
        id: 'spdd_id'
    }, [
       {name:'spdd_id'},
	{name: 'akun_kode'},
	{name: 'akun_nama'},
	{name: 'spdm_id'},
	{name: 'spdd_akum',type:'float'}, 
	{name: 'spdd_angg',type:'float'},
	{name: 'spdd_nilai',type:'float'},
	{name: 'spdd_sisa',type:'float'} 
        
    ]),
    listeners : {
    	load : function (thistore,recordlist,object){
    		SpdBtlDetailStore.removeAll();
    		Ext.MessageBox.hide();
    		for (i=0;i<recordlist.length;i++){
    			//alert(recordlist[i].get('akun_kode')+":"+recordlist[i].get('akun_nama')+":"+recordlist[i].get('spdd_angg')+":"+recordlist[i].get('spdd_akum')
				//+":"+recordlist[i].get('spdd_nilai')+":"+recordlist[i].get('spdd_sisa'));
	    		var abc = new SpdBtlDetailStore.recordType({
					 spdd_id: 0,
					 spdm_id: '',
					
					akun_kode:recordlist[i].get('akun_kode'),
					akun_nama:recordlist[i].get('akun_nama'),
					spdd_angg:recordlist[i].get('spdd_angg'),
					spdd_akum:recordlist[i].get('spdd_akum'),
					spdd_nilai:recordlist[i].get('spdd_nilai'),
					spdd_sisa:recordlist[i].get('spdd_sisa')
				
				});
		 
				SpdBtlDetailStore.add(abc);
    		}
    		
    		 
    	}
    }
    
});


var detailPer1Store = new Ext.data.Store({
    proxy: new Ext.data.HttpProxy({
        url: urlgetspddetail1
    }),
    reader: new Ext.data.JsonReader({
        root: 'data',
        totalProperty: 'total',
        id: 'spdd_id',
    fields : [
        	{name: 'spdd_id'},
	{name: 'dpam_no'},
	{name: 'keg_kode'},
	{name: 'keg_nama'},
	{name: 'spdm_id'},
	 
	{name: 'spdd_angg',type:'float'},
	{name: 'spdd_akum',type:'float'},
	{name: 'spdd_nilai',type:'float'},
	{name: 'spdd_sisa',type:'float'} 
       
        
    ]
    }),
    listeners : {
    	load : function (thistore,recordlist,object){
    		SpdBlDetailStore.removeAll();
    		for (i=0;i<recordlist.length;i++){
    		abc = new SpdBlDetailStore.recordType({
					spdd_id: 0,
					spdm_id: '',
					dpam_no:recordlist[i].get('dpam_no'),
					keg_kode:recordlist[i].get('keg_kode'),
					keg_nama:recordlist[i].get('keg_nama'),
					spdd_angg:recordlist[i].get('spdd_angg'),
					spdd_akum:recordlist[i].get('spdd_akum'),
					spdd_nilai:recordlist[i].get('spdd_nilai'),
					spdd_sisa:recordlist[i].get('spdd_sisa')
			
			});
		 
			SpdBlDetailStore.add(abc);
    		}
    		Ext.MessageBox.hide();
    		 
    	}
    }
    
});
var detailPer0Store=new Ext.data.JsonStore({
	
	remoteSort: false,
	root: 'spdperdetails',
	totalProperty: 'total',
    idProperty: 'spdd_id',
	fields: [
	 
		{name:'spdd_id'},
		{name:'spdm_id'},
		{name:'dpam_no'},
		{name:'spdd_angg'},
		{name:'spdd_akum'},
		{name:'spdd_nilai'},
		{name:'spdd_sisa'},
		{name:'spdd_tersedia',mapping: function(data, record) {
	        return parseFloat(data.spdd_angg)-parseFloat(data.spdd_akum);
	    	}
		}
		
	]
	,
	proxy: new Ext.data.HttpProxy({
        url:urlgetspdperdetail0
    }),
	listeners: {
		load: function(a, b, c){
			if (b[0]){
				arecord=b[0];
			 
				 Ext.getCmp('spdd_dpamno2').setValue(arecord.get("dpam_no"));
				 Ext.getCmp('spdd_angg2').setValue(arecord.get("spdd_angg"));
				 Ext.getCmp('spdd_nilai2').setValue(arecord.get("spdd_nilai"));
				 Ext.getCmp('spdd_akum2').setValue(arecord.get("spdd_akum"));
				 Ext.getCmp('spdd_tersedia2').setValue(arecord.get("spdd_tersedia"));
				 Ext.getCmp('spdd_sisa2').setValue(arecord.get("spdd_sisa"));
				 
			 
			}
			else {
				if (Ext.getCmp('entrybtl_spd')){
					 Ext.getCmp("entrybtl_spd").getForm().reset();
				}
			}
		 
		 
		}
	}


})
var masterPerStore = new Ext.data.JsonStore({
   
	remoteSort: false,
	root: 'spdpermasters',
	totalProperty: 'total',
    idProperty: 'spdm_id',
	fields: [
	 	{name:'spdm_id' },
		 
		 
		{name:'spdm_benda' },
		{name:'spdm_bendanama' },
		
		{name:'spdm_ppkd' },
		{name:'spdm_ppkdnama' },
		
		{name:'spdm_uraian' },
		{name:'spdm_total' },
		{name:'spdm_akum' },
		{name:'spdm_tersedia' },
		{name:'spdm_angg' },
		{name:'spdm_sisa' },
		{name:'spdm_bln1' },
		{name:'spdm_bln2' } 
	 
	]
	,
	proxy: new Ext.data.HttpProxy({
        url:urlgetspdpersingle
    }),
	listeners: {
		load: function(a, b, c){
			 if (b[0]){
			 	arecord=b[0];
			 	 
			 	Ext.getCmp('spdm_benda2').setValue(arecord.get('spdm_benda'));
			 	Ext.getCmp('spdm_bendanama2').setValue(arecord.get('spdm_bendanama'));
			 	
			 	Ext.getCmp('spdm_ppkd2').setValue(arecord.get('spdm_ppkd'));
			 	Ext.getCmp('spdm_ppkdnama2').setValue(arecord.get('spdm_ppkdnama'));
			 	Ext.getCmp('spdm_uraian2').setValue(arecord.get('spdm_uraian'));
			 	Ext.getCmp('spdm_total2').setValue(arecord.get('spdm_total'));
			 	Ext.getCmp('spdm_akum2').setValue(arecord.get('spdm_akum'));
			 	Ext.getCmp('spdm_tersedia2').setValue(arecord.get('spdm_tersedia'));
			 	Ext.getCmp('spdm_angg2').setValue(arecord.get('spdm_angg'));
			 	Ext.getCmp('spdm_sisa2').setValue(arecord.get('spdm_sisa'));
			 	Ext.getCmp('spdm_bln1').setValue(arecord.get('spdm_bln1'));
			 	Ext.getCmp('spdm_bln2').setValue(arecord.get('spdm_bln2'));
			 	detailPer0Store.load({
		 				params: {
		 					spdm_id: arecord.get('spdm_id')
		 				}
		 			});
		 		detailPer2Store.load({
		 				params: {
		 					spdm_id: arecord.get('spdm_id')
		 				}
		 			});
		 		detailPer1Store.load({
		 				params: {
		 					spdm_id: arecord.get('spdm_id')
		 				}
		 			});
			 }
		}
	}

});
var SpdPerComboStore = new Ext.data.JsonStore({
   
	remoteSort: false,
	root: 'spdpermasters',
	totalProperty: 'total',
    idProperty: 'spdm_id',
	fields: [
	 
		{name:'spdm_id'},
		{name:'spdm_no'},
		{name:'spdm_tgl'},
		{name:'un_id'},
		{name:'un_kode'},
		{name:'un_nama'}	
	]
	,
	proxy: new Ext.data.HttpProxy({
        url:urlgetspdpercombo
    }),
	listeners: {
		load: function(a, b, c){
			 
		}
	}

});
var SpdDetail0Store = new Ext.data.JsonStore({
   
	remoteSort: false,
	root: 'spddetails',
	totalProperty: 'total',
    idProperty: 'spdd_id',
	fields: [
	 
		{name:'data[SpdDetail0][spdd_id]',mapping:'spdd_id'},
		{name:'data[SpdDetail0][spdm_id]',mapping:'spdm_id'},
		{name:'data[SpdDetail0][dpam_no]',mapping:'dpam_no'},
		{name:'data[SpdDetail0][spdd_angg]',mapping:'spdd_angg'},
		{name:'data[SpdDetail0][spdd_akum]',mapping:'spdd_akum'},
		{name:'data[SpdDetail0][spdd_nilai]',mapping:'spdd_nilai'},
		{name:'data[SpdDetail0][spdd_sisa]',mapping:'spdd_sisa'},
		{name:'data[SpdDetail0][spdd_tersedia]',mapping: function(data, record) {
	        return parseFloat(data.spdd_angg)-parseFloat(data.spdd_akum);
	    	}
		}
		
	]
	,
	proxy: new Ext.data.HttpProxy({
        url:urlgetspddetail0
    }),
	listeners: {
		load: function(a, b, c){
			if (b[0]){
				if (Ext.getCmp('entrybtl_spd')){
					 Ext.getCmp("entrybtl_spd").getForm().loadRecord(b[0]);
				}
			 
			}
		 
		}
	}

});

var SPDMasterJsonReader =  new Ext.data.JsonReader({
 
	remoteSort: false,
	root: 'spdmasters',
	totalProperty: 'total',
    idProperty: 'SpdMasterList.spdm_id',
	fields: [
		{name:'SpdMasterList.spdm_id'},
		{name:'astate',mapping:'SpdMasterList.spdm_state'},
	  
	 	{name:'data[SpdMaster][astate]',mapping:'SpdMasterList.astate'},
		{name:'data[SpdMaster][spdper_no]',mapping:'SpdMasterList.spdper_no'}, 
		{name:'data[SpdMaster][spdm_id]',mapping:'SpdMasterList.spdm_id'},
		{name:'data[SpdMaster][spdm_no]',mapping:'SpdMasterList.spdm_no'},
		{name:'data[SpdMaster][spdm_tgl]',mapping:'SpdMasterList.spdm_tgl', type: 'date', dateFormat: 'Y-m-d'},
		{name:'data[SpdMaster][un_id]',mapping:'SpdMasterList.un_id'},
		{name:'data[SpdMaster][un_kode]',mapping:'SpdMasterList.un_kode'},
		{name:'data[SpdMaster][un_nama]',mapping:'SpdMasterList.un_nama'},
		{name:'data[SpdMaster][spdm_benda]',mapping:'SpdMasterList.spdm_benda'},
		{name:'data[SpdMaster][spdm_bendanama]',mapping:'SpdMasterList.spdm_bendanama'},
		
		{name:'data[SpdMaster][spdm_ppkd]',mapping:'SpdMasterList.spdm_ppkd'},
		{name:'data[SpdMaster][spdm_ppkdnama]',mapping:'SpdMasterList.spdm_ppkdnama'},
		
		{name:'data[SpdMaster][spdm_uraian]',mapping:'SpdMasterList.spdm_uraian'},
		{name:'data[SpdMaster][spdm_total]',mapping:'SpdMasterList.spdm_total'},
		{name:'data[SpdMaster][spdm_akum]',mapping:'SpdMasterList.spdm_akum'},
		{name:'data[SpdMaster][spdm_tersedia]',mapping:'SpdMasterList.spdm_tersedia'},
		{name:'data[SpdMaster][spdm_angg]',mapping:'SpdMasterList.spdm_angg'},
		{name:'data[SpdMaster][spdm_sisa]',mapping:'SpdMasterList.spdm_sisa'},
		{name:'data[SpdMaster][spdm_bln1]',mapping:'SpdMasterList.spdm_bln1'},
		{name:'data[SpdMaster][spdm_bln2]',mapping:'SpdMasterList.spdm_bln2'} 
		 
	]
	 
	 
});
function hitungTotalSPD(){
		 
	
}
function proc_spd2(o){
	/*
	spd_idx=o.row;
	if (o.field=='spdd_nilai'){
		$sisa=parseFloat(o.record.get('spdd_angg'))-parseFloat(o.record.get('spdd_akum'))-parseFloat(o.value);
		o.record.set('spdd_sisa',$sisa);
	}
	if (o.field=='dpam_no'){
		 
		//search in detailstore first
		start_search=1;
		if (spd_idx!=0) start_search=0;
		searchIdx=SpdBlDetailStore.findBy(function(record, id){
	         if(record.get('dpam_no') === o.value  ) {
			   		 
	              return true;  // a record with this data exists
	        }
	        return false;  // there is no record in the store with this data
	    	},SpdBlDetailStore,start_search);
		
		if (searchIdx<0) {
			newrec=dpaBLSearchStore.findBy(function(record, id){
	         if(record.get('dpam_no') === o.value  ) {
			   		 
	              return true;  // a record with this data exists
	        }
	        return false;  // there is no record in the store with this data
	    	},dpaBLSearchStore,0);
	
	  
		 	if (newrec>=0){
		 		o.record.set('keg_kode',dpaBLSearchStore.getAt(newrec).get('keg_kode'));
		 		o.record.set('keg_nama',dpaBLSearchStore.getAt(newrec).get('keg_nama'));
		 		o.record.set('spdd_angg',dpaBLSearchStore.getAt(newrec).get('nilaiangg'));
		 		o.record.set('spdd_nilai',0);
		 		o.record.set('spdd_akum',dpaBLSearchStore.getAt(newrec).get('nilaiakum'));
		 		o.record.set('spdd_sisa',dpaBLSearchStore.getAt(newrec).get('nilaitersedia'));
		 	}
		 	else {
		 		SpdBlDetailStore.removeAt(spd_idx);
		 	}
		}
		else {
			//found
			App.setAlert('Warning',"DPA tersebut telah dientri sebelumnya...");
			SpdBlDetailStore.removeAt(spd_idx);
			spdBlDetailGrid.getSelectionModel().selectRow(searchIdx, false, false);
	  		spdBlDetailGrid.startEditing(searchIdx, 5);
		}
		
	}
	hitungTotalSPD();
	*/
}
function proc_spd1(o){
	/*
	spd_idx=o.row;
	if (o.field=='spdd_nilai'){
		$sisa=parseFloat(o.record.get('spdd_angg'))-parseFloat(o.record.get('spdd_akum'))-parseFloat(o.value);
		o.record.set('spdd_sisa',$sisa);
	}
	if (o.field=='akun_kode'){
		//search in detailstore first
		start_search=1;
		if (spd_idx!=0) start_search=0;
		searchIdx=SpdBtlDetailStore.findBy(function(record, id){
	         if(record.get('akun_kode') === o.value  ) {
			   		 
	              return true;  // a record with this data exists
	        }
	        return false;  // there is no record in the store with this data
	    	},SpdBtlDetailStore,start_search);
		
		if (searchIdx<0) {
			newrec=dpaBTLSearchStore.findBy(function(record, id){
	         if(record.get('akun_kode') === o.value  ) {
			   		 
	              return true;  // a record with this data exists
	        }
	        return false;  // there is no record in the store with this data
	    	},dpaBTLSearchStore,0);
	
	  
		 	if (newrec>=0){
		 	 
		 		o.record.set('akun_nama',dpaBTLSearchStore.getAt(newrec).get('akun_nama'));
		 		o.record.set('spdd_nilai',0);
		 		o.record.set('spdd_akum',dpaBTLSearchStore.getAt(newrec).get('nilaiakum'));
		 		o.record.set('spdd_angg',dpaBTLSearchStore.getAt(newrec).get('nilaiangg'));
		 		o.record.set('spdd_sisa',dpaBTLSearchStore.getAt(newrec).get('nilaiakum'));
		 	}
		 	else {
		 		SpdBtlDetailStore.removeAt(spd_idx);
		 	}
		}
		else {
			//found
			App.setAlert('Warning',"Akun tersebut telah dientri sebelumnya...");
			SpdBtlDetailStore.removeAt(spd_idx);
			spdBtlDetailGrid.getSelectionModel().selectRow(searchIdx, false, false);
	  		spdBtlDetailGrid.startEditing(searchIdx, 4);
		}
		
	}
	hitungTotalSPD();
	*/
}
var SpdMasterStore = new Ext.data.GroupingStore({
  	reader:SPDMasterJsonReader,
	groupField:'data[SpdMaster][un_nama]',
	 remoteGroup:false,
	  groupOnSort: false,
	 
	proxy: new Ext.data.HttpProxy({
        url: urlspdmaster
    })
});



var spdBtl_proxy = new Ext.data.HttpProxy({
    api: {
        read : HOST_PATH+'/spd/readdetail_btl',
        create : HOST_PATH+'/spd/createdetail_btl',
        update:  HOST_PATH+'/spd/updatedetail_btl',
        destroy:  HOST_PATH+'/spd/destroydetail_btl'
    },
	listeners: {
		beforewrite : function(proxy, action) {
			App.setAlert(App.STATUS_NOTICE,"SPD : "+action+": Menyimpan data...");
			},
		 write : function(proxy, action, result, res, rs) {
			App.setAlert(true, "SPD  :"+action+":"+res.message);
			},
		exception : function(proxy, type, action, options, res) {
			if (type === 'remote') {
			Ext.Msg.show({
				title: 'REMOTE EXCEPTION',
				msg: res.message,
				icon: Ext.MessageBox.ERROR,
				buttons: Ext.Msg.OK
			});
			}
			}
	}
});
var spdBtl_reader = new Ext.data.JsonReader({
	totalProperty: 'total',
    successProperty: 'success',
    idProperty: 'spdd_id',
    root: 'data',
    messageProperty: 'message',  // <-- New "messageProperty" meta-data
	fields : [ 

 
	{name:'spdd_id'},
	{name: 'akun_kode'},
	 
	
	{name: 'akun_nama'},
	{name: 'spdm_id'},
	{name: 'spdd_akum',type:'float'}, 
	{name: 'spdd_angg',type:'float'},
	{name: 'spdd_nilai',type:'float'},
	{name: 'spdd_sisa',type:'float'} 
	 
] }); 

// The new DataWriter component.
var spdBtl_writer = new Ext.data.JsonWriter({
    encode: true,
    writeAllFields: true,
	listful:true
});

// Typical Store collecting the Proxy, Reader and Writer together.
var SpdBtlDetailStore = new Ext.data.Store({
    id: 'SpdBtlDetailStore',
    proxy: spdBtl_proxy,
    reader: spdBtl_reader,
    writer: spdBtl_writer,  // <-- plug a DataWriter into the store just as you would a Reader
    autoSave: false, // <-- false would delay executing create, update, destroy requests until specifically told to do so with some [save] buton.
	autoLoad: true  
});
 
var SpdBtlDetailGrid = Ext.extend( Ext.grid.EditorGridPanel, {
    iconCls: 'icon-form',
    frame:false,
	border:false,
	loadMask: true,
	// plugins:[ new Ext.ux.grid.GridSummary({position:'bottom',height:0})],
	sm: new Ext.grid.RowSelectionModel({	moveEditorOnEnter:false,
								singleSelect: true }),
    initComponent : function() {
 
	this.relayEvents(this.store, ['destroy', 'save', 'update']); 
	//this.tbar = this.buildTopToolbar();
    SpdBtlDetailGrid.superclass.initComponent.call(this);
    },
 
    buildTopToolbar : function() {
      return {
			plugins: new Ext.ux.ToolbarKeyMap(),
			items: [{
				text: '<u>T</u>ambah',
				iconCls: 'add',
				 keyBinding: {
                            key: 't',
                            alt: true
                        },
				handler: this.onAdd,
				scope: this
			}, '-', {
				text: '<u>H</u>apus',
				iconCls: 'delete',
				handler: this.onDelete,
				scope: this,
				 keyBinding: {
                            key: 'h',
                            alt: true
                        }
			}, '-']
		}
    },
	onAdd: function(btn, ev) {
		 
		var rec = this.store.getAt(0);
		var acontinue=false;
		// alert(rec);
		//check cust_code1 first
		
		if (rec){
			aakun_kode=rec.get("akun_kode");
		 
			if (aakun_kode.length>0){
				acontinue=true;
			}
		}else{
			acontinue=true;
		}
	 
		if (acontinue) {
			//alert('continue');
			var u = new this.store.recordType({
				spdd_id: 0,
				spdm_id: '',
				dpam_no:'',
				 
				akun_kode:'',
				akun_nama:'',
				spdd_angg:0,
				spdd_akum:0,
				spdd_nilai:0,
				spdd_sisa:0  
			});
			
			this.store.insert(0, u);
			
			 this.getSelectionModel().selectRow(0,false,false);
			 this.startEditing(0, 0);
			 
		}
		else {
			 this.getSelectionModel().selectRow(0,false,false);
			 this.startEditing(0, 0);
		}
	},
 
    onDelete : function(btn, ev) {
         var index =this.getSelectionModel().getSelected();
        if (!index) {
            return false;
        }
        
		 
        this.store.remove(index);
		hitungTotalSPD();
		 
    },
	listeners : {
		afteredit: function (o){
			//alert(o.field+":"+o.value+":"+o.originalValue+":"+o.row+":"+o.column );			
			proc_spd1(o);
		}
		 
	}
});



var spdBl_proxy = new Ext.data.HttpProxy({
    api: {
        read : HOST_PATH+'/spd/readdetail_bl',
        create : HOST_PATH+'/spd/createdetail_bl',
        update:  HOST_PATH+'/spd/updatedetail_bl',
        destroy:  HOST_PATH+'/spd/destroydetail_bl'
    },
	listeners: {
		beforewrite : function(proxy, action) {
			App.setAlert(App.STATUS_NOTICE,"Permohonan SPD : "+action+": Menyimpan data...");
			},
		 write : function(proxy, action, result, res, rs) {
			App.setAlert(true, "Permohonan SPD  :"+action+":"+res.message);
			},
		exception : function(proxy, type, action, options, res) {
			if (type === 'remote') {
			Ext.Msg.show({
				title: 'REMOTE EXCEPTION',
				msg: res.message,
				icon: Ext.MessageBox.ERROR,
				buttons: Ext.Msg.OK
			});
			}
			}
	}
});
var spdBl_reader = new Ext.data.JsonReader({
	totalProperty: 'total',
    successProperty: 'success',
    idProperty: 'spdd_id',
    root: 'data',
    messageProperty: 'message'  // <-- New "messageProperty" meta-data
}, [ 
	{name: 'spdd_id'},
	{name: 'dpam_no'},
	{name: 'spdm_id'},
	{name: 'keg_kode'},
	{name: 'keg_nama'},
	
	 
	{name: 'spdd_angg',type:'float'},
	{name: 'spdd_akum',type:'float'},
	{name: 'spdd_nilai',type:'float'},
	{name: 'spdd_sisa',type:'float'} 
	 
]); 

// The new DataWriter component.
var spdBl_writer = new Ext.data.JsonWriter({
    encode: true,
    writeAllFields: true,
	listful:true
});

// Typical Store collecting the Proxy, Reader and Writer together.
var SpdBlDetailStore = new Ext.data.Store({
    id: 'SpdBlDetailStore',
    proxy: spdBl_proxy,
    reader: spdBl_reader,
    writer: spdBl_writer,  // <-- plug a DataWriter into the store just as you would a Reader
    autoSave: false, // <-- false would delay executing create, update, destroy requests until specifically told to do so with some [save] buton.
	autoLoad: true  
});
 
var SpdBlDetailGrid = Ext.extend( Ext.grid.EditorGridPanel, {
    iconCls: 'icon-form',
    frame:false,
	border:false,
	loadMask: true,
//	 plugins:[ new Ext.ux.grid.GridSummary({position:'bottom',height:0})],
	sm: new Ext.grid.RowSelectionModel({	moveEditorOnEnter:false,
								singleSelect: true }),
    initComponent : function() {
 
	this.relayEvents(this.store, ['destroy', 'save', 'update']); 
	//this.tbar = this.buildTopToolbar();
    SpdBlDetailGrid.superclass.initComponent.call(this);
    },
 
    buildTopToolbar : function() {
      return {
			plugins: new Ext.ux.ToolbarKeyMap(),
			items: [{
				text: '<u>T</u>ambah',
				iconCls: 'add',
				 keyBinding: {
                            key: 't',
                            alt: true
                        },
				handler: this.onAdd,
				scope: this
			}, '-', {
				text: '<u>H</u>apus',
				iconCls: 'delete',
				handler: this.onDelete,
				scope: this,
				 keyBinding: {
                            key: 'h',
                            alt: true
                        }
			}, '-']
		}
    },
	onAdd: function(btn, ev) {
		 
		var rec = this.store.getAt(0);
		var acontinue=false;
		// alert(rec);
		//check cust_code1 first
		
		if (rec){
			adpam_no=rec.get("dpam_no");
		 
			if (adpam_no.length>0){
				acontinue=true;
			}
		}else{
			acontinue=true;
		}
	 
		if (acontinue) {
			//alert('continue');
			var u = new this.store.recordType({
				spdd_id: 0,
				spdm_id: '',
				dpam_no:'',
			 
				spdd_angg:0,
				spdd_akum:0,
				spdd_nilai:0,
				spdd_sisa:0  
			});
			
			this.store.insert(0, u);
			
			 this.getSelectionModel().selectRow(0,false,false);
			 this.startEditing(0, 0);
			 
		}
		else {
			 this.getSelectionModel().selectRow(0,false,false);
			 this.startEditing(0, 0);
		}
	},
 
    onDelete : function(btn, ev) {
         var index =this.getSelectionModel().getSelected();
        if (!index) {
            return false;
        }
        
		 
        this.store.remove(index);
		 
    },
	listeners : {
		afteredit: function (o){
			//alert(o.field+":"+o.value+":"+o.originalValue+":"+o.row+":"+o.column );			
			proc_spd2(o);
		}
		 
	}
});
 
MyDesktop.SPDGridWindow = Ext.extend(Ext.app.Module, {
    id:'spdgrid-win',
   init : function(){
      this.launcher = {
            text: 'SPD',
            iconCls:'icon-grid',
            handler : this.createWindow,
            scope: this
        };
     },
    createWindow : function(){
        var desktop = this.app.getDesktop();
        var win2 = desktop.getWindow(this.id);
		
        if(!win2){
            win2 = desktop.createWindow({
                id: this.id,
                title:'SPD',
                width:700,
                height:400,
                iconCls: 'icon-grid',
                 shim:false,
                animCollapse:false,
                constrainHeader:true,
				stripeRows: true,
                layout: 'fit', 
				border:false,
                items: 
					gridspd = new Ext.grid.GridPanel({
							id: 'gridspd',
						 
							 store: SpdMasterStore,
							trackMouseOver: true,
							disableSelection: false,
							loadMask: true,
							// grid columns
							columns: [ 
							{
								header: "Status",
								dataIndex: 'spdm_state',
								width:50,
								sortable: true,
								renderer: StateChange
							},   {
								header: "No",
								dataIndex: 'data[SpdMaster][spdm_no]',
								width: 100,
								sortable: true
							},
							{
								header: "Tanggal",
								dataIndex: 'data[SpdMaster][spdm_tgl]',
								width: 150,
								sortable: true,
								 renderer: function(date) { return date.format("d/m/Y"); }
						
							},
							{
								header: "No Permohonan",
								dataIndex: 'data[SpdMaster][spdper_no]',
								width: 100,
								sortable: true
							},
							 {
								header: "SPKD",
								dataIndex: 'data[SpdMaster][un_nama]',
								width: 150,
								sortable: true
							},
							{
								header: "Bendahara",
								dataIndex: 'data[SpdMaster][spdm_bendanama]',
								width: 100,
								sortable: true
							},
							{
								header: "PPKD",
								dataIndex: 'data[SpdMaster][spdm_ppkdnama]',
								width: 100,
								sortable: true
							},
							 
							{
								header: "Anggaran",
								dataIndex: 'data[SpdMaster][spdm_angg]',
								width: 120,
								sortable: true,
								align: 'right',
								renderer: Ext.util.Format.numberRenderer('0,000.00')
							},
							{
								header: "Akumulasi",
								dataIndex: 'data[SpdMaster][spdm_akum]',
								width: 120,
								sortable: true,
								align: 'right',
								renderer: Ext.util.Format.numberRenderer('0,000.00')
							
							},
							 {
								header: "Total",
								dataIndex: 'data[SpdMaster][spdm_total]',
								width: 120,
								align: 'right', 
								renderer: Ext.util.Format.numberRenderer('0,000.00')
								 
						 	},
							{
								header: "Sisa",
								dataIndex: 'data[SpdMaster][spdm_sisa]',
								width: 80,
								align: 'right',
							 	renderer: Ext.util.Format.numberRenderer('0,000.00')
								 
						 	}  
							  
							],
							
							  view: new Ext.grid.GroupingView({
								 
								groupTextTpl: '{text} ({[values.rs.length]} {[values.rs.length > 1 ? "Items" : "Item"]})'
							}),
							sm: new Ext.grid.RowSelectionModel({
								singleSelect: true,
								listeners: {
									 
									selectionchange: function(sm){
										if (sm.getCount()) {
											 
												Ext.getCmp('editspdbutt').enable();
											 
											 Ext.getCmp('delspdbutt').enable();
										 }
										else {
										 	Ext.getCmp('delspdbutt').disable();
										 	Ext.getCmp('editspdbutt').disable();
											 
										 	 
										}
									}
								}
							}),
							bbar: new Ext.PagingToolbar({
								pageSize: 20,
								 store: SpdMasterStore,
								displayInfo: true,
								displayMsg: 'Displaying contents {0} - {1} of {2}',
								emptyMsg: "No Content to display",
								plugins: new Ext.ux.SlidingPager(),
								listeners :{
										'change' : function(){
										 SpdMasterStore.baseParams={start:'start',limit:'limit',search:Ext.getCmp("searchSPDTxt").getValue()};
			    
										}
									}
									 
							}),
							tbar: [{
								text: 'SPD',
								iconCls: 'spd',
								ref: '../spdButton',
								
								menu: {
									xtype: 'menu',
									plain: true,
									items: [{
										text: 'Tambah',
										iconCls: 'add',
										handler: function(){
											 
											 MyDesktop.getSingleModule('entryspd-win').createWindow();
											 entryspdform.getForm().reset();
									 			entrybtl_spd.getForm().reset();
									 			SpdBlDetailStore.load({
									 				params: {
									 					spdm_id: 0
									 				}
									 			});
												SpdBtlDetailStore.load({
									 				params: {
									 					spdm_id: 0
									 				}
									 			});
									 			Ext.getCmp('spdm_tgl2').setValue(new Date());
												Ext.getCmp('spdm_tgl2').setReadOnly(false);
												Ext.getCmp('spdm_id2').setValue(0);
											 
												Ext.getCmp('un_id2').enable();
															 
										}
									   } , {
										id: 'editspdbutt',
										text: 'Ubah',
										iconCls: 'edit',
										disabled: true,
										handler: function(){
										 
										}
									},{
											id: 'delspdbutt',
											text: 'Hapus',
											iconCls: 'delete',
											disabled: true,
											handler: function(){
												/*
												  aid=gridspd.getSelectionModel().getSelected().get('SpdMasterList.spdm_id');
												
												Ext.MessageBox.show({
										           title:'Delete Record?',
										           msg: 'Are you sure you want to delete selected record?',
										           buttons: Ext.MessageBox.YESNO,
										           fn: showResult,
										          
										           icon: Ext.MessageBox.QUESTION
										        });
												 function showResult(btn){
											       if (btn == 'yes') {
													   	 Ext.MessageBox.show({
												           msg: 'Request delete record #'+aid+'...',
												           progressText: 'Process...',
												           width:300,
												           wait:true,
												           waitConfig: {interval:200},
												           icon:'ext-mb-download', //custom class in msg-box.html
												           animEl: 'mb7'
												       });
						
														 Ext.Ajax.request({
													        url:urldelspdmaster,
													        params : {id :aid},
															method: 'GET',
															success: function ( result, request ) { 
																	Ext.MessageBox.hide();
						
																	var jsonData = Ext.util.JSON.decode(result.responseText);
																 
																	Ext.MessageBox.alert('Information', jsonData.msg); 
																	SpdMasterStore.reload();
															},
															failure: function ( result, request) { 
																 Ext.MessageBox.hide();
						
																Ext.MessageBox.alert('Failed', result.responseText); 
															} 
						
													    });
												   }
											    };*/
											}
										}   ]
								
								
								}
							
							}, '-',
							 'Search Key',
							 new Ext.form.TextField({
									id:'searchSPDTxt',
								    text:'*',
							        emptyText:'*',
							        selectOnFocus:true,
									listeners: {
						              specialkey: function(f,e){
						                if (e.getKey() == e.ENTER) {
								                SpdMasterStore.load({params: {
													start: 0,
													limit: 20,
													 search:Ext.getCmp("searchSPDTxt").getValue()
											 }})
						       
						                }
						              }
						            }
									
							 }),' ',
							{
							 text:'Search',
				            tooltip:'Search Contents',
				            iconCls:'search',
							handler: function(){
								  SpdMasterStore.load({params: {
									start: 0,
									limit: 20,
									 search:Ext.getCmp("searchSPDTxt").getValue()
									 }})
						       
					        }
							}]
						
						})//end of grid
					
				
					
            });
        }
		 
        win2.show();
		SpdMasterStore.load({params:{start:0, limit:20, search:'*'}});
	 
	 
		 
		gridspd.on('rowdblclick',function(sm, rowindex, eventobject){
			 
			 mid=gridspd.getSelectionModel().getSelected().get("SpdMasterList.spdm_id");
		 	 SpdDetail0Store.load({params:{spdm_id:mid}});				 
			 SpdBlDetailStore.load({params:{spdm_id:mid}});
			 SpdBtlDetailStore.load({params:{spdm_id:mid}});
			 MyDesktop.getSingleModule('entryspd-win').createWindow();
			 Ext.getCmp("entryspdform").getForm().loadRecord(gridspd.getSelectionModel().getSelected());
			 
			
		});
		 
		 
	}
}); 


MyDesktop.EntrySPDForm = Ext.extend(Ext.app.Module, {
    id:'entryspd-win',
	title:'SPD',
	init : function(){
      this.launcher = {
            text: this.title,
            iconCls:'icon-grid',
            handler : this.createWindow,
            scope: this
        };
    },
	closeWindow:function(){
	     if(win7){
			win7.close();
		}
	},
    createWindow : function(){
       var desktop=this.app.getDesktop();
	  
	   win7=desktop.getWindow(this.id);
        if(!win7){
            win7 = desktop.createWindow({
                id: this.id,
                title:this.title,
                width:800,
                height:500,
                iconCls: 'icon-form',
                animCollapse:false,
                constrainHeader:true,
				stripeRows: true,
				border:false,
               layout:'fit',
                items :
					[entryspdform = new Ext.FormPanel({
						id:'entryspdform',
				      	 layout: 'border',
						defaults: {
							split: true 
						},
						
				      	frame:true,
				       	autoScroll :true,
				        border:false,
				        bodyStyle:'padding:5px 5px 0',
				      	 
						 autoWidth:true,
						 height:400,
						items: [
								{	region:'north', 
									layout:'column',
									bodyStyle:'padding:5px 5px 0 0',
									border: false,
									columns:2,
									defaults: {
										
										border: false,
										align:'left'
									},       
									 	autoHeight:true,   
									items: [{
											 defaults:{ layout:'form',anchor:'95%',  autoHeight:false},  
											layout: 'form',
											border: false, 	
										 	columnWidth:'.4',
											items:[  
											{	 xtype:'hidden',
												 name: 'data[SpdMaster][spdm_id]',
												 
												id:'spdm_id2' 
												 
											},
											 
											{	 xtype:'textfield',
												fieldLabel: 'No Surat',
												name: 'data[SpdMaster][spdm_no]',
												maxLength:20,
												id:'spdm_no2',
												 
												allowBlank:false 
												 
											},
											{	 xtype:'datefield',
												fieldLabel: 'Tanggal',
												id:'spdm_tgl2',
												name: 'data[SpdMaster][spdm_tgl]',
												maxLength:50, 
												format:'Y-m-d',
												value:new Date(),
												 
												 
												allowBlank:false
											}  
										]
									},
									{
										layout: 'form',
										border:false,
										defaults:{ layout:'form',anchor:'95%',  autoHeight:false},
										columnWidth:'.6', 
										items:[ 
											{
						                        xtype : 'compositefield',
						                       anchor:'95%',
						                        msgTarget: 'side',
						                        fieldLabel: 'SKPD',
						                        items : [ 
													new Ext.form.ComboBox({
									 						 id:'un_id2',
															 store: skpdSearchStore,
															 hiddenName:'data[SpdMaster][un_id]',
															 fieldLabel:'SKPD',
															 displayField:'un_kode',
															 typeAhead: false,
															 enableKeyEvents :true, 
															 valueField:'un_id',
															  triggerAction: 'all',
															 loadingText: 'Searching...',
															 minChars:0,
															 pageSize:20,
															 boxMinWidth: 80,
															 boxMinHeight: 100,
															 width:120,
															 hideTrigger:false,
															 forceSelection: true,
															 tpl:skpdComboTpl,
															 allowBlank:false,
															 itemSelector: 'div.search-skpd',
															 listeners: {
							  										select: function(thiscombo,record, index){
																		  
																		 Ext.getCmp('un_nama2').setValue(record.get('un_nama'));
																	 
																		 combo=Ext.getCmp('spdper_no2');
																		 
																	     combo.store.baseParams={un_id:record.get('un_id')};
									    	  							 combo.store.removeAll();
											 							 combo.lastQuery=null;
											 							 
											 							 dpaBLSearchStore.baseParams={un_id:record.get('un_id')};
																	}	
																}
															 
										
															 }),
													{	xtype:'textfield',
														id:'un_nama2',
														fieldLabel: '',
														name: 'data[SpdMaster][un_nama]',
														flex : 1,
														readOnly:true 
													}
													]
											}, //end of composite
											new Ext.form.ComboBox({
									 						 id:'spdper_no2',
															 store: SpdPerComboStore,
															 hiddenName:'data[SpdMaster][spdper_no]',
															 fieldLabel:'No Permohonan',
															 displayField:'spdm_no',
															 typeAhead: false,
															 enableKeyEvents :true, 
															 valueField:'spdm_no',
															  triggerAction: 'all',
															 loadingText: 'Searching...',
															 minChars:0,
															 pageSize:20,
															 boxMinWidth: 80,
															 boxMinHeight: 100,
															 width:120,
															 hideTrigger:false,
															 forceSelection: true,
															 
															 allowBlank:false,
															 
															 listeners: {
							  										select: function(thiscombo,record, index){
																		 masterPerStore.load({
																 				params: {
																 					query: record.get('spdm_no')
																 				}
																 			});
																 		 Ext.MessageBox.show({
																			msg: 'Loading Data..',
																			progressText: 'Process...',
																			width: 300,
																			wait: true,
																			waitConfig: {
																				interval: 200
																			},
																			icon: 'ext-mb-download', //custom class in msg-box.html
																			animEl: 'mb7'
																		});
																	}	
																}
															 
										
															 })
										]
									} 
									]
								}//end of top form
								,
								{
									 
									layout: 'fit',
									border: true,
									frame:false,
									region: 'center',
									items:  tabPanelSPD= new Ext.TabPanel({
													 
													id:'tabPanelSPD',
								                    border: false, // already wrapped so don't add another border
								                    activeTab: 0, // second tab initially active
								                    tabPosition: 'top',
								                    items: [{
															id:'tabspd1',
									                        layout:'hbox',
									                        title: 'Surat Penyediaan Dana',
									                        frame:true,
									                         items : [
											                        {
															            xtype:'fieldset',
															            title: 'Dasar Penyediaan Dana',
															            collapsible: false,
															            autoHeight:true,
															           	flex:1,
															           labelWidth:150,
															            defaultType: 'textfield',
															            defaults: {anchor:'95%' },
															            items :[ 
															               			
															           			 {  xtype : 'compositefield',
																                       anchor:'95%',
																                        msgTarget: 'side',
																                        fieldLabel: 'Bulan Penggunaan',
																                        items : [ 
																                        {	xtype:'textfield',
																						 
																							fieldLabel: '',
																							name: 'data[SpdMaster][spdm_bln1]',
																							flex : 1,
																							id:'spdm_bln1',
																							readOnly:true 
																						},
																						 {	xtype:'textfield',
																						 
																							fieldLabel: '',
																							name: 'data[SpdMaster][spdm_bln2]',
																							flex : 1,
																							 id:'spdm_bln2',
																							readOnly:true 
																						}]
																							  
																					},
																					{	xtype:'textfield',
																						 
																							fieldLabel: 'Bendahara Pengeluaran',
																							name: 'data[SpdMaster][spdm_benda]',
																						    id:'spdm_benda2',
																							readOnly:true 
																						},
																				 
																					{	xtype:'textfield',
																						 
																						fieldLabel: '',
																						name: 'data[SpdMaster][spdm_bendanama]',
																					 	id:'spdm_bendanama2',
																						readOnly:true 
																					},
																				 	{	xtype:'textfield',
																						 
																							fieldLabel: 'PPKD',
																							name: 'data[SpdMaster][spdm_ppkd]',
																						 	id:'spdm_ppkd2',
																							readOnly:true 
																						},
																					 
																					{	xtype:'textfield',
																						 
																						fieldLabel: '',
																						name: 'data[SpdMaster][spdm_ppkdnama]',
																						flex : 1,
																						id:'spdm_ppkdnama2',
																						readOnly:true 
																					},
																		 
															            	{
															                    fieldLabel: 'Ketentuan Lain',
															                    name: 'data[SpdMaster][spdm_ketentuan]',
															                    value: '',
															                    id:'spdm_ketentuan2',
															                    maxLength:500
															                },
															                {
															                    fieldLabel: 'Uraian',
															                    xtype: 'textarea',
															                    name: 'data[SpdMaster][spdm_uraian]',
															                    height:80,
															                    id:'spdm_uraian2',
															                    maxLength:500,
															                    value: ''
															                } 
															            ]
															        },{
															        	xtype:'spacer',
															        	width:'10' 
															        	
															     
															        },
															         { flex:1,
															            xtype:'fieldset',
															            title: 'Ikhtisar Penyediaan Dana',
															            collapsible: false,
															            autoHeight:true,
															              labelWidth:150,
															            defaults: {anchor:'95%',labelWidth:'200px'},
															            defaultType: 'numberfield',
															            items :[{
															                    fieldLabel: 'Jumlah Anggaran',
															                    name: 'data[SpdMaster][spdm_angg]',
															                    id:'spdm_angg2',
															                    value: '0',
															                    readOnly:true,
															                    align:'right'
															                },{
															                    fieldLabel: 'Jumlah Akumulasi SPD',
															                    name: 'data[SpdMaster][spdm_akum]',
															                    value: '0',
															                    id:'spdm_akum2' 
															                } ,{
															                    fieldLabel: 'Jumlah Tersedia',
															                    name: 'data[SpdMaster][spdm_tersedia]',
															                    value: '0',
															                    readOnly:true,
															                    id:'spdm_tersedia2'
															                },
															                {
															                    fieldLabel: 'Jumlah Total SPD',
															                    name: 'data[SpdMaster][spdm_total]',
															                    value: '0',
															                    readOnly:true,
															                    id:'spdm_total2'
															                },
															                 {
															                    fieldLabel: 'Jumlah Sisa Anggaran',
															                    name: 'data[SpdMaster][spdm_sisa]',
															                    value: '0',
															                    readOnly:true,
															                    id:'spdm_sisa2'
															                } 
															            ]
															        }
															      ]//end of item  
														},{id:'tabspd2',
									                        layout:'border',
									                        frame:true,
									                        defaults: {
																		split: true 
																	},
																	
									                        title: 'Belanja Gaji & Tunjangan',
									                        bodyStyle:'0 5px 5px 0',
									                        anchor:'95%',
									                        defaults: {anchor:'95%'},
									                        items : [
									                        		{
									                        		region:'north',
									                        		height:80,
									                        		layout:'fit',
									                        		items :
									                        			  
											                        	    entrybtl_spd = new Ext.FormPanel({
																			id:'entrybtl_spd',
																	      	layout:'column',
																			labelWidth:80,
																	      	frame:false,
																	       	autoScroll :true,
																	        border:false,
																	        bodyStyle:'padding:5px 5px 0',
																	      	 
																			 autoWidth:true,
																			 autoHeight:true,
																			 columns:3,
																			 items: [
																				{	      defaults:{ layout:'form',anchor:'95%',  autoHeight:false},  
																							layout: 'form',
																							border: false, 	
																						 	columnWidth:'.33',
																							items:[  
																							{
																								xtype:'hidden',
																								name:'data[SpdDetail0][spdm_id]' 
																								 
																							},
																							{
																								xtype:'hidden',
																								name:'data[SpdDetail0][spdd_id]' 
																								 
																							},
																									 {
																										 	xtype:'textfield',
																						                    fieldLabel: 'No DPA',
																						                    name: 'data[SpdDetail0][dpam_no]',
																						                 	id:'spdd_dpamno2',
																						                    value: '0',
																						                    align:'right'
																						                 },
																										 {
																										 	xtype:'numberfield',
																						                    fieldLabel: 'Anggaran',
																						                    name: 'data[SpdDetail0][spdd_angg]',
																						                    id:'spdd_angg2',
																						                    value: '0',
																						                    align:'right'
																						                 } 
																												 
																									]
																						},
																						{
																							layout: 'form',
																							border:false,
																							defaults:{ layout:'form',anchor:'95%',  autoHeight:false},
																							columnWidth:'.33', 
																							items:[ 
																								  {
																								 	xtype:'numberfield',
																				                    fieldLabel: 'Akumulasi',
																				                    name: 'data[SpdDetail0][spdd_akum]',
																				                    id:'spdd_akum2',
																				                    value: '0',
																				                    align:'right'
																				                  },
																				                  {
																								 	xtype:'numberfield',
																				                    fieldLabel: 'Tersedia',
																				                    name: 'data[SpdDetail0][spdd_tersedia]',
																				                    id:'spdd_tersedia2',
																				                    value: '0',
																				                    align:'right'
																				                  }
																								
																							]
																						} ,
																						{
																							layout: 'form',
																							border:false,
																							defaults:{ layout:'form',anchor:'95%',  autoHeight:false},
																							columnWidth:'.33', 
																							items:[ 
																								  {
																								 	xtype:'numberfield',
																				                    fieldLabel: 'Nilai SPD',
																				                    name: 'data[SpdDetail0][spdd_nilai]',
																				                    id:'spdd_nilai2',
																				                    value: '0',
																				                    align:'right'
																				                  },
																				                  {
																								 	xtype:'numberfield',
																				                    fieldLabel: 'Sisa',
																				                    name: 'data[SpdDetail0][spdd_sisa]',
																				                    id:'spdd_sisa2',
																				                    value: '0',
																				                    align:'right'
																				                  }
																								
																							]
																						} 
																					]
																				})//end of top form
									                        			}
																		,
																		{									            
											                        		region:'center',
											                        		layout:'fit',
											                        		items:spdBtlDetailGrid = new SpdBtlDetailGrid({
																				id: 'spdBtlDetailGrid',
																				autoWidth:true,
																				height: 300,
																				border: true,
																				frame:false,
																				stripeRows: true,
																				store: SpdBtlDetailStore,
																				
																				columns: [{
																					header: "Kode Rekening",
																					dataIndex: 'akun_kode',
																					width:150,
																					sortable: true 
																				}, {
																					header: "Uraian",
																					width: 200,
																					sortable: true,
																					dataIndex: 'akun_nama'
																				},   {
																					header: "Anggaran",
																					width: 100,
																					sortable: true,
																					summaryType: 'sum',
																					align:'right',
																					dataIndex: 'spdd_angg',
																					 renderer: Ext.util.Format.numberRenderer('0,000.00')
																					 
																				}, {
																					header: "Akumulasi",
																					width: 100,
																					sortable: true,
																					align:'right',
																					summaryType: 'sum',
																					dataIndex: 'spdd_akum',
																				 
																					renderer: Ext.util.Format.numberRenderer('0,000.00')
																				
																				},
																				{
																					header: "Nilai SPD",
																					width: 100,
																					sortable: true,
																					align:'right',
																					summaryType: 'sum',
																					dataIndex: 'spdd_nilai',
																					 
																					allowBlank: false,
																				 
																					renderer: Ext.util.Format.numberRenderer('0,000.00')
																				
																				},{
																					header: "Sisa",
																					width: 100,
																					sortable: true,
																					align:'right',
																					summaryType: 'sum',
																					dataIndex: 'spdd_sisa',
																				 
																					renderer: Ext.util.Format.numberRenderer('0,000.00')
																				
																				},
																				 {
																					header: "ID",
																					 
																					width: 40,
																					sortable: true,
																					dataIndex: 'spdd_id' 
																				} ]
																			
																			}) //end of grid
																					                        		
											                        	}
																	]
									                       
																	
									                        
														   },
									                        {id:'tabspd3',
									                        layout:'fit',
									                        title: 'Belanja Langsung',
									                        items:spdBlDetailGrid = new SpdBlDetailGrid({
																				id: 'spdBlDetailGrid',
																				autoWidth:true,
																				height: 300,
																				border: true,
																				frame:false,
																				stripeRows: true,
																				store: SpdBlDetailStore,
																				
																				columns: [{
																					header: "No DPA",
																					dataIndex: 'dpam_no',
																					sortable: true
																					 
																				}, {
																					header: "Kode Kegiatan",
																					width: 80,
																					sortable: true,
																					dataIndex: 'keg_kode'
																				}, {
																					header: "Nama Kegiatan",
																					width: 200,
																					sortable: true,
																					dataIndex: 'keg_nama'
																				},   {
																					header: "Anggaran",
																					width: 100,
																					sortable: true,
																					align:'right',
																					summaryType: 'sum',
																					dataIndex: 'spdd_angg',
																					 renderer: Ext.util.Format.numberRenderer('0,000.00')
																					 
																				}, {
																					header: "Akumulasi",
																					width: 100,
																					sortable: true,
																					align:'right',
																					summaryType: 'sum',
																					dataIndex: 'spdd_akum',
																				 
																					renderer: Ext.util.Format.numberRenderer('0,000.00')
																				
																				},
																				{
																					header: "Nilai SPD",
																					width: 100,
																					sortable: true,
																					align:'right',
																					summaryType: 'sum',
																					dataIndex: 'spdd_nilai',
																					isCellEditable: true,
																					allowBlank: false,
																				 
																					renderer: Ext.util.Format.numberRenderer('0,000.00')
																				
																				},{
																					header: "Sisa",
																					width: 100,
																					sortable: true,
																					align:'right',
																					summaryType: 'sum',
																					dataIndex: 'spdd_sisa',
																				 
																					renderer: Ext.util.Format.numberRenderer('0,000.00')
																				
																				},
																				 {
																					header: "ID",
																					hidden:true,
																					width: 40,
																					sortable: true,
																					dataIndex: 'spdd_id',
																					summaryType: 'count'
																				} ]
																			
																			}) //end of grid  
									                        } 
									                  ]
												})//end of tab
											 
									 
										 
								} 
							 ]
							  
				         ,
						 buttons: {
						 	layout: 'hbox',
							 defaults: {margins:'0 5 0 0'},
						 	items: [{
						 		text: 'Create New',
								id:'spd3-new',
								 
						 		iconCls: 'new',
						 		handler: function(){
						 			entryspdform.getForm().reset();
						 			entrybtl_spd.getForm().reset();
						 			SpdBlDetailStore.load({
						 				params: {
						 					spdm_id: 0
						 				}
						 			});
									SpdBtlDetailStore.load({
						 				params: {
						 					spdm_id: 0
						 				}
						 			});
						 			Ext.getCmp('spdm_tgl2').setValue(new Date());
									Ext.getCmp('spdm_tgl2').setReadOnly(false);
									Ext.getCmp('spdm_id2').setValue(0);
								 
									Ext.getCmp('un_id2').enable();
									 
						 		}
						 	},{
										text:'Print',
										id:'print_spd',
										tooltip:'Print ',
										iconCls:'printer',
										handler:function(){
											aid=Ext.getCmp('spdm_id2').getValue();
											aurl=HOST_PATH+'/rptspd/spd/'+aid;
											window.open(aurl,'_blank');
	
										}
								}, {
						 		xtype: 'spacer',
						 		flex: 1
						 	}, {
						 		text: 'Save',
						 		iconCls: 'save',
								id:'spd3-save',
								 
						 		handler: function(){
									hitungTotalSPD();
						 			if (entryspdform.getForm().isValid()) {
						 				entryspdform.getForm().submit({
						 					url: urladdspdmaster,
						 					waitMsg: 'Saving data...',
						 					success: function(form, action){
						 						newid = action.result.newid;
						 						newno = action.result.newno;
						 						if (newid != '') {
						 							//alert(newid);
														// Ext.getCmp('form_no').setValue(newid);
														// alert(newid);
														Ext.getCmp('spdm_no2').setValue(newno);
														Ext.getCmp('spdm_id2').setValue(newid)
														Ext.getCmp('spdm_no2').setReadOnly(true);
														SpdBlDetailStore.setBaseParam('master', newid);
														SpdBtlDetailStore.setBaseParam('master', newid);
														
														SpdBlDetailStore.save();
														SpdBtlDetailStore.save();
														Ext.getCmp('spdm_no2').setValue(newid);
														entrybtl_spd.getForm().submit({
						 											url: urladdspddetail0
						 											});
														
													}
													
												},
												failure: function(form, action){
													if (action.failureType === Ext.form.Action.CONNECT_FAILURE) {
														Ext.Msg.alert('Error', 'Status:' + action.response.status + ': ' +
														action.response.statusText);
													}
													if (action.failureType === Ext.form.Action.SERVER_INVALID) {
													
														Ext.Msg.alert('Invalid', action.result.msg);
													}
												}
											});
										}
										else {
											Ext.MessageBox.alert('Input Validation Error', 'Please check your input, thank you');
										}
									}
								}, {
									text: 'Cancel',
									id:'spd3-cancel',
									 
									margins:'0',
									handler: function(){
										SpdMasterStore.reload();
										MyDesktop.getSingleModule('entryspd-win').closeWindow();
										
										
									}
									
								}]
							}
		   		 }) //end of top panel
				 
				  
							 
				 ]// end of main item
                 
            });
        }
	
        win7.show();
		
		 
		
    }
});