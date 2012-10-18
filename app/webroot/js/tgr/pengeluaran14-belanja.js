/* BELANJA */
var  urlbelanjamaster=HOST_PATH+'/belanja/getall'; 
var urladdbelanjamaster=HOST_PATH+'/belanja/add';
var urlgetdpadetailbykeg=HOST_PATH+'/dpa/readdetailbykeg';

var detailDPADetail4Store = new Ext.data.Store({
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
    		abc = new BelanjaDetail1Store.recordType({
					bd_id: 0,
					bm_id: '',
					 
					akun_kode:recordlist[i].get('akun_kode'),
					akun_nama:recordlist[i].get('akun_nama'),
					 
					bd_nilai:0 
			
			});
		 
			BelanjaDetail1Store.add(abc);
    		}
    		Ext.MessageBox.hide();
    	 
    	}
    }
    
});
var BelanjaMasterJsonReader =  new Ext.data.JsonReader({
 
	remoteSort: false,
	root: 'belanjamasters',
	totalProperty: 'total',
    idProperty: 'BelanjaMasterList.bm_id',
	fields: [
		{name:'BelanjaMasterList.bm_id'},
	 
		 
		{name:'data[BelanjaMaster][bm_id]',mapping:'BelanjaMasterList.bm_id'},
		{name:'data[BelanjaMaster][bm_no]',mapping:'BelanjaMasterList.bm_no'},
		{name:'data[BelanjaMaster][bm_tgl]',mapping:'BelanjaMasterList.bm_tgl', type: 'date', dateFormat: 'Y-m-d'},
		{name:'data[BelanjaMaster][un_id]',mapping:'BelanjaMasterList.un_id'},
		{name:'data[BelanjaMaster][un_kode]',mapping:'BelanjaMasterList.un_kode'},
		{name:'data[BelanjaMaster][un_nama]',mapping:'BelanjaMasterList.un_nama'},
		 {name:'data[BelanjaMaster][prog_kode]',mapping:'BelanjaMasterList.prog_kode'},
		{name:'data[BelanjaMaster][prog_nama]',mapping:'BelanjaMasterList.prog_nama'},
		 {name:'data[BelanjaMaster][keg_kode]',mapping:'BelanjaMasterList.keg_kode'},
		{name:'data[BelanjaMaster][keg_nama]',mapping:'BelanjaMasterList.keg_nama'},
		 {name:'data[BelanjaMaster][bm_panjar]',mapping:'BelanjaMasterList.bm_panjar'},
		 {name:'data[BelanjaMaster][bm_nilaipanjar]',mapping:'BelanjaMasterList.bm_nilaipanjar'} 
	]
	 
	 
});
function hitungTotalBelanja(){
	 
	
}
function proc_belanja2(o){ 
	hitungTotalBelanja();
}
function proc_belanja1(o){ 
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
	hitungTotalBelanja();
}
var BelanjaMasterStore = new Ext.data.GroupingStore({
  	reader:BelanjaMasterJsonReader,
	groupField:'data[BelanjaMaster][prog_nama]',
	 remoteGroup:false,
	  groupOnSort: false,
	 
	proxy: new Ext.data.HttpProxy({
        url: urlbelanjamaster
    })
});



var belanjaDetail1_proxy = new Ext.data.HttpProxy({
    api: {
        read : HOST_PATH+'/belanja/readdetail_1',
        create : HOST_PATH+'/belanja/createdetail_1',
        update:  HOST_PATH+'/belanja/updatedetail_1',
        destroy:  HOST_PATH+'/belanja/destroydetail_1'
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
var belanjaDetail1_reader = new Ext.data.JsonReader({
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
var belanjaDetail1_writer = new Ext.data.JsonWriter({
    encode: true,
    writeAllFields: true,
	listful:true
});

// Typical Store collecting the Proxy, Reader and Writer together.
var BelanjaDetail1Store = new Ext.data.Store({
    id: 'BelanjaDetail1Store',
    proxy: belanjaDetail1_proxy,
    reader: belanjaDetail1_reader,
    writer: belanjaDetail1_writer,  // <-- plug a DataWriter into the store just as you would a Reader
    autoSave: false, // <-- false would delay executing create, update, destroy requests until specifically told to do so with some [save] buton.
	autoLoad: true  
});
 
var BelanjaDetail1Grid = Ext.extend( Ext.grid.EditorGridPanel, {
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
    BelanjaDetail1Grid.superclass.initComponent.call(this);
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
		hitungTotalBelanja();
		 
    },
	listeners : {
		afteredit: function (o){
			//alert(o.field+":"+o.value+":"+o.originalValue+":"+o.row+":"+o.column );			
			proc_belanja1(o);
		}
		 
	}
});

 

 
MyDesktop.BelanjaGridWindow = Ext.extend(Ext.app.Module, {
    id:'belanjagrid-win',
   init : function(){
      this.launcher = {
            text: 'Belanja',
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
                title:'Daftar Belanja',
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
					gridbelanja = new Ext.grid.GridPanel({
							id: 'gridbelanja',
						 
							 store: BelanjaMasterStore,
							trackMouseOver: true,
							disableSelection: false,
							loadMask: true,
							// grid columns
							columns: [ 
							  {
								header: "No",
								dataIndex: 'data[BelanjaMaster][bm_no]',
								width: 100,
								sortable: true
							},
							{
								header: "Tanggal",
								dataIndex: 'data[BelanjaMaster][bm_tgl]',
								width: 150,
								sortable: true,
								 renderer: function(date) { return date.format("d/m/Y"); }
						
							},
							 
							 {
								header: "SKPD",
								dataIndex: 'data[BelanjaMaster][un_nama]',
								width: 100,
								sortable: true 
							},
							{
								header: "Program",
								dataIndex: 'data[BelanjaMaster][prog_nama]',
								width: 200,
								sortable: true 
							},
							
							 {
								header: "Kegiatan",
								dataIndex: 'data[BelanjaMaster][keg_nama]',
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
											 
												Ext.getCmp('editbelanjabutt').enable();
											 
											 Ext.getCmp('delbelanjabutt').enable();
										 }
										else {
										 	Ext.getCmp('delbelanjabutt').disable();
										 	Ext.getCmp('editbelanjabutt').disable();
											 
										 	 
										}
									}
								}
							}),
							bbar: new Ext.PagingToolbar({
								pageSize: 20,
								 store: BelanjaMasterStore,
								displayInfo: true,
								displayMsg: 'Displaying contents {0} - {1} of {2}',
								emptyMsg: "No Content to display",
								plugins: new Ext.ux.SlidingPager(),
								listeners :{
										'change' : function(){
										 BelanjaMasterStore.baseParams={start:'start',limit:'limit',search:Ext.getCmp("searchBelanjaTxt").getValue()};
			    
										}
									}
									 
							}),
							tbar: [{
								text: 'Daftar Belanja',
								iconCls: 'belanja',
								ref: '../belanjaButton',
								
								menu: {
									xtype: 'menu',
									plain: true,
									items: [{
										text: 'Tambah',
										iconCls: 'add',
										handler: function(){
											 
											 MyDesktop.getSingleModule('entrybelanja-win').createWindow();
											 entrybelanjaform.getForm().reset();
									 			 
									 			 
												BelanjaDetail1Store.load({
									 				params: {
									 					bm_id: 0
									 				}
									 			});
									 			Ext.getCmp('blm_tgl1').setValue(new Date());
												Ext.getCmp('blm_tgl1').setReadOnly(false);
												Ext.getCmp('blm_id1').setValue(0);
											  
										}
									   } , {
										id: 'editbelanjabutt',
										text: 'Ubah',
										iconCls: 'edit',
										disabled: true,
										handler: function(){
										 	 mid=gridbelanja.getSelectionModel().getSelected().get("BelanjaMasterList.bm_id");
										 	 BelanjaDetail0Store.load({params:{bm_id:mid}});				 
										 
											 BelanjaDetail1Store.load({params:{bm_id:mid}});
											 MyDesktop.getSingleModule('entrybelanja-win').createWindow();
											 Ext.getCmp("entrybelanjaform").getForm().loadRecord(gridbelanja.getSelectionModel().getSelected());
										}
									},{
											id: 'delbelanjabutt',
											text: 'Hapus',
											iconCls: 'delete',
											disabled: true,
											handler: function(){
											 
												  aid=gridbelanja.getSelectionModel().getSelected().get('BelanjaMasterList.bm_id');
												
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
													        url:urldelbelanjamaster,
													        params : {id :aid},
															method: 'GET',
															success: function ( result, request ) { 
																	Ext.MessageBox.hide();
						
																	var jsonData = Ext.util.JSON.decode(result.responseText);
																 
																	Ext.MessageBox.alert('Information', jsonData.msg); 
																	BelanjaMasterStore.reload();
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
									id:'searchBelanjaTxt',
								    text:'*',
							        emptyText:'*',
							        selectOnFocus:true,
									listeners: {
						              specialkey: function(f,e){
						                if (e.getKey() == e.ENTER) {
								                BelanjaMasterStore.load({params: {
													start: 0,
													limit: 20,
													 search:Ext.getCmp("searchBelanjaTxt").getValue()
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
								  BelanjaMasterStore.load({params: {
									start: 0,
									limit: 20,
									 search:Ext.getCmp("searchBelanjaTxt").getValue()
									 }})
						       
					        }
							}]
						
						})//end of grid
					
				
					
            });
        }
		 
        win2.show();
		BelanjaMasterStore.load({params:{start:0, limit:20, search:'*'}});
	 
	 
		 
		gridbelanja.on('rowdblclick',function(sm, rowindex, eventobject){
			 
			 mid=gridbelanja.getSelectionModel().getSelected().get("BelanjaMasterList.bm_id");
		   
		 
			 BelanjaDetail1Store.load({params:{bm_id:mid}});
			 MyDesktop.getSingleModule('entrybelanja-win').createWindow();
			 Ext.getCmp("entrybelanjaform").getForm().loadRecord(gridbelanja.getSelectionModel().getSelected());
			 
			
		});
		 
		 
	}
}); 


MyDesktop.EntryBelanjaForm = Ext.extend(Ext.app.Module, {
    id:'entrybelanja-win',
	title:'Belanja',
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
					[entrybelanjaform = new Ext.FormPanel({
						id:'entrybelanjaform',
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
												 name: 'data[BelanjaMaster][bm_id]',
												 
												id:'blm_id1' 
												 
											},
											 
											{	 xtype:'textfield',
												fieldLabel: 'No Surat',
												name: 'data[BelanjaMaster][bm_no]',
												maxLength:50,
												id:'blm_no1',
												 
												allowBlank:false 
												 
											},
											{	 xtype:'datefield',
												fieldLabel: 'Tanggal',
												id:'blm_tgl1',
												name: 'data[BelanjaMaster][bm_tgl]',
												maxLength:50, 
												format:'Y-m-d',
												value:new Date(),
												 
												 
												allowBlank:false
											} ,
											{ xtype: 'radiogroup',
												layout:'column',
												fieldLabel: 'Dengan Panjar',
												 columns:2,
												  value:0,
												vertical: true,
												 items: [  {
															inputValue: 0,
															
															name: 'bm_panjar',
															boxLabel: 'Ya'
														}, {
															inputValue: 1,
															name: 'bm_panjar',
															boxLabel: 'Tidak'
														} 
															
													 
												]
											},
											{	 xtype:'numberfield',
												fieldLabel: 'Nilai Panjar',
												name: 'data[BelanjaMaster][bm_nilaipanjar]',
												maxLength:250,
												value:0
												 
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
									 						 id:'belanja_un_id1',
															 store: skpdSearchStore,
															 hiddenName:'data[BelanjaMaster][un_id]',
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
																		   Ext.getCmp('belanja_un_nama1').setValue(record.get('un_nama'));
																	  
																	}	
																}
															 
										
															 }),
													{	xtype:'textfield',
														id:'belanja_un_nama1',
														fieldLabel: '',
														name: 'data[BelanjaMaster][un_nama]',
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
									 						 id:'belanja_prog_kode1',
															 store: programSearchStore,
															 hiddenName:'data[BelanjaMaster][prog_kode]',
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
																		   Ext.getCmp('belanja_prog_nama1').setValue(record.get('prog_nama'));
																	 
																		 
																	     kegiatanSearchStore.baseParams={prog_kode:record.get('prog_kode')};
									    	  							 kegiatanSearchStore.removeAll();
											 							 kegiatanSearchStore.lastQuery=null;
																	}	
																}
															 
										
															 }),
													{	xtype:'textfield',
														id:'belanja_prog_nama1',
														fieldLabel: '',
														name: 'data[BelanjaMaster][prog_nama]',
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
									 						 id:'belanja_keg_kode1',
															 store: kegiatanSearchStore,
															 hiddenName:'data[BelanjaMaster][keg_kode]',
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
																		   Ext.getCmp('belanja_keg_nama1').setValue(record.get('keg_nama'));
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
														id:'belanja_keg_nama1',
														fieldLabel: '',
														name: 'data[BelanjaMaster][keg_nama]',
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
									items:  tabPanelBelanja= new Ext.TabPanel({
													 
													id:'tabPanelBelanja',
								                    border: false, // already wrapped so don't add another border
								                    activeTab: 0, // second tab initially active
								                    tabPosition: 'top',
								                    items: [ {id:'tabbelanja2',
									                        layout:'fit',
									                        frame:true,
									                       
									                        title: 'Rincian',
									                        bodyStyle:'0 5px 5px 0',
									                        anchor:'95%',
									                        defaults: {anchor:'95%'},
									                        items :    belanjaDetail1Grid = new BelanjaDetail1Grid({
																				id: 'belanjaDetail1Grid',
																				autoWidth:true,
																				height: 300,
																				border: true,
																				frame:false,
																				stripeRows: true,
																				store: BelanjaDetail1Store,
																				
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
								id:'belanja3-new',
								 
						 		iconCls: 'new',
						 		handler: function(){
						 			entrybelanjaform.getForm().reset();
						 		 
						 			 
									BelanjaDetail1Store.load({
						 				params: {
						 					bm_id: 0
						 				}
						 			});
						 			Ext.getCmp('blm_tgl1').setValue(new Date());
									Ext.getCmp('blm_tgl1').setReadOnly(false);
									Ext.getCmp('blm_id1').setValue(0);
								 
								 
									 
						 		}
						 	},{
										text:'Print',
										id:'print_belanja',
										tooltip:'Print ',
										iconCls:'printer',
										handler:function(){
											aid=Ext.getCmp('blm_id1').getValue();
											aurl=HOST_PATH+'/rptbelanja/belanja/'+aid;
											window.open(aurl,'_blank');
	
										}
								}, {
						 		xtype: 'spacer',
						 		flex: 1
						 	}, {
						 		text: 'Save',
						 		iconCls: 'save',
								id:'belanja3-save',
								 
						 		handler: function(){
									hitungTotalBelanja();
						 			if (entrybelanjaform.getForm().isValid()) {
						 				entrybelanjaform.getForm().submit({
						 					url: urladdbelanjamaster,
						 					waitMsg: 'Saving data...',
						 					success: function(form, action){
						 						newid = action.result.newid;
						 						newno = action.result.newno;
						 						if (newid != '') {
						 							//alert(newid);
														// Ext.getCmp('form_no').setValue(newid);
														// alert(newid);
														Ext.getCmp('blm_no1').setValue(newno);
														Ext.getCmp('blm_id1').setValue(newid)
														Ext.getCmp('blm_no1').setReadOnly(true);
														 
														BelanjaDetail1Store.setBaseParam('master', newid);
														
													 
														BelanjaDetail1Store.save();
														Ext.getCmp('blm_id1').setValue(newid);
														 
														
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
									id:'belanja3-cancel',
									 
									margins:'0',
									handler: function(){
										BelanjaMasterStore.reload();
										MyDesktop.getSingleModule('entrybelanja-win').closeWindow();
										
										
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