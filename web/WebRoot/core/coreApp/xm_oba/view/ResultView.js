Ext.define("core.xm_oba.view.ResultView",{
	extend:'Ext.grid.Panel',
	alias:'widget.xm_oba_listview',
	store:'core.xm_oba.store.Store',
	title:getTitle(),
	region:'center',
	columns : [
			{header : '机型',dataIndex : 'ProductFamilyName',width : 130},
			{header : '开始时间',dataIndex : 'StartTime',width : 130},
			{header : '结束时间',dataIndex : 'EndTime',width : 130},
			{header : '投入数 ',dataIndex : 'Qty',width : 80},
		
			
			{header : '抽检数',dataIndex : 'CheckQty',width : 80},
			{header : '抽样率 ',dataIndex : 'CY',width : 80
			},
			{header : '送检批次数',dataIndex : 'SMTOQCBN',width : 100},
			{header : '送检合格批次数',dataIndex : 'RemarkOK',width : 120},
			{header : '待检批次数',dataIndex : 'WSMTOQCBN',width : 100},
			{header : '验退批次数',dataIndex : 'Remark',width : 100},
			{header : '不良数',dataIndex : 'ErrorQty',width : 80},
			{header : '合格率（LAR）',dataIndex : 'HG',width : 80},
			{header : '良率',dataIndex : 'LL',width : 80}
	],
    viewConfig:{
    	forceFit:true,
    	enableRowBody:true,
    	getRowClass:function(record,rowIndex,p,store){
    		var cls='';
    		cls="row-green .x-grid-cell";
    		return cls;
    	}
   }
});




function  getTitle(){
	 var date=new Date();
     var title;
     if(date.getHours()<20&&date.getHours()>=8){
        date.setHours(8, 0, 0, 0);
     }
     else  if(date.getHours()>=20){
        date.setHours(20, 0, 0, 0);
     }
     else{
          date.setDate(date.getDate()-1);
          date.setHours(20, 0, 0, 0);
     }
     title=date.toLocaleString()+"至";
     date=new Date();
      title=title+date.toLocaleString();
      return title;
}


