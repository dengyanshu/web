Ext.define("core.smt_cn_kanban.store.Storecn",{
	extend:'Ext.data.Store',
	model:'core.smt_cn_kanban.model.Modelcn',
	autoLoad:false,
	proxy:{
		url:'/web/kanban/smt_cn_kanban!getResult.action',
        type: 'ajax',
        reader: {
            type: 'json',
            root:'data'
        }
	}
	
});