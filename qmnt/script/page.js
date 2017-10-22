$(document).ready(
    function(){
        $('#qmnt-show').on('click', function(){
            $("#qmnt-list").load("qmnt/post.html");
            $('#qmnt-show').html("Refresh");
        });
    }
);
