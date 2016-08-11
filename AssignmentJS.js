$(document).ready(function(){	
    $("button").click(function(){
		var inputValue = document.getElementById("userInput").value;
		var dee;
		var url = "https://api.coursera.org/api/courses.v1/?q=search&query="+ inputValue;
		if (inputValue == "") alert("Enter a value");
		else {
				$.ajax({url: url, success: function(result){
				dee = result;
				myFunction(dee.elements);
				}});
			}
    });
});

function myFunction(arr) {
    "use strict";
	var i;
    for(i = 0; i < arr.length; i++) {
        var courseId = arr[i].id;
		var urlWithID = "https://api.coursera.org/api/courses.v1/"+courseId +"?includes=partnerIds,instructorIds&fields=instructors.v1(fullName),partnerLogo";
		$.ajax({url: urlWithID, success: function(result){
					var courseName=[],instructor1=[],instructor2=[],partnerName=[],partnerLogoUrl=[];				
				    courseName[i] = result.elements[0].name;
					instructor1[i] = result.linked["instructors.v1"][0].fullName;
					if (result.linked["instructors.v1"].length > 1)  {
							instructor2[i] = result.linked["instructors.v1"][1].fullName;
					} else {
							instructor2[i] = "  ";
					}
					partnerName[i] = result.linked["partners.v1"][0].name;
					partnerLogoUrl[i] = result.elements[0].partnerLogo;
					$(".details").append("<span style='color:red;'>" + courseName[i] + "</span>");
					$(".details").append("<span style='color:blue;margin-left:10px;'>"+ partnerName[i] + "</span>");
					$(".details").append("<span><img src="+partnerLogoUrl[i]+"></img></span>");
					$(".details").append("<span style='color:black;margin-left:10px;'>" + instructor1[i] +"	,    " + instructor2[i] + "</span>" + "<br>");								
		}});
    }
}