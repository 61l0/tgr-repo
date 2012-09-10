/* Permohonan SPD */
var  urlspdpermaster=HOST_PATH+'/spdper/getall'; 
var SPDPerMasterJsonReader =  new Ext.data.JsonReader({
 
	remoteSort: false,
	root: 'spdpermasters',
	totalProperty: 'total',
    idProperty: 'SpdPerMasterList.spdm_id',
	fields: [
		{name:'SpdPerMasterList.spdm_id'},
		{name:'astate',mapping:'SpdPerMasterList.spdm_state'},
	  
	 	{name:'data[SpdPerMaster][astate]',mapping:'SpdPerMasterList.astate'},
		 
		{name:'data[SpdPerMaster][spdm_id]',mapping:'SpdPerMasterList.spdm_id'},
		{name:'data[SpdPerMaster][spdm_no]',mapping:'SpdPerMasterList.spdm_no'},
		{name:'data[SpdPerMaster][spdm_tgl]',mapping:'SpdPerMasterList.spdm_tgl', type: 'date', dateFormat: 'Y-m-d'},
		{name:'data[SpdPerMaster][un_id]',mapping:'SpdPerMasterList.un_id'},
		{name:'data[SpdPerMaster][un_kode]',mapping:'SpdPerMasterList.un_kode'},
		{name:'data[SpdPerMaster][un_nama]',mapping:'SpdPerMasterList.un_nama'},
		{name:'data[SpdPerMaster][spdm_benda]',mapping:'SpdPerMasterList.spdm_benda'},
		{name:'data[SpdPerMaster][spdm_bendanama]',mapping:'SpdPerMasterList.spdm_bendanama'},
		
		{name:'data[SpdPerMaster][spdm_ppkd]',mapping:'SpdPerMasterList.spdm_ppkd'},
		{name:'data[SpdPerMaster][spdm_ppkdnama]',mapping:'SpdPerMasterList.spdm_ppkdnama'},
		
		{name:'data[SpdPerMaster][spdm_uraian]',mapping:'SpdPerMasterList.spdm_uraian'},
		{name:'data[SpdPerMaster][spdm_total]',mapping:'SpdPerMasterList.spdm_total'},
		{name:'data[SpdPerMaster][spdm_akum]',mapping:'SpdPerMasterList.spdm_akum'},
		{name:'data[SpdPerMaster][spdm_angg]',mapping:'SpdPerMasterList.spdm_angg'},
		{name:'data[SpdPerMaster][spdm_sisa]',mapping:'SpdPerMasterList.spdm_sisa'},
		{name:'data[SpdPerMaster][spdm_bln1]',mapping:'SpdPerMasterList.spdm_bln1'},
		{name:'data[SpdPerMaster][spdm_bln2]',mapping:'SpdPerMasterList.spdm_bln2'} 
		 
	]
	 
	 
});

function proc_spdper1(o){
	spdper_idx=o.row;
}
var SpdPerMasterStore = new Ext.data.GroupingStore({
  	reader:SPDPerMasterJsonReader,
	groupField:'data[SpdPerMaster][un_nama]',
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
	{name: 'akun_kode'},
	{name: 'akun_kode'},
	{name: 'spdm_id'},
	 
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
		hitungTotalSales2();
		 
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
	{name: 'dpam_no'},
	 
	 
	{name: 'spdd_angg',type:'float'},
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
						 
							 store: SpdPerMasterStore,
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
								dataIndex: 'data[SpdPerMaster][spdm_no]',
								width: 100,
								sortable: true
							},
							{
								header: "Tanggal",
								dataIndex: 'data[SpdPerMaster][spdm_date]',
								width: 150,
								sortable: true,
								 renderer: function(date) { return date.format("d/m/Y"); }
						
							},
							 {
								header: "SPKD",
								dataIndex: 'data[SpdPerMaster][un_nama]',
								width: 150,
								sortable: true
							},
							{
								header: "Bendahara",
								dataIndex: 'data[SpdPerMaster][spdm_bendanama]',
								width: 100,
								sortable: true
							},
							{
								header: "PPKD",
								dataIndex: 'data[SpdPerMaster][spdm_ppkdnama]',
								width: 100,
								sortable: true
							},
							 
							{
								header: "Anggaran",
								dataIndex: 'data[SpdPerMaster][spdm_angg]',
								width: 120,
								sortable: true,
								align: 'right',
								renderer: Ext.util.Format.numberRenderer('0,000.00')
							},
							{
								header: "Akumulasi",
								dataIndex: 'data[SpdPerMaster][spdm_akum]',
								width: 120,
								sortable: true,
								align: 'right',
								renderer: Ext.util.Format.numberRenderer('0,000.00')
							
							},
							 {
								header: "Total",
								dataIndex: 'data[SpdPerMaster][spdm_total]',
								width: 120,
								align: 'right', 
								renderer: Ext.util.Format.numberRenderer('0,000.00')
								 
						 	},
							{
								header: "Sisa",
								dataIndex: 'data[SpdPerMaster][spdm_sisa]',
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
											if (pv_spdper >= 1) {
												Ext.getCmp('editspdperbutt').enable();
												Ext.getCmp('applyspdperbutt').enable();
												
											}
										 	if (pv_spdper>=2)
											 Ext.getCmp('delspdperbutt').enable();
										 }
										else {
										 	Ext.getCmp('delspdperbutt').disable();
										 	Ext.getCmp('editspdperbutt').disable();
											Ext.getCmp('applyspdperbutt').disable();
										 	 
										}
									}
								}
							}),
							bbar: new Ext.PagingToolbar({
								pageSize: 20,
								 store: SpdPerMasterStore,
								displayInfo: true,
								displayMsg: 'Displaying contents {0} - {1} of {2}',
								emptyMsg: "No Content to display",
								plugins: new Ext.ux.SlidingPager(),
								listeners :{
										'change' : function(){
										 SpdPerMasterStore.baseParams={start:'start',limit:'limit',search:Ext.getCmp("searchSPDPerTxt").getValue()};
			    
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
											 
															 
										}
									} , {
										id: 'editspdperbutt',
										text: 'Ubah',
										iconCls: 'edit',
										disabled: true,
										handler: function(){
										 
										}
									},{
											id: 'delspdperbutt',
											text: 'Hapus',
											iconCls: 'delete',
											disabled: true,
											handler: function(){
												/*
												  aid=gridspdper.getSelectionModel().getSelected().get('SpdPerMasterList.spdm_id');
												
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
																	SpdPerMasterStore.reload();
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
									id:'searchSPDPerTxt',
								    text:'*',
							        emptyText:'*',
							        selectOnFocus:true,
									listeners: {
						              specialkey: function(f,e){
						                if (e.getKey() == e.ENTER) {
								                SpdPerMasterStore.load({params: {
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
								  SpdPerMasterStore.load({params: {
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
		SpdPerMasterStore.load({params:{start:0, limit:20, search:'*'}});
	 
	 
		 
		gridspdper.on('rowdblclick',function(sm, rowindex, eventobject){
			 
			mid=gridspdper.getSelectionModel().getSelected().get("SpdPerMasterList.spdm_id");
		 					 
			 PurchaseDetailStore.load({params:{spdm_id:mid}});
			 PurchaseBonusStore.load({params:{spdm_id:mid}});
			 MyDesktop.getSingleModule('addspdpermaster-win').createWindow();
			 Ext.getCmp("addspdpermasterform").getForm().loadRecord(gridspdper.getSelectionModel().getSelected());
			if (gridspdper.getSelectionModel().getSelected().get("astate") == "1" || 
												gridspdper.getSelectionModel().getSelected().get("locked") == "1") 
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
		 if (gridspdper.getSelectionModel().getSelected().get("astate")=="1") {
			 	Ext.getCmp('spdperdetailGrid').disable();
				Ext.getCmp('spdper3-save').disable();
			 }
			  
		 	else {
				 		Ext.getCmp('spdperdetailGrid').enable();
						Ext.getCmp('spdper3-save').enable();
				 }
			avend_code=gridspdper.getSelectionModel().getSelected().get("SpdPerMasterList.vend_code");
		 
			awh_code=gridspdper.getSelectionModel().getSelected().get("SpdPerMasterList.wh_code");
			
			 
									 
			
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
								id:'spdper3-new',
								disabled:true,
						 		iconCls: 'new',
						 		handler: function(){
						 			addspdpermasterform.getForm().reset();
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
									Ext.getCmp('spdperdetailGrid').enable();  
									Ext.getCmp('spdm_inctax').setReadOnly(false);
									Ext.getCmp('spdm_pay_type').enable();
									Ext.getCmp('spdper3-save').enable();
						 		}
						 	},{
										text:'Print',
										id:'print_spdper',
										tooltip:'Print Purchase ',
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
								disabled:true,
						 		handler: function(){
									hitungTotalPurchase2();
						 			if (addspdpermasterform.getForm().isValid()) {
						 				addspdpermasterform.getForm().submit({
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
									id:'spdper3-cancel',
									disabled:true,
									margins:'0',
									handler: function(){
										SpdperMasterStore.reload();
										MyDesktop.getSingleModule('addspdpermaster-win').closeWindow();
										
										
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