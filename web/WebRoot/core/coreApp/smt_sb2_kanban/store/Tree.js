/***************************************************************************
  								<报表查询类> 
 ***************************************************************************/

Ext.define("core.smt_sb2_kanban.store.Tree", {
	extend : 'Ext.data.TreeStore',
	proxy : {
	type : 'ajax',
	url : 'core/data/kanban/tree/tree.json',
	reader : {
		type : 'json',
		root : 'smtsb2'
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