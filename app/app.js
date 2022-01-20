// God save the Dev

'use strict';

if (process.env.NODE_ENV !== 'production') {
  require('./assets/templates/layouts/index.html');
}

// Depends
var $ = require('jquery');
require('bootstrap-sass');

// Modules
var Forms = require('_modules/forms');
var Slider = require('_modules/slider');
var Popup = require('_modules/popup');
var LightGallery = require('_modules/lightgallery');
require('../node_modules/jquery.cookie/jquery.cookie');
import PerfectScrollbar from 'perfect-scrollbar';

// Stylesheet entrypoint
require('_stylesheets/app.scss');

// Are you ready?
$(function() {
  new Forms();
  new Popup();
  new LightGallery();
  new Slider();

  setTimeout(function() {
    $('body').trigger('scroll');
  }, 100);

  setTimeout(function() {
    $('body').trigger('resize');
    $('.slick-slider').slick('setPosition');
  }, 200);

  // fixed header
  var header = $('.header'),
    btn = $('.mobile-menu__btn'),
    scrollPrev = 0;

  $(window).scroll(function() {
    var scrolled = $(window).scrollTop();
    if (scrolled > 0) {
      header.addClass('fixed');
      btn.addClass('filled');
    } else {
      header.removeClass('fixed');
      btn.removeClass('filled');
    }
    scrollPrev = scrolled;
  });

  // navigation

  $('.nav-item').on('click', function() {
    $(this).addClass('active').closest('li').siblings().find('a').removeClass('active');
  });

  $(document).on('click', 'a[href^="#"]', function(e) {
    var id = $(this).attr('href');
    var $id = $(id);
    if ($id.length === 0) {
      return;
    }
    e.preventDefault();
    if ($(window).width() >= 768) {
      var pos = $id.offset().top - 87;
    }
    else {
      var pos = $id.offset().top - 47;
    }
    $('body, html').animate({ scrollTop: pos }, 500);
  });
  $(document).on('click', 'a[href^="#"]', function(e) {
    e.preventDefault();
  });

  $(window).scroll(function() {
    var $sections = $('.section');
    $sections.each(function(i, el) {
      if ($(window).width() >= 768) {
        var top = $(el).offset().top - 88;
      }
      else {
        var top = $(el).offset().top - 48;
      }
      var bottom = top + $(el).height();
      var scroll = $(window).scrollTop();
      var id = $(el).attr('id');
      if (scroll > top && scroll < bottom) {
        $('a.active').removeClass('active');
        $('a[href="#' + id + '"]').addClass('active');
      }
    });
  });

  // html margin fix

  $.magnificPopup.defaults.callbacks = {
    open: function() {
      $('html').addClass('popup-opened');
    },
    close: function() {
      $('html').removeClass('popup-opened');
    }
  };

  // gallery

  $('.reviews-slider').lightGallery({
    selector: '.slick-slide:not(.slick-cloned) .light-item'
  });

  // init lightgallery on window resize

  $(window).resize(function() {
    $('.lightgallery').lightGallery();
  });

  // slider counter

  $('.counter-slider').each(function() {
    var $slider = $(this);

    var currentSlide;
    var slidesCount;
    var sliderCounter = $slider.closest('.counter-slider__wrapper').find('.slider-counter');
    $(sliderCounter).text('1' + '/' + $slider.slick('getSlick').slideCount);

    var updateSliderCounter = function(slick, currentIndex) {
      currentSlide = slick.slickCurrentSlide() + 1;
      slidesCount = $slider.slick('getSlick').slideCount;
      $(sliderCounter).text(currentSlide + '/' + slidesCount);
    };

    $slider.on('init', function(event, slick, slidesCount) {
      updateSliderCounter(slick, slidesCount);
    });

    $slider.on('afterChange', function(event, slick, currentSlide) {
      updateSliderCounter(slick, currentSlide);
    });
  });

  /*$('.reviews-slider').each(function() {
    var $slider = $(this);

    var currentSlide;
    var slidesCount;
    var sliderCounter = $slider.closest('.reviews-slider__main-wrap').find('.slider-counter');
    var total = $(this).find('.slick-slide:not(.slick-cloned)').find('.light-item').length;
    var current = $(this).find('.slick-current').find('.light-item').length;
    $(sliderCounter).text('8' + '/' + total);

    var updateSliderCounter = function(slick, currentIndex) {
      var currentTotal = $slider.find('.slick-current').find('.light-item').length;
      //console.log(currentTotal, currentIndex);
      currentSlide = (slick.slickCurrentSlide() + 1) * current + currentTotal - 8;
      slidesCount = total;
      $(sliderCounter).text(currentSlide + '/' + slidesCount);
    };

    $slider.on('init', function(event, slick, slidesCount) {
      updateSliderCounter(slick, slidesCount);
    });

    $slider.on('afterChange', function(event, slick, currentSlide) {
      updateSliderCounter(slick, currentSlide);
    });
  });*/

  // faq

  $('.faq-header').click(function() {
    $(this).next('.faq-body').slideToggle().closest('.faq-item').toggleClass('active').siblings().removeClass('active').find('.faq-body').slideUp();
  });

  // mobile menu

  $('.mobile-menu__btn').click(function(e) {
    e.preventDefault();
    $('.mobile-menu__wrapper').addClass('active');
    return false;
  });

  $('.mobile-menu__close').click(function() {
    $('.mobile-menu__wrapper').removeClass('active');
  });

  $(document).click(function() {
    $('.mobile-menu__wrapper').removeClass('active');
  });

  $(document).on('click', '.mobile-menu__btn', function(e) {
    e.stopPropagation();
  });

  $(document).on('click', '.mobile-menu__wrapper', function(e) {
    e.stopPropagation();
  });

  // comeback

  $('.comeback-trigger').mouseover(function() {
    if (typeof $.cookie('exit') === 'undefined') {
      $.magnificPopup.open(
        {
          items: {
            src: '#comeback'
          },
          type: 'inline'
        },
        0
      );
      $.cookie('exit', 1, { expires: 1 });
    }
  });

  // widget

  $('.widget').click(function(e) {
    e.preventDefault();
    $(this).toggleClass('active');
  });

  $(document).click(function() {
    $('.widget').removeClass('active');
  });

  $(document).on('click', '.widget', function(e) {
    e.stopPropagation();
  });

  $(document).on('click', '.widget-list', function(e) {
    e.stopPropagation();
  });

  // header phones

  $('.header-phone').click(function(e) {
    e.preventDefault();
    $('.header-phones').toggleClass('active');
  });

  $(document).click(function() {
    $('.header-phones').removeClass('active');
  });

  $(document).on('click', '.header-phones', function(e) {
    e.stopPropagation();
  });

  $(document).on('click', '.widget-list', function(e) {
    e.stopPropagation();
  });

  // scroll

  $('.scroll-wrapper').each(function() {
    const ps1 = new PerfectScrollbar($(this)[0], {
      wheelSpeed: 1,
      wheelPropagation: false
    });
    ps1.update();
    $(window).resize(function() {
      ps1.update();
    });
  });

  // lazy load
  var lazyload = function() {
    var scroll = $(window).scrollTop() + $(window).height() * 3;

    $('.lazy').each(function() {
      var $this = $(this);
      if ($this.offset().top < scroll) {
        $this.attr('src', $(this).data('original'));
      }
    });
    $('.lazy-web').each(function() {
      var $this = $(this);
      if ($this.offset().top < scroll) {
        $this.attr('srcset', $(this).data('original'));
      }
    });
  };
  $(window).scroll(lazyload);

  $('.ajax_form').on('sent', function() {
    ga(ga.getAll()[0].get('name') + '.send', 'event', { eventCategory: 'form', eventAction: 'submit', eventValue: 1 });
  });
});
