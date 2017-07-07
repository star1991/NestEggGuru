!function(t,e,o,i){"use strict";Foundation.libs.tooltip={name:"tooltip",version:"5.5.3",settings:{additional_inheritable_classes:[],tooltip_class:".tooltip",append_to:"body",touch_close_text:"Tap To Close",disable_for_touch:!1,hover_delay:200,fade_in_duration:150,fade_out_duration:150,show_on:"all",tip_template:function(t,e){return'<span data-selector="'+t+'" id="'+t+'" class="'+Foundation.libs.tooltip.settings.tooltip_class.substring(1)+'" role="tooltip">'+e+'<span class="nub"></span></span>'}},cache:{},init:function(t,e,o){Foundation.inherit(this,"random_str"),this.bindings(e,o)},should_show:function(e,o){var i=t.extend({},this.settings,this.data_options(e));return"all"===i.show_on?!0:this.small()&&"small"===i.show_on?!0:this.medium()&&"medium"===i.show_on?!0:!(!this.large()||"large"!==i.show_on)},medium:function(){return matchMedia(Foundation.media_queries.medium).matches},large:function(){return matchMedia(Foundation.media_queries.large).matches},events:function(e){function o(t,e,o){t.timer||(o?(t.timer=null,n.showTip(e)):t.timer=setTimeout(function(){t.timer=null,n.showTip(e)}.bind(t),n.settings.hover_delay))}function i(t,e){t.timer&&(clearTimeout(t.timer),t.timer=null),n.hide(e)}var n=this,s=n.S;n.create(this.S(e)),t(this.scope).off(".tooltip").on("mouseenter.fndtn.tooltip mouseleave.fndtn.tooltip touchstart.fndtn.tooltip MSPointerDown.fndtn.tooltip","["+this.attr_name()+"]",function(e){var a=s(this),r=t.extend({},n.settings,n.data_options(a)),l=!1;if(Modernizr.touch&&/touchstart|MSPointerDown/i.test(e.type)&&s(e.target).is("a"))return!1;if(/mouse/i.test(e.type)&&n.ie_touch(e))return!1;if(a.hasClass("open"))Modernizr.touch&&/touchstart|MSPointerDown/i.test(e.type)&&e.preventDefault(),n.hide(a);else{if(r.disable_for_touch&&Modernizr.touch&&/touchstart|MSPointerDown/i.test(e.type))return;if(!r.disable_for_touch&&Modernizr.touch&&/touchstart|MSPointerDown/i.test(e.type)&&(e.preventDefault(),s(r.tooltip_class+".open").hide(),l=!0,t(".open["+n.attr_name()+"]").length>0)){var u=s(t(".open["+n.attr_name()+"]")[0]);n.hide(u)}/enter|over/i.test(e.type)?o(this,a):"mouseout"===e.type||"mouseleave"===e.type?i(this,a):o(this,a,!0)}}).on("mouseleave.fndtn.tooltip touchstart.fndtn.tooltip MSPointerDown.fndtn.tooltip","["+this.attr_name()+"].open",function(e){return/mouse/i.test(e.type)&&n.ie_touch(e)?!1:void("touch"==t(this).data("tooltip-open-event-type")&&"mouseleave"==e.type||("mouse"==t(this).data("tooltip-open-event-type")&&/MSPointerDown|touchstart/i.test(e.type)?n.convert_to_touch(t(this)):i(this,t(this))))}).on("DOMNodeRemoved DOMAttrModified","["+this.attr_name()+"]:not(a)",function(t){i(this,s(this))})},ie_touch:function(t){return!1},showTip:function(t){var e=this.getTip(t);return this.should_show(t,e)?this.show(t):void 0},getTip:function(e){var o=this.selector(e),i=t.extend({},this.settings,this.data_options(e)),n=null;return o&&(n=this.S('span[data-selector="'+o+'"]'+i.tooltip_class)),"object"==typeof n?n:!1},selector:function(t){var e=t.attr(this.attr_name())||t.attr("data-selector");return"string"!=typeof e&&(e=this.random_str(6),t.attr("data-selector",e).attr("aria-describedby",e)),e},create:function(o){var i=this,n=t.extend({},this.settings,this.data_options(o)),s=this.settings.tip_template;"string"==typeof n.tip_template&&e.hasOwnProperty(n.tip_template)&&(s=e[n.tip_template]);var a=t(s(this.selector(o),t("<div></div>").html(o.attr("title")).html())),r=this.inheritable_classes(o);a.addClass(r).appendTo(n.append_to),Modernizr.touch&&(a.append('<span class="tap-to-close">'+n.touch_close_text+"</span>"),a.on("touchstart.fndtn.tooltip MSPointerDown.fndtn.tooltip",function(t){i.hide(o)})),o.removeAttr("title").attr("title","")},reposition:function(e,o,i){var n,s,a,r,l;o.css("visibility","hidden").show(),n=e.data("width"),s=o.children(".nub"),a=s.outerHeight(),r=s.outerWidth(),this.small()?o.css({width:"100%"}):o.css({width:n?n:"auto"}),l=function(t,e,o,i,n,s){return t.css({top:e?e:"auto",bottom:i?i:"auto",left:n?n:"auto",right:o?o:"auto"}).end()};var u=e.offset().top,d=e.offset().left,h=e.outerHeight();if(l(o,u+h+10,"auto","auto",d),this.small())l(o,u+h+10,"auto","auto",12.5,t(this.scope).width()),o.addClass("tip-override"),l(s,-a,"auto","auto",d);else{Foundation.rtl&&(s.addClass("rtl"),d=d+e.outerWidth()-o.outerWidth()),l(o,u+h+10,"auto","auto",d),s.attr("style")&&s.removeAttr("style"),o.removeClass("tip-override");var p=o.outerHeight();i&&i.indexOf("tip-top")>-1?(Foundation.rtl&&s.addClass("rtl"),l(o,u-p,"auto","auto",d).removeClass("tip-override")):i&&i.indexOf("tip-left")>-1?(l(o,u+h/2-p/2,"auto","auto",d-o.outerWidth()-a).removeClass("tip-override"),s.removeClass("rtl")):i&&i.indexOf("tip-right")>-1&&(l(o,u+h/2-p/2,"auto","auto",d+e.outerWidth()+a).removeClass("tip-override"),s.removeClass("rtl"))}o.css("visibility","visible").hide()},small:function(){return matchMedia(Foundation.media_queries.small).matches&&!matchMedia(Foundation.media_queries.medium).matches},inheritable_classes:function(e){var o=t.extend({},this.settings,this.data_options(e)),i=["tip-top","tip-left","tip-bottom","tip-right","radius","round"].concat(o.additional_inheritable_classes),n=e.attr("class"),s=n?t.map(n.split(" "),function(e,o){return-1!==t.inArray(e,i)?e:void 0}).join(" "):"";return t.trim(s)},convert_to_touch:function(e){var o=this,i=o.getTip(e),n=t.extend({},o.settings,o.data_options(e));0===i.find(".tap-to-close").length&&(i.append('<span class="tap-to-close">'+n.touch_close_text+"</span>"),i.on("click.fndtn.tooltip.tapclose touchstart.fndtn.tooltip.tapclose MSPointerDown.fndtn.tooltip.tapclose",function(t){o.hide(e)})),e.data("tooltip-open-event-type","touch")},show:function(t){var e=this.getTip(t);"touch"==t.data("tooltip-open-event-type")&&this.convert_to_touch(t),this.reposition(t,e,t.attr("class")),t.addClass("open"),e.fadeIn(this.settings.fade_in_duration)},hide:function(t){var e=this.getTip(t);e.fadeOut(this.settings.fade_out_duration,function(){e.find(".tap-to-close").remove(),e.off("click.fndtn.tooltip.tapclose MSPointerDown.fndtn.tapclose"),t.removeClass("open")})},off:function(){var e=this;this.S(this.scope).off(".fndtn.tooltip"),this.S(this.settings.tooltip_class).each(function(o){t("["+e.attr_name()+"]").eq(o).attr("title",t(this).text())}).remove()},reflow:function(){}}}(jQuery,window,window.document);