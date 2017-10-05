$(document).ready(
    function(){
        $('#qmnt-show').on('click', function(){
            $("#qmnt-list").load("qmnt/index.html");
            $('#qmnt-show').html("Refresh");
        });
    }
);
