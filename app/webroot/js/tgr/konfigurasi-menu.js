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
				text: 'Informasi Umum',
				id:'mnInfo',
				 
				handler: onInfoClick
				}, {
				text: 'Organisasi/SKPD',
				id:'mnSKPD',
				 
				handler: onSKPDClick
				},'-',{
				text: 'Data Pejabat',
				id:'mnPejabat',
			 
				handler: onPejabatClick
				},
				{
				text: 'Data Pegawai',
				id:'mnPegawai',
			 
				handler: onPegawaiClick
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
        		text:'Satuan',
        		id:'mnSatuan',
        		handler: onSatuanClick
        	},
            {
                text: 'Standar Harga',
				id:'mnStandarHarga',
			 
                handler: onStandarHargaClick
               
            },  {
                text: 'Kebijakan Akuntansi',
				id:'mnAkuntansi',
			 
                handler: onAkuntasiClick
               
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
            text:'Pemerintahan',
            iconCls: 'menuMaintain',  // <-- icon
            menu: menuMaintain  // assign menu by instance
        },'-',
		{
			text:'Lain-lain',
			 iconCls: 'menuTransaction',
			menu:menuTransaction
		} 
    );

     
    
    tb.doLayout(); 
	function onInfoClick(){
		//MyDesktop.getSingleModule('addspdmaster-win').createWindow();
	}
	function onSKPDClick(){
	//	MyDesktop.getSingleModule('bomgrid-win').createWindow();
	}
	 
	function onTextReportClick(item){
      //  MyDesktop.getSingleModule('reportlist-win').createWindow();
    }
	 
    function onPegawaiClick(item){
        //MyDesktop.getSingleModule('itemgrid-win').createWindow();
		 
    }
	 
    function onPejabatClick(item){
         //MyDesktop.getSingleModule('jogrid-win').createWindow();
		 
		
    }
	function onSatuanClick(item){
		//MyDesktop.getSingleModule('wipgrid-win').createWindow();
	}
	function onStandarHargaClick(item){
		//MyDesktop.getSingleModule('prodgrid-win').createWindow();
	}
	function onAkuntasiClick(item){
		//MyDesktop.getSingleModule('costlist-win').createWindow();
	}
	 
     
});
 
  