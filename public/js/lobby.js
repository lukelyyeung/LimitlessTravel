$(() => {

    $.get('/users/data/packages')
        .done((packages) => {
            let packageContainer = $('#template-package-container').clone();
            let frame = packageContainer.contents().find('.frame');
            let img = packageContainer.contents().find('.card-img-top');
            // let btn = packageContainer.contents().find('.btn');
            let list = packageContainer.contents().find('li');
            packages.forEach((package, index) => {
                let direction = (index % 2 === 0) ? ['rightfade', 'leftfade'] : ['leftfade', 'rightfade'];
                frame.eq(0).addClass(direction[0]).removeClass(direction[1])
                    .attr('id', `Package${package.package_id}`);
                img.eq(0).attr('src', `img/${package.city_to}.jpg`);
                //link.eq(0).attr('id', `Package${package.package_id}`);
                list.eq(0).append(`<h5>${package.city_from} - ${package.city_to}</h5>`);
                list.eq(1).append(`<p>Budget: $${package.budget}<p>`);
                list.eq(2).append(`<p>${new Date(package.day_from).toLocaleDateString()} - ${new Date(package.day_to).toLocaleDateString()}<p>`);
                $('#package-container').prepend(packageContainer.html());
            });
            return;
        })
        .fail(err => {
            console.log(err);
        })
        .then(() => {
            window.sr = ScrollReveal();
            fading();
        });

    $("#package-container").on('click', '.more', (function (e) {
        let id = $(this).closest('.frame').attr('id').replace('Package', '');
        $.get(`/users/data/packages/${id}`)
            .done(packageHistory => {
                $('#package-container').empty();
                let packageDetailsContainer = $('#template-package-details-container').clone();
                let img = packageDetailsContainer.contents().find('img');
                let data = packageDetailsContainer.contents().find('p');
                for (let i = 0; i < packageHistory.length; i++) {
                    data.eq(0).html(`HKD${packageHistory[i].flight_price}`);
                    data.eq(1).html(new Date(packageHistory[i].day_from).toLocaleDateString());
                    data.eq(2).html(`${packageHistory[i].city_from} to ${packageHistory[i].city_to}`);
                    img.eq(0).attr('src', `https://images.kiwi.com/airlines/64/${packageHistory[i].departure_airline}.png`);
                    $('#package-container').prepend(packageDetailsContainer.html());
                }

                return;
            })
            .fail(err => {
                console.log(err);
            })
            .then(()=> {
                console.log('HI');
                fading();
            })
    }));

    function fading() {

        // window.sr = ScrollReveal();

        sr.reveal('.personal-info .card', {
            duration: 1000,
            origin: 'left',
            distance: '300px',
            viewFactor: 0.2,
        });

        sr.reveal('.rightfade', {
            duration: 1000,
            origin: 'right',
            distance: '300px',
            viewFactor: 0.2,
        });

        sr.reveal('.leftfade', {
            duration: 1000,
            origin: 'left',
            distance: '300px',
            viewFactor: 0.2,
        });

        sr.reveal('.bottomfade', {
            duration: 1000,
            origin: 'bottom',
            distance: '300px',
            viewFactor: 0.2,
        })

        sr.reveal('.btn', {
            duration: 1500,
            delay: 1500,
            origin: 'bottom'
        });
    }
});


