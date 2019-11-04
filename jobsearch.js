$(document).ready(function() {

var queryURL;
var jobRole = "tester";//$("#jobRole").val().trim();
console.log(jobRole);
//var jobType = $("#jobType").val().trim();
var jobLocation = "lasvegas";//$("#jobLocation").val().trim();

// function jooblesearchAPI(){
//     queryURL = "";

//     $.ajax({
//         url: queryURL,
//         method: "GET"
//       }).then(function(response) {

//         var result = response.data;
//       });


// };
// function openskillsearchAPI(){
//     queryURL = "";

//     $.ajax({
//         url: queryURL,
//         method: "GET"
//       }).then(function(response) {

//         var result = response.data;

//     });
// };
function githubsearchAPI(){
    queryURL = "https://cors-anywhere/jobs.github.com/positions.json?description=" + jobRole + "&location=" + jobLocation ;
    console.log(queryURL);
    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {

        var result = response.data;
        console.log("testing for githubsearch api" + response);

    });
};
githubsearchAPI();
// $(".jobsearchAPI").on("click", function() {

//     if(dataname="jooble") {
//         indeedsearchAPI();

//     }else if(dataname="openskill") {
//         openskillsearchAPI();

//     }else if(dataname="github") {
//         githubsearchAPI();

//     }
// });

// Your web app's Firebase configuration

// const firebaseConfig = {
//     apiKey: "AIzaSyAbwLZoW9or1wG4Jn7lHesJ5kXC8ZDGooo",
//     authDomain: "jobsearch-69d6f.firebaseapp.com",
//     databaseURL: "https://jobsearch-69d6f.firebaseio.com",
//     projectId: "jobsearch-69d6f",
//     storageBucket: "jobsearch-69d6f.appspot.com",
//     messagingSenderId: "889128462674",
//     appId: "1:889128462674:web:834f4203377e955596b28b",
//     measurementId: "G-RMJJ3D382J"
// };

// // Initialize Firebase

// firebase.initializeApp(firebaseConfig);
    
    
// // Create a variable to reference the database.
// var database = firebase.database();

});