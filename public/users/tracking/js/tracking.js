$(() => {
    let id = $(location).attr('href').match(/(?!\/users\/tracking)[0-9]+/g).pop();
    let chart;


    $.ajax({
        type: 'PUT',
        url: `/users/data/packages/${id}`,
        dataType: "text",
        data: { operater: '<' }
    })
        .done((packageHistory) => {
            packageHistory = JSON.parse(packageHistory);
            let result = packageHistory.reduce((result, package) => {
                if (!result[package.effect_date] || result[package.effect_date].total_price >= package.total_price) {
                    result[package.effect_date] = package;
                }
                return result;

            }, {});

            $('.chart-title').eq(0).html(`${packageHistory[0].city_from} - ${packageHistory[0].city_to}`);
            $('.chart-title').eq(1).html(`${new Date(packageHistory[0].day_from).toLocaleDateString()} - ${new Date(packageHistory[0].day_to).toLocaleDateString()}`);

            let labels = [];
            let series = [];
            for (let element in result) {
                labels.push(new Date(result[element].effect_date).toLocaleDateString());
                series.push({ meta: result[element].departure_airline_name, value: result[element].total_price });
            }

            chart = new Chartist.Line('.ct-chart', {
                labels: labels,
                series: [series]
            }, {
                    showArea: true,
                    chartPadding: {
                        top: 120,
                        right: 0,
                        bottom: 0,
                        left: 50
                    },
                    showArea: true,
                    axisY: {
                        onlyInteger: true
                    },
                    plugins: [
                        Chartist.plugins.tooltip(),
                        Chartist.plugins.ctThreshold({
                            threshold: series.reduce((result, element) => {
                                return result + element.value;
                            }, 0) / series.length
                        }),
                        Chartist.plugins.ctAxisTitle({
                            axisX: {
                                axisTitle: 'Date',
                                axisClass: 'ct-axis-title',
                                offset: {
                                    x: 0,
                                    y: 50
                                },
                                textAnchor: 'middle'
                            },
                            axisY: {
                                axisTitle: 'HKD',
                                axisClass: 'ct-axis-title',
                                offset: {
                                    x: 0,
                                    y: -20
                                },
                                textAnchor: 'middle',
                                flipTitle: false
                            }
                        })
                    ]
                });
            return;

        }).done(() => {
            window.sr = ScrollReveal();
            fading();
        }).fail(err => {
            console.log(err);
        });

    function fading() {

        sr.reveal('.personal-info .card', {
            duration: 1000,
            origin: 'left',
            distance: '300px',
            viewFactor: 0.2,
        });
        
        sr.reveal('.right', {
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
    }
});