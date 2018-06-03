Ext.define("core.dip_kanban.model.mt.Model",{
	extend:"Ext.data.Model",
    fields: [
    	 {name: 'B_ID'},
    	 {name: 'MOName'},
    	 {name: 'Staff'},
    	 {name: 'Instrument'},
    	 {name: 'Materials'},
    	 {name: 'DoMethod'},
    	 {name: 'Environment'},
    	 {name: 'PickingListCreated'},
    	 {name: 'PickingListAlready'},
    	 {name: 'FirstSideEntered'},
    	 {name: 'SMTMountAlready'},
    	 {name: 'SynSMTMountDone'},
    	 {name: 'MOPlaned'},
    	 {name: 'ShowBoardAlready'},
    	 {name: 'NoticeList'}
    ]
});