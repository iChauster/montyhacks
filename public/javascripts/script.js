$(document).ready(function () {

        // you want to enable the pointer events only on click;
        $('#map').addClass('scrolloff'); // set the pointer events to none on doc ready
        $('#over').on('click', function () {
            $('#map').removeClass('scrolloff'); // set the pointer events true on click
        });

        // you want to disable pointer events when the mouse leave the canvas area;

        $("#map").mouseleave(function () {
            $('#map').addClass('scrolloff'); // set the pointer events to none when mouse leaves the map area
        });
        inView(".photo").on('enter', function(){
        	console.log("in");
        	$('#vineet').css('opacity','1')
        	$('#vineet').css('margin-top',"inherit")
        	$('#vineet').parent().css('opacity',1)
        	setTimeout(showSelector, 500, "#ben");
        	setTimeout(showSelector, 1000, "#julia");
        	setTimeout(showSelector, 1500, "#niva");
        	setTimeout(showSelector, 2000, "#ivan");

        });
        function showSelector(string){
        	$(string).css('opacity',1)
        	$(string).css('margin-top','inherit');
        	$(string).parent().css('opacity',1);
        }
        var vinCounter = 0;
        $("#vineet").on('click', function() {
        	vinCounter ++;
        	if(vinCounter == 3){
        		$("#vineet").parent().css('opacity', 0);
        		setTimeout(function (){
        			$("#vineet").css("display", "none");
        		}, 3000)
        	}
        });

});
