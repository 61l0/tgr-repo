var MyDesktop = new Ext.app.App({
	init :function(){
		  
	},
	 
	getModules : function(){
		return [
			new MyDesktop.SPDGridWindow(),
			new MyDesktop.AddSPDMasterForm()
		];
		
	},
	getSingleModule:function (name){
		return this.getModule(name);
	}
});