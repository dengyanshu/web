Ext.define("core.smt_sb2_kanban.model.gd.Model",{
	extend:"Ext.data.Model",
    fields: [
    	 {name: 'RowNum'},
    	 {name: 'DevicePartsNum'},
    	 {name: 'DevicePartsStatus'},
    	 {name: 'WorkCenterName'},
    	  {name: 'MaintainType'},//执行动作
    	 {name: 'TestResult'},
    	 {name: 'UsedNum'},
    	 {name: 'LeftUseNum',type:'int'},
    	 {name: 'UserDay',type:'int'},
    	 {name: 'LeftDay'},
    	 {name: 'MaintainUser'},
    	 {name: 'MaintainDate'}	,
    	   {name: 'alertDay'}	, 
    	 {name: 'alertNum'}	
    ]
});



