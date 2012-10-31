var urlaccbal=HOST_PATH+'/je/getbalance'; 
var urlbankbal=HOST_PATH+'/bank/getbalance'; 
var urlkasbal=HOST_PATH+'/kas/getbalance'; 
var urlsubkasbal=HOST_PATH+'/kas/getsubbalance'; 
Ext.namespace('Ext.bpptype');
//itm_type -> 0 =service, 1=stock,2=non_stock
Ext.bpptype.data = [
        ['1', 'BPP 1'],
        ['2', 'BPP 2'],
		['3', 'BPP 3'],
		['4', 'BPP 4'],
		['5', 'BPP 5']
    ];

var bpptypeStore = new Ext.data.ArrayStore({
    fields: ['id', 'name'],
    data : Ext.bpptype.data
});
var AccBalStoreJsonReader =  new Ext.data.JsonReader({
 
	remoteSort: false,
	root: 'data',
	totalProperty: 'total',
    idProperty: 'ab_id',
	fields: [
		{name:'ab_id'},
		{name:'ab_seq'},
		{name:'akun_kode'},
		{name:'akun_nama'},
		{name:'ab_action'},
		{name:'ab_debit'},
		{name:'ab_credit'},
		{name:'ab_balance'},
		{name:'ab_realdate', type: 'date', dateFormat: 'Y-m-d'},
		{name:'ab_refno'},
		{name:'ab_refname'},
		{name:'ab_desc'} 
	]
	 
	 
});
var AccBalStore = new Ext.data.Store({
  	reader:AccBalStoreJsonReader,
	 
	proxy: new Ext.data.HttpProxy({
        url: urlaccbal
    })
});
MyDesktop.AccBalGridWindow = Ext.extend(Ext.app.Module, {
    id:'accbalgrid-win',
   init : function(){
      this.launcher = {
            text: 'Saldo Akun',
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
                title:'Saldo Akun',
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
					gridaccbal = new Ext.grid.GridPanel({
							id: 'gridaccbal',
						 
							 store: AccBalStore,
							trackMouseOver: true,
							disableSelection: false,
							loadMask: true,
							// grid columns
							columns: [ 
							  {
								header: "No",
								dataIndex: 'ab_seq',
								width: 80,
								sortable: true
							},
							{
								header: "Tanggal",
								dataIndex: 'ab_realdate',
								width: 100,
								sortable: true,
								 renderer: function(date) { return date.format("d/m/Y"); }
						
							},
							 {
								header: "Description",
								dataIndex: 'ab_desc',
								width: 200,
								sortable: true
							},
							 
							{
								header: "Debet",
								dataIndex: 'ab_debit',
								width: 100,
								sortable: true ,
								 renderer: Ext.util.Format.numberRenderer('0,000.00')
							},
							
							 {
								header: "Kredit",
								dataIndex: 'ab_credit',
								width: 100,
								sortable: true  ,
								 renderer: Ext.util.Format.numberRenderer('0,000.00')
								 
						 	},
						 	
							 {
								header: "Saldo",
								dataIndex: 'ab_balance',
								width: 200,
								sortable: true,
								 renderer: Ext.util.Format.numberRenderer('0,000.00')
							},
							 {
								header: "No Ref.",
								dataIndex: 'ab_refno',
								width: 150,
								sortable: true 
							},
							 {
								header: "Nama Ref.",
								dataIndex: 'ab_refname',
								width: 150,
								sortable: true 
							}   
							  
							],
							 
							sm: new Ext.grid.RowSelectionModel({
								singleSelect: true,
								listeners: {
									 
								}
							}),
							bbar: new Ext.PagingToolbar({
								pageSize: 20,
								 store: AccBalStore,
								displayInfo: true,
								displayMsg: 'Displaying contents {0} - {1} of {2}',
								emptyMsg: "No Content to display",
								plugins: new Ext.ux.SlidingPager(),
								listeners :{
										'change' : function(){
											AccBalStore.baseParams={start:'start',limit:'limit',search:Ext.getCmp("acc_un_id1").getValue()};
			    
										}
									}
									 
							}),
							tbar: [
							       '->','Akun',
							       {
							    	    id:'acc_akun_kode1',
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
											select : function(){
												 AccBalStore.load({params: {
														start: 0,
														limit: 20,
														 un_id:Ext.getCmp("acc_un_id1").getValue(),
														 akun_kode:Ext.getCmp("acc_akun_kode1").getValue()
														 }})  
											}
										}
							       },'SKPD',
							new Ext.form.ComboBox({
								 id:'acc_un_id1',
								 store: skpdSearchStore,
								 
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
								 value:'*',
								 listeners: {
											select: function(thiscombo,record, index){
											   Ext.getCmp('acc_un_nama1').setValue(record.get('un_nama'));
											   AccBalStore.load({params: {
													start: 0,
													limit: 20,
													 un_id:Ext.getCmp("acc_un_id1").getValue(),
													 akun_kode:Ext.getCmp("acc_akun_kode1").getValue()
													 }})
										}	
									}
								 
							
								 }),
							{	xtype:'textfield',
							id:'acc_un_nama1',
							fieldLabel: '',
							 
							flex : 1,
							readOnly:true 
							},
							{
							 text:'Search',
				            tooltip:'Search Contents',
				            iconCls:'search',
							handler: function(){
								AccBalStore.load({params: {
									start: 0,
									limit: 20,
									 un_id:Ext.getCmp("acc_un_id1").getValue(),
									 akun_kode:Ext.getCmp("acc_akun_kode1").getValue()
									 }})
						       
					        }
							}]
						
						})//end of grid
					
				
					
            });
        }
		 
          win2.show();
          AccBalStore.load({params:{start:0, limit:20, search:'*'}});
	 
	  
		 
		 
	}
}); 
// saldo kas, berdasarkan SKPD sajah

var KasBalStoreJsonReader =  new Ext.data.JsonReader({
 
	remoteSort: false,
	root: 'data',
	totalProperty: 'total',
    idProperty: 'cb_id',
	fields: [
		{name:'cb_id'},
		{name:'cb_seq'},
		{name:'kas_kode'},
		{name:'kas_nama'},
		{name:'cb_action'},
		{name:'cb_debit'},
		{name:'cb_credit'},
		{name:'cb_balance'},
		{name:'cb_realdate', type: 'date', dateFormat: 'Y-m-d'},
		{name:'cb_refno'},
		{name:'cb_refname'},
		{name:'cb_desc'} 
	]
	 
	 
});
var KasBalStore = new Ext.data.Store({
  	reader:KasBalStoreJsonReader,
	 
	proxy: new Ext.data.HttpProxy({
        url: urlkasbal
    })
});
MyDesktop.KasBalGridWindow = Ext.extend(Ext.app.Module, {
    id:'kasbalgrid-win',
   init : function(){
      this.launcher = {
            text: 'Saldo Kas',
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
                title:'Saldo Kas',
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
					gridkasbal = new Ext.grid.GridPanel({
							id: 'gridkasbal',
						 
							 store: KasBalStore,
							trackMouseOver: true,
							disableSelection: false,
							loadMask: true,
							// grid columns
							columns: [ 
							  {
								header: "No",
								dataIndex: 'cb_seq',
								width: 80,
								sortable: true
							},
							{
								header: "Tanggal",
								dataIndex: 'cb_realdate',
								width: 100,
								sortable: true,
								 renderer: function(date) { return date.format("d/m/Y"); }
						
							},
							 {
								header: "Description",
								dataIndex: 'cb_desc',
								width: 200,
								sortable: true
							},
							 
							{
								header: "Debet",
								dataIndex: 'cb_debit',
								width: 100,
								sortable: true ,
								 renderer: Ext.util.Format.numberRenderer('0,000.00')
							},
							
							 {
								header: "Kredit",
								dataIndex: 'cb_credit',
								width: 100,
								sortable: true  ,
								 renderer: Ext.util.Format.numberRenderer('0,000.00')
								 
						 	},
						 	
							 {
								header: "Saldo",
								dataIndex: 'cb_balance',
								width: 200,
								sortable: true,
								 renderer: Ext.util.Format.numberRenderer('0,000.00')
							},
							 {
								header: "No Ref.",
								dataIndex: 'cb_refno',
								width: 150,
								sortable: true 
							},
							 {
								header: "Nama Ref.",
								dataIndex: 'cb_refname',
								width: 150,
								sortable: true 
							}   
							  
							],
							 
							sm: new Ext.grid.RowSelectionModel({
								singleSelect: true,
								listeners: {
									 
								}
							}),
							bbar: new Ext.PagingToolbar({
								pageSize: 20,
								 store: KasBalStore,
								displayInfo: true,
								displayMsg: 'Displaying contents {0} - {1} of {2}',
								emptyMsg: "No Content to display",
								plugins: new Ext.ux.SlidingPager(),
								listeners :{
										'change' : function(){
											KasBalStore.baseParams={start:'start',limit:'limit',un_id:Ext.getCmp("kas_un_id1").getValue()};
			    
										}
									}
									 
							}),
							tbar: [
							       '->',
							        'SKPD',
							new Ext.form.ComboBox({
								 id:'kas_un_id1',
								 store: skpdSearchStore,
								 
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
								 value:'*',
								 listeners: {
											select: function(thiscombo,record, index){
											   Ext.getCmp('kas_un_nama1').setValue(record.get('un_nama'));
											   KasBalStore.load({params: {
													start: 0,
													limit: 20,
													 un_id:Ext.getCmp("kas_un_id1").getValue() 
													 }})
										}	
									}
								 
							
								 }),
							{	xtype:'textfield',
							id:'kas_un_nama1',
							fieldLabel: '',
							 
							flex : 1,
							readOnly:true 
							},
							{
							 text:'Search',
				            tooltip:'Search Contents',
				            iconCls:'search',
							handler: function(){
								KasBalStore.load({params: {
									start: 0,
									limit: 20,
									 un_id:Ext.getCmp("kas_un_id1").getValue() 
									 }})
						       
					        }
							}]
						
						})//end of grid
					
				
					
            });
        }
		 
          win2.show();
          KasBalStore.load({params:{start:0, limit:20, search:'*'}});
	 
	  
		 
		 
	}
}); 
//BANK


var BankBalStoreJsonReader =  new Ext.data.JsonReader({
 
	remoteSort: false,
	root: 'data',
	totalProperty: 'total',
    idProperty: 'bb_id',
	fields: [
		{name:'bb_id'},
		{name:'bb_seq'},
		{name:'bank_kode'},
		{name:'bank_nama'},
		{name:'bb_action'},
		{name:'bb_debit'},
		{name:'bb_credit'},
		{name:'bb_balance'},
		{name:'bb_realdate', type: 'date', dateFormat: 'Y-m-d'},
		{name:'bb_refno'},
		{name:'bb_refname'},
		{name:'bb_desc'} 
	]
	 
	 
});
var BankBalStore = new Ext.data.Store({
  	reader:BankBalStoreJsonReader,
	 
	proxy: new Ext.data.HttpProxy({
        url: urlbankbal
    })
});
MyDesktop.BankBalGridWindow = Ext.extend(Ext.app.Module, {
    id:'bankbalgrid-win',
   init : function(){
      this.launcher = {
            text: 'Saldo Bank',
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
                title:'Saldo Bank',
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
					gridbankbal = new Ext.grid.GridPanel({
							id: 'gridbankbal',
						 
							 store: BankBalStore,
							trackMouseOver: true,
							disableSelection: false,
							loadMask: true,
							// grid columns
							columns: [ 
							  {
								header: "No",
								dataIndex: 'bb_seq',
								width: 80,
								sortable: true
							},
							{
								header: "Tanggal",
								dataIndex: 'bb_realdate',
								width: 100,
								sortable: true,
								 renderer: function(date) { return date.format("d/m/Y"); }
						
							},
							 {
								header: "Description",
								dataIndex: 'bb_desc',
								width: 200,
								sortable: true
							},
							 
							{
								header: "Debet",
								dataIndex: 'bb_debit',
								width: 100,
								sortable: true ,
								 renderer: Ext.util.Format.numberRenderer('0,000.00')
							},
							
							 {
								header: "Kredit",
								dataIndex: 'bb_credit',
								width: 100,
								sortable: true  ,
								 renderer: Ext.util.Format.numberRenderer('0,000.00')
								 
						 	},
						 	
							 {
								header: "Saldo",
								dataIndex: 'bb_balance',
								width: 200,
								sortable: true,
								 renderer: Ext.util.Format.numberRenderer('0,000.00')
							},
							 {
								header: "No Ref.",
								dataIndex: 'bb_refno',
								width: 150,
								sortable: true 
							},
							 {
								header: "Nama Ref.",
								dataIndex: 'bb_refname',
								width: 150,
								sortable: true 
							}   
							  
							],
							 
							sm: new Ext.grid.RowSelectionModel({
								singleSelect: true,
								listeners: {
									 
								}
							}),
							bbar: new Ext.PagingToolbar({
								pageSize: 20,
								 store: BankBalStore,
								displayInfo: true,
								displayMsg: 'Displaying contents {0} - {1} of {2}',
								emptyMsg: "No Content to display",
								plugins: new Ext.ux.SlidingPager(),
								listeners :{
										'change' : function(){
											BankBalStore.baseParams={start:'start',limit:'limit', un_id:Ext.getCmp("bank_un_id1").getValue()};
			    
										}
									}
									 
							}),
							tbar: [
							       '->',
							        'SKPD',
							new Ext.form.ComboBox({
								 id:'bank_un_id1',
								 store: skpdSearchStore,
								 
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
								 value:'*',
								 listeners: {
											select: function(thiscombo,record, index){
											   Ext.getCmp('bank_un_nama1').setValue(record.get('un_nama'));
											   BankBalStore.load({params: {
													start: 0,
													limit: 20,
													 un_id:Ext.getCmp("bank_un_id1").getValue() 
													 
													 }})
										}	
									}
								 
							
								 }),
							{	xtype:'textfield',
							id:'bank_un_nama1',
							fieldLabel: '',
							 
							flex : 1,
							readOnly:true 
							},
							{
							 text:'Search',
				            tooltip:'Search Contents',
				            iconCls:'search',
							handler: function(){
								BankBalStore.load({params: {
									start: 0,
									limit: 20,
									 un_id:Ext.getCmp("bank_un_id1").getValue() 
									 }})
						       
					        }
							}]
						
						})//end of grid
					
				
					
            });
        }
		 
          win2.show();
          BankBalStore.load({params:{start:0, limit:20, un_id:'*'}});
	 
	  
		 
		 
	}
}); 


//subkas


var SubKasBalStoreJsonReader =  new Ext.data.JsonReader({
 
	remoteSort: false,
	root: 'data',
	totalProperty: 'total',
    idProperty: 'cb_id',
	fields: [
		{name:'cb_id'},
		{name:'cb_seq'},
		{name:'kas_kode'},
		{name:'kas_nama'},
		{name:'cb_action'},
		{name:'cb_debit'},
		{name:'cb_credit'},
		{name:'cb_balance'},
		{name:'cb_realdate', type: 'date', dateFormat: 'Y-m-d'},
		{name:'cb_refno'},
		{name:'cb_refname'},
		{name:'cb_desc'} 
	]
	 
	 
});
var SubKasBalStore = new Ext.data.Store({
  	reader:SubKasBalStoreJsonReader,
	 
	proxy: new Ext.data.HttpProxy({
        url: urlsubkasbal
    })
});
MyDesktop.SubKasBalGridWindow = Ext.extend(Ext.app.Module, {
    id:'subkasbalgrid-win',
   init : function(){
      this.launcher = {
            text: 'Saldo Sub Kas',
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
                title:'Saldo Sub Kas',
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
					gridsubsubkasbal = new Ext.grid.GridPanel({
							id: 'gridsubsubkasbal',
						 
							 store: SubKasBalStore,
							trackMouseOver: true,
							disableSelection: false,
							loadMask: true,
							// grid columns
							columns: [ 
							  {
								header: "No",
								dataIndex: 'cb_seq',
								width: 80,
								sortable: true
							},
							{
								header: "Tanggal",
								dataIndex: 'cb_realdate',
								width: 100,
								sortable: true,
								 renderer: function(date) { return date.format("d/m/Y"); }
						
							},
							 {
								header: "Description",
								dataIndex: 'cb_desc',
								width: 200,
								sortable: true
							},
							 
							{
								header: "Debet",
								dataIndex: 'cb_debit',
								width: 100,
								sortable: true ,
								 renderer: Ext.util.Format.numberRenderer('0,000.00')
							},
							
							 {
								header: "Kredit",
								dataIndex: 'cb_credit',
								width: 100,
								sortable: true  ,
								 renderer: Ext.util.Format.numberRenderer('0,000.00')
								 
						 	},
						 	
							 {
								header: "Saldo",
								dataIndex: 'cb_balance',
								width: 200,
								sortable: true,
								 renderer: Ext.util.Format.numberRenderer('0,000.00')
							},
							 {
								header: "No Ref.",
								dataIndex: 'cb_refno',
								width: 150,
								sortable: true 
							},
							 {
								header: "Nama Ref.",
								dataIndex: 'cb_refname',
								width: 150,
								sortable: true 
							}   
							  
							],
							 
							sm: new Ext.grid.RowSelectionModel({
								singleSelect: true,
								listeners: {
									 
								}
							}),
							bbar: new Ext.PagingToolbar({
								pageSize: 20,
								 store: SubKasBalStore,
								displayInfo: true,
								displayMsg: 'Displaying contents {0} - {1} of {2}',
								emptyMsg: "No Content to display",
								plugins: new Ext.ux.SlidingPager(),
								listeners :{
										'change' : function(){
											SubKasBalStore.baseParams={start:'start',limit:'limit',un_id:Ext.getCmp("subkas_un_id1").getValue()};
			    
										}
									}
									 
							}),
							tbar: [
							       '->',
							        'SKPD : ',
							new Ext.form.ComboBox({
								 id:'subkas_un_id1',
								 store: skpdSearchStore,
								 
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
								 value:'*',
								 listeners: {
											select: function(thiscombo,record, index){
											   Ext.getCmp('subkas_un_nama1').setValue(record.get('un_nama'));
											   SubKasBalStore.load({params: {
													start: 0,
													limit: 20,
													 un_id:Ext.getCmp("subkas_un_id1").getValue(),
													 bpp:Ext.getCmp("subkas_bpp1").getValue() 
												}})
										}	
									}
								 
							
								 }),
							{	xtype:'textfield',
							id:'subkas_un_nama1',
							fieldLabel: '',
							 
							flex : 1,
							readOnly:true 
							},'BPP : ',
							new Ext.form.ComboBox({
					 						 id:'subkas_bpp1',
											 store: bendaSearchStore,
											 fieldLabel:'Bendahara Pengeluaran',
											 displayField:'pn_nip',
											 typeAhead: false,
											 enableKeyEvents :true, 
											 valueField:'pn_nip',
											  triggerAction: 'all',
											 loadingText: 'Searching...',
											 minChars:0,
											 pageSize:20,
											 boxMinWidth: 80,
											 boxMinHeight: 100,
											 width:120,
											 hideTrigger:false,
											 forceSelection: true,
											 tpl:bendaComboTpl,
											 allowBlank:false,
											 itemSelector: 'div.search-benda',
											 listeners: {
			 
													 
													select: function(thiscombo,record, index){
														  
														 Ext.getCmp('subkas_bppnama1').setValue(record.get('pn_nama'));
														 SubKasBalStore.load({params: {
																		start: 0,
																		limit: 20,
																		 un_id:Ext.getCmp("subkas_un_id1").getValue(),
																		 bpp:Ext.getCmp("subkas_bpp1").getValue() 
																	}})
													}	
												}
											 
						
											 }),
									{	xtype:'textfield',
										id:'subkas_bppnama1',
										fieldLabel: '',
										
										readOnly:true 
									},
								   
							{
							 text:'Search',
				            tooltip:'Search Contents',
				            iconCls:'search',
							handler: function(){
								SubKasBalStore.load({params: {
									start: 0,
									limit: 20,
									 un_id:Ext.getCmp("subkas_un_id1").getValue(),
									  bpp:Ext.getCmp("subkas_bpp1").getValue() 
									 }})
						       
					        }
							}]
						
						})//end of grid
					
				
					
            });
        }
		 
          win2.show();
          SubKasBalStore.load({params:{start:0, limit:20, un_id:'*',bpp:'*'}});
	 
	  
		 
		 
	}
}); 
 