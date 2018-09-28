$(document).ready(function () {
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyAicv50o9XdooA0mA4DI0hRPLuMnlJyRws",
        authDomain: "train-activity-49b28.firebaseapp.com",
        databaseURL: "https://train-activity-49b28.firebaseio.com",
        projectId: "train-activity-49b28",
        storageBucket: "train-activity-49b28.appspot.com",
        messagingSenderId: "52372351647"
    };

    firebase.initializeApp(config);

    // reference to the database service
    var database = firebase.database();

    // on click event associated with added train information
    $("#add-train").on("click", function (event) {
        // prevent form from trying to submit/refresh the page
        event.preventDefault();

        var train = {
            name: '',
            destination: '',
            frequency: '',
            firstTrain: '',
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        };

        // Capture User Inputs and store them into variables
        train.name = $("#train-time").val().trim();
        train.destination = $("#destination").val().trim();
        train.frequency = $("#frequency").val().trim();
        train.firstTrain = $("#time").val().trim();

        database.ref().push(train);

        $("#train-time").val("");
        $("#destination").val("");
        $("#frequency").val("");
        $("#time").val("");

    });

    database.ref().on("child_added", function (snapshot, prevChildKey) {

        var newTrain = snapshot.val();

        var tableRow = $('<tr>');
        var tdName = $('<td>').text(newTrain.name);
        var tdDestination = $('<td>').text(newTrain.destination);


        var frequency = newTrain.frequency;
        var firstTrain = newTrain.firstTrain;

        var currentTime = moment();

        // subtracts the first train time back a year to ensure it's before current time.
        var firstTrainConverted = moment(firstTrain, "hh:mm").subtract("1, years");
        // the time difference between current time and the first train
        var difference = currentTime.diff(moment(firstTrainConverted), "minutes");
        var remainder = difference % frequency;
        var minUntilTrain = frequency - remainder;
        var nextTrain = currentTime.add(minUntilTrain, "minutes").format("hh:mm a");

        var tdNextArrival = $('<td>').text(nextTrain);
        var tdMinutes = $('<td>').text(minUntilTrain);

        var tdFrequency = $('<td>').text(frequency);

        tableRow.append(tdName, tdDestination, tdFrequency, tdNextArrival, tdMinutes);
        $('#tableData').append(tableRow);

    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });

});