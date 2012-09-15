/* Permohonan SPD */
var  urlspdpermaster=HOST_PATH+'/spdper/getall'; 
var urladdspdpermaster=HOST_PATH+'/spdper/add';
var urladdspdperdetail0=HOST_PATH+'/spdper/adddetail0';
var urlgetspdperdetail0=HOST_PATH+'/spdper/getdetail0';
var SpdperDetail0Store = new Ext.data.JsonStore({
   
	remoteSort: false,
	root: 'spdperdetails',
	totalProperty: 'total',
    idProperty: 'spdd_id',
	fields: [
	 
		{name:'data[SpdperDetail0][spdd_id]',mapping:'spdd_id'},
		{name:'data[SpdperDetail0][spdm_id]',mapping:'spdm_id'},
		{name:'data[SpdperDetail0][dpam_no]',mapping:'dpam_no'},
		{name:'data[SpdperDetail0][spdd_angg]',mapping:'spdd_angg'},
		{name:'data[SpdperDetail0][spdd_akum]',mapping:'spdd_akum'},
		{name:'data[SpdperDetail0][spdd_nilai]',mapping:'spdd_nilai'},
		{name:'data[SpdperDetail0][spdd_sisa]',mapping:'spdd_sisa'},
		{name:'data[SpdperDetail0][spdd_tersedia]',mapping: function(data, record) {
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
				if (Ext.getCmp('entrybtl_spdper')){
					 Ext.getCmp("entrybtl_spdper").getForm().loadRecord(b[0]);
				}
			 
			}
			else {
				if (Ext.getCmp('entrybtl_spdper')){
					 Ext.getCmp("entrybtl_spdper").getForm().reset();
				}
			}
		 
		}
	}

});

var SPDPerMasterJsonReader =  new Ext.data.JsonReader({
 
	remoteSort: false,
	root: 'spdpermasters',
	totalProperty: 'total',
    idProperty: 'SpdperMasterList.spdm_id',
	fields: [
		{name:'SpdperMasterList.spdm_id'},
		{name:'astate',mapping:'SpdperMasterList.spdm_state'},
	  
	 	{name:'data[SpdperMaster][astate]',mapping:'SpdperMasterList.astate'},
		 
		{name:'data[SpdperMaster][spdm_id]',mapping:'SpdperMasterList.spdm_id'},
		{name:'data[SpdperMaster][spdm_no]',mapping:'SpdperMasterList.spdm_no'},
		{name:'data[SpdperMaster][spdm_tgl]',mapping:'SpdperMasterList.spdm_tgl', type: 'date', dateFormat: 'Y-m-d'},
		{name:'data[SpdperMaster][un_id]',mapping:'SpdperMasterList.un_id'},
		{name:'data[SpdperMaster][un_kode]',mapping:'SpdperMasterList.un_kode'},
		{name:'data[SpdperMaster][un_nama]',mapping:'SpdperMasterList.un_nama'},
		{name:'data[SpdperMaster][spdm_benda]',mapping:'SpdperMasterList.spdm_benda'},
		{name:'data[SpdperMaster][spdm_bendanama]',mapping:'SpdperMasterList.spdm_bendanama'},
		
		{name:'data[SpdperMaster][spdm_ppkd]',mapping:'SpdperMasterList.spdm_ppkd'},
		{name:'data[SpdperMaster][spdm_ppkdnama]',mapping:'SpdperMasterList.spdm_ppkdnama'},
		
		{name:'data[SpdperMaster][spdm_uraian]',mapping:'SpdperMasterList.spdm_uraian'},
		{name:'data[SpdperMaster][spdm_total]',mapping:'SpdperMasterList.spdm_total'},
		{name:'data[SpdperMaster][spdm_akum]',mapping:'SpdperMasterList.spdm_akum'},
		{name:'data[SpdperMaster][spdm_tersedia]',mapping:'SpdperMasterList.spdm_tersedia'},
		{name:'data[SpdperMaster][spdm_angg]',mapping:'SpdperMasterList.spdm_angg'},
		{name:'data[SpdperMaster][spdm_sisa]',mapping:'SpdperMasterList.spdm_sisa'},
		{name:'data[SpdperMaster][spdm_bln1]',mapping:'SpdperMasterList.spdm_bln1'},
		{name:'data[SpdperMaster][spdm_bln2]',mapping:'SpdperMasterList.spdm_bln2'} 
		 
	]
	 
	 
});
function hitungTotalSPDPer(){
		$tot_spdbl=parseFloat(SpdPerBlDetailStore.sum('spdd_nilai'));
		$tot_spdbtl=parseFloat(SpdPerBtlDetailStore.sum('spdd_nilai'));
		$totalnilai=$tot_spdbl+$tot_spdbtl;
		Ext.getCmp('spdd_nilai1').setValue(parseFloat($tot_spdbtl));
		Ext.getCmp('spdd_sisa1').setValue(parseFloat(Ext.getCmp('spdd_tersedia1').getValue())-parseFloat($tot_spdbtl));
		$sisa=parseFloat(Ext.getCmp('spdm_tersedia1').getValue())-$totalnilai;
		 
		Ext.getCmp('spdm_total1').setValue($totalnilai);
		Ext.getCmp('spdm_sisa1').setValue($sisa); 
	
}
function proc_spdper2(o){
	spdper_idx=o.row;
	if (o.field=='spdd_nilai'){
		$sisa=parseFloat(o.record.get('spdd_angg'))-parseFloat(o.record.get('spdd_akum'))-parseFloat(o.value);
		o.record.set('spdd_sisa',$sisa);
	}
	if (o.field=='dpam_no'){
		 
		//search in detailstore first
		start_search=1;
		if (spdper_idx!=0) start_search=0;
		searchIdx=SpdPerBlDetailStore.findBy(function(record, id){
	         if(record.get('dpam_no') === o.value  ) {
			   		 
	              return true;  // a record with this data exists
	        }
	        return false;  // there is no record in the store with this data
	    	},SpdPerBlDetailStore,start_search);
		
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
		 		SpdPerBlDetailStore.removeAt(spdper_idx);
		 	}
		}
		else {
			//found
			App.setAlert('Warning',"DPA tersebut telah dientri sebelumnya...");
			SpdPerBlDetailStore.removeAt(spdper_idx);
			spdperBlDetailGrid.getSelectionModel().selectRow(searchIdx, false, false);
	  		spdperBlDetailGrid.startEditing(searchIdx, 5);
		}
		
	}
	hitungTotalSPDPer();
}
function proc_spdper1(o){
	spdper_idx=o.row;
	if (o.field=='spdd_nilai'){
		$sisa=parseFloat(o.record.get('spdd_angg'))-parseFloat(o.record.get('spdd_akum'))-parseFloat(o.value);
		o.record.set('spdd_sisa',$sisa);
	}
	if (o.field=='akun_kode'){
		//search in detailstore first
		start_search=1;
		if (spdper_idx!=0) start_search=0;
		searchIdx=SpdPerBtlDetailStore.findBy(function(record, id){
	         if(record.get('akun_kode') === o.value  ) {
			   		 
	              return true;  // a record with this data exists
	        }
	        return false;  // there is no record in the store with this data
	    	},SpdPerBtlDetailStore,start_search);
		
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
		 		SpdPerBtlDetailStore.removeAt(spdper_idx);
		 	}
		}
		else {
			//found
			App.setAlert('Warning',"Akun tersebut telah dientri sebelumnya...");
			SpdPerBtlDetailStore.removeAt(spdper_idx);
			spdperBtlDetailGrid.getSelectionModel().selectRow(searchIdx, false, false);
	  		spdperBtlDetailGrid.startEditing(searchIdx, 4);
		}
		
	}
	hitungTotalSPDPer();
}
var SpdperMasterStore = new Ext.data.GroupingStore({
  	reader:SPDPerMasterJsonReader,
	groupField:'data[SpdperMaster][un_nama]',
	 remoteGroup:false,
	  groupOnSort: false,
	 
	proxy: new Ext.data.HttpProxy({
        url: urlspdpermaster
    })
});



var spdperBtl_proxy = new Ext.data.HttpProxy({
    api: {
        read : HOST_PATH+'/spdper/readdetail_btl',
        create : HOST_PATH+'/spdper/createdetail_btl',
        update:  HOST_PATH+'/spdper/updatedetail_btl',
        destroy:  HOST_PATH+'/spdper/destroydetail_btl'
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
var spdperBtl_reader = new Ext.data.JsonReader({
	totalProperty: 'total',
    successProperty: 'success',
    idProperty: 'spdd_id',
    root: 'data',
    messageProperty: 'message'  // <-- New "messageProperty" meta-data
}, [ 
	{name:'spdd_id'},
	{name: 'akun_kode'},
	{name: 'akun_nama'},
	{name: 'spdm_id'},
	{name: 'spdd_akum',type:'float'}, 
	{name: 'spdd_angg',type:'float'},
	{name: 'spdd_nilai',type:'float'},
	{name: 'spdd_sisa',type:'float'} 
	 
]); 

// The new DataWriter component.
var spdperBtl_writer = new Ext.data.JsonWriter({
    encode: true,
    writeAllFields: true,
	listful:true
});

// Typical Store collecting the Proxy, Reader and Writer together.
var SpdPerBtlDetailStore = new Ext.data.Store({
    id: 'SpdPerBtlDetailStore',
    proxy: spdperBtl_proxy,
    reader: spdperBtl_reader,
    writer: spdperBtl_writer,  // <-- plug a DataWriter into the store just as you would a Reader
    autoSave: false, // <-- false would delay executing create, update, destroy requests until specifically told to do so with some [save] buton.
	autoLoad: true  
});
 
var SpdPerBtlDetailGrid = Ext.extend( Ext.grid.EditorGridPanel, {
    iconCls: 'icon-form',
    frame:false,
	border:false,
	loadMask: true,
	 plugins:[ new Ext.ux.grid.GridSummary({position:'bottom',height:0})],
	sm: new Ext.grid.RowSelectionModel({	moveEditorOnEnter:false,
								singleSelect: true }),
    initComponent : function() {
 
	this.relayEvents(this.store, ['destroy', 'save', 'update']); 
	this.tbar = this.buildTopToolbar();
    SpdPerBtlDetailGrid.superclass.initComponent.call(this);
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
		hitungTotalSPDPer();
		 
    },
	listeners : {
		afteredit: function (o){
			//alert(o.field+":"+o.value+":"+o.originalValue+":"+o.row+":"+o.column );			
			proc_spdper1(o);
		}
		 
	}
});



var spdperBl_proxy = new Ext.data.HttpProxy({
    api: {
        read : HOST_PATH+'/spdper/readdetail_bl',
        create : HOST_PATH+'/spdper/createdetail_bl',
        update:  HOST_PATH+'/spdper/updatedetail_bl',
        destroy:  HOST_PATH+'/spdper/destroydetail_bl'
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
var spdperBl_reader = new Ext.data.JsonReader({
	totalProperty: 'total',
    successProperty: 'success',
    idProperty: 'spdd_id',
    root: 'data',
    messageProperty: 'message'  // <-- New "messageProperty" meta-data
}, [ 
	{name: 'spdd_id'},
	{name: 'dpam_no'},
	{name: 'keg_kode'},
	{name: 'keg_nama'},
	 
	 
	{name: 'spdd_angg',type:'float'},
	{name: 'spdd_akum',type:'float'},
	{name: 'spdd_nilai',type:'float'},
	{name: 'spdd_sisa',type:'float'} 
	 
]); 

// The new DataWriter component.
var spdperBl_writer = new Ext.data.JsonWriter({
    encode: true,
    writeAllFields: true,
	listful:true
});

// Typical Store collecting the Proxy, Reader and Writer together.
var SpdPerBlDetailStore = new Ext.data.Store({
    id: 'SpdPerBlDetailStore',
    proxy: spdperBl_proxy,
    reader: spdperBl_reader,
    writer: spdperBl_writer,  // <-- plug a DataWriter into the store just as you would a Reader
    autoSave: false, // <-- false would delay executing create, update, destroy requests until specifically told to do so with some [save] buton.
	autoLoad: true  
});
 
var SpdPerBlDetailGrid = Ext.extend( Ext.grid.EditorGridPanel, {
    iconCls: 'icon-form',
    frame:false,
	border:false,
	loadMask: true,
	 plugins:[ new Ext.ux.grid.GridSummary({position:'bottom',height:0})],
	sm: new Ext.grid.RowSelectionModel({	moveEditorOnEnter:false,
								singleSelect: true }),
    initComponent : function() {
 
	this.relayEvents(this.store, ['destroy', 'save', 'update']); 
	this.tbar = this.buildTopToolbar();
    SpdPerBlDetailGrid.superclass.initComponent.call(this);
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
			proc_spdper2(o);
		}
		 
	}
});


//view dpa_btl berdasarkan akun
var dpaBTLListStore = new Ext.data.Store({
    proxy: new Ext.data.HttpProxy({
        url: urldpabtllist
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
      
        {name: 'nilaiakum',type:'float'} ,
        {name: 'nilaitersedia',type:'float'} 
       
        
    ]),
    listeners : {
    	load : function (thistore,recordlist,object){
    		for (i=0;i<recordlist.length;i++){
    		abc = new SpdPerBtlDetailStore.recordType({
				spdd_id: 0,
				spdm_id: '',
				dpam_no:'',
				 
				akun_kode:recordlist[i].get('akun_kode'),
				akun_nama:recordlist[i].get('akun_nama'),
				spdd_angg:recordlist[i].get('nilaiangg'),
				spdd_akum:recordlist[i].get('nilaiakum'),
				spdd_nilai:0,
				spdd_sisa:recordlist[i].get('nilaitersedia')
			
			});
		 
			SpdPerBtlDetailStore.add(abc);
    		}
    		Ext.MessageBox.hide();
    		 
    	}
    }
    
});
MyDesktop.SPDPerGridWindow = Ext.extend(Ext.app.Module, {
    id:'spdpergrid-win',
   init : function(){
      this.launcher = {
            text: 'Permohonan SPD',
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
                title:'Permohonan SPD',
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
					gridspdper = new Ext.grid.GridPanel({
							id: 'gridspdper',
						 
							 store: SpdperMasterStore,
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
								dataIndex: 'data[SpdperMaster][spdm_no]',
								width: 100,
								sortable: true
							},
							{
								header: "Tanggal",
								dataIndex: 'data[SpdperMaster][spdm_tgl]',
								width: 150,
								sortable: true,
								 renderer: function(date) { return date.format("d/m/Y"); }
						
							},
							 {
								header: "SPKD",
								dataIndex: 'data[SpdperMaster][un_nama]',
								width: 150,
								sortable: true
							},
							{
								header: "Bendahara",
								dataIndex: 'data[SpdperMaster][spdm_bendanama]',
								width: 100,
								sortable: true
							},
							{
								header: "PPKD",
								dataIndex: 'data[SpdperMaster][spdm_ppkdnama]',
								width: 100,
								sortable: true
							},
							 
							{
								header: "Anggaran",
								dataIndex: 'data[SpdperMaster][spdm_angg]',
								width: 120,
								sortable: true,
								align: 'right',
								renderer: Ext.util.Format.numberRenderer('0,000.00')
							},
							{
								header: "Akumulasi",
								dataIndex: 'data[SpdperMaster][spdm_akum]',
								width: 120,
								sortable: true,
								align: 'right',
								renderer: Ext.util.Format.numberRenderer('0,000.00')
							
							},
							 {
								header: "Total",
								dataIndex: 'data[SpdperMaster][spdm_total]',
								width: 120,
								align: 'right', 
								renderer: Ext.util.Format.numberRenderer('0,000.00')
								 
						 	},
							{
								header: "Sisa",
								dataIndex: 'data[SpdperMaster][spdm_sisa]',
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
											 
												Ext.getCmp('editspdperbutt').enable();
											 
											 Ext.getCmp('delspdperbutt').enable();
										 }
										else {
										 	Ext.getCmp('delspdperbutt').disable();
										 	Ext.getCmp('editspdperbutt').disable();
											 
										 	 
										}
									}
								}
							}),
							bbar: new Ext.PagingToolbar({
								pageSize: 20,
								 store: SpdperMasterStore,
								displayInfo: true,
								displayMsg: 'Displaying contents {0} - {1} of {2}',
								emptyMsg: "No Content to display",
								plugins: new Ext.ux.SlidingPager(),
								listeners :{
										'change' : function(){
										 SpdperMasterStore.baseParams={start:'start',limit:'limit',search:Ext.getCmp("searchSPDPerTxt").getValue()};
			    
										}
									}
									 
							}),
							tbar: [{
								text: 'Permohonan SPD',
								iconCls: 'spdper',
								ref: '../spdperButton',
								
								menu: {
									xtype: 'menu',
									plain: true,
									items: [{
										text: 'Tambah',
										iconCls: 'add',
										handler: function(){
											 
											 MyDesktop.getSingleModule('entryspdper-win').createWindow();
											 entryspdperform.getForm().reset();
									 			entrybtl_spdper.getForm().reset();
									 			SpdPerBlDetailStore.load({
									 				params: {
									 					spdm_id: 0
									 				}
									 			});
												SpdPerBtlDetailStore.load({
									 				params: {
									 					spdm_id: 0
									 				}
									 			});
									 			Ext.getCmp('spdm_tgl1').setValue(new Date());
												Ext.getCmp('spdm_tgl1').setReadOnly(false);
												Ext.getCmp('spdm_id1').setValue(0);
											 
												Ext.getCmp('un_id1').enable();
															 
										}
									   } , {
										id: 'editspdperbutt',
										text: 'Ubah',
										iconCls: 'edit',
										disabled: true,
										handler: function(){
										 	 mid=gridspdper.getSelectionModel().getSelected().get("SpdperMasterList.spdm_id");
										 	 SpdperDetail0Store.load({params:{spdm_id:mid}});				 
											 SpdPerBlDetailStore.load({params:{spdm_id:mid}});
											 SpdPerBtlDetailStore.load({params:{spdm_id:mid}});
											 MyDesktop.getSingleModule('entryspdper-win').createWindow();
											 Ext.getCmp("entryspdperform").getForm().loadRecord(gridspdper.getSelectionModel().getSelected());
										}
									},{
											id: 'delspdperbutt',
											text: 'Hapus',
											iconCls: 'delete',
											disabled: true,
											handler: function(){
											 
												  aid=gridspdper.getSelectionModel().getSelected().get('SpdperMasterList.spdm_id');
												
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
													        url:urldelspdpermaster,
													        params : {id :aid},
															method: 'GET',
															success: function ( result, request ) { 
																	Ext.MessageBox.hide();
						
																	var jsonData = Ext.util.JSON.decode(result.responseText);
																 
																	Ext.MessageBox.alert('Information', jsonData.msg); 
																	SpdperMasterStore.reload();
															},
															failure: function ( result, request) { 
																 Ext.MessageBox.hide();
						
																Ext.MessageBox.alert('Failed', result.responseText); 
															} 
						
													    });
												   }
											    }; 
											}
										}   ]
								
								
								}
							
							}, '-',
							 'Search Key',
							 new Ext.form.TextField({
									id:'searchSPDPerTxt',
								    text:'*',
							        emptyText:'*',
							        selectOnFocus:true,
									listeners: {
						              specialkey: function(f,e){
						                if (e.getKey() == e.ENTER) {
								                SpdperMasterStore.load({params: {
													start: 0,
													limit: 20,
													 search:Ext.getCmp("searchSPDPerTxt").getValue()
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
								  SpdperMasterStore.load({params: {
									start: 0,
									limit: 20,
									 search:Ext.getCmp("searchSPDPerTxt").getValue()
									 }})
						       
					        }
							}]
						
						})//end of grid
					
				
					
            });
        }
		 
        win2.show();
		SpdperMasterStore.load({params:{start:0, limit:20, search:'*'}});
	 
	 
		 
		gridspdper.on('rowdblclick',function(sm, rowindex, eventobject){
			 
			 mid=gridspdper.getSelectionModel().getSelected().get("SpdperMasterList.spdm_id");
		 	 SpdperDetail0Store.load({params:{spdm_id:mid}});				 
			 SpdPerBlDetailStore.load({params:{spdm_id:mid}});
			 SpdPerBtlDetailStore.load({params:{spdm_id:mid}});
			 MyDesktop.getSingleModule('entryspdper-win').createWindow();
			 Ext.getCmp("entryspdperform").getForm().loadRecord(gridspdper.getSelectionModel().getSelected());
			 
			
		});
		 
		 
	}
}); 


MyDesktop.EntrySPDPerForm = Ext.extend(Ext.app.Module, {
    id:'entryspdper-win',
	title:'Permohonan SPD',
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
					[entryspdperform = new Ext.FormPanel({
						id:'entryspdperform',
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
												 name: 'data[SpdperMaster][spdm_id]',
												 
												id:'spdm_id1' 
												 
											},
											 
											{	 xtype:'textfield',
												fieldLabel: 'No Surat',
												name: 'data[SpdperMaster][spdm_no]',
												maxLength:20,
												id:'spdm_no1',
												 
												allowBlank:false 
												 
											},
											{	 xtype:'datefield',
												fieldLabel: 'Tanggal',
												id:'spdm_tgl1',
												name: 'data[SpdperMaster][spdm_tgl]',
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
									 						 id:'un_id1',
															 store: skpdSearchStore,
															 hiddenName:'data[SpdperMaster][un_id]',
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
																		  
																		 Ext.getCmp('un_nama1').setValue(record.get('un_nama'));
																		 Ext.getCmp('spdm_angg1').setValue(record.get('dpa_angg'));
																		 Ext.getCmp('spdm_akum1').setValue(record.get('dpa_akum'));
																		 Ext.getCmp('spdm_tersedia1').setValue(record.get('dpa_tersedia'));
																		 
																		 combo=Ext.getCmp('spdd_dpano1');
																		 
																	     combo.store.baseParams={un_id:record.get('un_id')};
									    	  							 combo.store.removeAll();
											 							 combo.lastQuery=null;
											 							 
											 							 dpaBLSearchStore.baseParams={un_id:record.get('un_id')};
																	}	
																}
															 
										
															 }),
													{	xtype:'textfield',
														id:'un_nama1',
														fieldLabel: '',
														name: 'data[SpdperMaster][un_nama]',
														flex : 1,
														readOnly:true 
													}
													]
											} //end of composite
											
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
									items:  tabPanelSPDPer= new Ext.TabPanel({
													 
													id:'tabPanelSPDPer',
								                    border: false, // already wrapped so don't add another border
								                    activeTab: 0, // second tab initially active
								                    tabPosition: 'top',
								                    items: [{
															id:'tabspdper1',
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
																							 new Ext.form.ComboBox({
																		 						 
																								 store: monthlistStore,
																								 hiddenName:'data[SpdperMaster][spdm_bln1]',
																								 fieldLabel:' ',
																								 displayField:'name',
																								 typeAhead: true,
																								 mode: 'local',
																								 width:80,
																								 triggerAction: 'all',
																								 valueField:'id',
																								 hideTrigger:false,
																								 forceSelection: true,
																								 allowBlank:false,
																								 value:1
																								 }),
																							 new Ext.form.ComboBox({
																		 						 
																								 store: monthlistStore,
																								 hiddenName:'data[SpdperMaster][spdm_bln2]',
																								 fieldLabel:' ',
																								 displayField:'name',
																								 typeAhead: true,
																								 mode: 'local',
																								 width:80,
																								 triggerAction: 'all',
																								 valueField:'id',
																								 hideTrigger:false,
																								 forceSelection: true,
																								 allowBlank:false,
																								 value:1
																								 }) 
																							]
																					},
																					new Ext.form.ComboBox({
																	 						 id:'spdm_benda1',
																							 store: bendaSearchStore,
																							 hiddenName:'data[SpdperMaster][spdm_benda]',
																							 fieldLabel:'Bendahara Pengeluaran',
																							 displayField:'pn_nip',
																							 typeAhead: false,
																							 enableKeyEvents :true, 
																							 valueField:'pn_nip',
																							  triggerAction: 'all',
																							 loadingText: 'Searching...',
																							 minChars:0,
																							 pageSize:20,
																							 boxMinWidth: 80,
																							 boxMinHeight: 100,
																							 width:120,
																							 hideTrigger:false,
																							 forceSelection: true,
																							 tpl:bendaComboTpl,
																							 allowBlank:false,
																							 itemSelector: 'div.search-benda',
																							 listeners: {
															 
																									 
																									select: function(thiscombo,record, index){
																										  
																										 Ext.getCmp('spdm_bendanama1').setValue(record.get('pn_nama'));
																										 
																									}	
																								}
																							 
																		
																							 }),
																					{	xtype:'textfield',
																						id:'spdm_bendanama1',
																						fieldLabel: '',
																						name: 'data[SpdperMaster][spdm_bendanama]',
																						flex : 1,
																						readOnly:true 
																					},
																				 
																					new Ext.form.ComboBox({
																	 						 id:'spdm_ppkd1',
																							 store: ppkdSearchStore,
																							 hiddenName:'data[SpdperMaster][spdm_ppkd]',
																							 fieldLabel:'PPKD',
																							 displayField:'pn_nip',
																							 typeAhead: false,
																							 enableKeyEvents :true, 
																							 valueField:'pn_nip',
																							  triggerAction: 'all',
																							 loadingText: 'Searching...',
																							 minChars:0,
																							 pageSize:20,
																							 boxMinWidth: 80,
																							 boxMinHeight: 100,
																							 width:120,
																							 hideTrigger:false,
																							 forceSelection: true,
																							 tpl:ppkdComboTpl,
																							 allowBlank:false,
																							 itemSelector: 'div.search-ppkd',
																							 listeners: {
															 
																									 
																									select: function(thiscombo,record, index){
																										  
																										 Ext.getCmp('spdm_ppkdnama1').setValue(record.get('pn_nama'));
																									}
																										 
																								}
																							 
																		
																							 }),
																					{	xtype:'textfield',
																						id:'spdm_ppkdnama1',
																						fieldLabel: '',
																						name: 'data[SpdperMaster][spdm_ppkdnama]',
																						flex : 1,
																						readOnly:true 
																					},
																		 
															            	{
															                    fieldLabel: 'Ketentuan Lain',
															                    name: 'data[SpdperMaster][spdm_ketentuan]',
															                    value: '',
															                    maxLength:500
															                },
															                {
															                    fieldLabel: 'Uraian',
															                    xtype: 'textarea',
															                    name: 'data[SpdperMaster][spdm_uraian]',
															                    height:80,
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
															                    name: 'data[SpdperMaster][spdm_angg]',
															                    id:'spdm_angg1',
															                    value: '0',
															                    align:'right'
															                },{
															                    fieldLabel: 'Jumlah Akumulasi SPD',
															                    name: 'data[SpdperMaster][spdm_akum]',
															                    value: '0',
															                    id:'spdm_akum1'
															                } ,{
															                    fieldLabel: 'Jumlah Tersedia',
															                    name: 'data[SpdperMaster][spdm_tersedia]',
															                    value: '0',
															                    id:'spdm_tersedia1'
															                },
															                {
															                    fieldLabel: 'Jumlah Total SPD',
															                    name: 'data[SpdperMaster][spdm_total]',
															                    value: '0',
															                    id:'spdm_total1'
															                },
															                 {
															                    fieldLabel: 'Jumlah Sisa Anggaran',
															                    name: 'data[SpdperMaster][spdm_sisa]',
															                    value: '0',
															                    id:'spdm_sisa1'
															                } 
															            ]
															        }
															      ]//end of item  
														},{id:'tabspdper2',
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
									                        		height:70,
									                        		layout:'fit',
									                        		items :
									                        
											                        	    entrybtl_spdper = new Ext.FormPanel({
																			id:'entrybtl_spdper',
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
																								name:'data[SpdperDetail0][spdm_id]',
																								id:'spdd_spdmid1'
																							},
																							{
																								xtype:'hidden',
																								name:'data[SpdperDetail0][spdd_id]',
																								id:'spdd_spddid1'
																							},
																									new Ext.form.ComboBox({
																				 						 id:'spdd_dpano1',
																										 store: dpaMasterBtlSearchStore,
																										 hiddenName:'data[SpdperDetail0][dpam_no]',
																										 fieldLabel:'DPA No',
																										 displayField:'dpam_no',
																										 typeAhead: false,
																										 enableKeyEvents :true, 
																										 valueField:'dpam_no',
																										  triggerAction: 'all',
																										 loadingText: 'Searching...',
																										 minChars:0,
																										 pageSize:20,
																										 boxMinWidth: 80,
																										 boxMinHeight: 100,
																										 width:120,
																										 hideTrigger:false,
																										 forceSelection: true,
																										 tpl:dpaComboTpl,
																										 
																										 itemSelector: 'div.search-dpa',
																										 listeners: {
																		 
																												 
																												select: function(thiscombo,record, index){
																										 			 
																													 
																													 Ext.getCmp('spdd_angg1').setValue(parseFloat(record.get('dpam_angg')));
																													 Ext.getCmp('spdd_nilai1').setValue(0);
																													 Ext.getCmp('spdd_akum1').setValue(parseFloat(record.get('dpam_akum')));
																													 Ext.getCmp('spdd_tersedia1').setValue(parseFloat(record.get('dpam_tersedia')));
																													 Ext.getCmp('spdd_sisa1').setValue(parseFloat(record.get('dpam_tersedia')))-parseFloat(Ext.getCmp('spdd_nilai1').getValue());
																													 
																												 	 dpaBTLSearchStore.baseParams={master_id:record.get('dpam_id')};
																													 dpaBTLListStore.load({params: {
																															  master_id:record.get('dpam_no')
																															 }	});
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
																										 
																					
																										 }),
																										 {
																										 	xtype:'numberfield',
																						                    fieldLabel: 'Anggaran',
																						                    name: 'data[SpdperDetail0][spdd_angg]',
																						                    id:'spdd_angg1',
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
																				                    name: 'data[SpdperDetail0][spdd_akum]',
																				                    id:'spdd_akum1',
																				                    value: '0',
																				                    align:'right'
																				                  },
																				                  {
																								 	xtype:'numberfield',
																				                    fieldLabel: 'Tersedia',
																				                    name: 'data[SpdperDetail0][spdd_tersedia]',
																				                    id:'spdd_tersedia1',
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
																				                    name: 'data[SpdperDetail0][spdd_nilai]',
																				                    id:'spdd_nilai1',
																				                    value: '0',
																				                    align:'right'
																				                  },
																				                  {
																								 	xtype:'numberfield',
																				                    fieldLabel: 'Sisa',
																				                    name: 'data[SpdperDetail0][spdd_sisa]',
																				                    id:'spdd_sisa1',
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
											                        		items:spdperBtlDetailGrid = new SpdPerBtlDetailGrid({
																				id: 'spdperBtlDetailGrid',
																				autoWidth:true,
																				height: 300,
																				border: true,
																				frame:false,
																				stripeRows: true,
																				store: SpdPerBtlDetailStore,
																				
																				columns: [{
																					header: "Kode Rekening",
																					dataIndex: 'akun_kode',
																					sortable: true,
																					editor: {
																						xtype:'combo',
																						store: dpaBTLSearchStore,
																						displayField: 'akun_kode',
																						typeAhead: false,
																						enableKeyEvents: true,
																						valueField: 'akun_kode',
																						loadingText: 'Searching...',
																						minChars: 2,
																						triggerAction:'query',
																						pageSize: 10,
																						boxMinWidth: 250,
																						boxMinHeight: 100,
																						hideTrigger: false,
																						// forceSelection: true,
																						tpl: dpaBTLComboTpl,
																						allowBlank: false,
																						itemSelector: 'div.search-dpabtl',
																						listeners : {
																							focus : function(){
																								dpaBTLSearchStore.baseParams={master_id:Ext.getCmp("spdd_dpano1").getValue()};
																							}
																						}
																					
																					},
																					isCellEditable: true
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
																					isCellEditable: true,
																					allowBlank: false,
																					editor:new Ext.form.NumberField({enableKeyEvents :true }),
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
																					dataIndex: 'spdd_id',
																					summaryType: 'count'
																				} ]
																			
																			}) //end of grid
																					                        		
											                        	}
																	]
									                       
																	
									                        
														   },
									                        {id:'tabspdper3',
									                        layout:'fit',
									                        title: 'Belanja Langsung',
									                        items:spdperBlDetailGrid = new SpdPerBlDetailGrid({
																				id: 'spdperBlDetailGrid',
																				autoWidth:true,
																				height: 300,
																				border: true,
																				frame:false,
																				stripeRows: true,
																				store: SpdPerBlDetailStore,
																				
																				columns: [{
																					header: "No DPA",
																					dataIndex: 'dpam_no',
																					sortable: true,
																					editor: {
																						xtype:'combo',
																						store: dpaBLSearchStore,
																						displayField: 'dpam_no',
																						typeAhead: false,
																						enableKeyEvents: true,
																						valueField: 'dpam_no',
																						loadingText: 'Searching...',
																						minChars: 2,
																						triggerAction:'query',
																						pageSize: 10,
																						boxMinWidth: 250,
																						boxMinHeight: 100,
																						hideTrigger: false,
																						// forceSelection: true,
																						tpl: dpaBLComboTpl,
																						allowBlank: false,
																						itemSelector: 'div.search-dpabl',
																						listeners  : {
																							select: function(thiscombo,record, index){
																								
																							},
																							focus : function (){
																								 
																								dpaBLSearchStore.baseParams={un_id:Ext.getCmp("un_id1").getValue()};
																							}
																						}
																					
																					},
																					isCellEditable: true
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
																					editor:new Ext.form.NumberField({enableKeyEvents :true }),
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
								id:'spdper3-new',
								 
						 		iconCls: 'new',
						 		handler: function(){
						 			entryspdperform.getForm().reset();
						 			entrybtl_spdper.getForm().reset();
						 			SpdPerBlDetailStore.load({
						 				params: {
						 					spdm_id: 0
						 				}
						 			});
									SpdPerBtlDetailStore.load({
						 				params: {
						 					spdm_id: 0
						 				}
						 			});
						 			Ext.getCmp('spdm_tgl1').setValue(new Date());
									Ext.getCmp('spdm_tgl1').setReadOnly(false);
									Ext.getCmp('spdm_id1').setValue(0);
								 
									Ext.getCmp('un_id1').enable();
									 
						 		}
						 	},{
										text:'Print',
										id:'print_spdper',
										tooltip:'Print ',
										iconCls:'printer',
										handler:function(){
											aid=Ext.getCmp('spdm_id1').getValue();
											aurl=HOST_PATH+'/rptspdper/spdper/'+aid;
											window.open(aurl,'_blank');
	
										}
								}, {
						 		xtype: 'spacer',
						 		flex: 1
						 	}, {
						 		text: 'Save',
						 		iconCls: 'save',
								id:'spdper3-save',
								 
						 		handler: function(){
									hitungTotalSPDPer();
						 			if (entryspdperform.getForm().isValid()) {
						 				entryspdperform.getForm().submit({
						 					url: urladdspdpermaster,
						 					waitMsg: 'Saving data...',
						 					success: function(form, action){
						 						newid = action.result.newid;
						 						newno = action.result.newno;
						 						if (newid != '') {
						 							//alert(newid);
														// Ext.getCmp('form_no').setValue(newid);
														// alert(newid);
														Ext.getCmp('spdm_no1').setValue(newno);
														Ext.getCmp('spdm_id1').setValue(newid)
														Ext.getCmp('spdm_no1').setReadOnly(true);
														SpdPerBlDetailStore.setBaseParam('master', newid);
														SpdPerBtlDetailStore.setBaseParam('master', newid);
														
														SpdPerBlDetailStore.save();
														SpdPerBtlDetailStore.save();
														Ext.getCmp('spdd_spdmid1').setValue(newid);
														entrybtl_spdper.getForm().submit({
						 											url: urladdspdperdetail0
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
									id:'spdper3-cancel',
									 
									margins:'0',
									handler: function(){
										SpdperMasterStore.reload();
										MyDesktop.getSingleModule('entryspdper-win').closeWindow();
										
										
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