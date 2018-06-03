Ext.define('Ext.ux.form.SearchField', {
    extend: 'Ext.form.field.Trigger',  
    alias: 'widget.searchgrid', 
    trigger1Cls: Ext.baseCSSPrefix + 'form-clear-trigger',   
    trigger2Cls: Ext.baseCSSPrefix + 'form-search-trigger',
    hasSearch : false,
    paramName : 'query',
    
    initComponent: function() {
        var me = this;
        me.callParent(arguments);
    },
    
    afterRender: function(){
        this.callParent();
        //this.triggerCell.item(2).setDisplayed(false);
    },    
    onTrigger1Click:function(){
    	var me=this;
    	me.reset();
    }
});