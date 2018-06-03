Ext.define("core.smt_sb2_kanban.model.gd.ListModel",{
	extend:"Ext.data.Model",
    fields: [
         {name: '刮刀编号'},
    	  {name:'零件状态'},
         {name: '位置'},
          {name:'执行动作'},
         {name: '规格'},
         {name: '领用人'},
         {name: '平整度测试'},
         {name: '表面清洁状况'},
         {name: '有无变形'},
         {name: '出入库状态'},
         {name: '维护人'},
    	 {name:'维修日期'},
         {name: '备注'}
    ]
});