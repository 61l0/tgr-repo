/* REKENING KORAN */
var  urlrekkoran=HOST_PATH+'/rekkoran/getall'; 
var urladdrekkoran=HOST_PATH+'/rekkoran/add';
var urldelrekkoran=HOST_PATH+'/rekkoran/del';
 
var RekKoranJsonReader =  new Ext.data.JsonReader({
	
	remoteSort: false,
	root: 'rekkoran',
	totalProperty: 'total',
    idProperty: 'RekKoranList.rk_id',
	fields: [
		{name:'RekKoranList.rk_id'},
	 
		 
		{name:'data[RekKoran][rk_id]',mapping:'RekKoranList.rk_id'},
		{name:'data[RekKoran][bank_norek]',mapping:'RekKoranList.bank_norek'},
		{name:'data[RekKoran][bank_nama]',mapping:'RekKoranList.bank_nama'},
		
		{name:'data[RekKoran][un_id]',mapping:'RekKoranList.un_id'},
		{name:'data[RekKoran][rk_nomasuk]',mapping:'RekKoranList.rk_nomasuk'}, 
		{name:'data[RekKoran][rk_tglmasuk]',mapping:'RekKoranList.rk_tglmasuk', type: 'date', dateFormat: 'Y-m-d'},
		{name:'data[RekKoran][rk_nilaimasuk]',mapping:'RekKoranList.rk_nilaimasuk'},
		{name:'data[RekKoran][rk_ketmasuk]',mapping:'RekKoranList.rk_ketmasuk'},
		
		{name:'data[RekKoran][rk_nokeluar]',mapping:'RekKoranList.rk_nokeluar'}, 
		{name:'data[RekKoran][rk_tglkeluar]',mapping:'RekKoranList.rk_tglkeluar', type: 'date', dateFormat: 'Y-m-d'},
		{name:'data[RekKoran][rk_nilaikeluar]',mapping:'RekKoranList.rk_nilaikeluar'},
		{name:'data[RekKoran][rk_ketkeluar]',mapping:'RekKoranList.rk_ketkeluar'}
	]
	 
	 
});
function hitungTotalRekKoran(){
	 
}
function proc_rekkoran2(o){ 
	 
}
function proc_rekkoran1(o){ 
 
}
var RekKoranStore = new Ext.data.GroupingStore({
  	reader:RekKoranJsonReader,
	 
	 
	proxy: new Ext.data.HttpProxy({
        url: urlrekkoran
    })
});


 
 
MyDesktop.RekKoranGridWindow = Ext.extend(Ext.app.Module, {
    id:'rekkorangrid-win',
   init : function(){
      this.launcher = {
            text: 'Daftar Rekening Koran',
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
                title:'Daftar Rekening Koran',
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
					gridrekkoran = new Ext.grid.GridPanel({
							id: 'gridrekkoran',
						 
							 store: RekKoranStore,
							trackMouseOver: true,
							disableSelection: false,
							loadMask: true,
							// grid columns
							columns: [ 
							  {
								header: "No Rekening",
								dataIndex: 'data[RekKoran][bank_norek]',
								width: 100,
								sortable: true
							},
							  {
								header: "Nama Bank",
								dataIndex: 'data[RekKoran][bank_nama]',
								width: 150,
								sortable: true
							},
							 {
								header: "No Masuk",
								dataIndex: 'data[RekKoran][rk_nomasuk]',
								width: 100,
								sortable: true
							},
							{
								header: "Tgl Masuk",
								dataIndex: 'data[RekKoran][rk_tglmasuk]',
								width: 150,
								sortable: true,
								 renderer: function(date) { return date.format("d/m/Y"); }
						
							},
							{
								header: "Nilai Masuk",
								dataIndex: 'data[RekKoran][rk_nilaimasuk]',
								width: 120,
								sortable: true,
								align: 'right',
								renderer: Ext.util.Format.numberRenderer('0,000.00')
							} 
							 ,
							 {
								header: "Ket. Masuk",
								dataIndex: 'data[RekKoran][rk_ketmasuk]',
								width: 150,
								sortable: true
							},
							 
							 {
								header: "No Keluar",
								dataIndex: 'data[RekKoran][rk_nokeluar]',
								width: 100,
								sortable: true
							},
							{
								header: "Tgl Keluar",
								dataIndex: 'data[RekKoran][rk_tglkeluar]',
								width: 150,
								sortable: true,
								 renderer: function(date) { return date.format("d/m/Y"); }
						
							},
							{
								header: "Nilai Keluar",
								dataIndex: 'data[RekKoran][rk_nilaikeluar]',
								width: 120,
								sortable: true,
								align: 'right',
								renderer: Ext.util.Format.numberRenderer('0,000.00')
							} 
							 ,
							 {
								header: "Ket. Keluar",
								dataIndex: 'data[RekKoran][rk_ketkeluar]',
								width: 150,
								sortable: true
							} 
							
							  
							],
							 
							sm: new Ext.grid.RowSelectionModel({
								singleSelect: true,
								listeners: {
									 
									selectionchange: function(sm){
										if (sm.getCount()) {
											 
												Ext.getCmp('editrekkoranbutt').enable();
											 
											 Ext.getCmp('delrekkoranbutt').enable();
										 }
										else {
										 	Ext.getCmp('delrekkoranbutt').disable();
										 	Ext.getCmp('editrekkoranbutt').disable();
											 
										 	 
										}
									}
								}
							}),
							bbar: new Ext.PagingToolbar({
								pageSize: 20,
								 store: RekKoranStore,
								displayInfo: true,
								displayMsg: 'Displaying contents {0} - {1} of {2}',
								emptyMsg: "No Content to display",
								plugins: new Ext.ux.SlidingPager(),
								listeners :{
										'change' : function(){
										 RekKoranStore.baseParams={start:'start',limit:'limit',search:Ext.getCmp("searchRekKoranTxt").getValue()};
			    
										}
									}
									 
							}),
							tbar: [{
								text: 'Rekening Koran',
								iconCls: 'rekkoran',
								ref: '../rekkoranButton',
								
								menu: {
									xtype: 'menu',
									plain: true,
									items: [{
										text: 'Tambah',
										iconCls: 'add',
										handler: function(){
											 
											 MyDesktop.getSingleModule('entryrekkoran-win').createWindow();
											 entryrekkoranform.getForm().reset();
									 			 
									 		 
									 		 
												Ext.getCmp('rk_id1').setValue(0);
											 
											 
															 
										}
									   } , {
										id: 'editrekkoranbutt',
										text: 'Ubah',
										iconCls: 'edit',
										disabled: true,
										handler: function(){
										 	 mid=gridrekkoran.getSelectionModel().getSelected().get("RekKoranList.rk_id");
										 	 
											 MyDesktop.getSingleModule('entryrekkoran-win').createWindow();
											 Ext.getCmp("entryrekkoranform").getForm().loadRecord(gridrekkoran.getSelectionModel().getSelected());
										}
									},{
											id: 'delrekkoranbutt',
											text: 'Hapus',
											iconCls: 'delete',
											disabled: true,
											handler: function(){
											 
												  aid=gridrekkoran.getSelectionModel().getSelected().get('RekKoranList.rk_id');
												
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
													        url:urldelrekkoran,
													        params : {id :aid},
															method: 'GET',
															success: function ( result, request ) { 
																	Ext.MessageBox.hide();
						
																	var jsonData = Ext.util.JSON.decode(result.responseText);
																 
																	Ext.MessageBox.alert('Information', jsonData.msg); 
																	RekKoranStore.reload();
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
									id:'searchRekKoranTxt',
								    text:'*',
							        emptyText:'*',
							        selectOnFocus:true,
									listeners: {
						              specialkey: function(f,e){
						                if (e.getKey() == e.ENTER) {
								                RekKoranStore.load({params: {
													start: 0,
													limit: 20,
													 search:Ext.getCmp("searchRekKoranTxt").getValue()
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
								  RekKoranStore.load({params: {
									start: 0,
									limit: 20,
									 search:Ext.getCmp("searchRekKoranTxt").getValue()
									 }})
						       
					        }
							}]
						
						})//end of grid
					
				
					
            });
        }
		 
        win2.show();
		RekKoranStore.load({params:{start:0, limit:20, search:'*'}});
	 
	 
		 
		gridrekkoran.on('rowdblclick',function(sm, rowindex, eventobject){
			 
			 mid=gridrekkoran.getSelectionModel().getSelected().get("RekKoranList.rk_id");
		 
			 MyDesktop.getSingleModule('entryrekkoran-win').createWindow();
			 Ext.getCmp("entryrekkoranform").getForm().loadRecord(gridrekkoran.getSelectionModel().getSelected());
			 
			
		});
		 
		 
	}
}); 


MyDesktop.EntryRekKoranForm = Ext.extend(Ext.app.Module, {
    id:'entryrekkoran-win',
	title:'Rekening Koran',
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
                width:500,
                height:400,
                iconCls: 'icon-form',
                animCollapse:false,
                constrainHeader:true,
				stripeRows: true,
				border:false,
               layout:'fit',
                items :
					[entryrekkoranform = new Ext.FormPanel({
						id:'entryrekkoranform',
				      	 layout: 'form',
						defaults: {
							anchor:'95%'
						},
						
				      	frame:true,
				       	autoScroll :true,
				        border:false,
				        bodyStyle:'padding:5px 5px 0',
				      	 
						 autoWidth:true,
						 height:400,
						 
						items: [
								 
											{	 xtype:'hidden',
												 name: 'data[RekKoran][rk_id]',
												 
												id:'rk_id1' 
												 
											}, {
											                        xtype : 'compositefield',
											                        anchor:'95%',
											                        msgTarget: 'side',
											                        fieldLabel: 'Bank',
											                        items : [ 
											                        	new Ext.form.ComboBox({
														 						 id:'rk_bank_norek1',
																				 store: bankSearchStore,
																				 hiddenName:'data[RekKoran][bank_norek]',
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
																							  
																							 Ext.getCmp('rk_bank_nama1').setValue(record.get('bank_nama'));
																							 
																						}	
																					}
																				 
															
																				 }),
																		{	xtype:'textfield',
																			id:'rk_bank_nama1',
																			fieldLabel: '',
																			name: 'data[RekKoran][bank_nama]',
																			flex : 1,
																			readOnly:true 
																		}
											                        ]
								               					  },  
											{
												
												xtype:'fieldset',
												 title: 'Pemasukan',
											            anchor:'95%',
											            collapsible: false,
											            autoHeight:true,
											            labelWidth:150,
											            defaults: {anchor:'95%',labelWidth:'200px'},
											            defaultType: 'textfield',
												items : [
													{	 xtype:'textfield',
														fieldLabel: 'No',
														name: 'data[RekKoran][rk_nomasuk]',
														maxLength:50,
														id:'rk_nomasuk1',
														 
														allowBlank:false 
														 
													},
													{	 xtype:'datefield',
														fieldLabel: 'Tanggal',
														id:'rk_tglmasuk1',
														name: 'data[RekKoran][rk_tglmasuk]',
														maxLength:50, 
														format:'Y-m-d',
														value:new Date(),
														 
														 
														allowBlank:false
													} 
													 
													,{	 xtype:'numberfield',
														fieldLabel: 'Nilai',
														name: 'data[RekKoran][rk_nilaimasuk]',
														maxLength:20,
														id:'rk_nilaimasuk1',
														 
														allowBlank:false 
														 
													},
													{	 xtype:'textfield',
														fieldLabel: 'Keterangan',
														name: 'data[RekKoran][rk_ketmasuk]',
														maxLength:250,
														id:'rk_ketmasuk1',
														 
														allowBlank:false 
														 
													}
													]
											},
											{
												
												xtype:'fieldset',
												 title: 'Pengeluaran',
											            anchor:'95%',
											            collapsible: false,
											            autoHeight:true,
											            labelWidth:150,
											            defaults: {anchor:'95%',labelWidth:'200px'},
											            defaultType: 'textfield',
												items : [
													{	 xtype:'textfield',
														fieldLabel: 'No',
														name: 'data[RekKoran][rk_nokeluar]',
														maxLength:50,
														id:'rk_nokeluar1',
														 
														allowBlank:false 
														 
													},
													{	 xtype:'datefield',
														fieldLabel: 'Tanggal',
														id:'rk_tglkeluar1',
														name: 'data[RekKoran][rk_tglkeluar]',
														maxLength:50, 
														format:'Y-m-d',
														value:new Date(),
														 
														 
														allowBlank:false
													} 
													 
													,{	 xtype:'numberfield',
														fieldLabel: 'Nilai',
														name: 'data[RekKoran][rk_nilaikeluar]',
														maxLength:20,
														id:'rk_nilaikeluar1',
														 
														allowBlank:false 
														 
													},
													{	 xtype:'textfield',
														fieldLabel: 'Keterangan',
														name: 'data[RekKoran][rk_ketkeluar]',
														maxLength:250,
														id:'rk_ketkeluar1',
														 
														allowBlank:false 
														 
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
								id:'rekkoran3-new',
								 
						 		iconCls: 'new',
						 		handler: function(){
						 			entryrekkoranform.getForm().reset();
						 		   
									 
						 		}
						 	},{
										text:'Print',
										id:'print_rekkoran',
										tooltip:'Print ',
										iconCls:'printer',
										handler:function(){
											aid=Ext.getCmp('rk_id1').getValue();
											aurl=HOST_PATH+'/rptrekkoran/rekkoran/'+aid;
											window.open(aurl,'_blank');
	
										}
								}, {
						 		xtype: 'spacer',
						 		flex: 1
						 	}, {
						 		text: 'Save',
						 		iconCls: 'save',
								id:'rekkoran3-save',
								 
						 		handler: function(){
									hitungTotalRekKoran();
						 			if (entryrekkoranform.getForm().isValid()) {
						 				entryrekkoranform.getForm().submit({
						 					url: urladdrekkoran,
						 					waitMsg: 'Saving data...',
						 					success: function(form, action){
						 						newid = action.result.newid;
						 						newno = action.result.newno;
						 						if (newid != '') {
						 						 
														 
														Ext.getCmp('rk_id1').setValue(newid)
													 
														 
														Ext.MessageBox.alert('Message', 'Data telah disimpan');
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
									id:'rekkoran3-cancel',
									 
									margins:'0',
									handler: function(){
										RekKoranStore.reload();
										MyDesktop.getSingleModule('entryrekkoran-win').closeWindow();
										
										
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