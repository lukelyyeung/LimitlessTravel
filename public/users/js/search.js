$(document).ready(function () {
    // $.get('/users'
    // ).done(function (data) {
    //     constructData(data);
    // }).fail(function (data) {
    //     console.log("This GET AJAX function will be run if the ajax if failed");
    // }).always(function (data) {
    //     console.log("This GET AJAX function runs no matter success or fail.");
    // });

    $('form').on('submit', function (e) {
        e.preventDefault();
        let budget = $('#formGroupExampleInput').val();
        let dDate = $('#formGroupExampleInput1').val();
        let rDate = $('#formGroupExampleInput2').val();
        let input = { budget: budget, dDate: dDate, rDate: rDate, destination: [''] }

        if (validateForm()) {
            postSearch(input, 3)
            $('form')[0].reset();
        }
    })
})

function postSearch(input, num) {
    if (num) {
        return $.post('/users/result', input)
            .done(function (data) {
                input.destination.push(data[0])
                // console.log(data[1])
                // console.log(input.destination)
                postSearch(input, num - 1)
            })
            .fail(function (data) {
                console.log("This POST AJAX function will be run if the ajax if failed");
            })
            .always(function(data){
                console.log('OK')
            })
    }
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
    if ($('#formGroupExampleInput').val() == null || $('#formGroupExampleInput').val() == '')
        return false;
    else if ($('#formGroupExampleInput1').val() == null || $('#formGroupExampleInput1').val() == '')
        return false;
    else if ($('#formGroupExampleInput2').val() == null || $('#formGroupExampleInput2').val() == '')
        return false;
    else
        return true;
}


