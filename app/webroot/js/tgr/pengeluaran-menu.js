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
        		text:'SPP TU',
        		id:'mnSPPTU',
        		handler: onSPPTUClick
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
        		text:'Pelimpahan UP',
        		id:'mnLimpahUp',
        		handler: onLimpahUpClick
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
		MyDesktop.getSingleModule('gajigrid-win').createWindow();
		MyDesktop.getSingleModule('entrygaji-win').createWindow();
	}
	function onSerahTerimaClick(){
		MyDesktop.getSingleModule('acaragrid-win').createWindow();
		MyDesktop.getSingleModule('entryacara-win').createWindow();
	}
	function onBansosClick(){
		MyDesktop.getSingleModule('bansosgrid-win').createWindow();
		MyDesktop.getSingleModule('entrybansos-win').createWindow();
	}
	function onSPPUPClick(){
		MyDesktop.getSingleModule('sppgrid-win').createWindow();
		MyDesktop.getSingleModule('entrySPPUP-win').createWindow();
	}
	function onSPPGUClick(){
		MyDesktop.getSingleModule('sppgrid-win').createWindow();
		MyDesktop.getSingleModule('entrySPPGU-win').createWindow();
	}
	function onSPPTUClick(){
		MyDesktop.getSingleModule('sppgrid-win').createWindow();
		MyDesktop.getSingleModule('entrySPPTU-win').createWindow();
		}
	function onSPPLSClick(){
		MyDesktop.getSingleModule('sppgrid-win').createWindow();
		MyDesktop.getSingleModule('entrySPPLS-win').createWindow();
	}
	function onSPMClick(){
	 MyDesktop.getSingleModule('spmgrid-win').createWindow();
	 MyDesktop.getSingleModule('entryspm-win').createWindow();
	}
	function onSP2DClick(){
	//	MyDesktop.getSingleModule('addspdmaster-win').createWindow();
		 MyDesktop.getSingleModule('sp2dgrid-win').createWindow();
		 MyDesktop.getSingleModule('entrysp2d-win').createWindow();
	}
	function onGeserKasClick(){
	//	MyDesktop.getSingleModule('addspdmaster-win').createWindow();
		 MyDesktop.getSingleModule('geserkasgrid-win').createWindow();
		 MyDesktop.getSingleModule('entrygeserkas-win').createWindow();
	}
	function onKeluarBiayaClick(){
		 MyDesktop.getSingleModule('pembiayaangrid-win').createWindow();
		 MyDesktop.getSingleModule('entrypembiayaan-win').createWindow();
	}
	function onBelanjaClick(){
	//	MyDesktop.getSingleModule('addspdmaster-win').createWindow();
		 MyDesktop.getSingleModule('belanjagrid-win').createWindow();
		 MyDesktop.getSingleModule('entrybelanja-win').createWindow();
	}
	 
	function onLimpahUpClick(){
		 MyDesktop.getSingleModule('limpahupgrid-win').createWindow();
		 MyDesktop.getSingleModule('entrylimpahup-win').createWindow();
	}
	function onTextReportClick(item){
        MyDesktop.getSingleModule('reportlist-win').createWindow();
    }
	 
     
});
 
  