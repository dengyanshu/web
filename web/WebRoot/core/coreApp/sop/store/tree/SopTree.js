/***************************************************************************
  								<报表查询类> 
 ***************************************************************************/

Ext.define("core.sop.store.tree.SopTree", {
	extend : 'Ext.data.TreeStore',
	proxy : {
	type : 'ajax',
	url : 'core/data/sop/tree/tree.json',
	reader : {
		type : 'json',
		root : 'sop'
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