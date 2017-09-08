

function auto_grow(element) {
    element.style.height = "5px";
	if(element.value!="")
		element.style.height = (element.scrollHeight)+"px";
}

function call_name(){
	if (typeof(Storage) !== "undefined") {
		var userip = localStorage.getItem("user_ip");
		var username = localStorage.getItem("user_name");
		var usermail = localStorage.getItem("user_mail");
		var usersite = localStorage.getItem("user_site");
		var message = localStorage.getItem("user_message");
		if(username!=null&&username!="undefined"&&username!=""){
			document.getElementById("name").value=username;
		}
		else if (userip!=null&&userip!="undefined"){
			document.getElementById("name").value=userip;
		}
		else{
			ip_call();
		}
		if(usermail!=null&&usermail!="undefined")
			document.getElementById("email").value=usermail;
		if(usersite!=null&&usersite!="undefined")
			document.getElementById("website").value=usersite;

    	document.getElementById("comment-con").value=message;
	}else{
		alert("Browser is too old! Please update to a newer version...");
	}
}

function saveName(name){
	localStorage.setItem("user_name", name);
}

function saveEmail(email){
	localStorage.setItem("user_mail", email);
}

function saveWeb(website){
	localStorage.setItem("user_site", website);
}

function saveMessage(message){
	localStorage.setItem("user_message", message);
}

function ip_call(){
	var ip;
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open('GET', 'https://freegeoip.net/json/', true);
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4) {
			if(xmlhttp.status == 200) {
				var obj = JSON.parse(xmlhttp.responseText);
				ip = obj.ip;
				localStorage.setItem("user_ip", ip);
				document.getElementById("name").value=ip;
			 }
             else{
                 alert("1");
             }
		}
	};
	xmlhttp.send(null);
}

$(document).ready(function(){
        $('#cmnt-btn').click(function(){
                var comment = $('#comment-con').val();
                var ip = localStorage.getItem("user_ip").split(".");
                var num=ip[0].split("").map(function(item) {return parseInt(item, 10);});
                //alert(num);
                /*
                var num=ip[0].split(',').map(function(item) {return parseInt(item, 10);});
                    aggregate IP numbers and add
                */
                var name = $('#name').val();
                var email = $('#email').val();
                var website = $('#website').val();
                if(website.slice(0, 7)!="http://" || website.slice(0, 8)!="https://"){
                    website="http://"+website;
                }
                var months = ["Jan", "Feb", "Mar", "Apr", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                var now = new Date();
                var date = months[now.getMonth()-1]+" "+now.getDate()+" "+now.getFullYear();
                comment = comment.trim();
                if(comment!="" && comment.length>=5){
                    $('#comment-section').prepend("<details open><summary><a href='"+website+"'>"+ name +"</a> | "+ date +" </summary><blockquote>"+ comment +"</blockquote></details>");
                    $('#comment-con').val("");
                    localStorage.setItem("user_message", "");

                }else{
                    $("#comment-con").css("background", "#ff704d");
                }
                $("#comment-con").click(
                    function(){
                        $("#comment-con").css("background", "#fff");
                    }
                );
            }
        );
    }
);
