$(document).ready(function() {



$(".btn").on("click",function(e){
    e.preventDefault();
    var btnValue= $(this).text();
    var jobRole = $("#role-input").val().trim();

    var jobLocation = $("#location-input").val().trim();
    console.log(btnValue,jobRole,jobLocation);
    var queryURL="";

    if(btnValue ==="GitHub"){
        if(jobRole!==""){
            if(jobLocation!==""){
                queryURL = "https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json?description="+jobRole+"&location="+jobLocation;
                
            }

            queryURL = "https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json?description="+jobRole;

        }
        else if(jobLocation!==""){
            queryURL = "https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json?location="+jobLocation;

        }
        else{
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

    });
    
    

});



// Your web app's Firebase configuration



});