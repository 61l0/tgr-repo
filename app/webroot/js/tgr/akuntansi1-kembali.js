/* PENGEMBALIAN BELANJA */
var  urlkembalimaster=HOST_PATH+'/kembali/getall'; 
var urladdkembalimaster=HOST_PATH+'/kembali/add';
var urlgetdpadetailbykeg=HOST_PATH+'/dpa/readdetailbykeg';

var detailDPADetail4Store = new Ext.data.Store({
    proxy: new Ext.data.HttpProxy({
        url: urlgetdpadetailbykeg
    }),
    reader: new Ext.data.JsonReader({
        root: 'data',
        totalProperty: 'total',
        id: 'dpkd_id',
    fields : [
        	{name: 'dpkd_id'},
	{name: 'dpkm_no'},
	{name: 'akun_kode'},
	{name: 'akun_nama'},
	{name: 'dpkd_nilai'} 
        
    ]
    }),
    listeners : {
    	load : function (thistore,recordlist,object){
    	 
    		for (i=0;i<recordlist.length;i++){
    		abc = new KembaliDetail1Store.recordType({
					kd_id: 0,
					km_id: '',
					 
					akun_kode:recordlist[i].get('akun_kode'),
					akun_nama:recordlist[i].get('akun_nama'),
					 
					kd_nilaiblj:0,
					kd_nilaikmbl:0
					
			
			});
		 
			KembaliDetail1Store.add(abc);
    		}
    		Ext.MessageBox.hide();
    	 
    	}
    }
    
});
var KembaliMasterJsonReader =  new Ext.data.JsonReader({
 
	remoteSort: false,
	root: 'kembalimasters',
	totalProperty: 'total',
    idProperty: 'KembaliMasterList.km_id',
	fields: [
		{name:'KembaliMasterList.km_id'},
	 
		 
		{name:'data[KembaliMaster][km_id]',mapping:'KembaliMasterList.km_id'},
		{name:'data[KembaliMaster][km_no]',mapping:'KembaliMasterList.km_no'},
		{name:'data[KembaliMaster][km_tgl]',mapping:'KembaliMasterList.km_tgl', type: 'date', dateFormat: 'Y-m-d'},
		{name:'data[KembaliMaster][un_id]',mapping:'KembaliMasterList.un_id'},
		{name:'data[KembaliMaster][un_kode]',mapping:'KembaliMasterList.un_kode'},
		{name:'data[KembaliMaster][un_nama]',mapping:'KembaliMasterList.un_nama'},
		 {name:'data[KembaliMaster][prog_kode]',mapping:'KembaliMasterList.prog_kode'},
		{name:'data[KembaliMaster][prog_nama]',mapping:'KembaliMasterList.prog_nama'},
		 {name:'data[KembaliMaster][keg_kode]',mapping:'KembaliMasterList.keg_kode'},
		{name:'data[KembaliMaster][keg_nama]',mapping:'KembaliMasterList.keg_nama'} 
		  
	]
	 
	 
});
function hitungTotalKembali(){
	 
	
}
function proc_kembali2(o){ 
	hitungTotalKembali();
}
function proc_kembali1(o){ 
	if (o.field=="akun_kode"){
		idxRec=dpaDetailByKegSearchStore.findBy(function(record, id){
			  	 
		        if(record.get('akun_kode') === o.value  ) {
				   		 
		              return true;  // a record with this data exists
		        }
		        return false;  // there is no record in the store with this data
		    	},dpaDetailByKegSearchStore,0);
			//alert("idxRec"+idxRec);
			//alert(accountActiveComboStore.getAt(idxRec).get("acc_name"));
			o.record.set("akun_nama",dpaDetailByKegSearchStore.getAt(idxRec).get("akun_nama"));
			 

	}
	hitungTotalKembali();
}
var KembaliMasterStore = new Ext.data.GroupingStore({
  	reader:KembaliMasterJsonReader,
	groupField:'data[KembaliMaster][prog_nama]',
	 remoteGroup:false,
	  groupOnSort: false,
	 
	proxy: new Ext.data.HttpProxy({
        url: urlkembalimaster
    })
});



var kembaliDetail1_proxy = new Ext.data.HttpProxy({
    api: {
        read : HOST_PATH+'/kembali/readdetail_1',
        create : HOST_PATH+'/kembali/createdetail_1',
        update:  HOST_PATH+'/kembali/updatedetail_1',
        destroy:  HOST_PATH+'/kembali/destroydetail_1'
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
var kembaliDetail1_reader = new Ext.data.JsonReader({
	totalProperty: 'total',
    successProperty: 'success',
    idProperty: 'kd_id',
    root: 'data',
    messageProperty: 'message'  // <-- New "messageProperty" meta-data
}, [ 
	{name:'kd_id'},
	{name: 'akun_kode'},
	{name: 'akun_nama'},
	{name: 'km_id'},
	{name: 'kd_nilaiblj',type:'float'},
	{name: 'kd_nilaikmbl',type:'float'} 
	 
]); 

// The new DataWriter component.
var kembaliDetail1_writer = new Ext.data.JsonWriter({
    encode: true,
    writeAllFields: true,
	listful:true
});

// Typical Store collecting the Proxy, Reader and Writer together.
var KembaliDetail1Store = new Ext.data.Store({
    id: 'KembaliDetail1Store',
    proxy: kembaliDetail1_proxy,
    reader: kembaliDetail1_reader,
    writer: kembaliDetail1_writer,  // <-- plug a DataWriter into the store just as you would a Reader
    autoSave: false, // <-- false would delay executing create, update, destroy requests until specifically told to do so with some [save] buton.
	autoLoad: true  
});
 
var KembaliDetail1Grid = Ext.extend( Ext.grid.EditorGridPanel, {
    iconCls: 'icon-form',
    frame:false,
	border:false,
	loadMask: true,
	 plugins:[ new Ext.ux.grid.GridSummary({position:'bottom',height:0})],
	sm: new Ext.grid.RowSelectionModel({	moveEditorOnEnter:false,
								singleSelect: true }),
    initComponent : function() {
 
	this.relayEvents(this.store, ['destroy', 'save', 'update']); 
	//this.tbar = this.buildTopToolbar();
    KembaliDetail1Grid.superclass.initComponent.call(this);
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
				kd_id: 0,
				km_id: '',
				 
				 
				akun_kode:'',
				akun_nama:'',
				kd_nilaiblj:0,
				kd_nilaikmbl:0
				
				 
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
		hitungTotalKembali();
		 
    },
	listeners : {
		afteredit: function (o){
			//alert(o.field+":"+o.value+":"+o.originalValue+":"+o.row+":"+o.column );			
			proc_kembali1(o);
		}
		 
	}
});

 

 
MyDesktop.KembaliGridWindow = Ext.extend(Ext.app.Module, {
    id:'kembaligrid-win',
   init : function(){
      this.launcher = {
            text: 'Pengembalian Belanja',
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
                title:'Daftar Pengembalian Belanja',
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
					gridkembali = new Ext.grid.GridPanel({
							id: 'gridkembali',
						 
							 store: KembaliMasterStore,
							trackMouseOver: true,
							disableSelection: false,
							loadMask: true,
							// grid columns
							columns: [ 
							  {
								header: "No",
								dataIndex: 'data[KembaliMaster][km_no]',
								width: 100,
								sortable: true
							},
							{
								header: "Tanggal",
								dataIndex: 'data[KembaliMaster][km_tgl]',
								width: 150,
								sortable: true,
								 renderer: function(date) { return date.format("d/m/Y"); }
						
							},
							 
							 {
								header: "SKPD",
								dataIndex: 'data[KembaliMaster][un_nama]',
								width: 100,
								sortable: true 
							},
							{
								header: "Program",
								dataIndex: 'data[KembaliMaster][prog_nama]',
								width: 200,
								sortable: true 
							},
							
							 {
								header: "Kegiatan",
								dataIndex: 'data[KembaliMaster][keg_nama]',
								width: 200,
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
											 
												Ext.getCmp('editkembalibutt').enable();
											 
											 Ext.getCmp('delkembalibutt').enable();
										 }
										else {
										 	Ext.getCmp('delkembalibutt').disable();
										 	Ext.getCmp('editkembalibutt').disable();
											 
										 	 
										}
									}
								}
							}),
							bbar: new Ext.PagingToolbar({
								pageSize: 20,
								 store: KembaliMasterStore,
								displayInfo: true,
								displayMsg: 'Displaying contents {0} - {1} of {2}',
								emptyMsg: "No Content to display",
								plugins: new Ext.ux.SlidingPager(),
								listeners :{
										'change' : function(){
										 KembaliMasterStore.baseParams={start:'start',limit:'limit',search:Ext.getCmp("searchKembaliTxt").getValue()};
			    
										}
									}
									 
							}),
							tbar: [{
								text: 'Daftar Kembali',
								iconCls: 'kembali',
								ref: '../kembaliButton',
								
								menu: {
									xtype: 'menu',
									plain: true,
									items: [{
										text: 'Tambah',
										iconCls: 'add',
										handler: function(){
											 
											 MyDesktop.getSingleModule('entrykembali-win').createWindow();
											 entrykembaliform.getForm().reset();
									 			 
									 			 
												KembaliDetail1Store.load({
									 				params: {
									 					km_id: 0
									 				}
									 			});
									 			Ext.getCmp('km_tgl1').setValue(new Date());
												Ext.getCmp('km_tgl1').setReadOnly(false);
												Ext.getCmp('km_id1').setValue(0);
											  
										}
									   } , {
										id: 'editkembalibutt',
										text: 'Ubah',
										iconCls: 'edit',
										disabled: true,
										handler: function(){
										 	 mid=gridkembali.getSelectionModel().getSelected().get("KembaliMasterList.km_id");
										 	 KembaliDetail0Store.load({params:{km_id:mid}});				 
										 
											 KembaliDetail1Store.load({params:{km_id:mid}});
											 MyDesktop.getSingleModule('entrykembali-win').createWindow();
											 Ext.getCmp("entrykembaliform").getForm().loadRecord(gridkembali.getSelectionModel().getSelected());
										}
									},{
											id: 'delkembalibutt',
											text: 'Hapus',
											iconCls: 'delete',
											disabled: true,
											handler: function(){
											 
												  aid=gridkembali.getSelectionModel().getSelected().get('KembaliMasterList.km_id');
												
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
													        url:urldelkembalimaster,
													        params : {id :aid},
															method: 'GET',
															success: function ( result, request ) { 
																	Ext.MessageBox.hide();
						
																	var jsonData = Ext.util.JSON.decode(result.responseText);
																 
																	Ext.MessageBox.alert('Information', jsonData.msg); 
																	KembaliMasterStore.reload();
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
									id:'searchKembaliTxt',
								    text:'*',
							        emptyText:'*',
							        selectOnFocus:true,
									listeners: {
						              specialkey: function(f,e){
						                if (e.getKey() == e.ENTER) {
								                KembaliMasterStore.load({params: {
													start: 0,
													limit: 20,
													 search:Ext.getCmp("searchKembaliTxt").getValue()
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
								  KembaliMasterStore.load({params: {
									start: 0,
									limit: 20,
									 search:Ext.getCmp("searchKembaliTxt").getValue()
									 }})
						       
					        }
							}]
						
						})//end of grid
					
				
					
            });
        }
		 
        win2.show();
		KembaliMasterStore.load({params:{start:0, limit:20, search:'*'}});
	 
	 
		 
		gridkembali.on('rowdblclick',function(sm, rowindex, eventobject){
			 
			 mid=gridkembali.getSelectionModel().getSelected().get("KembaliMasterList.km_id");
		   
		 
			 KembaliDetail1Store.load({params:{km_id:mid}});
			 MyDesktop.getSingleModule('entrykembali-win').createWindow();
			 Ext.getCmp("entrykembaliform").getForm().loadRecord(gridkembali.getSelectionModel().getSelected());
			 
			
		});
		 
		 
	}
}); 


MyDesktop.EntryKembaliForm = Ext.extend(Ext.app.Module, {
    id:'entrykembali-win',
	title:'Pengembalian Belanja',
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
					[entrykembaliform = new Ext.FormPanel({
						id:'entrykembaliform',
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
												 name: 'data[KembaliMaster][km_id]',
												 
												id:'km_id1' 
												 
											},
											 
											{	 xtype:'textfield',
												fieldLabel: 'No Surat',
												name: 'data[KembaliMaster][km_no]',
												maxLength:50,
												id:'km_no1',
												 
												allowBlank:false 
												 
											},
											{	 xtype:'datefield',
												fieldLabel: 'Tanggal',
												id:'km_tgl1',
												name: 'data[KembaliMaster][km_tgl]',
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
									 						 id:'kembali_un_id1',
															 store: skpdSearchStore,
															 hiddenName:'data[KembaliMaster][un_id]',
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
																		   Ext.getCmp('kembali_un_nama1').setValue(record.get('un_nama'));
																	  
																	}	
																}
															 
										
															 }),
													{	xtype:'textfield',
														id:'kembali_un_nama1',
														fieldLabel: '',
														name: 'data[KembaliMaster][un_nama]',
														flex : 1,
														readOnly:true 
													}
													]
											} //end of composite
											,
											{
						                        xtype : 'compositefield',
						                       anchor:'95%',
						                        msgTarget: 'side',
						                        fieldLabel: 'Program',
						                        items : [ 
													new Ext.form.ComboBox({
									 						 id:'kembali_prog_kode1',
															 store: programSearchStore,
															 hiddenName:'data[KembaliMaster][prog_kode]',
															 fieldLabel:'Program',
															 displayField:'prog_kode',
															 typeAhead: false,
															 enableKeyEvents :true, 
															 valueField:'prog_kode',
															  triggerAction: 'all',
															 loadingText: 'Searching...',
															 minChars:0,
															 pageSize:20,
															 boxMinWidth: 80,
															 boxMinHeight: 100,
															 width:120,
															 hideTrigger:false,
															 forceSelection: true,
															 tpl:programComboTpl,
															 allowBlank:false,
															 itemSelector: 'div.search-program',
															 listeners: {
							  										select: function(thiscombo,record, index){
																		   Ext.getCmp('kembali_prog_nama1').setValue(record.get('prog_nama'));
																	 
																		 
																	     kegiatanSearchStore.baseParams={prog_kode:record.get('prog_kode')};
									    	  							 kegiatanSearchStore.removeAll();
											 							 kegiatanSearchStore.lastQuery=null;
																	}	
																}
															 
										
															 }),
													{	xtype:'textfield',
														id:'kembali_prog_nama1',
														fieldLabel: '',
														name: 'data[KembaliMaster][prog_nama]',
														flex : 1,
														readOnly:true 
													}
													]
											} //end of composite
											,
											{
						                        xtype : 'compositefield',
						                       anchor:'95%',
						                        msgTarget: 'side',
						                        fieldLabel: 'Kegiatan',
						                        items : [ 
													new Ext.form.ComboBox({
									 						 id:'kembali_keg_kode1',
															 store: kegiatanSearchStore,
															 hiddenName:'data[KembaliMaster][keg_kode]',
															 fieldLabel:'Kegiatan',
															 displayField:'keg_kode',
															 typeAhead: false,
															 enableKeyEvents :true, 
															 valueField:'keg_kode',
															  triggerAction: 'all',
															 loadingText: 'Searching...',
															 minChars:0,
															 pageSize:20,
															 boxMinWidth: 80,
															 boxMinHeight: 100,
															 width:120,
															 hideTrigger:false,
															 forceSelection: true,
															 tpl:kegiatanComboTpl,
															 allowBlank:false,
															 itemSelector: 'div.search-kegiatan',
															 listeners: {
							  										select: function(thiscombo,record, index){
																		   Ext.getCmp('kembali_keg_nama1').setValue(record.get('keg_nama'));
																	 		detailDPADetail4Store.removeAll();
																		  detailDPADetail4Store.load({
																 				params: {
																 					keg_kode:record.get('keg_kode') 
																 				}
																 			});
																	}	
																}
															 
										
															 }),
													{	xtype:'textfield',
														id:'kembali_keg_nama1',
														fieldLabel: '',
														name: 'data[KembaliMaster][keg_nama]',
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
									items:  tabPanelKembali= new Ext.TabPanel({
													 
													id:'tabPanelKembali',
								                    border: false, // already wrapped so don't add another border
								                    activeTab: 0, // second tab initially active
								                    tabPosition: 'top',
								                    items: [ {id:'tabkembali2',
									                        layout:'fit',
									                        frame:true,
									                       
									                        title: 'Rincian',
									                        bodyStyle:'0 5px 5px 0',
									                        anchor:'95%',
									                        defaults: {anchor:'95%'},
									                        items :    kembaliDetail1Grid = new KembaliDetail1Grid({
																				id: 'kembaliDetail1Grid',
																				autoWidth:true,
																				height: 300,
																				border: true,
																				frame:false,
																				stripeRows: true,
																				store: KembaliDetail1Store,
																				
																				columns: [{
																					header: "Kode Rekening",
																					dataIndex: 'akun_kode',
																					sortable: true,
																					editor: {
																						xtype:'combo',
																						store: dpaBTLByUNSearchStore,
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
																					header: "Nilai Belanja",
																					width: 100,
																					sortable: true,
																					summaryType: 'sum',
																					align:'right',
																					dataIndex: 'kd_nilaiblj',
																					isCellEditable: true,
																					allowBlank: false,
																	 				editor:new Ext.form.TextField({enableKeyEvents :true }),
																					 renderer: Ext.util.Format.numberRenderer('0,000.00')
																					 
																				} ,
																				{
																					header: "Nilai Kembali",
																					width: 100,
																					sortable: true,
																					summaryType: 'sum',
																					align:'right',
																					dataIndex: 'kd_nilaikmbl',
																					isCellEditable: true,
																					allowBlank: false,
																	 				editor:new Ext.form.TextField({enableKeyEvents :true }),
																					 renderer: Ext.util.Format.numberRenderer('0,000.00')
																					 
																				} ,
																				 {
																					header: "ID",
																					 
																					width: 40,
																					sortable: true,
																					dataIndex: 'kd_id',
																					summaryType: 'count'
																				} ]
																			
																			}) //end of grid
																					                        		
											                       
																	
									                        
														   } 
									                        
									                  ]
												})//end of tab
											 
									 
										 
								},//end of center
								{	//bottom form
									region:'south', 
									layout:'column',
									bodyStyle:'padding:5px 5px 0',
									border: false,
									columns:2,
									defaults: {
										columnWidth: '.5',
										border: false,
										align:'right'
									},       
									 width: 300,	height:0,   
									items: [
										 
									]
								}//end of bottom form
							 ]
							  
				         ,
						 buttons: {
						 	layout: 'hbox',
							 defaults: {margins:'0 5 0 0'},
						 	items: [{
						 		text: 'Create New',
								id:'kembali3-new',
								 
						 		iconCls: 'new',
						 		handler: function(){
						 			entrykembaliform.getForm().reset();
						 		 
						 			 
									KembaliDetail1Store.load({
						 				params: {
						 					km_id: 0
						 				}
						 			});
						 			Ext.getCmp('km_tgl1').setValue(new Date());
									Ext.getCmp('km_tgl1').setReadOnly(false);
									Ext.getCmp('km_id1').setValue(0);
								 
								 
									 
						 		}
						 	},{
										text:'Print',
										id:'print_kembali',
										tooltip:'Print ',
										iconCls:'printer',
										handler:function(){
											aid=Ext.getCmp('km_id1').getValue();
											aurl=HOST_PATH+'/rptkembali/kembali/'+aid;
											window.open(aurl,'_blank');
	
										}
								}, {
						 		xtype: 'spacer',
						 		flex: 1
						 	}, {
						 		text: 'Save',
						 		iconCls: 'save',
								id:'kembali3-save',
								 
						 		handler: function(){
									hitungTotalKembali();
						 			if (entrykembaliform.getForm().isValid()) {
						 				entrykembaliform.getForm().submit({
						 					url: urladdkembalimaster,
						 					waitMsg: 'Saving data...',
						 					success: function(form, action){
						 						newid = action.result.newid;
						 						newno = action.result.newno;
						 						if (newid != '') {
						 							//alert(newid);
														// Ext.getCmp('form_no').setValue(newid);
														// alert(newid);
														Ext.getCmp('km_no1').setValue(newno);
														Ext.getCmp('km_id1').setValue(newid)
														Ext.getCmp('km_no1').setReadOnly(true);
														 
														KembaliDetail1Store.setBaseParam('master', newid);
														
													 
														KembaliDetail1Store.save();
														Ext.getCmp('km_id1').setValue(newid);
														 
														
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
									id:'kembali3-cancel',
									 
									margins:'0',
									handler: function(){
										KembaliMasterStore.reload();
										MyDesktop.getSingleModule('entrykembali-win').closeWindow();
										
										
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