$(document).ready(
    function(){
        $("#qmnt-list").append("<span id=\"loader\" style=\"font-size:12px;font-weight:bold;\">Loading...</span>");
        $("#loader").hide();
        $("#qmnt-show").on("click", function(){
            $("#qmnt-list").load("qmnt/post.html");
            $("#qmnt-show").html("Refresh");
        });
        jQuery.ajaxSetup({
            beforeSend: function() {
                $("#loader").show();
            },
            complete: function(){
                $("#loader").hide();
            },
            success: function() {}
        });
    }
);
