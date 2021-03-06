var urlgetdpadetailbyno=HOST_PATH+'/dpa/readdetailbyno'; 
function proc_spp2a(){
	
}
function proc_spp2b(){
	
}
var dpa_idx=0;
var max_dpa_idx=0;
var detailDPA1Store = new Ext.data.Store({
    proxy: new Ext.data.HttpProxy({
        url: urlgetdpadetailbyno
    }),
    reader: new Ext.data.JsonReader({
        root: 'data',
        totalProperty: 'total',
        id: 'dpad_id',
    fields : [
        	{name: 'dpad_id'},
	{name: 'dpam_no'},
	{name: 'akun_kode'},
	{name: 'akun_nama'},
	{name: 'dpad_nilai'} 
	 
       
        
    ]
    }),
    listeners : {
    	load : function (thistore,recordlist,object){
    	 
    		for (i=0;i<recordlist.length;i++){
    		abc = new SppGU2DetailStore.recordType({
					sppd_id: 0,
					sppm_id: '',
					dpam_no:recordlist[i].get('dpam_no'),
					akun_kode:recordlist[i].get('akun_kode'),
					akun_nama:recordlist[i].get('akun_nama'),
					 
					sppd_nilai:0,
					sppd_nobelanja:''
			
			});
		 
			SppGU2DetailStore.add(abc);
    		}
    		Ext.MessageBox.hide();
    		dpa_idx=dpa_idx+1;
    		if (max_dpa_idx>dpa_idx){
    			adpam_no=SppGUDetailStore.getAt(dpa_idx).get("dpam_no");
    			detailDPA1Store.load({
		 				params: {
		 					dpam_no: adpam_no
		 				}
		 			});
    		} 
    	}
    }
    
});
var sppGU2_proxy = new Ext.data.HttpProxy({
    api: {
        read : HOST_PATH+'/spp/readdetail_2',
        create : HOST_PATH+'/spp/createdetail_2',
        update:  HOST_PATH+'/spp/updatedetail_2',
        destroy:  HOST_PATH+'/spp/destroydetail_2'
    },
	listeners: {
		beforewrite : function(proxy, action) {
			App.setAlert(App.STATUS_NOTICE,"Saving : "+action+": Menyimpan data...");
			},
		 write : function(proxy, action, result, res, rs) {
			App.setAlert(true, "Saving  :"+action+":"+res.message);
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
var sppGU2_reader = new Ext.data.JsonReader({
	totalProperty: 'total',
    successProperty: 'success',
    idProperty: 'sppd_id',
    root: 'data',
    messageProperty: 'message'  // <-- New "messageProperty" meta-data
}, [ 
	{name: 'sppd_id'},
	{name: 'dpam_no'},
	{name: 'spdm_id'},
	{name: 'akun_kode'},
	{name: 'akun_nama'},
	
	 
	 
	{name: 'sppd_nilai',type:'float'},
	{name: 'sppd_nobelanja',type:'string'} 
	 
]); 

// The new DataWriter component.
var sppGU2_writer = new Ext.data.JsonWriter({
    encode: true,
    writeAllFields: true,
	listful:true
});

// Typical Store collecting the Proxy, Reader and Writer together.
var SppGU2DetailStore = new Ext.data.Store({
    id: 'SppGU2DetailStore',
    proxy: sppGU2_proxy,
    reader: sppGU2_reader,
    writer: sppGU2_writer,  // <-- plug a DataWriter into the store just as you would a Reader
    autoSave: false, // <-- false would delay executing create, update, destroy requests until specifically told to do so with some [save] buton.
	autoLoad: true  
});
var SppGU2DetailGrid = Ext.extend( Ext.grid.EditorGridPanel, {
    iconCls: 'icon-form',
    frame:false,
	border:false,
	loadMask: true,
//	 plugins:[ new Ext.ux.grid.GridSummary({position:'bottom',height:0})],
	sm: new Ext.grid.RowSelectionModel({	moveEditorOnEnter:false,
								singleSelect: true }),
    initComponent : function() {
 
	this.relayEvents(this.store, ['destroy', 'save', 'update']); 
//	this.tbar = this.buildTopToolbar(); 
    SppGU2DetailGrid.superclass.initComponent.call(this);
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
				sppd_id: 0,
				sppm_id: '',
				dpam_no:'',
				akun_kode:'',
				akun_nama:'',
				sppd_nilai:0,
				sppd_nobelanja:0  
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
			proc_spp2b(o);
		}
		 
	}
});
 
var masterSPDStore2 = new Ext.data.JsonStore({
   
	remoteSort: false,
	root: 'spdmasters',
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
        url:urlgetspdsingle
    }),
	listeners: {
		load: function(a, b, c){
		 
			 if (b.length>0){
			 	arecord=b[0];
			 	 
			 	Ext.getCmp('sppm_benda2').setValue(arecord.get('spdm_benda'));
			 	Ext.getCmp('sppm_bendanama2').setValue(arecord.get('spdm_bendanama'));
			  
			 	Ext.getCmp('sppm_total2').setValue(arecord.get('spdm_total'));
			  
			 	Ext.getCmp('sppm_sisa2').setValue(arecord.get('spdm_sisa'));
			   
		 		detailSPD2Store.load({
		 				params: {
		 					spdm_id: arecord.get('spdm_id')
		 				}
		 			});
			 }
			 else {
			  
			 	Ext.MessageBox.hide();
			 }
		}
	}

});
//load kegiata dari SPD
var detailSPD2Store = new Ext.data.Store({
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
    		SppGUDetailStore.removeAll();
    		for (i=0;i<recordlist.length;i++){
    		abc = new SppGUDetailStore.recordType({
					sppd_id: 0,
					sppm_id: '',
					dpam_no:recordlist[i].get('dpam_no'),
					keg_kode:recordlist[i].get('keg_kode'),
					keg_nama:recordlist[i].get('keg_nama'),
					sppd_angg:recordlist[i].get('spdd_angg'),
					sppd_akum:recordlist[i].get('spdd_akum'),
					sppd_nilai:recordlist[i].get('spdd_nilai'),
					sppd_sisa:recordlist[i].get('spdd_sisa')
			
			});
		 
			SppGUDetailStore.add(abc);
    		}
    		Ext.MessageBox.hide();
    		max_dpa_idx=recordlist.length;
    		dpa_idx=0;
    		if (max_dpa_idx>0){
    			adpam_no=SppGUDetailStore.getAt(dpa_idx).get("dpam_no");
    			detailDPA1Store.load({
		 				params: {
		 					dpam_no: adpam_no
		 				}
		 			});
    		}
    	}
    }
    
});
var sppGU_proxy = new Ext.data.HttpProxy({
    api: {
        read : HOST_PATH+'/spp/readdetail_1',
        create : HOST_PATH+'/spp/createdetail_1',
        update:  HOST_PATH+'/spp/updatedetail_1',
        destroy:  HOST_PATH+'/spp/destroydetail_1'
    },
	listeners: {
		beforewrite : function(proxy, action) {
			App.setAlert(App.STATUS_NOTICE,"Saving : "+action+": Menyimpan data...");
			},
		 write : function(proxy, action, result, res, rs) {
			App.setAlert(true, "Saving  :"+action+":"+res.message);
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
var sppGU_reader = new Ext.data.JsonReader({
	totalProperty: 'total',
    successProperty: 'success',
    idProperty: 'sppd_id',
    root: 'data',
    messageProperty: 'message'  // <-- New "messageProperty" meta-data
}, [ 
	{name: 'sppd_id'},
	{name: 'dpam_no'},
	{name: 'spdm_id'},
	{name: 'keg_kode'},
	{name: 'keg_nama'},
	
	 
	{name: 'sppd_angg',type:'float'},
	{name: 'sppd_akum',type:'float'},
	{name: 'sppd_nilai',type:'float'},
	{name: 'sppd_sisa',type:'float'} 
	 
]); 

// The new DataWriter component.
var sppGU_writer = new Ext.data.JsonWriter({
    encode: true,
    writeAllFields: true,
	listful:true
});

// Typical Store collecting the Proxy, Reader and Writer together.
var SppGUDetailStore = new Ext.data.Store({
    id: 'SppGUDetailStore',
    proxy: sppGU_proxy,
    reader: sppGU_reader,
    writer: sppGU_writer,  // <-- plug a DataWriter into the store just as you would a Reader
    autoSave: false, // <-- false would delay executing create, update, destroy requests until specifically told to do so with some [save] buton.
	autoLoad: true  
});
var SppGUDetailGrid = Ext.extend( Ext.grid.EditorGridPanel, {
    iconCls: 'icon-form',
    frame:false,
	border:false,
	loadMask: true,
//	 plugins:[ new Ext.ux.grid.GridSummary({position:'bottom',height:0})],
	sm: new Ext.grid.RowSelectionModel({	moveEditorOnEnter:false,
								singleSelect: true }),
    initComponent : function() {
 
	this.relayEvents(this.store, ['destroy', 'save', 'update']); 
	 
    SppGUDetailGrid.superclass.initComponent.call(this);
    },
 
   
	listeners : {
		afteredit: function (o){
			//alert(o.field+":"+o.value+":"+o.originalValue+":"+o.row+":"+o.column );			
			proc_spp2a(o);
		}
		 
	}
});
 
var SppMasterJsonReader2 =  new Ext.data.JsonReader({
 
	remoteSort: false,
	root: 'sppmasters',
	totalProperty: 'total',
    idProperty: 'SppMasterList.sppm_id',
	fields: [
	     	 
		{name:'SppMasterList.sppm_id'},
	 	{name:'SppMasterList.sppm_tipe'},
		{name:'data[SppMaster][sppm_id]',mapping:'SppMasterList.sppm_id'},
		{name:'data[SppMaster][sppm_no]',mapping:'SppMasterList.sppm_no'},
		{name:'data[SppMaster][sppm_tipe]',mapping:'SppMasterList.sppm_tipe'},
		{name:'data[SppMaster][sppm_tgl]',mapping:'SppMasterList.sppm_tgl', type: 'date', dateFormat: 'Y-m-d'},
		{name:'data[SppMaster][un_id]',mapping:'SppMasterList.un_id'},
		{name:'data[SppMaster][un_kode]',mapping:'SppMasterList.un_kode'},
		{name:'data[SppMaster][un_nama]',mapping:'SppMasterList.un_nama'},
		{name:'data[SppMaster][spdm_no]',mapping:'SppMasterList.spdm_no'},
		{name:'data[SppMaster][sppm_sisaspd]',mapping:'SppMasterList.sppm_sisaspd'},
		{name:'data[SppMaster][sppm_total]',mapping:'SppMasterList.sppm_total'},
		
		{name:'data[SppMaster][sppm_benda]',mapping:'SppMasterList.sppm_benda'},
		{name:'data[SppMaster][sppm_bendanama]',mapping:'SppMasterList.sppm_bendanama'},
		{name:'data[SppMaster][bank_norek]',mapping:'SppMasterList.bank_norek'},
		{name:'data[SppMaster][bank_nama]',mapping:'SppMasterList.bank_nama'},
		{name:'data[SppMaster][bank_cabang]',mapping:'SppMasterList.bank_cabang'} 
	]
	 
	 
});

var SppMasterStore2 = new Ext.data.GroupingStore({
  	reader:SppMasterJsonReader2,
	groupField:'data[SppMaster][un_nama]',
	 remoteGroup:false,
	  groupOnSort: false,
	 
	proxy: new Ext.data.HttpProxy({
        url: urlspp
    })
});


 
 
MyDesktop.EntrySPPGUForm = Ext.extend(Ext.app.Module, {
    id:'entrySPPGU-win',
	title:'SPP-GU',
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
                title:'SPP-GU',
                width:600,
                height:500,
                iconCls: 'icon-form',
                animCollapse:false,
                constrainHeader:true,
				stripeRows: true,
				border:false,
               layout:'fit',
                items :
					[entrySPPGUform = new Ext.FormPanel({
						id:'entrySPPGUform',
				      	 layout: 'border',
						defaults: {
							split: true 
						},
						
				      	frame:true,
				       	autoScroll :true,
				        border:false,
				        bodyStyle:'padding:5px 5px 0',
				      	 
						 autoWidth:true,
						 height:550,
						items: [
								{	 
									layout:'fit',
									region:'north',
									bodyStyle:'padding:5px 5px 0 0',
								 
									 
									defaults: {
										
										border: false,
										align:'left'
									},       
									 	height:170,
									items: [{
											 defaults:{ layout:'form',anchor:'95%',  autoHeight:false},  
											layout: 'form',
											border: false, 	
										 	
										 	labelWidth:150,
											items:[  
											{	 xtype:'hidden',
												 name: 'data[SppMaster][sppm_id]',
												 
												id:'sppm_id2' 
												 
											},{	 xtype:'hidden',
												 name: 'data[SppMaster][sppm_tipe]',
												 
												 value:'GU'
												 
											},
											 {
						                        xtype : 'compositefield',
						                       anchor:'95%',
						                        msgTarget: 'side',
						                        fieldLabel: 'No Surat',
						                        items : [ 
													{	 xtype:'textfield',
														fieldLabel: 'No Surat',
														name: 'data[SppMaster][sppm_no]',
														maxLength:20,
														id:'sppm_no2',
														flex:'1', 
														allowBlank:false 
														 
													},
													 
													{
							                               xtype: 'displayfield',
							                               value: 'Tanggal'
							                           },
													{	 xtype:'datefield',
														fieldLabel: 'Tanggal',
														id:'sppm_tgl2',
														name: 'data[SppMaster][sppm_tgl]',
														maxLength:50, 
														format:'Y-m-d',
														value:new Date(),
														 
														 
														allowBlank:false
													}
													]
											 },
											{
						                        xtype : 'compositefield',
						                       anchor:'95%',
						                        msgTarget: 'side',
						                        fieldLabel: 'SKPD',
						                        items : [ 
													new Ext.form.ComboBox({
									 						 id:'spp_un_id2',
															 store: skpdSearchStore,
															 hiddenName:'data[SppMaster][un_id]',
															 fieldLabel:' ',
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
																		  
																		 Ext.getCmp('spp_un_nama2').setValue(record.get('un_nama'));
																	 
																		 combo=Ext.getCmp('spp_spd_no2');
																		 
																	     combo.store.baseParams={un_id:record.get('un_id')};
									    	  							 combo.store.removeAll();
											 							 combo.lastQuery=null;
											 							  
																	}	
																}
															 
										
															 }),
													{	xtype:'textfield',
														id:'spp_un_nama2',
														fieldLabel: '',
														name: 'data[SppMaster][un_nama]',
														flex : 1,
														readOnly:true 
													}
													]
											}, //end of composite
											new Ext.form.ComboBox({
						 						 id:'spp_spd_no2',
												 store: spdSearchStore,
												 hiddenName:'data[SppMaster][spdm_no]',
												 fieldLabel:'No SPD',
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
															 masterSPDStore2.load({
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
												 
							
												 }),
												 {
						                        xtype : 'compositefield',
						                        anchor:'95%',
						                        msgTarget: 'side',
						                        fieldLabel: 'Sisa Dana SPD',
						                        items : [ 
													 {
													 	xtype:'numberfield',
									                    fieldLabel: 'Sisa Dana SPD',
									                    name: 'data[SppMaster][sppm_sisaspd]',
									                    id:'sppm_sisa2',
									                    value: '0',
									                    width:120,
									                    align:'right'
									                },
									                 
													{
							                               xtype: 'displayfield',
							                               value: 'Dana Diminta'
							                           },
									                {
													 	xtype:'numberfield',
									                    fieldLabel: 'Dana Diminta',
									                    name: 'data[SppMaster][sppm_total]',
									                    id:'sppm_total2',
									                    value: '0',
									                    flex:1,
									                    anchor:'95%',
									                    align:'right'
									                }
									                ]
												 },
								                {
						                        xtype : 'compositefield',
						                        anchor:'95%',
						                        msgTarget: 'side',
						                        fieldLabel: 'Bendahara Pengeluaran',
						                        items : [ 
								              		  new Ext.form.ComboBox({
											 						 id:'sppm_benda2',
																	 store: bendaSearchStore,
																	 hiddenName:'data[SppMaster][sppm_benda]',
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
																				  
																				 Ext.getCmp('sppm_bendanama2').setValue(record.get('pn_nama'));
																				 
																			}	
																		}
																	 
												
																	 }),
															{	xtype:'textfield',
																id:'sppm_bendanama2',
																fieldLabel: '',
																name: 'data[SppMaster][sppm_bendanama]',
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
									 						 id:'sppm_banknorek2',
															 store: bankSearchStore,
															 hiddenName:'data[SppMaster][bank_norek]',
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
																		  
																		 Ext.getCmp('sppm_banknama2').setValue(record.get('bank_nama'));
																		 
																	}	
																}
															 
										
															 }),
													{	xtype:'textfield',
														id:'sppm_banknama2',
														fieldLabel: '',
														name: 'data[SppMaster][bank_nama]',
														flex : 1,
														readOnly:true 
													}
						                        ]
								                 }
								                
										]
									} 
									]
								}//end  of center 
								,
								{
									region:'center',
								 	height:400,
									layout:'fit',
									items:tabPanelSPD= new Ext.TabPanel({
													 
													id:'tabPanelSPPGU',
								                    border: false, // already wrapped so don't add another border
								                    activeTab: 0, // second tab initially active
								                    tabPosition: 'top',
								                    items: [{
															id:'tabspp2a',
									                        layout:'fit',
									                        title: 'Kegiatan',
									                        frame:false,
									                        items :
											 						sppGUDetailGrid = new SppGUDetailGrid({
																	id: 'sppGUDetailGrid',
																	autoWidth:true,
																	 
																	border: true,
																	frame:true,
																	stripeRows: true,
																	store: SppGUDetailStore,
																	
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
																		dataIndex: 'sppd_angg',
																		 renderer: Ext.util.Format.numberRenderer('0,000.00')
																		 
																	}, {
																		header: "Akumulasi",
																		width: 100,
																		sortable: true,
																		align:'right',
																		summaryType: 'sum',
																		dataIndex: 'sppd_akum',
																	 
																		renderer: Ext.util.Format.numberRenderer('0,000.00')
																	
																	},
																	{
																		header: "Nilai SPD",
																		width: 100,
																		sortable: true,
																		align:'right',
																		summaryType: 'sum',
																		dataIndex: 'sppd_nilai',
																		isCellEditable: true,
																		allowBlank: false,
																	 
																		renderer: Ext.util.Format.numberRenderer('0,000.00')
																	
																	},{
																		header: "Sisa",
																		width: 100,
																		sortable: true,
																		align:'right',
																		summaryType: 'sum',
																		dataIndex: 'sppd_sisa',
																	 
																		renderer: Ext.util.Format.numberRenderer('0,000.00')
																	
																	},
																	 {
																		header: "ID",
																		hidden:true,
																		width: 40,
																		sortable: true,
																		dataIndex: 'sppd_id',
																		summaryType: 'count'
																	} ]
																
																}) //end of grid  
														 },
														 {
															id:'tabspp2b',
									                        layout:'fit',
									                        title: 'Rincian',
									                        frame:false,
									                        items :
											 						sppGU2DetailGrid = new SppGU2DetailGrid({
																	id: 'sppGU2DetailGrid',
																	autoWidth:true,
																	 
																	border: true,
																	frame:true,
																	stripeRows: true,
																	store: SppGU2DetailStore,
																	
																	columns: [{
																		header: "No DPA",
																		dataIndex: 'dpam_no',
																		sortable: true
																		 
																	}, {
																		header: "Kode Rekening",
																		width: 100,
																		sortable: true,
																		dataIndex: 'akun_kode'
																	}, {
																		header: "Nama",
																		width: 150,
																		sortable: true,
																		dataIndex: 'akun_nama'
																	},   
																	{
																		header: "Nilai",
																		width: 100,
																		sortable: true,
																		align:'right',
																		summaryType: 'sum',
																		dataIndex: 'sppd_nilai',
																		isCellEditable: true,
																		allowBlank: false,
																	 	editor:new Ext.form.NumberField({enableKeyEvents :true }),
																		renderer: Ext.util.Format.numberRenderer('0,000.00')
																	
																	}, {
																		header: "No Belanja",
																		width: 150,
																		sortable: true,
																		align:'right',
																	 
																		dataIndex: 'sppd_nobelanja',
																		isCellEditable: true,
																		allowBlank: false,
																	 	editor:new Ext.form.TextField({enableKeyEvents :true }),
																		renderer: Ext.util.Format.numberRenderer('0,000.00')
																	
																	}, 
																	 {
																		header: "ID",
																		hidden:true,
																		width: 40,
																		sortable: true,
																		dataIndex: 'sppd_id',
																		summaryType: 'count'
																	} ]
																
																}) //end of grid  
														 }
														 ]
												})
								}
								 
							 ]
							  
				         ,
						 buttons: {
						 	layout: 'hbox',
							 defaults: {margins:'0 5 0 0'},
						 	items: [{
						 		text: 'Create New',
								id:'spp2-new',
								 
						 		iconCls: 'new',
						 		handler: function(){
						 			entrySPPGUform.getForm().reset();
						 		 	SppGUDetailStore.load({
						 				params: {
						 					sppm_id: 0
						 				}
						 			});
						 		}
						 	},{
										text:'Print',
										id:'print_sppgu',
										tooltip:'Print   ',
										iconCls:'printer',
										handler:function(){
											aid=Ext.getCmp('sppm_id2').getValue();
											aurl=HOST_PATH+'/rptspp/sppgu/'+aid;
											window.open(aurl,'_blank');
	
										}
								}, {
						 		xtype: 'spacer',
						 		flex: 1
						 	}, {
						 		text: 'Save',
						 		iconCls: 'save',
								id:'spp2-save',
								 
						 		handler: function(){
									 
						 			if (entrySPPGUform.getForm().isValid()) {
						 				entrySPPGUform.getForm().submit({
						 					url: urladdspp,
						 					waitMsg: 'Saving data...',
						 					success: function(form, action){
						 						newid = action.result.newid;
						 						newno = action.result.newno;
						 						if (newid != '') {
						 							//alert(newid);
														// Ext.getCmp('form_no').setValue(newid);
														// alert(newid);
														Ext.getCmp('sppm_no2').setValue(newno);
														Ext.getCmp('sppm_id2').setValue(newid)
														Ext.getCmp('sppm_no2').setReadOnly(true);
														 SppGUDetailStore.setBaseParam('master', newid);
														SppGUDetailStore.save();
														 SppGU2DetailStore.setBaseParam('master', newid);
														SppGU2DetailStore.save();
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
									id:'spp2-cancel',
									 
									margins:'0',
									handler: function(){
										SppMasterStore.reload();
										MyDesktop.getSingleModule('entrySPPGU-win').closeWindow();
										
										
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