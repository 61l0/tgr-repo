/* ACARA  SERAH TERIMA */
var  urlacaramaster=HOST_PATH+'/acara/getall'; 
var urladdacaramaster=HOST_PATH+'/acara/add';
var urlgetdpadetailbykeg=HOST_PATH+'/dpa/readdetailbykeg';

var detailDPADetail1Store = new Ext.data.Store({
    proxy: new Ext.data.HttpProxy({
        url: urlgetdpadetailbykeg
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
    		abc = new AcaraDetail1Store.recordType({
					ad_id: 0,
					am_id: '',
					 
					akun_kode:recordlist[i].get('akun_kode'),
					akun_nama:recordlist[i].get('akun_nama'),
					 
					ad_nilai:0 
			
			});
		 
			AcaraDetail1Store.add(abc);
    		}
    		Ext.MessageBox.hide();
    	 
    	}
    }
    
});
var AcaraMasterJsonReader =  new Ext.data.JsonReader({
 
	remoteSort: false,
	root: 'acaramasters',
	totalProperty: 'total',
    idProperty: 'AcaraMasterList.am_id',
	fields: [
		{name:'AcaraMasterList.am_id'},
	 
		 
		{name:'data[AcaraMaster][am_id]',mapping:'AcaraMasterList.am_id'},
		{name:'data[AcaraMaster][am_no]',mapping:'AcaraMasterList.am_no'},
		{name:'data[AcaraMaster][am_tgl]',mapping:'AcaraMasterList.am_tgl', type: 'date', dateFormat: 'Y-m-d'},
		{name:'data[AcaraMaster][un_id]',mapping:'AcaraMasterList.un_id'},
		{name:'data[AcaraMaster][un_kode]',mapping:'AcaraMasterList.un_kode'},
		{name:'data[AcaraMaster][un_nama]',mapping:'AcaraMasterList.un_nama'},
		 {name:'data[AcaraMaster][prog_kode]',mapping:'AcaraMasterList.prog_kode'},
		{name:'data[AcaraMaster][prog_nama]',mapping:'AcaraMasterList.prog_nama'},
		 {name:'data[AcaraMaster][keg_kode]',mapping:'AcaraMasterList.keg_kode'},
		{name:'data[AcaraMaster][keg_nama]',mapping:'AcaraMasterList.keg_nama'},
		 {name:'data[AcaraMaster][am_pihak1]',mapping:'AcaraMasterList.am_pihak1'},
		 {name:'data[AcaraMaster][am_pihak2]',mapping:'AcaraMasterList.am_pihak2'} 
	]
	 
	 
});
function hitungTotalAcara(){
	  tot=0; 
	 
		for (i=0;i<AcaraDetail1Store.getCount();i++){
		  if (AcaraDetail1Store.getAt(i).get('ad_nilai')>0)
		 	 tot=tot+parseFloat(AcaraDetail1Store.getAt(i).get('ad_nilai'));
		  
		}
		 
		 
	 Ext.getCmp('am_tot1').setValue(tot); 
	
}
function proc_acara2(o){ 
	hitungTotalAcara();
}
function proc_acara1(o){ 
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
	hitungTotalAcara();
}
var AcaraMasterStore = new Ext.data.GroupingStore({
  	reader:AcaraMasterJsonReader,
	groupField:'data[AcaraMaster][un_nama]',
	 remoteGroup:false,
	  groupOnSort: false,
	 
	proxy: new Ext.data.HttpProxy({
        url: urlacaramaster
    })
});



var acaraDetail1_proxy = new Ext.data.HttpProxy({
    api: {
        read : HOST_PATH+'/acara/readdetail_1',
        create : HOST_PATH+'/acara/createdetail_1',
        update:  HOST_PATH+'/acara/updatedetail_1',
        destroy:  HOST_PATH+'/acara/destroydetail_1'
    },
	listeners: {
		beforewrite : function(proxy, action) {
			App.setAlert(App.STATUS_NOTICE,"Saving : "+action+": Menyimpan data...");
			},
		 write : function(proxy, action, result, res, rs) {
			App.setAlert(true, "Savig  :"+action+":"+res.message);
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
var acaraDetail1_reader = new Ext.data.JsonReader({
	totalProperty: 'total',
    successProperty: 'success',
    idProperty: 'ad_id',
    root: 'data',
    messageProperty: 'message'  // <-- New "messageProperty" meta-data
}, [ 
	{name:'ad_id'},
	{name: 'akun_kode'},
	{name: 'akun_nama'},
	{name: 'am_id'},
	{name: 'ad_nilai',type:'float'} 
	 
]); 

// The new DataWriter component.
var acaraDetail1_writer = new Ext.data.JsonWriter({
    encode: true,
    writeAllFields: true,
	listful:true
});

// Typical Store collecting the Proxy, Reader and Writer together.
var AcaraDetail1Store = new Ext.data.Store({
    id: 'AcaraDetail1Store',
    proxy: acaraDetail1_proxy,
    reader: acaraDetail1_reader,
    writer: acaraDetail1_writer,  // <-- plug a DataWriter into the store just as you would a Reader
    autoSave: false, // <-- false would delay executing create, update, destroy requests until specifically told to do so with some [save] buton.
	autoLoad: true  
});
 
var AcaraDetail1Grid = Ext.extend( Ext.grid.EditorGridPanel, {
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
    AcaraDetail1Grid.superclass.initComponent.call(this);
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
				ad_id: 0,
				am_id: '',
				 
				 
				akun_kode:'',
				akun_nama:'',
				ad_nilai:0 
				 
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
		hitungTotalAcara();
		 
    },
	listeners : {
		afteredit: function (o){
			//alert(o.field+":"+o.value+":"+o.originalValue+":"+o.row+":"+o.column );			
			proc_acara1(o);
		}
		 
	}
});


 
MyDesktop.AcaraGridWindow = Ext.extend(Ext.app.Module, {
    id:'acaragrid-win',
   init : function(){
      this.launcher = {
            text: 'Daftar Berita Acara Serah Terima',
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
                title:'Daftar Acara',
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
					gridacara = new Ext.grid.GridPanel({
							id: 'gridacara',
						 
							 store: AcaraMasterStore,
							trackMouseOver: true,
							disableSelection: false,
							loadMask: true,
							// grid columns
							columns: [ 
							  {
								header: "No",
								dataIndex: 'data[AcaraMaster][am_no]',
								width: 100,
								sortable: true
							},
							{
								header: "Tanggal",
								dataIndex: 'data[AcaraMaster][am_tgl]',
								width: 150,
								sortable: true,
								 renderer: function(date) { return date.format("d/m/Y"); }
						
							},
							 {
								header: "SPKD",
								dataIndex: 'data[AcaraMaster][un_nama]',
								width: 150,
								sortable: true
							},
							{
								header: "Bulan",
								dataIndex: 'data[AcaraMaster][am_bulan]',
								width: 50,
								sortable: true
							},
							{
								header: "Tahun",
								dataIndex: 'data[AcaraMaster][am_tahun]',
								width: 50,
								sortable: true
							},
							 
							{
								header: "Program",
								dataIndex: 'data[AcaraMaster][prog_nama]',
								width: 200,
								sortable: true 
							},
							
							 {
								header: "Kegiatan",
								dataIndex: 'data[AcaraMaster][keg_nama]',
								width: 200,
								sortable: true 
								 
						 	},
							   {
								header: "Total",
								dataIndex: 'data[AcaraMaster][am_tot]',
								width: 100,
								sortable: true  ,
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
											 
												Ext.getCmp('editacarabutt').enable();
											 
											 Ext.getCmp('delacarabutt').enable();
										 }
										else {
										 	Ext.getCmp('delacarabutt').disable();
										 	Ext.getCmp('editacarabutt').disable();
											 
										 	 
										}
									}
								}
							}),
							bbar: new Ext.PagingToolbar({
								pageSize: 20,
								 store: AcaraMasterStore,
								displayInfo: true,
								displayMsg: 'Displaying contents {0} - {1} of {2}',
								emptyMsg: "No Content to display",
								plugins: new Ext.ux.SlidingPager(),
								listeners :{
										'change' : function(){
										 AcaraMasterStore.baseParams={start:'start',limit:'limit',search:Ext.getCmp("searchAcaraTxt").getValue()};
			    
										}
									}
									 
							}),
							tbar: [{
								text: 'Daftar Acara',
								iconCls: 'acara',
								ref: '../acaraButton',
								
								menu: {
									xtype: 'menu',
									plain: true,
									items: [{
										text: 'Tambah',
										iconCls: 'add',
										handler: function(){
											 
											 MyDesktop.getSingleModule('entryacara-win').createWindow();
											 entryacaraform.getForm().reset();
									 			 
									 			 
												AcaraDetail1Store.load({
									 				params: {
									 					am_id: 0
									 				}
									 			});
									 			Ext.getCmp('am_tgl1').setValue(new Date());
												Ext.getCmp('am_tgl1').setReadOnly(false);
												Ext.getCmp('am_id1').setValue(0);
											 
												Ext.getCmp('acara_un_id1').enable();
															 
										}
									   } , {
										id: 'editacarabutt',
										text: 'Ubah',
										iconCls: 'edit',
										disabled: true,
										handler: function(){
										 	 mid=gridacara.getSelectionModel().getSelected().get("AcaraMasterList.am_id");
										  
											 AcaraDetail1Store.load({params:{am_id:mid}});
											 MyDesktop.getSingleModule('entryacara-win').createWindow();
											 Ext.getCmp("entryacaraform").getForm().loadRecord(gridacara.getSelectionModel().getSelected());
										}
									},{
											id: 'delacarabutt',
											text: 'Hapus',
											iconCls: 'delete',
											disabled: true,
											handler: function(){
											 
												  aid=gridacara.getSelectionModel().getSelected().get('AcaraMasterList.am_id');
												
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
													        url:urldelacaramaster,
													        params : {id :aid},
															method: 'GET',
															success: function ( result, request ) { 
																	Ext.MessageBox.hide();
						
																	var jsonData = Ext.util.JSON.decode(result.responseText);
																 
																	Ext.MessageBox.alert('Information', jsonData.msg); 
																	AcaraMasterStore.reload();
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
									id:'searchAcaraTxt',
								    text:'*',
							        emptyText:'*',
							        selectOnFocus:true,
									listeners: {
						              specialkey: function(f,e){
						                if (e.getKey() == e.ENTER) {
								                AcaraMasterStore.load({params: {
													start: 0,
													limit: 20,
													 search:Ext.getCmp("searchAcaraTxt").getValue()
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
								  AcaraMasterStore.load({params: {
									start: 0,
									limit: 20,
									 search:Ext.getCmp("searchAcaraTxt").getValue()
									 }})
						       
					        }
							}]
						
						})//end of grid
					
				
					
            });
        }
		 
        win2.show();
		AcaraMasterStore.load({params:{start:0, limit:20, search:'*'}});
	 
	 
		 
		gridacara.on('rowdblclick',function(sm, rowindex, eventobject){
			 
			 mid=gridacara.getSelectionModel().getSelected().get("AcaraMasterList.am_id");
		   
			 
			 AcaraDetail1Store.load({params:{am_id:mid}});
			 MyDesktop.getSingleModule('entryacara-win').createWindow();
			 Ext.getCmp("entryacaraform").getForm().loadRecord(gridacara.getSelectionModel().getSelected());
			 
			
		});
		 
		 
	}
}); 


MyDesktop.EntryAcaraForm = Ext.extend(Ext.app.Module, {
    id:'entryacara-win',
	title:'Berita Acara Serah Terima',
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
					[entryacaraform = new Ext.FormPanel({
						id:'entryacaraform',
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
												 name: 'data[AcaraMaster][am_id]',
												 
												id:'am_id1' 
												 
											},
											 {	 xtype:'hidden',
												 name: 'data[AcaraMaster][am_tot]',
												 
												id:'am_tot1' 
												 
											},
											{	 xtype:'textfield',
												fieldLabel: 'No Surat',
												name: 'data[AcaraMaster][am_no]',
												maxLength:20,
												id:'am_no1',
												 
												allowBlank:false 
												 
											},
											{	 xtype:'datefield',
												fieldLabel: 'Tanggal',
												id:'am_tgl1',
												name: 'data[AcaraMaster][am_tgl]',
												maxLength:50, 
												format:'Y-m-d',
												value:new Date(),
												 
												 
												allowBlank:false
											} ,
											{	 xtype:'textfield',
												fieldLabel: 'Pihak 1',
												name: 'data[AcaraMaster][am_pihak1]',
												maxLength:100 
												 
											},
											{	 xtype:'textfield',
												fieldLabel: 'Pihak 2',
												name: 'data[AcaraMaster][am_pihak2]',
												maxLength:100 
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
									 						 id:'acara_un_id1',
															 store: skpdSearchStore,
															 hiddenName:'data[AcaraMaster][un_id]',
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
																		   Ext.getCmp('acara_un_nama1').setValue(record.get('un_nama'));
																	 
																	 
																	}	
																}
															 
										
															 }),
													{	xtype:'textfield',
														id:'acara_un_nama1',
														fieldLabel: '',
														name: 'data[AcaraMaster][un_nama]',
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
									 						 id:'acara_prog_kode1',
															 store: programSearchStore,
															 hiddenName:'data[AcaraMaster][prog_kode]',
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
																		   Ext.getCmp('acara_prog_nama1').setValue(record.get('prog_nama'));
																	 
																		 
																	     kegiatanSearchStore.baseParams={prog_kode:record.get('prog_kode')};
									    	  							 kegiatanSearchStore.removeAll();
											 							 kegiatanSearchStore.lastQuery=null;
																	}	
																}
															 
										
															 }),
													{	xtype:'textfield',
														id:'acara_prog_nama1',
														fieldLabel: '',
														name: 'data[AcaraMaster][prog_nama]',
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
									 						 id:'acara_keg_kode1',
															 store: kegiatanSearchStore,
															 hiddenName:'data[AcaraMaster][keg_kode]',
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
																		   Ext.getCmp('acara_keg_nama1').setValue(record.get('keg_nama'));
																	 		detailDPADetail1Store.removeAll();
																		  detailDPADetail1Store.load({
																 				params: {
																 					keg_kode:record.get('keg_kode') 
																 				}
																 			});
																	}	
																}
															 
										
															 }),
													{	xtype:'textfield',
														id:'acara_keg_nama1',
														fieldLabel: '',
														name: 'data[AcaraMaster][keg_nama]',
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
									items:  tabPanelAcara= new Ext.TabPanel({
													 
													id:'tabPanelAcara',
								                    border: false, // already wrapped so don't add another border
								                    activeTab: 0, // second tab initially active
								                    tabPosition: 'top',
								                    items: [ {id:'tabacara2',
									                        layout:'fit',
									                        frame:true,
									                       
									                        title: 'Rincian',
									                        bodyStyle:'0 5px 5px 0',
									                        anchor:'95%',
									                        defaults: {anchor:'95%'},
									                        items :    acaraDetail1Grid = new AcaraDetail1Grid({
																				id: 'acaraDetail1Grid',
																				autoWidth:true,
																				height: 300,
																				border: true,
																				frame:false,
																				stripeRows: true,
																				store: AcaraDetail1Store,
																				
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
																								 dpaBTLByUNSearchStore.baseParams={un_id:Ext.getCmp('acara_acara_un_id1').getValue()};
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
																					dataIndex: 'ad_nilai',
																					isCellEditable: true,
																					allowBlank: false,
																	 				editor:new Ext.form.TextField({enableKeyEvents :true }),
																					 renderer: Ext.util.Format.numberRenderer('0,000.00')
																					 
																				} ,
																				 {
																					header: "ID",
																					 
																					width: 40,
																					sortable: true,
																					dataIndex: 'ad_id',
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
								id:'acara3-new',
								 
						 		iconCls: 'new',
						 		handler: function(){
						 			entryacaraform.getForm().reset();
						 		 
						 			 
									AcaraDetail1Store.load({
						 				params: {
						 					am_id: 0
						 				}
						 			});
						 			Ext.getCmp('am_tgl1').setValue(new Date());
									Ext.getCmp('am_tgl1').setReadOnly(false);
									Ext.getCmp('am_id1').setValue(0);
								 
									Ext.getCmp('acara_un_id1').enable();
									 
						 		}
						 	},{
										text:'Print',
										id:'print_acara',
										tooltip:'Print ',
										iconCls:'printer',
										handler:function(){
											aid=Ext.getCmp('am_id1').getValue();
											aurl=HOST_PATH+'/rptacara/acara/'+aid;
											window.open(aurl,'_blank');
	
										}
								}, {
						 		xtype: 'spacer',
						 		flex: 1
						 	}, {
						 		text: 'Save',
						 		iconCls: 'save',
								id:'acara3-save',
								 
						 		handler: function(){
									hitungTotalAcara();
						 			if (entryacaraform.getForm().isValid()) {
						 				entryacaraform.getForm().submit({
						 					url: urladdacaramaster,
						 					waitMsg: 'Saving data...',
						 					success: function(form, action){
						 						newid = action.result.newid;
						 						newno = action.result.newno;
						 						if (newid != '') {
						 							//alert(newid);
														// Ext.getCmp('form_no').setValue(newid);
														// alert(newid);
														Ext.getCmp('am_no1').setValue(newno);
														Ext.getCmp('am_id1').setValue(newid)
														Ext.getCmp('am_no1').setReadOnly(true);
														 
														AcaraDetail1Store.setBaseParam('master', newid);
														
													 
														AcaraDetail1Store.save();
														Ext.getCmp('am_id1').setValue(newid);
														 
														
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
									id:'acara3-cancel',
									 
									margins:'0',
									handler: function(){
										AcaraMasterStore.reload();
										MyDesktop.getSingleModule('entryacara-win').closeWindow();
										
										
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