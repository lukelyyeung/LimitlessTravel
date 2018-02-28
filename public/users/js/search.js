$(document).ready(function () {
    // $.get('/users'
    // ).done(function (data) {
    //     constructData(data);
    // }).fail(function (data) {
    //     console.log("This GET AJAX function will be run if the ajax if failed");
    // }).always(function (data) {
    //     console.log("This GET AJAX function runs no matter success or fail.");
    // });

    datepicker('#departure_date');
    datepicker('#return_date');

    rangeSlider();

    $('form').on('submit', function (e) {
        e.preventDefault();


        if (validateForm()) {
            let budget = $('output').eq(0).val();
            let dDate = new Date($('#departure_date').val()).toISOString();
            let rDate = new Date($('#return_date').val()).toISOString();
            let input = { budget: budget, dDate: dDate, rDate: rDate, destination: [''] }

            postSearch(input, 3)
            $('form')[0].reset();
        }
    })
})

function postSearch(input, num) {
    if (num) {
        return $.post('/users/result', input)
            .done(function (data) {
                console.log(data[1])
                if (data[1]) {
                    input.destination.push(data[0])
                    postSearch(input, num - 1)
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

function constructData(data) {
    data.forEach((e) => {
        // Retrieve template and create a clone
        let noteTemplate = $('#note-template').clone();

        noteTemplate.contents().find("h2").html(e.title);
        noteTemplate.contents().find("p").html(e.content);

        // Retrieve the container which will hold all users' info
        let contentContainer = $("#content-container");

        // Append the clone to the DOM 
        contentContainer.append(noteTemplate.html());
    });
}

function validateForm() {
    if ($('#departure_date').val() == null || $('#departure_date').val() == '')
        return false;
    else if ($('#return_date').val() == null || $('#return_date').val() == '')
        return false;
    else
        return true;
}


