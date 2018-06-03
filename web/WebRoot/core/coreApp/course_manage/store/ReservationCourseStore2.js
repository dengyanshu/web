var mainPageItems=comm.get("mainPageItems");

Ext.define("core.course_manage.store.ReservationCourseStore2",{
	extend:'Ext.data.Store',
	model:'core.course_manage.model.ReservationCourseModel',
	pageSize:mainPageItems,
	autoLoad:false,
	proxy:{
		type:'ajax',
		url:'/web/skill/skillmanage_reservationCourse!getResult2.action',
		reader:{
			type:'json',
			root:'data'
		}
	}
});