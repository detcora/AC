'use strict';
if(!window.console) window.console = {};
if(!window.console.memory) window.console.memory = function() {};
if(!window.console.debug) window.console.debug = function() {};
if(!window.console.error) window.console.error = function() {};
if(!window.console.info) window.console.info = function() {};
if(!window.console.log) window.console.log = function() {};

// sticky footer
//-----------------------------------------------------------------------------
if(!Modernizr.flexbox) {
  (function() {
    var
      $pageWrapper = $('#page-wrapper'),
      $pageBody = $('#page-body'),
      noFlexboxStickyFooter = function() {
        $pageBody.height('auto');
        if($pageBody.height() + $('#header').outerHeight() + $('#footer').outerHeight() < $(window).height()) {
          $pageBody.height($(window).height() - $('#header').outerHeight() - $('#footer').outerHeight());
        } else {
          $pageWrapper.height('auto');
        }
      };
    $(window).on('load resize', noFlexboxStickyFooter);
  })();
}
if(ieDetector.ieVersion == 10 || ieDetector.ieVersion == 11) {
  (function(){
    var
      $pageWrapper = $('#page-wrapper'),
      $pageBody = $('#page-body'),
      ieFlexboxFix = function() {
        if($pageBody.addClass('flex-none').height() + $('#header').outerHeight() + $('#footer').outerHeight() < $(window).height()) {
          $pageWrapper.height($(window).height());
          $pageBody.removeClass('flex-none');
        } else {
          $pageWrapper.height('auto');
        }
      };
    ieFlexboxFix();
    $(window).on('load resize', ieFlexboxFix);
  })();
}

$(function() {

// placeholder
//-----------------------------------------------------------------------------
  $('input[placeholder], textarea[placeholder]').placeholder();

// styled select chosen
//-----------------------------------------------------------------------------
  $('.styled-select').chosen({
    width: "161px",
    disable_search: true
  });
  $('.filter-select').chosen({
    width: "200px",
    disable_search: true,
    inherit_select_classes: true
  });


// masonry
//-----------------------------------------------------------------------------


  function refreshMsnry() {
    $('.catalog-item').each(function () {
      var $this = $(this),
        position = $this.position();
      $this.removeClass('left-item right-item');
      position.left === 0  ? $this.addClass('left-item') : $this.addClass('right-item');
    });
  }

  if($('.catalog-container').length) {
    var masonryContainer = document.querySelector('.catalog-container');
    var msnry = new Masonry( masonryContainer, {
      itemSelector: '.catalog-item'
    });

    msnry.on( 'layoutComplete', refreshMsnry);

    msnry.layout();
  }



  /*$('.btn-load-more').on('click', function (evt) {
    evt.preventDefault();
    if($('.hidden-item').is(':visible')) {
      $('.hidden-item').hide();
    } else {
      $('.hidden-item').show();
    }
    refreshMsnry();
    msnry.layout();
  });*/

// slick
//-----------------------------------------------------------------------------
  $('.main-slider').slick({
    dots: true,
    infinite: true,
    speed: 300,
    centerPadding: '360px',
    slidesToShow: 1,
    centerMode: true,
    arrows: false
  });

  $('.btn-prev').on('click', function (evt) {
    evt.preventDefault();
    $('.main-slider').slick('slickPrev');
  });

  $('.btn-next').on('click', function (evt) {
    evt.preventDefault();
    $('.main-slider').slick('slickNext');
  });


// header tabs nav
//-----------------------------------------------------------------------------

  $('.catalog-nav > ul > li > a').on('click', function (evt) {
    evt.preventDefault();
    var $this = $(this);
    if(! $this.hasClass('active')) {
      $this.closest('li').addClass('active').siblings().removeClass('active');
    }
  });


// show login form
//-----------------------------------------------------------------------------


  $('.show-sign-form').on('click', function (evt) {
    evt.preventDefault();
    var $this = $(this);
    if($this.hasClass('active')) {
      $this.removeClass('active');
      $('.login-form').stop(true, true).fadeOut();
    } else {
      $this.addClass('active');
      $('.login-form').stop(true, true).fadeIn(function () {
        $(document).on('click.namespace', function(e) {
          if($(e.target).closest('.login-form').length == 0) {
            $('.login-form').fadeOut();
            $this.removeClass('active');
            $(document).off('click.namespace');
          }
        });
      });
    }
  });

// accordion catalog
//-----------------------------------------------------------------------------


  $('.accordion-item .title-block').on('click', function () {
    var $this = $(this),
        $contentAccordion = $this.closest('.accordion-item').find('.content-block'),
        $siblings = $this.closest('.accordion-item').siblings();

    if($this.hasClass('active')) {
      $this.removeClass('active');
      $contentAccordion.slideUp();
    } else {
      $siblings.find('.content-block').slideUp();
      $siblings.find('.title-block').removeClass('active');
      $this.addClass('active');
      $contentAccordion.slideDown();
    }

  });

// faq accordion
//-----------------------------------------------------------------------------

  $('.faq-accordion .title-block').on('click', function (evt) {

    var $this = $(this),
        $thisItem = $this.closest('.faq-item');

    if($this.hasClass('active')) {
      $this.removeClass('active');
      $this.siblings('.content-block').slideUp();
      $this.parent('.faq-item').removeClass('active');
    } else {
      $this.addClass('active');
      $this.siblings('.content-block').slideDown();
      $thisItem.siblings().removeClass('active').find('.content-block').slideUp();
      $thisItem.siblings().find('.title-block').removeClass('active');
      $this.parent('.faq-item').addClass('active');
    }

  });


});
