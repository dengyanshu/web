Ext.define("core.smt_sb2_kanban.model.fd.Model",{
	extend:"Ext.data.Model",
    fields: [
    	 {name: 'RowNum'},
    	 {name: 'DevicePartsNum'},
    	 {name: 'DevicePartsStatus'},
    	 {name: 'WorkcenterName'},
    	   {name: 'MaintainType'},//执行动作
    	 {name:  'slot'},
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



