var mainPageItems=comm.get("mainPageItems");

Ext.define("core.course_manage.store.CourseStore",{
	extend:'Ext.data.Store',
	model:'core.course_manage.model.CourseModel',
	pageSize:mainPageItems,
	autoLoad:false,
	proxy:{
		type:'ajax',
		url:'/web/skill/skillmanage_course!getResult.action',
		reader:{
			type:'json',
			root:'data'
		}
	}
});