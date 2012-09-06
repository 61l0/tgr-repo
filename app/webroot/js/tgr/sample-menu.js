/**
 * @author McG
 * @date 1 April 2011
 */
Ext.onReady(function(){
    Ext.QuickTips.init();
 
    var menuMaintain = new Ext.menu.Menu({
        id: 'menuMaintain',
        style: {
            overflow: 'visible'     // For the Combo popup
        },
        items: [
       			{
				text: 'Costs',
				id:'mnCost',
				 disabled:true,
				handler: onCostClick
				}, {
				text: 'Item List',
				id:'mnItemList',
				 disabled:true,
				handler: onItemListClick
				},'-',{
				text: 'Bill Of Materials',
				id:'mnBOM',
				 disabled:true,
				handler: onBOMClick
				}
             
				 
        ]
    });
	 
	var menuTransaction = new Ext.menu.Menu({
        id: 'menuTransaction',
        style: {
            overflow: 'visible'     // For the Combo popup
        },
        items: [
        	{
        		text:'SPD',
        		id:'mnSPD',
        		handler: onSPDClick
        	},
            {
                text: 'Job Order',
				id:'mnJobOrder',
				 disabled:true,
                handler: onJobOrderClick
               
            }, {
                text: 'Material Supply',
				id:'mnMaterialSupply',
				  disabled:true,
                handler: onMaterialSupplyClick
               
            } , '-',{
                text: 'Work In Process',
				id:'mnWIP',
				  disabled:true,
                handler: onWIPClick
               
            },
            {
                text: 'Production',
				id:'mnProduction',
				  disabled:true,
                handler: onProductionClick
               
            }
            
        ]
    });
	var menuReport = new Ext.menu.Menu({
        id: 'menuReport',
        style: {
            overflow: 'visible'     // For the Combo popup
        },
        items: [
            {
                text: 'Text Report Gallery',
                handler: onTextReportClick,
				id:'mnTextReport',
				 disabled:true,
				 iconCls:'menuReportText'
               
            }  
        ]
    });
    var tb = new Ext.Toolbar();
    tb.render('toolbar');

    tb.add({
            text:'Maintenance',
            iconCls: 'menuMaintain',  // <-- icon
            menu: menuMaintain  // assign menu by instance
        },'-',
		{
			text:'Transaction',
			 iconCls: 'menuTransaction',
			menu:menuTransaction
		},'-',
		{
			text:'Reports',
			 iconCls: 'menuReport',
			menu:menuReport
		}
    );

     
    
    tb.doLayout();
	/*if (window.pv_bom != undefined) {
		 	menuMaintain.items.get('mnBOM').enable();
	}  
	if (window.pv_cost != undefined) {
		 	menuMaintain.items.get('mnCost').enable();
	}  
	if (window.pv_item_manu != undefined) {
		 	menuMaintain.items.get('mnItemList').enable();
	}  
	if (window.pv_jo != undefined) {
		 	menuTransaction.items.get('mnJobOrder').enable();
	} 
	if (window.pv_wip != undefined) {
		 	menuTransaction.items.get('mnWIP').enable();
	}  
	if (window.pv_production != undefined) {
		 	menuTransaction.items.get('mnProduction').enable();
	}  
	if (window.pv_matsupply != undefined) {
		 	menuTransaction.items.get('mnMaterialSupply').enable();
	}  
	if (window.pv_manureport != undefined) {
		 	menuReport.items.get('mnTextReport').enable();
	}  
	*/
	function onSPDClick(){
		MyDesktop.getSingleModule('addspdmaster-win').createWindow();
	}
	function onBOMClick(){
		MyDesktop.getSingleModule('bomgrid-win').createWindow();
	}
	 
	function onTextReportClick(item){
        MyDesktop.getSingleModule('reportlist-win').createWindow();
    }
	 
    function onItemListClick(item){
        MyDesktop.getSingleModule('itemgrid-win').createWindow();
		 
    }
	 
    function onJobOrderClick(item){
         MyDesktop.getSingleModule('jogrid-win').createWindow();
		 
		
    }
	function onWIPClick(item){
		MyDesktop.getSingleModule('wipgrid-win').createWindow();
	}
	function onProductionClick(item){
		MyDesktop.getSingleModule('prodgrid-win').createWindow();
	}
	function onCostClick(item){
		MyDesktop.getSingleModule('costlist-win').createWindow();
	}
	function onMaterialSupplyClick(item){
		MyDesktop.getSingleModule('supplygrid-win').createWindow();
	}
     
});
 
  