define(function(){"use strict";var a={toolbarSelector:"#list-toolbar-container",listSelector:"#categories-list",lastClickedCategorySettingsKey:"categoriesLastClicked"};return{layout:{content:{width:"max"}},header:function(){return{noBack:!0,title:"category.categories.title",underline:!1,toolbar:{buttons:{add:{},deleteSelected:{}},languageChanger:{preSelected:this.options.locale}}}},templates:["/admin/category/template/category/list"],initialize:function(){this.sandbox.sulu.triggerDeleteSuccessLabel("labels.success.category-delete-desc"),this.bindCustomEvents(),this.render()},bindCustomEvents:function(){this.sandbox.on("husky.datagrid.item.click",this.saveLastClickedCategory.bind(this)),this.sandbox.on("sulu.toolbar.add",this.addNewCategory.bind(this)),this.sandbox.on("sulu.toolbar.delete",this.deleteSelected.bind(this)),this.sandbox.on("husky.datagrid.number.selections",function(a){var b=a>0?"enable":"disable";this.sandbox.emit("sulu.header.toolbar.item."+b,"deleteSelected",!1)}.bind(this))},render:function(){this.sandbox.dom.html(this.$el,this.renderTemplate("/admin/category/template/category/list")),this.sandbox.sulu.initListToolbarAndList.call(this,"categories","/admin/api/categories/fields",{el:this.$find(a.toolbarSelector),template:"default",instanceName:this.instanceName},{el:this.$find(a.listSelector),url:"/admin/api/categories?flat=true&sortBy=depth&sortOrder=asc&locale="+this.options.locale,childrenPropertyName:"hasChildren",resultKey:"categories",searchFields:["name"],pagination:!1,actionCallback:this.editCategory.bind(this),viewOptions:{table:{openChildId:this.sandbox.sulu.getUserSetting(a.lastClickedCategorySettingsKey),selectItem:{type:"checkbox",inFirstCell:!0},icons:[{column:"name",icon:"plus-circle",callback:this.addNewCategory.bind(this)}]}}})},addNewCategory:function(a){this.saveLastClickedCategory(a),this.sandbox.emit("sulu.category.categories.form-add",a)},editCategory:function(a){this.saveLastClickedCategory(a),this.sandbox.emit("sulu.category.categories.form",a)},saveLastClickedCategory:function(b){b&&this.sandbox.sulu.saveUserSetting(a.lastClickedCategorySettingsKey,b)},deleteSelected:function(){this.sandbox.emit("husky.datagrid.items.get-selected",function(a){this.sandbox.emit("sulu.category.categories.delete",a,function(a){this.sandbox.emit("husky.datagrid.record.remove",a)}.bind(this),function(){this.sandbox.emit("sulu.labels.success.show","labels.success.category-delete-desc","labels.success")}.bind(this))}.bind(this))}}});