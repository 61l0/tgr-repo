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
        		text:'SKP Daerah',
        		id:'mnSKPDaerah',
        		handler: onSKPDaerahClick
        	},
             {
        		text:'SKP Daerah Pembantu',
        		id:'mnSKPDaerahBantu',
        		handler: onSKPDaerahBantuClick
        	},
        	'-',
        	 {
        		text:'SKR',
        		id:'mnSKR',
        		handler: onSKRClick
        	},
        	{
        		text:'SKR Pembantu',
        		id:'mnSKRBantu',
        		handler: onSKRBantuClick
        	},
        	'-',
        	{
        		text:'Bukti Pembayaran',
        		id:'mnBuktiBayar',
        		handler: onBuktiBayarClick
        	},
        	{
        		text:'Bukti Pembayaran Pembantu',
        		id:'mnBuktiBayarBantu',
        		handler: onBuktiBayarBantuClick
        	},
        	'-',
        	 {
        		text:'STS',
        		id:'mnSTS',
        		handler: onSTSClick
        	},
        	 {
        		text:'STS Pembantu',
        		id:'mnSTSBantu',
        		handler: onSTSBantuClick
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
	function onSKPDaerahClick(){
		//MyDesktop.getSingleModule('addspdmaster-win').createWindow();
	}
	function onSKPDaerahBantuClick(){
		//MyDesktop.getSingleModule('addspdmaster-win').createWindow();
	}
	function onSKRClick(){
		//MyDesktop.getSingleModule('addspdmaster-win').createWindow();
	}
	function onSKRBantuClick(){
		//MyDesktop.getSingleModule('addspdmaster-win').createWindow();
	}
	 
	 function onBuktiBayarClick(){
		//MyDesktop.getSingleModule('addspdmaster-win').createWindow();
	}
	 
	 function onBuktiBayarBantuClick(){
		//MyDesktop.getSingleModule('addspdmaster-win').createWindow();
	}
	 
	 function onSTSClick(){
		//MyDesktop.getSingleModule('addspdmaster-win').createWindow();
	}
	 
	 function onSTSBantuClick(){
		//MyDesktop.getSingleModule('addspdmaster-win').createWindow();
	}
 	  
	function onTextReportClick(item){
        MyDesktop.getSingleModule('reportlist-win').createWindow();
    }
	 
  
     
});
 
  