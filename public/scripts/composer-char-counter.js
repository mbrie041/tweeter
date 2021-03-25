// $(document).click(function( event ) {
//   console.log( "clicked: " + event.target );
// });

// class.addEventListener('blur', (event) => {
//   event.target.style.background = 'pink';
// }, true);

// ${`textBox`}.on{}
$(document).ready(function () {

  // $(document).click(function (event) {
  //   console.log("clicked: " + event.target);
  // });

  // $('textarea').blur(function() {
  //   console.log('blur');
  //   })

  // $('textarea').keydown(function () {
  //   console.log('keydown');
  // })

  // $('textarea').keyup(function() {
  //   console.log('keyup');
  //   })

  // $('textarea').keypress(function() {
  //   console.log('keypress');
  //   })

  // $('textarea').change(function() {
  //   console.log('change');
  //   })

  $('textarea').on('input', function () {
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