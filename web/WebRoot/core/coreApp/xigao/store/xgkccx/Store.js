Ext.define("core.xigao.store.xgkccx.Store",{
	extend:'Ext.data.Store',
	remoteSort:true,
   	model:'core.xigao.model.xgkccx.Model',
    pageSize:30,
    proxy:{
    	type:'pagingmemory',
    	reader:{
    		type:'json',
    		root:'data'
    	}
    }
});