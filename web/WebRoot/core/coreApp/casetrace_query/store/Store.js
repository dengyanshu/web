Ext.define("core.casetrace_query.store.Store",{
	extend:'Ext.data.Store',
	model:'core.casetrace_query.model.Model',
	remoteSort:true,
    pageSize:30,
    autoLoad:false,
    proxy: {
        type: 'pagingmemory',
      	//url : '/web/case/case_trace_manage!queryResult.action',
        reader: {
            type: 'json',
            root: 'data'
        }
    },    
   groupField:'disposeUser'
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