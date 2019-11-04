var firebaseConfig = {
    apiKey: "AIzaSyBnT1oVWCc5ysTxx6GpM4WLUjr2WuUCkrU",
    authDomain: "userdatabase-b16b1.firebaseapp.com",
    databaseURL: "https://userdatabase-b16b1.firebaseio.com",
    projectId: "userdatabase-b16b1",
    storageBucket: "userdatabase-b16b1.appspot.com",
    messagingSenderId: "284486144560",
    appId: "1:284486144560:web:80047d797528af010893f5",
    measurementId: "G-V36SRZYQWP"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
  
// firebase.initializeApp(firebaseConfig);
var database= firebase.database();
var modalbutValue;

$(document).ready(function() {

    $(".modalbut").on("click",function(e){
        e.preventDefault();
        modalbutValue = $(this).text();
        console.log(modalbutValue);
    $('.modal').modal();
        console.log(modalbutValue);
    });
    
    $(".btn-signup").on("click",function(e){
        e.preventDefault();
        console.log("i am clicked");
        var inputText = $("#signupuserName").val();
        var inputpassword = $("#signupPassWord").val();
        console.log(inputText);
       firebase.database().ref('/'+ inputText).set({
        pwd:inputpassword
        });    
    });

    $(".btn-login").on("click",function(e){

        var inputloginText = $("#userName").val();
        console.log("i ma in login");
        e.preventDefault();
        
    });
   
$(".btn-src").on("click",function(e){
    e.preventDefault();
    var btnValue= $(this).text();
    var jobRole = $("#job-category-input").val().trim();
    var jobLocation = $("#location-input").val().trim();
    console.log(btnValue,jobRole,jobLocation);
    var queryURL="";
    var searchResultArray = [];
    
    
    

//         var inputText = $("#userName").val().trim();
//         var neameCkeck = firebase.database().ref.child('users').orderByChild('name').equalTo('inputText').on("value", function(snapshot) {
//             console.log(snapshot.val());
//             snapshot.forEach(function(data) {
//             console.log(data.key);
//             });
//         });

//     $('.modal-footer>a').replaceWith('<i class= "material-icons prefix icon">account_circle</i>');

        
//     }
    
    
    if(jobRole!=="" || jobLocation!==""){
        if(btnValue ==="GitHub"){
            if((jobRole!=="") && (jobLocation!=="")){
                queryURL = "https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json?description="+jobRole+"&location="+jobLocation;
                                    
            } else if(jobRole!==""){
                queryURL = "https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json?description="+jobRole;
                
            }
            else if(jobLocation!=="") {
                queryURL = "https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json?location="+jobLocation;
            }
        }
        else if(btnValue ==="Authentic"){
            if(jobRole!==""){
            
                queryURL = "https://cors-anywhere.herokuapp.com/https://authenticjobs.com/api/?api_key=df526b666a30218cb52a00568251e672&method=aj.jobs.search&keywords="+jobRole+"&format=JSON";
        
            }
            else if(jobLocation!==""){
                queryURL = "https://cors-anywhere.herokuapp.com/https://authenticjobs.com/api/?api_key=df526b666a30218cb52a00568251e672&method=aj.jobs.getlocations&keywords="+jobLocation+"&format=JSON";
            }
            
        }
        else if(btnValue ==="Adzuna"){
            if(jobRole!=="" && jobLocation!==""){
                queryURL= "https://cors-anywhere.herokuapp.com/https://api.adzuna.com/v1/api/jobs/gb/search/1?app_id=33343f64&app_key=81f0d268dcce1766901ea09e54008698&results_per_page=10&what="+jobRole+"&where="+jobLocation+"&content-type=application/json"
            }
            else if (jobRole!=""){
                queryURL="https://cors-anywhere.herokuapp.com/https://api.adzuna.com/v1/api/jobs/gb/search/1?app_id=33343f64&app_key=81f0d268dcce1766901ea09e54008698&results_per_page=10&what="+jobRole+"&content-type=application/json"
            }
            else if(jobLocation!=="")
            {
                queryURL="https://cors-anywhere.herokuapp.com/https://api.adzuna.com/v1/api/jobs/gb/search/1?app_id=33343f64&app_key=81f0d268dcce1766901ea09e54008698&results_per_page=10&where="+jobLocation+"&content-type=application/json"
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
            
                
            //     data = response.listings.listing;
            //     var keys = Object.keys(data);
            
            //         for(var i=0;i<data.length;i++){
            //             resultArr.push({
        
            //                 jobRole:data[keys[i]].title,
            //                 jobLocation:data[keys[i]].location || "US",
            //                 jobDescriprion:data[keys[i]].description,
            //                 Url:data[keys[i]].url,
            //                 qUrl:queryURL,
            //                 dateAdded:firebase.database.ServerValue.TIMESTAMP,
            //                 userLocation:jobLocation,
            //                 userRole:jobRole
            
            //             })
            //         }
            //         database.ref().push({
            //             resultArr:resultArr
            
            //         })
                    
        
            }
            else if (btnValue ==="GitHub"){
                console.log("i am in github entry");
                var keys = Object.keys(response);
                var length = 10;
                if(response.length<length)
                    length=response.length
                for(var i=0; i<length;i++){
                    
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

                    console.log("i am in result", resultArr);
                }
                console.log("i am in github");
                database.ref().push({
                    resultArr:resultArr
        
                })
                
            }
            else if(btnValue==="Adzuna"){
                
                // for(var i=0; i<10;i++){
                //     var title=response.results[i].title.replace(/[</>]/g,"").replace(/strong/g,"")
                    
                //     resultArr.push({
                //         jobRole:title,
                //         jobLocation:response.results[i].location.display_name  || UK,
                //         jobDescriprion:response.results[i].description.replace(/[</>]/g,"").replace(/strong/g,""),
                //         Url:response.results[i].redirect_url,
                //         dateAdded:firebase.database.ServerValue.TIMESTAMP,
                //         userLocation:jobLocation,
                //         userRole:jobRole
        
                //     })
                // }
            
                // database.ref().push({
                //     resultArr:resultArr
        
                // })
            
            } 
        });
    }
    else{
    }
 });
// database.ref().orderByChild("dateAdded").limitToLast(5).on("child_added",function(snapshot){
//     console.log(snapshot.val());
//     var keys = Object.keys(snapshot.val());
//     if(snapshot.val()){
       
//         var temp=snapshot.val()[keys[0]];
//         console.log(temp.length);
//         var location = temp[0].userLocation;
//         var role = temp[0].userRole;
//         var spanLink = $("<span class='new badge' data-badge-caption='results'>");
//         spanLink.text(temp.length);
//         var jobLink = $("<a href=#>").attr("class","collection-item").text(role+" - "+location)
//         spanLink.appendTo(jobLink);
//         jobLink.append("<br>").prependTo("#serch-box");
//     }
    
// }, function(errorObject) {
//     console.log("Errors handled: " + errorObject.code);
// });
$('.collapsible').collapsible();
$('.dropdown-trigger').dropdown();
$('.sidenav').sidenav();
});