Ext.define("SS.data.OrderStores",{statics:{loadData:function(a){SS.data.OrderStores.CarrierStore.loadData(a.Carriers);SS.data.OrderStores.AllCarriersStore.loadData(a.AllCarriers);SS.data.OrderStores.ServiceStore.loadData(a.Services);SS.data.OrderStores.CountryStore.loadData(a.Countries);SS.data.OrderStores.StateStore.loadData(a.States);SS.data.OrderStores.CarrierPackageStore.loadData(a.CarrierPackages);SS.data.OrderStores.PackageStore.loadData(a.Packages);SS.data.OrderStores.StoreStore.loadData(a.Stores);SS.data.OrderStores.PresetStore.loadData(a.Presets);SS.data.OrderStores.PackingSlipStore.loadData([{PackingSlipID:null,Name:"Select..."}]);SS.data.OrderStores.PackingSlipStore.loadData(a.PackingSlips,true);SS.data.OrderStores.UserStore.loadData(a.Users,false);SS.data.OrderStores.EmailTemplateStore.loadData([{TemplateID:null,Name:"Select..."}]);SS.data.OrderStores.EmailTemplateStore.loadData(a.EmailTemplates,true);SS.data.OrderStores.TagStore.loadData(a.Tags);SS.data.OrderStores.FilterStore.loadData([{OrderFilterID:null,Name:"Select..."}]);SS.data.OrderStores.FilterStore.loadData(a.Filters,true);SS.data.OrderStores.StatusStore.loadData([{OrderStatusID:null,Name:"Select..."}]);SS.data.OrderStores.StatusStore.loadData(a.Statuses,true);SS.data.OrderStores.WarehouseStore.loadData(a.Warehouses);SS.settings.Warehouse&&SS.data.OrderStores.WarehouseStore.loadData([{WarehouseID:-1,Name:"Add a Warehouse...",Order:0}],true);SS.data.OrderStores.ConfirmationStore.loadData(a.Confirmation);SS.data.OrderStores.ProviderStore.loadData([{ProviderID:null,CarrierID:null,Name:"Select...",Order:0}]);SS.data.OrderStores.ProviderStore.loadData(a.Providers,true);SS.data.OrderStores.FillProviderStore.loadData([{FillProviderID:null,Name:"Select...",SortOrder:999}]);SS.data.OrderStores.FillProviderStore.loadData(a.FillProviders,true);SS.data.OrderStores.FillServiceStore.loadData(a.FillServices,true);SS.data.OrderStores.TagStore.each(function(a){a.phantom=false})},loadOrderLookups:function(){window.alert("Deprecated call: loadOrderLookups")},PresetStore:new Ext.data.Store({type:"json",autoLoad:false,proxy:{type:"memory"},model:"ShippingPreset",sorters:[{property:"SortOrder"}]}),TagStore:new Ext.data.Store({autoLoad:false,autoSync:false,allowSingle:false,storeId:"tagStore",model:"OrderTag",idProperty:"OrderTagID",proxy:{type:"ajax",allowSingle:false,idProperty:"OrderTagID",api:{read:SS.url.app+"orders/loadtags",update:SS.url.app+"orders/updatetags",destroy:SS.url.app+"orders/deletetags",create:SS.url.app+"orders/createtags"},reader:{type:"json",model:"OrderTag",idProperty:"OrderTagID",root:"tags"},writer:{type:"json",allowSingle:false,encode:false,root:"tags",writeAllFields:true}}}),ProviderStore:new Ext.data.Store({autoSave:false,storeId:"providerStore",proxy:{type:"memory"},idProperty:"ProviderID",sorters:[{property:"Order",direction:"ASC"},{property:"DisplayName",direction:"DESC"}],fields:["ProviderID","CarrierID",{name:"Order",type:"int",defaultValue:1},"Name",{name:"DisplayName",convert:function(b,a){return a.data.Carrier&&a.data.Carrier.Name!=a.data.Name?a.data.Carrier.Name+" ("+a.data.Name+")":a.data.Name}}]}),FillProviderStore:new Ext.data.Store({autoSave:false,storeId:"fillProviderStore",proxy:{type:"memory"},idProperty:"FillProviderID",sorters:[{property:"SortOrder",direction:"DESC"},{property:"Name"}],fields:["SortOrder","FillProviderID","Name"]}),FillServiceStore:new Ext.data.Store({autoSave:false,storeId:"fillServiceStore",proxy:{type:"memory"},idProperty:"FillServiceID",sorters:[{property:"SortOrder"},{property:"Name"}],fields:["FillServiceID","FillProviderID","SortOrder","Name"]}),UserStore:new Ext.data.Store({autoSave:false,storeId:"userStore",proxy:{type:"memory",reader:{useSimpleAccessors:true,type:"json"}},fields:[{name:"Key",type:"string"},{name:"Value",type:"string"}]}),PackingSlipStore:new Ext.data.Store({autoSave:false,storeId:"packingslipStore",proxy:{type:"memory"},fields:["PackingSlipID","Name"]}),FilterStore:new Ext.data.Store({autoSave:false,storeId:"orderFilterStore",proxy:{type:"memory"},fields:["OrderFilterID","Name"]}),EmailTemplateStore:new Ext.data.Store({autoSave:false,storeId:"emailtemplateStore",proxy:{type:"memory"},fields:["TemplateID","Name"]}),ConfirmationStore:new Ext.data.Store({autoSave:false,storeId:"confirmationStore",proxy:{type:"memory"},fields:["CarrierID","ConfirmationID","Name"]}),StoreStore:new Ext.data.Store({autoSave:false,storeId:"storeStore",proxy:{type:"memory"},idProperty:"StoreID",fields:["StoreID","StoreName","LastBatch",{name:"DisplayName",convert:function(b,a){return a.data.StoreName+" ("+a.data.Marketplace.Name+")"}},{name:"GenerateAutoSeed",type:"bool"},{name:"Marketplace",mapping:"Marketplace.Name"},{name:"MarketplaceID",mapping:"Marketplace.MarketplaceID"}]}),WarehouseStore:new Ext.data.Store({autoSave:false,storeId:"warehouseStore",proxy:{type:"memory"},idProperty:"WarehouseID",model:"Warehouse"}),CarrierStore:new Ext.data.Store({autoSave:false,storeId:"carrierStore",proxy:{type:"memory"},sorters:[{property:"Name",direction:"DESC"}],idProperty:"CarrierID",fields:["CarrierID","Name"]}),AllCarriersStore:new Ext.data.Store({autoSave:false,storeId:"allCarriersStore",proxy:{type:"memory"},sorters:[{property:"Name",direction:"DESC"}],idProperty:"CarrierID",fields:["CarrierID","Name",{name:"MarkAsShipped",type:"boolean"}]}),ServiceStore:new Ext.data.Store({autoSave:false,storeId:"serviceStore",proxy:{type:"memory"},idProperty:"ShippingServiceID",fields:["CarrierID","ShippingServiceID","Provider","ProviderId","Name","PackageTypes","International"]}),CountryStore:new Ext.data.Store({autoSave:false,storeId:"countryStore",proxy:{type:"memory"},idProperty:"CountryID",fields:["CountryID","Code","Name","Variation1",{name:"Active",type:"bool"}]}),StateStore:new Ext.data.Store({autoSave:false,storeId:"stateStore",proxy:{type:"memory"},idProperty:"StateCode",fields:["StateCode","CountryCode","Name"]}),CarrierPackageStore:new Ext.data.Store({autoSave:false,storeId:"carrierPackageStore",proxy:{type:"memory"},fields:["PackageTypeID","CarrierID","Name",{name:"Domestic",type:"bool"},{name:"International",type:"bool"},{name:"WeightReq",type:"bool"}]}),PackageStore:new Ext.data.Store({autoSave:false,storeId:"packageStore",proxy:{type:"memory"},idProperty:"PackageTypeId",fields:["PackageTypeId","Name"]}),StatusStore:new Ext.data.Store({autoSave:false,storeId:"statusStore",proxy:{type:"memory"},idProperty:"OrderStatusID",fields:["OrderStatusID","Name"]})}});Ext.define("SS.fields.ScanField",{extend:"Ext.form.TextField",alias:"widget.scan_field",fieldStyle:"border:none 0px white; color:white; background: none;",checkChangeBuffer:200,enableKeyEvents:true,start:function(){this.focus();this.selectText();this.resumeEvents(false)},stop:function(){this.suspendEvents(false)},initComponent:function(){this.callParent();this.on("blur",this.start,this);this.on("change",function(b,a){this.un("blur",this.start);this.fireEvent("scan",a)},this);this.on("keydown",function(b,a){if(a.keyCode==Ext.EventObject.ESC){this.un("blur",this.start);this.fireEvent("exit")}else!a.isSpecialKey()&&this.fireEvent("read",a)},this)}});Ext.define("SS.fields.PackingSlipCombo",{extend:"Ext.form.ComboBox",alias:"widget.packingslip_combo",store:SS.data.OrderStores.PackingSlipStore,queryMode:"local",forceSelection:true,autoSelect:false,listWidth:160,triggerAction:"all",lastQuery:"",lazyInit:false,editable:false,typeAhead:false,displayField:"Name",valueField:"PackingSlipID",emptyText:"Select..."});Ext.define("SS.fields.FilterCombo",{extend:"Ext.form.ComboBox",alias:"widget.filter_combo",store:SS.data.OrderStores.FilterStore,queryMode:"local",forceSelection:true,autoSelect:false,listWidth:160,triggerAction:"all",lastQuery:"",lazyInit:false,editable:false,typeAhead:false,displayField:"Name",valueField:"OrderFilterID",emptyText:"Select..."});Ext.define("SS.fields.EmailTemplateCombo",{extend:"Ext.form.ComboBox",alias:"widget.emailtemplate_combo",store:SS.data.OrderStores.EmailTemplateStore,queryMode:"local",forceSelection:true,autoSelect:false,listWidth:160,triggerAction:"all",lastQuery:"",lazyInit:false,editable:false,typeAhead:false,displayField:"Name",valueField:"TemplateID",emptyText:"Select..."});Ext.define("SS.fields.WarehouseCombo",{extend:"Ext.form.ComboBox",alias:"widget.warehouse_combo",store:SS.data.OrderStores.WarehouseStore,queryMode:"local",forceSelection:true,autoSelect:false,listWidth:160,triggerAction:"all",lastQuery:"",lazyInit:false,editable:false,typeAhead:false,displayField:"Name",valueField:"WarehouseID",emptyText:"Select...",initComponent:function(){this.callParent()},tpl:Ext.create("Ext.XTemplate",'<tpl for=".">','<tpl if="WarehouseID == -1">','<div class="x-boundlist-item x-new-combo-item">{Name}</div>',"<tpl else>",'<div class="x-boundlist-item">{Name}</div>',"</tpl>","</tpl>"),listeners:{beforeselect:function(a,c){if(c.get("WarehouseID")==-1){var b=new SS.settings.Warehouse;b.show();b.on("recordSaved",function(b){a.getStore().insert(0,b);a.select(b.get("WarehouseID"))});return false}}}});Ext.define("SS.fields.OrderStatusCombo",{extend:"Ext.form.ComboBox",alias:"widget.status_combo",store:SS.data.OrderStores.StatusStore,queryMode:"local",forceSelection:true,autoSelect:true,listWidth:160,triggerAction:"all",lastQuery:"",lazyInit:false,editable:false,typeAhead:false,displayField:"Name",valueField:"OrderStatusID",emptyText:"Select..."});Ext.define("SS.fields.UserCombo",{extend:"Ext.form.ComboBox",alias:"widget.user_combo",store:SS.data.OrderStores.UserStore,queryMode:"local",forceSelection:true,autoSelect:true,listWidth:160,triggerAction:"all",lastQuery:"",lazyInit:false,editable:false,typeAhead:false,displayField:"Value",valueField:"Key",emptyText:"Select..."});Ext.define("SS.fields.CountryCombo",{extend:"Ext.form.ComboBox",alias:"widget.country_combo",store:SS.data.OrderStores.CountryStore,queryMode:"local",forceSelection:true,autoSelect:true,listWidth:160,triggerAction:"all",lastQuery:"",lazyInit:true,editable:true,displayField:"Name",valueField:"Code",emptyText:"Select...",listConfig:{width:200}});Ext.define("SS.fields.StateCombo",{extend:"Ext.form.ComboBox",alias:"widget.state_combo",store:SS.data.OrderStores.StateStore,queryMode:"local",forceSelection:false,autoSelect:false,listWidth:160,triggerAction:"all",lastQuery:"",lazyInit:false,editable:true,typeAhead:false,displayField:"Name",valueField:"StateCode",emptyText:"Select...",listConfig:{width:200}});Ext.define("SS.fields.TagCombo",{extend:"Ext.form.ComboBox",alias:"widget.tag_combo",store:SS.data.OrderStores.TagStore,queryMode:"local",forceSelection:true,autoSelect:true,triggerAction:"all",lastQuery:"",lazyInit:false,editable:false,typeAhead:false,displayField:"Tag",valueField:"OrderTagID",listConfig:{getInnerTpl:function(){return'<div class="search-item"><div class="color-block" style="background-color:{Color}"></div><div style="padding-left:14px">{Tag}</div></div>'}},emptyText:"Select..."});Ext.define("SS.fields.StoreCombo",{extend:"Ext.form.ComboBox",alias:"widget.store_combo",store:SS.data.OrderStores.StoreStore,queryMode:"local",forceSelection:true,autoSelect:false,allowBlank:false,validateOnBlur:true,listWidth:160,triggerAction:"all",lastQuery:"",lazyInit:false,editable:false,typeAhead:false,displayField:"DisplayName",valueField:"StoreID",emptyText:"Select...",listConfig:{getInnerTpl:function(){return'<div><img align="absmiddle" src="'+SS.url.app+'icons/marketplace/{Marketplace.Name}.png"> {StoreName} ({Marketplace.Name})</div>'}}});Ext.define("SS.fields.ProviderCombo",{extend:"Ext.form.ComboBox",store:SS.data.OrderStores.ProviderStore,alias:"widget.provider_combo",listWidth:160,queryMode:"local",autoSelect:false,triggerAction:"all",lazyInit:false,editable:false,typeAhead:false,forceSelection:true,displayField:"DisplayName",valueField:"ProviderID",emptyText:"Select...",lastQuery:"",doQuery:function(){if(this.showOnly){var a=this.showOnly;this.store.filterBy(function(b){return a.indexOf(b.get("ProviderID"))>-1})}else this.store.clearFilter();var b=this.callParent()},listConfig:{getInnerTpl:function(){return'<tpl if="ProviderID"><div>{DisplayName}</div></tpl><tpl if="!ProviderID"><div style=\'color:gray\'>Select...</div></tpl>'}}});Ext.define("SS.fields.FillProviderCombo",{extend:"Ext.form.ComboBox",store:SS.data.OrderStores.FillProviderStore,alias:"widget.fillprovider_combo",listWidth:160,queryMode:"local",autoSelect:false,triggerAction:"all",lazyInit:false,editable:false,typeAhead:false,forceSelection:true,displayField:"Name",valueField:"FillProviderID",emptyText:"Select..."});Ext.define("SS.fields.CarrierCombo",{extend:"Ext.form.ComboBox",store:SS.data.OrderStores.CarrierStore,alias:"widget.carrier_combo",listWidth:160,queryMode:"local",autoSelect:false,triggerAction:"all",lazyInit:false,editable:false,typeAhead:false,forceSelection:true,displayField:"Name",valueField:"CarrierID",emptyText:"Select..."});Ext.define("SS.fields.AllCarriersCombo",{extend:"Ext.form.ComboBox",store:SS.data.OrderStores.AllCarriersStore,alias:"widget.allCarriers_combo",listWidth:160,queryMode:"local",autoSelect:false,triggerAction:"all",lazyInit:false,editable:false,typeAhead:false,forceSelection:true,displayField:"Name",valueField:"CarrierID",emptyText:"Select..."});Ext.define("SS.fields.ServiceCombo",{extend:"Ext.form.ComboBox",id:"service-combo",alias:"widget.service_combo",store:SS.data.OrderStores.ServiceStore,queryMode:"local",forceSelection:true,autoSelect:false,listWidth:160,triggerAction:"all",lastQuery:"",lazyInit:false,editable:false,typeAhead:false,forceSelection:true,displayField:"Name",valueField:"ShippingServiceID",emptyText:"Select...",valueNotFoundText:"???"});Ext.define("SS.fields.FillServiceCombo",{extend:"Ext.form.ComboBox",alias:"widget.fillservice_combo",store:SS.data.OrderStores.FillServiceStore,queryMode:"local",forceSelection:true,autoSelect:false,listWidth:160,triggerAction:"all",lastQuery:"",lazyInit:false,editable:false,typeAhead:false,forceSelection:true,displayField:"Name",valueField:"FillServiceID",emptyText:"Select...",valueNotFoundText:"???"});Ext.define("SS.fields.FillServicePackage",{extend:"Ext.form.FieldContainer",alias:"widget.fillServicePackage",allowBlank:true,getRecord:function(){if(this.up("form"))if(this.up("form").up("panel"))if(this.up("form").up("panel").record)return this.up("form").up("panel").record;return null},updateChoices:function(){this.loadServices()},loadServices:function(b){var a=this.down("#cboFillService");b=b||this.down("#cboCarrier").getValue();if(!b){a.setDisabled(true);a.setValue(null);return}else a.setDisabled(false);var c=SS.data.OrderStores.FillServiceStore.queryBy(function(a){return a.data.FillProviderID==b?true:false},this);a.store.loadData([{FillServiceID:null,Name:"Select..."}]);a.store.loadData(c.getRange(),true);var d=c.findBy(function(b){return b.data.FillServiceID==a.getValue()?true:false},this);a.setDisabled(false);!d&&a.setValue(null)},initComponent:function(){this.defaults=Ext.apply(this.defaults||{},{listeners:{scope:this,change:function(b,a){if(b.name=="FillProviderID")if(a)this.loadServices(a);else{this.down("#cboFillService").setValue(null);this.down("#cboFillService").setDisabled(true)}this.fireEvent("change",this)}}});Ext.applyIf(this,{border:false,hideLabel:true,margin:0,layout:"anchor",items:[{xtype:"fillprovider_combo",fieldLabel:"Provider",name:"FillProviderID",itemId:"cboCarrier",allowBlank:this.allowBlank},{xtype:"combo",itemId:"cboFillService",fieldLabel:"Service",name:"FillServiceID",store:new Ext.data.Store({proxy:{type:"memory"},fields:[{name:"FillProviderID",type:"int"},"Name"]}),valueField:"FillServiceID",displayField:"Name",autoSelect:false,disabled:true,forceSelection:true,triggerAction:"all",validateOnBlur:false,lazyInit:true,editable:false,typeAhead:false,queryMode:"local",allowBlank:this.allowBlank,emptyText:"Select...",valueNotFoundText:"???"}]});this.callParent()}});Ext.define("SS.fields.ProviderServicePackage",{extend:"Ext.form.FieldContainer",alias:"widget.providerservicepackage",international:undefined,allowBlank:true,requireCarrier:false,isInternational:function(){if(this.international!=undefined)return this.international;if(this.up("form"))if(this.up("form").up("panel"))if(this.up("form").up("panel").record)return this.up("form").up("panel").record.data.ShipCountryCode==null?undefined:this.up("form").up("panel").record.data.ShipCountryCode==HomeCountry?false:true;return undefined},getRecord:function(){if(this.up("form"))if(this.up("form").up("panel"))if(this.up("form").up("panel").record)return this.up("form").up("panel").record;return null},updateChoices:function(){this.loadServices();this.loadPackageTypes();this.loadConfirmation()},loadServices:function(b){var a=this.down("#cboService");b=b||this.down("#cboCarrier").getValue();if(!b){a.setDisabled(true);a.setValue(null);return}else a.setDisabled(false);var c=SS.data.OrderStores.ServiceStore.queryBy(function(a){return a.data.ProviderId==b?this.isInternational()==undefined||a.data.International&&this.isInternational()===true||!a.data.International&&this.isInternational()===false:false},this);a.store.loadData([{ShippingServiceID:null,Name:"Select..."}]);a.store.loadData(c.getRange(),true);var d=c.findBy(function(b){return b.data.ShippingServiceID==a.getValue()?true:false},this);a.setDisabled(false);!d&&a.setValue(null)},loadPackageTypes:function(b){b=b||this.down("#cboCarrier").getValue();if(!b&&this.getRecord())b=this.getRecord().data.ProviderID;var a=this.down("#cboPackage");if(!b){a.setDisabled(true);return}a.setDisabled(false);var e=SS.data.OrderStores.ProviderStore.findExact("ProviderID",b);if(e<0){a.setDisabled(true);return}var d=SS.data.OrderStores.ProviderStore.getAt(e).data.CarrierID;if(d){var c=SS.data.OrderStores.CarrierPackageStore.queryBy(function(a){return a.data.CarrierID==d?this.isInternational()==undefined||a.data.International&&this.isInternational()===true||a.data.Domestic&&this.isInternational()===false:false},this);this.down("#cboPackage").store.loadData([{PackageTypeID:null,Name:"Select...",CarrierID:null}]);this.down("#cboPackage").store.loadData(c.getRange(),true);var f=c.findBy(function(b){return b.data.PackageTypeID==a.getValue()?true:false},this);!f&&a.setValue(null);a.setDisabled(false)}else a.setDisabled(true)},loadConfirmation:function(b){b=b||this.down("#cboCarrier").getValue();if(!b&&this.getRecord())b=this.getRecord().data.ProviderID;var a=this.down("#cboConfirmation"),c=1;if(b){a.setDisabled(false);var f=SS.data.OrderStores.ProviderStore.findExact("ProviderID",b);if(f<0){a.setDisabled(true);return}c=SS.data.OrderStores.ProviderStore.getAt(f).data.CarrierID}if(c){var d=SS.data.OrderStores.ConfirmationStore.queryBy(function(a){return a.data.CarrierID==c?true:false},this),e=a.getValue();a.store.loadData(d.getRange(),false);a.setValue(e);var g=d.findBy(function(a){return a.data.ConfirmationID==e?true:false},this);!g&&a.setValue(null);a.setDisabled(false)}else a.setDisabled(true)},initComponent:function(){this.defaults=Ext.apply(this.defaults||{},{anchor:"94%",listeners:{scope:this,change:function(b,a){if(b.name==this.carrierField)if(a){this.loadPackageTypes(a);this.loadServices(a);this.loadConfirmation(a)}else{this.down("#cboPackage").setValue(null);this.down("#cboPackage").setDisabled(true);this.down("#cboService").setValue(null);this.down("#cboService").setDisabled(true);this.down("#cboConfirmation").setValue(null);this.down("#cboConfirmation").setDisabled(true)}this.fireEvent("change",this)}}});Ext.applyIf(this,{border:false,hideLabel:true,margin:0,defaults:{anchor:"96%"},layout:"anchor",items:[{xtype:"provider_combo",name:this.carrierField,itemId:"cboCarrier",fieldLabel:"Carrier",showOnly:this.showOnly,allowBlank:this.allowBlank&&!this.requireCarrier},{xtype:"combo",itemId:"cboService",fieldLabel:"Service",hidden:!this.serviceField,name:this.serviceField,store:new Ext.data.Store({proxy:{type:"memory"},fields:[{name:"ShippingServiceID",type:"int"},"Name","International"]}),valueField:"ShippingServiceID",displayField:"Name",autoSelect:false,disabled:true,forceSelection:true,triggerAction:"all",validateOnBlur:false,lazyInit:true,editable:false,typeAhead:false,queryMode:"local",allowBlank:this.allowBlank,emptyText:"Select...",valueNotFoundText:"???"},{xtype:"combo",itemId:"cboPackage",fieldLabel:"Package",name:this.packageField,allowBlank:this.allowBlank,hidden:!this.packageField,disabled:true,store:new Ext.data.Store({proxy:{type:"memory"},fields:["PackageTypeID","Name"]}),valueField:"PackageTypeID",displayField:"Name",queryMode:"local",autoSelect:false,forceSelection:true,triggerAction:"all",lazyInit:false,editable:false,typeAhead:false,emptyText:"Select...",valueNotFoundText:"???"},{xtype:"combo",itemId:"cboConfirmation",fieldLabel:"Confirmation",name:this.confirmationField,hidden:!this.confirmationField,allowBlank:this.allowBlank,disabled:true,store:new Ext.data.Store({proxy:{type:"memory"},fields:["ConfirmationID","Name"]}),valueField:"ConfirmationID",displayField:"Name",queryMode:"local",matchFieldWidth:false,listConfig:{width:200},autoSelect:false,forceSelection:false,triggerAction:"all",lazyInit:false,editable:false,typeAhead:false,emptyText:"Select...",allowBlank:this.allowBlank}]});this.callParent();this.loadPackageTypes();this.loadConfirmation()}});Ext.define("SS.fields.CarrierPackage",{extend:"Ext.form.FieldContainer",alias:"widget.carrierpackage",requireCarrier:false,requirePackage:false,isInternational:function(){if(this.up("form"))if(this.up("form").up("panel"))if(this.up("form").up("panel").record)return this.up("form").up("panel").record.data.ShipCountryCode!="US"?true:false;return undefined},updateChoices:function(){this.loadPackageTypes();this.loadConfirmation()},loadPackageTypes:function(c){var a=this.down("#cboPackage");if(!c){a.setDisabled(true);return}var b=SS.data.OrderStores.CarrierPackageStore.queryBy(function(a){return a.data.CarrierID==c&&(!this.record||this.isInternational()===true&&a.data.International||this.isInternational()===false&&a.data.Domestic)?true:false},this);this.down("#cboPackage").store.loadData([{PackageTypeID:null,Name:"Select...",CarrierID:null}]);this.down("#cboPackage").store.loadData(b.getRange(),true);var d=b.findBy(function(b){return b.data.PackageTypeID==a.getValue()?true:false},this);!d&&a.setValue(null);a.setDisabled(false)},loadConfirmation:function(b){var a=this.down("#cboConfirmation");if(!b){a.setDisabled(true);return}if(b){var c=SS.data.OrderStores.ConfirmationStore.queryBy(function(a){return a.data.CarrierID==b?true:false},this);a.store.loadData(c.getRange(),false);var d=c.findBy(function(b){return b.data.Confirmation==a.getValue()?true:false},this);!d&&a.setValue(null);a.setDisabled(false)}else a.setDisabled(true)},initComponent:function(){this.defaults=Ext.apply(this.defaults||{},{listeners:{scope:this,change:function(b,a){if(b.name==this.carrierField)if(a){this.loadPackageTypes(a);this.loadConfirmation(a)}else{this.down("#cboPackage").setValue(null);this.down("#cboPackage").setDisabled(true)}}}});Ext.apply(this,{border:false,hideLabel:true,items:[{xtype:"carrier_combo",name:this.carrierField,itemId:"cboCarrier",fieldLabel:"Carrier",allowBlank:!this.requireCarrier},{xtype:"combo",itemId:"cboPackage",fieldLabel:"Package",name:this.packageField,hidden:!this.packageField,allowBlank:!this.requirePackage,disabled:true,store:new Ext.data.Store({proxy:{type:"memory"},fields:["PackageTypeID","Name"]}),valueField:"PackageTypeID",displayField:"Name",queryMode:"local",autoSelect:false,forceSelection:false,triggerAction:"all",lazyInit:false,editable:false,typeAhead:false,emptyText:"Select..."},{xtype:"combo",itemId:"cboConfirmation",fieldLabel:"Confirmation",name:this.confirmationField,hidden:!this.confirmationField,disabled:true,store:new Ext.data.Store({proxy:{type:"memory"},fields:["ConfirmationID","Name"]}),valueField:"ConfirmationID",displayField:"Name",queryMode:"local",matchFieldWidth:false,listConfig:{width:200},autoSelect:false,forceSelection:false,triggerAction:"all",lazyInit:false,editable:false,typeAhead:false,emptyText:"Select..."}]});this.callParent();this.loadPackageTypes();this.loadConfirmation()}})