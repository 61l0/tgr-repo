var urladdsp2dmaster=HOST_PATH+'/sp2d/add'; 
var urlsp2d=HOST_PATH+'/sp2d/getall'; 
var urlgetbebanbyno=HOST_PATH+'/spm/readdetail_3_byno'; 
var urlgetpotongan2=HOST_PATH+'/spm/readdetail_1_byno'; 
var urlgetpajak2=HOST_PATH+'/spm/readdetail_2_byno'; 
var detailPotongan2Store = new Ext.data.Store({
    proxy: new Ext.data.HttpProxy({
        url: urlgetpotongan2
    }),
    reader: new Ext.data.JsonReader({
        root: 'data',
        totalProperty: 'total',
        id: 'ptg_kode',
    fields : [
        	{name: 'ptg_kode'},
	 
	{name: 'ptg_nama'} 
	 
       
        
    ]
    }),
    listeners : {
    	load : function (thistore,recordlist,object){
    	 
 
    		for (i=0;i<recordlist.length;i++){
    		abc = new sp2ddPotStore.recordType({
					sp2dd_id: 0,
					sppm_id: '',
				  
					ptg_kode:recordlist[i].get('ptg_kode'),
					 
					sp2dd_nilai:0
				 
			
			});
		 
			sp2ddPotStore.add(abc);
    		}
    		Ext.MessageBox.hide();
    		 
    	}
    }
    
});

var detailPajak2Store = new Ext.data.Store({
    proxy: new Ext.data.HttpProxy({
        url: urlgetpajak2
    }),
    reader: new Ext.data.JsonReader({
        root: 'data',
        totalProperty: 'total',
        id: 'pjk_kode',
    fields : [
        	{name: 'pjk_kode'},
	 
	{name: 'pjk_nama'} 
	 
       
        
    ]
    }),
    listeners : {
    	load : function (thistore,recordlist,object){
    	 
 
    		for (i=0;i<recordlist.length;i++){
    		abc = new sp2ddPajakStore.recordType({
					sp2dd_id: 0,
					sppm_id: '',
				 	 
					pjk_kode:recordlist[i].get('pjk_kode'),
					 
					sp2dd_nilai:0
				 
			
			});
		 
			sp2ddPajakStore.add(abc);
    		}
    		Ext.MessageBox.hide();
    		 
    	}
    }
    
});
var detailBeban2Store = new Ext.data.Store({
    proxy: new Ext.data.HttpProxy({
        url: urlgetbebanbyno
    }),
    reader: new Ext.data.JsonReader({
        root: 'data',
        totalProperty: 'total',
        id: 'sppd_id',
    fields : [
        	{name: 'sppd_id'},
	 
	{name: 'akun_kode'},
	{name: 'akun_nama'},
	{name: 'spmd_nilai'} 
	 
       
        
    ]
    }),
    listeners : {
    	load : function (thistore,recordlist,object){
    	 
 
    		for (i=0;i<recordlist.length;i++){
    		 
    		abc = new sp2ddBebanStore.recordType({
					sp2dd_id: 0,
					sppm_id: '',
				 	sp2dd_ket:'',
					akun_kode:recordlist[i].get('akun_kode'),
					akun_nama:recordlist[i].get('akun_nama'),
					 
					sp2dd_nilai:recordlist[i].get('spmd_nilai') 
				 
			
			});
		 
			sp2ddBebanStore.add(abc);
    		}
    		Ext.MessageBox.hide();
    		 
    	}
    }
    
});
function proc_sp2dpot(){
	tot=0; 
	 
		for (i=0;i<sp2ddPotStore.getCount();i++){
		  if (sp2ddPotStore.getAt(i).get('sp2dd_nilai')>0)
		 	 tot=tot+parseFloat(sp2ddPotStore.getAt(i).get('sp2dd_nilai'));
		  
		}
		 
		 
	 Ext.getCmp('sp2dm_pot1').setValue(tot); 
}
function proc_sp2dpajak(){
	tot=0; 
	 
		for (i=0;i<sp2ddPajakStore.getCount();i++){
		  if (sp2ddPajakStore.getAt(i).get('sp2dd_nilai')>0)
		 	 tot=tot+parseFloat(sp2ddPajakStore.getAt(i).get('sp2dd_nilai'));
		  
		}
		 
		 
	 Ext.getCmp('sp2dm_pajak1').setValue(tot); 
}
function proc_sp2dbeban(){
	tot=0; 
	 
		for (i=0;i<sp2ddBebanStore.getCount();i++){
		  if (sp2ddBebanStore.getAt(i).get('sp2dd_nilai')>0)
		 	 tot=tot+parseFloat(sp2ddBebanStore.getAt(i).get('sp2dd_nilai'));
		  
		}
		 
	Ext.getCmp('sp2dm_sp2dm_total1').setValue(tot); 
	 
}
var sp2ddPot_proxy = new Ext.data.HttpProxy({
    api: {
        read : HOST_PATH+'/sp2d/readdetail_1',
        create : HOST_PATH+'/sp2d/createdetail_1',
        update:  HOST_PATH+'/sp2d/updatedetail_1',
        destroy:  HOST_PATH+'/sp2d/destroydetail_1'
    },
	listeners: {
		beforewrite : function(proxy, action) {
			App.setAlert(App.STATUS_NOTICE,"SP2D : "+action+": Menyimpan data...");
			},
		 write : function(proxy, action, result, res, rs) {
			App.setAlert(true, "SP2D  :"+action+":"+res.message);
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
var sp2ddPot_reader = new Ext.data.JsonReader({
	totalProperty: 'total',
    successProperty: 'success',
    idProperty: 'sp2dd_id',
    root: 'data',
    messageProperty: 'message'  // <-- New "messageProperty" meta-data
}, [  
	{name: 'sp2dd_id'},
	{name: 'sp2dm_id'},
	{name: 'ptg_kode'},
	 
	{name: 'sp2dd_nilai',type:'float'},
	{name: 'sp2dd_ket',type:'float'} 
 
	 
]); 

// The new DataWriter component.
var sp2ddPot_writer = new Ext.data.JsonWriter({
    encode: true,
    writeAllFields: true,
	listful:true
});

// Typical Store collecting the Proxy, Reader and Writer together.
var sp2ddPotStore = new Ext.data.Store({
    id: 'sp2ddPotStore',
    proxy: sp2ddPot_proxy,
    reader: sp2ddPot_reader,
    writer: sp2ddPot_writer,  // <-- plug a DataWriter into the store just as you would a Reader
    autoSave: false, // <-- false would delay executing create, update, destroy requests until specifically told to do so with some [save] buton.
	autoLoad: true  
});
 
var sp2dPotGrid = Ext.extend( Ext.grid.EditorGridPanel, {
    iconCls: 'icon-form',
    frame:false,
	border:false,
	loadMask: true,
//	 plugins:[ new Ext.ux.grid.GridSummary({position:'bottom',height:0})],
	sm: new Ext.grid.RowSelectionModel({	moveEditorOnEnter:false,
								singleSelect: true }),
    initComponent : function() {
 
	this.relayEvents(this.store, ['destroy', 'save', 'update']); 
	 
    sp2dPotGrid.superclass.initComponent.call(this);
    },
 
   
	listeners : {
		afteredit: function (o){
			//alert(o.field+":"+o.value+":"+o.originalValue+":"+o.row+":"+o.column );			
			proc_sp2dpot(o);
		}
		 
	}
});
// pajak,sp2d_detail2

var sp2ddPajak_proxy = new Ext.data.HttpProxy({
    api: {
        read : HOST_PATH+'/sp2d/readdetail_2',
        create : HOST_PATH+'/sp2d/createdetail_2',
        update:  HOST_PATH+'/sp2d/updatedetail_2',
        destroy:  HOST_PATH+'/sp2d/destroydetail_2'
    },
	listeners: {
		beforewrite : function(proxy, action) {
			App.setAlert(App.STATUS_NOTICE,"SP2D : "+action+": Menyimpan data...");
			},
		 write : function(proxy, action, result, res, rs) {
			App.setAlert(true, "SP2D  :"+action+":"+res.message);
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
var sp2ddPajak_reader = new Ext.data.JsonReader({
	totalProperty: 'total',
    successProperty: 'success',
    idProperty: 'sp2dd_id',
    root: 'data',
    messageProperty: 'message'  // <-- New "messageProperty" meta-data
}, [  
	{name: 'sp2dd_id'},
	{name: 'sp2dm_id'},
	{name: 'pjk_kode'},
	 
	{name: 'sp2dd_nilai',type:'float'},
	{name: 'sp2dd_ket',type:'float'} 
 
	 
]); 
 
var sp2ddPajak_writer = new Ext.data.JsonWriter({
    encode: true,
    writeAllFields: true,
	listful:true
});
 
var sp2ddPajakStore = new Ext.data.Store({
    id: 'sp2ddPajakStore',
    proxy: sp2ddPajak_proxy,
    reader: sp2ddPajak_reader,
    writer: sp2ddPajak_writer,  // <-- plug a DataWriter into the store just as you would a Reader
    autoSave: false, // <-- false would delay executing create, update, destroy requests until specifically told to do so with some [save] buton.
	autoLoad: true  
});
var gridsumPajak=new Ext.ux.grid.GridSummary({position:'bottom',height:0});
var sp2dPajakGrid = Ext.extend( Ext.grid.EditorGridPanel, {
    iconCls: 'icon-form',
    frame:false,
	border:false,
	loadMask: true,
	// plugins:[ new Ext.ux.grid.GridSummary({position:'bottom',height:0})],
	 
	sm: new Ext.grid.RowSelectionModel({	moveEditorOnEnter:false,
								singleSelect: true }),
    initComponent : function() {
 
	this.relayEvents(this.store, ['destroy', 'save', 'update']); 
	 
    sp2dPajakGrid.superclass.initComponent.call(this);
    },
 
   
	listeners : {
		afteredit: function (o){
			//alert(o.field+":"+o.value+":"+o.originalValue+":"+o.row+":"+o.column );			
			proc_sp2dpajak(o);
		}
		 
	}
});



// beban rek, sp2d_detail3

var sp2ddBeban_proxy = new Ext.data.HttpProxy({
    api: {
        read : HOST_PATH+'/sp2d/readdetail_3',
        create : HOST_PATH+'/sp2d/createdetail_3',
        update:  HOST_PATH+'/sp2d/updatedetail_3',
        destroy:  HOST_PATH+'/sp2d/destroydetail_3'
    },
	listeners: {
		beforewrite : function(proxy, action) {
			App.setAlert(App.STATUS_NOTICE,"SP2D : "+action+": Menyimpan data...");
			},
		 write : function(proxy, action, result, res, rs) {
			App.setAlert(true, "SP2D  :"+action+":"+res.message);
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
var sp2ddBeban_reader = new Ext.data.JsonReader({
	totalProperty: 'total',
    successProperty: 'success',
    idProperty: 'sp2dd_id',
    root: 'data',
    messageProperty: 'message'  // <-- New "messageProperty" meta-data
}, [  
	{name: 'sp2dd_id'},
	{name: 'sp2dm_id'},
	{name: 'akun_kode'},
    {name: 'akun_nama'},
	{name: 'sp2dd_nilai',type:'float'},
	{name: 'sp2dd_ket',type:'string'} 
 
	 
]); 
 
var sp2ddBeban_writer = new Ext.data.JsonWriter({
    encode: true,
    writeAllFields: true,
	listful:true
});
 
var sp2ddBebanStore = new Ext.data.Store({
    id: 'sp2ddBebanStore',
    proxy: sp2ddBeban_proxy,
    reader: sp2ddBeban_reader,
    writer: sp2ddBeban_writer,  // <-- plug a DataWriter into the store just as you would a Reader
    autoSave: false, // <-- false would delay executing create, update, destroy requests until specifically told to do so with some [save] buton.
	autoLoad: true  
});
 
var sp2dBebanGrid = Ext.extend( Ext.grid.EditorGridPanel, {
    iconCls: 'icon-form',
    frame:false,
	border:false,
	loadMask: true,
//	 plugins:[ new Ext.ux.grid.GridSummary({position:'bottom',height:0})],
	sm: new Ext.grid.RowSelectionModel({	moveEditorOnEnter:false,
								singleSelect: true }),
    initComponent : function() {
 
	this.relayEvents(this.store, ['destroy', 'save', 'update']); 
	 
    sp2dBebanGrid.superclass.initComponent.call(this);
    },
 
   
	listeners : {
		afteredit: function (o){
			//alert(o.field+":"+o.value+":"+o.originalValue+":"+o.row+":"+o.column );			
			proc_sp2dbeban(o);
		}
		 
	}
});
var Sp2dMasterJsonReader =  new Ext.data.JsonReader({
 
	remoteSort: false,
	root: 'sp2dmasters',
	totalProperty: 'total',
    idProperty: 'Sp2dMasterList.sp2dm_id',
	fields: [
		{name:'Sp2dMasterList.sp2dm_id'},
	 
		{name:'data[Sp2dMaster][sp2dm_id]',mapping:'Sp2dMasterList.sp2dm_id'},
		{name:'data[Sp2dMaster][sp2dm_no]',mapping:'Sp2dMasterList.sp2dm_no'},
		{name:'data[Sp2dMaster][sppm_no]',mapping:'Sp2dMasterList.sppm_no'},
		{name:'data[Sp2dMaster][spmm_no]',mapping:'Sp2dMasterList.spmm_no'},
		
		{name:'data[Sp2dMaster][sppm_tgl]',mapping:'Sp2dMasterList.sppm_tgl', type: 'date', dateFormat: 'Y-m-d'},
		{name:'data[Sp2dMaster][spdm_no]',mapping:'Sp2dMasterList.sppm_no'},
		{name:'data[Sp2dMaster][spdm_tgl]',mapping:'Sp2dMasterList.spdm_tgl', type: 'date', dateFormat: 'Y-m-d'},
		{name:'data[Sp2dMaster][sp2dm_tgl]',mapping:'Sp2dMasterList.sp2dm_tgl', type: 'date', dateFormat: 'Y-m-d'},
		{name:'data[Sp2dMaster][un_id]',mapping:'Sp2dMasterList.un_id'},
		{name:'data[Sp2dMaster][un_kode]',mapping:'Sp2dMasterList.un_kode'},
		{name:'data[Sp2dMaster][un_nama]',mapping:'Sp2dMasterList.un_nama'},
		{name:'data[Sp2dMaster][bank_norek]',mapping:'Sp2dMasterList.bank_norek'},
		{name:'data[Sp2dMaster][bank_nama]',mapping:'Sp2dMasterList.bank_nama'},
		{name:'data[Sp2dMaster][sp2dm_benda]',mapping:'Sp2dMasterList.sp2dm_benda'},
		{name:'data[Sp2dMaster][sp2dm_bendanama]',mapping:'Sp2dMasterList.sp2dm_bendanama'},
		{name:'data[Sp2dMaster][sp2dm_catatan]',mapping:'Sp2dMasterList.sp2dm_catatan'},
		{name:'data[Sp2dMaster][sp2dm_total]',mapping:'Sp2dMasterList.sp2dm_total'}, 
			{name:'data[Sp2dMaster][sp2dm_pajak]',mapping:'Sp2dMasterList.sp2dm_pajak'}, 
			{name:'data[Sp2dMaster][sp2dm_pot]',mapping:'Sp2dMasterList.sp2dm_pot'}, 
		{name:'data[Sp2dMaster][sp2dm_norek2]',mapping:'Sp2dMasterList.sp2dm_norek2'}, 
		{name:'data[Sp2dMaster][sp2dm_bank2]',mapping:'Sp2dMasterList.sp2dm_bank2'},
		{name:'data[Sp2dMaster][sp2dm_npwp2]',mapping:'Sp2dMasterList.sp2dm_npwp2'},
		{name:'data[Sp2dMaster][sp2dm_nama2]',mapping:'Sp2dMasterList.sp2dm_nama2'}, 
		{name:'data[Sp2dMaster][sp2dm_ket2]',mapping:'Sp2dMasterList.sp2dm_ket2'}  
	]
	 
	 
});

var Sp2dMasterStore = new Ext.data.GroupingStore({
  	reader:Sp2dMasterJsonReader,
	groupField:'data[Sp2dMaster][un_nama]',
	 remoteGroup:false,
	  groupOnSort: false,
	 
	proxy: new Ext.data.HttpProxy({
        url: urlsp2d
    })
});


MyDesktop.EntrySP2DForm = Ext.extend(Ext.app.Module, {
    id:'entrysp2d-win',
	title:'SP2D',
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
                title:'SP2D',
                width:800,
                height:500,
                iconCls: 'icon-form',
                animCollapse:false,
                constrainHeader:true,
				stripeRows: true,
				border:false,
               layout:'fit',
                items :
					[entrysp2dform = new Ext.FormPanel({
						id:'entrysp2dform',
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
												 name: 'data[Sp2dMaster][sp2dm_id]',
												 
												id:'sp2dm_id1' 
												 
											},
											 
											{	 xtype:'hidden',
												 name: 'data[Sp2dMaster][sp2dm_pot]',
												 
												id:'sp2dm_pot1' 
												 
											},
											{	 xtype:'hidden',
												 name: 'data[Sp2dMaster][sp2dm_pajak]',
												 
												id:'sp2dm_pajak1' 
												 
											},
											{	 xtype:'hidden',
												 name: 'data[Sp2dMaster][un_id]',
												 
												id:'sp2dm_un_id2' 
												 
											},
											 
											{	 xtype:'textfield',
												fieldLabel: 'No Surat',
												name: 'data[Sp2dMaster][sp2dm_no]',
												maxLength:20,
												id:'sp2dm_no1',
												 
												allowBlank:false 
												 
											},
											 
											 
											{	 xtype:'datefield',
												fieldLabel: 'Tanggal',
												id:'sp2dm_tgl1',
												name: 'data[Sp2dMaster][sp2dm_tgl]',
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
										columnWidth:'.5', 
										items:[ 
										
											{
						                        xtype : 'compositefield',
						                       anchor:'95%',
						                        msgTarget: 'side',
						                        fieldLabel: 'No SPM',
						                        items : [ 
													new Ext.form.ComboBox({
									 						 id:'sp2d_spmm_no1',
															 store: spmSearchStore,
															 hiddenName:'data[Sp2dMaster][spmm_no]',
															 fieldLabel:'No SPP',
															 displayField:'spmm_no',
															 typeAhead: false,
															 enableKeyEvents :true, 
															 valueField:'spmm_no',
															  triggerAction: 'all',
															 loadingText: 'Searching...',
															 minChars:0,
															 pageSize:20,
															 boxMinWidth: 150,
															 boxMinHeight: 100,
															 width:150,
															 hideTrigger:false,
															 forceSelection: true,
															 tpl:spmComboTpl,
															 allowBlank:false,
															 itemSelector: 'div.search-spm',
															 listeners: {
							  										select: function(thiscombo,record, index){
							  											Ext.getCmp('sp2dm_benda1').setValue(record.get('sppm_benda'));
							  											 
							  											Ext.getCmp('sp2dm_banknorek1').setValue(record.get('bank_norek'))
							  												Ext.getCmp('sp2dm_banknama1').setValue(record.get('bank_nama'));
							  											Ext.getCmp('sp2dm_un_id2').setValue(record.get('un_id'));
							  											Ext.getCmp('sp2dm_un_nama2').setValue(record.get('un_nama'));
							  											Ext.getCmp('sp2dm_spdm_no1').setValue(record.get('spdm_no'));
							  											Ext.getCmp('sp2dm_spdm_tgl1').setValue(record.get('spdm_tgl'));
							  										 	Ext.getCmp('sp2dm_sppm_tgl2').setValue(record.get('sppm_tgl'));
							  											Ext.getCmp('sp2dm_sp2dm_total1').setValue(record.get("spmm_total"));
							  											sp2ddBebanStore.removeAll();
							  											 detailBeban2Store.load({params: {
																				 
																				 spmm_no:record.get("spmm_no")
																		 }});
																		 sp2ddPajakStore.removeAll();
																		  detailPajak2Store.load({params: {
																				 
																				 spmm_no:record.get("spmm_no")
																		 }});
																		  sp2ddPotStore.removeAll();
							  											 detailPotongan2Store.load({params: {
																				 
																				 spmm_no:record.get("spmm_no")
																		 }});
																	/*	  
																		 Ext.getCmp('un_nama1').setValue(record.get('un_nama'));
																		 Ext.getCmp('sp2dm_angg1').setValue(record.get('dpa_angg'));
																		 Ext.getCmp('sp2dm_akum1').setValue(record.get('dpa_akum'));
																		 Ext.getCmp('sp2dm_tersedia1').setValue(record.get('dpa_tersedia'));
																		*/
																	}	
																}
															 
										
															 }) 
													]
											}, //end of composite
											{	 xtype:'datefield',
												fieldLabel: 'Tanggal SPM',
												id:'sp2dm_sppm_tgl2',
												name: 'data[Sp2dMaster][sppm_tgl]',
												maxLength:50, 
												format:'Y-m-d',
												value:new Date(),
												readOnly:true,
												width:100,
												allowBlank:false
											}  
										]
									} 
									]
								}//end of north
								,
								{
									 
									layout: 'column',
									border: true,
									frame:false,
									region: 'center',
									labelWidth:80,
																	       
							       	autoScroll :true,
							       
							        bodyStyle:'padding:5px 5px 0',
							      	 
									 width:800,
									 autoHeight:true,
									 columns:3,
									 items: [
										{	      
											 
											layout: 'form',
											border: false, 	
										 	columnWidth:'.70',
										 	items :[
									 				{   
											            xtype:'fieldset',
											            title: 'Dasar',
											            anchor:'95%',
											            collapsible: false,
											            autoHeight:true,
											            labelWidth:150,
											            defaults: {anchor:'95%',labelWidth:'200px'},
											            defaultType: 'textfield',
											            items : [
													            {
												                    fieldLabel: 'SKPD',
												                    name: 'data[Sp2dMaster][un_nama]',
												                    id:'sp2dm_un_nama2',
												                    value: '' 
												                   
												                },
												                {
												                    fieldLabel: 'Bendahara',
												                    name: 'data[Sp2dMaster][sp2dm_benda]',
												                    id:'sp2dm_benda1',
												                    value: '',
												                    hidden:true 
												                   
												                }, 
													                 {
											                        xtype : 'compositefield',
											                        anchor:'95%',
											                        msgTarget: 'side',
											                        fieldLabel: 'Bank',
											                        items : [ 
											                        	new Ext.form.ComboBox({
														 						 id:'sp2dm_banknorek1',
																				 store: bankSearchStore,
																				 hiddenName:'data[Sp2dMaster][bank_norek]',
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
																							  
																							 Ext.getCmp('sp2dm_banknama1').setValue(record.get('bank_nama'));
																							 
																						}	
																					}
																				 
															
																				 }),
																		{	xtype:'textfield',
																			id:'sp2dm_banknama1',
																			fieldLabel: '',
																			name: 'data[Sp2dMaster][bank_nama]',
																			flex : 1,
																			readOnly:true 
																		}
											                        ]
								               					  },  {
											                        xtype : 'compositefield',
											                        anchor:'95%',
											                        msgTarget: 'side',
											                        fieldLabel: 'SPD',
											                        items : [ 
																			{	xtype:'textfield',
																			 	id:'sp2dm_spdm_no1',
																				fieldLabel: 'Nomor SPD',
																				name: 'data[Sp2dMaster][spdm_no]' 
																				 
																			 
																			},
																			{xtype:'displayfield',
																			value:'Tgl SPD'
																			},
																			{	xtype:'textfield',
																			 	id:'sp2dm_spdm_tgl1',
																				fieldLabel: 'TGL SPD',
																				name: 'data[Sp2dMaster][spdm_tgl]' 
																				 
																			 
																			}]
								               					  },
																{	xtype:'textfield',
																 	id:'sp2dm_spdm_uraian1',
																	fieldLabel: 'Keperluan',
																	name: 'data[Sp2dMaster][spdm_bendanama]' 
																	 
																 
																},
																{	xtype:'numberfield',
																 	id:'sp2dm_sp2dm_total1',
																	fieldLabel: 'Nilai',
																	name: 'data[Sp2dMaster][sp2dm_total]',
																	align:'right'
																	 
																 
																}
											            ]
									 				},
									 				{   
											            xtype:'fieldset',
											            title: 'Kepada',
											            anchor:'95%',
											            collapsible: false,
											            autoHeight:true,
											            labelWidth:150,
											            defaults: {anchor:'95%',labelWidth:'200px'},
											            defaultType: 'textfield',
											            items : [
													             
													              {
											                        xtype : 'compositefield',
											                        anchor:'95%',
											                        msgTarget: 'side',
											                        fieldLabel: 'Nama',
											                        items : [ 
											                        	 {	xtype:'textfield',
																		 
																			fieldLabel: '',
																			name: 'data[Sp2dMaster][sp2dm_nama2]',
																			value:'',
																			width:150 
																			 
																		},{
																			xtype:'displayfield',
																			value:'NPWP'
																		}
																		,
																		{	xtype:'textfield',
																		 
																			fieldLabel: '',
																			name: 'data[Sp2dMaster][sp2dm_npwp2]',
																			flex : 1,
																			readOnly:false 
																		}
											                        ]
								               					  },    {
											                        xtype : 'compositefield',
											                        anchor:'95%',
											                        msgTarget: 'side',
											                        fieldLabel: 'No Rekening',
											                        items : [ 
											                        	 {	xtype:'textfield',
																		    width:150,
																			fieldLabel: '',
																			name: 'data[Sp2dMaster][sp2dm_norek2]',
																			value:''
																			 
																		},{
																			xtype:'displayfield',
																			value:'Bank/Pos'
																		}
																		,
																		{	xtype:'textfield',
																		 
																			fieldLabel: '',
																			name: 'data[Sp2dMaster][sp2dm_bank2]',
																			flex : 1,
																			readOnly:false 
																		}
											                        ]
								               					  } 
											            ]
									 				},
									 				{
											 			xtype:'fieldset',
											            title: 'Pembebanan',
											            anchor:'95%',
											            collapsible: false,
											            autoHeight:true,
											            layout:'fit',
											           
											            defaults: {anchor:'95%' },
											            defaultType: 'textfield',
											            items:
										           		 asp2dBebanGrid = new sp2dBebanGrid({
																id: 'asp2dBebanGrid',
																autoWidth:true,
																height: 100,
																border: true,
																frame:false,
																stripeRows: true,
																store: sp2ddBebanStore,
																
																columns: [{
																	header: "Kode Rekening",
																	dataIndex: 'akun_kode',
																	sortable: true,
																	width:120,
																	editor: {
																		 xtype:'textfield'
																	
																	},
																	isCellEditable: true
																}, 
																 {
																	header: "Nama Rekening",
																	width: 150,
																	sortable: true,
																	editor:new Ext.form.TextField({enableKeyEvents :true }),
																	dataIndex: 'akun_nama'
																},   
																
																{
																	header: "Nilai",
																	width: 80,
																	sortable: true,
																	align:'right',
																	summaryType: 'sum',
																	dataIndex: 'sp2dd_nilai',
																	isCellEditable: true,
																	allowBlank: false,
																	editor:new Ext.form.NumberField({enableKeyEvents :true }),
																	renderer: Ext.util.Format.numberRenderer('0,000.00')
																
																}, 
																 {
																	header: "Keterangan",
																	width: 150,
																	sortable: true,
																	editor:new Ext.form.TextField({enableKeyEvents :true }),
																	dataIndex: 'sp2dd_ket'
																},   
																
																 {
																	header: "ID",
																	hidden:true,
																	width: 40,
																	sortable: true,
																	dataIndex: 'sp2dd_id' 
																} ]
															
															}) //end of grid 
													}
									 				]//end of item 
												            
										}//end of column left
										,{
											width:10,
											layout:'form',
											html:'',
											columnWidth:'.02',
											html:'&nbsp'
										}
										,{
											layout:'form',
											border:false,
											columnWidth:'.28',
											items :[{
									 			xtype:'fieldset',
									            title: 'Potongan',
									          
									            collapsible: false,
									            autoHeight:true,
									         	 layout:'fit',
									         	 width:200,
									            labelWidth:100,
									            defaults: {anchor:'95%' },
									            defaultType: 'textfield',
									            items:
									           		 asp2dPotGrid = new sp2dPotGrid({
															id: 'asp2dPotGrid',
															width:200,
															height: 125,
															border: true,
															frame:false,
															stripeRows: true,
															store: sp2ddPotStore,
															
															columns: [{
																header: "Potongan",
																dataIndex: 'ptg_kode',
																sortable: true,
																width:80,
																editor: {
																	 xtype:'textfield'
																
																},
																isCellEditable: true
															}, 
															{
																header: "Nilai",
																width: 80,
																sortable: true,
																align:'right',
																summaryType: 'sum',
																dataIndex: 'sp2dd_nilai',
																isCellEditable: true,
																allowBlank: false,
																editor:new Ext.form.NumberField({enableKeyEvents :true }),
																renderer: Ext.util.Format.numberRenderer('0,000.00')
															
															}, {
																header: "Keterangan",
																width: 100,
																sortable: true,
																editor:new Ext.form.TextField({enableKeyEvents :true }),
																dataIndex: 'sp2dd_ket'
															},   
															 {
																header: "ID",
																hidden:true,
																width: 40,
																sortable: true,
																dataIndex: 'sp2dd_id' 
															} ]
														
														}) //end of grid  
											},
											{
									 			xtype:'fieldset',
									            title: 'Pajak',
									          
									            collapsible: false,
									          
									         	 layout:'fit',
									            labelWidth:100,
									            width:200,
									            defaults: {anchor:'95%' },
									            defaultType: 'textfield',
									            items:
									           		 asp2dPajakGrid = new sp2dPajakGrid({
															id: 'asp2dPajakGrid',
											 				width:200,
															height: 125,
															border: true,
															frame:false,
															stripeRows: true,
															 
															store: sp2ddPajakStore,
															columns: [{
																header: "Pajak",
																dataIndex: 'pjk_kode',
																sortable: true,
																width:80,
																editor: {
																	 xtype:'textfield'
																
																},
																isCellEditable: true
															}, 
															{
																header: "Nilai",
																width: 80,
																sortable: true,
																align:'right',
																summaryType: 'sum',
																dataIndex: 'sp2dd_nilai',
																isCellEditable: true,
																allowBlank: false,
																editor:new Ext.form.NumberField({enableKeyEvents :true }),
																renderer: Ext.util.Format.numberRenderer('0,000.00')
															
															}, {
																header: "Keterangan",
																width: 100,
																sortable: true,
																editor:new Ext.form.TextField({enableKeyEvents :true }),
																dataIndex: 'sp2dd_ket'
															},   
															 {
																header: "ID",
																hidden:true,
																width: 40,
																sortable: true,
																dataIndex: 'sp2dd_id' 
															} ]
														
														}) //end of grid
											}]//end of item
													 
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
								id:'sp2d1-new',
							 
						 		iconCls: 'new',
						 		handler: function(){
						 			entrysp2dform.getForm().reset();
						 			sp2ddBebanStore.load({
						 				params: {
						 					sp2dm_id: 0
						 				}
						 			});
									sp2ddPajakStore.load({
						 				params: {
						 					sp2dm_id: 0
						 				}
						 			});
						 			sp2ddPotStore.load({
						 				params: {
						 					sp2dm_id: 0
						 				}
						 			});
						 			Ext.getCmp('sp2dm_tgl1').setValue(new Date());
							 
									Ext.getCmp('sp2dm_id1').setValue(0);
								 
						 		}
						 	},{
										text:'Print',
										id:'print_sp2d',
										tooltip:'Print SP2D',
										iconCls:'printer',
										handler:function(){
											aid=Ext.getCmp('sp2dm_id1').getValue();
											aurl=HOST_PATH+'/rptsp2d/sp2d/'+aid;
											window.open(aurl,'_blank');
	
										}
								}, {
						 		xtype: 'spacer',
						 		flex: 1
						 	}, {
						 		text: 'Save',
						 		iconCls: 'save',
								id:'sp2d1-save',
						 
						 		handler: function(){
									 
						 			if (entrysp2dform.getForm().isValid()) {
						 				entrysp2dform.getForm().submit({
						 					url: urladdsp2dmaster,
						 					waitMsg: 'Saving data...',
						 					success: function(form, action){
						 						newid = action.result.newid;
						 						newno = action.result.newno;
						 						if (newid != '') {
						 							//alert(newid);
														// Ext.getCmp('form_no').setValue(newid);
														// alert(newid);
														Ext.getCmp('sp2dm_no1').setValue(newno);
														Ext.getCmp('sp2dm_id1').setValue(newid)
														Ext.getCmp('sp2dm_no1').setReadOnly(true);
														sp2ddBebanStore.setBaseParam('master', newid);
														sp2ddPotStore.setBaseParam('master', newid);
														sp2ddPajakStore.setBaseParam('master', newid);
														sp2ddBebanStore.save();
														sp2ddPotStore.save();
														sp2ddPajakStore.save();
														
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
									id:'sp2d1-cancel',
									 
									margins:'0',
									handler: function(){
										Sp2dMasterStore.reload();
										MyDesktop.getSingleModule('entrysp2d-win').closeWindow();
										
										
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
MyDesktop.SP2DGridWindow = Ext.extend(Ext.app.Module, {
    id:'sp2dgrid-win',
   init : function(){
      this.launcher = {
            text: 'SP2D',
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
                title:'Surat Perintah Pencairan Dana (SP2D)',
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
					gridsp2d = new Ext.grid.GridPanel({
							id: 'gridsp2d',
						 
							 store: Sp2dMasterStore,
							trackMouseOver: true,
							disableSelection: false,
							loadMask: true,
							// grid columns
							columns: [ 
						  {
								header: "No",
								dataIndex: 'data[Sp2dMaster][sp2dm_no]',
								width: 100,
								sortable: true
							},
							{
								header: "Tanggal",
								dataIndex: 'data[Sp2dMaster][sp2dm_tgl]',
								width: 150,
								sortable: true,
								 renderer: function(date) { return date.format("d/m/Y"); }
						
							},
							 {
								header: "No SPP",
								dataIndex: 'data[Sp2dMaster][sppm_no]',
								width: 150,
								sortable: true
							},
							 {
								header: "No SPM",
								dataIndex: 'data[Sp2dMaster][spmm_no]',
								width: 150,
								sortable: true
							},
							 {
								header: "SKPD",
								dataIndex: 'data[Sp2dMaster][un_nama]',
								width: 150,
								sortable: true
							},
							
							 {
								header: "Potongan",
								dataIndex: 'data[Sp2dMaster][sp2dm_pot]',
								width: 150,
								sortable: true,
								align: 'right', 
								renderer: Ext.util.Format.numberRenderer('0,000.00')
							} ,
							 {
								header: "Pajak",
								dataIndex: 'data[Sp2dMaster][sp2dm_pajak]',
								width: 150,
								sortable: true,
								align: 'right', 
								renderer: Ext.util.Format.numberRenderer('0,000.00')
							}, {
								header: "Total",
								dataIndex: 'data[Sp2dMaster][sp2dm_total]',
								width: 150,
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
											 
												Ext.getCmp('editsp2dbutt').enable();
											 
												
										}
									}
								}
							}),
							bbar: new Ext.PagingToolbar({
								pageSize: 20,
								 store: Sp2dMasterStore,
								displayInfo: true,
								displayMsg: 'Displaying contents {0} - {1} of {2}',
								emptyMsg: "No Content to display",
								plugins: new Ext.ux.SlidingPager(),
								listeners :{
										'change' : function(){
										 Sp2dMasterStore.baseParams={start:'start',limit:'limit',search:Ext.getCmp("searchSP2DTxt").getValue()};
			    
										}
									}
									 
							}),
							tbar: [{
								text: 'SP2D',
								iconCls: 'sp2d',
								ref: '../sp2dButton',
								
								menu: {
									xtype: 'menu',
									plain: true,
									items: [{
										text: 'Tambah',
										iconCls: 'add',
										handler: function(){
											 
											 MyDesktop.getSingleModule('entrysp2d-win').createWindow();
											  entrysp2dform.getForm().reset();
											 sp2ddBebanStore.load({params:{sp2dm_id:0}});	
										 	 sp2ddPajakStore.load({params:{sp2dm_id:0}});	
											 sp2ddPotStore.load({params:{sp2dm_id:0}});			 
										}
									} , {
										id: 'editsp2dbutt',
										text: 'Ubah',
										iconCls: 'edit',
										disabled: true,
										handler: function(){
											 mid=gridsp2d.getSelectionModel().getSelected().get("Sp2dMasterList.sp2dm_id");
			 
			 
										 	 sp2ddBebanStore.load({params:{sp2dm_id:mid}});	
										 	 sp2ddPajakStore.load({params:{sp2dm_id:mid}});	
											 sp2ddPotStore.load({params:{sp2dm_id:mid}});	
											 
											 MyDesktop.getSingleModule('entrysp2d-win').createWindow();
											 Ext.getCmp("entrysp2dform").getForm().loadRecord(gridsp2d.getSelectionModel().getSelected());
										 
								
										}
									},{
											id: 'delsp2dbutt',
											text: 'Hapus',
											iconCls: 'delete',
											disabled: true,
											handler: function(){
												/*
												  aid=gridsp2d.getSelectionModel().getSelected().get('Sp2dMasterList.sp2dm_id');
												
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
													        url:urldelsp2dmaster,
													        params : {id :aid},
															method: 'GET',
															success: function ( result, request ) { 
																	Ext.MessageBox.hide();
						
																	var jsonData = Ext.util.JSON.decode(result.responseText);
																 
																	Ext.MessageBox.alert('Information', jsonData.msg); 
																	Sp2dMasterStore.reload();
															},
															failure: function ( result, request) { 
																 Ext.MessageBox.hide();
						
																Ext.MessageBox.alert('Failed', result.responseText); 
															} 
						
													    });
												   }
											    };*/
											}
										}   ]
								
								
								}
							
							}, '-',
							 'Search Key',
							 new Ext.form.TextField({
									id:'searchSP2DTxt',
								    text:'*',
							        emptyText:'*',
							        selectOnFocus:true,
									listeners: {
						              specialkey: function(f,e){
						                if (e.getKey() == e.ENTER) {
								                Sp2dMasterStore.load({params: {
													start: 0,
													limit: 20,
													 search:Ext.getCmp("searchSP2DTxt").getValue()
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
								  Sp2dMasterStore.load({params: {
									start: 0,
									limit: 20,
									 search:Ext.getCmp("searchSP2DTxt").getValue()
									 }})
						       
					        }
							}]
						
						})//end of grid
					
				
					
            });
        }
		 
        win2.show();
		Sp2dMasterStore.load({params:{start:0, limit:20, search:'*'}});
	 
	 
		 
		gridsp2d.on('rowdblclick',function(sm, rowindex, eventobject){ 
			 mid=gridsp2d.getSelectionModel().getSelected().get("Sp2dMasterList.sp2dm_id");
			 
			 
			 	 sp2ddBebanStore.load({params:{sp2dm_id:mid}});	
			 	 sp2ddPajakStore.load({params:{sp2dm_id:mid}});	
				 sp2ddPotStore.load({params:{sp2dm_id:mid}});	
				 
				 MyDesktop.getSingleModule('entrysp2d-win').createWindow();
				 Ext.getCmp("entrysp2dform").getForm().loadRecord(gridsp2d.getSelectionModel().getSelected());
			 
									 
			
		});
		 
		 
	}
}); 
