var mainPageItems=comm.get("mainPageItems");
Ext.define("core.iqc_kanban.store.Store",{
	extend:'Ext.data.Store',
	model:'core.iqc_kanban.model.Model',
    autoLoad:false,
    pageSize:mainPageItems,
    proxy: {
    	url:'/web/kanban/iqc_kanban!getResult.action',
        type: 'ajax',
        reader: {
            type: 'json',
            root:'data',
            totalProperty: 'total'
        }
    }  
});