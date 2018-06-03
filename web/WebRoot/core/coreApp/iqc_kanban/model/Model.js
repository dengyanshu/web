Ext.define("core.iqc_kanban.model.Model",{
	extend:"Ext.data.Model",
    fields: [
    	 {name: 'TimeLinessRatioId'},
    	 {name: 'TimeLinessDate'},  //日期 
    	 {name: 'TotalNumber'},     //进料总批数
    	 {name: 'CheckedNumber'},     //已检验批数
    	 {name: 'WaitCheckNumber'},   //待检验批数
    	 {name: 'UnusualNumber'},    //异常批数
    	 {name:'PassRatio'},
    	 {name: 'CheckedNumber4H'},  //4H检验批数/率 
    	 {name: 'CheckedNumber8H'},  //8H检验批数/率
    	 {name: 'CheckedNumber24H'},//24H检验批数/率 
    	 {name: 'CheckedNumber48H'}//48H检验批数/率
    ]
});

