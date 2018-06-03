Ext.define("core.casetrace_manage.store.Store",{
	extend:'Ext.data.Store',
	model:'core.casetrace_manage.model.Model',

    autoLoad:true,
    proxy: {
        type: 'ajax',
      	url : '/web/case/case_trace_manage!getResult.action',
        reader: {
            type: 'json',
            root: 'data'
        }
    },    
   groupField:'status'
   /* 
   sorters:[{				 //排序
    	property:'createTime',//字段
    	derection:'DESC'		 //升序排列  降序排列(DESC)
    }]
    filters:[{			//过滤
    	property:'name',//字段
    	value:/e/		//条件
    }]*/	
});