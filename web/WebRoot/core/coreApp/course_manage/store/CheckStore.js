Ext.define("core.course_manage.store.CheckStore",{
	extend:'Ext.data.Store',
	model:'core.course_manage.model.CheckModel',
	autoLoad:false,
	proxy:{
		type:'ajax',
		url:'/web/skill/skillmanage_userReservationCourse!getCheck.action',
		reader:{
			type:'json',
			root:'data'
		}
	}
});