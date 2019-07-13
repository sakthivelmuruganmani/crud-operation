$(document).ready(function() {

    $.get('http://localhost:4501/',
        function(data) {
            data = JSON.parse(data);

            var tr;
            for (var i = 0; i < data.length; i++) {
                tr = $('<tr/>');
                tr.append("<td>" + data[i].id + "</td>")
                tr.append("<td>" + data[i].name + "</td>");
                tr.append("<td>" + data[i].age + "</td>");
                tr.append("<td>" + data[i].ph + "</td>");

                $('table').append(tr);

            }
        });

    $("table").on('click', 'tr', function() {


        temp = $(this).find('td')
        $("#id").val($(temp[0]).text())
        $("#name").val($(temp[1]).text())
        $("#age").val($(temp[2]).text())
        $("#ph").val($(temp[3]).text())

    })



    $('#submit').on('click', function(event) {
        data = {
            id: $('#id').val(),
            name: $('#name').val(),
            age: $('#age').val(),
            ph: $('#ph').val()
        }
        js = JSON.stringify(data)

        $.post("http://localhost:4501/create", js, function(data) {
            console.log("success", data);
        })
    })

    $("#update").on('click', function(event) {
        data = {
            id: $("#id").val(),
            name: $('#name').val(),
            age: $('#age').val(),
            ph: $('#ph').val()
        }
        js = JSON.stringify(data)
        console.log(js);
        //JSON.parse(js, "\n")
        //jsobj = JSON.parse(js, "\n")
        $.post("http://localhost:4501/update", js, function(data) {
            console.log("success", data);
        })
    })

    $("#delete").on('click', function(event) {
        data = {
            id: $("#id").val(),
            name: $('#name').val(),
            age: $('#age').val(),
            ph: $('#ph').val()
        }

        js = JSON.stringify(data)
        console.log(js);

        $.post("http://localhost:4501/delete", js, function(data) {
            alert("success", data);
        })
    })



})