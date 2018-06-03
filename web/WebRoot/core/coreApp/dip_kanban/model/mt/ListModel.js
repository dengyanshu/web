Ext.define("core.dip_kanban.model.mt.ListModel",{
	extend:"Ext.data.Model",
    fields: [
    	 {name:'ID'},
    	 {name:'Project'},
    	 {name:'FinishStatus'},
    	 {name:'CauseDesc'},
    	 {name:'DutyPerson'},
    	 {name:'TelNumber'}
    ]
});