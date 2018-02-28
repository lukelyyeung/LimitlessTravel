$(document).ready(function () {
    let template1 = $('#template1').clone();
    let contentContainer = $("#content-container");

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
            $('form')[0].reset();
        }
        else {
            alert('Please select the proper date')
        }
    })
})

function postSearch(input, num, contentContainer) {
    if (num) {
        return $.post('/users/result', input)
            .done(function (data) {
                console.log(data[1])
                if (data[1]) {
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


