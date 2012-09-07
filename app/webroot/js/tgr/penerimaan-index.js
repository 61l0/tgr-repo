var MyDesktop = new Ext.app.App({
	init :function(){
		  
	},
	 
	getModules : function(){
		return [
		 
		];
		
	},
	getSingleModule:function (name){
		return this.getModule(name);
	}
});

function StateChange(val){
	if(val =="0"){
	      return '<span style="color:green;"><img src="'+HOST_PATH+'/img/ext/pending.png"/></span>';
	}else {
	    return '<span style="color:red;"><img src="'+HOST_PATH+'/img/ext/lock.png"/></span>';
	}
};  