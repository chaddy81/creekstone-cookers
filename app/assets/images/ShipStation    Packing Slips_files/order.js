SS.orders.NestedWriter=Ext.extend(Ext.data.writer.Json,{getRecordData:function(a){Ext.apply(a.data,a.getAssociatedData());return a.data}});Ext.define("ShippingPreset",{extend:"Ext.data.Model",idProperty:"PresetID",fields:["PresetID","Name","CreatedBy","SellerID",{name:"HotKey",type:"int",useNull:true},{name:"SortOrder",type:"int",useNull:false},{name:"ProviderID",type:"int",useNull:true},{name:"WarehouseID",type:"int",useNull:true},{name:"ServiceID",type:"int",useNull:true},{name:"PackageTypeID",type:"int",useNull:true},{name:"ConfirmationID",type:"int",useNull:true},{name:"InsuranceProviderID",type:"int",useNull:true},{name:"WeightOz",type:"int",useNull:true},{name:"Height",type:"float",useNull:true},{name:"Width",type:"float",useNull:true},{name:"Length",type:"float",useNull:true}],proxy:{type:"ajax",api:{create:SS.url.app+"settings/AddPreset",update:SS.url.app+"settings/UpdatePreset",destroy:SS.url.app+"settings/DeletePreset"},reader:{type:"json",root:"presets",idProperty:"PresetID"}}});Ext.define("OrderItemOption",{extend:"Ext.data.Model",idProperty:"OrderItemOptionID",proxy:{type:"memory"},fields:["OrderItemOptionID","OrderItemID","Name","Value"],belongsTo:"OrderItem"});Ext.define("OrderItem",{extend:"Ext.data.Model",idProperty:"OrderItemID",fields:["OrderItemID","OrderID","ExternalID","SKU","Description","FillSku",{name:"ProductID",type:"int",useNull:true},{name:"Quantity",type:"int"},{name:"UnitPrice",type:"float",useNull:false},{name:"ExtendedPrice",type:"float",useNull:false,convert:function(b,a){return(a.get("Quantity")||0)*(a.get("UnitPrice")||0)}},"ThumbnailUrl",{name:"UnitPrice",type:"float"},"ThumbnailUrl400","ThumbnailUrl60"],associations:[{type:"hasMany",model:"OrderItemOption",name:"Options",autoLoad:true,reader:{type:"json"},primaryKey:"OrderItemID",foreignKey:"OrderItemID"}]});Ext.define("OrderPackage",{extend:"Ext.data.Model",idProperty:"OrderPackageID",proxy:{type:"memory"},fields:["OrderPackageID","OrderID","Description",{name:"WeightOz",type:"int",useNull:true},{name:"WeightLbs",type:"int",useNull:true},{name:"Weight",type:"int",useNull:true,persist:true},{name:"Height",type:"float",useNull:true},{name:"Width",type:"float",useNull:true},{name:"Length",type:"float",useNull:true},{name:"DeclaredValue",type:"float",useNull:true}]});Ext.define("OrderTag",{extend:"Ext.data.Model",idProperty:"OrderTagID",fields:["OrderTagID","OrderID","Tag","Color"]});Ext.define("CustomsItem",{extend:"Ext.data.Model",idProperty:"CustomsItemID",proxy:{type:"memory"},fields:["CustomsItemID","OrderID","Description","TariffNo","OriginCountryCode",{name:"Quantity",type:"int"},{name:"Weight",type:"int"},{name:"Value",type:"float"}]});Ext.define("Order",{extend:"Ext.data.Model",idProperty:"OrderID",isModified:function(a){if(a=="Tags")return false;else if(a=="ShipName"){for(var c=["ShipCompany","ShipStreet1","ShipStreet2","ShipStreet3","ShipCity","ShipState"],b=0;b<c.length;b++)if(this.isModified(c[b]))return true;return false}else if(a=="WeightOz")return Ext.ModelManager.getModel("Order").superclass.isModified.call(this,a)||this.isModified("WeightLbs");else if(a=="Rate")return this.isModified("ShippingCost")||this.isModified("ConfirmationCost")||this.isModified("InsuranceCost")||this.isModified("OtherCost")||this.isModified("RateError");return Ext.ModelManager.getModel("Order").superclass.isModified.call(this,a)},proxy:{type:"ajax",api:{update:SS.url.app+"orders/updateorder",read:SS.url.app+"orders/loadorder",create:SS.url.app+"orders/neworder"},reader:{type:"json",idProperty:"OrderID",root:"orders",totalProperty:"total"},writer:new SS.orders.NestedWriter({allowSingle:false,encode:false,root:"orders",writeAllFields:true})},getRate:function(){return this.get("RateError")?0:this.get("ShippingCost")+this.get("ConfirmationCost")+this.get("InsuranceCost")+this.get("OtherCost")},fields:[{name:"OrderItems",persist:true},{name:"CustomsItems",persist:true},{name:"OrderPackages",persist:true},"OrderID","OrderNumber","BillName","ShipName","ShipCompany","ShipStreet1","ShipStreet2","ShipStreet3","ShipCity","ShipState","ShipPhone","ShipPostalCode","ShipCountryCode","CleanseMessage","CustomerID","OrderStatusID","CleanseHash","NotesToBuyer","Shipments","Username","BuyerEmail","Tags","AssignedUser","WarehouseLocation",{name:"UpdatingRate",type:"boolean",defaultValue:false},{name:"orderItemsPresent",type:"boolean",defaultValue:false},{name:"LockAddress",type:"boolean"},{name:"RateError",type:"string",useNull:true},{name:"Rate",type:"float",useNull:true,convert:function(b,a){return a.get("RateError")?0:a.get("ShippingCost")+a.get("ConfirmationCost")+a.get("InsuranceCost")+a.get("OtherCost")}},"StoreName","CustomsContents","NonDelivery","ItemName","ItemSku","ExternalUrl",{name:"InsuredValue",type:"float",defaultValue:0},{name:"StoreID",type:"int",useNull:true},{name:"FillMethod",type:"string",useNull:true},{name:"FillProviderID",type:"int",useNull:true},{name:"FillServiceID",type:"int",useNull:true},{name:"ProductID",type:"int",useNull:true},{name:"Zone",type:"int",useNull:true},{name:"Age",type:"int",defaultValue:0},{name:"ItemCount",type:"int",defaultValue:0},{name:"InsuranceProvider",type:"int",defaultValue:0,useNull:true},{name:"BillToParty",type:"int",useNull:true},"BillToAccount","BillToPostalCode","BillToCountryCode","NotesFromBuyer","InternalNotes",{name:"Gift",type:"boolean"},{name:"IsInternational",type:"boolean"},{name:"SaveDefault",type:"boolean"},{name:"IsAPO",type:"boolean"},{name:"IsProtectorate",type:"boolean"},{name:"NonMachinable",type:"boolean"},{name:"ShowPostage",type:"boolean"},{name:"NoPostage",type:"boolean"},{name:"Alcohol",type:"boolean"},{name:"PackingSlipID",type:"int",useNull:true},{name:"EmailTemplateID",type:"int",useNull:true},{name:"Marketplace"},{name:"ResidentialIndicator"},{name:"MarketplaceID",type:"int"},{name:"AddressVerified",type:"int"},{name:"ProviderID",type:"int",useNull:true},{name:"CarrierID",type:"int",useNull:true},{name:"RequestedShippingService"},{name:"RequestedShippingServiceID",type:"int",useNull:true},{name:"WarehouseID",type:"int",useNull:true},{name:"ServiceID",type:"int",useNull:true},{name:"RequestedPackageTypeID",type:"int",useNull:true},{name:"TotalOz",type:"int",defaultValue:0},{name:"WeightOz",type:"int",defaultValue:0},{name:"WeightLbs",type:"int",defaultValue:0},{name:"Width",type:"float",useNull:true},{name:"Length",type:"float",useNull:true},{name:"Height",type:"float",useNull:true},"Confirmation",{name:"Quantity",type:"int"},{name:"ShipSequence",type:"int",defaultValue:0},{name:"InsuranceRequested",type:"boolean"},{name:"PayDate",type:"date",dateFormat:"MS"},{name:"OrderDate",type:"date",dateFormat:"MS"},{name:"HoldUntil",type:"date",dateFormat:"MS"},{name:"ShipDate",type:"date",dateFormat:"MS"},{name:"OrderTotal",type:"float"},{name:"Subtotal",type:"float"},{name:"AmountPaid",type:"float"},{name:"ShippingAmount",type:"float"},{name:"ShippingCost",type:"float",useNull:true},{name:"InsuranceCost",type:"float"},{name:"ConfirmationCost",type:"float"},{name:"OtherCost",type:"float"},{name:"TaxAmount",type:"float"},{name:"OrderNumberCleaned",type:"string",useNull:true,defaultValue:null},{name:"SuppressMarketplaceNotify",type:"boolean",defaultValue:false,useNull:true},{name:"SaturdayDelivery",type:"boolean"},"GiftMessage",{name:"BillDutiesToSender",type:"boolean",defaultValue:false,useNull:true},"CustomField1","CustomField2","CustomField3","Source","DryIce","DryIceWeightLbs","DryIceWeightOz","ShipperRelease","ImportBatch","DeclarationStatement","IncludeReturnLabel","IncludeReturnLabelProviderID","IncludeReturnLabelServiceID","IncludeReturnLabelPackageTypeID"],associations:[{type:"hasMany",model:"OrderItem",name:"OrderItems",primaryKey:"OrderID",foreignKey:"OrderID",autoLoad:false,associationKey:"OrderItems"},{type:"hasMany",model:"CustomsItem",name:"CustomsItems",primaryKey:"OrderID",foreignKey:"OrderID",autoLoad:false,associationKey:"CustomsItems"},{type:"hasMany",model:"OrderPackage",name:"OrderPackages",primaryKey:"OrderID",foreignKey:"OrderID",autoLoad:false,associationKey:"OrderPackages"}]})