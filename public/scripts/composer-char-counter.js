// $(document).click(function( event ) {
//   console.log( "clicked: " + event.target );
// });

// class.addEventListener('blur', (event) => {
//   event.target.style.background = 'pink';
// }, true);

// ${`textBox`}.on{}
$(document).ready(function () {

  $('textarea').on('input', function () {
    $(".isa_error_none").slideUp("slow");
    $(".isa_error_long").slideUp("slow");
    let counterText = 140 - ((this).value).length;
    let counterLocation =  $(this).parent().parent().find('.counter');

    counterLocation.text(counterText);

    if (counterText >= 0) {
      counterLocation.removeClass('colorCounter');
    } else {
      counterLocation.addClass('colorCounter')
    }
  })























});