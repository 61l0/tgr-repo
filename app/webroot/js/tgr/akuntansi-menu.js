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
        		text:'Pengembalian Belanja',
        		id:'mnKembaliBelanja',
        		handler: onKembaliBelanjaClick
        	},
        	{
        		text:'Jurnal Umum',
        		id:'mnJurnal',
        		handler: onJurnalClick
        	},
        	{
        		text:'Rekening Koran',
        		id:'mnRekKoran',
        		handler: onRekKoranClick
        	},
        	'-',
        	{
        		text:'Saldo Akun',
        		id:'mnSaldoAkun',
        		handler: onSaldoAkunClick
        	},
        	{
        		text:'Saldo Kas',
        		id:'mnSaldoKas',
        		handler: onSaldoKasClick
        	},
        	{
        		text:'Saldo Bank',
        		id:'mnSaldoBank',
        		handler: onSaldoBankClick
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
	function onKembaliBelanjaClick(){
		 MyDesktop.getSingleModule('kembaligrid-win').createWindow();
		 MyDesktop.getSingleModule('entrykembali-win').createWindow();
	}
	 function onJurnalClick(){
		 MyDesktop.getSingleModule('jegrid-win').createWindow();
		 MyDesktop.getSingleModule('entryje-win').createWindow();
	}
	 function onSaldoAkunClick(){
		 
		 MyDesktop.getSingleModule('accbalgrid-win').createWindow();
		// MyDesktop.getSingleModule('jegrid-win').createWindow();
		 //MyDesktop.getSingleModule('entryje-win').createWindow();
	}
	 function onSaldoKasClick(){
			 MyDesktop.getSingleModule('kasbalgrid-win').createWindow();
			 //MyDesktop.getSingleModule('entryje-win').createWindow();
		}
	 function onSaldoBankClick(){
			  MyDesktop.getSingleModule('bankbalgrid-win').createWindow();
			 //MyDesktop.getSingleModule('entryje-win').createWindow();
		}
 
	 function onRekKoranClick(){
	//	MyDesktop.getSingleModule('addspdmaster-win').createWindow();
	}
	 
	function onTextReportClick(item){
        MyDesktop.getSingleModule('reportlist-win').createWindow();
    }
	 
     
});
 
  