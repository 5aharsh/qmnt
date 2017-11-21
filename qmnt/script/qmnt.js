  function auto_grow(element) {
    element.style.height = "5px";
    if(element.value!="")
        element.style.height = (element.scrollHeight)+"px";
}

function escapeHtml(text) {
    var map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, function(m) {return map[m];});
}

function toTitle(str){
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

function getFingerprint(){
    var fp = new Fingerprint2().get(function(result, components){
        saveFingerprint(result);
        console.log(components);
    });
}

function call_name(){
    if (typeof(Storage) !== "undefined") {
        var userip = localStorage.getItem("qmnt_user_ip");
        var username = localStorage.getItem("qmnt_user_name");
        var usermail = localStorage.getItem("qmnt_user_mail");
        var usersite = localStorage.getItem("qmnt_user_site");
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
    }else{
        alert("Browser is too old! Please update to a newer version...");
    }
}

function saveName(name){
    localStorage.setItem("qmnt_user_name", name);
}

function saveFingerprint(identity){
    localStorage.setItem("qmnt_fingerprint", identity);
}

function saveEmail(email){
    localStorage.setItem("qmnt_user_mail", email);
}

function saveWeb(website){
    localStorage.setItem("qmnt_user_site", website);
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
                localStorage.setItem("qmnt_user_ip", ip);
                document.getElementById("qmnt-name").value=ip;
             }
             else{
                 alert("Device not connected to Internet! Please Try Again.");
             }
        }
    };
    xmlhttp.send(null);
}
function qmnt_reply(i){
    var j=$(i).data('qmnt-id');
    $('#qmnt-con').val("#"+j+" ").focus();
}

$(document).ready(
    function(){
        if(localStorage.getItem("qmnt_fingerprint") === null)
            getFingerprint();
        call_name();
        $("#qmnt-rep-button").click(function(e) {
            e.preventDefault();
            alert("hello");
            return false;
        });
        $('#qmnt-form').submit(function(e){
                var comment = $('#qmnt-con').val();
                var name = $('#qmnt-name').val();
                name = toTitle(name);
                var email = $('#qmnt-email').val();
                var website = $('#qmnt-website').val();
                if(website.slice(0, 7)!="http://" || website.slice(0, 8)!="https://"){
                    website="http://"+website;
                }
                var months = ["Jan", "Feb", "Mar", "Apr", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                var now = new Date();
                var date = months[now.getMonth()-1]+" "+now.getDate()+" "+now.getFullYear();
                var fprint = localStorage.getItem("qmnt_fingerprint");
                comment = comment.trim();
                if(comment!="" && comment.length>=5 && name!=""){
                    e.preventDefault();
                    var now = new Date();
                    var date = months[now.getMonth()-1]+" "+now.getDate()+", "+now.getFullYear();
        			var page = window.location.pathname;
                    var qmntid = ""+now.getTime()+""+Math.floor(Math.random()*10000);
                    if($('#qmnt-website').val()!=""){
                        $('#qmnt-section').prepend("<details open id=\"qmnt-"+qmntid+"\"><summary><span class=\"qmnt-user\"><a href=\""+escapeHtml(website)+"\">"+ escapeHtml(name) +"</a></span> | <span class='qmnt-date' style=\"margin-right:0px;\">"+ escapeHtml(date) +"</span><span id=\"qmnt-qmnid\">["+qmntid+"]</span> </summary><blockquote>"+ escapeHtml(comment) +"<hr><a id=\"qmnt-rep-button\" href=\"javascript:void(0)\" onclick=\"qmnt_reply(this)\" data-qmnt-id=\""+qmntid+"\">Reply</a></blockquote></details>");
                    }
                    else{
                        $('#qmnt-section').prepend("<details open id=\"qmnt-"+qmntid+"\"><summary><span class=\"qmnt-user\">"+ escapeHtml(name) +"</span> | <span class=\"qmnt-date\">"+ escapeHtml(date) +"</span><span id=\"qmnt-qmnid\">["+qmntid+"]</span></summary><blockquote>"+ escapeHtml(comment) +"<hr><a id=\"qmnt-rep-button\" href=\"javascript:void(0)\" onclick=\"qmnt_reply(this)\" data-qmnt-id=\""+qmntid+"\">Reply</a></blockquote></details>");
                        website="";
                    }
                    var formData = "username="+encodeURIComponent(name)+"&email="+encodeURIComponent(email)+"&website="+encodeURIComponent(website)+"&message="+encodeURIComponent(comment)+"&address="+page+"&date="+date+"&fingerprint="+fprint+"&qmntid="+qmntid;
                    $.ajax({
                        url:'qmnt/submit.php',
                        type:'get',
                        data: formData,
                        success:function(){
                                    console.log("Success.");
                                }
                    });
                    $('#qmnt-con').val("");

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
