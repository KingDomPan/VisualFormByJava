            Ext.ns('Ext.ffcs');
            Ext.ffcs.LocalCombobox = Ext.extend(Ext.form.ComboBox, {
                constructor: function(_cfg){
                	_cfg = _cfg || {};
                	Ext.apply(this, _cfg);
                    Ext.ffcs.LocalCombobox.superclass.constructor.call(this, {
                        typeAhead: true,
                        forceSelection: true,
                        triggerAction: 'all',
                        lazyRender: true,
                        mode: 'local',
                        emptyText: 'here to select',
                        valueField: 'value',
                        displayField: 'text',
                        editable:false
                        /*listeners:{
                        	'focus':{
                        		fn:function(e){
                        			e.expand();
                        			this.doQuery(this.allQuery, true);
                        			},
                        		buffer:200
                        	}
                       	}*/
                    });
                }
            });
            
            
            Ext.ffcs.LocalPanel = Ext.extend(Ext.FormPanel, {
                constructor: function(_cfg){
                    _cfg = _cfg || {};
                    Ext.apply(this, _cfg);
                    Ext.ffcs.LocalPanel.superclass.constructor.call(this, {
                        bodyStyle: 'padding:10px;',
                        layout: 'form',
                        border: true,
                        frame:true,
                        defaultType: 'textfield',
                        defaults: {
                            labelSeparator: ':',
                            labelWidth: 50,
                            labelAlign: 'left',
                            anchor: '100%'
                        }
                    });
                }
            });
            
            Ext.ffcs.EasyGrid = Ext.extend(Ext.grid.GridPanel, {
                initComponent: function(){
                	this.autoHeight=false;
                	this.autoScroll=true;
                	this.height=400;
                    this.stripeRows = true;
                    this.loadMask = true;
                    this.header=false;
                    this.viewConfig = {
                        forceFit: true
                    };
                    this.fields = this.recordToFields(this.Record);//通过配置的Record类获取对应的fields字段
                    this.createStore();
                    this.createEditor();
                    this.createTools();
                    this.createColumns();
                    this.createSelectModel();
                    this.createTbar();
                    Ext.ffcs.EasyGrid.superclass.initComponent.call(this);
                },
                
                
                createTools:function(){
                	var tools=[{
                		id:'refresh',
                		handler:function(){},
                		qtip:'刷新'
                	}];
                	this.tools=tools;
                },
                
                createSelectModel : function() {
					this.getSelectionModel().on('selectionchange', function(sm) {
								Ext.getCmp('delete-grid')
										.setDisabled(sm.getCount() < 1);
							});
                },
                //创建数据源
                createStore: function(){
                    this.store = new Ext.data.Store({
                        reader: new Ext.data.ArrayReader({}, this.Record)
                    });
                    if(this.data!=null&&this.data.length!=0){
                    	this.store.add(this.data);
                    }else{
                    	this.html='无数据';
                    }
                },
                
                recordToFields: function(Record){
                    var fields = [];
                    var array = Record.prototype.fields.items;
                    for (var i = 0; i < array.length; i++) {
                        var item = array[i];
                        for (var key in item) {
                            if (key == 'name') {
                                fields.push(item[key]);
                            }
                        }
                    }
                    return fields;
                },
                
                createEditor:function(){
                	if(!this.editor){
                		var editor=new Ext.ux.grid.RowEditor({
                			saveText:'更新',
							cancelText:'取消'
                		});
                		this.editor=editor;
                	}
                	this.plugins=new Array(this.editor);
                },
                //创建列模型
                createColumns: function(){
                    var cols = [];
                    for (var i = 0; i < this.fields.length; i++) {
                        var field = this.fields[i];
                        var header = null; //列名
                        var dataIndex = null; //字段名
                        if (this.isArray(field)) {
                            header = field[0];
                            dataIndex = field[1];
                        }
                        else {
                            header = field;
                            dataIndex = field;
                        }
                        cols.push({
                            header: header,
                            dataIndex: dataIndex,
                            editor: new Ext.form.TextField()
                        });
                    }
                    this.cm=new Ext.grid.ColumnModel({
                    	columns:cols
                    });
                },
                
                //创建Tbar
                createTbar: function(){
                    this.tbar = new Ext.Toolbar([{
                        xtype: 'label',
                        text: '双击进行记录修改'
                    },{
            			text: '删除记录',
            			icon:'../images/plugin_delete.png',
            			id:'delete-grid',
           				disabled: true,
            			handler: function(btn,e){
	                		btn.ownerCt.ownerCt.editor.stopEditing();
	                		var s = btn.ownerCt.ownerCt.getSelectionModel().getSelections();
	                		Ext.MessageBox.confirm('删除', '确定要删除所选记录?', function(button){
	                			if(button=='yes'){
		                			for(var i = 0, r; r = s[i]; i++){
		                    			btn.ownerCt.ownerCt.store.remove(r);
		                    			btn.ownerCt.ownerCt.data.splice(btn.ownerCt.ownerCt.store.indexOf(r),1);
		                			}
	                			}
	                		});
            			}
                    }]);
                },
                
                //判断是否是数组类型
                isArray: function(obj){
                    if (typeof obj == 'object' && obj.constructor == Array) {
                        return true;
                    }
                    return false;
                }
            });
            
            Ext.ffcs.XmlRemoteCombobox = Ext.extend(Ext.form.ComboBox, {
                initComponent: function(){
                    this.typeAhead=true;
                    this.forceSelection= true;
                    this.triggerAction= 'all';
                    this.lazyRender= true;
                    this.mode= 'remote';
                    this.emptyText= 'here to select';
                    this.valueField= 'value';
                    this.displayField= 'text';
                    this.editable=false;
                    this.loadingText="加载中....";
                    this.listeners={};
                    this.createStore();
                    Ext.ffcs.XmlRemoteCombobox.superclass.initComponent.call(this);
                },
                //创建数据源
                createStore: function(){
                    this.store = new Ext.data.Store({
                        reader: new Ext.data.XmlReader({record:'row'}, ['value','text']),
                        proxy: new Ext.data.HttpProxy({
                        	url:this.url
                        })
                    });
                    this.store.autoLoad=false;
                }
                
            });

            MsgTip = function(){
                var msgCt=null;
                function createBox(t, s){
                    return ['<div class="msg">', '<div class="x-box-tl"><div class="x-box-tr"><div class="x-box-tc"></div></div></div>', '<div class="x-box-ml"><div class="x-box-mr"><div class="x-box-mc" style="font-size=12px;"><h3>', t, '</h3>', s, '</div></div></div>', '<div class="x-box-bl"><div class="x-box-br"><div class="x-box-bc"></div></div></div>', '</div>'].join('');
                }
                return {
                    msg: function(title, message, autoHide, pauseTime){
                        if (!msgCt) {
                            msgCt = Ext.DomHelper.insertFirst(document.body, {
                                id: 'msg-div22',
                                style: 'position:absolute;top:10px;width:300px;margin:0 auto;z-index:20000;'
                            }, true);
                        }
                        msgCt.alignTo(document, 't-t');
                        //给消息框右下角增加一个关闭按钮
                        message += '<br><span style="text-align:right;font-size:12px; width:100%;">' +
                        '<font color="blank"><u style="cursor:hand;" onclick="MsgTip.hide(this);">关闭</u></font></span>'
                        var m = Ext.DomHelper.append(msgCt, {
                            html: createBox(title, message)
                        }, true);
                        m.slideIn('t');
                        if (!Ext.isEmpty(autoHide) && autoHide == true) {
                            if (Ext.isEmpty(pauseTime)) {
                                pauseTime = 5;
                            }
                            m.pause(pauseTime).ghost("tr", {
                                remove: true
                            });
                        }
                    },
                    hide: function(v){
                        var msg = Ext.get(v.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement);
                        msg.ghost("tr", {
                            remove: true
                        });
                    }
                };
            }();

            
Ext.apply(Ext.form.VTypes, {
    fileType : function(val, field){
    	var filePath = field.value;
		var currentFilePrefix = filePath.substring(filePath.lastIndexOf('.') + 1);
    	if(field.fileTypes.length > 0 && !Ext.isEmpty(filePath)){
			var temp = [];
			for(var i=0;i<field.fileTypes.length;i++){
				temp[field.fileTypes[i].toLowerCase()] = true;
			}
			if(!temp[currentFilePrefix.toLowerCase()]){
				return false;
			}
    	}
    	return true;
    },
    fileTypeText:'上传文件的格式不符合要求,请重新选择后再上传!'
});
