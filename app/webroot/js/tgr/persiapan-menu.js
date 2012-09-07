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
				text: 'Rekening',
				id:'mnRekening',
			 
				handler: onRekClick
				}, {
				text: 'Program & Kegiatan',
				id:'mnProgKeg',
				 
				handler: onProgKegClick
				},
				 {
				text: 'Struktur Urusan Pemerintah',
				id:'mnStruktur',
				 
				handler: onStrukturClick
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
        		text:'DPA SKPD 1',
        		id:'mnSKPD1',
        		handler: onSKPD1Click
        	},
            {
        		text:'DPA SKPD 2.1',
        		id:'mnSKPD21',
        		handler: onSKPD21Click
        	},
             {
        		text:'DPA SKPD 2.2',
        		id:'mnSKPD22',
        		handler: onSKPD22Click
        	},
            {
        		text:'DPA SKPD 3.1',
        		id:'mnSKPD31',
        		handler: onSKPD31Click
        	},
        	  {
        		text:'DPA SKPD 3.2',
        		id:'mnSKPD32',
        		handler: onSKPD32Click
        	},
        	  {
        		text:'DPA SKPD',
        		id:'mnDPASKPD',
        		handler: onDPASKPDClick
        	},
        	'-',
        	{
        		text:'Permohonan SPD',
        		id:'mnMohonSPD',
        		handler: onMohonSPDClick
        	},
         
        	{
        		text:'SPD',
        		id:'mnSPD',
        		handler: onSPDClick
        	},
        	{
        		text:'Register SPD',
        		id:'mnRegSPD',
        		handler: onRegSPDClick
        	},
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
            text:'Master',
            iconCls: 'menuMaintain',  // <-- icon
            menu: menuMaintain  // assign menu by instance
        },'-',
		{
			text:'Transaksi',
			 iconCls: 'menuTransaction',
			menu:menuTransaction
		},'-',
		{
			text:'Laporan',
			 iconCls: 'menuReport',
			menu:menuReport
		}
    );

     
    
    tb.doLayout(); 
    function onRekClick(){
	//	MyDesktop.getSingleModule('addspdmaster-win').createWindow();
	}
	function onProgKegClick(){
	//	MyDesktop.getSingleModule('addspdmaster-win').createWindow();
	}
	function onStrukturClick(){
	//	MyDesktop.getSingleModule('addspdmaster-win').createWindow();
	}
	function onSKPD1Click(){
		//MyDesktop.getSingleModule('addspdmaster-win').createWindow();
	}
	function onSKPD21Click(){
		//MyDesktop.getSingleModule('addspdmaster-win').createWindow();
	}
	function onSKPD22Click(){
		//MyDesktop.getSingleModule('addspdmaster-win').createWindow();
	}
	function onSKPD31Click(){
		//MyDesktop.getSingleModule('addspdmaster-win').createWindow();
	}
	function onSKPD32Click(){
		//MyDesktop.getSingleModule('addspdmaster-win').createWindow();
	}
	function onDPASKPDClick(){
		//MyDesktop.getSingleModule('addspdmaster-win').createWindow();
	}
	function onMohonSPDClick(){
	 MyDesktop.getSingleModule('spdpergrid-win').createWindow();
	}
	function onSPDClick(){
		//MyDesktop.getSingleModule('addspdmaster-win').createWindow();
	}
	function onRegSPDClick(){
		//MyDesktop.getSingleModule('addspdmaster-win').createWindow();
	}
	 
	function onTextReportClick(item){
        MyDesktop.getSingleModule('reportlist-win').createWindow();
    }
	 
     
     
});
 
  