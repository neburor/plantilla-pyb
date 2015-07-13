$(document).ready(function($){

// append  back to top link top body
$("body").append("<p id='back-top'><a href=''><span id='button'>top</span></a></p>");
$("#back-top").hide();
$(function () {
$(window).scroll(function () {
if ($(this).scrollTop() > 100) {
$('#back-top').fadeIn();
} else {
$('#back-top').fadeOut();
}
});

// scroll body to 0px on click
$('#back-top a, #back-to-top').click(function () {
$('body,html').stop().animate({
scrollTop: 0
}, 800);
return false;
});

});

// scroll animate
$('a[href^="#"].animatescroll').on('click',function (e) {
        e.preventDefault();
        var target = this.hash,
        $target = $(target);
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top
        }, 900, 'swing', function () {
            window.location.hash = target;
        });
    });

$('#accordion').on('shown.bs.collapse', function () {
  $('.collapse.in').prev().css( "color", "#f1f3fd" );
  $('.collapse.in').prev().find("a i").toggleClass('fa-plus-square fa-minus-square');
})
$('#accordion').on('hide.bs.collapse', function () {
	$('.collapse.in').prev().css( "color", "#999" );
  	$('.collapse.in').prev().find("a i").toggleClass('fa-minus-square fa-plus-square');
})
//Tracking events
$('.track-btn').on('click', function() {
  label = $(this).attr('label');
  type = $(this).attr('type');
  ga('send', 'event', 'Click', type, label);
});

$('.track-enl').on('click', function() {
	var label = $(this).text();
  ga('send', 'event', 'Click', 'btn-link', label);
});
$('.btn-social').on('click', function() {
	sharetext = $(this).attr('sharetext');
  sharetype = $(this).attr('sharetype');
  ga('send', 'event', 'Shares', sharetype, sharetext);
});

$('.box.nav-box.wizard ul li').on('click', function() {
	var label = $(this).text();
  ga('send', 'event', 'Lista nombres', 'Click Menu', label);
});
$('.box.nav-box.wizard .nav-body .btn-name').on('click', function() {
	var label = $(this).text();
  ga('send', 'event', 'Lista nombres', 'Click Nombre', label);
});
$('.btn-like').click( function() {
  
  liketext = $(this).attr('liketext');
  likeid = $(this).attr('likeid');
  liketype = $(this).attr('liketype');
  var btncontrol = $(this).parent().prev();
  var formData = new FormData();
  formData.append("likeid", likeid);
  formData.append("liketype", liketype);
     $.ajax({
           type: "POST",
           url: "../js/addLIKES.php",
           data: formData,// Adjuntar los campos del formulario enviado.
           cache: false,
           contentType: false,
           processData: false,
           success: function()
           {   
               btncontrol.empty().html('<i class="fa fa-check"></i>');// Si se envio correctamente.
               btncontrol.next().children().attr('disabled','disabled');
               ga('send', 'event', 'Likes', liketype, liketext);
           },
           beforeSend: function() 
           {   
              btncontrol.empty().html('<i class="fa fa-cog fa-spin"></i>');// Mientras se envia.
           },
            error: function()
           {  btncontrol.empty().html('<i class="fa fa-times"></i>');// Si no se pudo enviar.
           }
         });
});
$('.btn-like1').click( function() {
  
  liketext = $(this).attr('liketext');
  likeid = $(this).attr('likeid');
  liketype = $(this).attr('liketype');
  if(liketype=="encuestas"){
    var parent = $(this).parent().parent().parent();
    var line = parent.find('.line');
    var btn = parent.find('.btn-like1');
  $(line).each(function(){
      width = $(this).attr("data-width");
    $(this).width(width+"%");
  });
  $(btn).each(function() {
    $(this).attr('disabled','disabled');
  });

  }
  var btncontrol = $(this);
  var formData = new FormData();
  formData.append("likeid", likeid);
  formData.append("liketype", liketype);
     $.ajax({
           type: "POST",
           url: "../js/addLIKES.php",
           data: formData,// Adjuntar los campos del formulario enviado.
           cache: false,
           contentType: false,
           processData: false,
           success: function()
           {   
               btncontrol.empty().html('<i class="fa fa-check"></i> <i class="fa fa-thumbs-up"></i>');// Si se envio correctamente.
               btncontrol.attr('disabled','disabled');
               ga('send', 'event', 'Likes', liketype, liketext);
           },
           beforeSend: function() 
           {   
              btncontrol.empty().html('<i class="fa fa-cog fa-spin"></i>');// Mientras se envia.
           },
            error: function()
           {  btncontrol.empty().html('<i class="fa fa-times"></i>');// Si no se pudo enviar.
           }
         });

});

$('.sidebar').affix({
  offset: {
    top: 1050,
    bottom: function () {
      return (this.bottom = $('.footer').outerHeight(true))
    }
  }
})

$(".btn-poll-show").on("click", function(){
  var parent = $(this).parent().parent();
  var line = parent.find('.line');
  $(line).each(function(){
    width = $(this).attr("data-width");
    $(this).width(width+"%");
  });
});
});
