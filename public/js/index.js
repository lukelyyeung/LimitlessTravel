$(function () {
    // Smooth Scrolling
    $('a[href*="#"]:not([href="#"])').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 1000);
                return false;
            }
        }
    });

    $('.test').click(() => {
        $.get('/users/1/packages', packages => {
            //     packages.forEach(package => {
            //         console.log(`The origin is ${package.city_from}.`);
            //         console.log(`The destination is ${package.city_to}.`);
            //         console.log(`The journey is from ${new Date(package.day_from).toLocaleDateString()} to ${new Date(package.day_to).toLocaleDateString()}.`);
            //         console.log();
            // })
            console.log(packages);
            let usersInfoContainer = $('#template-data-container').clone();
            let userInfo = usersInfoContainer.contents().find('p');
            $('#package-data').empty();
            packages.forEach(package => {
                userInfo.eq(0).html(package.city_from).css('color', 'black');
                userInfo.eq(1).html(package.city_to).css('color', 'black');
                userInfo.eq(2).html(`From ${new Date(package.day_from).toLocaleDateString()} to ${new Date(package.day_to).toLocaleDateString()}.`).css('color', 'black');
                $('#package-data').append(usersInfoContainer.html());
            });
        })
    })
});