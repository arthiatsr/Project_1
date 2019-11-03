console.log("hi");

$(document).ready(function() {

var searchResultArray = [];

//console.log(btnValue,jobRole,jobLocation);
var queryURL="";
var i;

function gitajaxcall() {

    //ajax call
    
    $.ajax({
        url:queryURL,
        method:"GET"

    })
    .then(function(response){

        console.log(response);
        var database = firebase.database();
        for(i = 0; i < response.length; i++){
        searchResultArray.push({"company" : response[i].company, "location" : response[i].location, "description" : response[i].description, "url" : response[i].url});       
        
        console.log(searchResultArray); 
        
        
        }   

    });    
}

function gitfirebasecall() {

const firebaseConfig = {
    apiKey: "AIzaSyAbwLZoW9or1wG4Jn7lHesJ5kXC8ZDGooo",
    authDomain: "jobsearch-69d6f.firebaseapp.com",
    databaseURL: "https://jobsearch-69d6f.firebaseio.com",
    projectId: "jobsearch-69d6f",
    storageBucket: "jobsearch-69d6f.appspot.com",
    messagingSenderId: "889128462674",
    appId: "1:889128462674:web:834f4203377e955596b28b",
    measurementId: "G-RMJJ3D382J"
    };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
console.log(searchResultArray);
var database = firebase.database();

for (i=0; i< searchResultArray.length; i++){
       jobname = searchResultArray[i].company;
       console.log(jobname);
       location = searchResultArray[i].location;
       console.log(location);
       description=searchResultArray[i].description;
       url=searchResultArray[i].url;
       
       console.log("jobname: " +  jobname, "loc: " + location, "desc: " + description, "url: " + url);
       // Code for "Setting values in the database"
       database.ref().set({
           name: jobname,
           location: location,
           description: description,
           url: url
       });
    }
}

$(".btn").on("click",function(e){
    e.preventDefault();
    var btnValue= $(this).text();
    var jobRole = $("#role-input").val().trim();

var jobLocation = $("#location-input").val().trim();
        
    if(btnValue ==="GitHub"){
        if((jobRole!=="") && (jobLocation!=="")){
            queryURL = "https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json?description="+jobRole+"&location="+jobLocation;

                console.log("i ma in gitHub" + queryURL + jobRole + jobLocation);                
                console.log(queryURL);  
                gitajaxcall();
                gitfirebasecall();
                                
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
    
    
      

    
 });

 
});

        
   
        