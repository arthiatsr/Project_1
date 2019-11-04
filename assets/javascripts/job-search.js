var firebaseConfig = {
    apiKey: "AIzaSyDszSEFfAInsMpPqe4PhgYYTrs2AOR8AsM",
    authDomain: "project-1-job-src.firebaseapp.com",
    databaseURL: "https://project-1-job-src.firebaseio.com",
    projectId: "project-1-job-src",
    storageBucket: "project-1-job-src.appspot.com",
    messagingSenderId: "1753867064",
    appId: "1:1753867064:web:ecbdeb2a2106075407d7cd",
    measurementId: "G-NE3FQV23HM"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var database= firebase.database();


$(document).ready(function() {
   


$(".btn").on("click",function(e){
    e.preventDefault();
    var btnValue= $(this).text();
    var jobRole = $("#job-category-input").val().trim();

    var jobLocation = $("#location-input").val().trim();
    console.log(btnValue,jobRole,jobLocation);
    var queryURL="";
    var searchResultArray = [];
            
    
    
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
    else if(btnValue ==="Adzuna"){
        if(jobRole!=="" && jobLocation!==""){

            queryURL= "https://cors-anywhere.herokuapp.com/https://api.adzuna.com/v1/api/jobs/gb/search/1?app_id=33343f64&app_key=81f0d268dcce1766901ea09e54008698&results_per_page=10&what="+jobRole+"&where="+jobLocation+"&content-type=application/json"
        }
        else if (jobRole!=""){
            "https://cors-anywhere.herokuapp.com/https://api.adzuna.com/v1/api/jobs/gb/search/1?app_id=33343f64&app_key=81f0d268dcce1766901ea09e54008698&results_per_page=10&what="+jobRole+"&content-type=application/json"
        }

    }
    console.log(queryURL);


    $.ajax({
        url:queryURL,
        method:"GET"
    })
    .then(function(response){
        
        var resultArr=[];
        console.log(response)
        if(btnValue ==="Authentic"){
           
            
            data = response.listings.listing;
            var keys = Object.keys(data);
           

                for(var i=0;i<data.length;i++){

                    resultArr.push({
    
                        jobRole:data[keys[i]].title,
                        jobLocation:data[keys[i]].location || "US",
                        jobDescriprion:data[keys[i]].description,
                        Url:data[keys[i]].url,
                        qUrl:queryURL,
                        dateAdded:firebase.database.ServerValue.TIMESTAMP,
                        userLocation:jobLocation,
                        userRole:jobRole
        
                    })
                }
                database.ref().push({
                    resultArr:resultArr
        
                })
                
     
        }
        else if (btnValue ==="GitHub"){
            
            var keys = Object.keys(response);
            for(var i=0; i<10;i++){
                
                resultArr.push({

                    jobRole:response[keys[i]].title,
                    jobLocation:response[keys[i]].location,
                    jobDescriprion:response[keys[i]].description,
                    Url:response[keys[i]].url,
                    qUrl:queryURL,
                    dateAdded:firebase.database.ServerValue.TIMESTAMP,
                    userLocation:jobLocation,
                    userRole:jobRole
    
                })
            }
            database.ref().push({
                resultArr:resultArr
    
            })
            
        }
        else if(btnValue==="Adzuna"){
            
            for(var i=0; i<10;i++){
                var title=response.results[i].title.replace(/[</>]/g,"").replace(/strong/g,"")
                
                resultArr.push({

                    jobRole:title,
                    jobLocation:response.results[i].location.display_name  || UK,
                    jobDescriprion:response.results[i].description.replace(/[</>]/g,"").replace(/strong/g,""),
                    Url:response.results[i].redirect_url,
                    dateAdded:firebase.database.ServerValue.TIMESTAMP,
                    userLocation:jobLocation,
                    userRole:jobRole
    
                })
            }
           
            database.ref().push({
                resultArr:resultArr
    
            })
           
        } 

        firebase.database().ref().on('value', function(snapshot) {
            
            console.log(snapshot.val());
        
            function snapshotToArray(snapshot) {
                var returnArr = [];
            
                snapshot.forEach(function(childSnapshot) {
                    var item = childSnapshot.val();
                    item.key = childSnapshot.key;
            
                    returnArr.push(item);
                    console.log(snapshotToArray(snapshot));
                });
            
                return returnArr;
                
            };

  
    });




 });


    
  
});


database.ref().orderByChild("dateAdded").limitToLast(5).on("child_added",function(snapshot){

    console.log(snapshot.val());
    var keys = Object.keys(snapshot.val());
    if(snapshot.val()){
       
        var temp=snapshot.val()[keys[0]];
        console.log(temp.length);
        var location = temp[0].userLocation;
        var role = temp[0].userRole;
        var spanLink = $("<span class='new badge' data-badge-caption='results'>");
        spanLink.text(temp.length);
        var jobLink = $("<a href=#>").attr("class","collection-item").text(role+" - "+location)
        spanLink.appendTo(jobLink);
        jobLink.append("<br>").prependTo("#serch-box");
    }
    

}, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
});

$('.collapsible').collapsible();
$('.dropdown-trigger').dropdown();
$('.sidenav').sidenav();

});
