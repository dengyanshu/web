var mainPageItems=comm.get("mainPageItems");

Ext.define("core.skill_use.store.ReservationCourseStore",{
	extend:'Ext.data.Store',
	model:'core.skill_use.model.ReservationCourseModel',
	pageSize:mainPageItems,
	autoLoad:true,
	proxy:{
		type:'ajax',
		url:'/web/skill/skillmanage_reservationCourse!getResult.action',
		reader:{
			type:'json',
			root:'data'
		}
	}
});