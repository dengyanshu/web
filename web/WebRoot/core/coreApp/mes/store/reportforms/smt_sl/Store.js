Ext.define("core.mes.store.reportforms.smt_sl.Store",{
	extend:'Ext.data.Store',
	remoteSort:true,
   	model:'core.mes.model.reportforms.smt_sl.Model',
    pageSize:30,
    proxy:{
    	type:'pagingmemory',
    	reader:{
    		type:'json',
    		root:'data'
    	}
    }
});