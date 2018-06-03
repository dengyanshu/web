Ext.define("core.sb_kanban.model.Model",{
	extend:"Ext.data.Model",
    fields: [
    	 {name: 'RowNum'},
    	 {name: 'InstrumentId'},
    	 {name: 'InstrumentName'},
    	 {name: 'FixedAssetNumber'},
    	 {name: 'InstrumentType'},
    	 {name: 'InstrumentDescription'},
    	 {name: 'Model'},
    	 {name: 'Status'},
    	 {name: 'Origin'},
    	 {name: 'LocationSpace'},
    	 {name: 'BelongDivision'},
    	 {name: 'UserDepartments'}, 
    	 {name: 'UserDescription'}, 
    	 {name: 'IsCheckDay'},	
    	 {name: 'IsCheckWeek'},	
    	 {name: 'IsCheckMonth'},	
    	 {name: 'IsCheckYear'},
    	 {name: 'NextCheckItem'},
    	 {name: 'NextCheckDate'},	
    	 {name: 'Resultful'}	
    ]
});

