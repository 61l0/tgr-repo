/* BANSOS */
var  urlbansosmaster=HOST_PATH+'/bansos/getall'; 
var urladdbansosmaster=HOST_PATH+'/bansos/add';
var urlgetdpadetailbykeg=HOST_PATH+'/dpa/readdetailbykeg';

var detailDPADetail2Store = new Ext.data.Store({
    proxy: new Ext.data.HttpProxy({
        url: urlgetdpadetailbykeg
    }),
    reader: new Ext.data.JsonReader({
        root: 'data',
        totalProperty: 'total',
        id: 'dpbd_id',
    fields : [
        	{name: 'dpbd_id'},
	{name: 'dpbm_no'},
	{name: 'akun_kode'},
	{name: 'akun_nama'},
	{name: 'dpbd_nilai'} 
        
    ]
    }),
    listeners : {
    	load : function (thistore,recordlist,object){
    	 
    		for (i=0;i<recordlist.length;i++){
    		abc = new BansosDetail1Store.recordType({
					bd_id: 0,
					bm_id: '',
					 
					akun_kode:recordlist[i].get('akun_kode'),
					akun_nama:recordlist[i].get('akun_nama'),
					 
					bd_nilai:0 
			
			});
		 
			BansosDetail1Store.add(abc);
    		}
    		Ext.MessageBox.hide();
    	 
    	}
    }
    
});
var BansosMasterJsonReader =  new Ext.data.JsonReader({
 
	remoteSort: false,
	root: 'bansosmasters',
	totalProperty: 'total',
    idProperty: 'BansosMasterList.bm_id',
	fields: [
		{name:'BansosMasterList.bm_id'},
	 
		 
		{name:'data[BansosMaster][bm_id]',mapping:'BansosMasterList.bm_id'},
		{name:'data[BansosMaster][bm_no]',mapping:'BansosMasterList.bm_no'},
		{name:'data[BansosMaster][bm_tgl]',mapping:'BansosMasterList.bm_tgl', type: 'date', dateFormat: 'Y-m-d'},
		{name:'data[BansosMaster][un_id]',mapping:'BansosMasterList.un_id'},
		{name:'data[BansosMaster][un_kode]',mapping:'BansosMasterList.un_kode'},
		{name:'data[BansosMaster][un_nama]',mapping:'BansosMasterList.un_nama'},
		 {name:'data[BansosMaster][prog_kode]',mapping:'BansosMasterList.prog_kode'},
		{name:'data[BansosMaster][prog_nama]',mapping:'BansosMasterList.prog_nama'},
		 {name:'data[BansosMaster][keg_kode]',mapping:'BansosMasterList.keg_kode'},
		{name:'data[BansosMaster][keg_nama]',mapping:'BansosMasterList.keg_nama'},
		 {name:'data[BansosMaster][bm_tentang]',mapping:'BansosMasterList.bm_tentang'} 
	]
	 
	 
});
function hitungTotalBansos(){
	 
	
}
function proc_bansos2(o){ 
	hitungTotalBansos();
}
function proc_bansos1(o){ 
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
	hitungTotalBansos();
}
var BansosMasterStore = new Ext.data.GroupingStore({
  	reader:BansosMasterJsonReader,
	groupField:'data[BansosMaster][prog_nama]',
	 remoteGroup:false,
	  groupOnSort: false,
	 
	proxy: new Ext.data.HttpProxy({
        url: urlbansosmaster
    })
});



var bansosDetail1_proxy = new Ext.data.HttpProxy({
    api: {
        read : HOST_PATH+'/bansos/readdetail_1',
        create : HOST_PATH+'/bansos/createdetail_1',
        update:  HOST_PATH+'/bansos/updatedetail_1',
        destroy:  HOST_PATH+'/bansos/destroydetail_1'
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
var bansosDetail1_reader = new Ext.data.JsonReader({
	totalProperty: 'total',
    successProperty: 'success',
    idProperty: 'bd_id',
    root: 'data',
    messageProperty: 'message'  // <-- New "messageProperty" meta-data
}, [ 
	{name:'bd_id'},
	{name: 'akun_kode'},
	{name: 'akun_nama'},
	{name: 'bm_id'},
	{name: 'bd_nilai',type:'float'} 
	 
]); 

// The new DataWriter component.
var bansosDetail1_writer = new Ext.data.JsonWriter({
    encode: true,
    writeAllFields: true,
	listful:true
});

// Typical Store collecting the Proxy, Reader and Writer together.
var BansosDetail1Store = new Ext.data.Store({
    id: 'BansosDetail1Store',
    proxy: bansosDetail1_proxy,
    reader: bansosDetail1_reader,
    writer: bansosDetail1_writer,  // <-- plug a DataWriter into the store just as you would a Reader
    autoSave: false, // <-- false would delay executing create, update, destroy requests until specifically told to do so with some [save] buton.
	autoLoad: true  
});
 
var BansosDetail1Grid = Ext.extend( Ext.grid.EditorGridPanel, {
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
    BansosDetail1Grid.superclass.initComponent.call(this);
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
				bd_id: 0,
				bm_id: '',
				 
				 
				akun_kode:'',
				akun_nama:'',
				bd_nilai:0 
				 
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
		hitungTotalBansos();
		 
    },
	listeners : {
		afteredit: function (o){
			//alert(o.field+":"+o.value+":"+o.originalValue+":"+o.row+":"+o.column );			
			proc_bansos1(o);
		}
		 
	}
});

 

 
MyDesktop.BansosGridWindow = Ext.extend(Ext.app.Module, {
    id:'bansosgrid-win',
   init : function(){
      this.launcher = {
            text: 'SK Bansos/Hibah',
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
                title:'Daftar SK Bansos/Hibah',
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
					gridbansos = new Ext.grid.GridPanel({
							id: 'gridbansos',
						 
							 store: BansosMasterStore,
							trackMouseOver: true,
							disableSelection: false,
							loadMask: true,
							// grid columns
							columns: [ 
							  {
								header: "No",
								dataIndex: 'data[BansosMaster][bm_no]',
								width: 100,
								sortable: true
							},
							{
								header: "Tanggal",
								dataIndex: 'data[BansosMaster][bm_tgl]',
								width: 150,
								sortable: true,
								 renderer: function(date) { return date.format("d/m/Y"); }
						
							},
							 
							{
								header: "Tentang",
								dataIndex: 'data[BansosMaster][bm_bulan]',
								width: 150,
								sortable: true
							},
							{
								header: "Program",
								dataIndex: 'data[BansosMaster][prog_nama]',
								width: 200,
								sortable: true 
							},
							
							 {
								header: "Kegiatan",
								dataIndex: 'data[BansosMaster][keg_nama]',
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
											 
												Ext.getCmp('editbansosbutt').enable();
											 
											 Ext.getCmp('delbansosbutt').enable();
										 }
										else {
										 	Ext.getCmp('delbansosbutt').disable();
										 	Ext.getCmp('editbansosbutt').disable();
											 
										 	 
										}
									}
								}
							}),
							bbar: new Ext.PagingToolbar({
								pageSize: 20,
								 store: BansosMasterStore,
								displayInfo: true,
								displayMsg: 'Displaying contents {0} - {1} of {2}',
								emptyMsg: "No Content to display",
								plugins: new Ext.ux.SlidingPager(),
								listeners :{
										'change' : function(){
										 BansosMasterStore.baseParams={start:'start',limit:'limit',search:Ext.getCmp("searchBansosTxt").getValue()};
			    
										}
									}
									 
							}),
							tbar: [{
								text: 'Daftar Bansos',
								iconCls: 'bansos',
								ref: '../bansosButton',
								
								menu: {
									xtype: 'menu',
									plain: true,
									items: [{
										text: 'Tambah',
										iconCls: 'add',
										handler: function(){
											 
											 MyDesktop.getSingleModule('entrybansos-win').createWindow();
											 entrybansosform.getForm().reset();
									 			 
									 			 
												BansosDetail1Store.load({
									 				params: {
									 					bm_id: 0
									 				}
									 			});
									 			Ext.getCmp('bm_tgl1').setValue(new Date());
												Ext.getCmp('bm_tgl1').setReadOnly(false);
												Ext.getCmp('bm_id1').setValue(0);
											  
										}
									   } , {
										id: 'editbansosbutt',
										text: 'Ubah',
										iconCls: 'edit',
										disabled: true,
										handler: function(){
										 	 mid=gridbansos.getSelectionModel().getSelected().get("BansosMasterList.bm_id");
										 	 BansosDetail0Store.load({params:{bm_id:mid}});				 
										 
											 BansosDetail1Store.load({params:{bm_id:mid}});
											 MyDesktop.getSingleModule('entrybansos-win').createWindow();
											 Ext.getCmp("entrybansosform").getForm().loadRecord(gridbansos.getSelectionModel().getSelected());
										}
									},{
											id: 'delbansosbutt',
											text: 'Hapus',
											iconCls: 'delete',
											disabled: true,
											handler: function(){
											 
												  aid=gridbansos.getSelectionModel().getSelected().get('BansosMasterList.bm_id');
												
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
													        url:urldelbansosmaster,
													        params : {id :aid},
															method: 'GET',
															success: function ( result, request ) { 
																	Ext.MessageBox.hide();
						
																	var jsonData = Ext.util.JSON.decode(result.responseText);
																 
																	Ext.MessageBox.alert('Information', jsonData.msg); 
																	BansosMasterStore.reload();
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
									id:'searchBansosTxt',
								    text:'*',
							        emptyText:'*',
							        selectOnFocus:true,
									listeners: {
						              specialkey: function(f,e){
						                if (e.getKey() == e.ENTER) {
								                BansosMasterStore.load({params: {
													start: 0,
													limit: 20,
													 search:Ext.getCmp("searchBansosTxt").getValue()
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
								  BansosMasterStore.load({params: {
									start: 0,
									limit: 20,
									 search:Ext.getCmp("searchBansosTxt").getValue()
									 }})
						       
					        }
							}]
						
						})//end of grid
					
				
					
            });
        }
		 
        win2.show();
		BansosMasterStore.load({params:{start:0, limit:20, search:'*'}});
	 
	 
		 
		gridbansos.on('rowdblclick',function(sm, rowindex, eventobject){
			 
			 mid=gridbansos.getSelectionModel().getSelected().get("BansosMasterList.bm_id");
		   
		 
			 BansosDetail1Store.load({params:{bm_id:mid}});
			 MyDesktop.getSingleModule('entrybansos-win').createWindow();
			 Ext.getCmp("entrybansosform").getForm().loadRecord(gridbansos.getSelectionModel().getSelected());
			 
			
		});
		 
		 
	}
}); 


MyDesktop.EntryBansosForm = Ext.extend(Ext.app.Module, {
    id:'entrybansos-win',
	title:'SK Bansos/Hibah',
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
					[entrybansosform = new Ext.FormPanel({
						id:'entrybansosform',
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
												 name: 'data[BansosMaster][bm_id]',
												 
												id:'bm_id1' 
												 
											},
											 
											{	 xtype:'textfield',
												fieldLabel: 'No Surat',
												name: 'data[BansosMaster][bm_no]',
												maxLength:20,
												id:'bm_no1',
												 
												allowBlank:false 
												 
											},
											{	 xtype:'datefield',
												fieldLabel: 'Tanggal',
												id:'bm_tgl1',
												name: 'data[BansosMaster][bm_tgl]',
												maxLength:50, 
												format:'Y-m-d',
												value:new Date(),
												 
												 
												allowBlank:false
											} ,
											{	 xtype:'textfield',
												fieldLabel: 'Tentang',
												name: 'data[BansosMaster][bm_tentang]',
												maxLength:250 
												 
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
						                        fieldLabel: 'Program',
						                        items : [ 
													new Ext.form.ComboBox({
									 						 id:'bansos_prog_kode1',
															 store: programSearchStore,
															 hiddenName:'data[BansosMaster][prog_kode]',
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
																		   Ext.getCmp('bansos_prog_nama1').setValue(record.get('prog_nama'));
																	 
																		 
																	     kegiatanSearchStore.baseParams={prog_kode:record.get('prog_kode')};
									    	  							 kegiatanSearchStore.removeAll();
											 							 kegiatanSearchStore.lastQuery=null;
																	}	
																}
															 
										
															 }),
													{	xtype:'textfield',
														id:'bansos_prog_nama1',
														fieldLabel: '',
														name: 'data[BansosMaster][prog_nama]',
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
									 						 id:'bansos_keg_kode1',
															 store: kegiatanSearchStore,
															 hiddenName:'data[BansosMaster][keg_kode]',
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
																		   Ext.getCmp('bansos_keg_nama1').setValue(record.get('keg_nama'));
																	 		detailDPADetail2Store.removeAll();
																		  detailDPADetail2Store.load({
																 				params: {
																 					keg_kode:record.get('keg_kode') 
																 				}
																 			});
																	}	
																}
															 
										
															 }),
													{	xtype:'textfield',
														id:'bansos_keg_nama1',
														fieldLabel: '',
														name: 'data[BansosMaster][keg_nama]',
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
									items:  tabPanelBansos= new Ext.TabPanel({
													 
													id:'tabPanelBansos',
								                    border: false, // already wrapped so don't add another border
								                    activeTab: 0, // second tab initially active
								                    tabPosition: 'top',
								                    items: [ {id:'tabbansos2',
									                        layout:'fit',
									                        frame:true,
									                       
									                        title: 'Rincian',
									                        bodyStyle:'0 5px 5px 0',
									                        anchor:'95%',
									                        defaults: {anchor:'95%'},
									                        items :    bansosDetail1Grid = new BansosDetail1Grid({
																				id: 'bansosDetail1Grid',
																				autoWidth:true,
																				height: 300,
																				border: true,
																				frame:false,
																				stripeRows: true,
																				store: BansosDetail1Store,
																				
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
																					header: "Nilai",
																					width: 100,
																					sortable: true,
																					summaryType: 'sum',
																					align:'right',
																					dataIndex: 'bd_nilai',
																					isCellEditable: true,
																					allowBlank: false,
																	 				editor:new Ext.form.TextField({enableKeyEvents :true }),
																					 renderer: Ext.util.Format.numberRenderer('0,000.00')
																					 
																				} ,
																				 {
																					header: "ID",
																					 
																					width: 40,
																					sortable: true,
																					dataIndex: 'bd_id',
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
								id:'bansos3-new',
								 
						 		iconCls: 'new',
						 		handler: function(){
						 			entrybansosform.getForm().reset();
						 		 
						 			 
									BansosDetail1Store.load({
						 				params: {
						 					bm_id: 0
						 				}
						 			});
						 			Ext.getCmp('bm_tgl1').setValue(new Date());
									Ext.getCmp('bm_tgl1').setReadOnly(false);
									Ext.getCmp('bm_id1').setValue(0);
								 
								 
									 
						 		}
						 	},{
										text:'Print',
										id:'print_bansos',
										tooltip:'Print ',
										iconCls:'printer',
										handler:function(){
											aid=Ext.getCmp('bm_id1').getValue();
											aurl=HOST_PATH+'/rptbansos/bansos/'+aid;
											window.open(aurl,'_blank');
	
										}
								}, {
						 		xtype: 'spacer',
						 		flex: 1
						 	}, {
						 		text: 'Save',
						 		iconCls: 'save',
								id:'bansos3-save',
								 
						 		handler: function(){
									hitungTotalBansos();
						 			if (entrybansosform.getForm().isValid()) {
						 				entrybansosform.getForm().submit({
						 					url: urladdbansosmaster,
						 					waitMsg: 'Saving data...',
						 					success: function(form, action){
						 						newid = action.result.newid;
						 						newno = action.result.newno;
						 						if (newid != '') {
						 							//alert(newid);
														// Ext.getCmp('form_no').setValue(newid);
														// alert(newid);
														Ext.getCmp('bm_no1').setValue(newno);
														Ext.getCmp('bm_id1').setValue(newid)
														Ext.getCmp('bm_no1').setReadOnly(true);
														 
														BansosDetail1Store.setBaseParam('master', newid);
														
													 
														BansosDetail1Store.save();
														Ext.getCmp('bm_id1').setValue(newid);
														 
														
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
									id:'bansos3-cancel',
									 
									margins:'0',
									handler: function(){
										BansosMasterStore.reload();
										MyDesktop.getSingleModule('entrybansos-win').closeWindow();
										
										
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