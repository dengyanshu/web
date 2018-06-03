Ext.define("core.ff_moname.store.Store",{
	extend:'Ext.data.Store',
	model:'core.ff_moname.model.Model',
    autoLoad:true,
    proxy: {
    	url:'/web/kanban/ff_sl_list!getResult3.action',
        type: 'ajax',
        reader: {
            type: 'json',
            root:'data',
            totalProperty: 'total'
        }
    }  
});