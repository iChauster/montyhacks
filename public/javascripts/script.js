$(document).ready(function () {
        
        setTimeout(showMantra, 1300);

        function showMantra(){
            console.log("called")
            $("#mantra").addClass('visible');
        }
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
        var footerInstance = new Granim({
            element : "#foot",
            name : 'granim',
            opacity : [1,1],
            states : {
                "default-state" : {
                    gradients:[
                        ["#149824","#37ab35"],
                        ["#265d7e","#5f5481"]
                    ],
                transitionSpeed:10000
                }
            }
        })
        var granimInstance = new Granim({
            element : "#g",
            name:'granim',
            opacity:[1,1],
            states:{
                "default-state" : {
                    gradients:[
                        ["#005820","#468930"],
                        ["#3F5E8C","#1FFC9F"]
                    ],
                transitionSpeed:10000
                }
            }
        });
        
        var granimTop = new Granim({
            element: "#canvas-image",
            name : 'granim',
            direction: 'top-bottom',
            opacity:[1,1,1],
            states : {
                "default-state" : {
                    gradients : [
                        ["#162616","#295b2a","#2e842f"],
                        ["1ffc9f","#2e4466", "#2e842f"]
                    ],
                    transitionSpeed:10000
                },
                "register-state" : {
                    gradients : [
                        ["22F39F", "#2FAF98", "#3F5E8D"],
                        ["#3B7990", "#1C2955", "#000"]
                    ],
                    transitionSpeed:3000
                }

            }
        });
        $("#register").hover(function () {
            //stuff to do on mouse enter
            granimTop.changeState("register-state")
        }, 
        function () {
            //stuff to do on mouse leave
            granimTop.changeState("default-state")
        }); 


});
