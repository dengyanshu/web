Ext.define("core.smt_jitchaoling.store.Store",{
	extend:'Ext.data.Store',
	model:'core.smt_jitchaoling.model.Model',
    autoLoad:true,
    proxy: {
    	url:'/web/kanban/smt_chaoling_kanban!getResult.action',
        type: 'ajax',
        reader: {
            type: 'json',
            root:'data',
            totalProperty: 'total'
        }
    }  
});