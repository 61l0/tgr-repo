/* GESER KAS */
var  urlgeserkas=HOST_PATH+'/geserkas/getall'; 
var urladdgeserkas=HOST_PATH+'/geserkas/add';
var urlgetdpadetailbyun=HOST_PATH+'/dpa/readdetailbyun';
 
var GeserKasJsonReader =  new Ext.data.JsonReader({
 
	remoteSort: false,
	root: 'geserkas',
	totalProperty: 'total',
    idProperty: 'GeserKasList.gk_id',
	fields: [
		{name:'GeserKasList.gk_id'},
	 
		 
		{name:'data[GeserKass][gk_id]',mapping:'GeserKasList.gk_id'},
		{name:'data[GeserKass][gk_no]',mapping:'GeserKasList.gk_no'},
		{name:'data[GeserKass][gk_tgl]',mapping:'GeserKasList.gk_tgl', type: 'date', dateFormat: 'Y-m-d'},
		{name:'data[GeserKass][un_id]',mapping:'GeserKasList.un_id'},
		{name:'data[GeserKass][un_kode]',mapping:'GeserKasList.un_kode'},
		{name:'data[GeserKass][un_nama]',mapping:'GeserKasList.un_nama'},
		{name:'data[GeserKass][gk_tahun]',mapping:'GeserKasList.gk_tahun'}, 
		{name:'data[GeserKass][gk_tipe]',mapping:'GeserKasList.gk_tipe'},
		{name:'gk_tipe',mapping:'GeserKasList.gk_tipe'},
		{name:'data[GeserKass][gk_nilai]',mapping:'GeserKasList.gk_nilai'} 
	]
	 
	 
});
function hitungTotalGeserKas(){
	 
}
function proc_geserkas2(o){ 
	 
}
function proc_geserkas1(o){ 
 
}
var GeserKasStore = new Ext.data.GroupingStore({
  	reader:GeserKasJsonReader,
	groupField:'data[GeserKass][un_nama]',
	 remoteGroup:false,
	  groupOnSort: false,
	 
	proxy: new Ext.data.HttpProxy({
        url: urlgeserkas
    })
});


 
 
MyDesktop.GeserKasGridWindow = Ext.extend(Ext.app.Module, {
    id:'geserkasgrid-win',
   init : function(){
      this.launcher = {
            text: 'Daftar Pergeseran Kas',
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
                title:'Daftar Pergeseran Kas',
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
					gridgeserkas = new Ext.grid.GridPanel({
							id: 'gridgeserkas',
						 
							 store: GeserKasStore,
							trackMouseOver: true,
							disableSelection: false,
							loadMask: true,
							// grid columns
							columns: [ 
							  {
								header: "No",
								dataIndex: 'data[GeserKass][gk_no]',
								width: 100,
								sortable: true
							},
							{
								header: "Tanggal",
								dataIndex: 'data[GeserKass][gk_tgl]',
								width: 150,
								sortable: true,
								 renderer: function(date) { return date.format("d/m/Y"); }
						
							},
							 {
								header: "SPKD",
								dataIndex: 'data[GeserKass][un_nama]',
								width: 150,
								sortable: true
							},
							 
							{
								header: "Tahun",
								dataIndex: 'data[GeserKass][gk_tahun]',
								width: 50,
								sortable: true
							},
							{
								header: "Tipe",
								dataIndex: 'data[GeserKass][gk_tipe]',
								width: 50,
								sortable: true
							},
							{
								header: "Nilai",
								dataIndex: 'data[GeserKass][gk_nilai]',
								width: 120,
								sortable: true,
								align: 'right',
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
											 
												Ext.getCmp('editgeserkasbutt').enable();
											 
											 Ext.getCmp('delgeserkasbutt').enable();
										 }
										else {
										 	Ext.getCmp('delgeserkasbutt').disable();
										 	Ext.getCmp('editgeserkasbutt').disable();
											 
										 	 
										}
									}
								}
							}),
							bbar: new Ext.PagingToolbar({
								pageSize: 20,
								 store: GeserKasStore,
								displayInfo: true,
								displayMsg: 'Displaying contents {0} - {1} of {2}',
								emptyMsg: "No Content to display",
								plugins: new Ext.ux.SlidingPager(),
								listeners :{
										'change' : function(){
										 GeserKasStore.baseParams={start:'start',limit:'limit',search:Ext.getCmp("searchGeserKasTxt").getValue()};
			    
										}
									}
									 
							}),
							tbar: [{
								text: 'Daftar GeserKas',
								iconCls: 'geserkas',
								ref: '../geserkasButton',
								
								menu: {
									xtype: 'menu',
									plain: true,
									items: [{
										text: 'Tambah',
										iconCls: 'add',
										handler: function(){
											 
											 MyDesktop.getSingleModule('entrygeserkas-win').createWindow();
											 entrygeserkasform.getForm().reset();
									 			 
									 			GeserKasDetail2Store.load({
									 				params: {
									 					gk_id: 0
									 				}
									 			});
												GeserKasDetail1Store.load({
									 				params: {
									 					gk_id: 0
									 				}
									 			});
									 			Ext.getCmp('gk_tgl1').setValue(new Date());
												Ext.getCmp('gk_tgl1').setReadOnly(false);
												Ext.getCmp('gk_id1').setValue(0);
											 
												Ext.getCmp('geserkas_un_id1').enable();
															 
										}
									   } , {
										id: 'editgeserkasbutt',
										text: 'Ubah',
										iconCls: 'edit',
										disabled: true,
										handler: function(){
										 	 mid=gridgeserkas.getSelectionModel().getSelected().get("GeserKasList.gk_id");
										 	 
											 MyDesktop.getSingleModule('entrygeserkas-win').createWindow();
											 Ext.getCmp("entrygeserkasform").getForm().loadRecord(gridgeserkas.getSelectionModel().getSelected());
										}
									},{
											id: 'delgeserkasbutt',
											text: 'Hapus',
											iconCls: 'delete',
											disabled: true,
											handler: function(){
											 
												  aid=gridgeserkas.getSelectionModel().getSelected().get('GeserKasList.gk_id');
												
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
													        url:urldelgeserkas,
													        params : {id :aid},
															method: 'GET',
															success: function ( result, request ) { 
																	Ext.MessageBox.hide();
						
																	var jsonData = Ext.util.JSON.decode(result.responseText);
																 
																	Ext.MessageBox.alert('Information', jsonData.msg); 
																	GeserKasStore.reload();
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
									id:'searchGeserKasTxt',
								    text:'*',
							        emptyText:'*',
							        selectOnFocus:true,
									listeners: {
						              specialkey: function(f,e){
						                if (e.getKey() == e.ENTER) {
								                GeserKasStore.load({params: {
													start: 0,
													limit: 20,
													 search:Ext.getCmp("searchGeserKasTxt").getValue()
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
								  GeserKasStore.load({params: {
									start: 0,
									limit: 20,
									 search:Ext.getCmp("searchGeserKasTxt").getValue()
									 }})
						       
					        }
							}]
						
						})//end of grid
					
				
					
            });
        }
		 
        win2.show();
		GeserKasStore.load({params:{start:0, limit:20, search:'*'}});
	 
	 
		 
		gridgeserkas.on('rowdblclick',function(sm, rowindex, eventobject){
			 
			 mid=gridgeserkas.getSelectionModel().getSelected().get("GeserKasList.gk_id");
		 
			 MyDesktop.getSingleModule('entrygeserkas-win').createWindow();
			 Ext.getCmp("entrygeserkasform").getForm().loadRecord(gridgeserkas.getSelectionModel().getSelected());
			 
			
		});
		 
		 
	}
}); 


MyDesktop.EntryGeserKasForm = Ext.extend(Ext.app.Module, {
    id:'entrygeserkas-win',
	title:'Pergeseran Kas',
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
                height:250,
                iconCls: 'icon-form',
                animCollapse:false,
                constrainHeader:true,
				stripeRows: true,
				border:false,
               layout:'fit',
                items :
					[entrygeserkasform = new Ext.FormPanel({
						id:'entrygeserkasform',
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
												 name: 'data[GeserKass][gk_id]',
												 
												id:'gk_id1' 
												 
											},
											 
											{	 xtype:'textfield',
												fieldLabel: 'No Surat',
												name: 'data[GeserKass][gk_no]',
												maxLength:50,
												id:'gk_no1',
												 
												allowBlank:false 
												 
											},
											{	 xtype:'datefield',
												fieldLabel: 'Tanggal',
												id:'gk_tgl1',
												name: 'data[GeserKass][gk_tgl]',
												maxLength:50, 
												format:'Y-m-d',
												value:new Date(),
												 
												 
												allowBlank:false
											} ,
											{
						                        xtype : 'compositefield',
						                       anchor:'95%',
						                        msgTarget: 'side',
						                        fieldLabel: 'SKPD',
						                        items : [ 
													new Ext.form.ComboBox({
									 						 id:'geserkas_un_id1',
															 store: skpdSearchStore,
															 hiddenName:'data[GeserKass][un_id]',
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
																		   Ext.getCmp('geserkas_un_nama1').setValue(record.get('un_nama'));
																	  
																	}	
																}
															 
										
															 }),
													{	xtype:'textfield',
														id:'geserkas_un_nama1',
														fieldLabel: '',
														name: 'data[GeserKass][un_nama]',
														flex : 1,
														readOnly:true 
													}
													]
											} //end of composite
											,{	 xtype:'numberfield',
												fieldLabel: 'Nilai',
												name: 'data[GeserKass][gk_nilai]',
												maxLength:20,
												id:'gk_nilai1',
												 
												allowBlank:false 
												 
											},
											{ xtype: 'radiogroup',
												layout:'column',
												fieldLabel: 'Pergeseran Dari',
												 columns:2,
												  value:0,
												vertical: true,
												 items: [  {
															inputValue: 0,
															
															name: 'gk_tipe',
															boxLabel: 'Bank Ke Kas'
														}, {
															inputValue: 1,
															name: 'gk_tipe',
															boxLabel: 'Kas Ke Bank'
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
								id:'geserkas3-new',
								 
						 		iconCls: 'new',
						 		handler: function(){
						 			entrygeserkasform.getForm().reset();
						 		  
						 			Ext.getCmp('gk_tgl1').setValue(new Date());
									Ext.getCmp('gk_tgl1').setReadOnly(false);
									Ext.getCmp('gk_id1').setValue(0);
								 
									Ext.getCmp('geserkas_un_id1').enable();
									 
						 		}
						 	},{
										text:'Print',
										id:'print_geserkas',
										tooltip:'Print ',
										iconCls:'printer',
										handler:function(){
											aid=Ext.getCmp('gk_id1').getValue();
											aurl=HOST_PATH+'/rptgeserkas/geserkas/'+aid;
											window.open(aurl,'_blank');
	
										}
								}, {
						 		xtype: 'spacer',
						 		flex: 1
						 	}, {
						 		text: 'Save',
						 		iconCls: 'save',
								id:'geserkas3-save',
								 
						 		handler: function(){
									hitungTotalGeserKas();
						 			if (entrygeserkasform.getForm().isValid()) {
						 				entrygeserkasform.getForm().submit({
						 					url: urladdgeserkas,
						 					waitMsg: 'Saving data...',
						 					success: function(form, action){
						 						newid = action.result.newid;
						 						newno = action.result.newno;
						 						if (newid != '') {
						 							//alert(newid);
														// Ext.getCmp('form_no').setValue(newid);
														// alert(newid);
														Ext.getCmp('gk_no1').setValue(newno);
														Ext.getCmp('gk_id1').setValue(newid)
														Ext.getCmp('gk_no1').setReadOnly(true);
													 
														 
														
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
									id:'geserkas3-cancel',
									 
									margins:'0',
									handler: function(){
										GeserKasStore.reload();
										MyDesktop.getSingleModule('entrygeserkas-win').closeWindow();
										
										
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