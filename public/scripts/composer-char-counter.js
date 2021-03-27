$(document).ready(function () { //function to read input values and count inputs

  $('textarea').on('input', function () {
    $(".isa_error_none").slideUp("slow"); //restarts the css error messages on typing
    $(".isa_error_long").slideUp("slow");

    let counterText = 140 - ((this).value).length;
    let counterLocation =  $(this).parent().parent().find('.counter');


    counterLocation.text(counterText);

    if (counterText >= 0) {
      counterLocation.removeClass('colorCounter'); //if value is less than 140, displays regular counter
    } else {
      counterLocation.addClass('colorCounter'); //if value is greater than 140, displays red counter
    }
  });























});