function main() {
  $('.firstMenuItemText').addClass('active');
  $('.inactive').on('click', function(){
    $('.inactive').removeClass('active');
    $(this).toggleClass('active');
  })
}

$(document).ready(main);
