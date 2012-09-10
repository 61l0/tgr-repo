var urladdsp2d=HOST_PATH+'/sp2d/add'; 
var urlsp2d=HOST_PATH+'/sp2d/getall'; 

function proc_sp2dpot(){
	
}
function proc_sp2dpajak(){
	
}
function proc_sp2dbeban(){
	
}
var sp2ddPot_proxy = new Ext.data.HttpProxy({
    api: {
        read : HOST_PATH+'/sp2d/readdetail_pot',
        create : HOST_PATH+'/sp2d/createdetail_pot',
        update:  HOST_PATH+'/sp2d/updatedetail_pot',
        destroy:  HOST_PATH+'/sp2d/destroydetail_pot'
    },
	listeners: {
		beforewrite : function(proxy, action) {
			App.setAlert(App.STATUS_NOTICE,"SP2D : "+action+": Menyimpan data...");
			},
		 write : function(proxy, action, result, res, rs) {
			App.setAlert(true, "SP2D  :"+action+":"+res.message);
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
var sp2ddPot_reader = new Ext.data.JsonReader({
	totalProperty: 'total',
    successProperty: 'success',
    idProperty: 'sp2dd_id',
    root: 'data',
    messageProperty: 'message'  // <-- New "messageProperty" meta-data
}, [  
	{name: 'sp2dd_id'},
	{name: 'sp2dm_id'},
	{name: 'ptg_kode'},
	 
	{name: 'sp2dd_nilai',type:'float'},
	{name: 'sp2dd_ket',type:'float'} 
 
	 
]); 

// The new DataWriter component.
var sp2ddPot_writer = new Ext.data.JsonWriter({
    encode: true,
    writeAllFields: true,
	listful:true
});

// Typical Store collecting the Proxy, Reader and Writer together.
var sp2ddPotStore = new Ext.data.Store({
    id: 'sp2ddPotStore',
    proxy: sp2ddPot_proxy,
    reader: sp2ddPot_reader,
    writer: sp2ddPot_writer,  // <-- plug a DataWriter into the store just as you would a Reader
    autoSave: false, // <-- false would delay executing create, update, destroy requests until specifically told to do so with some [save] buton.
	autoLoad: true  
});
 
var sp2dPotGrid = Ext.extend( Ext.grid.EditorGridPanel, {
    iconCls: 'icon-form',
    frame:false,
	border:false,
	loadMask: true,
//	 plugins:[ new Ext.ux.grid.GridSummary({position:'bottom',height:0})],
	sm: new Ext.grid.RowSelectionModel({	moveEditorOnEnter:false,
								singleSelect: true }),
    initComponent : function() {
 
	this.relayEvents(this.store, ['destroy', 'save', 'update']); 
	 
    sp2dPotGrid.superclass.initComponent.call(this);
    },
 
   
	listeners : {
		afteredit: function (o){
			//alert(o.field+":"+o.value+":"+o.originalValue+":"+o.row+":"+o.column );			
			proc_sp2dpot(o);
		}
		 
	}
});
// pajak,sp2d_detail2

var sp2ddPajak_proxy = new Ext.data.HttpProxy({
    api: {
        read : HOST_PATH+'/sp2d/readdetail_pajak',
        create : HOST_PATH+'/sp2d/createdetail_pajak',
        update:  HOST_PATH+'/sp2d/updatedetail_pajak',
        destroy:  HOST_PATH+'/sp2d/destroydetail_pajak'
    },
	listeners: {
		beforewrite : function(proxy, action) {
			App.setAlert(App.STATUS_NOTICE,"SP2D : "+action+": Menyimpan data...");
			},
		 write : function(proxy, action, result, res, rs) {
			App.setAlert(true, "SP2D  :"+action+":"+res.message);
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
var sp2ddPajak_reader = new Ext.data.JsonReader({
	totalProperty: 'total',
    successProperty: 'success',
    idProperty: 'sp2dd_id',
    root: 'data',
    messageProperty: 'message'  // <-- New "messageProperty" meta-data
}, [  
	{name: 'sp2dd_id'},
	{name: 'sp2dm_id'},
	{name: 'ptg_kode'},
	 
	{name: 'sp2dd_nilai',type:'float'},
	{name: 'sp2dd_ket',type:'float'} 
 
	 
]); 
 
var sp2ddPajak_writer = new Ext.data.JsonWriter({
    encode: true,
    writeAllFields: true,
	listful:true
});
 
var sp2ddPajakStore = new Ext.data.Store({
    id: 'sp2ddPajakStore',
    proxy: sp2ddPajak_proxy,
    reader: sp2ddPajak_reader,
    writer: sp2ddPajak_writer,  // <-- plug a DataWriter into the store just as you would a Reader
    autoSave: false, // <-- false would delay executing create, update, destroy requests until specifically told to do so with some [save] buton.
	autoLoad: true  
});
var gridsumPajak=new Ext.ux.grid.GridSummary({position:'bottom',height:0});
var sp2dPajakGrid = Ext.extend( Ext.grid.EditorGridPanel, {
    iconCls: 'icon-form',
    frame:false,
	border:false,
	loadMask: true,
	// plugins:[ new Ext.ux.grid.GridSummary({position:'bottom',height:0})],
	 
	sm: new Ext.grid.RowSelectionModel({	moveEditorOnEnter:false,
								singleSelect: true }),
    initComponent : function() {
 
	this.relayEvents(this.store, ['destroy', 'save', 'update']); 
	 
    sp2dPajakGrid.superclass.initComponent.call(this);
    },
 
   
	listeners : {
		afteredit: function (o){
			//alert(o.field+":"+o.value+":"+o.originalValue+":"+o.row+":"+o.column );			
			proc_sp2dpajak(o);
		}
		 
	}
});



// beban rek, sp2d_detail3

var sp2ddBeban_proxy = new Ext.data.HttpProxy({
    api: {
        read : HOST_PATH+'/sp2d/readdetail_beban',
        create : HOST_PATH+'/sp2d/createdetail_beban',
        update:  HOST_PATH+'/sp2d/updatedetail_beban',
        destroy:  HOST_PATH+'/sp2d/destroydetail_beban'
    },
	listeners: {
		beforewrite : function(proxy, action) {
			App.setAlert(App.STATUS_NOTICE,"SP2D : "+action+": Menyimpan data...");
			},
		 write : function(proxy, action, result, res, rs) {
			App.setAlert(true, "SP2D  :"+action+":"+res.message);
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
var sp2ddBeban_reader = new Ext.data.JsonReader({
	totalProperty: 'total',
    successProperty: 'success',
    idProperty: 'sp2dd_id',
    root: 'data',
    messageProperty: 'message'  // <-- New "messageProperty" meta-data
}, [  
	{name: 'sp2dd_id'},
	{name: 'sp2dm_id'},
	{name: 'akun_kode'},
	 
	{name: 'sp2dd_nilai',type:'float'},
	{name: 'sp2dd_ket',type:'float'} 
 
	 
]); 
 
var sp2ddBeban_writer = new Ext.data.JsonWriter({
    encode: true,
    writeAllFields: true,
	listful:true
});
 
var sp2ddBebanStore = new Ext.data.Store({
    id: 'sp2ddBebanStore',
    proxy: sp2ddBeban_proxy,
    reader: sp2ddBeban_reader,
    writer: sp2ddBeban_writer,  // <-- plug a DataWriter into the store just as you would a Reader
    autoSave: false, // <-- false would delay executing create, update, destroy requests until specifically told to do so with some [save] buton.
	autoLoad: true  
});
 
var sp2dBebanGrid = Ext.extend( Ext.grid.EditorGridPanel, {
    iconCls: 'icon-form',
    frame:false,
	border:false,
	loadMask: true,
//	 plugins:[ new Ext.ux.grid.GridSummary({position:'bottom',height:0})],
	sm: new Ext.grid.RowSelectionModel({	moveEditorOnEnter:false,
								singleSelect: true }),
    initComponent : function() {
 
	this.relayEvents(this.store, ['destroy', 'save', 'update']); 
	 
    sp2dBebanGrid.superclass.initComponent.call(this);
    },
 
   
	listeners : {
		afteredit: function (o){
			//alert(o.field+":"+o.value+":"+o.originalValue+":"+o.row+":"+o.column );			
			proc_sp2dbeban(o);
		}
		 
	}
});
var Sp2dMasterJsonReader =  new Ext.data.JsonReader({
 
	remoteSort: false,
	root: 'sp2ds',
	totalProperty: 'total',
    idProperty: 'Sp2dMasterList.sp2dm_id',
	fields: [
		{name:'Sp2dMasterList.sp2dm_id'},
	 
		{name:'data[Sp2dMaster][sp2dm_id]',mapping:'Sp2dMasterList.sp2dm_id'},
		{name:'data[Sp2dMaster][sp2dm_no]',mapping:'Sp2dMasterList.sp2dm_no'},
		{name:'data[Sp2dMaster][sp2dm_tgl]',mapping:'Sp2dMasterList.sp2dm_tgl', type: 'date', dateFormat: 'Y-m-d'},
		{name:'data[Sp2dMaster][un_id]',mapping:'Sp2dMasterList.un_id'},
		{name:'data[Sp2dMaster][un_kode]',mapping:'Sp2dMasterList.un_kode'},
		{name:'data[Sp2dMaster][un_nama]',mapping:'Sp2dMasterList.un_nama'},
		{name:'data[Sp2dMaster][sp2dm_catatan]',mapping:'Sp2dMasterList.sp2dm_catatan'} 
	 
	]
	 
	 
});

var Sp2dMasterStore = new Ext.data.GroupingStore({
  	reader:Sp2dMasterJsonReader,
	groupField:'data[Sp2dMaster][un_nama]',
	 remoteGroup:false,
	  groupOnSort: false,
	 
	proxy: new Ext.data.HttpProxy({
        url: urlsp2d
    })
});


MyDesktop.EntrySP2DForm = Ext.extend(Ext.app.Module, {
    id:'entrysp2d-win',
	title:'SP2D',
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
                title:'Surat Perintah Membayar',
                width:800,
                height:500,
                iconCls: 'icon-form',
                animCollapse:false,
                constrainHeader:true,
				stripeRows: true,
				border:false,
               layout:'fit',
                items :
					[entrysp2dform = new Ext.FormPanel({
						id:'entrysp2dform',
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
												 name: 'data[Sp2dMaster][sp2dm_id]',
												 
												id:'sp2dm_id1' 
												 
											},
											 
											{	 xtype:'textfield',
												fieldLabel: 'No Surat',
												name: 'data[Sp2dMaster][sp2dm_no]',
												maxLength:20,
												id:'sp2dm_no1',
												 
												allowBlank:false 
												 
											},
											 
											 
											{	 xtype:'datefield',
												fieldLabel: 'Tanggal',
												id:'sp2dm_tgl1',
												name: 'data[Sp2dMaster][sp2dm_tgl]',
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
										columnWidth:'.5', 
										items:[ 
										
											{
						                        xtype : 'compositefield',
						                       anchor:'95%',
						                        msgTarget: 'side',
						                        fieldLabel: 'No SPM',
						                        items : [ 
													new Ext.form.ComboBox({
									 						 id:'sp2d_sppm_no1',
															 store: sppSearchStore,
															 hiddenName:'data[Sp2dMaster][sppm_no]',
															 fieldLabel:'SKPD',
															 displayField:'un_kode',
															 typeAhead: false,
															 enableKeyEvents :true, 
															 valueField:'sppm_no',
															  triggerAction: 'all',
															 loadingText: 'Searching...',
															 minChars:0,
															 pageSize:20,
															 boxMinWidth: 150,
															 boxMinHeight: 100,
															 width:150,
															 hideTrigger:false,
															 forceSelection: true,
															 tpl:sppComboTpl,
															 allowBlank:false,
															 itemSelector: 'div.search-spp',
															 listeners: {
							  										select: function(thiscombo,record, index){
																	/*	  
																		 Ext.getCmp('un_nama1').setValue(record.get('un_nama'));
																		 Ext.getCmp('sp2dm_angg1').setValue(record.get('dpa_angg'));
																		 Ext.getCmp('sp2dm_akum1').setValue(record.get('dpa_akum'));
																		 Ext.getCmp('sp2dm_tersedia1').setValue(record.get('dpa_tersedia'));
																		*/
																	}	
																}
															 
										
															 }),
													{	xtype:'textfield',
														id:'sp2dm_un_nama1',
														fieldLabel: '',
														name: 'data[SpdperMaster][un_nama]',
														flex : 1,
														readOnly:true 
													}
													]
											}, //end of composite
											{	 xtype:'datefield',
												fieldLabel: 'Tanggal SPM',
												id:'sppm_tgl2',
												name: 'data[Sp2dMaster][sppm_tglspp]',
												maxLength:50, 
												format:'Y-m-d',
												value:new Date(),
												readOnly:true,
												width:100,
												allowBlank:false
											}  
										]
									} 
									]
								}//end of north
								,
								{
									 
									layout: 'column',
									border: true,
									frame:false,
									region: 'center',
									labelWidth:80,
																	       
							       	autoScroll :true,
							       
							        bodyStyle:'padding:5px 5px 0',
							      	 
									 width:800,
									 autoHeight:true,
									 columns:3,
									 items: [
										{	      
											 
											layout: 'fit',
											border: false, 	
										 	columnWidth:'.50',
										 	items :[
									 				{   
											            xtype:'fieldset',
											            title: 'Dari',
											            anchor:'95%',
											            collapsible: false,
											            autoHeight:true,
											            labelWidth:100,
											            defaults: {anchor:'95%',labelWidth:'200px'},
											            defaultType: 'textfield',
											            items : [
													            
																{	xtype:'textfield',
																 
																	fieldLabel: 'Bank/Pos',
																	name: 'data[Sp2dMaster][spdm_bendanama]' 
																	 
																 
																},
																{	xtype:'textfield',
																 
																	fieldLabel: 'Rekening',
																	name: 'data[Sp2dMaster][spdm_bendanama]' 
																	 
																 
																},
																{	xtype:'textfield',
																 
																	fieldLabel: 'Sebesar',
																	name: 'data[Sp2dMaster][spdm_bendanama]' 
																	 
																 
																}
											            ]
									 				},
									 				{   
											            xtype:'fieldset',
											            title: 'Kepada',
											            anchor:'95%',
											            collapsible: false,
											            autoHeight:true,
											            labelWidth:100,
											            defaults: {anchor:'95%',labelWidth:'200px'},
											            defaultType: 'textfield',
											            items : [
													            
																{	xtype:'textfield',
																 
																	fieldLabel: 'Kepada',
																	name: 'data[Sp2dMaster][spdm_bendanama]' 
																	 
																 
																},
																{	xtype:'textfield',
																 
																	fieldLabel: 'NPWP',
																	name: 'data[Sp2dMaster][spdm_bendanama]' 
																	 
																 
																},
																{	xtype:'textfield',
																 
																	fieldLabel: 'No Rekening',
																	name: 'data[Sp2dMaster][spdm_bendanama]' 
																	 
																 
																},
																{	xtype:'textfield',
																 
																	fieldLabel: 'Bank/Pos',
																	name: 'data[Sp2dMaster][spdm_bendanama]' 
																	 
																 
																},
																{	xtype:'textfield',
																 
																	fieldLabel: 'Keperluan',
																	name: 'data[Sp2dMaster][spdm_bendanama]' 
																	 
																 
																}
											            ]
									 				},
									 				{
											 			xtype:'fieldset',
											            title: 'Pembebanan',
											            anchor:'95%',
											            collapsible: false,
											            autoHeight:true,
											            layout:'fit',
											            
											            defaults: {anchor:'95%' },
											            defaultType: 'textfield',
											            items:
										           		 asp2dBebanGrid = new sp2dBebanGrid({
																id: 'asp2dBebanGrid',
																autoWidth:true,
																height: 100,
																border: true,
																frame:false,
																stripeRows: true,
																store: sp2ddPotStore,
																
																columns: [{
																	header: "Kode Rekening",
																	dataIndex: 'akun_kode',
																	sortable: true,
																	width:120,
																	editor: {
																		 xtype:'textfield'
																	
																	},
																	isCellEditable: true
																}, 
																 {
																	header: "Uraian",
																	width: 100,
																	sortable: true,
																	editor:new Ext.form.TextField({enableKeyEvents :true }),
																	dataIndex: 'sp2dd_ket'
																},   
																{
																	header: "Nilai",
																	width: 80,
																	sortable: true,
																	align:'right',
																	summaryType: 'sum',
																	dataIndex: 'sp2dd_nilai',
																	isCellEditable: true,
																	allowBlank: false,
																	editor:new Ext.form.NumberField({enableKeyEvents :true }),
																	renderer: Ext.util.Format.numberRenderer('0,000.00')
																
																}, 
																 {
																	header: "ID",
																	hidden:true,
																	width: 40,
																	sortable: true,
																	dataIndex: 'sp2dd_id' 
																} ]
															
															}) //end of grid 
													}
									 				]//end of item 
												            
										}//end of column left
										,{
											width:10,
											layout:'form',
											html:'',
											columnWidth:'.02',
											html:'&nbsp'
										}
										,{
											layout:'fit',
											border:false,
											columnWidth:'.48',
											items :[{
									 			xtype:'fieldset',
									            title: 'Potongan',
									          
									            collapsible: false,
									            autoHeight:true,
									         	 layout:'fit',
									            labelWidth:100,
									            defaults: {anchor:'95%' },
									            defaultType: 'textfield',
									            items:
									           		 asp2dPotGrid = new sp2dPotGrid({
															id: 'asp2dPotGrid',
															autoWidth:true,
															height: 125,
															border: true,
															frame:false,
															stripeRows: true,
															store: sp2ddPotStore,
															
															columns: [{
																header: "Potongan",
																dataIndex: 'ptg_kode',
																sortable: true,
																width:80,
																editor: {
																	 xtype:'textfield'
																
																},
																isCellEditable: true
															}, 
															{
																header: "Nilai",
																width: 80,
																sortable: true,
																align:'right',
																summaryType: 'sum',
																dataIndex: 'sp2dd_nilai',
																isCellEditable: true,
																allowBlank: false,
																editor:new Ext.form.NumberField({enableKeyEvents :true }),
																renderer: Ext.util.Format.numberRenderer('0,000.00')
															
															}, {
																header: "Keterangan",
																width: 100,
																sortable: true,
																editor:new Ext.form.TextField({enableKeyEvents :true }),
																dataIndex: 'sp2dd_ket'
															},   
															 {
																header: "ID",
																hidden:true,
																width: 40,
																sortable: true,
																dataIndex: 'sp2dd_id' 
															} ]
														
														}) //end of grid  
											},
											{
									 			xtype:'fieldset',
									            title: 'Pajak',
									          
									            collapsible: false,
									            autoHeight:true,
									         	 layout:'fit',
									            labelWidth:100,
									            defaults: {anchor:'95%' },
									            defaultType: 'textfield',
									            items:
									           		 asp2dPajakGrid = new sp2dPajakGrid({
															id: 'asp2dPajakGrid',
											 				 autoWidth:true,
															height: 125,
															border: true,
															frame:false,
															stripeRows: true,
															 
															store: sp2ddPajakStore,
															columns: [{
																header: "Pajak",
																dataIndex: 'pjk_kode',
																sortable: true,
																width:80,
																editor: {
																	 xtype:'textfield'
																
																},
																isCellEditable: true
															}, 
															{
																header: "Nilai",
																width: 80,
																sortable: true,
																align:'right',
																summaryType: 'sum',
																dataIndex: 'sp2dd_nilai',
																isCellEditable: true,
																allowBlank: false,
																editor:new Ext.form.NumberField({enableKeyEvents :true }),
																renderer: Ext.util.Format.numberRenderer('0,000.00')
															
															}, {
																header: "Keterangan",
																width: 100,
																sortable: true,
																editor:new Ext.form.TextField({enableKeyEvents :true }),
																dataIndex: 'sp2dd_ket'
															},   
															 {
																header: "ID",
																hidden:true,
																width: 40,
																sortable: true,
																dataIndex: 'sp2dd_id' 
															} ]
														
														}) //end of grid
											}]//end of item
													 
										}
									 ]
										 
								} 
							 ]
							  
				         ,
						 buttons: {
						 	layout: 'hbox',
							 defaults: {margins:'0 5 0 0'},
						 	items: [{
						 		text: 'Create New',
								id:'sp2d1-new',
								disabled:true,
						 		iconCls: 'new',
						 		handler: function(){
						 			addspdmasterform.getForm().reset();
						 			PurchaseDetailStore.load({
						 				params: {
						 					sp2dm_id: 0
						 				}
						 			});
									PurchaseBonusStore.load({
						 				params: {
						 					sp2dm_id: 0
						 				}
						 			});
						 			Ext.getCmp('sp2dm_date1').setValue(new Date());
									Ext.getCmp('sp2dm_date1').setReadOnly(false);
									Ext.getCmp('sp2dm_id1').setValue(0);
									Ext.getCmp('sp2dm_pay_type').setValue(0);
									Ext.getCmp('vend_code2').enable();
									Ext.getCmp('sp2dm_wh_code').enable();
									Ext.getCmp('spddetailGrid').enable();  
									Ext.getCmp('sp2dm_inctax').setReadOnly(false);
									Ext.getCmp('sp2dm_pay_type').enable();
									Ext.getCmp('sp2d1-save').enable();
						 		}
						 	},{
										text:'Print',
										id:'print_spd',
										tooltip:'Print Purchase ',
										iconCls:'printer',
										handler:function(){
											aid=Ext.getCmp('sp2dm_id1').getValue();
											aurl=HOST_PATH+'/rptspd/spd/'+aid;
											window.open(aurl,'_blank');
	
										}
								}, {
						 		xtype: 'spacer',
						 		flex: 1
						 	}, {
						 		text: 'Save',
						 		iconCls: 'save',
								id:'sp2d1-save',
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
														Ext.getCmp('sp2dm_no1').setValue(newno);
														Ext.getCmp('sp2dm_id1').setValue(newid)
														Ext.getCmp('sp2dm_no1').setReadOnly(true);
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
									id:'sp2d1-cancel',
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
MyDesktop.SP2DGridWindow = Ext.extend(Ext.app.Module, {
    id:'sp2dgrid-win',
   init : function(){
      this.launcher = {
            text: 'SP2D',
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
                title:'Surat Perintah Pencarian Dana (SP2D)',
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
					gridsp2d = new Ext.grid.GridPanel({
							id: 'gridsp2d',
						 
							 store: Sp2dMasterStore,
							trackMouseOver: true,
							disableSelection: false,
							loadMask: true,
							// grid columns
							columns: [ 
						  {
								header: "No",
								dataIndex: 'data[Sp2dMaster][sp2dm_no]',
								width: 100,
								sortable: true
							},
							{
								header: "Tanggal",
								dataIndex: 'data[Sp2dMaster][sp2dm_tgl]',
								width: 150,
								sortable: true,
								 renderer: function(date) { return date.format("d/m/Y"); }
						
							},
							 {
								header: "No SPP",
								dataIndex: 'data[Sp2dMaster][sppm_no]',
								width: 150,
								sortable: true
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
											if (pv_sp2d >= 1) {
												Ext.getCmp('editsp2dbutt').enable();
												Ext.getCmp('applysp2dbutt').enable();
												
											}
										 	if (pv_sp2d>=2)
											 Ext.getCmp('delsp2dbutt').enable();
										 }
										else {
										 	Ext.getCmp('delsp2dbutt').disable();
										 	Ext.getCmp('editsp2dbutt').disable();
											Ext.getCmp('applysp2dbutt').disable();
										 	 
										}
									}
								}
							}),
							bbar: new Ext.PagingToolbar({
								pageSize: 20,
								 store: Sp2dMasterStore,
								displayInfo: true,
								displayMsg: 'Displaying contents {0} - {1} of {2}',
								emptyMsg: "No Content to display",
								plugins: new Ext.ux.SlidingPager(),
								listeners :{
										'change' : function(){
										 Sp2dMasterStore.baseParams={start:'start',limit:'limit',search:Ext.getCmp("searchSP2DTxt").getValue()};
			    
										}
									}
									 
							}),
							tbar: [{
								text: 'SP2D',
								iconCls: 'sp2d',
								ref: '../sp2dButton',
								
								menu: {
									xtype: 'menu',
									plain: true,
									items: [{
										text: 'Tambah',
										iconCls: 'add',
										handler: function(){
											 
											 MyDesktop.getSingleModule('entrysp2d-win').createWindow();
											 
															 
										}
									} , {
										id: 'editsp2dbutt',
										text: 'Ubah',
										iconCls: 'edit',
										disabled: true,
										handler: function(){
										 
										}
									},{
											id: 'delsp2dbutt',
											text: 'Hapus',
											iconCls: 'delete',
											disabled: true,
											handler: function(){
												/*
												  aid=gridsp2d.getSelectionModel().getSelected().get('Sp2dMasterList.sp2dm_id');
												
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
													        url:urldelsp2dmaster,
													        params : {id :aid},
															method: 'GET',
															success: function ( result, request ) { 
																	Ext.MessageBox.hide();
						
																	var jsonData = Ext.util.JSON.decode(result.responseText);
																 
																	Ext.MessageBox.alert('Information', jsonData.msg); 
																	Sp2dMasterStore.reload();
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
									id:'searchSP2DTxt',
								    text:'*',
							        emptyText:'*',
							        selectOnFocus:true,
									listeners: {
						              specialkey: function(f,e){
						                if (e.getKey() == e.ENTER) {
								                Sp2dMasterStore.load({params: {
													start: 0,
													limit: 20,
													 search:Ext.getCmp("searchSP2DTxt").getValue()
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
								  Sp2dMasterStore.load({params: {
									start: 0,
									limit: 20,
									 search:Ext.getCmp("searchSP2DTxt").getValue()
									 }})
						       
					        }
							}]
						
						})//end of grid
					
				
					
            });
        }
		 
        win2.show();
		Sp2dMasterStore.load({params:{start:0, limit:20, search:'*'}});
	 
	 
		 
		gridsp2d.on('rowdblclick',function(sm, rowindex, eventobject){ 
			
			 
									 
			
		});
		 
		 
	}
}); 
