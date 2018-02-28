$(() => {
    $('body').prepend("<div class='fullPage hidden'><div class='loader'></div></div>");

    $(window).on('ajaxStart', function (e) {
        $('.loader').removeClass('hidden').addClass('show');
    });

    $(window).on('ajaxComplete', function (e) {
        $('.loader').removeClass('show').addClass('hidden');
    });
    
})