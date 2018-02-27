$(() => {

    $.get('/users/data/1/packages').then((packages) => {
        let packageContainer = $('#template-package-container').clone();
        let frame = packageContainer.contents().find('.frame');
        let img = packageContainer.contents().find('.card-img-top');
        let title = packageContainer.contents().find('.card-title');
        let icons = packageContainer.contents().find('.material-icons');
        let list = packageContainer.contents().find('li');
        let link = packageContainer.contents().find('.btn');
        // $('#package-container').empty();
        // debugger;
        console.log(packages);
        packages.forEach((package, index) => {
            let direction = (index % 2 === 0) ? ['rightfade', 'leftfade'] : ['leftfade', 'rightfade'];
            frame.eq(0).addClass(direction[0]).removeClass(direction[1]);
            img.eq(0).attr('src', `img/${package.city_to}.jpg`);
            title.eq(0).html(`<h5>${package.city_from} - ${package.city_to}</h5>`);
            title.eq(0).prepend(icons[0]);
            list.eq(0).html(`<p>Budget: $${package.budget}<p>`);
            list.eq(1).html(`<p>${new Date(package.day_from).toLocaleDateString()} to ${new Date(package.day_to).toLocaleDateString()}<p>`);
            list.eq(0).prepend(icons[1]);
            list.eq(1).prepend(icons[2]);
            link.eq(0).attr('id', `Package${package.package_id}`);
            $('#package-container').prepend(packageContainer.html());
        });
        return;
    })
    .then(() => {
        window.sr = ScrollReveal();
        
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
        return;
        
    }).then(() => {
        $(".card .more").click(function (e) {
            console.log(e);
                let id = $(this).attr('id').replace('Package', '');
                $.get(`/users/1/packages/${id}`)
                    .then(packageHistory => {
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
                    });
            });
        })

});

function getUserPackage() {
    $.get('').then((packages) => {
        let packageContainer = $('#template-package-container').clone();
        let frame = packageContainer.contents().find('.frame');
        let img = packageContainer.contents().find('.card-img-top');
        let title = packageContainer.contents().find('.card-title');
        let icons = packageContainer.contents().find('.material-icons');
        let list = packageContainer.contents().find('li');
        let link = packageContainer.contents().find('.btn');
        $('#package-container').empty();
        packages.forEach((package, index) => {
            let direction = (index % 2 === 0) ? ['rightfade', 'leftfade'] : ['leftfade', 'rightfade'];
            frame.eq(0).addClass(direction[0]).removeClass(direction[1]);
            img.eq(0).attr('src', `img/${package.city_to}.jpg`);
            title.eq(0).html(`<h5>${package.city_from} - ${package.city_to}</h5>`);
            title.eq(0).prepend(icons[0]);
            list.eq(0).html(`<p>Budget: $${package.budget}<p>`);
            list.eq(1).html(`<p>${new Date(package.day_from).toLocaleDateString()} to ${new Date(package.day_to).toLocaleDateString()}<p>`);
            list.eq(0).prepend(icons[1]);
            list.eq(1).prepend(icons[2]);
            link.eq(0).attr('id', `Package${package.package_id}`);
            $('#package-container').prepend(packageContainer.html());
        });
        return;
    })
}
