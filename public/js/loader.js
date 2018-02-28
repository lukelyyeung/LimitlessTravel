$(() => {
    $('body').prepend("<div class='fullPage hidden'><div class='loader'></div></div>");

    $('.loader').on('ajaxStart', function (e) {
        $(this).removeClass('hidden').addClass('show');
    });

    $('.loader').on('ajaxComplete', function (e) {
        $(this).removeClass('show').addClass('hidden');
    });
})