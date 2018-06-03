/***************************************************************************
  								<数据集基类> 
 ***************************************************************************/
 
 Ext.define("core.mes.store.BaseTreeStore",{
 	extend:'Ext.data.TreeStore',
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
 
