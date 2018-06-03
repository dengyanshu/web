Ext.define("core.smt_sb_kanban.model.gw.Model",{
	extend:"Ext.data.Model",
    fields: [
    	 {name: 'RowNum'},
    	  {name: 'StoreNo'},//chuweihao
    	 {name: 'DevicePartsNum'},
    	 {name: 'DevicePartsStatus'},
    	 {name: 'WorkCenterName'},
    	 {name: 'statuss'},//执行动作
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



