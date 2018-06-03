/***************************************************************************
  								<报表查询类> 
 ***************************************************************************/

Ext.define("core.tj_zm_kanban.store.Tree", {
	extend : 'Ext.data.TreeStore',
	proxy : {
	type : 'ajax',
	url : 'core/data/kanban/tree/tree.json',
	reader : {
		type : 'json',
		root : 'tj_zm'
		}
	},
 	autoLoad : true,				 //自动加载打开
    sorters: [{					
        property: 'leaf',			
        direction: 'ASC'			//排序
    }],
    
    root:{
   	    nodeType: 'async',			//类型为同步
   	    expanded:true
   	 }
});