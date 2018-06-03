Ext.define("core.sb_kanban.model.sb.ListModel",{
	extend:"Ext.data.Model",
    fields: [
    	 {name:'序号'},
    	 {name:'设备编号(工程部编号)'},
         {name: '设备类型'},
         {name: '设备描述'},
         {name: '型号'},
         {name: '状态'},
         {name: '存放位置'},
         {name: '维护人'},
         {name: '维修履历'},
         {name: '维护项目'},
         {name: '维护时间'}
    ]
});