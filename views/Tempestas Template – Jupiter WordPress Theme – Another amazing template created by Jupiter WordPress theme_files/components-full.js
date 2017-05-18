function mk_gmap_iterator($id){function openModal(e){e.preventDefault();var $modal=$(".gmap-marker-popup"),date=new Date;date.getTime();$modal.find("input").val(""),$modal.find(".show-upload-image").html(),$modal.fadeIn(200)}function cancelModal(e){e.preventDefault(),$(".gmap-marker-popup").fadeOut(200)}function submitModal(e){e.preventDefault();var $submitBtn=$(this),$popup=$submitBtn.parents(".gmap-marker-popup"),$inputs=$popup.find("input"),$inputUniq=$inputs.filter('[name="uniqid"]'),uniq=$inputUniq.val(),date=new Date,time=date.getTime(),data={};uniq||$inputUniq.val(time),$inputs.each(function(){var $input=$(this),val=$input.val();val&&(data[$input.attr("name")]=val)}),data&&!uniq?(appendData(data),appendRow(data)):data&&uniq&&(updateData(data),updateRow(data)),$popup.fadeOut(200)}function appendData(data){var currentData=getCurrentData();currentData.push(data),save(currentData)}function appendRow(data){var $list=$(".gmap-marker-locations"),$item=$list.find("li").eq(0).clone();$item.attr("style",""),$item.removeClass("temp"),$item.attr("data-id",data.uniqid),$item.find("span").html(data.title),$item.appendTo($list)}function updateData(data){var currentData=getCurrentData();currentData[getRowIndex(currentData,data.uniqid)]=data,save(currentData)}function updateRow(data){$item=$('.gmap-marker-locations li[data-id="'+data.uniqid+'"]'),$item.find("span").html(data.title)}function save(data){$(".gmap-marks-collector").val(window.btoa(encodeURIComponent(JSON.stringify(data))))}function remove(e){e.preventDefault();var id=getRowId(e),data=getCurrentData(),index=getRowIndex(data,id);null!=index&&($(".gmap-marker-locations li:not(.temp)").eq(index).remove(),data.splice(index,1),save(data))}function edit(e){e.preventDefault();var id=getRowId(e),data=getCurrentData(),index=getRowIndex(data,id),$modal=$(".gmap-marker-popup");$modal.find('input[name="uniqid"]').val(data[index].uniqid),$modal.find('input[name="title"]').val(data[index].title),$modal.find('input[name="latitude"]').val(data[index].latitude),$modal.find('input[name="longitude"]').val(data[index].longitude),$modal.find('input[name="address"]').val(data[index].address),$modal.find('input[name="marker_icon"]').val(data[index].marker_icon),$modal.find(".show-upload-image").html(data[index].marker_icon?'<img src="'+data[index].marker_icon+'">':""),$modal.fadeIn(200)}function getRowId(e){return $(e.currentTarget).parents("li").data("id")}function getRowIndex(data,id){var index=null;return data.forEach(function(location,i){parseFloat(location.uniqid)===parseFloat(id)&&(index=i)}),index}function getCurrentData(){var data=$(".gmap-marks-collector").val();return data=isBase64(data)?decodeURIComponent(window.atob(data)):unescape(data),data&&"false"!==data?JSON.parse(data):[]}function isBase64(str){try{return btoa(atob(str))==str}catch(err){return!1}}$=jQuery,$(".gmap-new-loaction-btn").on("click",openModal),$("#mk-popup-cancel-btn").on("click",cancelModal),$("#mk-popup-submit-btn").on("click",submitModal),$(document).on("click",".gmap-delete-btn",remove),$(document).on("click",".gmap-edit-btn",edit)}!function($){"use strict";var _toBuild=[];MK.component.AdvancedGMaps=function(el){var $this=$(el),container=document.getElementById("mk-theme-container"),data=$this.data("advancedgmaps-config"),apikey=!!data.options.apikey&&"key="+data.options.apikey+"&",map=null,bounds=null,infoWindow=null,position=null,build=function(){data.options.scrollwheel=!1,data.options.mapTypeId=google.maps.MapTypeId[data.options.mapTypeId],data.options.styles=data.style,bounds=new google.maps.LatLngBounds,map=new google.maps.Map(el,data.options),infoWindow=new google.maps.InfoWindow,map.setOptions({panControl:data.options.panControl,draggable:data.options.draggable,zoomControl:data.options.zoomControl,mapTypeControl:data.options.scaleControl,scaleControl:data.options.mapTypeControl});var marker,i;for(map.setTilt(45),i=0;i<data.places.length;i++)data.places[i].latitude&&data.places[i].longitude&&(position=new google.maps.LatLng(data.places[i].latitude,data.places[i].longitude),bounds.extend(position),marker=new google.maps.Marker({position:position,map:map,title:data.places[i].address,icon:data.places[i].marker?data.places[i].marker:data.icon}),google.maps.event.addListener(marker,"click",function(marker,i){return function(){data.places[i].address&&data.places[i].address.length>1?(infoWindow.setContent('<div class="info_content"><p>'+data.places[i].address+"</p></div>"),infoWindow.open(map,marker)):(infoWindow.setContent(""),infoWindow.close())}}(marker,i)),map.fitBounds(bounds));var boundsListener=google.maps.event.addListener(map,"bounds_changed",function(event){this.setZoom(data.options.zoom),google.maps.event.removeListener(boundsListener)}),update=function(){google.maps.event.trigger(map,"resize"),map.setCenter(position)};update();!function(){$(window).on("resize",update),window.addResizeListener(container,update)}()},initAll=function(){for(var i=0,l=_toBuild.length;i<l;i++)_toBuild[i]()};return MK.api.advancedgmaps=MK.api.advancedgmaps||function(){initAll()},{init:function(){_toBuild.push(build),MK.core.loadDependencies(["https://maps.googleapis.com/maps/api/js?"+apikey+"callback=MK.api.advancedgmaps"])}}}}(jQuery),function($){"use strict";function mk_animated_cols(){function equalheight(container){var $el,currentTallest=0,currentRowStart=0,rowDivs=new Array,topPosition=0;return $(container).each(function(){if($el=$(this),$($el).height("auto"),topPosition=$el.position().top,currentRowStart!=topPosition){for(var currentDiv=0;currentDiv<rowDivs.length;currentDiv++)rowDivs[currentDiv].height(currentTallest);rowDivs.length=0,currentRowStart=topPosition,currentTallest=$el.height(),rowDivs.push($el)}else rowDivs.push($el),currentTallest=currentTallest<$el.height()?$el.height():currentTallest;for(currentDiv=0;currentDiv<rowDivs.length;currentDiv++)rowDivs[currentDiv].height(currentTallest)}),currentTallest}function prepareCols(el){var $this=el.parent().parent().find(".mk-animated-columns"),iconHeight=equalheight(".vc_row .animated-column-icon, .animated-column-holder .mk-svg-icon"),titleHeight=equalheight(".vc_row .animated-column-title"),descHeight=equalheight(".vc_row .animated-column-desc");$this.find(".animated-column-btn").innerHeight();$this.hasClass("full-style")?$this.find(".animated-column-item").each(function(){var $this=$(this),contentHeight=iconHeight+30+(titleHeight+10)+(descHeight+70)+34;$this.height(1.5*contentHeight+50);var $box_height=$this.outerHeight(!0),$icon_height=$this.find(".animated-column-icon, .animated-column-holder .mk-svg-icon").height();$this.find(".animated-column-holder").css({paddingTop:$box_height/2-$icon_height}),$this.animate({opacity:1},300)}):$this.find(".animated-column-item").each(function(){var $this=$(this),halfHeight=$this.height()/2,halfIconHeight=$this.find(".animated-column-icon, .animated-column-holder .mk-svg-icon").height()/2,halfTitleHeight=$this.find(".animated-column-simple-title").height()/2;$this.find(".animated-column-holder").css({paddingTop:halfHeight-halfIconHeight}),$this.find(".animated-column-title").css({paddingTop:halfHeight-halfTitleHeight}),$this.animate({opacity:1},300)})}$(".mk-animated-columns").each(function(){var that=this;MK.core.loadDependencies([MK.core.path.plugins+"tweenmax.js"],function(){var $this=$(that),$parent=$this.parent().parent(),$columns=$parent.find(".column_container"),index=$columns.index($this.parent());$this.hasClass("full-style")&&$this.find(".animated-column-item").hover(function(){TweenLite.to($(this).find(".animated-column-holder"),.5,{top:"-15%",ease:Back.easeOut}),TweenLite.to($(this).find(".animated-column-desc"),.5,{top:"50%",ease:Expo.easeOut},.4),TweenLite.to($(this).find(".animated-column-btn"),.3,{top:"50%",ease:Expo.easeOut},.6)},function(){TweenLite.to($(this).find(".animated-column-holder"),.5,{top:"0%",ease:Back.easeOut,easeParams:[3]}),TweenLite.to($(this).find(".animated-column-desc"),.5,{top:"100%",ease:Back.easeOut},.4),TweenLite.to($(this).find(".animated-column-btn"),.5,{top:"100%",ease:Back.easeOut},.2)}),$this.hasClass("simple-style")&&$this.find(".animated-column-item").hover(function(){TweenLite.to($(this).find(".animated-column-holder"),.7,{top:"100%",ease:Expo.easeOut}),TweenLite.to($(this).find(".animated-column-title"),.7,{top:"0%",ease:Back.easeOut},.2)},function(){TweenLite.to($(this).find(".animated-column-holder"),.7,{top:"0%",ease:Expo.easeOut}),TweenLite.to($(this).find(".animated-column-title"),.7,{top:"-100%",ease:Back.easeOut},.2)}),$columns.length===index+1&&(prepareCols($this),$(window).on("resize",function(){setTimeout(prepareCols($this),1e3)})),MK.utils.eventManager.subscribe("iconsInsert",function(){prepareCols($this)})})})}$(window).on("load",mk_animated_cols)}(jQuery),function($){"use strict";MK.core,MK.core.path;MK.component.BannerBuilder=function(el){return{init:function(){var $this=$(el),data=$this.data("bannerbuilder-config");MK.core.loadDependencies([MK.core.path.plugins+"jquery.flexslider.js"],function(){$this.flexslider({selector:".mk-banner-slides > .mk-banner-slide",animation:data.animation,smoothHeight:!1,direction:"horizontal",slideshow:!0,slideshowSpeed:data.slideshowSpeed,animationSpeed:data.animationSpeed,pauseOnHover:!0,directionNav:data.directionNav,controlNav:!1,initDelay:2e3,prevText:"",nextText:"",pauseText:"",playText:""})})}}}}(jQuery),function($){"use strict";var zIndex=0;$(".mk-newspaper-wrapper").on("click",".blog-loop-comments",function(event){event.preventDefault();var $this=$(event.currentTarget);$this.parents(".mk-blog-newspaper-item").css("z-index",++zIndex),$this.parents(".newspaper-item-footer").find(".newspaper-social-share").slideUp(200).end().find(".newspaper-comments-list").slideDown(200),setTimeout(function(){MK.utils.eventManager.publish("item-expanded")},300)}),$(".mk-newspaper-wrapper").on("click",".newspaper-item-share",function(event){event.preventDefault();var $this=$(event.currentTarget);$this.parents(".mk-blog-newspaper-item").css("z-index",++zIndex),$this.parents(".newspaper-item-footer").find(".newspaper-comments-list").slideUp(200).end().find(".newspaper-social-share").slideDown(200),setTimeout(function(){MK.utils.eventManager.publish("item-expanded")},300)})}(jQuery),function($){"use strict";var core=MK.core,path=MK.core.path;MK.component.Category=function(el){var blurImage=function($item){return $item.each(function(){var $_this=$(this),img=$_this.find(".item-thumbnail");img.clone().addClass("blur-effect item-blur-thumbnail").removeClass("item-thumbnail").prependTo(this);var blur_this=$(".blur-effect",this);blur_this.each(function(index,element){!0===img[index].complete?Pixastic.process(blur_this[index],"blurfast",{amount:.5}):blur_this.load(function(){Pixastic.process(blur_this[index],"blurfast",{amount:.5})})})})},masonry=function(){function grid(){minigrid({container:".js-masonry",item:".js-masonry-item",gutter:0})}$(".js-masonry").length&&(grid(),$(window).on("resize",grid))};return{init:function(){core.loadDependencies([path.plugins+"pixastic.js"],function(){blurImage($(".blur-image-effect .mk-loop-item .item-holder "))}),core.loadDependencies([path.plugins+"minigrid.js"],masonry)}}}}(jQuery),function($){"use strict";var core=MK.core;core.path;MK.component.Chart=function(el){return{init:function(){MK.core.loadDependencies([MK.core.path.plugins+"jquery.easyPieChart.js"],function(){$(".mk-chart__chart").each(function(){var $this=$(this),$parent_width=$(this).parent().width(),$chart_size=parseInt($this.attr("data-barSize"));$parent_width<$chart_size&&($chart_size=$parent_width,$this.css("line-height",$chart_size),$this.find("i").css({"line-height":$chart_size+"px"}),$this.css({"line-height":$chart_size+"px"}));var build=function(){$this.easyPieChart({animate:1300,lineCap:"butt",lineWidth:$this.attr("data-lineWidth"),size:$chart_size,barColor:$this.attr("data-barColor"),trackColor:$this.attr("data-trackColor"),scaleColor:"transparent",onStep:function(value){this.$el.find(".chart-percent span").text(Math.ceil(value))}})};MK.utils.scrollSpy(this,{position:"bottom",after:build})})})}}}}(jQuery),function($){"use strict";$(".mk-clients.column-style").each(function(){function recreateGrid(){var i;if($listItems.unwrap(),window.matchMedia("(max-width: 550px)").matches&&fullRowColumnsCount>=1)for(i=0;i<listItemsCount;i+=1)$listItems.slice(i,i+1).wrapAll('<ul class="mk-clients-fixed-list" style="'+listStyle+'"></ul>');else if(window.matchMedia("(max-width: 767px)").matches&&fullRowColumnsCount>=2)for(i=0;i<listItemsCount;i+=2)$listItems.slice(i,i+2).wrapAll('<ul class="mk-clients-fixed-list" style="'+listStyle+'"></ul>');else if(window.matchMedia("(max-width: 960px)").matches&&fullRowColumnsCount>=3)for(i=0;i<listItemsCount;i+=3)$listItems.slice(i,i+3).wrapAll('<ul class="mk-clients-fixed-list" style="'+listStyle+'"></ul>');else for(i=0;i<listItemsCount;i+=fullRowColumnsCount)$listItems.slice(i,i+fullRowColumnsCount).wrapAll('<ul style="'+listStyle+'"></ul>')}var $group=$(this),$listItems=$group.find("li"),listItemsCount=$listItems.length,listStyle=$group.find("ul").attr("style")||"",fullRowColumnsCount=$group.find("ul:first-of-type li").length;recreateGrid(),$(window).on("resize",recreateGrid)})}(jQuery),function($){"use strict";function handleDropshadowVisiblity(){var $toggleBtn=$(".drop_shadow").closest(".mk-toggle-button");"true"===$(".elevation_effect").val()?($toggleBtn.hasClass("mk-toggle-on")&&$toggleBtn.trigger("click"),$toggleBtn.hide()):$toggleBtn.show()}$(document).on("change",".background_style",function(e){$(".background_hov_color_style option[value='none'], .background_hov_color_style option[value='gradient_color'], .background_hov_color_style option[value='image']").remove(),$(".background_hov_color_style").append('<option class="none" value="none" selected="selected">None</option>'),$(".background_hov_color_style").append('<option class="image" value="image">Image & Single Color</option>'),$(".background_hov_color_style").append('<option class="gradient_color" value="gradient_color">Gradient Color</option>'),"gradient_color"==this.options[e.target.selectedIndex].value?($(".background_hov_color_style").val("gradient_color").change(),$(".background_hov_color_style option[value='image']").remove()):"image"==this.options[e.target.selectedIndex].value&&($(".background_hov_color_style").val("image").change(),$(".background_hov_color_style option[value='gradient_color']").remove())}),$(document).on("change",".elevation_effect",handleDropshadowVisiblity),$(document).on("click",".vc_edit-form-tab-control",handleDropshadowVisiblity)}(jQuery),function($){"use strict";$(".mk-edge-slider").find("video").each(function(){this.pause(),this.currentTime=0}),MK.component.EdgeSlider=function(el){var self=this,$this=$(el),$window=$(window),$wrapper=$this.parent(),config=$this.data("edgeslider-config"),$nav=$(config.nav),$prev=$nav.find(".mk-edge-prev"),$prevTitle=$prev.find(".nav-item-caption"),$prevBg=$prev.find(".edge-nav-bg"),$next=$nav.find(".mk-edge-next"),$nextTitle=$next.find(".nav-item-caption"),$nextBg=$next.find(".edge-nav-bg"),$navBtns=$nav.find("a"),$pagination=$(".swiper-pagination"),$skipBtn=$(".edge-skip-slider"),$opacityLayer=$this.find(".edge-slide-content"),$videos=$this.find("video"),currentSkin=null,currentPoint=null,winH=null,opacity=null,offset=null,callbacks={onInitialize:function(slides){self.$slides=$(slides),self.slideContents=$.map(self.$slides,function(slide){var $slide=$(slide),title=$slide.find(".edge-slide-content .edge-title").first().text();return{skin:$slide.attr("data-header-skin"),title:title,image:$slide.find(".mk-section-image").css("background-image")||$slide.find(".mk-video-section-touch").css("background-image"),bgColor:$slide.find(".mk-section-image").css("background-color")}}),MK.utils.isSmoothScroll&&$this.css("position","fixed"),setNavigationContent(1,self.$slides.length-1),setSkin(0),playVideo(0),setTimeout(function(){$(".edge-slider-loading").fadeOut("100")},1e3)},onBeforeSlide:function(id){},onAfterSlide:function(id){setNavigationContent(nextFrom(id),prevFrom(id)),setSkin(id),stopVideos(),playVideo(id)}},nextFrom=function(id){return id+1===self.$slides.length?0:id+1},prevFrom=function(id){return id-1==-1?self.$slides.length-1:id-1},setNavigationContent=function(nextId,prevId){self.slideContents[prevId]&&($prevTitle.text(self.slideContents[prevId].title),$prevBg.css("background","none"!==self.slideContents[prevId].image?self.slideContents[prevId].image:self.slideContents[prevId].bgColor)),self.slideContents[nextId]&&($nextTitle.text(self.slideContents[nextId].title),$nextBg.css("background","none"!==self.slideContents[nextId].image?self.slideContents[nextId].image:self.slideContents[nextId].bgColor))},setSkin=function(id){currentSkin=self.slideContents[id].skin,$navBtns.attr("data-skin",currentSkin),$pagination.attr("data-skin",currentSkin),$skipBtn.attr("data-skin",currentSkin),self.config.firstEl&&MK.utils.eventManager.publish("firstElSkinChange",currentSkin)},stopVideos=function(){$videos.each(function(){this.pause(),this.currentTime=0})},playVideo=function(id){var video=self.$slides.eq(id).find("video").get(0);video&&(video.play(),console.log("play video in slide nr "+id))},onResize=function(){var height=$wrapper.height();$this.height(height);var width=$wrapper.width();$this.width(width),winH=$window.height(),offset=$this.offset().top,MK.utils.isSmoothScroll&&(MK.utils.isResponsiveMenuState()?($this.css({"-webkit-transform":"translateZ(0)","-moz-transform":"translateZ(0)","-ms-transform":"translateZ(0)","-o-transform":"translateZ(0)",transform:"translateZ(0)",position:"absolute"}),$opacityLayer.css({opacity:1})):onScroll())},onScroll=function(){currentPoint=-MK.val.scroll(),offset+currentPoint<=0&&(opacity=1+(offset+currentPoint)/winH*2,opacity=Math.min(opacity,1),opacity=Math.max(opacity,0),$opacityLayer.css({opacity:opacity})),$this.css({"-webkit-transform":"translateY("+currentPoint+"px) translateZ(0)","-moz-transform":"translateY("+currentPoint+"px) translateZ(0)","-ms-transform":"translateY("+currentPoint+"px) translateZ(0)","-o-transform":"translateY("+currentPoint+"px) translateZ(0)",transform:"translateY("+currentPoint+"px) translateZ(0)",position:"fixed"})};onResize(),$window.on("load",onResize),$window.on("resize",onResize),window.addResizeListener($wrapper.get(0),onResize),MK.utils.isSmoothScroll&&(onScroll(),$window.on("scroll",function(){MK.utils.isResponsiveMenuState()||window.requestAnimationFrame(onScroll)})),this.el=el,this.config=$.extend(config,callbacks),this.slideContents=null},MK.component.EdgeSlider.prototype={init:function(){new MK.ui.Slider(this.el,this.config).init()}}}(jQuery),function($){"use strict";$(".mk-faq-wrapper").each(function(){function filterItems(cat){if(""===cat)return void $faq.slideDown(200).removeClass("hidden");$faq.not("."+cat).slideUp(200).addClass("hidden"),$faq.filter("."+cat).slideDown(200).removeClass("hidden")}var $this=$(this),$filter=$this.find(".filter-faq"),$filterItem=$filter.find("a"),$faq=$this.find(".mk-faq-container > div"),currentFilter="";$filterItem.on("click",function(e){var $this=$(this);currentFilter=$this.data("filter"),$filterItem.removeClass("current"),$this.addClass("current"),filterItems(currentFilter),e.preventDefault()})})}(jQuery),function($){"use strict";$(".js-header-shortcode").each(function(){var $this=$(this),$parent_page_section=$this.parents(".mk-page-section");$parent_page_section.attr("id")&&$this.detach().appendTo($parent_page_section),$this.parent().css("z-index",99999)})}(jQuery),function($){"use strict";function mk_section_intro_effects(){if(MK.utils.isMobile())$(".mk-page-section.intro-true").each(function(){$(this).attr("data-intro-effect","")});else{if(!$.exists(".mk-page-section.intro-true"))return;$(".mk-page-section.intro-true").each(function(){var that=this;MK.core.loadDependencies([MK.core.path.plugins+"jquery.sectiontrans.js",MK.core.path.plugins+"tweenmax.js"],function(){var $this=$(that),$pageCnt=$this.parent().nextAll("div"),windowHeight=$(window).height(),effectName=$this.attr("data-intro-effect"),$header=$(".mk-header"),effect={fade:new TimelineLite({paused:!0}).set($pageCnt,{opacity:0,y:.3*windowHeight}).to($this,1,{opacity:0,ease:Power2.easeInOut}).to($pageCnt,1,{opacity:1,y:0,ease:Power2.easeInOut},"-=.7").set($this,{zIndex:"-1"}),zoom_out:new TimelineLite({paused:!0}).set($pageCnt,{opacity:0,y:.3*windowHeight}).to($this,1.5,{opacity:.8,scale:.8,y:-windowHeight-100,ease:Strong.easeInOut}).to($pageCnt,1.5,{opacity:1,y:0,ease:Strong.easeInOut},"-=1.3"),shuffle:new TimelineLite({paused:!0}).to($this,1.5,{y:-windowHeight/2,ease:Strong.easeInOut}).to($pageCnt.first(),1.5,{paddingTop:windowHeight/2,ease:Strong.easeInOut},"-=1.3")};console.log($pageCnt),$this.sectiontrans({effect:effectName}),$this.hasClass("shuffled")&&(TweenLite.set($this,{y:-windowHeight/2}),TweenLite.set($this.nextAll("div").first(),{paddingTop:windowHeight/2})),$("body").on("page_intro",function(){MK.utils.scroll.disable(),$(this).data("intro",!0),effect[effectName].play(),setTimeout(function(){$header.addClass("pre-sticky"),$header.addClass("a-sticky"),$(".mk-header-padding-wrapper").addClass("enable-padding"),$("body").data("intro",!1),"shuffle"===effectName&&$this.addClass("shuffled")},1e3),setTimeout(MK.utils.scroll.enable,1500)}),$("body").on("page_outro",function(){MK.utils.scroll.disable(),$(this).data("intro",!0),effect[effectName].reverse(),setTimeout(function(){$header.removeClass("pre-sticky"),$header.removeClass("a-sticky"),$(".mk-header-padding-wrapper").removeClass("enable-padding"),$("body").data("intro",!1),$this.hasClass("shuffled")&&$this.removeClass("shuffled")},1e3),setTimeout(MK.utils.scroll.enable,1500)})})})}}function mk_section_adaptive_height(){$(".mk-page-section.mk-adaptive-height").each(function(){var imageHeight=$(this).find(".mk-adaptive-image").height();$(this).css("height",imageHeight)})}mk_section_intro_effects();var debounceResize=null;$(window).on("resize",function(){null!==debounceResize&&clearTimeout(debounceResize),debounceResize=setTimeout(mk_section_intro_effects,300)}),$(window).on("load resize",mk_section_adaptive_height)}(jQuery),function($){"use strict";function mk_page_title_parallax(){MK.utils.isMobile()||"false"===mk_smooth_scroll||$(".mk-effect-wrapper").each(function(){var progressVal,currentPoint,$this=$(this),ticking=!1,scrollY=MK.val.scroll(),$window=$(window),parentHeight=($(window).height(),$this.outerHeight()),endPoint=$this.offset().top+parentHeight,effectLayer=$this.find(".mk-effect-bg-layer"),gradientLayer=effectLayer.find(".mk-effect-gradient-layer"),cntLayer=$this.find(".mk-page-title-box-content"),animation=effectLayer.attr("data-effect"),top=$this.offset().top,height=$this.outerHeight();"parallax"==animation&&function(){var gap=.7*top;effectLayer.css({height:height+gap+"px",top:-gap+"px"})}();var animationSet=function(){if(scrollY=MK.val.scroll(),"parallax"==animation&&(currentPoint=.7*(0+scrollY),effectLayer.get(0).style.transform="translateY("+currentPoint+"px)"),"parallaxZoomOut"==animation){console.log(effectLayer),currentPoint=.7*(0+scrollY),progressVal=1/(endPoint-0)*(scrollY-0);var zoomCalc=1.3-(1.3-1)*progressVal;effectLayer.get(0).style.transform="translateY("+currentPoint+"px) scale("+zoomCalc+")"}"gradient"==animation&&(progressVal=1/(endPoint-0)*(scrollY-0),gradientLayer.css({opacity:2*progressVal})),"gradient"!=animation&&(progressVal=1/(endPoint-0)*(scrollY-0),cntLayer.css({opacity:1-4*progressVal})),ticking=!1};animationSet();var requestTick=function(){ticking||(window.requestAnimationFrame(animationSet),ticking=!0)};$window.off("scroll",requestTick),$window.on("scroll",requestTick)})}var $window=$(window),debounceResize=null;$window.on("load",mk_page_title_parallax),$window.on("resize",function(){null!==debounceResize&&clearTimeout(debounceResize),debounceResize=setTimeout(mk_page_title_parallax,300)})}(jQuery),function($){"use strict";var utils=MK.utils,core=MK.core,path=MK.core.path;MK.component.PhotoAlbum=function(el){this.album=el,this.initialOpen=!1},MK.component.PhotoAlbum.prototype={dom:{gallery:".slick-slider-wrapper",title:".slick-title",galleryContainer:".slick-slides",closeBtn:".slick-close-icon",thumbList:".slick-dots",thumbs:".slick-dots li",imagesData:"photoalbum-images",titleData:"photoalbum-title",idData:"photoalbum-id",urlData:"photoalbum-url",activeClass:"is-active"},tpl:{gallery:"#tpl-photo-album",slide:'<div class="slick-slide"></div>'},init:function(){this.cacheElements(),this.bindEvents(),this.openByLink()},cacheElements:function(){this.$album=$(this.album),this.imagesSrc=this.$album.data(this.dom.imagesData),this.albumLength=this.imagesSrc.length,this.title=this.$album.data(this.dom.titleData),this.id=this.$album.data(this.dom.idData),this.url=this.$album.data(this.dom.urlData),this.images=[]},bindEvents:function(){this.$album.not('[data-photoalbum-images="[null]"]').on("click",this.albumClick.bind(this)),$(document).on("click",this.dom.closeBtn,this.closeClick.bind(this)),$(window).on("resize",this.thumbsVisibility.bind(this)),$(window).on("resize",this.makeArrows.bind(this))},albumClick:function(e){e.preventDefault(),this.open(),MK.ui.loader.add(this.album)},closeClick:function(e){e.preventDefault(),this.slider&&(this.removeGallery(),this.slider.exitFullScreen())},thumbsVisibility:function(){this.thumbsWidth&&(window.matchMedia("(max-width:"+(this.thumbsWidth+260)+"px)").matches?this.hideThumbs():this.showThumbs())},hideThumbs:function(){this.$thumbList&&this.$thumbList.hide()},showThumbs:function(){this.$thumbList&&this.$thumbList.show()},open:function(){var self=this;core.loadDependencies([path.plugins+"slick.js"],function(){self.createGallery(),self.loadImages()})},createGallery:function(){if(!$(this.dom.gallery).length){var tpl=$(this.tpl.gallery).eq(0).html();$("body").append(tpl)}this.$gallery=$(this.dom.gallery),this.$closeBtn=$(this.dom.closeBtn)},createSlideshow:function(){var self=this;this.slider=new MK.ui.FullScreenGallery(this.dom.galleryContainer,{id:this.id,url:this.url}),this.slider.init(),$(window).trigger("resize"),this.makeArrows(),this.$thumbList=$(this.dom.thumbList),this.$thumbs=$(this.dom.thumbs),this.thumbsWidth=95*this.$thumbs.length,this.thumbsVisibility(),setTimeout(function(){MK.ui.loader.remove(self.album)},100),MK.utils.eventManager.publish("photoAlbum-open")},makeArrows:function(){this.arrowsTimeout&&clearTimeout(this.arrowsTimeout),this.arrowsTimeout=setTimeout(function(){var $prev=$(".slick-prev").find("svg"),$next=$(".slick-next").find("svg");$prev.wrap('<div class="slick-nav-holder"></div>'),$next.wrap('<div class="slick-nav-holder"></div>'),matchMedia("(max-width: 1024px)").matches?($prev.attr({width:12,height:22}).find("polyline").attr("points","12,0 0,11 12,22"),$next.attr({width:12,height:22}).find("polyline").attr("points","0,0 12,11 0,22")):($prev.attr({width:33,height:65}).find("polyline").attr("points","0.5,0.5 32.5,32.5 0.5,64.5"),$next.attr({width:33,height:65}).find("polyline").attr("points","0.5,0.5 32.5,32.5 0.5,64.5"))},0)},loadImages:function(){var self=this,n=0;this.images.length?this.onLoad(this.albumLength):this.imagesSrc.forEach(function(src){if(null!==src){var img=new Image;img.onload=function(){self.onLoad(n+=1)},img.src=src,self.images.push(img)}})},onLoad:function(n){n===this.albumLength&&(this.insertImages(),this.showGallery(),this.createSlideshow())},insertImages:function(){var $galleryContainer=this.$gallery.find(this.dom.galleryContainer),$title=$(this.dom.title),slide=this.tpl.slide;$galleryContainer.html(""),$title.html(this.title),this.images.forEach(function(img){var $slide=$(slide);$slide.html(img),$galleryContainer.prepend($slide)})},showGallery:function(){this.$gallery.addClass(this.dom.activeClass),utils.scroll.disable()},removeGallery:function(){var self=this;this.$gallery.removeClass(this.dom.activeClass),setTimeout(function(){self.$gallery.remove()},300),utils.scroll.enable()},openByLink:function(){var id,loc=window.location,hash=loc.hash;hash.length&&hash.substring(1).length&&(id=hash.substring(1),(id=id.replace("!loading",""))!=this.id||this.initialOpen||(this.initialOpen=!0,this.open()))}},MK.component.PhotoAlbumBlur=function(el){var blurImage=function($item){return $item.each(function(){var $_this=$(this),img=$_this.find(".album-cover-image");img.clone().addClass("blur-effect item-blur-thumbnail").removeClass("album-cover-image").prependTo(this);var blur_this=$(".blur-effect",this);blur_this.each(function(index,element){!0===img[index].complete?Pixastic.process(blur_this[index],"blurfast",{amount:.5}):blur_this.load(function(){Pixastic.process(blur_this[index],"blurfast",{amount:.5})})})})};return{init:function(){core.loadDependencies([path.plugins+"pixastic.js"],function(){blurImage($(".mk-album-item figure"))})}}}}(jQuery),function($){"use strict";var AjaxModal=function(el){this.el=el;var $this=$(el),action=$this.data("action"),id=$this.data("id");this.load(action,id)};AjaxModal.prototype={init:function(html){var self=this;$("body").append(html),this.cacheElements(),this.bindEvents(),this.$modal.addClass("is-active"),MK.core.initAll(self.$modal.get(0)),$(".variations_form").each(function(){$(this).wc_variation_form().find(".variations select:eq(0)").change()}),MK.utils.scroll.disable(),MK.ui.loader.remove(),MK.utils.eventManager.publish("quickViewOpen")},cacheElements:function(){this.$modal=$(".mk-modal"),this.$slider=this.$modal.find(".mk-slider-holder"),this.$container=this.$modal.find(".mk-modal-container"),this.$closeBtn=this.$modal.find(".js-modal-close")},bindEvents:function(){this.$container.on("click",function(e){e.stopPropagation()}),this.$closeBtn.on("click",this.handleClose.bind(this)),this.$modal.on("click",this.handleClose.bind(this))},handleClose:function(e){e.preventDefault(),MK.utils.scroll.enable(),this.close()},close:function(){this.$modal.remove()},load:function(action,id){$.ajax({url:MK.core.path.ajaxUrl,data:{action:action,id:id},success:this.init.bind(this),error:this.error.bind(this)})},error:function(response){console.log(response)}};var createModal=function(e){e.preventDefault();var el=e.currentTarget;MK.ui.loader.add($(el).parents(".product-loop-thumb")),new AjaxModal(el)};$(document).on("click",".js-ajax-modal",createModal)}(jQuery),function($){function handleLoad(){$(".mk-slideshow-box").each(run)}function run(){function autoScroll(){if(!isTest){var $i=$slider.find(".active").index();$slides.eq($i).removeClass("active").fadeOut($transition_time),$slides.length==$i+1&&($i=-1),$slides.eq($i+1).addClass("active").fadeIn($transition_time,function(){setTimeout(autoScroll,$time_between_slides)})}}var $slider=$(this),$slides=$slider.find(".mk-slideshow-box-item"),$transition_time=$slider.data("transitionspeed"),$time_between_slides=$slider.data("slideshowspeed");$slider.find(".mk-slideshow-box-content").children("p").filter(function(){if(""==$.trim($(this).text()))return!0}).remove(),$slides.first().addClass("active").fadeIn($transition_time,function(){setTimeout(autoScroll,$time_between_slides)})}window.addEventListener?window.addEventListener("load",handleLoad,!1):window.attachEvent&&window.attachEvent("onload",handleLoad)}(jQuery),function($){"use strict";$(".mk-subscribe").each(function(){var $this=$(this);$this.find(".mk-subscribe--form").submit(function(e){e.preventDefault(),$.ajax({url:MK.core.path.ajaxUrl,type:"POST",data:{action:"mk_ajax_subscribe",email:$this.find(".mk-subscribe--email").val(),list_id:$this.find(".mk-subscribe--list-id").val(),optin:$this.find(".mk-subscribe--optin").val()},success:function(res){$this.find(".mk-subscribe--message").html($.parseJSON(res).message),console.log($.parseJSON(res).message)}})})})}(jQuery),function($){"use strict";var _instancesCollection={};MK.component.SwipeSlideshow=function(el){var $this=$(el),id=$this.parent().attr("id");this.el=el,this.id=id,this.config=$this.data("swipeslideshow-config"),
this.config&&(this.config.hasPagination=!1)},MK.component.SwipeSlideshow.prototype={init:function(){var slider=new MK.ui.Slider(this.el,this.config);slider.init(),_instancesCollection[this.id]=slider}},MK.component.SwipeSlideshowExtraNav=function(el){this.el=el},MK.component.SwipeSlideshowExtraNav.prototype={init:function(){this.cacheElements(),this.bindEvents()},cacheElements:function(){var $this=$(this.el);this.sliderId=$this.data("gallery"),this.slider=_instancesCollection[this.sliderId],this.$thumbs=$("#"+this.sliderId).find(".thumbnails a")},bindEvents:function(){this.$thumbs.on("click",this.clickThumb.bind(this))},clickThumb:function(e){e.preventDefault();var $this=$(e.currentTarget),id=$this.index();this.slider.goTo(id)}},MK.utils.eventManager.subscribe("gallery-update",function(e,config){void 0!==_instancesCollection[config.id]&&_instancesCollection[config.id].reset()})}(jQuery),function($){"use strict";var core=MK.core;core.path;MK.component.Tooltip=function(el){return{init:function(){$(".mk-tooltip").each(function(){$(this).find(".mk-tooltip--link").hover(function(){$(this).siblings(".mk-tooltip--text").stop(!0).animate({opacity:1},400)},function(){$(this).siblings(".mk-tooltip--text").stop(!0).animate({opacity:0},400)})})}}}}(jQuery),function($){"use strict";!function(){$(".mk-flickr-feeds").each(function(){var $this=$(this),apiKey=$this.attr("data-key"),userId=$this.attr("data-userid"),perPage=$this.attr("data-count");$this.attr("data-column"),jQuery.getJSON("https://api.flickr.com/services/rest/?format=json&method=flickr.photos.search&api_key="+apiKey+"&user_id="+userId+"&&per_page="+perPage+"&jsoncallback=?",function(data){jQuery.each(data.photos.photo,function(i,rPhoto){var basePhotoURL="http://farm"+rPhoto.farm+".static.flickr.com/"+rPhoto.server+"/"+rPhoto.id+"_"+rPhoto.secret,thumbPhotoURL=basePhotoURL+"_q.jpg",mediumPhotoURL=basePhotoURL+".jpg",photoStringEnd='title="'+rPhoto.title+'" rel="flickr-feeds" class="mk-lightbox flickr-item a_colitem" href="'+mediumPhotoURL+'"><img src="'+thumbPhotoURL+'" alt="'+rPhoto.title+'"/></a>;',photoString="<a "+photoStringEnd;jQuery(photoString).appendTo($this)})})})}()}(jQuery),function($){"use strict";function dynamicHeight(){var $this=$(this);$this.height("auto"),window.matchMedia("(max-width: 768px)").matches||$this.height($this.height())}var $window=$(window),container=document.getElementById("mk-theme-container");$(".equal-columns").each(function(){dynamicHeight.bind(this),$window.on("load",dynamicHeight.bind(this)),$window.on("resize",dynamicHeight.bind(this)),window.addResizeListener(container,dynamicHeight.bind(this))})}(jQuery);