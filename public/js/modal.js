$(document).ready(function() {

  // MODAL
  var modalText = {
    portfolio: {
      title: 'Tracey Made',
      tag: 'PROFESSIONAL PORTFOLIO.',
      detail: 'I built the same portfolio project four times using different frameworks, different databases, and different deployment services. A detailed page is on the way!',
      // link: '#',
      // buttonTitle: 'See the Details',
      // type: 'website'
    },
    showcase: {
      title: 'Boomtown Showcase',
      tag: 'AUGMENTED SHOWCASE EXPERIENCE.',
      detail: "The purpose of this site is to provide attendees of Boomtown Accelerator's Demo Day with information on all the companies in the current cohort. This was a solo project  using JavaScript, HTML, CSS, and Materialize. The link below does not contain real data.",
      buttonTitle: 'View Site',
      link: 'http://smooth-current.surge.sh/',
      type: 'website'
    },
    bfsSite: {
      title: 'Broken Fence Studios Website',
      tag: 'ALBUM DESIGN AND VIDEO PRODUCTION.',
      detail: 'I founded and ran a successful business that offered design services to professional photographers.  Please visit the site and check out Services -> Album Design to get a sense of my design skills.',
      buttonTitle: 'View Site',
      link: 'http://www.brokenfencestudios.com',
      type: 'website'
    },
    epro: {
      title: 'E/Pro Fitness',
      tag: 'FITNESS FOR WOMEN.',
      detail: "Women aren't just men with smaller bodies.  E/Pro is a training and nutrition app designed for active women.  It anaylyzes each woman's menstrual cycle and birth control method to provide a weekly training and nutrition guide.  I worked as part of a 4-person team on this project and was responsible for the D3 data visualization graphs.",
      buttonTitle: 'Demo',
      link: 'https://vimeo.com/256153613',
      type: 'video'
    },
    scheduler: {
      title: 'Boomtown Workshop Scheduler',
      tag: 'MOBILE PUSH NOTIFICATION.',
      detail: 'Boomtown Accelerator needed fast feedback following their mentoring sessions, so they asked our team of four to develop a push notification app for them.  I was responsible for the entire backend, and I collaborated on the data visualization.',
      buttonTitle: 'Demo',
      link: 'https://vimeo.com/256158302',
      type: 'video'
    },
    wes: {
      title: 'Custom Videos',
      tag: 'ALWAYS PERSONAL, ALWAYS EMOTIONAL.',
      detail: 'I make touching, elegant, emotional custom videos for any occasion.  I specialize in weddings, graduations, and memorials, but I can evoke both tears and joy for just about any special event.  You really have to see these in motion and hear the music to get the full experience, so click below, turn up the sound, and enjoy this custom graduation video.',
      link: 'https://vimeo.com/214552238',
      buttonTitle: 'Watch',
      type: 'video'
    }
  };

  $('#gallery .button').on('click', function() {
    fillModal(this.id);
    $('.modal-wrap').addClass('visible');
  });

  $('.close').on('click', function() {
    $('.modal-wrap, #modal .button').removeClass('visible');
  });

  $('.mask').on('click', function() {
    $('.modal-wrap, #modal .button').removeClass('visible');
  });

  var carousel = $('#carousel'),
    slideWidth = 700,
    threshold = slideWidth / 3,
    dragStart,
    dragEnd;

  setDimensions();

  $('#next').click(function() {
    shiftSlide(-1)
  })
  $('#prev').click(function() {
    shiftSlide(1)
  })

  carousel.on('mousedown', function() {
    if (carousel.hasClass('transition'))
      return;
    dragStart = event.pageX;
    $(this).on('mousemove', function() {
      dragEnd = event.pageX;
      $(this).css('transform', 'translateX(' + dragPos() + 'px)');
    });
    $(document).on('mouseup', function() {
      if (dragPos() > threshold) {
        return shiftSlide(1)
      }
      if (dragPos() < -threshold) {
        return shiftSlide(-1)
      }
      shiftSlide(0);
    });
  });

  function setDimensions() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      slideWidth = $(window).innerWidth();
    }
    $('.carousel-wrap, .slide').css('width', slideWidth);
    $('.modal').css('max-width', slideWidth);
    $('#carousel').css('left', slideWidth * -1)
  }

  function dragPos() {
    return dragEnd - dragStart;
  }

  function shiftSlide(direction) {
    if (carousel.hasClass('transition'))
      return;
    dragEnd = dragStart;
    $(document).off('mouseup')
    carousel.off('mousemove').addClass('transition').css('transform', 'translateX(' + (direction * slideWidth) + 'px)');
    setTimeout(function() {
      if (direction === 1) {
        $('.slide:first').before($('.slide:last'));
      } else if (direction === -1) {
        $('.slide:last').after($('.slide:first'));
      }
      carousel.removeClass('transition')
      carousel.css('transform', 'translateX(0px)');
    }, 700)
  }

  function fillModal(id) {
    $('#modal .title').text(modalText[id].title);
    $('#modal .detail').text(modalText[id].detail);
    $('#modal .tag').text(modalText[id].tag);
    if (modalText[id].link) {
      if (modalText[id].type === 'video') {
        if (modalText[id].link)
          $('#modal #url-box').removeClass('visible').addClass('hidden')
        if (modalText[id].link)
          $('#modal #video-box').removeClass('hidden').addClass('visible').parent().attr('href', modalText[id].link)
        if (modalText[id].buttonTitle)
          $('#modal #video-box').text(modalText[id].buttonTitle)

      } else  {
        if (modalText[id].link)
          $('#modal #video-box').removeClass('visible').addClass('hidden')
        if (modalText[id].link)
          $('#modal #url-box').addClass('visible').removeClass('hidden').parent().attr('href', modalText[id].link)
        if (modalText[id].buttonTitle)
          $('#modal #url-box').text(modalText[id].buttonTitle)
      }
    } else {
      $('#modal #video-box').removeClass('visible').addClass('hidden')
      $('#modal #url-box').removeClass('visible').addClass('hidden')
    }

    $.each($('#modal li'), function(index, value) {
      $(this).text(modalText[id].bullets[index]);
    });
    $.each($('#modal .slide'), function(index, value) {
      $(this).css({
        background: "url('../images/" + id + '-' + index + ".png') center center/cover",
        backgroundSize: 'cover'
      });

    });
  }
})
