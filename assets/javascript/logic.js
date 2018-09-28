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

// Get a reference to the database service
var database = firebase.database();

var trainNumber = 0;

// On click event associated with the add train information
$("#add-train").on("click", function (event) {
    // prevent form from trying to submit/refresh the page
    event.preventDefault();

    var trainScheduler = {
        name: '',
        destination: '',
        time: '',
        frequency: '',
        minutes: '',
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    };

    trainNumber++;

    // Capture User Inputs and store them into variables
    trainScheduler.name = $("#train-time").val().trim();
    trainScheduler.destination = $("#destination").val().trim();
    trainScheduler.time = $("#time").val().trim();
    trainScheduler.frequency = $("#frequency").val().trim();
    // trainScheduler.minutes = $("#minutes-away-display").val().trim();

    var newRow = $("<tr>");

    var newTrainRow = $("<td class='name-display'>" + trainNumber).text(trainScheduler.name);
    var newDestinationRow = $("<td class='destination-display'>" + trainNumber).text(trainScheduler.destination);
    var newTimeRow = $("<td class='train-time-display'>" + trainNumber).text(trainScheduler.time);
    var newFrequencyRow = $("<td class='frequency-display'>" + trainNumber).text(trainScheduler.frequency);
    // var newMinutesAwayRow = $("<td class='minutes-away-display'>").text(trainScheduler.minutes);

    newRow.append(newTrainRow, newDestinationRow, newTimeRow, newFrequencyRow);

    $("tbody").append(newRow);

    database.ref().push(trainScheduler);

});

// Firebase is always watching for changes to the data.
// When changes occurs it will print them to console and html
database.ref().on("value", function (snapshot) {

    // Change the HTML
    $("#name-display").text(snapshot.val().name);
    $("#destination-display").text(snapshot.val().destination);
    $("#train-time-display").text(snapshot.val().time);
    $("#frequency-display").text(snapshot.val().frequency);
    $("#minutes-away-display").text(snapshot.val().minutes);
}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
});

database.ref().on("child_added", function (snapshot, prevChildKey) {

    var newPost = snapshot.val();

    // Change the HTML
    $(".name-display" + trainNumber).text(newPost.name);
    $(".destination-display" + trainNumber).text(newPost.destination);
    $(".train-time-display"+ trainNumber).text(newPost.time);
    $(".frequency-display" + trainNumber).text(newPost.frequency);
    // var newMins= $("#minutes-away-display").text(newPost.minutes);

    // $("#tableRows").append(newRow);
}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
});
