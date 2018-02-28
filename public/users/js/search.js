$(document).ready(function () {
    window.sr = ScrollReveal();
    search();
})

function search() {
    let template1 = $('#template1').clone();
    let contentContainer = $("#content-container");

    contentContainer.empty();
    contentContainer.append(template1.html());

    datepicker('#departure_date', { minDate: new Date((new Date()).valueOf() + 1000 * 3600 * 24) });
    datepicker('#return_date', { minDate: new Date((new Date()).valueOf() + 1000 * 3600 * 24) });

    rangeSlider();

    $('form').on('submit', function (e) {
        e.preventDefault();

        if (validateForm($('#departure_date'), $('#return_date'))) {

            let budget = $('output').eq(0).val();
            let dDate = new Date($('#departure_date').val()).toISOString();
            let rDate = new Date($('#return_date').val()).toISOString();
            let input = { budget: budget, dDate: dDate, rDate: rDate, removed: [''] }

            postSearch(input, 3, contentContainer)
            contentContainer.empty();
        }
        else {
            alert('Please select the proper date')
        }
    })
}

function sendData(packageHistory) {
    for (let i = 0; i < packageHistory.length; i++) {
        let ticketContainer = $('#template2').clone();
        let card = ticketContainer.contents().find('.card');
        let header = ticketContainer.contents().find('.card-header');
        let img = ticketContainer.contents().find('img');
        let text = ticketContainer.contents().find('.card-text');
        let trip = ticketContainer.contents().find('.trip');
        let footer = ticketContainer.contents().find('.card-footer');

        let { effective, package_price, accommodation, flight } = packageHistory[i];
        let { cityFrom, cityTo, flyFrom, flyTo, price, flightDetails, deep_link } = flight;
        let flight_price = flight.price;
        let property_name = accommodation.property_name;
        let hotel_price = accommodation.price;
        let hotel_address = '';

        for (var prop in accommodation.address) {
            if (typeof (accommodation.address[prop]) != 'undefined')
                hotel_address += `${accommodation.address[prop]}, `;
        }

        let direction = (i % 2 === 0) ? ['rightfade', 'leftfade'] : ['leftfade', 'rightfade'];

        card.eq(0).addClass(direction[0]).removeClass(direction[1]);
        header.eq(0).append(`<h1>${flightDetails[0].cityFrom} - ${flightDetails[0].cityTo}</h1>`).append(`Total Package Price: HKD ${package_price}`);

        img.eq(0).attr('src', `https://images.kiwi.com/airlines/64/${flightDetails[0].airline}.png`);
        img.eq(1).attr('src', `https://images.kiwi.com/airlines/64/${flightDetails[1].airline}.png`);
        text.eq(0).append(`HKD ${flight_price}`)
        text.eq(1).append(`HKD ${hotel_price}`);
        text.eq(2).append(moment(packageHistory[i].departure_date).format('MMMM Do YYYY'));
        text.eq(3).append(`${moment(1000 * flightDetails[0].dTimeUTC).format("HH:mm")}-${moment(1000 * flightDetails[0].aTimeUTC).format("HH:mm")}`);
        text.eq(4).append(moment(packageHistory[i].return_date).format('MMMM Do YYYY'));
        text.eq(5).append(`${moment(1000 * flightDetails[1].dTimeUTC).format("HH:mm")}-${moment(1000 * flightDetails[1].aTimeUTC).format("HH:mm")}`);
        text.eq(6).attr('href', `${deep_link}`);
        text.eq(7).append(` ${property_name}`);
        text.eq(8).append(` ${hotel_address}`);

        trip.eq(0).append(` ${flightDetails[0].flyFrom} (${flightDetails[0].cityFrom}) `);
        trip.eq(1).append(` ${flightDetails[0].flyTo} (${flightDetails[0].cityTo})`);
        trip.eq(2).append(` ${flightDetails[1].flyFrom} (${flightDetails[1].cityFrom}) `);
        trip.eq(3).append(` ${flightDetails[1].flyTo} (${flightDetails[1].cityTo})`);

        footer.eq(0).append(`${effective}`);

        $("#content-container").append(ticketContainer.html());
    }
    fading()
}

function postSearch(input, num, contentContainer) {
    if (num) {
        return $.post('/users/result', input)
            .done(function (data) {
                if (data[1]) {
                    sendData(data[1])
                    console.log(data[1])

                    data[0].forEach(element => {
                        if (input.removed.indexOf(element) < 0)
                            input.removed.push(element)
                    });
                    postSearch(input, num - 1, contentContainer)
                }
            })
            .fail(function (data) {
                console.log("This POST AJAX function will be run if the ajax if failed");
            })
    }
}

function rangeSlider() {
    $('input[type="range"]').on('input', function (e) {
        $('output').eq(0).val(e.currentTarget.value);
    });
}

function validateForm(dDate, rDate) {
    if (dDate.val() == null || dDate.val() == '')
        return false;
    else if (rDate.val() == null || rDate.val() == '')
        return false;
    else if (new Date(rDate.val()) <= new Date(dDate.val()))
        return false;
    else
        return true;
}

function fading() {

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
        duration: 1300,
        delay: 1300,
        origin: 'bottom'
    });

    sr.reveal('.material-icons', {
        duration: 1300,
        delay: 1300,
        origin: 'bottom'
    });

}

