Ext.define("core.mes.store.BaseGridStore",{
	extend:'Ext.data.Store',
	remoteSort:true,
    pageSize:15,
    proxy:{
    	type:'pagingmemory',
    	reader:{
    		type:'json',
    		root:'data'
    	}
    }
});