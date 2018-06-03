/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

GNU General Public License Usage
This file may be used under the terms of the GNU General Public License version 3.0 as published by the Free Software Foundation and appearing in the file LICENSE included in the packaging of this file.  Please review the following information to ensure the GNU General Public License version 3.0 requirements will be met: http://www.gnu.org/copyleft/gpl.html.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
/**
 * @class Ext.ux.LiveSearchGridPanel
 * @extends Ext.grid.Panel
 * <p>A GridPanel class with live search support.</p>
 * @author Nicolas Ferrero
 */
Ext.define('core.ux.LiveSearchGridPanel', {
    extend: 'Ext.grid.Panel',
    alias:'widget.livesearchgridpanel',
    requires: [
        'Ext.toolbar.TextItem',
        'Ext.form.field.Checkbox',
        'Ext.form.field.Text',
        'core.ux.statusbar.StatusBar'
    ],
    
    /**
     * @private
     * search value initialization
     */
    searchValue: null,
    
    /**
     * @private
     * The row indexes where matching strings are found. (used by previous and next buttons)
     */
    indexes: [],
    
    /**
     * @private
     * The row index of the first search, it could change if next or previous buttons are used.
     */
    currentIndex: null,
    
    /**
     * @private
     * The generated regular expression used for searching.
     */
    searchRegExp: null,
    
    /**
     * @private
     * Case sensitive mode.
     */
    caseSensitive: false,
    
    /**
     * @private
     * Regular expression mode.
     */
    regExpMode: false,
    
    /**
     * @cfg {String} matchCls
     * The matched string css classe.
     */
    matchCls: 'x-livesearch-match',
    
    defaultStatusText: '没有找到可匹配的结果',
    
    // Component initialization override: adds the top and bottom toolbars and setup headers renderer.
    initComponent: function() {
        var me = this;
        me.tbar = ['搜索',{
                 xtype: 'textfield',
                 name: 'searchField',
                 hideLabel: true,
                 width: 185,
                 listeners: {
                     change: {
                         fn: me.onTextFieldChange,
                         scope: this,
                         buffer: 100
                     }
                 }
            }, {
                xtype: 'button',
                text: '上一行',
                tooltip: '获得前一行',
                handler: me.onPreviousClick,
                scope: me
            },{
                xtype: 'button',
                text: '下一行',
                tooltip: '获得后一行',
                handler: me.onNextClick,
                scope: me
            }, '-', {
                xtype: 'checkbox',
                hideLabel: true,
                margin: '0 0 0 4px',
                handler: me.regExpToggle,
                scope: me                
            }, '正则表达式', {
                xtype: 'checkbox',
                hideLabel: true,
                margin: '0 0 0 4px',
                handler: me.caseSensitiveToggle,
                scope: me
            }, '区分大小写'];
		
        me.bbar = Ext.create('Ext.ux.StatusBar', {
            defaultText: me.defaultStatusText,
            name: 'searchStatusBar'
        });
        
        me.callParent(arguments);
    },
    
    // afterRender override: it adds textfield and statusbar reference and start monitoring keydown events in textfield input 
    afterRender: function() {
        var me = this;
        me.callParent(arguments);
        me.textField = me.down('textfield[name=searchField]');
        me.statusBar = me.down('statusbar[name=searchStatusBar]');
    },
    // detects html tag
    tagsRe: /<[^>]*>/gm,
    
    // DEL ASCII code
    tagsProtect: '\x0f',
    
    // detects regexp reserved word
    regExpProtect: /\\|\/|\+|\\|\.|\[|\]|\{|\}|\?|\$|\*|\^|\|/gm,
    
    /**
     * In normal mode it returns the value with protected regexp characters.
     * In regular expression mode it returns the raw value except if the regexp is invalid.
     * @return {String} The value to process or null if the textfield value is blank or invalid.
     * @private
     */
    getSearchValue: function() {
        var me = this,
            value = me.textField.getValue();
            
        if (value === '') {
            return null;
        }
        if (!me.regExpMode) {
            value = value.replace(me.regExpProtect, function(m) {
                return '\\' + m;
            });
        } else {
            try {
                new RegExp(value);
            } catch (error) {
                me.statusBar.setStatus({
                    text: error.message,
                    iconCls: 'x-status-error'
                });
                return null;
            }
            // this is stupid
            if (value === '^' || value === '$') {
                return null;
            }
        }

        return value;
    },
    
    /**
     * Finds all strings that matches the searched value in each grid cells.
     * @private
     */
     onTextFieldChange: function() {
         var me = this,
             count = 0;

         me.view.refresh();
         // reset the statusbar
         me.statusBar.setStatus({
             text: me.defaultStatusText,
             iconCls: ''
         });

         me.searchValue = me.getSearchValue();
         me.indexes = [];
         me.currentIndex = null;

         if (me.searchValue !== null) {
             me.searchRegExp = new RegExp(me.searchValue, 'g' + (me.caseSensitive ? '' : 'i'));
             
             
             me.store.each(function(record, idx) {
                 var td = Ext.fly(me.view.getNode(idx)).down('td'),
                     cell, matches, cellHTML;
                 while(td) {
                     cell = td.down('.x-grid-cell-inner');
                     matches = cell.dom.innerHTML.match(me.tagsRe);
                     cellHTML = cell.dom.innerHTML.replace(me.tagsRe, me.tagsProtect);
                     
                     // populate indexes array, set currentIndex, and replace wrap matched string in a span
                     cellHTML = cellHTML.replace(me.searchRegExp, function(m) {
                        count += 1;
                        if (Ext.Array.indexOf(me.indexes, idx) === -1) {
                            me.indexes.push(idx);
                        }
                        if (me.currentIndex === null) {
                            me.currentIndex = idx;
                        }
                        return '<span class="' + me.matchCls + '">' + m + '</span>';
                     });
                     // restore protected tags
                     Ext.each(matches, function(match) {
                        cellHTML = cellHTML.replace(me.tagsProtect, match); 
                     });
                     // update cell html
                     cell.dom.innerHTML = cellHTML;
                     td = td.next();
                 }
             }, me);

             // results found
             if (me.currentIndex !== null) {
                 me.getSelectionModel().select(me.currentIndex);
                 me.statusBar.setStatus({
                     //text: count + ' matche(s) found.',
                     text: count + ' 个匹配结果被找到.',
                     iconCls: 'x-status-valid'
                 });
             }
         }

         // no results found
         if (me.currentIndex === null) {
             me.getSelectionModel().deselectAll();
         }

         // force textfield focus
         me.textField.focus();
     },
    
    /**
     * Selects the previous row containing a match.
     * @private
     */   
    onPreviousClick: function() {
        var me = this,
            idx;
            
        if ((idx = Ext.Array.indexOf(me.indexes, me.currentIndex)) !== -1) {
            me.currentIndex = me.indexes[idx - 1] || me.indexes[me.indexes.length - 1];
            me.getSelectionModel().select(me.currentIndex);
         }
    },
    
    /**
     * Selects the next row containing a match.
     * @private
     */    
    onNextClick: function() {
         var me = this,
             idx;
             
         if ((idx = Ext.Array.indexOf(me.indexes, me.currentIndex)) !== -1) {
            me.currentIndex = me.indexes[idx + 1] || me.indexes[0];
            me.getSelectionModel().select(me.currentIndex);
         }
    },
    
    /**
     * Switch to case sensitive mode.
     * @private
     */    
    caseSensitiveToggle: function(checkbox, checked) {
        this.caseSensitive = checked;
        this.onTextFieldChange();
    },
    
    /**
     * Switch to regular expression mode
     * @private
     */
    regExpToggle: function(checkbox, checked) {
        this.regExpMode = checked;
        this.onTextFieldChange();
    },
       /**
     * Finds all strings that matches thesearched value in each grid cells.
     * @private
     */
    onSearch: function() {
        var me = this,
             count = 0;
        
          me.store.rejectChanges();      //每次搜索使都让上次的操作回滚
        me.view.refresh();             //更新表中条目
        
        me.statusBar.setStatus({       //这个是用来显示搜索结果数目的框，不必理会
             text: me.defaultStatusText,
             iconCls: ''
        });
 
        /* 取得搜索字符 */
        me.searchValue = me.getSearchValue(); 
        
        /* 记录当前索引在表格store中的位置 */
        me.currentIndex = null;              
 
        if (me.searchValue !== null) {
             me.searchRegExp = new RegExp(me.searchValue, 'g'+ (me.caseSensitive ? '' : 'i'));
            
            /* 表格中的Record数目 */
              var totalCount = me.store.getTotalCount(); 
             
              //遍历所有条目，找出符合条件的Record
              for ( idx = 0; idx < totalCount; idx ++ ) {
                    var record =me.store.getAt( idx );   
                 vartd = Ext.fly(me.view.getNode( idx )).down('td'),
                     cell, matches, cellHTML;
               
                /*在这一Record中是否有需要找寻的内容,默认false */
                    var find = false;
 
                //遍历每条Record的每一列
                 while(td){
                    cell = td.down('.x-grid-cell-inner');
                     matches =cell.dom.innerHTML.match(me.tagsRe);
                     cellHTML =cell.dom.innerHTML.replace(me.tagsRe, me.tagsProtect);
                    
                     cellHTML =cellHTML.replace(me.searchRegExp, function(m) {//找到目标
                            find= true;
                        if (Ext.Array.indexOf(me.indexes, idx) === -1) {
                           me.indexes.push(idx);
                        }
                        if (me.currentIndex === null) {
                            me.currentIndex =idx;
                        }
                        return '<span class="'+ me.matchCls + '">' + m + '</span>';
                     });
 
                     //restore protected tags
                     Ext.each(matches, function(match) {
                        cellHTML =cellHTML.replace(me.tagsProtect, match);
                     });
                     //update cell html
                     cell.dom.innerHTML =cellHTML;
                     td = td.next();
                 }
                
                    if ( ! find ){   //如果该行没有找到需要的结果
                       me.store.remove(record );  //则将该行从表格中移除
                       totalCount--;             
                       idx--;
                    } else {
                       count++;
                    }
              };
 
             //results found
             if(me.currentIndex !== null) {
                me.getSelectionModel().select(me.currentIndex);
                 me.statusBar.setStatus({
                     text: '共找到'+ count + '条.',
                     iconCls: 'x-status-valid'
                 });
             }
        }
 
        // no results found
        if (me.currentIndex === null) {
            me.getSelectionModel().deselectAll();
        }
 
        // force textfield focus
        me.textField.focus();
    }


    
});
