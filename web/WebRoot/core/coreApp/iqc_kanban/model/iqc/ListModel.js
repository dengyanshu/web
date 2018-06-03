Ext.define("core.iqc_kanban.model.iqc.ListModel",{
	extend:"Ext.data.Model",
    fields: [
         {name:'clls'},  //序号
         {name:'org'},  //事业部
    	 {name:'QCDoc_DocNo'},  //质检单号
    	 {name:'QCDocLines_QCDocLineNo'},//单据行号
         {name: 'QCDoc_BusinessDate'},//单据日期
         {name: 'QCDoc_CreatedOn'},//创建时间
         {name: 'QCDocType_Name'},//单据类型
         {name: 'QCDoc_State'},//单据状态
         {name: 'sup_name'},//供应商
         {name: 'ItemMaster_Code'},//料号
         {name: 'ItemMaster_Name'},//品名
         {name: 'Checker_Name'},//质检员
         {name: 'QCDocLines_BatchCount'},//质检批量
         {name: 'QCResult_count'},//质检数量
         {name: 'QCDocLines_QCTime'},//质检时间
         {name: 'QCDocLines_QCCompleteTime'},//质检完成时间
         {name: 'QCDocResults_QCResult'}//质检结果
    ]
});