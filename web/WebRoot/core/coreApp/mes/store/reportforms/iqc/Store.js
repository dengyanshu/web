Ext.define("core.mes.store.reportforms.iqc.Store",{
	extend:'Ext.data.Store',
	remoteSort:true,
   	model:'core.mes.model.reportforms.iqc.Model',
    pageSize:30,
    proxy:{
    	type:'pagingmemory',
    	reader:{
    		type:'json',
    		root:'data'
    	}
    }
});