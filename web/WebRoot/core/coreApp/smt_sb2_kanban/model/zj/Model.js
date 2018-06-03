Ext.define("core.smt_sb2_kanban.model.zj.Model",{
	extend:"Ext.data.Model",
    fields: [
    	 {name: 'RowNum'},
    	 {name: 'DevicePartsNum'},
    	 {name: 'DevicePartsStatus'},
    	 {name: 'WorkCenterName'},
    	   {name: 'MaintainType'},//执行动作
    	 {name: 'TestResult'},
    	 {name: 'UsedNum'},
    	 {name: 'LeftUseNum'},
    	 {name: 'UserDay'},
    	 {name: 'LeftDay'},
    	 {name: 'MaintainUser'},
    	 {name: 'MaintainDate'}	,
    	 {name: 'alertDay'}	, 
    	 {name: 'alertNum'}	
    ]
});



