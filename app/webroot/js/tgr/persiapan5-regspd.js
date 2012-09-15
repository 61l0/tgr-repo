var urladdregspd=HOST_PATH+'/regspd/add'; 
var  urlregspd=HOST_PATH+'/regspd/getall'; 
var urlgetspdcombo=HOST_PATH+'/spd/getforcombo'
 
var RegSpdJsonReader =  new Ext.data.JsonReader({
 
	remoteSort: false,
	root: 'regspds',
	totalProperty: 'total',
    idProperty: 'RegSpdList.rs_id',
	fields: [
		{name:'RegSpdList.rs_id'},
	 
		{name:'data[RegSpd][rs_id]',mapping:'RegSpdList.rs_id'},
		{name:'data[RegSpd][rs_no]',mapping:'RegSpdList.rs_no'},
		{name:'data[RegSpd][spdm_no]',mapping:'RegSpdList.spdm_no'},
		{name:'data[RegSpd][rs_tgl]',mapping:'RegSpdList.rs_tgl', type: 'date', dateFormat: 'Y-m-d'},
		{name:'data[RegSpd][un_id]',mapping:'RegSpdList.un_id'},
		{name:'data[RegSpd][un_kode]',mapping:'RegSpdList.un_kode'},
		{name:'data[RegSpd][un_nama]',mapping:'RegSpdList.un_nama'},
		{name:'data[RegSpd][rs_catatan]',mapping:'RegSpdList.rs_catatan'} 
	 
	]
	 
	 
});

var RegSpdStore = new Ext.data.GroupingStore({
  	reader:RegSpdJsonReader,
	groupField:'data[RegSpd][un_nama]',
	 remoteGroup:false,
	  groupOnSort: false,
	 
	proxy: new Ext.data.HttpProxy({
        url: urlregspd
    })
});


MyDesktop.EntryRegSPDForm = Ext.extend(Ext.app.Module, {
    id:'entryregspd-win',
	title:'Register SPD',
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
                width:400,
                height:300,
                iconCls: 'icon-form',
                animCollapse:false,
                constrainHeader:true,
				stripeRows: true,
				border:false,
                layout: 'fit',
                items :
					entryregspdform = new Ext.FormPanel({
						id:'entryregspdform',
				      	frame:true,
				      
				        bodyStyle:'padding:5px 5px 0',
				      
					    defaults: { anchor:'95%'},
						autoScroll :true,
				        defaultType: 'textfield',
				        items: [
							{
								xtype:'hidden',
								name:'data[RegSpd][rs_id]'
							},
							{
								//for add or edit
								xtype:'hidden',
								name:'data[RegSpd][rs_type]',
								id:'rs_type',
								value:'0'
							},
							{
				    			fieldLabel: 'No Register',
				                name: 'data[RegSpd][rs_no]',
								maxLength:50,
								
								allowBlank:false
					        },
					        {	 xtype:'datefield',
								fieldLabel: 'Tanggal',
							 
								name: 'data[RegSpd][rs_tgl]',
								maxLength:50, 
								format:'Y-m-d',
								value:new Date(),
						 		allowBlank:false
							},
							{
		                        xtype : 'compositefield',
		                       anchor:'95%',
		                        msgTarget: 'side',
		                        fieldLabel: 'SKPD',
		                        items : [ 
									new Ext.form.ComboBox({
					 						 id:'un_id3',
											 store: skpdSearchStore,
											 hiddenName:'data[RegSpd][un_id]',
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
														  
														 Ext.getCmp('un_nama3').setValue(record.get('un_nama'));
													 
														 combo=Ext.getCmp('rs_spdm_no1');
														 
													     combo.store.baseParams={un_id:record.get('un_id')};
					    	  							 combo.store.removeAll();
							 							 combo.lastQuery=null;
							 							 
													}	
												}
											 
						
											 }),
									{	xtype:'textfield',
										id:'un_nama3',
										fieldLabel: '',
										name: 'data[RegSpd][un_nama]',
										flex : 1,
										readOnly:true 
									}
									]
							}, //end of composite
							new Ext.form.ComboBox({
								 id:'rs_spdm_no1',
								 store: spdSearchStore,
								 hiddenName:'data[RegSpd][spdm_no]',
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
								 tpl:spdComboTpl,
								 allowBlank:false,
								 itemSelector: 'div.search-spd',
								 listeners: {
											select: function(thiscombo,record, index){
											 
										}	
									}
								 
							
								 }),
								 {
			                    fieldLabel: 'Catatan',
			                    xtype: 'textarea',
			                    name: 'data[RegSpd][rs_catatan]',
			                    height:80,
			                    maxLength:500,
			                    value: ''
								 } 
						 					
				        ],
						 buttons: [{
				            text: 'Save',
							id:'regpsd1-save',
							 
							handler:function(){
								 if (entryregspdform.getForm().isValid()) {
								 	entryregspdform.getForm().submit({
								 		url: urladdregspd,
								 		waitMsg: 'Menyimpan data...',
								 		success: function(form, action){
								 			
								 			//Ext.MessageBox.alert('Message', 'Data telah disimpan '+action.result.newid);
								 			Ext.MessageBox.alert('Message', 'Data telah disimpan');
								 			
											 MyDesktop.getSingleModule('entryregspd-win').closeWindow();
								 			 
								 		},
								 		failure: function(form, action){
								 			if (action.failureType === Ext.form.Action.CONNECT_FAILURE) {
						                        Ext.Msg.alert('Error',
						                            'Status:'+action.response.status+': '+
						                            action.response.statusText);
						                    }
						                    if (action.failureType === Ext.form.Action.SERVER_INVALID){
						                       
											    Ext.Msg.alert('Invalid', action.result.msg);
						                    }
								 		}
								 	});
								 }
								 else {
								 	Ext.MessageBox.alert('Input Validation Error', 'Please check your input, thank you');
								 }
							}
				        },{
				            text: 'Cancel',
							id:'regpsd1-cancel',
							 
							handler:function(){
							
								 MyDesktop.getSingleModule('entryregspd-win').closeWindow();
								 
								
							}	
							
				        }]
		   		 })
                 
            });
        }
	
        win7.show();
		 
		 
    }
});
MyDesktop.RegSPDGridWindow = Ext.extend(Ext.app.Module, {
    id:'regspdgrid-win',
   init : function(){
      this.launcher = {
            text: 'Register SPD',
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
                title:'Register SPD',
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
					gridregspd = new Ext.grid.GridPanel({
							id: 'gridregspd',
						 
							 store: RegSpdStore,
							trackMouseOver: true,
							disableSelection: false,
							loadMask: true,
							// grid columns
							columns: [ 
						  {
								header: "No",
								dataIndex: 'data[RegSpd][rs_no]',
								width: 100,
								sortable: true
							},
							{
								header: "Tanggal",
								dataIndex: 'data[RegSpd][rs_tgl]',
								width: 150,
								sortable: true,
								 renderer: function(date) { return date.format("d/m/Y"); }
						
							},
							  {
								header: "SKPD",
								dataIndex: 'data[RegSpd][un_nama]',
								width: 100,
								sortable: true
							},
							 {
								header: "No SPD",
								dataIndex: 'data[RegSpd][spdm_no]',
								width: 150,
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
											if (pv_regspd >= 1) {
												Ext.getCmp('editregspdbutt').enable();
												Ext.getCmp('applyregspdbutt').enable();
												
											}
										 	if (pv_regspd>=2)
											 Ext.getCmp('delregspdbutt').enable();
										 }
										else {
										 	Ext.getCmp('delregspdbutt').disable();
										 	Ext.getCmp('editregspdbutt').disable();
											Ext.getCmp('applyregspdbutt').disable();
										 	 
										}
									}
								}
							}),
							bbar: new Ext.PagingToolbar({
								pageSize: 20,
								 store: RegSpdStore,
								displayInfo: true,
								displayMsg: 'Displaying contents {0} - {1} of {2}',
								emptyMsg: "No Content to display",
								plugins: new Ext.ux.SlidingPager(),
								listeners :{
										'change' : function(){
										 RegSpdStore.baseParams={start:'start',limit:'limit',search:Ext.getCmp("searchRegSPDTxt").getValue()};
			    
										}
									}
									 
							}),
							tbar: [{
								text: 'Register SPD',
								iconCls: 'regspd',
								ref: '../regspdButton',
								
								menu: {
									xtype: 'menu',
									plain: true,
									items: [{
										text: 'Tambah',
										iconCls: 'add',
										handler: function(){
											 
											 MyDesktop.getSingleModule('entryregspd-win').createWindow();
											 Ext.getCmp('rs_type').setValue('0');
															 
										}
									} , {
										id: 'editregspdbutt',
										text: 'Ubah',
										iconCls: 'edit',
										disabled: true,
										handler: function(){
											 MyDesktop.getSingleModule('entryregspd-win').createWindow();
											 Ext.getCmp('rs_type').setValue('1');
										 
										}
									},{
											id: 'delregspdbutt',
											text: 'Hapus',
											iconCls: 'delete',
											disabled: true,
											handler: function(){
												 
												  aid=gridregspd.getSelectionModel().getSelected().get('RegSpdList.regspdm_id');
												
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
													        url:urldelregspdmaster,
													        params : {id :aid},
															method: 'GET',
															success: function ( result, request ) { 
																	Ext.MessageBox.hide();
						
																	var jsonData = Ext.util.JSON.decode(result.responseText);
																 
																	Ext.MessageBox.alert('Information', jsonData.msg); 
																	RegSpdStore.reload();
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
									id:'searchRegSPDTxt',
								    text:'*',
							        emptyText:'*',
							        selectOnFocus:true,
									listeners: {
						              specialkey: function(f,e){
						                if (e.getKey() == e.ENTER) {
								                RegSpdStore.load({params: {
													start: 0,
													limit: 20,
													 search:Ext.getCmp("searchRegSPDTxt").getValue()
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
								  RegSpdStore.load({params: {
									start: 0,
									limit: 20,
									 search:Ext.getCmp("searchRegSPDTxt").getValue()
									 }})
						       
					        }
							}]
						
						})//end of grid
					
				
					
            });
        }
		 
        win2.show();
		RegSpdStore.load({params:{start:0, limit:20, search:'*'}});
	 
	 
		 
		gridregspd.on('rowdblclick',function(sm, rowindex, eventobject){ 
			
			 
									 
			
		});
		 
		 
	}
}); 
