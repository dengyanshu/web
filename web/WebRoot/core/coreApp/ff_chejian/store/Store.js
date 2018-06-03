Ext.define("core.ff_chejian.store.Store",{
	extend:'Ext.data.Store',
	model:'core.ff_chejian.model.Model',
    autoLoad:true,
    proxy: {
    	url:'/web/kanban/ff_sl_list!getResult2.action',
        type: 'ajax',
        reader: {
            type: 'json',
            root:'data',
            totalProperty: 'total'
        }
    }  
});