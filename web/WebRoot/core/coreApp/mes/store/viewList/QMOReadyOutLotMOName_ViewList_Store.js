Ext.define("core.mes.store.viewList.QMOReadyOutLotMOName_ViewList_Store",{
	extend:'Ext.data.Store',
	model:'core.mes.model.viewList.QMOReadyOutLotMOName_ViewList_Model',
	autoLoad:false,
	proxy:{
		url: 'core/data/mes/viewListData/QMOReadyOutLotMOName_ViewList.php',
		type:'ajax',
		reader:{
			type:'json'
		}
	}
	
});