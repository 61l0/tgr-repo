/* PEMBIAYAAN */
var  urlpembiayaan=HOST_PATH+'/pembiayaan/getall'; 
var urladdpembiayaan=HOST_PATH+'/pembiayaan/add';
 
 
var PembiayaanJsonReader =  new Ext.data.JsonReader({
 
	remoteSort: false,
	root: 'pembiayaan',
	totalProperty: 'total',
    idProperty: 'PembiayaanList.bia_id',
	fields: [
		{name:'PembiayaanList.bia_id'},
	 
		 
		{name:'data[Pembiayaan][bia_id]',mapping:'PembiayaanList.bia_id'},
		{name:'data[Pembiayaan][bia_no]',mapping:'PembiayaanList.bia_no'},
		{name:'data[Pembiayaan][bia_noperda]',mapping:'PembiayaanList.bia_noperda'},
		{name:'data[Pembiayaan][bia_nonota]',mapping:'PembiayaanList.bia_nonota'},
		{name:'data[Pembiayaan][bia_tgl]',mapping:'PembiayaanList.bia_tgl', type: 'date', dateFormat: 'Y-m-d'},
		{name:'data[Pembiayaan][bia_tglsp2d]',mapping:'PembiayaanList.bia_tglsp2d', type: 'date', dateFormat: 'Y-m-d'},
		{name:'data[Pembiayaan][akun_kode]',mapping:'PembiayaanList.akun_kode'},
		{name:'data[Pembiayaan][akun_nama]',mapping:'PembiayaanList.akun_nama'},
		{name:'data[Pembiayaan][bia_nilai]',mapping:'PembiayaanList.bia_nilai'} 
	]
	 
	 
});
function hitungTotalPembiayaan(){
	 
}
function proc_pembiayaan2(o){ 
	 
}
function proc_pembiayaan1(o){ 
 
}
var PembiayaanStore = new Ext.data.Store({
  	reader:PembiayaanJsonReader,
 
	proxy: new Ext.data.HttpProxy({
        url: urlpembiayaan
    })
});


 
 
MyDesktop.PembiayaanGridWindow = Ext.extend(Ext.app.Module, {
    id:'pembiayaangrid-win',
   init : function(){
      this.launcher = {
            text: 'Daftar Pengeluaran Pembiayaan',
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
                title:'Daftar Pengeluaran Pembiayaan',
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
					gridpembiayaan = new Ext.grid.GridPanel({
							id: 'gridpembiayaan',
						 
							 store: PembiayaanStore,
							trackMouseOver: true,
							disableSelection: false,
							loadMask: true,
							// grid columns
							columns: [ 
							  {
								header: "No",
								dataIndex: 'data[Pembiayaan][bia_no]',
								width: 100,
								sortable: true
							},
							{
								header: "Tanggal",
								dataIndex: 'data[Pembiayaan][bia_tgl]',
								width: 150,
								sortable: true,
								 renderer: function(date) { return date.format("d/m/Y"); }
						
							},
							  {
								header: "No Nota Debit",
								dataIndex: 'data[Pembiayaan][bia_nonota]',
								width: 100,
								sortable: true
							},
							 {
								header: "No Perda",
								dataIndex: 'data[Pembiayaan][bia_noperda]',
								width: 100,
								sortable: true
							},
							  {
								header: "Nilai",
								dataIndex: 'data[Pembiayaan][bia_nilai]',
								width: 120,
								sortable: true,
								align: 'right',
								renderer: Ext.util.Format.numberRenderer('0,000.00')
							},
							 {
								header: "Tanggal SP2D",
								dataIndex: 'data[Pembiayaan][bia_tglsp2d]',
								width: 150,
								sortable: true,
								 renderer: function(date) { return date.format("d/m/Y"); }
						
							} 
							],
							
							  
							sm: new Ext.grid.RowSelectionModel({
								singleSelect: true,
								listeners: {
									 
									selectionchange: function(sm){
										if (sm.getCount()) {
											 
												Ext.getCmp('editpembiayaanbutt').enable();
											 
											 Ext.getCmp('delpembiayaanbutt').enable();
										 }
										else {
										 	Ext.getCmp('delpembiayaanbutt').disable();
										 	Ext.getCmp('editpembiayaanbutt').disable();
											 
										 	 
										}
									}
								}
							}),
							bbar: new Ext.PagingToolbar({
								pageSize: 20,
								 store: PembiayaanStore,
								displayInfo: true,
								displayMsg: 'Displaying contents {0} - {1} of {2}',
								emptyMsg: "No Content to display",
								plugins: new Ext.ux.SlidingPager(),
								listeners :{
										'change' : function(){
										 PembiayaanStore.baseParams={start:'start',limit:'limit',search:Ext.getCmp("searchPembiayaanTxt").getValue()};
			    
										}
									}
									 
							}),
							tbar: [{
								text: 'Pengeluaran Pembiayaan',
								iconCls: 'pembiayaan',
								ref: '../pembiayaanButton',
								
								menu: {
									xtype: 'menu',
									plain: true,
									items: [{
										text: 'Tambah',
										iconCls: 'add',
										handler: function(){
											 
											 MyDesktop.getSingleModule('entrypembiayaan-win').createWindow();
											 entrypembiayaanform.getForm().reset();
									 			 
									 			PembiayaanDetail2Store.load({
									 				params: {
									 					bia_id: 0
									 				}
									 			});
												PembiayaanDetail1Store.load({
									 				params: {
									 					bia_id: 0
									 				}
									 			});
									 			Ext.getCmp('bia_tgl1').setValue(new Date());
												Ext.getCmp('bia_tgl1').setReadOnly(false);
												Ext.getCmp('bia_id1').setValue(0);
											 
												Ext.getCmp('pembiayaan_un_id1').enable();
															 
										}
									   } , {
										id: 'editpembiayaanbutt',
										text: 'Ubah',
										iconCls: 'edit',
										disabled: true,
										handler: function(){
										 	 mid=gridpembiayaan.getSelectionModel().getSelected().get("PembiayaanList.bia_id");
										 	 
											 MyDesktop.getSingleModule('entrypembiayaan-win').createWindow();
											 Ext.getCmp("entrypembiayaanform").getForm().loadRecord(gridpembiayaan.getSelectionModel().getSelected());
										}
									},{
											id: 'delpembiayaanbutt',
											text: 'Hapus',
											iconCls: 'delete',
											disabled: true,
											handler: function(){
											 
												  aid=gridpembiayaan.getSelectionModel().getSelected().get('PembiayaanList.bia_id');
												
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
													        url:urldelpembiayaan,
													        params : {id :aid},
															method: 'GET',
															success: function ( result, request ) { 
																	Ext.MessageBox.hide();
						
																	var jsonData = Ext.util.JSON.decode(result.responseText);
																 
																	Ext.MessageBox.alert('Information', jsonData.msg); 
																	PembiayaanStore.reload();
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
									id:'searchPembiayaanTxt',
								    text:'*',
							        emptyText:'*',
							        selectOnFocus:true,
									listeners: {
						              specialkey: function(f,e){
						                if (e.getKey() == e.ENTER) {
								                PembiayaanStore.load({params: {
													start: 0,
													limit: 20,
													 search:Ext.getCmp("searchPembiayaanTxt").getValue()
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
								  PembiayaanStore.load({params: {
									start: 0,
									limit: 20,
									 search:Ext.getCmp("searchPembiayaanTxt").getValue()
									 }})
						       
					        }
							}]
						
						})//end of grid
					
				
					
            });
        }
		 
        win2.show();
		PembiayaanStore.load({params:{start:0, limit:20, search:'*'}});
	 
	 
		 
		gridpembiayaan.on('rowdblclick',function(sm, rowindex, eventobject){
			 
			 mid=gridpembiayaan.getSelectionModel().getSelected().get("PembiayaanList.bia_id");
		 
			 MyDesktop.getSingleModule('entrypembiayaan-win').createWindow();
			 Ext.getCmp("entrypembiayaanform").getForm().loadRecord(gridpembiayaan.getSelectionModel().getSelected());
			 
			
		});
		 
		 
	}
}); 


MyDesktop.EntryPembiayaanForm = Ext.extend(Ext.app.Module, {
    id:'entrypembiayaan-win',
	title:'Pengeluaran Pembiayaan',
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
                height:300,
                iconCls: 'icon-form',
                animCollapse:false,
                constrainHeader:true,
				stripeRows: true,
				border:false,
               layout:'fit',
                items :
					[entrypembiayaanform = new Ext.FormPanel({
						id:'entrypembiayaanform',
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
												 name: 'data[Pembiayaan][bia_id]',
												 
												id:'bia_id1' 
												 
											},
											 
											{	 xtype:'textfield',
												fieldLabel: 'No Surat',
												name: 'data[Pembiayaan][bia_no]',
												maxLength:50,
												id:'bia_no1',
												 
												allowBlank:false 
												 
											},
											{	 xtype:'datefield',
												fieldLabel: 'Tanggal Surat',
												id:'bia_tgl1',
												name: 'data[Pembiayaan][bia_tgl]',
												maxLength:50, 
												format:'Y-m-d',
												value:new Date(),
												 
												 
												allowBlank:false
											},
											{	 xtype:'textfield',
												fieldLabel: 'No Nota Debit',
												name: 'data[Pembiayaan][bia_nonota]',
												maxLength:50,
												id:'bia_nonota1',
												 
												allowBlank:false 
												 
											},
											{	 xtype:'textfield',
												fieldLabel: 'No Perda',
												name: 'data[Pembiayaan][bia_noperda]',
												maxLength:50,
												id:'bia_noperda1',
												 
												allowBlank:false 
												 
											},
											
											{
						                        xtype : 'compositefield',
						                       anchor:'95%',
						                        msgTarget: 'side',
						                        fieldLabel: 'Kode Rekening',
						                        items : [ 
													new Ext.form.ComboBox({
									 						 id:'bia_akun_kode1',
															 store: AnggaranSearchStore,
															 hiddenName:'data[Pembiayaan][akun_kode]',
															 fieldLabel:' ',
															 displayField:'angg_kodeper',
															 typeAhead: false,
															 enableKeyEvents :true, 
															 valueField:'angg_kodeper',
															  triggerAction: 'all',
															 loadingText: 'Searching...',
															 minChars:0,
															 pageSize:20,
															 boxMinWidth: 80,
															 boxMinHeight: 100,
															 width:120,
															 hideTrigger:false,
															 forceSelection: true,
															 tpl:anggaranComboTpl,
															 allowBlank:false,
															 itemSelector: 'div.search-anggaran',
															 listeners: {
							  										select: function(thiscombo,record, index){
																		   Ext.getCmp('bia_akun_nama1').setValue(record.get('angg_namaper'));
																	 
																		 
																	}	
																}
															 
										
															 }),
													{	xtype:'textfield',
														id:'bia_akun_nama1',
														fieldLabel: '',
														name: 'data[Pembiayaan][akun_nama]',
														flex : 1,
														readOnly:true 
													}
													]
											} //end of composite
											,
											 {	 xtype:'numberfield',
												fieldLabel: 'Nilai',
												name: 'data[Pembiayaan][bia_nilai]',
												maxLength:20,
												id:'bia_nilai1',
												 
												allowBlank:false 
												 
											},
											
											{	 xtype:'datefield',
												fieldLabel: 'Tanggal SP2D',
												id:'bia_tgl2',
												name: 'data[Pembiayaan][bia_tglsp2d]',
												maxLength:50, 
												format:'Y-m-d',
												value:new Date(),
												 
												 
												allowBlank:false
											}
							 ]
							  
							  
				         ,
						 buttons: {
						 	layout: 'hbox',
							 defaults: {margins:'0 5 0 0'},
						 	items: [{
						 		text: 'Create New',
								id:'pembiayaan3-new',
								 
						 		iconCls: 'new',
						 		handler: function(){
						 			entrypembiayaanform.getForm().reset();
						 		  
						 			Ext.getCmp('bia_tgl1').setValue(new Date());
									Ext.getCmp('bia_tgl1').setReadOnly(false);
									Ext.getCmp('bia_id1').setValue(0);
								 
								 
									 
						 		}
						 	},{
										text:'Print',
										id:'print_pembiayaan',
										tooltip:'Print ',
										iconCls:'printer',
										handler:function(){
											aid=Ext.getCmp('bia_id1').getValue();
											aurl=HOST_PATH+'/rptpembiayaan/pembiayaan/'+aid;
											window.open(aurl,'_blank');
	
										}
								}, {
						 		xtype: 'spacer',
						 		flex: 1
						 	}, {
						 		text: 'Save',
						 		iconCls: 'save',
								id:'pembiayaan3-save',
								 
						 		handler: function(){
									hitungTotalPembiayaan();
						 			if (entrypembiayaanform.getForm().isValid()) {
						 				entrypembiayaanform.getForm().submit({
						 					url: urladdpembiayaan,
						 					waitMsg: 'Saving data...',
						 					success: function(form, action){
						 						newid = action.result.newid;
						 						newno = action.result.newno;
						 						if (newid != '') {
						 							//alert(newid);
														// Ext.getCmp('form_no').setValue(newid);
														// alert(newid);
														Ext.getCmp('bia_no1').setValue(newno);
														Ext.getCmp('bia_id1').setValue(newid)
														Ext.getCmp('bia_no1').setReadOnly(true);
													 
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
									id:'pembiayaan3-cancel',
									 
									margins:'0',
									handler: function(){
										PembiayaanStore.reload();
										MyDesktop.getSingleModule('entrypembiayaan-win').closeWindow();
										
										
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