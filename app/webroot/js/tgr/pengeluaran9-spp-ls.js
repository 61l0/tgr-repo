 
function proc_spp4a(){
	
}
function proc_spp4b(){
	
}
var dpa_idx3=0;
var max_dpa_idx3=0;
var detailDPA3Store = new Ext.data.Store({
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
    		abc = new SppLS2DetailStore.recordType({
					sppd_id: 0,
					sppm_id: '',
					dpam_no:recordlist[i].get('dpam_no'),
					akun_kode:recordlist[i].get('akun_kode'),
					akun_nama:recordlist[i].get('akun_nama'),
					 
					sppd_nilai:0,
					sppd_nobelanja:''
			
			});
		 
			SppLS2DetailStore.add(abc);
    		}
    		Ext.MessageBox.hide();
    		dpa_idx3=dpa_idx3+1;
    		if (max_dpa_idx3>dpa_idx3){
    			adpam_no=SppLSDetailStore.getAt(dpa_idx3).get("dpam_no");
    			detailDPA3Store.load({
		 				params: {
		 					dpam_no: adpam_no
		 				}
		 			});
    		} 
    	}
    }
    
});
var sppLS2_proxy = new Ext.data.HttpProxy({
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
var sppLS2_reader = new Ext.data.JsonReader({
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
var sppLS2_writer = new Ext.data.JsonWriter({
    encode: true,
    writeAllFields: true,
	listful:true
});

// Typical Store collecting the Proxy, Reader and Writer together.
var SppLS2DetailStore = new Ext.data.Store({
    id: 'SppLS2DetailStore',
    proxy: sppLS2_proxy,
    reader: sppLS2_reader,
    writer: sppLS2_writer,  // <-- plug a DataWriter into the store just as you would a Reader
    autoSave: false, // <-- false would delay executing create, update, destroy requests until specifically told to do so with some [save] buton.
	autoLoad: true  
});
var SppTU2DetailGrid = Ext.extend( Ext.grid.EditorGridPanel, {
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
    SppTU2DetailGrid.superclass.initComponent.call(this);
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
			proc_spp4b(o);
		}
		 
	}
});
 
var masterSPDStore4 = new Ext.data.JsonStore({
   
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
			 	 
			 	Ext.getCmp('sppm_benda4').setValue(arecord.get('spdm_benda'));
			 	Ext.getCmp('sppm_bendanama4').setValue(arecord.get('spdm_bendanama'));
			  
			 	Ext.getCmp('sppm_total4').setValue(arecord.get('spdm_total'));
			  
			 	Ext.getCmp('sppm_sisa4').setValue(arecord.get('spdm_sisa'));
			   
		 		detailSPD4Store.load({
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
var detailSPD4Store = new Ext.data.Store({
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
    		SppLSDetailStore.removeAll();
    		for (i=0;i<recordlist.length;i++){
    		abc = new SppLSDetailStore.recordType({
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
		 
			SppLSDetailStore.add(abc);
    		}
    		Ext.MessageBox.hide();
    		max_dpa_idx3=recordlist.length;
    		dpa_idx3=0;
    		if (max_dpa_idx3>0){
    			adpam_no=SppLSDetailStore.getAt(dpa_idx3).get("dpam_no");
    			detailDPA3Store.load({
		 				params: {
		 					dpam_no: adpam_no
		 				}
		 			});
    		}
    	}
    }
    
});
var sppLS_proxy = new Ext.data.HttpProxy({
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
var sppLS_reader = new Ext.data.JsonReader({
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
var sppLS_writer = new Ext.data.JsonWriter({
    encode: true,
    writeAllFields: true,
	listful:true
});

// Typical Store collecting the Proxy, Reader and Writer together.
var SppLSDetailStore = new Ext.data.Store({
    id: 'SppLSDetailStore',
    proxy: sppLS_proxy,
    reader: sppLS_reader,
    writer: sppLS_writer,  // <-- plug a DataWriter into the store just as you would a Reader
    autoSave: false, // <-- false would delay executing create, update, destroy requests until specifically told to do so with some [save] buton.
	autoLoad: true  
});
var SppLSDetailGrid = Ext.extend( Ext.grid.EditorGridPanel, {
    iconCls: 'icon-form',
    frame:false,
	border:false,
	loadMask: true,
//	 plugins:[ new Ext.ux.grid.GridSummary({position:'bottom',height:0})],
	sm: new Ext.grid.RowSelectionModel({	moveEditorOnEnter:false,
								singleSelect: true }),
    initComponent : function() {
 
	this.relayEvents(this.store, ['destroy', 'save', 'update']); 
	 
    SppLSDetailGrid.superclass.initComponent.call(this);
    },
 
   
	listeners : {
		afteredit: function (o){
			//alert(o.field+":"+o.value+":"+o.originalValue+":"+o.row+":"+o.column );			
			proc_spp4a(o);
		}
		 
	}
});
 
var SppMasterJsonReader4 =  new Ext.data.JsonReader({
 
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
		{name:'data[SppMaster][bank_cabang]',mapping:'SppMasterList.bank_cabang'},
		{name:'data[SppMaster][sppm_namaper]',mapping:'SppMasterList.sppm_namaper'},
		{name:'data[SppMaster][sppm_bentukper]',mapping:'SppMasterList.sppm_bentukper'},
		{name:'data[SppMaster][sppm_pimpper]',mapping:'SppMasterList.sppm_pimpper'},
		{name:'data[SppMaster][sppm_alamatper]',mapping:'SppMasterList.sppm_alamatper'},
		{name:'data[SppMaster][sppm_bankper]',mapping:'SppMasterList.sppm_bankper'},
		{name:'data[SppMaster][sppm_norekper]',mapping:'SppMasterList.sppm_norekper'},
		{name:'data[SppMaster][sppm_keglanjut]',mapping:'SppMasterList.sppm_keglanjut'},
		{name:'data[SppMaster][sppm_nokontrakper]',mapping:'SppMasterList.sppm_nokontrakper'},
		{name:'data[SppMaster][sppm_waktulaksana]',mapping:'SppMasterList.sppm_waktulaksana'},
		{name:'data[SppMaster][sppm_deskripsikerja]',mapping:'SppMasterList.sppm_deskripsikerja'} 
	]
	 
	 
});

var SppMasterStore4 = new Ext.data.GroupingStore({
  	reader:SppMasterJsonReader4,
	groupField:'data[SppMaster][un_nama]',
	 remoteGroup:false,
	  groupOnSort: false,
	 
	proxy: new Ext.data.HttpProxy({
        url: urlspp
    })
});


 
 
MyDesktop.EntrySPPLSForm = Ext.extend(Ext.app.Module, {
    id:'entrySPPLS-win',
	title:'SPP-LS',
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
                title:'SPP-LS',
                width:700,
                height:500,
                iconCls: 'icon-form',
                animCollapse:false,
                constrainHeader:true,
				stripeRows: true,
				border:false,
               layout:'fit',
                items :
					[entrySPPLSform = new Ext.FormPanel({
						id:'entrySPPLSform',
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
												 
												id:'sppm_id4' 
												 
											},{	 xtype:'hidden',
												 name: 'data[SppMaster][sppm_tipe]',
												 
												 value:'LS'
												 
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
														id:'sppm_no4',
														flex:'1', 
														allowBlank:false 
														 
													},
													 
													{
							                               xtype: 'displayfield',
							                               value: 'Tanggal'
							                           },
													{	 xtype:'datefield',
														fieldLabel: 'Tanggal',
														id:'sppm_tgl4',
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
									 						 id:'spp_un_id4',
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
																		  
																		 Ext.getCmp('spp_un_nama4').setValue(record.get('un_nama'));
																	 
																		 combo=Ext.getCmp('spp_spd_no4');
																		 
																	     combo.store.baseParams={un_id:record.get('un_id')};
									    	  							 combo.store.removeAll();
											 							 combo.lastQuery=null;
											 							  
																	}	
																}
															 
										
															 }),
													{	xtype:'textfield',
														id:'spp_un_nama4',
														fieldLabel: '',
														name: 'data[SppMaster][un_nama]',
														flex : 1,
														readOnly:true 
													}
													]
											}, //end of composite
											new Ext.form.ComboBox({
						 						 id:'spp_spd_no4',
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
															 masterSPDStore4.load({
																 				params: {
																 					query: record.get('spdm_no')
																 				}
																 			});
																 		 Ext.MessageBox.show({
																			msg: 'Loading Data..',
																			progressText: 'Process...',
																			width: 400,
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
									                    id:'sppm_sisa4',
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
									                    id:'sppm_total4',
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
											 						 id:'sppm_benda4',
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
																				  
																				 Ext.getCmp('sppm_bendanama4').setValue(record.get('pn_nama'));
																				 
																			}	
																		}
																	 
												
																	 }),
															{	xtype:'textfield',
																id:'sppm_bendanama4',
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
									 						 id:'sppm_banknorek4',
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
																		  
																		 Ext.getCmp('sppm_banknama4').setValue(record.get('bank_nama'));
																		 
																	}	
																}
															 
										
															 }),
													{	xtype:'textfield',
														id:'sppm_banknama4',
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
									
									items:tabPanelSPPLS= new Ext.TabPanel({
													 
													id:'tabPanelSPPLS',
								                    border: false, // already wrapped so don't add another border
								                    activeTab: 0, // second tab initially active
								                    
								                    tabPosition: 'top',
								                    items: [{
															id:'tabspp4c',
									                        layout:'form',
									                        title: 'Rincian Kegiatan Dana',
									                        frame:true, 
									                        defaults : {anchor:'95%'},
									                        padding:'10px',
									                        labelWidth:120,
									                        items :[ {
											                        xtype : 'compositefield',
											                        anchor:'95%',
											                        msgTarget: 'side',
											                        fieldLabel: 'Nama Perusahaan',
											                        items : [ {	 xtype:'textfield',
																								fieldLabel: 'Nama Perusahaan',
																			name: 'data[SppMaster][sppm_namaper]',
																			maxLength:100,
																			 
																			flex:1, 
																			allowBlank:false 
																			 
																		},{
																			xtype:'displayfield',
																			 value: 'Bentuk'
																		},
																		{	 xtype:'textfield',
																			fieldLabel: 'Bentuk Perusahaan',
																			name: 'data[SppMaster][sppm_bentukper]',
																			maxLength:100,
																			width:150,
																			
																			allowBlank:false 
																			 
																		}
									                        			]
									                        		},
																		{	 xtype:'textfield',
																			fieldLabel: 'Alamat Perusahaan',
																			name: 'data[SppMaster][sppm_alamatper]',
																			maxLength:250,
																			 
																			flex:'1', 
																			allowBlank:false 
																			 
																		},
																		{	 xtype:'textfield',
																			fieldLabel: 'Nama Pimpinan',
																			name: 'data[SppMaster][sppm_pimpper]',
																			maxLength:100,
																			 
																			flex:'1', 
																			allowBlank:false 
																			 
																		},
																		{	 xtype:'textfield',
																			fieldLabel: 'Nama Bank & Cabang ',
																			name: 'data[SppMaster][sppm_bankper]',
																			maxLength:100,
																			 
																			flex:'1', 
																			allowBlank:false 
																			 
																		},
																		{	 xtype:'textfield',
																			fieldLabel: 'No. Rekening',
																			name: 'data[SppMaster][sppm_norekper]',
																			maxLength:100,
																			 
																			flex:'1', 
																			allowBlank:false 
																			 
																		},
									                        		{ xtype: 'radiogroup',
																		layout:'column',
																		fieldLabel: 'Kegiatan Lanjutan',
																		 columns:4,
																		  value:0,
																		vertical: true,
																		 items: [  {
																					inputValue: 1,
																					
																					name: 'sppm_keglanjut',
																					boxLabel: 'Ya'
																				}, {
																					inputValue: 0,
																					name: 'sppm_keglanjut',
																					boxLabel: 'Tidak'
																				} 
																					
																			 
																		]
																	},
																	{	 xtype:'textfield',
																			fieldLabel: 'Waktu Pelaksanaa',
																			name: 'data[SppMaster][sppm_waktulaksana]',
																			maxLength:150,
																			 
																			flex:'1', 
																			allowBlank:false 
																			 
																		},
																		{	 xtype:'textfield',
																			fieldLabel: 'Deskripsi Pekerjaan',
																			name: 'data[SppMaster][sppm_deskripsikerja]',
																			maxLength:250,
																			 
																			flex:'1', 
																			allowBlank:false 
																			 
																		} 
																	]
									                        },{
															id:'tabspp4a',
									                        layout:'fit',
									                        title: 'Kegiatan',
									                        frame:false,
									                        items :
											 						sppLSDetailGrid = new SppLSDetailGrid({
																	id: 'sppLSDetailGrid',
																	autoWidth:true,
																	 
																	border: true,
																	frame:true,
																	stripeRows: true,
																	store: SppLSDetailStore,
																	
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
															id:'tabspp4b',
									                        layout:'fit',
									                        title: 'Rencana Penggunaan Dana',
									                        frame:false,
									                        items :
											 						sppLS2DetailGrid = new SppTU2DetailGrid({
																	id: 'sppLS2DetailGrid',
																	autoWidth:true,
																	 
																	border: true,
																	frame:true,
																	stripeRows: true,
																	store: SppLS2DetailStore,
																	
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
								id:'spp4-new',
								 
						 		iconCls: 'new',
						 		handler: function(){
						 			entrySPPLSform.getForm().reset();
						 		 	SppLSDetailStore.load({
						 				params: {
						 					sppm_id: 0
						 				}
						 			});
						 		}
						 	},{
										text:'Print',
										id:'print_sppls',
										tooltip:'Print   ',
										iconCls:'printer',
										handler:function(){
											aid=Ext.getCmp('sppm_id4').getValue();
											aurl=HOST_PATH+'/rptspp/sppls/'+aid;
											window.open(aurl,'_blank');
	
										}
								}, {
						 		xtype: 'spacer',
						 		flex: 1
						 	}, {
						 		text: 'Save',
						 		iconCls: 'save',
								id:'spp4-save',
								 
						 		handler: function(){
									 
						 			if (entrySPPLSform.getForm().isValid()) {
						 				entrySPPLSform.getForm().submit({
						 					url: urladdspp,
						 					waitMsg: 'Saving data...',
						 					success: function(form, action){
						 						newid = action.result.newid;
						 						newno = action.result.newno;
						 						if (newid != '') {
						 							//alert(newid);
														// Ext.getCmp('form_no').setValue(newid);
														// alert(newid);
														Ext.getCmp('sppm_no4').setValue(newno);
														Ext.getCmp('sppm_id4').setValue(newid)
														Ext.getCmp('sppm_no4').setReadOnly(true);
														 SppLSDetailStore.setBaseParam('master', newid);
														SppLSDetailStore.save();
														 SppLS2DetailStore.setBaseParam('master', newid);
														SppLS2DetailStore.save();
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
									id:'spp4-cancel',
									 
									margins:'0',
									handler: function(){
										SppMasterStore.reload();
										MyDesktop.getSingleModule('entrySPPLS-win').closeWindow();
										
										
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