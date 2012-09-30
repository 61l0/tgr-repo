var urladdspmmaster=HOST_PATH+'/spm/add'; 
var urlspm=HOST_PATH+'/spm/getall'; 
var urlgetsppdetailbyno=HOST_PATH+'/spp/getdetail2byno'; 
var urlgetpotongan=HOST_PATH+'/lain/getpotongan'; 
var urlgetpajak=HOST_PATH+'/lain/getpajak'; 
var detailPotonganStore = new Ext.data.Store({
    proxy: new Ext.data.HttpProxy({
        url: urlgetpotongan
    }),
    reader: new Ext.data.JsonReader({
        root: 'data',
        totalProperty: 'total',
        id: 'ptg_kode',
    fields : [
        	{name: 'ptg_kode'},
	 
	{name: 'ptg_nama'} 
	 
       
        
    ]
    }),
    listeners : {
    	load : function (thistore,recordlist,object){
    	 
 
    		for (i=0;i<recordlist.length;i++){
    		abc = new spmdPotStore.recordType({
					spmd_id: 0,
					sppm_id: '',
				  
					ptg_kode:recordlist[i].get('ptg_kode'),
					 
					spmd_nilai:0
				 
			
			});
		 
			spmdPotStore.add(abc);
    		}
    		Ext.MessageBox.hide();
    		 
    	}
    }
    
});

var detailPajakStore = new Ext.data.Store({
    proxy: new Ext.data.HttpProxy({
        url: urlgetpajak
    }),
    reader: new Ext.data.JsonReader({
        root: 'data',
        totalProperty: 'total',
        id: 'pjk_kode',
    fields : [
        	{name: 'pjk_kode'},
	 
	{name: 'pjk_nama'} 
	 
       
        
    ]
    }),
    listeners : {
    	load : function (thistore,recordlist,object){
    	 
 
    		for (i=0;i<recordlist.length;i++){
    		abc = new spmdPajakStore.recordType({
					spmd_id: 0,
					sppm_id: '',
				 	 
					pjk_kode:recordlist[i].get('pjk_kode'),
					 
					spmd_nilai:0
				 
			
			});
		 
			spmdPajakStore.add(abc);
    		}
    		Ext.MessageBox.hide();
    		 
    	}
    }
    
});
var detailSPP1Store = new Ext.data.Store({
    proxy: new Ext.data.HttpProxy({
        url: urlgetsppdetailbyno
    }),
    reader: new Ext.data.JsonReader({
        root: 'data',
        totalProperty: 'total',
        id: 'sppd_id',
    fields : [
        	{name: 'sppd_id'},
	 
	{name: 'akun_kode'},
	{name: 'akun_nama'},
	{name: 'sppd_nilai'} 
	 
       
        
    ]
    }),
    listeners : {
    	load : function (thistore,recordlist,object){
    	 
 
    		for (i=0;i<recordlist.length;i++){
    		abc = new spmdBebanStore.recordType({
					spmd_id: 0,
					sppm_id: '',
				 	spmd_ket:'',
					akun_kode:recordlist[i].get('akun_kode'),
					akun_nama:recordlist[i].get('akun_nama'),
					 
					spmd_nilai:recordlist[i].get('sppd_nilai') 
				 
			
			});
		 
			spmdBebanStore.add(abc);
    		}
    		Ext.MessageBox.hide();
    		 
    	}
    }
    
});
function proc_spmpot(){
	
}
function proc_spmpajak(){
	
}
function proc_spmbeban(){
	
}
var spmdPot_proxy = new Ext.data.HttpProxy({
    api: {
        read : HOST_PATH+'/spm/readdetail_1',
        create : HOST_PATH+'/spm/createdetail_1',
        update:  HOST_PATH+'/spm/updatedetail_1',
        destroy:  HOST_PATH+'/spm/destroydetail_1'
    },
	listeners: {
		beforewrite : function(proxy, action) {
			App.setAlert(App.STATUS_NOTICE,"SPM : "+action+": Menyimpan data...");
			},
		 write : function(proxy, action, result, res, rs) {
			App.setAlert(true, "SPM  :"+action+":"+res.message);
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
var spmdPot_reader = new Ext.data.JsonReader({
	totalProperty: 'total',
    successProperty: 'success',
    idProperty: 'spmd_id',
    root: 'data',
    messageProperty: 'message'  // <-- New "messageProperty" meta-data
}, [  
	{name: 'spmd_id'},
	{name: 'spmm_id'},
	{name: 'ptg_kode'},
	 
	{name: 'spmd_nilai',type:'float'},
	{name: 'spmd_ket',type:'float'} 
 
	 
]); 

// The new DataWriter component.
var spmdPot_writer = new Ext.data.JsonWriter({
    encode: true,
    writeAllFields: true,
	listful:true
});

// Typical Store collecting the Proxy, Reader and Writer together.
var spmdPotStore = new Ext.data.Store({
    id: 'spmdPotStore',
    proxy: spmdPot_proxy,
    reader: spmdPot_reader,
    writer: spmdPot_writer,  // <-- plug a DataWriter into the store just as you would a Reader
    autoSave: false, // <-- false would delay executing create, update, destroy requests until specifically told to do so with some [save] buton.
	autoLoad: true  
});
 
var spmPotGrid = Ext.extend( Ext.grid.EditorGridPanel, {
    iconCls: 'icon-form',
    frame:false,
	border:false,
	loadMask: true,
//	 plugins:[ new Ext.ux.grid.GridSummary({position:'bottom',height:0})],
	sm: new Ext.grid.RowSelectionModel({	moveEditorOnEnter:false,
								singleSelect: true }),
    initComponent : function() {
 
	this.relayEvents(this.store, ['destroy', 'save', 'update']); 
	 
    spmPotGrid.superclass.initComponent.call(this);
    },
 
   
	listeners : {
		afteredit: function (o){
			//alert(o.field+":"+o.value+":"+o.originalValue+":"+o.row+":"+o.column );			
			proc_spmpot(o);
		}
		 
	}
});
// pajak,spm_detail2

var spmdPajak_proxy = new Ext.data.HttpProxy({
    api: {
        read : HOST_PATH+'/spm/readdetail_2',
        create : HOST_PATH+'/spm/createdetail_2',
        update:  HOST_PATH+'/spm/updatedetail_2',
        destroy:  HOST_PATH+'/spm/destroydetail_2'
    },
	listeners: {
		beforewrite : function(proxy, action) {
			App.setAlert(App.STATUS_NOTICE,"SPM : "+action+": Menyimpan data...");
			},
		 write : function(proxy, action, result, res, rs) {
			App.setAlert(true, "SPM  :"+action+":"+res.message);
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
var spmdPajak_reader = new Ext.data.JsonReader({
	totalProperty: 'total',
    successProperty: 'success',
    idProperty: 'spmd_id',
    root: 'data',
    messageProperty: 'message'  // <-- New "messageProperty" meta-data
}, [  
	{name: 'spmd_id'},
	{name: 'spmm_id'},
	{name: 'pjk_kode'},
	 
	{name: 'spmd_nilai',type:'float'},
	{name: 'spmd_ket',type:'float'} 
 
	 
]); 
 
var spmdPajak_writer = new Ext.data.JsonWriter({
    encode: true,
    writeAllFields: true,
	listful:true
});
 
var spmdPajakStore = new Ext.data.Store({
    id: 'spmdPajakStore',
    proxy: spmdPajak_proxy,
    reader: spmdPajak_reader,
    writer: spmdPajak_writer,  // <-- plug a DataWriter into the store just as you would a Reader
    autoSave: false, // <-- false would delay executing create, update, destroy requests until specifically told to do so with some [save] buton.
	autoLoad: true  
});
var gridsumPajak=new Ext.ux.grid.GridSummary({position:'bottom',height:0});
var spmPajakGrid = Ext.extend( Ext.grid.EditorGridPanel, {
    iconCls: 'icon-form',
    frame:false,
	border:false,
	loadMask: true,
	// plugins:[ new Ext.ux.grid.GridSummary({position:'bottom',height:0})],
	 
	sm: new Ext.grid.RowSelectionModel({	moveEditorOnEnter:false,
								singleSelect: true }),
    initComponent : function() {
 
	this.relayEvents(this.store, ['destroy', 'save', 'update']); 
	 
    spmPajakGrid.superclass.initComponent.call(this);
    },
 
   
	listeners : {
		afteredit: function (o){
			//alert(o.field+":"+o.value+":"+o.originalValue+":"+o.row+":"+o.column );			
			proc_spmpajak(o);
		}
		 
	}
});



// beban rek, spm_detail3

var spmdBeban_proxy = new Ext.data.HttpProxy({
    api: {
        read : HOST_PATH+'/spm/readdetail_3',
        create : HOST_PATH+'/spm/createdetail_3',
        update:  HOST_PATH+'/spm/updatedetail_3',
        destroy:  HOST_PATH+'/spm/destroydetail_3'
    },
	listeners: {
		beforewrite : function(proxy, action) {
			App.setAlert(App.STATUS_NOTICE,"SPM : "+action+": Menyimpan data...");
			},
		 write : function(proxy, action, result, res, rs) {
			App.setAlert(true, "SPM  :"+action+":"+res.message);
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
var spmdBeban_reader = new Ext.data.JsonReader({
	totalProperty: 'total',
    successProperty: 'success',
    idProperty: 'spmd_id',
    root: 'data',
    messageProperty: 'message'  // <-- New "messageProperty" meta-data
}, [  
	{name: 'spmd_id'},
	{name: 'spmm_id'},
	{name: 'akun_kode'},
    {name: 'akun_nama'},
	{name: 'spmd_nilai',type:'float'},
	{name: 'spmd_ket',type:'string'} 
 
	 
]); 
 
var spmdBeban_writer = new Ext.data.JsonWriter({
    encode: true,
    writeAllFields: true,
	listful:true
});
 
var spmdBebanStore = new Ext.data.Store({
    id: 'spmdBebanStore',
    proxy: spmdBeban_proxy,
    reader: spmdBeban_reader,
    writer: spmdBeban_writer,  // <-- plug a DataWriter into the store just as you would a Reader
    autoSave: false, // <-- false would delay executing create, update, destroy requests until specifically told to do so with some [save] buton.
	autoLoad: true  
});
 
var spmBebanGrid = Ext.extend( Ext.grid.EditorGridPanel, {
    iconCls: 'icon-form',
    frame:false,
	border:false,
	loadMask: true,
//	 plugins:[ new Ext.ux.grid.GridSummary({position:'bottom',height:0})],
	sm: new Ext.grid.RowSelectionModel({	moveEditorOnEnter:false,
								singleSelect: true }),
    initComponent : function() {
 
	this.relayEvents(this.store, ['destroy', 'save', 'update']); 
	 
    spmBebanGrid.superclass.initComponent.call(this);
    },
 
   
	listeners : {
		afteredit: function (o){
			//alert(o.field+":"+o.value+":"+o.originalValue+":"+o.row+":"+o.column );			
			proc_spmbeban(o);
		}
		 
	}
});
var SpmMasterJsonReader =  new Ext.data.JsonReader({
 
	remoteSort: false,
	root: 'spmmasters',
	totalProperty: 'total',
    idProperty: 'SpmMasterList.spmm_id',
	fields: [
		{name:'SpmMasterList.spmm_id'},
	 
		{name:'data[SpmMaster][spmm_id]',mapping:'SpmMasterList.spmm_id'},
		{name:'data[SpmMaster][spmm_no]',mapping:'SpmMasterList.spmm_no'},
		{name:'data[SpmMaster][sppm_no]',mapping:'SpmMasterList.sppm_no'},
		{name:'data[SpmMaster][sppm_tgl]',mapping:'SpmMasterList.sppm_tgl', type: 'date', dateFormat: 'Y-m-d'},
		{name:'data[SpmMaster][spdm_no]',mapping:'SpmMasterList.sppm_no'},
		{name:'data[SpmMaster][spdm_tgl]',mapping:'SpmMasterList.spdm_tgl', type: 'date', dateFormat: 'Y-m-d'},
		{name:'data[SpmMaster][spmm_tgl]',mapping:'SpmMasterList.spmm_tgl', type: 'date', dateFormat: 'Y-m-d'},
		{name:'data[SpmMaster][un_id]',mapping:'SpmMasterList.un_id'},
		{name:'data[SpmMaster][un_kode]',mapping:'SpmMasterList.un_kode'},
		{name:'data[SpmMaster][un_nama]',mapping:'SpmMasterList.un_nama'},
		{name:'data[SpmMaster][bank_norek]',mapping:'SpmMasterList.bank_norek'},
		{name:'data[SpmMaster][bank_nama]',mapping:'SpmMasterList.bank_nama'},
		{name:'data[SpmMaster][spmm_benda]',mapping:'SpmMasterList.spmm_benda'},
		{name:'data[SpmMaster][spmm_bendanama]',mapping:'SpmMasterList.spmm_bendanama'},
		{name:'data[SpmMaster][spmm_catatan]',mapping:'SpmMasterList.spmm_catatan'} 
	 
	]
	 
	 
});

var SpmMasterStore = new Ext.data.GroupingStore({
  	reader:SpmMasterJsonReader,
	groupField:'data[SpmMaster][un_nama]',
	 remoteGroup:false,
	  groupOnSort: false,
	 
	proxy: new Ext.data.HttpProxy({
        url: urlspm
    })
});


MyDesktop.EntrySPMForm = Ext.extend(Ext.app.Module, {
    id:'entryspm-win',
	title:'SPM',
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
					[entryspmform = new Ext.FormPanel({
						id:'entryspmform',
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
												 name: 'data[SpmMaster][spmm_id]',
												 
												id:'spmm_id1' 
												 
											},
											{	 xtype:'hidden',
												 name: 'data[SpmMaster][un_id]',
												 
												id:'spmm_un_id2' 
												 
											},
											 
											{	 xtype:'textfield',
												fieldLabel: 'No Surat',
												name: 'data[SpmMaster][spmm_no]',
												maxLength:20,
												id:'spmm_no1',
												 
												allowBlank:false 
												 
											},
											 
											 
											{	 xtype:'datefield',
												fieldLabel: 'Tanggal',
												id:'spmm_tgl1',
												name: 'data[SpmMaster][spmm_tgl]',
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
						                        fieldLabel: 'No SPP',
						                        items : [ 
													new Ext.form.ComboBox({
									 						 id:'spm_spmm_no1',
															 store: sppSearchStore,
															 hiddenName:'data[SpmMaster][sppm_no]',
															 fieldLabel:'No SPP',
															 displayField:'sppm_no',
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
							  											Ext.getCmp('spmm_benda1').setValue(record.get('spmm_benda'));
							  											Ext.getCmp('spmm_bendanama1').setValue(record.get('spmm_bendanama'));
							  											Ext.getCmp('spmm_banknorek1').setValue(record.get('bank_norek'))
							  												Ext.getCmp('spmm_banknama1').setValue(record.get('bank_nama'));
							  											Ext.getCmp('spmm_un_id2').setValue(record.get('un_id'));
							  											Ext.getCmp('spmm_un_nama2').setValue(record.get('un_nama'));
							  											Ext.getCmp('spmm_spdm_no1').setValue(record.get('spdm_no'));
							  											Ext.getCmp('spmm_spdm_tgl1').setValue(record.get('spdm_tgl'));
							  											Ext.getCmp('spmm_sppm_tgl1').setValue(record.get('sppm_tgl'));
							  											 spmdBebanStore.removeAll();
							  											 detailSPP1Store.load({params: {
																				 
																				 sppm_no:record.get("sppm_no")
																		 }})
																		 spmdPajakStore.removeAll();
																		  detailPajakStore.load();
																		  spmdPotStore.removeAll();
							  											 detailPotonganStore.load();
																	/*	  
																		 Ext.getCmp('un_nama1').setValue(record.get('un_nama'));
																		 Ext.getCmp('spmm_angg1').setValue(record.get('dpa_angg'));
																		 Ext.getCmp('spmm_akum1').setValue(record.get('dpa_akum'));
																		 Ext.getCmp('spmm_tersedia1').setValue(record.get('dpa_tersedia'));
																		*/
																	}	
																}
															 
										
															 }),
													{	xtype:'textfield',
														id:'spmm_sppm_tgl1',
														fieldLabel: '',
														name: 'data[SpmMaster][sppm_tgl]',
														flex : 1,
														readOnly:true 
													}
													]
											}, //end of composite
											{	 xtype:'datefield',
												fieldLabel: 'Tanggal SPP',
												id:'spmm_tgl2',
												name: 'data[SpmMaster][sppm_tgl]',
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
											 
											layout: 'form',
											border: false, 	
										 	columnWidth:'.70',
										 	items :[
									 				{   
											            xtype:'fieldset',
											            title: 'Dasar',
											            anchor:'95%',
											            collapsible: false,
											            autoHeight:true,
											            labelWidth:150,
											            defaults: {anchor:'95%',labelWidth:'200px'},
											            defaultType: 'textfield',
											            items : [
													            {
												                    fieldLabel: 'SKPD',
												                    name: 'data[SpmMaster][un_nama]',
												                    id:'spmm_un_nama2',
												                    value: '' 
												                   
												                },
												                {
											                        xtype : 'compositefield',
											                        anchor:'95%',
											                        msgTarget: 'side',
											                        fieldLabel: 'Bendahara Pengeluaran',
											                        items : [ 
													              		  new Ext.form.ComboBox({
																 						 id:'spmm_benda1',
																						 store: bendaSearchStore,
																						 hiddenName:'data[SpmMaster][spmm_benda]',
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
																									  
																									 Ext.getCmp('spmm_bendanama1').setValue(record.get('pn_nama'));
																									 
																								}	
																							}
																						 
																	
																						 }),
																				{	xtype:'textfield',
																					id:'spmm_bendanama1',
																					fieldLabel: '',
																					name: 'data[SpmMaster][spmm_bendanama]',
																					flex : 1,
																					readOnly:true 
																				}
																		]
													                },
													                 {
											                        xtype : 'compositefield',
											                        anchor:'95%',
											                        msgTarget: 'side',
											                        fieldLabel: 'Bank',
											                        items : [ 
											                        	new Ext.form.ComboBox({
														 						 id:'spmm_banknorek1',
																				 store: bankSearchStore,
																				 hiddenName:'data[SpmMaster][bank_norek]',
																				 fieldLabel:' ',
																				 displayField:'bank_norek',
																				 typeAhead: true,
																				 enableKeyEvents :true, 
																				 valueField:'bank_norek',
																				 triggerAction: 'all',
																				 loadingText: 'Searching...',
																				 minChars:0,
																				 pageSize:20,
																				 boxMinWidth: 80,
																				 boxMinHeight: 100,
																				 width:120,
																				 hideTrigger:false,
																				 forceSelection: false,
																				  tpl:bankComboTpl,
																				 allowBlank:false,
																				  itemSelector: 'div.search-bank',
																				 listeners: {
												 
																						 
																						select: function(thiscombo,record, index){
																							  
																							 Ext.getCmp('spmm_banknama1').setValue(record.get('bank_nama'));
																							 
																						}	
																					}
																				 
															
																				 }),
																		{	xtype:'textfield',
																			id:'spmm_banknama1',
																			fieldLabel: '',
																			name: 'data[SpmMaster][bank_nama]',
																			flex : 1,
																			readOnly:true 
																		}
											                        ]
								               					  },  {
											                        xtype : 'compositefield',
											                        anchor:'95%',
											                        msgTarget: 'side',
											                        fieldLabel: 'SPD',
											                        items : [ 
																			{	xtype:'textfield',
																			 	id:'spmm_spdm_no1',
																				fieldLabel: 'Nomor SPD',
																				name: 'data[SpmMaster][spdm_no]' 
																				 
																			 
																			},
																			{xtype:'displayfield',
																			value:'Tgl SPD'
																			},
																			{	xtype:'textfield',
																			 	id:'spmm_spdm_tgl1',
																				fieldLabel: 'Nomor SPD',
																				name: 'data[SpmMaster][spdm_tgl]' 
																				 
																			 
																			}]
								               					  },
																{	xtype:'textfield',
																 	id:'spmm_spdm_uraian1',
																	fieldLabel: 'Keperluan',
																	name: 'data[SpmMaster][spdm_bendanama]' 
																	 
																 
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
										           		 aspmBebanGrid = new spmBebanGrid({
																id: 'aspmBebanGrid',
																autoWidth:true,
																height: 100,
																border: true,
																frame:false,
																stripeRows: true,
																store: spmdBebanStore,
																
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
																	header: "Nama Rekening",
																	width: 150,
																	sortable: true,
																	editor:new Ext.form.TextField({enableKeyEvents :true }),
																	dataIndex: 'akun_nama'
																},   
																
																{
																	header: "Nilai",
																	width: 80,
																	sortable: true,
																	align:'right',
																	summaryType: 'sum',
																	dataIndex: 'spmd_nilai',
																	isCellEditable: true,
																	allowBlank: false,
																	editor:new Ext.form.NumberField({enableKeyEvents :true }),
																	renderer: Ext.util.Format.numberRenderer('0,000.00')
																
																}, 
																 {
																	header: "Keterangan",
																	width: 150,
																	sortable: true,
																	editor:new Ext.form.TextField({enableKeyEvents :true }),
																	dataIndex: 'spmd_ket'
																},   
																
																 {
																	header: "ID",
																	hidden:true,
																	width: 40,
																	sortable: true,
																	dataIndex: 'spmd_id' 
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
											layout:'form',
											border:false,
											columnWidth:'.28',
											items :[{
									 			xtype:'fieldset',
									            title: 'Potongan',
									          
									            collapsible: false,
									            autoHeight:true,
									         	 layout:'fit',
									         	 width:200,
									            labelWidth:100,
									            defaults: {anchor:'95%' },
									            defaultType: 'textfield',
									            items:
									           		 aspmPotGrid = new spmPotGrid({
															id: 'aspmPotGrid',
															width:200,
															height: 125,
															border: true,
															frame:false,
															stripeRows: true,
															store: spmdPotStore,
															
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
																dataIndex: 'spmd_nilai',
																isCellEditable: true,
																allowBlank: false,
																editor:new Ext.form.NumberField({enableKeyEvents :true }),
																renderer: Ext.util.Format.numberRenderer('0,000.00')
															
															}, {
																header: "Keterangan",
																width: 100,
																sortable: true,
																editor:new Ext.form.TextField({enableKeyEvents :true }),
																dataIndex: 'spmd_ket'
															},   
															 {
																header: "ID",
																hidden:true,
																width: 40,
																sortable: true,
																dataIndex: 'spmd_id' 
															} ]
														
														}) //end of grid  
											},
											{
									 			xtype:'fieldset',
									            title: 'Pajak',
									          
									            collapsible: false,
									          
									         	 layout:'fit',
									            labelWidth:100,
									            width:200,
									            defaults: {anchor:'95%' },
									            defaultType: 'textfield',
									            items:
									           		 aspmPajakGrid = new spmPajakGrid({
															id: 'aspmPajakGrid',
											 				width:200,
															height: 125,
															border: true,
															frame:false,
															stripeRows: true,
															 
															store: spmdPajakStore,
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
																dataIndex: 'spmd_nilai',
																isCellEditable: true,
																allowBlank: false,
																editor:new Ext.form.NumberField({enableKeyEvents :true }),
																renderer: Ext.util.Format.numberRenderer('0,000.00')
															
															}, {
																header: "Keterangan",
																width: 100,
																sortable: true,
																editor:new Ext.form.TextField({enableKeyEvents :true }),
																dataIndex: 'spmd_ket'
															},   
															 {
																header: "ID",
																hidden:true,
																width: 40,
																sortable: true,
																dataIndex: 'spmd_id' 
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
								id:'spm1-new',
							 
						 		iconCls: 'new',
						 		handler: function(){
						 			entryspmform.getForm().reset();
						 			spmdBebanStore.load({
						 				params: {
						 					spmm_id: 0
						 				}
						 			});
									spmdPajakStore.load({
						 				params: {
						 					spmm_id: 0
						 				}
						 			});
						 			spmdPotStore.load({
						 				params: {
						 					spmm_id: 0
						 				}
						 			});
						 			Ext.getCmp('spmm_tgl1').setValue(new Date());
							 
									Ext.getCmp('spmm_id1').setValue(0);
								 
						 		}
						 	},{
										text:'Print',
										id:'print_spm',
										tooltip:'Print SPM',
										iconCls:'printer',
										handler:function(){
											aid=Ext.getCmp('spmm_id1').getValue();
											aurl=HOST_PATH+'/rptspm/spm/'+aid;
											window.open(aurl,'_blank');
	
										}
								}, {
						 		xtype: 'spacer',
						 		flex: 1
						 	}, {
						 		text: 'Save',
						 		iconCls: 'save',
								id:'spm1-save',
						 
						 		handler: function(){
									 
						 			if (entryspmform.getForm().isValid()) {
						 				entryspmform.getForm().submit({
						 					url: urladdspmmaster,
						 					waitMsg: 'Saving data...',
						 					success: function(form, action){
						 						newid = action.result.newid;
						 						newno = action.result.newno;
						 						if (newid != '') {
						 							//alert(newid);
														// Ext.getCmp('form_no').setValue(newid);
														// alert(newid);
														Ext.getCmp('spmm_no1').setValue(newno);
														Ext.getCmp('spmm_id1').setValue(newid)
														Ext.getCmp('spmm_no1').setReadOnly(true);
														spmdBebanStore.setBaseParam('master', newid);
														spmdPotStore.setBaseParam('master', newid);
														spmdPajakStore.setBaseParam('master', newid);
														spmdBebanStore.save();
														spmdPotStore.save();
														spmdPajakStore.save();
														
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
									id:'spm1-cancel',
									 
									margins:'0',
									handler: function(){
										SpmMasterStore.reload();
										MyDesktop.getSingleModule('entryspm-win').closeWindow();
										
										
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
MyDesktop.SPMGridWindow = Ext.extend(Ext.app.Module, {
    id:'spmgrid-win',
   init : function(){
      this.launcher = {
            text: 'SPM',
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
                title:'Surat Perintah Membayar (SPM)',
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
					gridspm = new Ext.grid.GridPanel({
							id: 'gridspm',
						 
							 store: SpmMasterStore,
							trackMouseOver: true,
							disableSelection: false,
							loadMask: true,
							// grid columns
							columns: [ 
						  {
								header: "No",
								dataIndex: 'data[SpmMaster][spmm_no]',
								width: 100,
								sortable: true
							},
							{
								header: "Tanggal",
								dataIndex: 'data[SpmMaster][spmm_tgl]',
								width: 150,
								sortable: true,
								 renderer: function(date) { return date.format("d/m/Y"); }
						
							},
							 {
								header: "No SPP",
								dataIndex: 'data[SpmMaster][sppm_no]',
								width: 150,
								sortable: true
							},
							 {
								header: "SKPD",
								dataIndex: 'data[SpmMaster][un_nama]',
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
											if (pv_spm >= 1) {
												Ext.getCmp('editspmbutt').enable();
												Ext.getCmp('applyspmbutt').enable();
												
											}
										 	if (pv_spm>=2)
											 Ext.getCmp('delspmbutt').enable();
										 }
										else {
										 	Ext.getCmp('delspmbutt').disable();
										 	Ext.getCmp('editspmbutt').disable();
											Ext.getCmp('applyspmbutt').disable();
										 	 
										}
									}
								}
							}),
							bbar: new Ext.PagingToolbar({
								pageSize: 20,
								 store: SpmMasterStore,
								displayInfo: true,
								displayMsg: 'Displaying contents {0} - {1} of {2}',
								emptyMsg: "No Content to display",
								plugins: new Ext.ux.SlidingPager(),
								listeners :{
										'change' : function(){
										 SpmMasterStore.baseParams={start:'start',limit:'limit',search:Ext.getCmp("searchSPMTxt").getValue()};
			    
										}
									}
									 
							}),
							tbar: [{
								text: 'SPM',
								iconCls: 'spm',
								ref: '../spmButton',
								
								menu: {
									xtype: 'menu',
									plain: true,
									items: [{
										text: 'Tambah',
										iconCls: 'add',
										handler: function(){
											 
											 MyDesktop.getSingleModule('entryspm-win').createWindow();
											 spmdBebanStore.load({params:{spmm_id:mid}});	
										 	 spmdPajakStore.load({params:{spmm_id:mid}});	
											 spmdPotStore.load({params:{spmm_id:mid}});			 
										}
									} , {
										id: 'editspmbutt',
										text: 'Ubah',
										iconCls: 'edit',
										disabled: true,
										handler: function(){
											 mid=gridspm.getSelectionModel().getSelected().get("SpmMasterList.sppm_id");
			 
			 
										 	 spmdBebanStore.load({params:{spmm_id:mid}});	
										 	 spmdPajakStore.load({params:{spmm_id:mid}});	
											 spmdPotStore.load({params:{spmm_id:mid}});	
											 
											 MyDesktop.getSingleModule('entryspm-win').createWindow();
											 Ext.getCmp("entryspmform").getForm().loadRecord(gridspm.getSelectionModel().getSelected());
										 
								
										}
									},{
											id: 'delspmbutt',
											text: 'Hapus',
											iconCls: 'delete',
											disabled: true,
											handler: function(){
												/*
												  aid=gridspm.getSelectionModel().getSelected().get('SpmMasterList.spmm_id');
												
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
													        url:urldelspmmaster,
													        params : {id :aid},
															method: 'GET',
															success: function ( result, request ) { 
																	Ext.MessageBox.hide();
						
																	var jsonData = Ext.util.JSON.decode(result.responseText);
																 
																	Ext.MessageBox.alert('Information', jsonData.msg); 
																	SpmMasterStore.reload();
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
									id:'searchSPMTxt',
								    text:'*',
							        emptyText:'*',
							        selectOnFocus:true,
									listeners: {
						              specialkey: function(f,e){
						                if (e.getKey() == e.ENTER) {
								                SpmMasterStore.load({params: {
													start: 0,
													limit: 20,
													 search:Ext.getCmp("searchSPMTxt").getValue()
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
								  SpmMasterStore.load({params: {
									start: 0,
									limit: 20,
									 search:Ext.getCmp("searchSPMTxt").getValue()
									 }})
						       
					        }
							}]
						
						})//end of grid
					
				
					
            });
        }
		 
        win2.show();
		SpmMasterStore.load({params:{start:0, limit:20, search:'*'}});
	 
	 
		 
		gridspm.on('rowdblclick',function(sm, rowindex, eventobject){ 
			 mid=gridspm.getSelectionModel().getSelected().get("SpmMasterList.sppm_id");
			 
			 
			 	 spmdBebanStore.load({params:{spmm_id:mid}});	
			 	 spmdPajakStore.load({params:{spmm_id:mid}});	
				 spmdPotStore.load({params:{spmm_id:mid}});	
				 
				 MyDesktop.getSingleModule('entryspm-win').createWindow();
				 Ext.getCmp("entryspmform").getForm().loadRecord(gridspm.getSelectionModel().getSelected());
			 
									 
			
		});
		 
		 
	}
}); 
