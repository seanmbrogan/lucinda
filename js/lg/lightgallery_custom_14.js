light = window.light || {};

var share, zoom = false, fullscreen,progressBar, autoplayControls, fourceautoplay, escKey,prevHtml, prevHtml,
      closeButton, counter, actualSize, caption = true, photoInfo = false, thumbnail = true, captionright,
      transition_type = 'lg-fade', transition_speed = 1000, controls = true, autoplay = false, controls_arrow, fillMode,
      galleryIcon = false, galleryTitle, galleryDesc, fotomoto = false, captionenableSwipe, captionenableDrag, lightboximg_size, lightboximg_responsive_size, photofilename, queryParam = '';

light.initOptions = function() {
  light.data = [];
  light.div = "#container_slider";
  //light.current_index = 0; // window.lgIndex can be used as current slide index
  if(typeof light.userdata == 'undefined')
    light.userdata = {};

  // profing gallery download statusthumbnail
  if( light.userdata.isClientproofing && light.userdata.isClientdownload && light.userdata.isClientdownloadstatus == 1 ){
    download = true;
  } else{
    download = false;
  }

  // controls arrow start
  if(userObject.controls_arrow == 'fixed'){
    setTimeout( function(){
      $('body').find('.lg-actions').addClass('arrow-fixed');
    }, 50);

    prevHtml = '<svg viewBox="0 0 256 512"><use xlink:href="#chevronl-left-pixpa-icon" width="256" height="512"></use></svg>';
    nextHtml ='<svg viewBox="0 0 256 512"><use xlink:href="#chevronl-right-pixpa-icon" width="256" height="512"></use></svg>';

  } else if(userObject.controls_arrow == 'fixed_arrow_type2'){
    setTimeout( function(){
      $('body').find('.lg-actions').addClass('arrow-fixed_type2');
    }, 50);

    nextHtml = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M311.03 131.515l-7.071 7.07c-4.686 4.686-4.686 12.284 0 16.971L387.887 239H12c-6.627 0-12 5.373-12 12v10c0 6.627 5.373 12 12 12h375.887l-83.928 83.444c-4.686 4.686-4.686 12.284 0 16.971l7.071 7.07c4.686 4.686 12.284 4.686 16.97 0l116.485-116c4.686-4.686 4.686-12.284 0-16.971L328 131.515c-4.686-4.687-12.284-4.687-16.97 0z"/></svg>';
    prevHtml = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M136.97 380.485l7.071-7.07c4.686-4.686 4.686-12.284 0-16.971L60.113 273H436c6.627 0 12-5.373 12-12v-10c0-6.627-5.373-12-12-12H60.113l83.928-83.444c4.686-4.686 4.686-12.284 0-16.971l-7.071-7.07c-4.686-4.686-12.284-4.686-16.97 0l-116.485 116c-4.686 4.686-4.686 12.284 0 16.971l116.485 116c4.686 4.686 12.284 4.686 16.97-.001z"/></svg>';

  } else if(userObject.controls_arrow == 'fixed_arrow_type3'){
    setTimeout( function(){
      $('body').find('.lg-actions').addClass('arrow-fixed_type3');
    }, 50);

    prevHtml = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M504 256C504 119 393 8 256 8S8 119 8 256s111 248 248 248 248-111 248-248zM256 472c-118.7 0-216-96.1-216-216 0-118.7 96.1-216 216-216 118.7 0 216 96.1 216 216 0 118.7-96.1 216-216 216zm-12.5-92.5l-115.1-115c-4.7-4.7-4.7-12.3 0-17l115.1-115c4.7-4.7 12.3-4.7 17 0l6.9 6.9c4.7 4.7 4.7 12.5-.2 17.1L181.7 239H372c6.6 0 12 5.4 12 12v10c0 6.6-5.4 12-12 12H181.7l85.6 82.5c4.8 4.7 4.9 12.4.2 17.1l-6.9 6.9c-4.8 4.7-12.4 4.7-17.1 0z"/></svg>';
    nextHtml = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M8 256c0 137 111 248 248 248s248-111 248-248S393 8 256 8 8 119 8 256zM256 40c118.7 0 216 96.1 216 216 0 118.7-96.1 216-216 216-118.7 0-216-96.1-216-216 0-118.7 96.1-216 216-216zm12.5 92.5l115.1 115c4.7 4.7 4.7 12.3 0 17l-115.1 115c-4.7 4.7-12.3 4.7-17 0l-6.9-6.9c-4.7-4.7-4.7-12.5.2-17.1l85.6-82.5H140c-6.6 0-12-5.4-12-12v-10c0-6.6 5.4-12 12-12h190.3l-85.6-82.5c-4.8-4.7-4.9-12.4-.2-17.1l6.9-6.9c4.8-4.7 12.4-4.7 17.1 0z"/></svg>';

  } else if(userObject.controls_arrow == 'floating'){
    setTimeout( function(){
      $('body').find('.lg-actions').addClass('arrow-floating');
    }, 50);

    prevHtml = '';
    nextHtml = '';

  } else if(userObject.controls_arrow == 'no-arrows'){
    setTimeout( function(){
      $('body').find('.lg-actions').addClass('arrow-hide');
    }, 50);

    prevHtml = '';
    nextHtml = '';
  }

  if( light.userdata.isClientproofing && light.userdata.isClientComment && light.userdata.isClientfavoritestatus != '' ){
    comments = true;
  } else {
    comments = false;
  }

  if(light.userdata.isClientproofing && userObject.slideshowImageMode == 'caption'){
    userObject.photofilename = 'yes';
    photofilename = true;
  }

  // profing gallery favorites status
  if( light.userdata.isClientproofing && light.userdata.isClientfavorite && light.userdata.isClientfavoritestatus != '' ){
    favorite = true;
    // thumbnail = false;
  } else{
    favorite = false;
  }
  

  // profing gallery store status
  if( light.userdata.isClientstore == '1' && light.userdata.isGallerystore == '1' ){
    store = true;
  } else{
    store = false;
  }

  // share hide unhide all gallery
  share = light.userdata.shareWidget == 'hide' ? false : true;
  


  if(!light.userdata.isClientproofing && typeof userObject.fotomotoId != 'undefined' && userObject.fotomotoId != '' && userObject.IsSaleable != 'undefined' && userObject.IsSaleable == 1) {
    fotomoto = true;
  } else {
    fotomoto = false;
  }

  if(userObject.photofilename == 'yes') {
    photofilename = true;
  } else {
    photofilename = false;
  }

  if(userObject.zoom == 'true') {
    zoom = true;
  } else {
    zoom = false;
  }

  if(userObject.slideshowTransition == 'fade') {
    transition_type = 'lg-fade';
  } else if (userObject.slideshowTransition == 'horizontal_swipe') {
    transition_type = 'lg-slide';
  } else if(userObject.slideshowTransition == 'vertical_swipe') {
    transition_type = 'lg-slide-vertical';
  }

  transition_speed = parseInt(userObject.slideshowSpeed)*1000;
  if( userObject.controls == 'show' ) {
    controls = true;
    controlslight = true;
    hideBarsDelay = 3000;
  } else if( userObject.controls == 'hover' ) {
    controls = true;
    controlslight = true;
    hideBarsDelay = 3000;
  } else if( userObject.controls == 'hide' ) {
    controls = true;
    controlslight = true;
    hideBarsDelay = 3000;
  }

  autoplay = userObject.slideshowAutoplay == 'no' ? false : true;

  // Selection for FillMode
  if( userObject.slideshowFitmode == "fit") {
    fillMode =  false;
  } else if ( userObject.slideshowFitmode == "fill" ||  userObject.slideshowFitmode == "crop"
    || userObject.slideshowFitmode == "pan") {
    fillMode =  true;
  } else {
    fillMode =  false;
  }

  // gallery description start js
  galleryTitle = $.trim($('.js-gallery-title-content').data('gallerytitle'));
  galleryDesc = $.trim($('.js-gallery-title-content').data('gallerydesc'));

  $('body').on('click', '.js-gallery-content-btn', function(){
    $('body').append("<div class='featherlight'><div class='featherlight-content'><span class='featherlight-close-icon featherlight-close'><span class='menu-svg-icon'><svg viewBox='0 0 320 512'><use xlink:href='#times-pixpa-icon' width='320' height='512'></use></svg></span></span>" + "<div class='u"+
      userObject.userId+"-secondary-text-small'>" + galleryTitle +  '</div>' + "<div class='photo-info-desc u"+
      userObject.userId+"-secondary-text-small'>" + galleryDesc + "</div></div></div>");
    $(".featherlight").show();
  });

  $('body').on('click', ".featherlight-close-icon", function(){
    $(".featherlight").remove();
  })

  if (galleryDesc != '') {
    galleryIcon = true;
  };

  if( $(window).innerWidth() <= 767){
    if ( userObject.onloadType == 'slideshow' && userObject.slideshowLayout == 'single_image' ) {
      // share = false;
      share = light.userdata.shareWidget == 'hide' ? false : true;
      // zoom = false;
      fullscreen = false;
      autoplayControls = false;
      fourceautoplay = true;
      escKey = false;
      closeButton = true;
      counter = true;
      actualSize = false;
      progressBar = false;
      thumbnail = false;
      if( userObject.slideshowImageMode == 'image' || userObject.slideshowImageMode == 'thumbnail' ) {
        photoInfo = true;
      }
    } else{
      thumbnail = false;
      // zoom = true;
      fullscreen = true;
      autoplayControls = true;
      fourceautoplay = true;
      progressBar = false;
      //photoInfo = true;
      actualSize = true;
      captionenableSwipe = true;
      captionenableDrag = true;
      
      if ( userObject.slideshowImageMode == 'caption' || userObject.slideshowImageMode == 'caption-right' ) {
        photoInfo = false;
        // zoom = false;
        captionright = ''
        userObject.slideshowImageMode = 'caption';
      } else {
        // zoom = false;
        photoInfo = true;
      }


    }
  } else{
    if ( userObject.onloadType == 'slideshow' && userObject.slideshowLayout == 'single_image' ) {
      // share = userObject.shareWidget == 'hide' ? false : true;
      share = light.userdata.shareWidget == 'hide' ? false : true;
      // zoom = false;
      fullscreen = true;
      autoplayControls = true;
      fourceautoplay = true;
      escKey = true;
      closeButton = true;
      counter = true;
      actualSize = true;
      progressBar = false;
      if( userObject.slideshowImageMode == 'image' ) {
        thumbnail = false;
        captionright = '';
        photoInfo = true;
      } else if ( userObject.slideshowImageMode == 'thumbnail' ) {
        photoInfo = true;
        captionright = '';
        $('.lg-thumb').width($('.stage-spacing').width());
      } else if ( userObject.slideshowImageMode == 'caption' ) {
        thumbnail = false;
        photoInfo = false;
        captionright = '';
        // zoom = false;
      } else if ( userObject.slideshowImageMode == 'caption-right' ) {
        thumbnail = false;
        // caption = false;
        // captionright = '';
        photoInfo = true;

        if( window.innerWidth <= 767 ) {
          captionright = '';
          photoInfo = false;
          // zoom = false;
        } else {
          captionright = 'fb-comments';
          photoInfo = false;
        }
      } else{
        thumbnail = false;
        captionright = '';
        photoInfo = true;
      }

      if( userObject.slideshowFitmode == "fill" ||  userObject.slideshowFitmode == "crop"
        || userObject.slideshowFitmode == "pan") {
        fillMode =  false;
      }


    } else if ( userObject.onloadType == 'slideshow' && (userObject.slideshowLayout == 'vertical_slider' || userObject.slideshowLayout == 'vertical_slider_detailed' ) ) {
      progressBar = false;
      // share = userObject.shareWidget == 'hide' ? false : true;
      share = light.userdata.shareWidget == 'hide' ? false : true;
      if( userObject.slideshowImageMode == 'image') {
        thumbnail = false;
        captionright = '';
        photoInfo = true;
      } else if ( userObject.slideshowImageMode == 'thumbnail' ) {
        photoInfo = true;
        captionright = '';
        $('.lg-thumb').width($('.stage-spacing').width());
      } else if ( userObject.slideshowImageMode == 'caption' ) {
        photoInfo = false;
        captionright = '';
        thumbnail = false;
        if( window.innerWidth <= 767 ) {
          // zoom = false;
        } else{
          // zoom = false;
        }
      } else if ( userObject.slideshowImageMode == 'caption-right' ) {
        thumbnail = false;
        if( window.innerWidth <= 767 ) {
          captionright = '';
          photoInfo = false;
          // zoom = false;
        } else {
          captionright = 'fb-comments';
          photoInfo = false;
        }
      } else {
        thumbnail = false;
        captionright = '';
        photoInfo = true;
      }

    } else {
      // share = userObject.shareWidget == 'hide' ? false : true;
      // share = light.userdata.shareWidget == 'hide' ? false : true;
      fullscreen = true;
      autoplayControls = true;
      fourceautoplay = true;
      escKey = true;
      closeButton = true;
      counter = true;
      actualSize =  true;
      progressBar = false;

      if( userObject.slideshowImageMode == 'image') {
        // zoom = false;
        thumbnail = false;
        captionright = '';
        photoInfo = true;
      } else if ( userObject.slideshowImageMode == 'thumbnail' ) {
        // zoom = false;
        photoInfo = true;
        captionright = '';
        $('.lg-thumb').width($('.stage-spacing').width());
      } else if ( userObject.slideshowImageMode == 'caption' ) {
        thumbnail = false;
        captionright = '';
        if( window.innerWidth <= 1024 ) {
          // zoom = false;
        } else{
          // zoom = false;
        }
      } else if ( userObject.slideshowImageMode == 'caption-right' ) {
        if( window.innerWidth <= 1024 ) {
          captionright = '';
          photoInfo = false;
          thumbnail = false;
          // zoom = false;
          userObject.slideshowImageMode = 'caption';
        } else {
          captionright = 'fb-comments';
          photoInfo = false;
          // zoom = false;
          thumbnail = false;
        }
      } else {
        thumbnail = false;
        captionright = '';
        photoInfo = true;
      }
    }
  }


  
  if( light.searchPage == true || light.isStore == true ) {
    autoplayControls = true;
    // thumbnail = false;
    fourceautoplay = false;
    galleryIcon = false;
    transition_type = 'lg-fade';
    //favorite = false;
    if( light.isStore == true ) {
      photoInfo = false;
      share = false;
      // transition_type = 'lg-fade';
    }

    if(light.searchPage == true) {
      // photoInfo = false;
      share = false;
      // zoom = true;
    }

  }
}




light.config = function (lightData) {
  if(typeof light.data  === 'undefined') {
    light.data = [];
  }
  
  $.each((typeof lightData === 'undefined' ? window.total_data : lightData), function(i,v) {
    if(window.innerWidth > 767){
      if(userObject.lightboximg_size == '1200'){
        lightboximg_size = light.cdn+v.photo_1200;
        lightboximg_responsive_size = light.cdn+v.photo_1200+" 1200 "

      } else if(userObject.lightboximg_size == '1440'){
        lightboximg_size = light.cdn+v.photo_1500
        lightboximg_responsive_size = light.cdn+v.photo_1500+" 1500 "

      } else if(userObject.lightboximg_size == '2048'){
        lightboximg_size = light.cdn+v.largepath;
        lightboximg_responsive_size = light.cdn+v.largepath+" 2048"

      } else {
        lightboximg_size = light.cdn+v.largepath;
        lightboximg_responsive_size = light.cdn+v.photo_1200+" 1200, " +light.cdn+v.photo_1500+" 1500, "+light.cdn+v.largepath+" 2048"
      }
    } else{
      lightboximg_size = light.cdn+v.largepath;
      lightboximg_responsive_size = light.cdn+v.photo_1200+" 1200, " +light.cdn+v.photo_1500+" 1500, "+light.cdn+v.largepath+" 2048"
    }
    if(v.type == 1) {//photos
      light.data[i] = {'responsive' : lightboximg_responsive_size,
      'src': lightboximg_size, 'thumbxx': light.cdn+v.photo_100, 'thumb': light.cdn+v.photo_500, 'jcrop': v.photo_300 ? '1' : '0', '_photoid': v.id, '_galleryid': v.galleryid,
      'downloadurl' : {'500': v.photo_500, '1200' : v.photo_1200, '2000': v.largepath, 'original': v.originalpath} ,
      'tweetText': '@pixpa', 'pinterestText': 'pinterest text', 'photoinfotitle' : $.trim(v.title),
      'photoinfodesc' : $.trim(v.photodesc),  'photofilename' : v.filename, 'slidertype' : 'imgslide', 'fileExtension' : v.extension };
    }
    else if(v.type == 2) {//videos
      light.data[i] = {'src': v.description, 'thumb': ( v.largepath != '' ? light.cdn+v.photo_1200 : v.photo_500 ), '_photoid': v.id, '_galleryid': v.galleryid, 'tweetText': 'tweet text',
      'pinterestText': 'pinterest text', 'poster': ( v.largepath == '' ? v.photopath : lightboximg_size ), 'photofilename' : '', 'photoinfotitle' : $.trim(v.title),
      'photoinfodesc' : $.trim(v.photodesc), 'slidertype' : 'videoslide' };
    } else if(light.isStore) {
      light.data[i] = {'responsive' : lightboximg_responsive_size,
      'src': lightboximg_size, 'thumb': light.cdn+v.photo_500, 'jcrop': v.photo_300 ? '1' : '0', '_photoid': v.id, '_galleryid': v.galleryid,
      'downloadurl' : {'500': v.photo_500, '1200' : v.photo_1200, '2000': v.largepath, 'original': v.originalpath} ,
      'tweetText': '@pixpa', 'pinterestText': 'pinterest text', 'photoinfotitle' : $.trim(v.title),
      'photoinfodesc' : $.trim(v.photodesc),  'photofilename' : v.filename, 'slidertype' : 'imgslide', 'fileExtension' : v.extension}
    } else {//text/html
      light.data[i] = {'src': '', 'text': v.photodesc, 'thumb': '/img/text-slide-placeholder.jpg', '_photoid': v.id, '_galleryid': v.galleryid,
      'photoinfotitle' : '', 'photoinfodesc' : $.trim(v.photodesc), 'slidertype' : 'textslide' };
    }
    light.data[i].galleryid = v.galleryid;
    if(caption && ($.trim(v.title) !='' || $.trim(v.photodesc) !='' && v.type != 3)) {
      if ( userObject.slideshowImageMode == 'caption' ) {
        if ( v.photodesc == '<p>&#8203;</p>' || v.photodesc == '<p>&#65279;</p>' || v.photodesc == '' || v.photodesc == '<p></p>' || v.photodesc == '<p></p><p>﻿</p>') {
          if (v.title == null) {
            light.data[i]['subHtml'] = "";
          } else{
            light.data[i]['subHtml'] = "<b>" + v.title + "</b>";
          }
        } else {          
          var lgtitle = '';
          if (v.title != '' && v.title != null) {
            var lgtitle = '<p class="js-gallery-title-content"><b>'+ v.title +'</b></p>';
          } else {
            lgtitle = '';
          }

          light.data[i]['subHtml'] = lgtitle + "<div class='js-jssor-hiphen'>-</div>" + "<span class='js-gallery-desc-content'>" + v.photodesc + "</span>";
        }
      } else{

        var lgtitle = '', lgdesc = '';
        if (v.title != '' && typeof  v.title != 'undefined' && v.title != null) {
          lgtitle = '<p class="js-gallery-title-content"><b>'+ v.title +'</b></p>';
        } else{
          lgtitle = '';
        }

        if (v.photodesc != '' && !(v.photodesc == "<p>&#8203;</p>" || v.photodesc == "<p>&#65279;</p>" || v.photodesc == "<p></p>" || v.photodesc == "<p></p><p>﻿</p>")) {
          // var lgdesc = v.photodesc;
          var photoblank = "<p>﻿</p>";
          if (v.photodesc != photoblank) {
            lgdesc = "<span class='js-gallery-desc-content'>" +v.photodesc+"</div>";

          } else {
            lgdesc = '';
          }
        } else if(v.photodesc != ''){
          lgdesc = '';
        }

        // if (lgtitle == '' ||  lgdesc == '') {
        //   light.data[i]['subHtml'] = 'Caption not available';
        // } else {
          light.data[i]['subHtml'] = lgtitle.trim()+''+lgdesc.trim();
        // }
        

      }
    } else {
      light.data[i]['subHtml'] = '';
    }
  });
};

light.init = function (ind) {

  // For prevent multiple HTML opening of light box pop up.
  // if same image id opened then return else open in light box
  if (light.obj != undefined && light.obj.index === ind) {
    // console.log('trying opening light box again, return from here');
    return;  // lightgallery not opening in second click
  }

  var plugins_array = [lgAutoplay, lgFullscreen, lgHash, lgPager, lgShare, lgVideo ]
  
  if(thumbnail == true){
    plugins_array.push(lgThumbnail)
  }

  if(zoom == true){
    plugins_array.push(lgZoom)
  }

  // var append_subhtml = ''
  // if(userObject.slideshowImageMode == 'caption-right'){
    // append_subhtml = '.lg-sub-html';
  // } else{
    // append_subhtml = '#photo-gallery .lg-item';
  // }


  light.options = {
    plugins: plugins_array,
    //gallery
    // inside: '#container_slider',
    container: '#container_slider',
    // licenseKey: '7F193690-F34A4CE8-ADC3DF78-F29AE100',
    // appendSubHtmlTo: append_subhtml,

    // subHtmlSelectorRelative: true,
    // caption right side
    addClass: captionright,
    actualSize: true,
    zoom: zoom,
    height: '100%',
    speed: 400, // transition speed

    // download
    download: download, //for proofing purpose
    favorite : favorite, //for proofing purpose
    store : store, //for proofing store purpose
    comments : comments, // for comment proofing purpose
    fotomoto: fotomoto, // for fotomoto cart

    // caption right side
    // addClass: captionright,

    // album content
    galleryIcon: galleryIcon,
    photoInfo: photoInfo,
    photofilename: photofilename,

    // css animation
    cssEasing: 'ease',
    easing: 'linear',

    //mode: 'lg-slide-vertical-growth',
    mousewheel: false, //change slide on mouse wheel

    // controls
    hideBarsDelay: hideBarsDelay,
    controls: controlslight, // next/prev show hide     
    prevHtml: prevHtml,
    nextHtml: nextHtml,

    //fullscreen
    fullScreen: fullscreen, // working check
    fillMode : fillMode,

    mode: transition_type,
    height: '100%',
    index: ind,
    // preload: 2,
    // preload: 'none',
    counter: true,
    autoplay: true,
    progressBar: progressBar,
    fourceAutoplay: fourceautoplay,
    autoplayControls: autoplayControls,
    slideShowAutoplay: autoplay,
    slideShowInterval: transition_speed,
    // album content
    galleryIcon: galleryIcon,
    photoInfo: photoInfo,
    share: share,
    youtubePlayerParams: { autoplay: 0, enablejsapi: 0 },

    // closable gallery
    escKey : escKey,
    closable: true,
    closeButton: closeButton,
    // enableSwipe: captionenableSwipe,
    // enableDrag: captionenableDrag,
    enableDrag: true,
    enableSwipe: true,
    // videos
    loadYoutubeThumbnail: true,
    youtubeThumbSize: 'default',
    loadVimeoThumbnail: true,
    vimeoThumbSize: 'thumbnail_medium',

    autoplayFirstVideo: true,
    youTubePlayerParams: true,
    vimeoPlayerParams: true,
    wistiaPlayerParams: true,
    gotoNextSlideOnVideoEnd: true,
    autoplayVideoOnSlide: true,
    videojs: true,


    // url
    hash: false,

    // dynamic
    dynamic: true,
    dynamicEl: light.data,
  };

  console.log(light.options);
  // console.log(light.div);
  
  if(typeof window.lgObj == 'object')
    window.lgObj.destroy(true);
  // light.obj = $(light.div).lightGallery(light.options);
  light.obj = window.lightGallery(light.div, light.options);
  light.obj.openGallery(ind);
  $('.js-overlay-container').addClass('overlay-active');


}

light.launch = function() {
  var index = 0;
  $('body').unbind('click', '.js-grid-item');
  $('body').on('click', '.js-grid-item', function (event) {    
    window.scroll_img_id = $(window).scrollTop();
    if(typeof $(this).attr('data-index') != 'undefined')
      index = parseInt($(this).attr('data-index'));

    light.init(index);
    if(window.innerWidth > 1024){
      if (document.documentElement.scrollHeight > document.documentElement.clientHeight){
        $('body').css({
          'width': 'calc(100vw - 15px)'
        });
      } else {
        $('body').css({
          'width': '100%'
        });
      }
    }
    setTimeout(function() {
      $('body').addClass('lg-overflow-hidden');
      lightRemoveDiv();
    }, 100);


    
    if(light.searchPage == true) {
      setTimeout(function() {
        // $('#container_slider').find('.lg-outer').removeClass('option-type-thumbnail');
        // $('#container_slider').find('.lg-inner').removeClass('show-image-thumbnail');
        // $('#container_slider').find('.pixpa-lg-sub-html').hide();
      }, 100);
    }

    // if(light.userdata.isClientproofing && userObject.slideshowImageMode == 'caption'){
    //   setTimeout(function() {
    //     $('body').find('.proofing-photoname').hide();
    //   }, 200);
    // }

  });
}

// remove extra lightgallery div
function lightRemoveDiv() {
  function lightRemoveDivInterval() {
     if($('#container_slider').find('.lg-container').length > 1){
      $('#container_slider > div:first-child').addClass('active')
      $('#container_slider > div.active').siblings().remove()
      clearInterval(lightRemoveDiv_clear);
    }
  }
  var lightRemoveDiv_clear = setInterval(lightRemoveDivInterval, 10);
  // console.log('remove');
}

light.storeLaunch = function() {
  var index = 0;
  $('body').unbind('click', '.demo-gallery');
  $('body').on('click', '.demo-gallery>a', function (event) {
    if(typeof $(this).attr('data-index') != 'undefined')
      index = parseInt($(this).attr('data-index'));
    light.init(index);

    setTimeout(function() {
      $('body').addClass('lg-overflow-hidden');
      if(window.innerWidth > 1024){
        if (document.documentElement.scrollHeight > document.documentElement.clientHeight){
          $('body').css({
            'width': 'calc(100vw - 15px)'
          });
        } else {
          $('body').css({
            'width': '100%'
          });
        }
      }
      // if ( $(window).width() > 768 ) {
      //   $('html').addClass('lg-overflow-hidden').css({'width':(window.innerWidth - 15)+'px'})
      // } else {
      // }
    }, 100);
  });
}

light.vscrollLaunch = function() {
  var index = 0;
  // $('body').unbind('click', '.js-slideshow-item');
  $('body').on('click', '.js-slideshow-item', function (event) {
    if(typeof $(this).attr('data-index') != 'undefined')
      index = parseInt($(this).attr('data-index'));
    light.init(index);
    
    window.scroll_img_id = $(window).scrollTop();

    setTimeout(function() {
      $('body').addClass('lg-overflow-hidden');
      if(window.innerWidth > 1024){
        if (document.documentElement.scrollHeight > document.documentElement.clientHeight){
          $('body').css({
            'width': 'calc(100vw - 15px)'
          });
        } else {
          $('body').css({
            'width': '100%'
          });
        }
      }

      lightRemoveDiv();
    }, 100);
    
  });
}

light.appendUrl = function (currentIndex) {
  
  //Added for variant url with query string
  let path = new URLSearchParams(window.location.search);
  queryParam = path ? path : '';

  currentPhotoId = light.data[currentIndex]._photoid;
  if( userObject.imageUrl != "") {
    history.pushState( {} , 'Image Url', currentPhotoId+'-'+userObject.userId+'-photo-'+currentIndex);
  } else {
    var pathname  = window.location.pathname;
    pathname = pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
    var splitted = pathname.split('/');
    var x = splitted.length;
    var photomatch = new RegExp('-'+userObject.userId+'-photo-');
    // console.log('photomatch', photomatch, 'match' , splitted[x-1].match(photomatch));
    // if (splitted.join('/').match(/-photo-/)) {
    if (splitted[x-1].match(photomatch)) {
      x = splitted.length - 1;
    }
    splitted = splitted.splice(0, x).join('/');
    if (splitted[splitted.length - 1] != '/') {
      var abc = splitted + '/';
    } else {
      var abc = '/';
    }
    history.replaceState( {} , 'Image Url', abc + currentPhotoId+'-'+userObject.userId+'-photo-'+currentIndex);
  }
  userObject.imageUrl = abc + currentPhotoId+'-'+userObject.userId+'-photo-'+currentIndex;
}

light.imgoption = function (){
  if (light.userdata.isClientproofing) {
    $('#container_slider').find('.lg-toolbar').addClass('show-proffing-option');
  };

  if( userObject.slideshowImageMode == 'image' ) {
    // console.log("userObject.onloadType - " + userObject.onloadType);
    $('#container_slider').find('.lg-inner').addClass('show-image-only');
    $('#container_slider').find('.lg-outer').addClass('pixpa-'+userObject.onloadType);
    $('#container_slider').find('.lg-outer').addClass('option-type-image');

    setTimeout(function() {
      $('#container_slider').find('.lg-outer').removeClass('justified-gallery');
    }, 100);

    if (!(light.userdata.isClientproofing || light.userdata.isClientgalleries)) {
      $('#container_slider').find('.lg-inner').addClass('show-image-only-desktop');
    }

    // controll options start
    $('#container_slider').find('.lg-outer').addClass(userObject.controls);

  } else if ( userObject.slideshowImageMode == 'thumbnail' ) {
    $('#container_slider').find('.lg-outer').addClass('pixpa-'+userObject.onloadType);
    $('#container_slider').find('.lg-outer').addClass('option-type-thumbnail');
    $('#container_slider').find('.lg-inner').addClass('show-image-thumbnail');
    // controll options start
    $('#container_slider').find('.lg-outer').addClass(userObject.controls);

    if(light.searchPage == true) {
      // $('#container_slider').find('.lg-outer').removeClass('option-type-thumbnail');
      // $('#container_slider').find('.lg-inner').removeClass('show-image-thumbnail');
      // $('#container_slider').find('.pixpa-lg-sub-html').hide();
    }

    setTimeout(function() {
      $('#container_slider').find('.lg-outer').removeClass('justified-gallery');
    }, 100);

  } else if ( userObject.slideshowImageMode == 'caption' ) {
    setTimeout(function() {
      $('#container_slider').find('.lg-outer').addClass('pixpa-'+userObject.onloadType);
      $('#container_slider').find('.lg-outer').addClass('option-type-caption');
      $('#container_slider').find('.lg-inner').addClass('show-image-caption-bottom');

      // controll options start
      $('#container_slider').find('.lg-outer').addClass(userObject.controls);
      
      $('#container_slider').find('.lg-outer').removeClass('justified-gallery');
    }, 100);
  } else if ( userObject.slideshowImageMode == 'caption-right' ) {
    $('#container_slider').find('.lg-outer').addClass('pixpa-'+userObject.onloadType);
    $('#container_slider').find('.lg-inner').addClass('show-image-caption-right');
    $('#container_slider').find('.lg-outer').addClass('option-type-caption-right');

    // controll options start
    $('#container_slider').find('.lg-outer, .lg-container').addClass(userObject.controls);
    if( window.innerWidth > 1024 ) {
      $('#container_slider').find('.lg-outer, .lg-container').addClass('fb-comments');
      $('#container_slider').find('.lg-container').addClass('fb-comments');  
    } else{
      // $('.pixpa-lg-sub-html').removeClass('lg-sub-html');
    }
    


    setTimeout(function() {
      $('#container_slider').find('.lg-outer').removeClass('justified-gallery');
    }, 100);
  }

  // controls arrow start
  if(userObject.controls_arrow == 'fixed'){
    setTimeout( function(){
      $('.lg-actions').addClass('arrow-fixed');
    }, 50);
  } else if(userObject.controls_arrow == 'floating'){
    setTimeout( function(){
      $('.lg-actions').addClass('arrow-floating');
    }, 50);
  } else if(userObject.controls_arrow == 'no-arrows'){
    setTimeout( function(){
      $('.lg-actions').addClass('arrow-hide');
    }, 50);
  }
  // controls arrow end

  if( userObject.controls == 'hide' ) {
    setTimeout( function(){
      $('.lg-prev, .lg-next').addClass('hide-arrow');
    }, 50);
  }
  
}

light.photoInfo = function(currentIndex){
  var photoinfotitle, photoinfodesc;
  photoinfotitle = light.data[currentIndex].photoinfotitle;
  photoinfodesc = light.data[currentIndex].photoinfodesc;
  slidertype = light.data[currentIndex].slidertype;

  if (slidertype == 'textslide') {
    $('#container_slider').find('.lg-toolbar').addClass('textslide');
  } else{
    $('#container_slider').find('.lg-toolbar').removeClass('textslide');
  }

  if( slidertype == 'imgslide' ) {
    $('#container_slider').find('.js-buy-icon').show();
  } else {
    $('#container_slider').find('.js-buy-icon').hide();
  }

  if (light.userdata.isClientproofing) {
    var photofilename;
    photofilename = light.data[currentIndex].photofilename;
    $('#container_slider').find('.lg-outer').find('.proofing-photoname').remove();
    if (light.userdata.showFilename) {

      if ($(window).innerWidth() > 767) {
        if(light.userdata.isClientproofing && userObject.slideshowImageMode == 'caption'){
          // setTimeout(function() {
          //   $('body').find('.proofing-photoname').hide();
          // }, 200);
        } else{
          $('#container_slider').find('.lg-outer').append("<div class='proofing-photoname'>" + photofilename + "</div>");  
        }
      } else{
        $('#container_slider').find('.lg-outer').append("<div class='proofing-photoname'>" + photofilename + "</div>");  
      }
      

      
    }
  };

  if ( userObject.onloadType == 'slideshow' && !(userObject.slideshowLayout == 'single_image' || userObject.slideshowLayout == 'horizontal_slider' || userObject.slideshowLayout == 'horizontal_scroll' || userObject.slideshowLayout == 'vertical_slider' || userObject.slideshowLayout == 'vertical_slider_detailed') ) {
    if(photoinfotitle == '' && photoinfodesc == ''){
      $('.js-photo-info-btn').hide();
    } else {
      $('.js-photo-info-btn').show();
    }

    $('body').on('click', '#js-photo-info-btn-'+ currentIndex +'', function(){
      $('body').append("<div id='featherlight-"+currentIndex+"' class='featherlight'><div class='featherlight-content'><span class='featherlight-close-icon featherlight-close'><span class='menu-svg-icon'><svg viewBox='0 0 320 512'><use xlink:href='#times-pixpa-icon' width='320' height='512'></use></svg></span></span>" + "<div class='u"+
        userObject.userId+"-secondary-text-small'>" + photoinfotitle +  '</div>' + "<div class='photo-info-desc u"+
        userObject.userId+"-secondary-text-small'>" + photoinfodesc + "</div></div></div>");
      $(".featherlight").show();
    });
  } else{
    if( $(window).innerWidth() <= 1024){
      if(photoinfotitle == '' && photoinfodesc == ''){
        $('.js-photo-info-btn').hide();
      } else {
        $('.js-photo-info-btn').show();
      }

      $('body').on('click', '#js-photo-info-btn-'+ currentIndex +'', function(){
        $('body').append("<div id='featherlight-"+currentIndex+"' class='featherlight'><div class='featherlight-content'><span class='featherlight-close-icon featherlight-close'><span class='menu-svg-icon'><svg viewBox='0 0 320 512'><use xlink:href='#times-pixpa-icon' width='320' height='512'></use></svg></span></span>" + "<div class='u"+
          userObject.userId+"-secondary-text-small'>" + photoinfotitle +  '</div>' + "<div class='photo-info-desc u"+
          userObject.userId+"-secondary-text-small'>" + photoinfodesc + "</div></div></div>");
        $(".featherlight").show();
      });
    } else {
      
      if(photoinfotitle == '' && photoinfodesc == '' ){
        // console.log('photoinfotitle 1 - ' + photoinfotitle);
        // console.log('photoinfodesc 1 - ' + photoinfodesc);

        $('.js-photo-info-btn, .js-photo-info-btn-close').hide();
        setTimeout(function() {
          $('.js-photo-info-btn, .js-photo-info-btn-close').hide();
        }, 10);
      } else {
        if (photoinfotitle != '' || !(photoinfodesc == '' || photoinfodesc == '<p></p>')) {
          // console.log('photoinfotitle 2 - ' + photoinfotitle);
          // console.log('photoinfodesc 2 - ' + photoinfodesc);

          $('.js-photo-info-btn, .js-photo-info-btn-close').show();
        } else{
          // console.log('photoinfotitle 3 - ' + photoinfotitle);
          // console.log('photoinfodesc 3 - ' + photoinfodesc);

          $('.js-photo-info-btn, .js-photo-info-btn-close').hide();
        }
      }



      $('body').unbind('click', '.js-photo-info-btn');
      $('body').on('click', '.js-photo-info-btn', function(){
        $('body').find('.lg-outer').addClass('fb-comments');
        $('body').find('.lg-container').addClass('fb-comments');
        $(this).addClass('js-photo-info-btn-close');
        $(this).removeClass('js-photo-info-btn');
        $('#container_slider').find('.lg-outer').addClass('caption-show');
        $('#container_slider').find('.lg-outer .lg-thumb-outer').css('right', '250px');
      });

      $('body').unbind('click', '.js-photo-info-btn-close');
      $('body').on('click', '.js-photo-info-btn-close', function(){
        $('body').find('.lg-outer').removeClass('fb-comments');
        $('body').find('.lg-container').removeClass('fb-comments');
        $(this).addClass('js-photo-info-btn');
        $(this).removeClass('js-photo-info-btn-close');
        $('#container_slider').find('.lg-outer').removeClass('caption-show');
        $('#container_slider').find('.lg-outer .lg-thumb-outer').css('right', '');
      });

      $('body').unbind('click', '.js-photo-info-btn-desc-close');
      $('body').on('click', '.js-photo-info-btn-desc-close', function(){
        $('body').find('.lg-outer').removeClass('fb-comments');
        $('body').find('.lg-container').removeClass('fb-comments');

        $('body').find('.lg-photo-info').addClass('js-photo-info-btn');
        $('body').find('.lg-photo-info').removeClass('js-photo-info-btn-close');
        $('#container_slider').find('.lg-outer').removeClass('caption-show');
        $('#container_slider').find('.lg-outer .lg-thumb-outer').css('right', '');
      });

    }
  }
}

light.removeUrl = function(){
  var splitted = window.location.pathname.split('/');
  var x = splitted.length;
  var photomatch = new RegExp('-'+userObject.userId+'-photo-');
  // console.log('photomatch', photomatch, 'match' , splitted[x-1].match(photomatch));
  // if (splitted.join('/').match(/-photo-/)) {
  if (splitted[x-1].match(photomatch)) {
    x = splitted.length - 1;
  }
  splitted = splitted.splice(0, x).join('/');

  //Added for variant url with query string
  if(queryParam != '') {
    splitted = splitted + '?' + queryParam;
  }

  history.replaceState( {} , 'Image Url', window.location.origin+splitted);
  userObject.imageUrl = "";
  window.lgIndex = 0;
  light.obj.index = '';
  $('body').removeClass('lg-overflow-hidden');
  $('body').css({'width': ''}); 
}


light.appenddownload = function(currentIndex) {

  // functions used in favorite page starts
  if(typeof light.checkDownloadStatus == 'function' )
    light.checkDownloadStatus(currentIndex);
  if(typeof light.checkStoreStatus == 'function' )
    light.checkStoreStatus(currentIndex);
  if(typeof light.checkFavouritesStatus == 'function' )
    light.checkFavouritesStatus(currentIndex);

  if(typeof light.checkFotomotoStatus == 'function' )
    light.checkFotomotoStatus(currentIndex);
  //ends

  if( light.userdata.isClientproofing && light.userdata.isClientdownload && light.userdata.isClientdownloadstatus == 1 ) {
    $('#lg-download').unbind("click");
    $("#container_slider").find('#lg-download').find('.js-download-dropdown-menu').remove();
    var downloadtemp = $('#download-template').html();
    $(downloadtemp).find(".gallery-download-all .dropdown li[value='small']").attr('data-value', $("#container_slider").find("#lg-download").attr('data-photo500'));
    $(downloadtemp).find(".gallery-download-all .dropdown li[value='medium']").attr('data-value', $("#container_slider").find("#lg-download").attr('data-photo1200'));
    $(downloadtemp).find(".gallery-download-all .dropdown li[value='large']").attr('data-value', $("#container_slider").find("#lg-download").attr('data-photo2000'));
    $(downloadtemp).find(".gallery-download-all .dropdown li[value='original']").attr('data-value', $("#container_slider").find("#lg-download").attr('data-photooriginal'));
    $("#container_slider").find('#lg-download').append(downloadtemp);
    $('#lg-download').unbind("click");
    // $('body').on('click', '#lg-download', function() {
    $('#lg-download').on('click', function() {
      // if($.trim($("#container_slider").find('#lg-download').find('.js-download-photos-form').attr('action')) == '' && typeof light.userdata.clientslug != 'undefined'){
      if(typeof light.userdata.clientslug != 'undefined'){
        // console.log('client slug', $('#lg-download').find('.js-download-photos-form').attr('action'));
        $("#container_slider").find('#lg-download').find('.js-download-photos-form').attr('action', '/site/'+light.userdata.clientslug+'/'+light.data[currentIndex].galleryid+'/download');
      }
      $(this).find('.js-download-dropdown-menu').toggleClass('active');
    });
  }
}

light.retainState = function() {
  setTimeout(function() {
    if ((userObject.onloadType == 'grid' || userObject.onloadType == 'slideshow') && userObject.imageUrl.indexOf('-photo-') >= 0) {
      var url_comp = userObject.imageUrl.split('-photo-');
      // console.log(url_comp);
      if( typeof url_comp == 'object' && typeof url_comp[1] != 'undefined' ) {
        var indx =  parseInt(url_comp[1]);
        // console.log('indx: '+indx);
        if( indx <= light.data.length - 1) {
          // console.log('done: '+indx);
          light.init(indx);

          setTimeout(function() {
            $('body').addClass('lg-overflow-hidden');
            lightRemoveDiv();
            if(window.innerWidth > 1024){
              if (document.documentElement.scrollHeight > document.documentElement.clientHeight){
                $('body').css({
                  'width': 'calc(100vw - 15px)'
                });
              } else {
                $('body').css({
                  'width': '100%'
                });
              }
            }
          }, 100);
        }
      }
    }
  },1000);
}

light.fotomotoInit = function (argument) {
  if( typeof light.options != 'undefined' && typeof light.options.fotomoto != 'undefined' && light.options.fotomoto === true ) {
    $('.js-buy-icon').unbind('click');
    $('.js-buy-icon').on('click', function() {
      var imageURL, imageName;
      imageURL = $(this).attr('data-fotourl');
      imageName = $(this).attr('data-filename');

      if( typeof imageURL == 'undefined' || typeof imageName == 'undefined' || imageURL == '' || imageName == '') {
        // console.log('Fotomoto invalid inputs :( imageURL: '+imageURL+', imageName: '+imageName);
        return false;
      }
      if ( typeof FOTOMOTO === 'undefined' ) {
        setTimeout( function() {
          FOTOMOTO.API.showWindow(FOTOMOTO.API.PRINT, {
            url: imageURL,
            pickup_filename: imageName
          });
        }, 2000 );
      } else {
          FOTOMOTO.API.showWindow(FOTOMOTO.API.PRINT, {
          url: imageURL,
          pickup_filename: imageName
        });
      }
    });
  }
}

// light.copytoclipboard = function() {
//   $("#copyTargetPhoto").on('click touchstart',function(){
//     copyToClipboard(this);
//   });
// }

light.lightGallery = function() {
  light.initOptions();
  light.config();
  // in case of gallery grid
  light.launch();
  // in case of store
  light.storeLaunch();
  light.retainState();

  // if($(window).innerWidth() >= 1024){
    light.vscrollLaunch();
  // }
  
  //light.copytoclipboard();

  $(light.div).unbind('lgAfterClose');
  $(light.div).on('lgAfterClose',function(event) {
    light.removeUrl();
  });

  $(light.div).unbind('lgSlideItemLoad');
  $(light.div).on('lgSlideItemLoad',function(event) {
    if(typeof ImageRightClickDisable == 'function' ) {
      ImageRightClickDisable();
    }

    setTimeout(function() {
      $('#container_slider').find('.lg-outer').removeClass('justified-gallery');
    }, 100);

  });
  $(light.div).unbind('lgBeforeOpen');
  $(light.div).on('lgBeforeOpen', function(event){
    if( typeof light.fotomotoInit == 'function' )
    light.fotomotoInit();
  })
}

//=============