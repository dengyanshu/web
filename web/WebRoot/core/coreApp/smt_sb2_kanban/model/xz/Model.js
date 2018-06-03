Ext.define("core.smt_sb2_kanban.model.xz.Model",{
	extend:"Ext.data.Model",
    fields: [
    	 {name: 'RowNum'},
    	 {name: 'DevicePartsNum'},
    	 {name: 'DevicePartsDescription'},
    	 {name: 'DevicePartsStatus'},
    	 {name: 'WorkCenterName'},
    	 	  {name: 'MaintainType'},//执行动作
    	 {name: 'MaintainPeriod'},
    	 {name: 'MaintainUser'},
    	 {name: 'Qty'},
    	 {name: 'MaintainDate'},
    	 	   {name: 'alertDay'}	
    ]
});



