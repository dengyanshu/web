Ext.define("core.dip_kanban.model.hr.Model",{
	extend:"Ext.data.Model",
	 fields: [
	         {name: 'Date'},		//日期
	         {name: 'Shift'},		//班次
	         {name: 'PMC_SG'},		//报表类型
	         {name: 'HR_QTY'},		//考勤人力
	         {name: 'HR_ZYY'},		//考勤作业员
	         {name: 'HR_ZL'},		//考勤助拉
	         {name: 'HR_ZZ'}, 		//考勤组长 
	         {name: 'SG_QTY'},		//上岗人力
	         {name: 'SG_ZYY'},		//上岗作业员
	         {name: 'SG_ZL'},		//上岗助拉
	         {name: 'SG_ZZ'},		//上岗组长
	         {name: 'WorkcenterName'},//线体
	         {name: 'MOName'},  	//工单
	         {name: 'workprocedure'},//制程
	         {name: 'ProductName'},	//整机料号
	         {name: 'ProductFamilyName'},//机型
	         {name: 'PMC_QTY'},		//排产人力
	         {name: 'ProductionIndirect'},//生产人力
	         {name: 'ProjectIndirect'},//工程人力
	         {name: 'QualityIndirect'},//品质人力
	         {name: 'HR_CY'},		//人力差异
	         {name: 'IndirectQty'},//间接人力
	         {name: 'StandardindirectOfPeople'},//排产间接人力
	         {name: 'Direct_CY'},//直接
	         {name: 'Indirect_CY'},
	         
	         {name: 'ErrorMsg'}
	     ]
});