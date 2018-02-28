$(() => {
    window.sr = ScrollReveal();

    getMyPackages();

    $('.personal-info').on('click', '.current-package', function (e) {
        getMyPackages();
    })

    $("#package-container").on('click', '.delete', (function (e) {
        let id = $(this).closest('.frame').attr('id').replace('Package', '');
        // deletePackage(id)
        // .then(() => {
            $(this).closest('.card-container').remove();
        // })
    }));

    $("#package-container").on('click', '.more', (function (e) {
        let id = $(this).closest('.frame').attr('id').replace('Package', '');
        getTodayPrice(id);
    }));

    function fading() {

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

        // sr.reveal('.btn', {
        //     duration: 1500,
        //     delay: 1500,
        //     origin: 'bottom'
        // });
    }

    function getMyPackages() {

        $.get('/users/data/packages')
            .done((packages) => {
                let packageContainer = $('#template-package-container').clone();
                let frame = packageContainer.contents().find('.frame');
                let img = packageContainer.contents().find('.card-img-top');
                let list = packageContainer.contents().find('li');
                
                $('#package-container').empty();
                
                packages.forEach((package, index) => {
                    let direction = (index % 2 === 0) ? ['rightfade', 'leftfade'] : ['leftfade', 'rightfade'];
                    frame.eq(0).addClass(direction[0]).removeClass(direction[1])
                        .attr('id', `Package${package.package_id}`);
                    img.eq(0).attr('src', `img/${package.city_to}.jpg`);
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
                fading();
            });
    }

    function getTodayPrice(id) {

        $.ajax({
            type: 'PUT',
            url: `/users/data/packages/${id}`,
            dataType: "text",
            data: { operater: '=' }
        })
            .done((packageHistory) => {
                packageHistory = JSON.parse(packageHistory);
                $('#package-container').empty();
                let packageDetailsContainer = $('#template-package-details-container').clone();
                let img = packageDetailsContainer.contents().find('img');
                let data = packageDetailsContainer.contents().find('p');
                for (let i = 0; i < packageHistory.length; i++) {
                    data.eq(0).html(`HKD${packageHistory[i].flight_price}`);
                    data.eq(1).html(new Date(packageHistory[i].effect_date).toLocaleDateString());
                    data.eq(2).html(`${packageHistory[i].city_from} to ${packageHistory[i].city_to}`);
                    img.eq(0).attr('src', `https://images.kiwi.com/airlines/64/${packageHistory[i].departure_airline}.png`);
                    $('#package-container').prepend(packageDetailsContainer.html());
                }

                return;
            })
            .fail(err => {
                console.log(err);
            })
            .then(() => {
                fading();
            })
    }

    function deletePackage(id) {
        $.ajax({
            type: 'DELETE',
            url: `/users/data/packages/${id}`
        })
            .done(() => {
                return;
            })
            .fail((err) => {
                console.log(err);
            })
    }
});