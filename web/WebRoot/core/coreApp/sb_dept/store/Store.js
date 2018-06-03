var mainPageItems=comm.get("mainPageItems");
Ext.define("core.sb_dept.store.Store",{
	extend:'Ext.data.Store',
	model:'core.sb_dept.model.Model',
    autoLoad:false,
    pageSize:mainPageItems,
    proxy: {
    	url:'/web/kanban/sb_kanban!getInstrumentList.action',
        type: 'ajax',
        reader: {
            type: 'json',
            root:'data',
            totalProperty: 'total'
        }
    }  
});