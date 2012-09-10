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
        		text:'Daftar Gaji',
        		id:'mnGaji',
        		handler: onGajiClick
        	},
             {
        		text:'Serah Terima',
        		id:'mnSerahTerima',
        		handler: onSerahTerimaClick
        	},
        	{
        		text:'SK Bansos/Hibah',
        		id:'mnBansos',
        		handler: onBansosClick
        	},
        	'-',
        	{
        		text:'SPP UP',
        		id:'mnSPPUP',
        		handler: onSPPUPClick
        	},
        	{
        		text:'SPP GU',
        		id:'mnSPPGU',
        		handler: onSPPGUClick
        	},
        	{
        		text:'SPP LS',
        		id:'mnSPPLS',
        		handler: onSPPLSClick
        	},
        	'-',
        	{
        		text:'SPM',
        		id:'mnSPM',
        		handler: onSPMClick
        	},
            {
        		text:'SP2D',
        		id:'mnSP2D',
        		handler: onSP2DClick
        	},
        	
             {
        		text:'Pergeseran Kas',
        		id:'mnGeserKas',
        		handler: onGeserKasClick
        	},
            
             {
        		text:'Belanja',
        		id:'mnBelanja',
        		handler: onBelanjaClick
        	},
        	 {
        		text:'Pengeluaran Pembiayaan',
        		id:'mnKeluarBiaya',
        		handler: onKeluarBiayaClick
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
	function onGajiClick(){
	//	MyDesktop.getSingleModule('addspdmaster-win').createWindow();
	}
	function onSerahTerimaClick(){
	//	MyDesktop.getSingleModule('addspdmaster-win').createWindow();
	}
	function onBansosClick(){
	//	MyDesktop.getSingleModule('addspdmaster-win').createWindow();
	}
	function onSPPUPClick(){
	//	MyDesktop.getSingleModule('addspdmaster-win').createWindow();
	}
	function onSPPGUClick(){
	//	MyDesktop.getSingleModule('addspdmaster-win').createWindow();
	}
	function onSPPLSClick(){
	//	MyDesktop.getSingleModule('addspdmaster-win').createWindow();
	}
	function onSPMClick(){
	 MyDesktop.getSingleModule('spmgrid-win').createWindow();
	}
	function onSP2DClick(){
	//	MyDesktop.getSingleModule('addspdmaster-win').createWindow();
		 MyDesktop.getSingleModule('sp2dgrid-win').createWindow();
	}
	function onGeserKasClick(){
	//	MyDesktop.getSingleModule('addspdmaster-win').createWindow();
	}
	function onKeluarBiayaClick(){
	//	MyDesktop.getSingleModule('addspdmaster-win').createWindow();
	}
	function onBelanjaClick(){
	//	MyDesktop.getSingleModule('addspdmaster-win').createWindow();
	}
	function mnKeluarBiaya(){
	//	MyDesktop.getSingleModule('addspdmaster-win').createWindow();
	}
	 
	 
	function onTextReportClick(item){
        MyDesktop.getSingleModule('reportlist-win').createWindow();
    }
	 
     
});
 
  