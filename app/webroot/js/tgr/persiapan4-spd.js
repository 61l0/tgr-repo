/* SPD */
var  urlspdmaster=HOST_PATH+'/spd/getall'; 


function proc_spd1(o){
	spd_idx=o.row;
}
var SPDMasterJsonReader =  new Ext.data.JsonReader({
 
	remoteSort: false,
	root: 'spdmasters',
	totalProperty: 'total',
    idProperty: 'SpdMasterList.spdm_id',
	fields: [
		{name:'SpdMasterList.spdm_id'},
		{name:'astate',mapping:'SpdMasterList.spdm_state'},
	  
	 	{name:'data[SpdMaster][astate]',mapping:'SpdMasterList.astate'},
		 
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
		{name:'data[SpdMaster][spdm_angg]',mapping:'SpdMasterList.spdm_angg'},
		{name:'data[SpdMaster][spdm_sisa]',mapping:'SpdMasterList.spdm_sisa'},
		{name:'data[SpdMaster][spdm_bln1]',mapping:'SpdMasterList.spdm_bln1'},
		{name:'data[SpdMaster][spdm_bln2]',mapping:'SpdMasterList.spdm_bln2'} 
		 
	]
	 
	 
});

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
			App.setAlert(App.STATUS_NOTICE," SPD : "+action+": Menyimpan data...");
			},
		 write : function(proxy, action, result, res, rs) {
			App.setAlert(true, "  SPD  :"+action+":"+res.message);
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
    messageProperty: 'message'  // <-- New "messageProperty" meta-data
}, [ 
	{name: 'akun_kode'},
	{name: 'akun_kode'},
	{name: 'spdm_id'},
	 
	{name: 'spdd_angg',type:'float'},
	{name: 'spdd_nilai',type:'float'},
	{name: 'spdd_sisa',type:'float'} 
	 
]); 

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
	 plugins:[ new Ext.ux.grid.GridSummary({position:'bottom',height:0})],
	sm: new Ext.grid.RowSelectionModel({	moveEditorOnEnter:false,
								singleSelect: true }),
    initComponent : function() {
 
	this.relayEvents(this.store, ['destroy', 'save', 'update']); 
	this.tbar = this.buildTopToolbar();
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
		hitungTotalSales2();
		 
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
	{name: 'dpam_no'},
	 
	 
	{name: 'spdd_angg',type:'float'},
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
	 plugins:[ new Ext.ux.grid.GridSummary({position:'bottom',height:0})],
	sm: new Ext.grid.RowSelectionModel({	moveEditorOnEnter:false,
								singleSelect: true }),
    initComponent : function() {
 
	this.relayEvents(this.store, ['destroy', 'save', 'update']); 
	this.tbar = this.buildTopToolbar();
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
            text: 'Surat Penyediaan Dana (SPD)',
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
                title:'Surat Penyediaan Dana (SPD)',
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
								dataIndex: 'data[SpdMaster][spdm_date]',
								width: 150,
								sortable: true,
								 renderer: function(date) { return date.format("d/m/Y"); }
						
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
											if (pv_spd >= 1) {
												Ext.getCmp('editspdbutt').enable();
												Ext.getCmp('applyspdbutt').enable();
												
											}
										 	if (pv_spd>=2)
											 Ext.getCmp('delspdbutt').enable();
										 }
										else {
										 	Ext.getCmp('delspdbutt').disable();
										 	Ext.getCmp('editspdbutt').disable();
											Ext.getCmp('applyspdbutt').disable();
										 	 
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
		 					 
			 PurchaseDetailStore.load({params:{spdm_id:mid}});
			 PurchaseBonusStore.load({params:{spdm_id:mid}});
			 MyDesktop.getSingleModule('addspdmaster-win').createWindow();
			 Ext.getCmp("addspdmasterform").getForm().loadRecord(gridspd.getSelectionModel().getSelected());
			if (gridspd.getSelectionModel().getSelected().get("astate") == "1" || 
												gridspd.getSelectionModel().getSelected().get("locked") == "1") 
													{
													Ext.getCmp('vend_code2').disable();
													Ext.getCmp('spdm_wh_code').disable();
													Ext.getCmp('spdm_inctax').setReadOnly(true);
													Ext.getCmp('spdm_pay_type').disable();
													Ext.getCmp('spdm_date1').setReadOnly(true);
												}
												else {
													Ext.getCmp('vend_code2').enable();
													Ext.getCmp('spdm_wh_code').enable();
													Ext.getCmp('spdm_inctax').setReadOnly(false);
													Ext.getCmp('spdm_pay_type').enable();
													Ext.getCmp('spdm_date1').setReadOnly(false);
												} 											 
		 if (gridspd.getSelectionModel().getSelected().get("astate")=="1") {
			 	Ext.getCmp('spddetailGrid').disable();
				Ext.getCmp('spd3-save').disable();
			 }
			  
		 	else {
				 		Ext.getCmp('spddetailGrid').enable();
						Ext.getCmp('spd3-save').enable();
				 }
			avend_code=gridspd.getSelectionModel().getSelected().get("SpdMasterList.vend_code");
		 
			awh_code=gridspd.getSelectionModel().getSelected().get("SpdMasterList.wh_code");
			
			 
									 
			
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
											 
											{	 xtype:'textfield',
												fieldLabel: 'No Permohonan',
												name: 'data[SpdperMaster][spdper_no]',
												maxLength:20,
												id:'spdper_no1',
												 
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
											},
											new Ext.form.ComboBox({
											 id:'spdper_no1',
											 store: skpdSearchStore,
											 hiddenName:'data[SpdperMaster][spdper_no]',
											 fieldLabel:'No Permohonan',
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
														 
													}	
												}
											 
										
											 })
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
															 boxMinWidth: 150,
															 boxMinHeight: 100,
															 width:150,
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
								}//end of north
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
									                        		height:70,
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
																									new Ext.form.ComboBox({
																				 						 id:'spdd_dpano1',
																										 store: dpaSearchStore,
																										 hiddenName:'data[SpdDetail0][dpam_no]',
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
																										 allowBlank:false,
																										 itemSelector: 'div.search-dpa',
																										 listeners: {
																		 
																												 
																												select: function(thiscombo,record, index){
																										 			 alert(record.get('dpam_angg'));
																													 
																													 Ext.getCmp('spdd_angg1').setValue(parseFloat(record.get('dpam_angg')));
																													 Ext.getCmp('spdd_akum1').setValue(parseFloat(record.get('dpam_akum')));
																													 Ext.getCmp('spdd_tersedia1').setValue(parseFloat(record.get('dpam_tersedia')));
																												 
																												}	
																											}
																										 
																					
																										 }),
																										 {
																										 	xtype:'numberfield',
																						                    fieldLabel: 'Anggaran',
																						                    name: 'data[SpdDetail0][spdd_akum]',
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
																				                    name: 'data[SpdDetail0][spdd_akum]',
																				                    id:'spdd_akum1',
																				                    value: '0',
																				                    align:'right'
																				                  },
																				                  {
																								 	xtype:'numberfield',
																				                    fieldLabel: 'Tersedia',
																				                    name: 'data[SpdDetail0][spdd_tersedia]',
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
																				                    name: 'data[SpdDetail0][spdd_nilai]',
																				                    id:'spdd_nilai1',
																				                    value: '0',
																				                    align:'right'
																				                  },
																				                  {
																								 	xtype:'numberfield',
																				                    fieldLabel: 'Sisa',
																				                    name: 'data[SpdDetail0][spdd_tersedia]',
																				                    id:'spdd_sis1',
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
																					dataIndex: 'data[SpdDetail0][akun_kode]',
																					sortable: true,
																					editor: {
																						xtype:'combo',
																						store: dpaDetailSearchStore,
																						displayField: '',
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
																						tpl: dpadetailComboTpl,
																						allowBlank: false,
																						itemSelector: 'div.search-dpadetail' 
																					
																					},
																					isCellEditable: true
																				}, {
																					header: "Uraian",
																					width: 150,
																					sortable: true,
																					dataIndex: 'akun_nama'
																				},   {
																					header: "Anggaran",
																					width: 80,
																					sortable: true,
																					summaryType: 'sum',
																					dataIndex: 'spdd_angg',
																					 renderer: Ext.util.Format.numberRenderer('0,000.00')
																					 
																				}, {
																					header: "Akumulasi",
																					width: 80,
																					sortable: true,
																					align:'right',
																					summaryType: 'sum',
																					dataIndex: 'spdd_akum',
																				 
																					renderer: Ext.util.Format.numberRenderer('0,000.00')
																				
																				},
																				{
																					header: "Nilai SPD",
																					width: 80,
																					sortable: true,
																					align:'right',
																					summaryType: 'sum',
																					dataIndex: 'spdd_akum',
																					isCellEditable: true,
																					allowBlank: false,
																					editor:new Ext.form.NumberField({enableKeyEvents :true }),
																					renderer: Ext.util.Format.numberRenderer('0,000.00')
																				
																				},{
																					header: "Sisa",
																					width: 80,
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
																					dataIndex: 'data[SpdDetail0][dpam_no]',
																					sortable: true,
																					editor: {
																						xtype:'combo',
																						store: dpaSearchStore,
																						displayField: '',
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
																						tpl: dpaComboTpl,
																						allowBlank: false,
																						itemSelector: 'div.search-dpa' 
																					
																					},
																					isCellEditable: true
																				}, {
																					header: "Uraian",
																					width: 150,
																					sortable: true,
																					dataIndex: 'akun_nama'
																				},   {
																					header: "Anggaran",
																					width: 80,
																					sortable: true,
																					summaryType: 'sum',
																					dataIndex: 'spdd_angg',
																					 renderer: Ext.util.Format.numberRenderer('0,000.00')
																					 
																				}, {
																					header: "Akumulasi",
																					width: 80,
																					sortable: true,
																					align:'right',
																					summaryType: 'sum',
																					dataIndex: 'spdd_akum',
																				 
																					renderer: Ext.util.Format.numberRenderer('0,000.00')
																				
																				},
																				{
																					header: "Nilai SPD",
																					width: 80,
																					sortable: true,
																					align:'right',
																					summaryType: 'sum',
																					dataIndex: 'spdd_akum',
																					isCellEditable: true,
																					allowBlank: false,
																					editor:new Ext.form.NumberField({enableKeyEvents :true }),
																					renderer: Ext.util.Format.numberRenderer('0,000.00')
																				
																				},{
																					header: "Sisa",
																					width: 80,
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
								disabled:true,
						 		iconCls: 'new',
						 		handler: function(){
						 			addspdmasterform.getForm().reset();
						 			PurchaseDetailStore.load({
						 				params: {
						 					spdm_id: 0
						 				}
						 			});
									PurchaseBonusStore.load({
						 				params: {
						 					spdm_id: 0
						 				}
						 			});
						 			Ext.getCmp('spdm_date1').setValue(new Date());
									Ext.getCmp('spdm_date1').setReadOnly(false);
									Ext.getCmp('spdm_id1').setValue(0);
									Ext.getCmp('spdm_pay_type').setValue(0);
									Ext.getCmp('vend_code2').enable();
									Ext.getCmp('spdm_wh_code').enable();
									Ext.getCmp('spddetailGrid').enable();  
									Ext.getCmp('spdm_inctax').setReadOnly(false);
									Ext.getCmp('spdm_pay_type').enable();
									Ext.getCmp('spd3-save').enable();
						 		}
						 	},{
										text:'Print',
										id:'print_spd',
										tooltip:'Print Purchase ',
										iconCls:'printer',
										handler:function(){
											aid=Ext.getCmp('spdm_id1').getValue();
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
								disabled:true,
						 		handler: function(){
									hitungTotalPurchase2();
						 			if (addspdmasterform.getForm().isValid()) {
						 				addspdmasterform.getForm().submit({
						 					url: urladdspdmaster,
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
														PurchaseDetailStore.setBaseParam('master', newid);
														PurchaseBonusStore.setBaseParam('master', newid);
														
														PurchaseDetailStore.save();
														PurchaseBonusStore.save();
														
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
									disabled:true,
									margins:'0',
									handler: function(){
										SpdperMasterStore.reload();
										MyDesktop.getSingleModule('addspdmaster-win').closeWindow();
										
										
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