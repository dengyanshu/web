/***************************************************************************
  								<报表查询类> 
 ***************************************************************************/

Ext.define("core.mes.store.tree.ReportForms", {
	extend : 'core.mes.store.BaseTreeStore',
	proxy : {
	type : 'ajax',
	url : 'core/data/mes/tree/tree.json',
	reader : {
		type : 'json',
		root : 'report_forms'
		}
	}
});