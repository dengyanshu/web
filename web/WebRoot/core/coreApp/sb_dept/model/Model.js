Ext.define("core.sb_dept.model.Model",{
	extend:"Ext.data.Model",
    fields: [
    	 {name: 'RowNum'},							//序号
    	 {name: 'InstrumentName'},                  //设备编号
    	 {name: 'FixedAssetNumber'},				//资产编号
    	 {name: 'InstrumentType'},					//设备类型
    	 {name: 'InstrumentDescription'},			//设备描述
    	 {name: 'Model'},							//型号
    	 {name: 'Status'},							//设备状态
    	 {name: 'Origin'},							//设备来源
    	 {name: 'LocationSpace'},					//存放位置
    	 {name: 'BelongDivision'},					//所属事业部
    	 {name: 'UserDepartments'}, 				//使用部门
    	 {name:'FactoryNumber'},					//出厂编号
    	 {name: 'UserDescription'}, 				//责任人
    	 {name: 'Phone'}							//联系方式
    ]
});

