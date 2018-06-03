 /***************************************************************************
  								<Mes报表基本表格> 
 ***************************************************************************/
   Ext.define("core.mes.base.BaseGrid",{
 	extend:"Ext.grid.GridPanel",
	mode:'remote',									//模块类型			
	frame:true,			
	title:'资源列表',
	region:'center',
    loadMask:true,									//加载遮住罩
	stripeRows:true								    //斑马线效果
	//forceFit:true,								//强制宽度适应
	//selType:'checkboxmodel', 						//设定选择模式(check)
	//multiSelect:true,								//运行多选
	//autoExpandColumn:'descn',						//自动扩展填满表格			
   });
