var urlgetspdmaster=HOST_PATH+'/spd/getall'; 
var urladdspdmaster=HOST_PATH+'/spd/add'; 
var urldelspdmaster=HOST_PATH+'/spd/del'; 
var urlstatespd=HOST_PATH+'/spd/astate'; 
var urlitemsearchfordetail=HOST_PATH
// it's for get index number of spddetail grid
var spdd_idx=0;
var pricelevel=1;
function proc_spd1(o){
	spdd_idx=o.row;
	if (o.field=='itm_code'){
		o.record.commit();
		 Ext.MessageBox.show({
		msg: 'Checking data ' + o.record.get("itm_code") + '...',
		progressText: 'Process...',
		width: 300,
		wait: true,
		waitConfig: {
			interval: 200
		},
		icon: 'ext-mb-download', //custom class in msg-box.html
		animEl: 'mb7'
	});
	itemSPDStore.load({
		params: {
			query: o.record.get("itm_code"),pricelevel:pricelevel
		}
	});
	}
	if (o.field=='spdd_qty'){
			discval1=(parseFloat(SPDDetailStore.getAt(spdd_idx).get('spdd_disc1'))/100)*SPDDetailStore.getAt(spdd_idx).get('spdd_price');
			subtotal=(SPDDetailStore.getAt(spdd_idx).get('spdd_price')-discval1);
			discval2=(parseFloat(SPDDetailStore.getAt(spdd_idx).get('spdd_disc2'))/100) * subtotal;
			discval3=parseFloat(SPDDetailStore.getAt(spdd_idx).get('spdd_discval'));
			subtotal=subtotal-discval2-discval3;
			subtotal=parseFloat(o.value)*subtotal;
			 
			SPDDetailStore.getAt(spdd_idx).set('spdd_subtotal',subtotal);
			SPDDetailStore.getAt(spdd_idx).set('spdd_qty',o.value); 
		 	hitungTotalSPD2();
	}
	if (o.field=='spdd_price'){
		 discval1=(parseFloat(o.value)/100)*SPDDetailStore.getAt(spdd_idx).get('spdd_price');
		subtotal=(SPDDetailStore.getAt(spdd_idx).get('spdd_price')-discval1);
		discval2=(parseFloat(SPDDetailStore.getAt(spdd_idx).get('spdd_disc2'))/100) * subtotal;
		discval3=parseFloat(SPDDetailStore.getAt(spdd_idx).get('spdd_discval'));
		subtotal=subtotal-discval2-discval3;
		subtotal=SPDDetailStore.getAt(spdd_idx).get('spdd_qty')*subtotal;
	 
		SPDDetailStore.getAt(spdd_idx).set('spdd_subtotal',subtotal);
		 
	 	hitungTotalSPD2();
	}
	if (o.field=='spdd_disc1'){
		taxval=0;
		discval1=(parseFloat(SPDDetailStore.getAt(spdd_idx).get('spdd_disc1'))/100)*SPDDetailStore.getAt(spdd_idx).get('spdd_price');
		subtotal=(SPDDetailStore.getAt(spdd_idx).get('spdd_price')-discval1);
		discval2=(parseFloat(o.value)/100) * subtotal;
		discval3=parseFloat(SPDDetailStore.getAt(spdd_idx).get('spdd_discval'));
		subtotal=subtotal-discval2-discval3;
		subtotal=SPDDetailStore.getAt(spdd_idx).get('spdd_qty')*subtotal;
	 
		SPDDetailStore.getAt(spdd_idx).set('spdd_subtotal',subtotal);
	 
	 	hitungTotalSPD2();
	}
	if (o.field=='spdd_disc2'){
		taxval=0;
		discval1=(parseFloat(SPDDetailStore.getAt(spdd_idx).get('spdd_disc1'))/100)*SPDDetailStore.getAt(spdd_idx).get('spdd_price');
		subtotal=(SPDDetailStore.getAt(spdd_idx).get('spdd_price')-discval1);
		discval2=(parseFloat(o.value)/100) * subtotal;
		discval3=parseFloat(SPDDetailStore.getAt(spdd_idx).get('spdd_discval'));
		subtotal=subtotal-discval2-discval3;
		subtotal=SPDDetailStore.getAt(spdd_idx).get('spdd_qty')*subtotal;
	 
		SPDDetailStore.getAt(spdd_idx).set('spdd_subtotal',subtotal);
		 
	 	hitungTotalSPD2();
	}
	if (o.field=='spdd_discval'){
		
		taxval=0;
		discval1=(parseFloat(SPDDetailStore.getAt(spdd_idx).get('spdd_disc1'))/100)*SPDDetailStore.getAt(spdd_idx).get('spdd_price');
		subtotal=(SPDDetailStore.getAt(spdd_idx).get('spdd_price')-discval1);
		discval2=(parseFloat(SPDDetailStore.getAt(spdd_idx).get('spdd_disc2'))/100) * subtotal;
		discval3=parseFloat(o.value);
		subtotal=subtotal-discval2-discval3;
		subtotal=SPDDetailStore.getAt(spdd_idx).get('spdd_qty')*subtotal;
	 
		SPDDetailStore.getAt(spdd_idx).set('spdd_subtotal',subtotal);
	 
	 	hitungTotalSPD2();
	}
	
}
function addItemToExisting_spd(therec){
	 aitm_code=therec.get('itm_code');
	 aitm_unit=therec.get('itm_unit');
	  start_search=1;
	 if (spdd_idx!=0) start_search=0;
	  newrec=SPDDetailStore.findBy(function(record, id){
	  	 
        if(record.get('itm_code') === aitm_code && 
           record.get('itm_unit') === aitm_unit) {
		   		 
              return true;  // a record with this data exists
        }
        return false;  // there is no record in the store with this data
    	},SPDDetailStore,start_search);
	
	  
	 if (newrec>=0){
	 		SPDDetailStore.getAt(newrec).set('itm_code', therec.get('itm_code'));
			SPDDetailStore.getAt(newrec).set('itm_unit', therec.get('itm_unit'));
			SPDDetailStore.getAt(newrec).set('itm_name', therec.get('itm_name'));
			currQty = parseFloat(SPDDetailStore.getAt(newrec).get('spdd_qty'));
			currQty = currQty + 1;
			SPDDetailStore.getAt(newrec).set('spdd_qty', currQty);
			SPDDetailStore.getAt(newrec).set('spdd_price', therec.get('ipc_sellprice'));
	 		discval1=(parseFloat(SPDDetailStore.getAt(newrec).get('spdd_disc1'))/100)*SPDDetailStore.getAt(newrec).get('spdd_price');
			subtotal=(SPDDetailStore.getAt(newrec).get('spdd_price')-discval1);
			discval2=(parseFloat(SPDDetailStore.getAt(newrec).get('spdd_disc2'))/100) * subtotal;
			discval3=parseFloat(SPDDetailStore.getAt(newrec).get('spdd_discval'));
			subtotal=subtotal-discval2-discval3;
			subtotal=parseFloat(currQty)*subtotal;
			SPDDetailStore.getAt(newrec).set('spdd_subtotal', subtotal);
		 	SPDDetailStore.removeAt(spdd_idx);
			hitungTotalSPD2();
			if (newrec!=0 && newrec > spdd_idx) newrec=newrec-1;
	  		spddetailGrid.getSelectionModel().selectRow(newrec, false, false);
	  		spddetailGrid.startEditing(newrec, 4);
			
			 App.setAlert(App.STATUS_NOTICE,"Added to existing item...");
			
		 
	 }
	 else {
	  
			SPDDetailStore.getAt(spdd_idx).set('itm_code', therec.get('itm_code'));
			SPDDetailStore.getAt(spdd_idx).set('itm_unit', therec.get('itm_unit'));
			SPDDetailStore.getAt(spdd_idx).set('itm_name', therec.get('itm_name'));
			SPDDetailStore.getAt(spdd_idx).set('spdd_qty', 1);
			SPDDetailStore.getAt(spdd_idx).set('spdd_price', therec.get('ipc_sellprice'));
		 	subtotal = parseFloat(therec.get('ipc_sellprice'));
			SPDDetailStore.getAt(spdd_idx).set('spdd_subtotal', subtotal);
			hitungTotalSPD2();
			spddetailGrid.getSelectionModel().selectRow(spdd_idx, false, false);
	  		spddetailGrid.startEditing(spdd_idx, 4);
			
		 
	 
	 }
	 spddetailGrid.focus();
}
var itemSPDStore = new Ext.data.Store({
        proxy: new Ext.data.HttpProxy({
            url: urlitemsearchfordetail
        }),
        reader: new Ext.data.JsonReader({
            root: 'items',
            totalProperty: 'total',
            id: 'itm_code'
        }, [
            {name: 'itm_code'},
            {name: 'itm_name'},
			{name: 'itm_slstax'},
			{name: 'itm_unit'},
			{name: 'ipc_sellprice'}
			 
        ]),
		 
		listeners: {
			load: function(thisstore, record, c){
				 Ext.MessageBox.hide();
				//spdd_idx = SPDDetailStore.indexOf(spddetailGrid.getSelectionModel().getSelected());
				if (spdd_idx==-1) spdd_idx=0;										
				if (thisstore.getCount()>0){
					 therec=thisstore.getAt(0);
					  	combo=Ext.getCmp('addunitcomboforspddetailgrid');
						 combo.store.baseParams={code:therec.get('itm_code'),level:pricelevel};
						combo.store.removeAll();
				       combo.lastQuery=null;
					  addItemToExisting_spd(therec);
				}
				else {
							App.setAlert(App.STATUS_NOTICE,"Could not found the item...");
						SPDDetailStore.removeAt(spdd_idx);
						spddetailGrid.focus();
				}
				 
			}
		}
});
function hitungTotalSPD2(){
	 
 
	subtotal=0;
	atax=0;
	qty=0;
	for (var i = 0, len = SPDDetailStore.getCount(); i < len; i++) {
		rec=SPDDetailStore.getAt(i);
		subtotal=subtotal+parseFloat(rec.get("spdd_subtotal"));
		if (rec.get("itm_code")!="")
		qty=qty+parseFloat(rec.get("spdd_qty"));
	}
	
	Ext.getCmp('spd_subtotal').setValue(subtotal);
	
	Ext.getCmp('spd_totqty').setValue(qty);
	hitungTotalSPD();  
	
	
	
};
function hitungTotalSPD(){
	subtotal=parseFloat(Ext.getCmp('spd_subtotal').getValue());
	
	disc1=parseFloat(Ext.getCmp('spd_disc1').getValue());
	disc2=parseFloat(Ext.getCmp('spd_disc2').getValue());
	discval=parseFloat(Ext.getCmp('spd_discval').getValue());
	subtotal=subtotal - ((disc1/100)*subtotal);
	subtotal=subtotal - ((disc2/100)*subtotal);
	subtotal=subtotal - (discval);
	spd_inctax=Ext.getCmp('spd_inctax').getValue();
	
	taxval=0;
	//alert(spd_inctax);
  	if (spd_inctax == '1') {
   		taxval = subtotal * (parseFloat(sls_tax) / 100);
   		 
   	}
   	else {
	  	taxval=0;
   	}
	shipcost=parseFloat(Ext.getCmp('spd_shipcost').getValue());
	othercost=parseFloat(Ext.getCmp('spd_othercost').getValue());
	
	 
	
	 
	//grandtotal=subtotal+shipcost+othercost-discval;
	grandtotal=subtotal+taxval;
	
	totalgross=grandtotal + shipcost + othercost;
	Ext.getCmp('spd_tottax').setValue(taxval);  
	Ext.getCmp('spd_total').setValue(grandtotal);
	Ext.getCmp('spd_totalgross').setValue(totalgross);
};
var spdd_proxy = new Ext.data.HttpProxy({
    api: {
        read : HOST_PATH+'/spd/readdetail',
        create : HOST_PATH+'/spd/createdetail',
        update:  HOST_PATH+'/spd/updatedetail',
        destroy:  HOST_PATH+'/spd/destroydetail'
    },
	listeners: {
		beforewrite : function(proxy, action) {
			App.setAlert(App.STATUS_NOTICE,"Sales Order : "+action+": Saving data please wait...");
			},
		 write : function(proxy, action, result, res, rs) {
			App.setAlert(true, "Sales Order :"+action+":"+res.message);
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
var spdd_reader = new Ext.data.JsonReader({
	totalProperty: 'total',
    successProperty: 'success',
    idProperty: 'spdd_id',
    root: 'data',
    messageProperty: 'message'  // <-- New "messageProperty" meta-data
}, [ 
	{name: 'spdd_id'},
	{name: 'spd_id'},
	{name: 'itm_code', allowBlank:false},
	{name: 'itm_name'},
	{name: 'proc'},
 	{name: 'itm_unit', allowBlank:false },
	{name: 'spdd_qty',type:'float'},
	{name: 'spdd_price',type:'float'},
	{name: 'spdd_disc1',type:'float'},
	{name: 'spdd_disc2',type:'float'},
	{name: 'spdd_discval',type:'float'},
	{name: 'spdd_subtotal',type:'float'}  
	 
]); 

// The new DataWriter component.
var spdd_writer = new Ext.data.JsonWriter({
    encode: true,
    writeAllFields: true,
	listful:true
});

// Typical Store collecting the Proxy, Reader and Writer together.
var SPDDetailStore = new Ext.data.Store({
    id: 'spddetailstore',
    proxy: spdd_proxy,
    reader: spdd_reader,
    writer: spdd_writer,  // <-- plug a DataWriter into the store just as you would a Reader
    autoSave: false, // <-- false would delay executing create, update, destroy requests until specifically told to do spd with spdme [save] buton.
	autoLoad: true/* ,
	listeners : {
		update : function (thistore,record,operation){
			spdd_idx = thistore.indexOf(record);
			 if (record.isModified("itm_code")) {
			 
			 	record.commit();
			 	
				Ext.MessageBox.show({
																msg: 'Checking data ' + record.get("itm_code") + '...',
																progressText: 'Process...',
																width: 300,
																wait: true,
																waitConfig: {
																	interval: 200
																},
																icon: 'ext-mb-download', //custom class in msg-box.html
																animEl: 'mb7'
															});
															itemSPDStore.load({
																params: {
																	query: record.get("itm_code"),pricelevel:pricelevel
																}
															});
			 }
			
		}
	}*/
});
 
var spdMasterJsonReader =  new Ext.data.JsonReader({
   
	remoteSPDrt: false,
	root: 'spdmasters',
	totalProperty: 'total',
    idProperty: 'SPDMasterList.spd_id',
	fields: [
		{name:'SPDMasterList.spd_id'},{name:'SPDMasterList.allproc'},
		{name:'SPDMasterList.ct_pricelvl'},
		{name:'astate',mapping:'SPDMasterList.astate'}, 
		{name:'spd_inctax',mapping:'SPDMasterList.spd_inctax'}, 
		{name:'data[SPDMaster][astate]',mapping:'SPDMasterList.astate'}, 
		{name:'data[SPDMaster][spd_id]',mapping:'SPDMasterList.spd_id'}, 
		{name:'data[SPDMaster][spd_inctax]',mapping:'SPDMasterList.spd_inctax'},
		{name:'data[SPDMaster][spd_no]',mapping:'SPDMasterList.spd_no'},
		{name:'data[SPDMaster][spd_date]',mapping:'SPDMasterList.spd_date', type: 'date', dateFormat: 'Y-m-d'},
		{name:'data[SPDMaster][slm_code]',mapping:'SPDMasterList.slm_code'},
		{name:'data[SPDMaster][cust_code]',mapping:'SPDMasterList.cust_code'},
		{name:'data[SPDMaster][cust_name]',mapping:'SPDMasterList.cust_name'},
		{name:'data[SPDMaster][cust_address1]',mapping:'SPDMasterList.cust_address1'},
		{name:'data[SPDMaster][cust_address2]',mapping:'SPDMasterList.cust_address2'},
		{name:'data[SPDMaster][cust_city]',mapping:'SPDMasterList.cust_city'},
		{name:'data[SPDMaster][cust_prov]',mapping:'SPDMasterList.cust_prov'},
		{name:'data[SPDMaster][cust_country]',mapping:'SPDMasterList.cust_country'},
		{name:'data[SPDMaster][cust_phone1]',mapping:'SPDMasterList.cust_phone1'},
		{name:'data[SPDMaster][cust_fax]',mapping:'SPDMasterList.cust_fax'},
		{name:'data[SPDMaster][cust_email]',mapping:'SPDMasterList.cust_email'},
		{name:'data[SPDMaster][spd_totqty]',mapping:'SPDMasterList.spd_totqty'},
		{name:'data[SPDMaster][spd_subtotal]',mapping:'SPDMasterList.spd_subtotal'},
		{name:'data[SPDMaster][spd_tottax]',mapping:'SPDMasterList.spd_tottax'},
		{name:'data[SPDMaster][spd_discval]',mapping:'SPDMasterList.spd_discval'},
		 
		{name:'data[SPDMaster][spd_disc1]',mapping:'SPDMasterList.spd_disc1'},
		{name:'data[SPDMaster][spd_disc2]',mapping:'SPDMasterList.spd_disc2'},
		{name:'data[SPDMaster][spd_disc3]',mapping:'SPDMasterList.spd_disc3'},
		{name:'data[SPDMaster][spd_shipcost]',mapping:'SPDMasterList.spd_shipcost'},
		{name:'data[SPDMaster][spd_shipweight]',mapping:'SPDMasterList.spd_shipweight'},
		{name:'data[SPDMaster][spd_othercost]',mapping:'SPDMasterList.spd_othercost'},
		{name:'data[SPDMaster][spd_total]',mapping:'SPDMasterList.spd_total'},
		{name:'data[SPDMaster][spd_totalgross]',mapping:'SPDMasterList.spd_totalgross'},
		{name:'data[SPDMaster][allproc]',mapping:'SPDMasterList.allproc'}		
	]
	 
	 
});

var SPDMasterStore = new Ext.data.GroupingStore({
  	reader:spdMasterJsonReader,
	groupField:'data[SPDMaster][cust_code]',
	 remoteGroup:false,
	  groupOnSPDrt: false,
	 
	proxy: new Ext.data.HttpProxy({
        url: urlgetspdmaster
    })
});
var SPDDetailGrid = Ext.extend( Ext.grid.EditorGridPanel, {
    iconCls: 'icon-form',
    frame:false,
	border:false,
	loadMask: true,
	 plugins:[ new Ext.ux.grid.GridSummary({position:'bottom',height:0})],
	sm: new Ext.grid.RowSelectionModel({	moveEditorOnEnter:false,
								singleSelect: true 
								}),
    initComponent : function() {
 
	this.relayEvents(this.store, ['destroy', 'save', 'update']); 
	//this.tbar = this.buildTopToolbar();
    SPDDetailGrid.superclass.initComponent.call(this);
    },
 
    buildTopToolbar : function() {
       return {
			 plugins: new Ext.ux.ToolbarKeyMap(),
			items: [{
				text: '<u>A</u>dd',
				iconCls: 'add',
				 keyBinding: {
                            key: 'a',
                            alt: true
                        },
				handler: this.onAdd,
				scope: this
			}, '-', {
				text: '<u>D</u>elete',
				iconCls: 'delete',
				handler: this.onDelete,
				scope: this,
				 keyBinding: {
                            key: 'd',
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
			aitm_code=rec.get("itm_code");
			aid=rec.get("spdd_id");
			if (aitm_code.length>0){
				acontinue=true;
			}
		}else{
			acontinue=true;
		}
		if (Ext.getCmp('cust_code1').getValue()==''){
			Ext.MessageBox.show({
				           title:'Insert Customer First',
				           msg: 'Please Set Customer First',
				           buttons: Ext.MessageBox.OK,
				          
				           icon: Ext.MessageBox.WARNING
				        });
			acontinue=false;
		}
		
		if (acontinue) {
			if (pricelevel == -1) {
						  pricelevel=1;
			}
		}
		 
		if (acontinue) {
			//alert('continue');
			var u = new this.store.recordType({
				spdd_id: 0,
				itm_code: '',
				spdd_qty:0,
				spdd_price:0,
				itm_unit:'PCS',
				proc:0,
				spdd_inctax:0,
				spdd_taxval:0,
				spdd_disc1:0,
				spdd_disc2:0,
				spdd_discval:0,
				spdd_subtotal:0
				
				
				
			});
			
			this.store.insert(0, u);
			
			 this.getSelectionModel().selectRow(0,false,false);
		  this.startEditing(0, 1);
		}
		
		 this.getSelectionModel().selectRow(0,false,false);
		 this.startEditing(0, 1);
		  
	},
 
    onDelete : function(btn, ev) {
         var index =this.getSelectionModel().getSelected();
        if (!index) {
            return false;
        }
        
		
        this.store.remove(index);
		  hitungTotalSPD2();
    } 
	,
	listeners : {
		afteredit: function (o){
			//alert(o.field+":"+o.value+":"+o.originalValue+":"+o.row+":"+o.column );			
			proc_spd1(o);
		}
		 
	}
});

MyDesktop.AddSPDMasterForm = Ext.extend(Ext.app.Module, {
    id:'addspdmaster-win',
	title:'Entry SPD',
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
                width:900,
                height:500,
                iconCls: 'icon-form',
                animCollapse:false,
                constrainHeader:true,
				stripeRows: true,
				border:false,
               layout:'fit',
                items :
					[addspdmasterform = new Ext.FormPanel({
						id:'addspdmasterform',
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
									columns:4,
									defaults: {
										 
										border: false,
										align:'left'
									},       
									 width: 300,	
									 //height:85,   
									 autoHeight:true,
									items: [{
											 columnWidth:'.33',
											 defaults:{ layout:'form',anchor:'95%',  autoHeight:false},  
											layout: 'form',
											border: false, 	
										 
											items:[  
											{	 xtype:'hidden',
												 name: 'data[SPDMaster][spd_id]',
												 
												id:'spd_id1' 
												 
											},
											{	 xtype:'hidden',
												 name: 'data[SPDMaster][spd_totqty]', 
												id:'spd_totqty' 
												 
											},
											{	 xtype:'textfield',
												fieldLabel: 'No Surat',
												name: 'data[SPDMaster][spd_no]',
												maxLength:20,
												id:'spd_no1',
												value:'Automatic',
												allowBlank:false
											},
											{	 xtype:'datefield',
												fieldLabel: 'Tanggal',
												id:'spd_date1',
												name: 'data[SPDMaster][spd_date]',
												maxLength:50, 
												format:'Y-m-d',
												allowBlank:false
											},
											 
										]
									},
									{
										columnWidth:'.33',
										layout: 'form',
										border:false,
										defaults:{ layout:'form',anchor:'95%',  autoHeight:false},
										items:[ 
											  {	 xtype:'numberfield',
												fieldLabel: 'Anggaran',
												name: 'data[SPDMaster][spd_anggaran]',
												maxLength:20,
												id:'spd_angg1',
												value:'0',
												allowBlank:false
											},
											 {	 xtype:'numberfield',
												fieldLabel: 'Akumulasi SPD',
												name: 'data[SPDMaster][spd_akum]',
												maxLength:20,
												id:'spd_akum1',
												value:'0',
												allowBlank:false
											},
											 {	 xtype:'numberfield',
												fieldLabel: 'SPD Saat Ini',
												name: 'data[SPDMaster][spd_now]',
												maxLength:20,
												id:'spd_now1',
												value:'0',
												allowBlank:false
											}
										]
									},{
										layout: 'form',
										defaults: {
											layout: 'form',
											anchor: '95%',
											autoHeight: false
										},
										columnWidth:'.33', 
										items: [ 
											 {	 xtype:'numberfield',
												fieldLabel: 'Anggaran',
												name: 'data[SPDMaster][spd_sisangg]',
												maxLength:20,
												id:'spd_sisaangg1',
												value:'0',
												allowBlank:false
											}
												    
										 ]
									}
									]
								}//end of top form
								,
								{
									 
									layout: 'fit',
									border: false,
									frame:false,
									region: 'center',
									items: spddetailGrid = new SPDDetailGrid({
										id: 'spddetailGrid',
										autoWidth:true,
										height: 300,
										border: true,
										frame:true,
										stripeRows: true,
										store: SPDDetailStore,
										title:'Belanja Gaji dan Tunjangan',
										columns: [  {
											header: "Kode Rek",
											width: 100,
											spdrtable: true,
											dataIndex: 'itm_name'
										},{
											header: "Uraian",
											width: 200,
											spdrtable: true,
											dataIndex: 'itm_name'
										},   {
											header: "Anggaran",
											width: 100,
											spdrtable: true,
											summaryType: 'sum',
											dataIndex: 'spdd-angg',
											 
											isCellEditable: true,
											allowBlank: false,
											editor:new Ext.form.NumberField({enableKeyEvents :true  
													}) 
										}, {
											header: "Akumulasi Sebelumnya",
											width: 180,
											spdrtable: true,
											align:'right',
											summaryType: 'sum',
											dataIndex: 'spdd_akum',
											renderer: Ext.util.Format.numberRenderer('0,000.00') 
										},
										{
											header: "SPD Periode Ini",
											width: 180,
											spdrtable: true,
											align:'right',
											summaryType: 'sum',
											dataIndex: 'spdd_now',
											renderer: Ext.util.Format.numberRenderer('0,000.00') 
										},
										  {
											header: "ID",
											width: 40,
											spdrtable: true,
											dataIndex: 'spdd_id',
											summaryType: 'count'
										} ]
									
									}) //end of grid
								},
								{	//bottom form
									region:'south', 
									layout:'column',
									bodyStyle:'padding:5px 5px 0',
									border: false,
									columns:4,
									defaults: {
										columnWidth: '.25',
										border: false,
										align:'right'
									},       
									 
									 autoHeight:true, 
									 
									items: [
										 
										 
									]
								}//end of bottom form
							 ]
							  
				         ,
						 buttons: {
						   layout:'hbox' ,
						     defaults:{margins:'0 5 0 0'},
						 	items: [{
						 		text: 'Create New',
						 		iconCls: 'new',
								id:'spd2-new',
								disabled:true,
						 		handler: function(){
						 			addspdmasterform.getForm().reset();
						 			SPDDetailStore.load({
						 				params: {
						 					spd_id: 0
						 				}
						 			});
						 			Ext.getCmp('spd_date1').setValue(new Date());
									Ext.getCmp('spd_id1').setValue(0);
						 		}
						 	},{
										text:'Print',
										id:'print_spd',
										tooltip:'Print SPD ',
										iconCls:'printer',
										handler:function(){
											aid=Ext.getCmp('spd_id1').getValue();
											aurl=HOST_PATH+'/rptspd/spd/'+aid;
											window.open(aurl,'_blank');
	
										}
								}, {
						 		xtype: 'spacer',
						 		flex: 1
						 	}, {
                                        xtype:'spacer',
                                        flex:1
                                    }, {
						 		text: 'Save',
						 		iconCls: 'save',
								id:'spd2-save',
								disabled:true,
						 		handler: function(){
						 			if (addspdmasterform.getForm().isValid()) {
						 				addspdmasterform.getForm().submit({
						 					url: urladdspdmaster,
						 					waitMsg: 'Saving data...',
						 					success: function(form, action){
						 						newid = action.result.newid;
						 						newno = action.result.newno;
						 						if (newid != '') {
						 							//alert(newid);
														// Ext.getCmp('form_no').setValue(newid);
														// alert(newid);
														Ext.getCmp('spd_no1').setValue(newno);
														Ext.getCmp('spd_id1').setValue(newid)
														Ext.getCmp('spd_no1').setReadOnly(true);
														 
														SPDDetailStore.setBaseParam('master', newid);
														 	SPDDetailStore.save();
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
									id:'spd2-cancel',
									disabled:true,
									handler: function(){
										SPDMasterStore.reload();
										MyDesktop.getSingleModule('addspdmaster-win').closeWindow();
										
										
									}
									
								}]
							}
		   		 }) //end of top panel
				 
				  
							 
				 ]// end of main item
                 
            });
        }
	
        win7.show();
		if (pv_spd_order>=1){
			Ext.getCmp('spd2-new').enable();
			Ext.getCmp('spd2-cancel').enable();
			Ext.getCmp('spd2-save').enable();
		}
		 
    }
});
MyDesktop.SPDGridWindow = Ext.extend(Ext.app.Module, {
    id:'spdgrid-win',
   init : function(){
      this.launcher = {
            text: 'SPD List',
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
                title:'Sales Order List',
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
					gridspd = new Ext.grid.GridPanel({
							id: 'gridspdwindow',
						 
							 store: SPDMasterStore,
							trackMouseOver: true,
							disableSelection: false,
							loadMask: true,
							// grid columns
							columns: [{
								header: "Status",
								dataIndex: 'astate',
								width:50,
								spdrtable: true,
								renderer: StateChange
							},{
								header: "Proceed",
								dataIndex: 'SPDMasterList.allproc',
								width:80,
								spdrtable: true,
								renderer: YesNoChange
							},{
								header: "ID",
								dataIndex: 'data[SPDMaster][spd_id]',
								width: 80,
								spdrtable: true
							}, {
								header: "S.O.No",
								dataIndex: 'data[SPDMaster][spd_no]',
								width: 100,
								spdrtable: true
							},
							{
								header: "S.O. Date",
								dataIndex: 'data[SPDMaster][spd_date]',
								width: 150,
								spdrtable: true,
								 renderer: function(date) { return date.format("d/m/Y"); }
						
							},
							{
								header: "Salesman  Code",
								dataIndex: 'data[SPDMaster][slm_code]',
								width: 150,
								spdrtable: true
							},
							{
								header: "Cust. Code",
								dataIndex: 'data[SPDMaster][cust_code]',
								width: 150,
								spdrtable: true
							},
							{
								header: "Cust. Name",
								dataIndex: 'data[SPDMaster][cust_name]',
								width: 200,
								spdrtable: true
							},
							{
								header: "Cust. City",
								dataIndex: 'data[SPDMaster][cust_city]',
								width: 100,
								spdrtable: true
							},
							{
								header: "Qty",
								dataIndex: 'data[SPDMaster][spd_totqty]',
								width: 80,
								spdrtable: true,
								align: 'right',
								renderer: Ext.util.Format.numberRenderer('0,000.00')
							},
							{
								header: "Subtotal",
								dataIndex: 'data[SPDMaster][spd_subtotal]',
								width: 100,
								spdrtable: true,
								align: 'right',
								renderer: Ext.util.Format.numberRenderer('0,000.00')
							
							},
							 {
								header: "Discount",
								dataIndex: 'data[SPDMaster][spd_discval]',
								width: 100,
								align: 'right', 
								renderer: Ext.util.Format.numberRenderer('0,000.00')
								 
						 	},
							{
								header: "Shipp. Cost",
								dataIndex: 'data[SPDMaster][spd_shipcost]',
								width: 80,
								align: 'right',
							 	renderer: Ext.util.Format.numberRenderer('0,000.00')
								 
						 	},
							{
								header: "Shipp. Weight",
								dataIndex: 'data[SPDMaster][spd_shipweight]',
								width: 100,
								align: 'right',
								renderer: Ext.util.Format.numberRenderer('0,000.00')
						 	},
							{
								header: "Other Cost",
								dataIndex: 'data[SPDMaster][spd_othercost]',
								width: 100,
								align: 'right',
								renderer: Ext.util.Format.numberRenderer('0,000.00')
						 	},
							{
								header: "Total",
								dataIndex: 'data[SPDMaster][spd_total]',
								width: 100,
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
											if (pv_spd_order>=2)
											 Ext.getCmp('delspdbutt').enable();
											 if (pv_spd_order >= 1) {
											 	Ext.getCmp('editspdbutt').enable();
											 	Ext.getCmp('applyspdbutt').enable();
											 }
										 }
										else {
										 	Ext.getCmp('delspdbutt').disable();
										 	Ext.getCmp('editspdbutt').disable();
											Ext.getCmp('applyspdbutt').disable();
										 	 
										}
									}
								}
							}),
							bbar: new Ext.PagingToolbar({
								pageSize: 20,
								 store: SPDMasterStore,
								displayInfo: true,
								displayMsg: 'Displaying contents {0} - {1} of {2}',
								emptyMsg: "No Content to display",
								plugins: new Ext.ux.SlidingPager(),
								listeners :{
										'change' : function(){
										 SPDMasterStore.baseParams={start:'start',limit:'limit',search:Ext.getCmp("searchSPDTxt").getValue()};
			    
										}
									}
									 
							}),
							tbar: [{
								text: 'Sales Order',
								iconCls: 'spdpdrder',
								ref: '../spdButton',
								
								menu: {
									xtype: 'menu',
									plain: true,
									items: [{
										text: 'Add',
										iconCls: 'add',
										handler: function(){
											/* itemUnitStore.load({params:{itm_code:0}});
											 itemBarcodeStore.load({params:{itm_code:0}});
											 itemPriceStore.load({params:{itm_code:0}});
											 */
											 MyDesktop.getSingleModule('addspdmaster-win').createWindow();
											 
											 SPDDetailStore.load({params:{spd_id:0}});
											
											 Ext.getCmp("addspdmasterform").getForm().reset();
											 Ext.getCmp('spd_date1').setValue(new Date());
											 
												 		Ext.getCmp('spddetailGrid').enable();
														Ext.getCmp('spd2-save').enable();
			 
										 		Ext.getCmp('spddetailGrid').enable();
												Ext.getCmp('spd2-save').enable();
			 			
										}
									} ,{
										id: 'applyspdbutt',
										text: 'Apply-Open',
										iconCls: 'apply',
										disabled: true,
										handler: function(){
										
											mid=gridspd.getSelectionModel().getSelected().get("SPDMasterList.spd_id");
 											astate = gridspd.getSelectionModel().getSelected().get("astate");
											Ext.MessageBox.show({
												msg: 'Request update record #' + mid + '...',
												progressText: 'Process...',
												width: 300,
												wait: true,
												waitConfig: {
													interval: 200
												},
												icon: 'ext-mb-download', //custom class in msg-box.html
												animEl: 'mb7'
											});
											Ext.Ajax.request({
												url: urlstatespd,
												params: {
													id: mid,
													state: astate
												},
												method: 'GET',
												success: function(result, request){
													Ext.MessageBox.hide();
													
													var jspdnData = Ext.util.JSPDN.decode(result.responseText);
																 
													Ext.MessageBox.alert('Information', jspdnData.msg); 
													SPDMasterStore.reload();
												},
												failure: function(result, request){
													Ext.MessageBox.hide();
													
													Ext.MessageBox.alert('Failed', result.responseText);
												}
												
											});
										}
										}, {
										id: 'editspdbutt',
										text: 'Edit',
										iconCls: 'edit',
										disabled: true,
										handler: function(){
											mid=gridspd.getSelectionModel().getSelected().get("SPDMasterList.spd_id");
											 pricelevel=gridspd.getSelectionModel().getSelected().get("SPDMasterList.ct_pricelvl");			
											SPDDetailStore.load({params:{spd_id:mid}});
											 MyDesktop.getSingleModule('addspdmaster-win').createWindow();
										 
										 
											Ext.getCmp("addspdmasterform").getForm().loadRecord(gridspd.getSelectionModel().getSelected());
											 if (gridspd.getSelectionModel().getSelected().get("astate")=="1") {
											 	Ext.getCmp('spddetailGrid').disable();
												Ext.getCmp('spd2-save').disable();
											 }
											  
										 	else {
												 		Ext.getCmp('spddetailGrid').enable();
														Ext.getCmp('spd2-save').enable();
												 }		
											
										}
									},{
											id: 'delspdbutt',
											text: 'Delete',
											iconCls: 'delete',
											disabled: true,
											handler: function(){
												
								
												aid=gridspd.getSelectionModel().getSelected().get('SPDMasterList.spd_id');
												
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
													        url:urldelspdmaster,
													        params : {id :aid},
															method: 'GET',
															success: function ( result, request ) { 
																	Ext.MessageBox.hide();
						
																	var jspdnData = Ext.util.JSPDN.decode(result.responseText);
																 
																	Ext.MessageBox.alert('Information', jspdnData.msg); 
																	SPDMasterStore.reload();
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
									id:'searchSPDTxt',
								    text:'*',
							        emptyText:'*',
							        selectOnFocus:true,
									listeners: {
						              specialkey: function(f,e){
						                if (e.getKey() == e.ENTER) {
								                SPDMasterStore.load({params: {
													start: 0,
													limit: 20,
													 search:Ext.getCmp("searchSPDTxt").getValue()
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
								  SPDMasterStore.load({params: {
									start: 0,
									limit: 20,
									 search:Ext.getCmp("searchSPDTxt").getValue()
									 }})
						       
					        }
							}]
						
						})//end of grid
					
				
					
            });
        }
		 
        win2.show();
		SPDMasterStore.load({params:{start:0, limit:20, search:'*'}});
		spdmanComboStore.load();
		 
		/* unitComboStore.load();
		groupComboStore.load();
		subgroupComboStore.load();
		branchComboStore.load();
		*/
		gridspd.on('rowdblclick',function(sm, rowindex, eventobject){
			 
			mid=gridspd.getSelectionModel().getSelected().get("SPDMasterList.spd_id");
			pricelevel=gridspd.getSelectionModel().getSelected().get("SPDMasterList.ct_pricelvl");							 
											SPDDetailStore.load({params:{spd_id:mid}});
											 MyDesktop.getSingleModule('addspdmaster-win').createWindow();
										 
										 
											Ext.getCmp("addspdmasterform").getForm().loadRecord(gridspd.getSelectionModel().getSelected());
			if (gridspd.getSelectionModel().getSelected().get("astate")=="1") {
			 	Ext.getCmp('spddetailGrid').disable();
				Ext.getCmp('spd2-save').disable();
			 }
			  
		 	else {
				 		Ext.getCmp('spddetailGrid').enable();
						Ext.getCmp('spd2-save').enable();
				 }								 
			
		});
		 
		 
	}
}); 