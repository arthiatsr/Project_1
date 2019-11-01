console.log("hi");
$(document).ready(function() {

$(".btn").on("click",function(e){
    e.preventDefault();
    var btnValue= $(this).text();
    var jobRole = $("#role-input").val().trim();

    var jobLocation = $("#location-input").val().trim();
    console.log(btnValue,jobRole,jobLocation);
    var queryURL="";
    var searchResultArray = [];
            
    // function populateDatabase(){

    //     var jobname;
    //     var location;
    //     var description;
    //     var url;
               
        
    //     database.ref().set({
    
    //         name: jobname,
    //         location: location,
    //         description: description,
    //         url:url
    
    // });
    // }
    
    if(btnValue ==="GitHub"){
        if((jobRole!=="") && (jobLocation!=="")){
            queryURL = "https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json?description="+jobRole+"&location="+jobLocation;

                console.log("i ma in gitHub" + queryURL + jobRole + jobLocation);
                
                //populateDatabase();
                                
        } else if((jobLocation=="") && (jobRole!=="")){

            queryURL = "https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json?description="+jobRole;
            
        }
        else if((jobLocation!=="") && (jobRole=="")) {
            queryURL = "https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json?location="+jobLocation;

        }
        else {
            queryURL = "https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json"

        }

    }
    else if(btnValue ==="Authentic"){
        if(jobRole!==""){
         
        queryURL = "https://cors-anywhere.herokuapp.com/https://authenticjobs.com/api/?api_key=df526b666a30218cb52a00568251e672&method=aj.jobs.search&keywords="+jobRole+"&format=JSON";
    
        }
        else if(jobLocation!==""){
            queryURL = "https://cors-anywhere.herokuapp.com/https://authenticjobs.com/api/?api_key=df526b666a30218cb52a00568251e672&method=aj.jobs.getlocations&keywords="+jobLocation+"&format=JSON";

        }
        else{
            queryURL = "https://cors-anywhere.herokuapp.com/https://authenticjobs.com/api/?api_key=df526b666a30218cb52a00568251e672&method=aj.jobs.search&format=JSON"

        }
    } 
    console.log(queryURL);  
    
    $.ajax({
        url:queryURL,
        method:"GET"


    })
    .then(function(response){

        console.log(response);
       for(var i = 0; i < response.length; i++){
        searchResultArray.push({"company" : response[i].company, "location" : response.location, "description" : response[i].description, "url" : response[i].url});
        
        
        console.log(searchResultArray);
        }

    });
    
//     const firebaseConfig = {
//         apiKey: "AIzaSyA4eD_m0QUq1FuBqzt7Y1G3B8oMgXU6Zhw",
//         authDomain: "project2-4152e.firebaseapp.com",
//         databaseURL: "https://project2-4152e.firebaseio.com",
//         projectId: "project2-4152e",
//         storageBucket: "project2-4152e.appspot.com",
//         messagingSenderId: "606489782220",
//         appId: "1:606489782220:web:407a7d004079a2c7541f69",
//         measurementId: "G-STSB19EERQ"
//       };
    
//       firebase.initializeApp(firebaseConfig );
    
//       var database = firebase.database();

//       var jobname;
//       var location;
//       var description;
//       var url;

 });



    

    // database.ref().on("value", function(snapshot) {

    //  //   var jobname = response.database.

    // }, function(errorObject) {
    //     console.log("The read failed: " + errorObject.code);
    // });


// Your web app's Firebase configuration



});
