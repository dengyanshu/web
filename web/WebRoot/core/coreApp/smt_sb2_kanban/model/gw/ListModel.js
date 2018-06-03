Ext.define("core.smt_sb2_kanban.model.gw.ListModel",{
	extend:"Ext.data.Model",
    fields: [
         {name: '储位号'},//chuweihao
         {name: '钢网编号'},
         {name: '位置'},
    	  {name:'零件状态'},
    	  {name:'执行动作'},
    	  {name:'张力测试结果'},
         {name: '规格'},
         {name: '领用人'},
         {name: '张力值方向左上'},
         {name: '张力值方向右上'},
         {name: '张力值方向左下'},
         {name: '张力值方向右下'},
         {name: '张力值方向中央'},
         {name: '维护人'},
    	 {name: '维修日期'},
         {name: '出入库状态'},
         {name: '备注'}
    ]
    
  
   
    
});