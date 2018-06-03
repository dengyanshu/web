Ext.define("core.xigao.store.xgsyjlcx.Store",{
	extend:'Ext.data.Store',
	remoteSort:true,
   	model:'core.xigao.model.xgsyjlcx.Model',
    pageSize:30,
    proxy:{
    	type:'pagingmemory',
    	reader:{
    		type:'json',
    		root:'data'
    	}
    }
});