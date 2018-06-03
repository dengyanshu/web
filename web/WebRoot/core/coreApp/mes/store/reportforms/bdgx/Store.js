
Ext.define("core.mes.store.reportforms.bdgx.Store",{
	extend:'Ext.data.Store',
	remoteSort:true,
   	model:'core.mes.model.reportforms.bdgx.Model',
    pageSize:30,
    proxy:{
    	type:'pagingmemory',
    	reader:{
    		type:'json',
    		root:'data'
    	}
    }
});
