/* JURNAL */
var  urljemaster=HOST_PATH+'/je/getall'; 
var urladdjemaster=HOST_PATH+'/je/add';

 
var JeMasterJsonReader =  new Ext.data.JsonReader({
 
	remoteSort: false,
	root: 'jemasters',
	totalProperty: 'total',
    idProperty: 'JeMasterList.jm_id',
	fields: [
		{name:'JeMasterList.jm_id'},
	 
		 
		{name:'data[JeMaster][jm_id]',mapping:'JeMasterList.jm_id'},
		{name:'data[JeMaster][jm_no]',mapping:'JeMasterList.jm_no'},
		{name:'data[JeMaster][jm_totalcredit]',mapping:'JeMasterList.jm_totalcredit'},
		{name:'data[JeMaster][jm_totaldebit]',mapping:'JeMasterList.jm_totaldebit'},
		{name:'data[JeMaster][jm_date]',mapping:'JeMasterList.jm_date', type: 'date', dateFormat: 'Y-m-d'},
		{name:'data[JeMaster][un_id]',mapping:'JeMasterList.un_id'},
		{name:'data[JeMaster][un_kode]',mapping:'JeMasterList.un_kode'},
		{name:'data[JeMaster][un_nama]',mapping:'JeMasterList.un_nama'},
		{name:'data[JeMaster][jm_note]',mapping:'JeMasterList.jm_note'}
	]
	 
	 
});
var JeMasterStore = new Ext.data.Store({
  	reader:JeMasterJsonReader,
	 
	proxy: new Ext.data.HttpProxy({
        url: urljemaster
    })
});


function hitungTotalJe(){

	 totalcredit=0;totaldebit=0; 
		for (i=0;i<JeDetail1Store.getCount();i++){
		  if (JeDetail1Store.getAt(i).get('jd_credit')>0)
		 	 totalcredit=totalcredit+parseFloat(JeDetail1Store.getAt(i).get('jd_credit'));
		  if (JeDetail1Store.getAt(i).get('jd_debit')>0)
		 	 totaldebit=totaldebit+parseFloat(JeDetail1Store.getAt(i).get('jd_debit'));
		}
	 
	 Ext.getCmp('jm_totaldebit1').setValue(totaldebit);
	 Ext.getCmp('jm_totalcredit1').setValue(totalcredit);
	 
	
}
function proc_je2(o){ 
	hitungTotalJe();
}
function proc_je1(o){ 
	if (o.field=="akun_kode"){
		idxRec=AnggaranSearchStore.findBy(function(record, id){
			  	 
		        if(record.get('akun_kode') === o.value  ) {
				   		 
		              return true;  // a record with this data exists
		        }
		        return false;  // there is no record in the store with this data
		    	},AnggaranSearchStore,0);
			//alert("idxRec"+idxRec);
			//alert(accountActiveComboStore.getAt(idxRec).get("acc_name"));
			o.record.set("akun_nama",AnggaranSearchStore.getAt(idxRec).get("akun_nama"));
			 

	}
	hitungTotalJe();
}


var jeDetail1_proxy = new Ext.data.HttpProxy({
    api: {
        read : HOST_PATH+'/je/readdetail_1',
        create : HOST_PATH+'/je/createdetail_1',
        update:  HOST_PATH+'/je/updatedetail_1',
        destroy:  HOST_PATH+'/je/destroydetail_1'
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
var jeDetail1_reader = new Ext.data.JsonReader({
	totalProperty: 'total',
    successProperty: 'success',
    idProperty: 'jd_id',
    root: 'data',
    messageProperty: 'message'  // <-- New "messageProperty" meta-data
}, [ 
	{name:'jd_id'},
	{name: 'akun_kode'},
	{name: 'akun_nama'},
	{name: 'jm_id'},
	{name: 'jd_debit',type:'float'},
	{name: 'jd_credit',type:'float'} 
	 
]); 

// The new DataWriter component.
var jeDetail1_writer = new Ext.data.JsonWriter({
    encode: true,
    writeAllFields: true,
	listful:true
});

// Typical Store collecting the Proxy, Reader and Writer together.
var JeDetail1Store = new Ext.data.Store({
    id: 'JeDetail1Store',
    proxy: jeDetail1_proxy,
    reader: jeDetail1_reader,
    writer: jeDetail1_writer,  // <-- plug a DataWriter into the store just as you would a Reader
    autoSave: false, // <-- false would delay executing create, update, destroy requests until specifically told to do so with some [save] buton.
	autoLoad: true  
});
 
var JeDetail1Grid = Ext.extend( Ext.grid.EditorGridPanel, {
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
    JeDetail1Grid.superclass.initComponent.call(this);
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
				jd_id: 0,
				jm_id: '',
				 
				 
				akun_kode:'',
				akun_nama:'',
				jd_debit:0,
				jd_credit:0
				
				 
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
		hitungTotalJe();
		 
    },
	listeners : {
		afteredit: function (o){
			//alert(o.field+":"+o.value+":"+o.originalValue+":"+o.row+":"+o.column );			
			proc_je1(o);
		}
		 
	}
});

 

 
MyDesktop.JeGridWindow = Ext.extend(Ext.app.Module, {
    id:'jegrid-win',
   init : function(){
      this.launcher = {
            text: 'Jurnal Umum',
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
                title:'Jurnal Umum',
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
					gridje = new Ext.grid.GridPanel({
							id: 'gridje',
						 
							 store: JeMasterStore,
							trackMouseOver: true,
							disableSelection: false,
							loadMask: true,
							// grid columns
							columns: [ 
							  {
								header: "No",
								dataIndex: 'data[JeMaster][jm_no]',
								width: 100,
								sortable: true
							},
							{
								header: "Tanggal",
								dataIndex: 'data[JeMaster][jm_date]',
								width: 100,
								sortable: true,
								 renderer: function(date) { return date.format("d/m/Y"); }
						
							},
							 
							 {
								header: "SKPD",
								dataIndex: 'data[JeMaster][un_nama]',
								width: 200,
								sortable: true 
							},
							{
								header: "Total Debet",
								dataIndex: 'data[JeMaster][jm_totaldebit]',
								width: 100,
								sortable: true ,
								 renderer: Ext.util.Format.numberRenderer('0,000.00')
							},
							
							 {
								header: "Total Kredit",
								dataIndex: 'data[JeMaster][jm_totalcredit]',
								width: 100,
								sortable: true  ,
								 renderer: Ext.util.Format.numberRenderer('0,000.00')
								 
						 	},
						 	
							 {
								header: "Catatan",
								dataIndex: 'data[JeMaster][jm_note]',
								width: 200,
								sortable: true 
							}  
							  
							],
							 
							sm: new Ext.grid.RowSelectionModel({
								singleSelect: true,
								listeners: {
									 
									selectionchange: function(sm){
										if (sm.getCount()) {
											 
												Ext.getCmp('editjebutt').enable();
											 
											 Ext.getCmp('deljebutt').enable();
										 }
										else {
										 	Ext.getCmp('deljebutt').disable();
										 	Ext.getCmp('editjebutt').disable();
											 
										 	 
										}
									}
								}
							}),
							bbar: new Ext.PagingToolbar({
								pageSize: 20,
								 store: JeMasterStore,
								displayInfo: true,
								displayMsg: 'Displaying contents {0} - {1} of {2}',
								emptyMsg: "No Content to display",
								plugins: new Ext.ux.SlidingPager(),
								listeners :{
										'change' : function(){
										 JeMasterStore.baseParams={start:'start',limit:'limit',search:Ext.getCmp("searchJeTxt").getValue()};
			    
										}
									}
									 
							}),
							tbar: [{
								text: 'Jurnal Umum',
								iconCls: 'je',
								ref: '../jeButton',
								
								menu: {
									xtype: 'menu',
									plain: true,
									items: [{
										text: 'Tambah',
										iconCls: 'add',
										handler: function(){
											 
											 MyDesktop.getSingleModule('entryje-win').createWindow();
											 entryjeform.getForm().reset();
									 			 
									 			 
												JeDetail1Store.load({
									 				params: {
									 					jm_id: 0
									 				}
									 			});
									 			Ext.getCmp('jm_date1').setValue(new Date());
												Ext.getCmp('jm_date1').setReadOnly(false);
												Ext.getCmp('jm_id1').setValue(0);
											  
										}
									   } , {
										id: 'editjebutt',
										text: 'Ubah',
										iconCls: 'edit',
										disabled: true,
										handler: function(){
										 	 mid=gridje.getSelectionModel().getSelected().get("JeMasterList.jm_id");
										 	 JeDetail0Store.load({params:{jm_id:mid}});				 
										 
											 JeDetail1Store.load({params:{jm_id:mid}});
											 MyDesktop.getSingleModule('entryje-win').createWindow();
											 Ext.getCmp("entryjeform").getForm().loadRecord(gridje.getSelectionModel().getSelected());
										}
									},{
											id: 'deljebutt',
											text: 'Hapus',
											iconCls: 'delete',
											disabled: true,
											handler: function(){
											 
												  aid=gridje.getSelectionModel().getSelected().get('JeMasterList.jm_id');
												
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
													        url:urldeljemaster,
													        params : {id :aid},
															method: 'GET',
															success: function ( result, request ) { 
																	Ext.MessageBox.hide();
						
																	var jsonData = Ext.util.JSON.decode(result.responseText);
																 
																	Ext.MessageBox.alert('Information', jsonData.msg); 
																	JeMasterStore.reload();
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
									id:'searchJeTxt',
								    text:'*',
							        emptyText:'*',
							        selectOnFocus:true,
									listeners: {
						              specialkey: function(f,e){
						                if (e.getKey() == e.ENTER) {
								                JeMasterStore.load({params: {
													start: 0,
													limit: 20,
													 search:Ext.getCmp("searchJeTxt").getValue()
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
								  JeMasterStore.load({params: {
									start: 0,
									limit: 20,
									 search:Ext.getCmp("searchJeTxt").getValue()
									 }})
						       
					        }
							}]
						
						})//end of grid
					
				
					
            });
        }
		 
        win2.show();
		JeMasterStore.load({params:{start:0, limit:20, search:'*'}});
	 
	 
		 
		gridje.on('rowdblclick',function(sm, rowindex, eventobject){
			 
			 mid=gridje.getSelectionModel().getSelected().get("JeMasterList.jm_id");
		   
		 
			 JeDetail1Store.load({params:{jm_id:mid}});
			 MyDesktop.getSingleModule('entryje-win').createWindow();
			 Ext.getCmp("entryjeform").getForm().loadRecord(gridje.getSelectionModel().getSelected());
			 
			
		});
		 
		 
	}
}); 


MyDesktop.EntryJeForm = Ext.extend(Ext.app.Module, {
    id:'entryje-win',
	title:'Jurnal Umum',
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
                height:400,
                iconCls: 'icon-form',
                animCollapse:false,
                constrainHeader:true,
				stripeRows: true,
				border:false,
               layout:'fit',
                items :
					[entryjeform = new Ext.FormPanel({
						id:'entryjeform',
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
												 name: 'data[JeMaster][jm_id]',
												 
												id:'jm_id1' 
												 
											},
											{	 xtype:'hidden',
												 name: 'data[JeMaster][jm_totaldebit]',
												 
												id:'jm_totaldebit1',
												value:0
												 
											},{	 xtype:'hidden',
												 name: 'data[JeMaster][jm_totalcredit]',
												 
												id:'jm_totalcredit1',
												value:0
												 
											},
											 
											{	 xtype:'textfield',
												fieldLabel: 'No Surat',
												name: 'data[JeMaster][jm_no]',
												maxLength:50,
												id:'jm_no1',
												 
												allowBlank:false 
												 
											},
											{	 xtype:'datefield',
												fieldLabel: 'Tanggal',
												id:'jm_date1',
												name: 'data[JeMaster][jm_date]',
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
									 						 id:'je_un_id1',
															 store: skpdSearchStore,
															 hiddenName:'data[JeMaster][un_id]',
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
																		   Ext.getCmp('je_un_nama1').setValue(record.get('un_nama'));
																	  
																	}	
																}
															 
										
															 }),
													{	xtype:'textfield',
														id:'je_un_nama1',
														fieldLabel: '',
														name: 'data[JeMaster][un_nama]',
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
									items:  tabPanelJe= new Ext.TabPanel({
													 
													id:'tabPanelJe',
								                    border: false, // already wrapped so don't add another border
								                    activeTab: 0, // second tab initially active
								                    tabPosition: 'top',
								                    items: [ {id:'tabje2',
									                        layout:'fit',
									                        frame:true,
									                       
									                        title: 'Rincian',
									                        bodyStyle:'0 5px 5px 0',
									                        anchor:'95%',
									                        defaults: {anchor:'95%'},
									                        items :    jeDetail1Grid = new JeDetail1Grid({
																				id: 'jeDetail1Grid',
																				autoWidth:true,
																				height: 300,
																				border: true,
																				frame:false,
																				stripeRows: true,
																				store: JeDetail1Store,
																				
																				columns: [{
																					header: "Kode Rekening",
																					dataIndex: 'akun_kode',
																					sortable: true,
																					editor: {
																						xtype:'combo',
																						store: AnggaranSearchStore,
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
																						tpl: anggaranComboTpl,
																						allowBlank: false,
																						itemSelector: 'div.search-anggaran',
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
																					header: "Debet",
																					width: 100,
																					sortable: true,
																					summaryType: 'sum',
																					align:'right',
																					dataIndex: 'jd_debit',
																					isCellEditable: true,
																					allowBlank: false,
																	 				editor:new Ext.form.TextField({enableKeyEvents :true }),
																					 renderer: Ext.util.Format.numberRenderer('0,000.00')
																					 
																				} ,
																				{
																					header: "Kredit",
																					width: 100,
																					sortable: true,
																					summaryType: 'sum',
																					align:'right',
																					dataIndex: 'jd_credit',
																					isCellEditable: true,
																					allowBlank: false,
																	 				editor:new Ext.form.TextField({enableKeyEvents :true }),
																					 renderer: Ext.util.Format.numberRenderer('0,000.00')
																					 
																				} ,
																				 {
																					header: "ID",
																					 
																					width: 40,
																					sortable: true,
																					dataIndex: 'jd_id',
																					summaryType: 'count'
																				} ]
																			
																			}) //end of grid
																					                        		
											                       
																	
									                        
														   } 
									                        
									                  ]
												})//end of tab
											 
									 
										 
								},//end of center
								{ //bottom form/south
									region: 'south',
									layout: {
										type: 'vbox',
										align: 'stretch' // Child items are stretched to full width
									},
									defaults:{margins:'0 0 5 0'},
									border: false,
									anchor: '95%',
									height: 50,
									items: [{
											layout:'form',
											defaults:{ layout:'form',anchor:'95%',  autoHeight:false},
											items:[ {
												xtype: 'textarea',
												fieldLabel: 'Note',
												name: 'data[JeMaster][jm_note]',
												
												height: 40
											}
											 ]
										}]
 								}//end of south
								 
							 ]
							  
				         ,
						 buttons: {
						 	layout: 'hbox',
							 defaults: {margins:'0 5 0 0'},
						 	items: [{
						 		text: 'Create New',
								id:'je3-new',
								 
						 		iconCls: 'new',
						 		handler: function(){
						 			entryjeform.getForm().reset();
						 		 
						 			 
									JeDetail1Store.load({
						 				params: {
						 					jm_id: 0
						 				}
						 			});
						 			Ext.getCmp('jm_date1').setValue(new Date());
									Ext.getCmp('jm_date1').setReadOnly(false);
									Ext.getCmp('jm_id1').setValue(0);
								 
								 
									 
						 		}
						 	},{
										text:'Print',
										id:'print_je',
										tooltip:'Print ',
										iconCls:'printer',
										handler:function(){
											aid=Ext.getCmp('jm_id1').getValue();
											aurl=HOST_PATH+'/rptje/je/'+aid;
											window.open(aurl,'_blank');
	
										}
								}, {
						 		xtype: 'spacer',
						 		flex: 1
						 	}, {
						 		text: 'Save',
						 		iconCls: 'save',
								id:'je3-save',
								 
						 		handler: function(){
									hitungTotalJe();
						 			if (entryjeform.getForm().isValid()) {
						 				entryjeform.getForm().submit({
						 					url: urladdjemaster,
						 					waitMsg: 'Saving data...',
						 					success: function(form, action){
						 						newid = action.result.newid;
						 						newno = action.result.newno;
						 						if (newid != '') {
						 							//alert(newid);
														// Ext.getCmp('form_no').setValue(newid);
														// alert(newid);
														Ext.getCmp('jm_no1').setValue(newno);
														Ext.getCmp('jm_id1').setValue(newid)
														Ext.getCmp('jm_no1').setReadOnly(true);
														 
														JeDetail1Store.setBaseParam('master', newid);
														
													 
														JeDetail1Store.save();
														Ext.getCmp('jm_id1').setValue(newid);
														 
														
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
									id:'je3-cancel',
									 
									margins:'0',
									handler: function(){
										JeMasterStore.reload();
										MyDesktop.getSingleModule('entryje-win').closeWindow();
										
										
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

