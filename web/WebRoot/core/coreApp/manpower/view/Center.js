var objs=3;
//  if(Ext.util.Cookies.get("valueJson")!=null){
//	var record = Ext.util.Cookies.get("valueJson");
//  var obj=Ext.decode(record);
//	objs=obj.data[0];
//  }
//  var a1=3;
var a2=3;
var a3=3;
var a4=1;

var data2 = [   {name : '直接人力',value: objs},
				{name : '制造间接',value: a2},
				{name : '工程间接',value: a3},
				{name : '品质间接',value: a4}   ];
//alert(objs);
var store2 = Ext.create('Ext.data.Store', {
	fields : ['name', 'value'],
	data : data2,
	autoLoad : true
});
Ext.define("core.manpower.view.Center",{
	extend:'Ext.chart.Chart',
	alias:'widget.m-northpanel-center',
	region:'center',
	store: store2 ,
	
    animate: true,
    shadow: true,
    legend: {position: 'right'},
    insetPadding: 20,
    //theme: 'Base:gradients',
    
    series: [{
        type: 'pie',
        field: 'value',
        showInLegend: true,
        donut: false,//内环状线圈
        
        tips: {//提示
          trackMouse: true,
          width: 140,
          height: 28,
          
          renderer: function(storeItem, item) {
            var total = 0;
            var store=Ext.data.StoreManager.map['core.manpower.store.Store2'];
            store2.each(function(rec) {
            	//alert(rec.get('value'));
            	if(rec.get('value')!=0){
                total += rec.get('value'); } 
            }
            );
            this.setTitle(storeItem.get('name') + ': ' + Math.round(storeItem.get('value')/total*100)+ '%');
          }
        },
        
        highlight: {//高亮
          segment: {margin: 20}
        },
        label: {
            field: 'name',
            display: 'rotate',
            contrast: true,
            font: '14px Arial'
        }
    }]	
	
});