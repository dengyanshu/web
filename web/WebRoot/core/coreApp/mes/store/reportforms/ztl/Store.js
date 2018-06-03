Ext.define("core.mes.store.reportforms.ztl.Store",{
	extend:'Ext.data.Store',
	remoteSort:true,
   	model:'core.mes.model.reportforms.ztl.Model',
    pageSize:30,
    proxy:{
    	type:'pagingmemory',
    	reader:{
    		type:'json',
    		root:'data'
    	}
    }
});