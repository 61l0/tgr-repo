/* PELIMPAHAN UP */
var  urllimpahup=HOST_PATH+'/limpahup/getall'; 
var urladdlimpahup=HOST_PATH+'/limpahup/add';
 

Ext.namespace('Ext.limpahke');
//itm_type -> 0 =service, 1=stock,2=non_stock
Ext.limpahke.data = [
        ['BPP1', 'Bendahara Pengeluaran Pembantu 1'],
        ['BPP2', 'Bendahara Pengeluaran Pembantu 2'],
		['BPP3', 'Bendahara Pengeluaran Pembantu 3'],
		['BPP4', 'Bendahara Pengeluaran Pembantu 4'],
		['BPP5', 'Bendahara Pengeluaran Pembantu 5']
    ];

var limpahkeStore = new Ext.data.ArrayStore({
    fields: ['id', 'name'],
    data : Ext.limpahke.data
});
var LimpahUpJsonReader =  new Ext.data.JsonReader({
 
	remoteSort: false,
	root: 'limpahup',
	totalProperty: 'total',
    idProperty: 'LimpahUpList.lu_id',
	fields: [
		{name:'LimpahUpList.lu_id'},
	 
		 
		{name:'data[LimpahUp][lu_id]',mapping:'LimpahUpList.lu_id'},
		{name:'data[LimpahUp][lu_no]',mapping:'LimpahUpList.lu_no'},
		{name:'data[LimpahUp][lu_tgl]',mapping:'LimpahUpList.lu_tgl', type: 'date', dateFormat: 'Y-m-d'},
		{name:'data[LimpahUp][un_id]',mapping:'LimpahUpList.un_id'},
		{name:'data[LimpahUp][un_kode]',mapping:'LimpahUpList.un_kode'},
		{name:'data[LimpahUp][un_nama]',mapping:'LimpahUpList.un_nama'},
		{name:'data[LimpahUp][lu_tahun]',mapping:'LimpahUpList.lu_tahun'}, 
		{name:'data[LimpahUp][lu_ke]',mapping:'LimpahUpList.lu_ke'},  
	 
		{name:'data[LimpahUp][lu_nilai]',mapping:'LimpahUpList.lu_nilai'} 
	]
	 
	 
});
function hitungTotalLimpahUp(){
	 
}
function proc_limpahup2(o){ 
	 
}
function proc_limpahup1(o){ 
 
}
var LimpahUpStore = new Ext.data.GroupingStore({
  	reader:LimpahUpJsonReader,
	groupField:'data[LimpahUp][un_nama]',
	 remoteGroup:false,
	  groupOnSort: false,
	 
	proxy: new Ext.data.HttpProxy({
        url: urllimpahup
    })
});


 
 
MyDesktop.LimpahUpGridWindow = Ext.extend(Ext.app.Module, {
    id:'limpahupgrid-win',
   init : function(){
      this.launcher = {
            text: 'Daftar Pelimpahan UP',
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
                title:'Daftar Pelimpahan UP',
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
					gridlimpahup = new Ext.grid.GridPanel({
							id: 'gridlimpahup',
						 
							 store: LimpahUpStore,
							trackMouseOver: true,
							disableSelection: false,
							loadMask: true,
							// grid columns
							columns: [ 
							  {
								header: "No",
								dataIndex: 'data[LimpahUp][lu_no]',
								width: 100,
								sortable: true
							},
							{
								header: "Tanggal",
								dataIndex: 'data[LimpahUp][lu_tgl]',
								width: 150,
								sortable: true,
								 renderer: function(date) { return date.format("d/m/Y"); }
						
							},
							 {
								header: "SPKD",
								dataIndex: 'data[LimpahUp][un_nama]',
								width: 150,
								sortable: true
							},
							 
							{
								header: "Tahun",
								dataIndex: 'data[LimpahUp][lu_tahun]',
								width: 50,
								sortable: true
							},
							{
								header: "Kepada",
								dataIndex: 'data[LimpahUp][lu_ke]',
								width: 50,
								sortable: true
							},
							{
								header: "Nilai",
								dataIndex: 'data[LimpahUp][lu_nilai]',
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
											 
												Ext.getCmp('editlimpahupbutt').enable();
											 
											 Ext.getCmp('dellimpahupbutt').enable();
										 }
										else {
										 	Ext.getCmp('dellimpahupbutt').disable();
										 	Ext.getCmp('editlimpahupbutt').disable();
											 
										 	 
										}
									}
								}
							}),
							bbar: new Ext.PagingToolbar({
								pageSize: 20,
								 store: LimpahUpStore,
								displayInfo: true,
								displayMsg: 'Displaying contents {0} - {1} of {2}',
								emptyMsg: "No Content to display",
								plugins: new Ext.ux.SlidingPager(),
								listeners :{
										'change' : function(){
										 LimpahUpStore.baseParams={start:'start',limit:'limit',search:Ext.getCmp("searchLimpahUpTxt").getValue()};
			    
										}
									}
									 
							}),
							tbar: [{
								text: 'Daftar LimpahUp',
								iconCls: 'limpahup',
								ref: '../limpahupButton',
								
								menu: {
									xtype: 'menu',
									plain: true,
									items: [{
										text: 'Tambah',
										iconCls: 'add',
										handler: function(){
											 
											 MyDesktop.getSingleModule('entrylimpahup-win').createWindow();
											 entrylimpahupform.getForm().reset();
									 			 
									 		 
									 			Ext.getCmp('lu_tgl1').setValue(new Date());
												Ext.getCmp('lu_tgl1').setReadOnly(false);
												Ext.getCmp('lu_id1').setValue(0);
											 
												Ext.getCmp('limpahup_un_id1').enable();
															 
										}
									   } , {
										id: 'editlimpahupbutt',
										text: 'Ubah',
										iconCls: 'edit',
										disabled: true,
										handler: function(){
										 	 mid=gridlimpahup.getSelectionModel().getSelected().get("LimpahUpList.lu_id");
										 	 
											 MyDesktop.getSingleModule('entrylimpahup-win').createWindow();
											 Ext.getCmp("entrylimpahupform").getForm().loadRecord(gridlimpahup.getSelectionModel().getSelected());
										}
									},{
											id: 'dellimpahupbutt',
											text: 'Hapus',
											iconCls: 'delete',
											disabled: true,
											handler: function(){
											 
												  aid=gridlimpahup.getSelectionModel().getSelected().get('LimpahUpList.lu_id');
												
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
													        url:urldellimpahup,
													        params : {id :aid},
															method: 'GET',
															success: function ( result, request ) { 
																	Ext.MessageBox.hide();
						
																	var jsonData = Ext.util.JSON.decode(result.responseText);
																 
																	Ext.MessageBox.alert('Information', jsonData.msg); 
																	LimpahUpStore.reload();
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
									id:'searchLimpahUpTxt',
								    text:'*',
							        emptyText:'*',
							        selectOnFocus:true,
									listeners: {
						              specialkey: function(f,e){
						                if (e.getKey() == e.ENTER) {
								                LimpahUpStore.load({params: {
													start: 0,
													limit: 20,
													 search:Ext.getCmp("searchLimpahUpTxt").getValue()
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
								  LimpahUpStore.load({params: {
									start: 0,
									limit: 20,
									 search:Ext.getCmp("searchLimpahUpTxt").getValue()
									 }})
						       
					        }
							}]
						
						})//end of grid
					
				
					
            });
        }
		 
        win2.show();
		LimpahUpStore.load({params:{start:0, limit:20, search:'*'}});
	 
	 
		 
		gridlimpahup.on('rowdblclick',function(sm, rowindex, eventobject){
			 
			 mid=gridlimpahup.getSelectionModel().getSelected().get("LimpahUpList.lu_id");
		 
			 MyDesktop.getSingleModule('entrylimpahup-win').createWindow();
			 Ext.getCmp("entrylimpahupform").getForm().loadRecord(gridlimpahup.getSelectionModel().getSelected());
			 
			
		});
		 
		 
	}
}); 


MyDesktop.EntryLimpahUpForm = Ext.extend(Ext.app.Module, {
    id:'entrylimpahup-win',
	title:'Pelimpahan UP',
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
					[entrylimpahupform = new Ext.FormPanel({
						id:'entrylimpahupform',
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
												 name: 'data[LimpahUp][lu_id]',
												 
												id:'lu_id1' 
												 
											},
											 
											{	 xtype:'textfield',
												fieldLabel: 'No Surat',
												name: 'data[LimpahUp][lu_no]',
												maxLength:50,
												id:'lu_no1',
												 
												allowBlank:false 
												 
											},
											{	 xtype:'datefield',
												fieldLabel: 'Tanggal',
												id:'lu_tgl1',
												name: 'data[LimpahUp][lu_tgl]',
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
									 						 id:'limpahup_un_id1',
															 store: skpdSearchStore,
															 hiddenName:'data[LimpahUp][un_id]',
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
																		   Ext.getCmp('limpahup_un_nama1').setValue(record.get('un_nama'));
																	  
																	}	
																}
															 
										
															 }),
													{	xtype:'textfield',
														id:'limpahup_un_nama1',
														fieldLabel: '',
														name: 'data[LimpahUp][un_nama]',
														flex : 1,
														readOnly:true 
													}
													]
											} //end of composite
											,
											new Ext.form.ComboBox({
						 						 
												 store: limpahkeStore,
												 hiddenName:'data[LimpahUp][lu_ke]',
												 fieldLabel:'Pelimpahan Ke',
												 displayField:'name',
												 typeAhead: false,
												 enableKeyEvents :true, 
												 valueField:'id',
												 mode:'local',
												 triggerAction: 'all',
												 loadingText: 'Searching...',
												 minChars:0,
												 pageSize:20,
												 boxMinWidth: 80,
												 boxMinHeight: 100,
												 width:120,
												 hideTrigger:false,
												 forceSelection: true,
												 
												 allowBlank:false 
											})
											,{	 xtype:'numberfield',
												fieldLabel: 'Nilai',
												name: 'data[LimpahUp][lu_nilai]',
												maxLength:20,
												id:'lu_nilai1',
												 
												allowBlank:false 
												 
											} 
							 ]
							  
							  
				         ,
						 buttons: {
						 	layout: 'hbox',
							 defaults: {margins:'0 5 0 0'},
						 	items: [{
						 		text: 'Create New',
								id:'limpahup3-new',
								 
						 		iconCls: 'new',
						 		handler: function(){
						 			entrylimpahupform.getForm().reset();
						 		  
						 			Ext.getCmp('lu_tgl1').setValue(new Date());
									Ext.getCmp('lu_tgl1').setReadOnly(false);
									Ext.getCmp('lu_id1').setValue(0);
								 
									Ext.getCmp('limpahup_un_id1').enable();
									 
						 		}
						 	},{
										text:'Print',
										id:'print_limpahup',
										tooltip:'Print ',
										iconCls:'printer',
										handler:function(){
											aid=Ext.getCmp('lu_id1').getValue();
											aurl=HOST_PATH+'/rptlimpahup/limpahup/'+aid;
											window.open(aurl,'_blank');
	
										}
								}, {
						 		xtype: 'spacer',
						 		flex: 1
						 	}, {
						 		text: 'Save',
						 		iconCls: 'save',
								id:'limpahup3-save',
								 
						 		handler: function(){
									hitungTotalLimpahUp();
						 			if (entrylimpahupform.getForm().isValid()) {
						 				entrylimpahupform.getForm().submit({
						 					url: urladdlimpahup,
						 					waitMsg: 'Saving data...',
						 					success: function(form, action){
						 						newid = action.result.newid;
						 						newno = action.result.newno;
						 						if (newid != '') {
						 							//alert(newid);
														// Ext.getCmp('form_no').setValue(newid);
														// alert(newid);
														Ext.getCmp('lu_no1').setValue(newno);
														Ext.getCmp('lu_id1').setValue(newid)
														Ext.getCmp('lu_no1').setReadOnly(true);
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
									id:'limpahup3-cancel',
									 
									margins:'0',
									handler: function(){
										LimpahUpStore.reload();
										MyDesktop.getSingleModule('entrylimpahup-win').closeWindow();
										
										
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