$(() => {
    // Initialize animation
    window.sr = ScrollReveal();

    getMyPackages();

    $('.personal-info').on('click', '.current-package', function (e) {
        getMyPackages();
    })

    $("#package-container").on('click', '.delete', (function (e) {
        let yes = confirm('Want to untrack this package?');
        let id = $(this).closest('.frame').attr('id').replace('Package', '');
        if (yes) {
            deletePackage(id)
                .then(() => {
                    $(this).closest('.card-container').remove();
                })
        }
    }));

    $("#package-container").on('click', '.more', (function (e) {
        let id = $(this).closest('.frame').attr('id').replace('Package', '');
        getTodayPrice(id);
    }));

    // Animation
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

                $('#package-container').empty();

                packages.forEach((package, index) => {
                    let packageContainer = $('#template-package-container').clone();
                    let frame = packageContainer.contents().find('.frame');
                    let img = packageContainer.contents().find('.card-img-top');
                    let list = packageContainer.contents().find('li');
                    let track = packageContainer.contents().find('.track');
                    let direction = (index % 2 === 0) ? ['rightfade', 'leftfade'] : ['leftfade', 'rightfade'];
                    frame.eq(0).addClass(direction[0]).removeClass(direction[1])
                        .attr('id', `Package${package.package_id}`);
                    img.eq(0).attr('src', `img/${package.city_to}.jpg`);
                    list.eq(0).append(`<h5>${package.city_from} - ${package.city_to}</h5>`);
                    list.eq(1).append(`<p>Budget: $${package.budget}<p>`);
                    list.eq(2).append(`<p>${new Date(package.day_from).toLocaleDateString()} - ${new Date(package.day_to).toLocaleDateString()}<p>`);
                    track.eq(0).attr('href', `/users/tracking/${package.package_id}`);
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

    //  Generate ticket template
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
                for (let i = 0; i < packageHistory.length; i++) {
                    let ticketContainer = $('#template-ticket-container').clone();
                    let card = ticketContainer.contents().find('.card');
                    let header = ticketContainer.contents().find('.card-header');
                    let img = ticketContainer.contents().find('img');
                    let text = ticketContainer.contents().find('.card-text');
                    let trip = ticketContainer.contents().find('.trip');
                    let footer = ticketContainer.contents().find('.card-footer');
                    let { total_price, flight_price, hotel_price, property_name, address, effect_date, day_from, day_to, departure_details, return_details, deep_link } = packageHistory[i];
                    let hotel_address = '';

                    for (let prop in address) {
                        if (typeof (address[prop]) != 'undefined')
                            hotel_address += `${address[prop]}, `;
                    }

                    header.eq(0).append(`<h1>${departure_details.cityTo}</h1>`).append(`Total Package Price: HKD ${total_price}`);
                    img.eq(0).attr('src', `https://images.kiwi.com/airlines/64/${departure_details.airline}.png`);
                    img.eq(1).attr('src', `https://images.kiwi.com/airlines/64/${return_details.airline}.png`);

                    text.eq(0).append(`HKD ${flight_price}`)
                    text.eq(1).append(`HKD ${hotel_price}`);
                    text.eq(2).append(moment(day_from).format('MMMM Do YYYY'));
                    text.eq(3).append(`${moment(1000 * departure_details.dTimeUTC).format("HH:mm")}-${moment(1000 * departure_details.aTimeUTC).format("HH:mm")}`);
                    text.eq(4).append(moment(day_to).format('MMMM Do YYYY'));
                    text.eq(5).append(`${moment(1000 * return_details.dTimeUTC).format("HH:mm")}-${moment(1000 * return_details.aTimeUTC).format("HH:mm")}`);
                    text.eq(6).attr('href', `${deep_link}`);
                    text.eq(7).append(` ${property_name}`);
                    text.eq(8).append(` ${hotel_address}`);

                    trip.eq(0).append(` ${departure_details.flyFrom} (${departure_details.cityFrom}) `);
                    trip.eq(1).append(` ${departure_details.flyTo} (${departure_details.cityTo})`);
                    trip.eq(2).append(` ${return_details.flyFrom} (${return_details.cityFrom}) `);
                    trip.eq(3).append(` ${return_details.flyTo} (${return_details.cityTo})`);
                    // debugger;
                    footer.eq(0).append(moment(effect_date).format('MMMM Do YYYY'));

                    $("#package-container").append(ticketContainer.html());
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
        return $.ajax({
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