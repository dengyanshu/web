Ext.define("core.mes.store.reportforms.rk.Store",{
	extend:'Ext.data.Store',
	remoteSort:true,
   	model:'core.mes.model.reportforms.rk.Model',
    pageSize:30,
    proxy:{
    	type:'pagingmemory',
    	reader:{
    		type:'json',
    		root:'data'
    	}
    }
});