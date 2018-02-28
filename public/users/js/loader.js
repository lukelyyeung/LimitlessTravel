$(() => {
    $('body').append("<div class='fullPage hidden'><div class='loader'></div></div>");

    $(document).bind('ajaxStart', function (e) {
        console.log(e);
        $('.fullPage').removeClass('hidden').addClass('show');
    });
    
    $(document).bind('ajaxComplete', function (e) {
        console.log(e);
        $('.fullPage').removeClass('show').addClass('hidden');
    });
    
})