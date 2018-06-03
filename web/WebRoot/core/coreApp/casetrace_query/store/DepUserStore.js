Ext.define("core.casetrace_query.store.DepUserStore",{
	extend:'Ext.data.Store',
	model:'core.casetrace_query.model.DepUserModel',

    autoLoad:true,
    proxy: {
        type: 'ajax',
      	url : '/web/case/case_trace_manage!getDepUser.action',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});