
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
            document.getElementById("qmnt-name").value=username;
        }
        else if (userip!=null&&userip!="undefined"){
            document.getElementById("qmnt-name").value=userip;
        }
        else{
            ip_call();
        }
        if(usermail!=null&&usermail!="undefined")
            document.getElementById("qmnt-email").value=usermail;
        if(usersite!=null&&usersite!="undefined")
            document.getElementById("qmnt-website").value=usersite;

        document.getElementById("qmnt-con").value=message;
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
                document.getElementById("qmnt-name").value=ip;
             }
             else{
                 alert("1");
             }
        }
    };
    xmlhttp.send(null);
}


$(document).ready(
    function(){
        call_name();
        $('#qmnt-form').submit(function(){
                var comment = $('#qmnt-con').val();
                var name = $('#qmnt-name').val();
                var email = $('#qmnt-email').val();
                var website = $('#qmnt-website').val();
                if(website.slice(0, 7)!="http://" || website.slice(0, 8)!="https://"){
                    website="http://"+website;
                }
                var months = ["Jan", "Feb", "Mar", "Apr", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                var now = new Date();
                var date = months[now.getMonth()-1]+" "+now.getDate()+" "+now.getFullYear();
                comment = comment.trim();
                if(comment!="" && comment.length>=5 && name!=""){
                    if($('#qmnt-website').val()!=""){
                        $('#qmnt-section').prepend("<details open><summary><span class=\"qmnt-user\"><a href=\""+ website +"\">"+ username +"</a></span> | <span class=\"qmnt-date\">"+ date +"</span></summary><blockquote>"+ comment +"</blockquote></details>");
                    }
                    else{
                        $('#qmnt-section').prepend("<details open><summary><span class=\"qmnt-user\">"+ username +"</span> | <span class=\"qmnt-date\">"+ date +"</span></summary><blockquote>"+ comment +"</blockquote></details>");
                    }
                    $('#qmnt-con').val("");
                    localStorage.setItem("user_message", "");

                }else{
                    $("#qmnting").css("background", "#ff704d");
                    $("#qmnt-box-bottom").css("background", "#ff704d");
                }

                var resetQmnt = function() {
                    $("#qmnting").css("background", "#fff");
                    $("#qmnt-box-bottom").css("background", "#ebebeb");
                }
                $("#qmnt-con").click(resetQmnt);
                $("#qmnt-name").click(resetQmnt);
                $("#qmnt-email").click(resetQmnt);
                $("#qmnt-website").click(resetQmnt);
                return false;
            }
        );
    }
);
