Ext.define("Ext.ux.window.Notification",{extend:"Ext.window.Window",alias:"widget.uxNotification",cls:"ux-notification-window",autoClose:true,autoHeight:true,plain:false,draggable:false,shadow:false,focus:Ext.emptyFn,manager:null,useXAxis:false,position:"br",spacing:6,paddingX:30,paddingY:10,slideInAnimation:"easeIn",slideBackAnimation:"bounceOut",slideInDuration:1500,slideBackDuration:1e3,hideDuration:500,autoCloseDelay:7e3,stickOnClick:true,stickWhileHover:true,isHiding:false,readyToHide:false,destroyAfterHide:false,closeOnMouseOut:false,xPos:0,yPos:0,statics:{defaultManager:{el:null}},initComponent:function(){var a=this;if(Ext.isDefined(a.corner))a.position=a.corner;if(Ext.isDefined(a.slideDownAnimation))a.slideBackAnimation=a.slideDownAnimation;if(Ext.isDefined(a.autoDestroyDelay))a.autoCloseDelay=a.autoDestroyDelay;if(Ext.isDefined(a.autoHideDelay))a.autoCloseDelay=a.autoHideDelay;if(Ext.isDefined(a.autoHide))a.autoClose=a.autoHide;if(Ext.isDefined(a.slideInDelay))a.slideInDuration=a.slideInDelay;if(Ext.isDefined(a.slideDownDelay))a.slideBackDuration=a.slideDownDelay;if(Ext.isDefined(a.fadeDelay))a.hideDuration=a.fadeDelay;a.position=a.position.replace(/c/,"");a.updateAlignment(a.position);a.setManager(a.manager);a.callParent(arguments)},onRender:function(){var a=this;a.el.hover(function(){a.mouseIsOver=true},function(){a.mouseIsOver=false;if(a.closeOnMouseOut){a.closeOnMouseOut=false;a.close()}},a);this.callParent(arguments)},updateAlignment:function(b){var a=this;switch(b){case"br":a.paddingFactorX=-1;a.paddingFactorY=-1;a.siblingAlignment="br-br";if(a.useXAxis)a.managerAlignment="bl-br";else a.managerAlignment="tr-br";break;case"bl":a.paddingFactorX=1;a.paddingFactorY=-1;a.siblingAlignment="bl-bl";if(a.useXAxis)a.managerAlignment="br-bl";else a.managerAlignment="tl-bl";break;case"tr":a.paddingFactorX=-1;a.paddingFactorY=1;a.siblingAlignment="tr-tr";if(a.useXAxis)a.managerAlignment="tl-tr";else a.managerAlignment="br-tr";break;case"tl":a.paddingFactorX=1;a.paddingFactorY=1;a.siblingAlignment="tl-tl";if(a.useXAxis)a.managerAlignment="tr-tl";else a.managerAlignment="bl-tl";break;case"b":a.paddingFactorX=0;a.paddingFactorY=-1;a.siblingAlignment="b-b";a.useXAxis=0;a.managerAlignment="t-b";break;case"t":a.paddingFactorX=0;a.paddingFactorY=1;a.siblingAlignment="t-t";a.useXAxis=0;a.managerAlignment="b-t";break;case"l":a.paddingFactorX=1;a.paddingFactorY=0;a.siblingAlignment="l-l";a.useXAxis=1;a.managerAlignment="r-l";break;case"r":a.paddingFactorX=-1;a.paddingFactorY=0;a.siblingAlignment="r-r";a.useXAxis=1;a.managerAlignment="l-r"}},getXposAlignedToManager:function(){var a=this,b=0;if(a.manager&&a.manager.el&&a.manager.el.dom)if(!a.useXAxis)return a.el.getLeft();else if(a.position=="br"||a.position=="tr"||a.position=="r"){b+=a.manager.el.getAnchorXY("r")[0];b-=a.el.getWidth()+a.paddingX}else{b+=a.manager.el.getAnchorXY("l")[0];b+=a.paddingX}return b},getYposAlignedToManager:function(){var a=this,b=0;if(a.manager&&a.manager.el&&a.manager.el.dom)if(a.useXAxis)return a.el.getTop();else if(a.position=="br"||a.position=="bl"||a.position=="b"){b+=a.manager.el.getAnchorXY("b")[1];b-=a.el.getHeight()+a.paddingY}else{b+=a.manager.el.getAnchorXY("t")[1];b+=a.paddingY}return b},getXposAlignedToSibling:function(b){var a=this;return a.useXAxis?a.position=="tl"||a.position=="bl"||a.position=="l"?b.xPos+b.el.getWidth()+b.spacing:b.xPos-a.el.getWidth()-a.spacing:a.el.getLeft()},getYposAlignedToSibling:function(b){var a=this;return a.useXAxis?a.el.getTop():a.position=="tr"||a.position=="tl"||a.position=="t"?b.yPos+b.el.getHeight()+b.spacing:b.yPos-a.el.getHeight()-b.spacing},getNotifications:function(a){var b=this;if(!b.manager.notifications[a])b.manager.notifications[a]=[];return b.manager.notifications[a]},setManager:function(b){var a=this;a.manager=b;if(typeof a.manager=="string")a.manager=Ext.getCmp(a.manager);if(!a.manager){a.manager=a.statics().defaultManager;if(!a.manager.el)a.manager.el=Ext.getBody()}if(typeof a.manager.notifications=="undefined")a.manager.notifications={}},beforeShow:function(){var a=this;if(a.stickOnClick)if(a.body&&a.body.dom)Ext.fly(a.body.dom).on("click",function(){a.cancelAutoClose();a.addCls("notification-fixed")},a);if(a.autoClose){a.task=new Ext.util.DelayedTask(a.doAutoClose,a);a.task.delay(a.autoCloseDelay)}a.el.setX(-1e4);a.el.setOpacity(1)},afterShow:function(){var a=this,b=a.getNotifications(a.managerAlignment);if(b.length){a.el.alignTo(b[b.length-1].el,a.siblingAlignment,[0,0]);a.xPos=a.getXposAlignedToSibling(b[b.length-1]);a.yPos=a.getYposAlignedToSibling(b[b.length-1])}else{a.el.alignTo(a.manager.el,a.managerAlignment,[a.paddingX*a.paddingFactorX,a.paddingY*a.paddingFactorY],false);a.xPos=a.getXposAlignedToManager();a.yPos=a.getYposAlignedToManager()}Ext.Array.include(b,a);a.el.animate({to:{x:a.xPos,y:a.yPos,opacity:1},easing:a.slideInAnimation,duration:a.slideInDuration,dynamic:true});this.callParent(arguments)},slideBack:function(){var a=this,b=a.getNotifications(a.managerAlignment),c=Ext.Array.indexOf(b,a);if(!a.isHiding&&a.el&&a.manager&&a.manager.el&&a.manager.el.dom&&a.manager.el.isVisible()){if(c){a.xPos=a.getXposAlignedToSibling(b[c-1]);a.yPos=a.getYposAlignedToSibling(b[c-1])}else{a.xPos=a.getXposAlignedToManager();a.yPos=a.getYposAlignedToManager()}a.stopAnimation();a.el.animate({to:{x:a.xPos,y:a.yPos},easing:a.slideBackAnimation,duration:a.slideBackDuration,dynamic:true})}},cancelAutoClose:function(){var a=this;a.autoClose&&a.task.cancel()},doAutoClose:function(){var a=this;if(!(a.stickWhileHover&&a.mouseIsOver))a.close();else a.closeOnMouseOut=true},removeFromManager:function(){var c=this;if(c.manager){var b=c.getNotifications(c.managerAlignment),a=Ext.Array.indexOf(b,c);if(a!=-1){Ext.Array.erase(b,a,1);for(;a<b.length;a++)b[a].slideBack()}}},hide:function(){var a=this;if(!a.isHiding&&a.el){a.isHiding=true;a.cancelAutoClose();a.stopAnimation();a.el.animate({to:{opacity:0},easing:"easeIn",duration:a.hideDuration,dynamic:false,listeners:{afteranimate:function(){a.removeFromManager();a.readyToHide=true;a.hide(a.animateTarget,a.doClose,a)}}})}if(a.readyToHide){a.isHiding=false;a.readyToHide=false;a.removeCls("notification-fixed");a.callParent(arguments);a.destroyAfterHide&&a.destroy()}},destroy:function(){var a=this;if(!a.hidden){a.destroyAfterHide=true;a.hide(a.animateTarget,a.doClose,a)}else a.callParent(arguments)}})