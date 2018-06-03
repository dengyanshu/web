/***************************************************************************
  								<报表查询类> 
 ***************************************************************************/

Ext.define("core.skill_manage.store.Tree", {
	extend : 'Ext.data.TreeStore',
	proxy : {
		type : 'ajax',
		url : 'core/data/skillmanage/tree.json',
		reader : {
			type : 'json',
			root : 'skill'
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