$(document).ready(function() {
        if("<?php echo $timezone; ?>".length==0){
            var visitortime = new Date();
            var visitortimezone = visitortime.getHours();
			console.log(visitortimezone);
            $.ajax({
                type: "GET",
                url: "https://bits.ddnsking.com/filemanager/customizables/config.php",
                data: 'time='+ visitortimezone,
                success: function(){
                    location.reload();
                }
            });
        }
});