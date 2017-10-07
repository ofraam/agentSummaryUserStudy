


logger_url = "../logger/logger.py"
experiment = "tictactoe"

E = {}
E.comparisons = {
    pairs5: [ //the one on the right is always the better agent
        ["merged5f200","merged5f2000"],
        ["merged5f200","merged5f400"],
        ["merged5f400","merged5f2000"],
        ["merged5m200","merged5m2000"],
        ["merged5m200","merged5m400"],
        ["merged5m400","merged5m2000"],
        ["merged5r200","merged5r2000"],
        ["merged5r200","merged5r400"],
        ["merged5r400","merged5r2000"],
    ],
    pairs10: [
        ["merged10f200","merged10f2000"],
        ["merged10f200","merged10f400"],
        ["merged10f400","merged10f2000"],
        ["merged10m200","merged10m2000"],
        ["merged10m200","merged10m400"],
        ["merged10m400","merged10m2000"],
        ["merged10r200","merged10r2000"],
        ["merged10r200","merged10r400"],
        ["merged10r400","merged10r2000"],
    ]
}
E.summaryComp = {
    pairs5: [ //the one on the right is always the better agent
        ["merged5f200","merged5r200"],
        ["merged5f200","merged5m200"],
        ["merged5r200","merged5m200"],
        ["merged5f400","merged5r400"],
        ["merged5f400","merged5m400"],
        ["merged5r400","merged5m400"],
        ["merged5f2000","merged5r2000"],
        ["merged5f2000","merged5m2000"],
        ["merged5r2000","merged5m2000"]
    ],
    pairs10: [
        ["merged10f200","merged10r200"],
        ["merged10f200","merged10m200"],
        ["merged10r200","merged10m200"],
        ["merged10f400","merged10r400"],
        ["merged10f400","merged10m400"],
        ["merged10r400","merged10m400"],
        ["merged10f2000","merged10r2000"],
        ["merged10f2000","merged10m2000"],
        ["merged10r2000","merged10m2000"]
    ]
}
E.currAgentPairIdx = 0;
E.pairs = E.comparisons.pairs5;
E.summaryPairs = E.summaryComp.pairs5;
E.currentPair = E.comparisons.pairs5[0];
E.startTime = 0
E.endTime = 0
E.debugMode = false
E.condition = 'solve'
E.solvedCorrect = false;
E.quizSubmitted = false;
E.betterAgent = 'a';
E.selectionsCompleted = false;
E.preferenceCompleted = false;





$(document).ready(function() {

	initialize_experiment();


	onContinue();
});

function initialize_experiment() {
	$(document).ajaxError(abortAll);

	$("#btnContinue").attr('disabled', 'disabled');
	$('#progress').hide();
	

	

	E.userid = initialize_userid();
	servlog("new_user", E.userid)

    var debug = getUrlVars()['debug']
    if (debug == '1') {
        E.debugMode = true
    }
    var summaryLegth = getUrlVars()['l']
    switch(summaryLegth) {
        case '5':
            E.pairs = E.comparisons.pairs5;
            E.summaryPairs = E.summaryComp.pairs5;
            break;
        case '10':
            E.pairs = E.comparisons.pairs10;
            E.summaryPairs = E.summaryComp.pairs10;
            break;
    }
    E.pairs = shuffleArray(E.pairs); // randomly order the pairs we show users

  	servlog("start_position",E.position)
}

/**
 * Randomize array element order in-place.
 * Using Durstenfeld shuffle algorithm.
 */
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function onCheckbox() {
	if($("#consentagree").prop("checked")) {
		$("#btnContinue").removeAttr('disabled');

	} else {
		$("#btnContinue").attr('disabled', 'disabled');
	}
}



function startLog() {
	return;
	var timems = time();
	exper['startTime'] = timems;

	exper['browser'] = BrowserDetect.browser;
	exper['version'] = BrowserDetect.version;
	exper['OS'] = BrowserDetect.OS;
	servlog('exper', 'ExperimentStart', JSON.stringify(exper));

	exper['agent'] = navigator.userAgent;
	exper['JQbrowser'] = $.browser;
	servlog('debug', 'ExperimentStart', JSON.stringify(exper));

	var mlog = "exper-begin" + "," + timems;
	mouselog(mlog);
}

function showCode() {

	$(".code").text(E.userid);

}



function show_page_real()
{
	$("#real.page").show()		
}

function show_page_final(){
			$("#final.page").show()	

	$("#btnContinue").hide()
	showCode();	
}

function submit_demographics() {
	var gender=document.getElementById("gender").options[document.getElementById("gender").selectedIndex].value;
	var education=document.getElementById("education").options[document.getElementById("education").selectedIndex].value;
	var age=document.getElementById("age").value;

	servlog("gender", gender);
	servlog("education", education);
	servlog("age", age);
}

function submit_quiz() {

	
	var q1 = $("#q1").val()
	var q2 = $("#q2").val()
	var q3 = $("#q3").val()
	var q4 = $("#q4").val()	
	var q5 = $("#q5").val()
    var q6 = $("#q6").val()

	
	servlog("quiz1", q1);
	servlog("quiz2", q2);
	servlog("quiz3", q3);
	servlog("quiz4", q4);
	servlog("quiz5", q5);
    servlog("quiz6", q6);
	
	var passed = false;
	if( q1 == '2' && q2 == '2' && q3 =='3' && q4 == 'c1' && q5=='b4' && q6=='b3'){
		var passed = true;
	}
	

	servlog("passedQuiz", passed);
	
	if (passed == false & E.debugMode == false)
	{
		alert("Sorry, you did not pass the quiz. You will now be shown the tutorial again, when you're ready to re-take the quiz click continue.");
		E.quizSubmitted = false;
        onContinue.curPage = 2;
		onContinue();
	}
}

function submit_strategy() {
    var exp = $("#exp").val();
    servlog("strategy", exp);
}

function submit_selection() {
    var selected = $("#agentSelection").val();
    var conf = $('input[name=confidence]:checked', '#experiment').val()

    servlog("selection_"+E.currentPair[0]+"_"+E.currentPair[1], selected);
    servlog("confidence_"+E.currentPair[0]+"_"+E.currentPair[1], conf);
    servlog("correct", selected == E.betterAgent)
    if (E.currAgentPairIdx<E.pairs.length) {
        $("#agentSelection").val(0);
        $('input[name=confidence]:checked', '#experiment').prop("checked",false);
        onContinue.curPage = 4;
        onContinue();
    }
    else {
        E.selectionsCompleted = true;
        E.currAgentPairIdx = 0;
    }
}

function submit_preference() {

    var pref = $('input[name=helpful]:checked', '#experiment').val()
    var explanationPref = $("#prefExpText").val()

    servlog("preference_"+E.currentPair[0]+"_"+E.currentPair[1], pref);
    servlog("preferenceExplanation_"+E.currentPair[0]+"_"+E.currentPair[1], explanationPref);
    if (E.currAgentPairIdx<E.pairs.length) {
        $('input[name=helpful]:checked', '#experiment').prop("checked",false);
        onContinue.curPage = 5;
        onContinue();
    }
    else {
        E.preferenceCompleted = true;
    }
}

function submit_solution() {

	var move = $("#bestmove").val();
	E.move = move;
    var conf = $('input[name=confidence]:checked', '#experiment').val()
    var ver = $("#verification").val()
    // if(typeof conf != 'undefined')
	// {
        // var solution = $("#solution").val();
        servlog("best_move", move);
    if (conf!=undefined)
    {
        servlog("confidence", conf);
    }
        servlog("verification_answer", ver);
	// }

    if (E.condition == "solve") {
        // alert(move)
        if (E.configuration.winMove.indexOf(move) > -1)
        {
            E.solvedCorrect = true;
        }
        // else { //TODO: move from submit solution to screen
        //     alert("Sorry, your solution is incorrect. The correct solution was "+E.configuration.winMove[0] +". In the next screen you will" +
        //         "receive a verification code to paste in your HIT submission.")
        // }
    }
    else {
        if (ver=="yes") {
            E.solvedCorrect = true;
        }
        // else  //TODO: move from submit solution to screen
        // {
        //     alert("Sorry, your solution is incorrect. The move for X was indeed a winning move. In the next screen you will" +
        //         "receive a verification code to paste in your HIT submission.")
        // }
    }
    servlog("correct",E.solvedCorrect);


}

function suggest_solution(){
	
	
	$("#group.page").show()
	
	$("#widget-container").prependTo($("#suggest"))
	
	E.widget.reset();
	$("#own").html(E.move)
}

function log_vote(){
	
	voteOwn = $("#cbown").prop('checked')
	voteA = $("#cba").prop('checked')
	voteB = $("#cbb").prop('checked')
	
	explanationVote = $("#explanationVote").val()

	servlog("vote.own", voteOwn)
	servlog("vote.A", voteA)
	servlog("vote.B", voteB)
	servlog("explanationVote", explanationVote )
	
}



function onContinue() {

	if( typeof onContinue.curPage == 'undefined')
		onContinue.curPage = 0;
	onContinue.curPage++;

	//blank all pages
	$(".page").hide();

    E.size = getUrlVars()['size']

	//run_block()
	//$("#experiment.page").show()
	//return


	switch(onContinue.curPage) {

		case 1:
			$("#consent.page").show()
			break;

		case 2:
			startLog();

			$("#demographics.page").show()

			break;

		case 3:
			submit_demographics();
			E.startTime=msTime();
			$("#instructions.page").show()
            if (E.size == '6') {
                $(".10by10").hide();
                E.board_practice = E.board6_practice
            }
            else {
                $(".6by6").hide();
                E.board_practice = E.board10_practice
            }


			$("#btnContinue").html('Continue to quiz')
            $(window).scrollTop(0,0);
			break;

		case 4:
			E.endTime=msTime()
			var timeInstructions = E.endTime-E.startTime
			// alert('should call servlog')
			servlog("timeInstructions", timeInstructions);
			
			$("#btnContinue").html('Continue')
			E.startTime=msTime();
            // init_practice();

			$("#quiz.page").show()
            if (E.condition=="solve") {
			    $('#exampleVerify').hide()
            }
            else {
                $('#exampleSolve').hide()
            }
            $(window).scrollTop(0,0);
			
			
			//$("#btnContinue").hide()
			break;

		case 5:
			E.endTime=msTime();
            if (!E.quizSubmitted) {
                var timeQuiz = E.endTime - E.startTime
                servlog("timeQuiz", timeQuiz);
                E.quizSubmitted = true;
                submit_quiz();
            }
			if (onContinue.curPage==5)
			{

				E.startTime=msTime();
                E.currentPair = E.pairs[E.currAgentPairIdx]
                E.currAgentPairIdx++;
                //randomize which gif goes on left and which goes on the right
                if (Math.random()<0.5) {
                    $("#pacmanAgif").attr("src","images/"+E.currentPair[0]+ ".gif");
                    document.getElementById('agentSelection').options[1].value = E.currentPair[0];
                    $( "#pacmanAgif").unbind( "click" );
                    $('#pacmanAgif').on({
                        'click': function(){
                            $('#pacmanAgif').attr('src',"images/"+E.currentPair[0]+ ".gif");

                        }
                    });
                    $("#pacmanBgif").attr("src","images/"+E.currentPair[1]+ ".gif");
                    $( "#pacmanBgif").unbind( "click" );
                    document.getElementById('agentSelection').options[2].value = E.currentPair[1];
                    $('#pacmanBgif').on({
                        'click': function(){
                            $('#pacmanBgif').attr('src',"images/"+E.currentPair[1]+ ".gif");


                        }
                    });
                    E.betterAgent = 'b'; //set the correct answer
                }
                else {
                    $("#pacmanAgif").attr("src","images/"+E.currentPair[1]+ ".gif");
                    document.getElementById('agentSelection').options[1].value = E.currentPair[1];
                    $( "#pacmanAgif").unbind( "click" );
                    $('#pacmanAgif').on({
                        'click': function(){
                            $('#pacmanAgif').attr('src',"images/"+E.currentPair[1]+ ".gif");

                        }
                    });
                    $("#pacmanBgif").attr("src","images/"+E.currentPair[0]+ ".gif");
                    document.getElementById('agentSelection').options[2].value = E.currentPair[0];
                    $( "#pacmanBgif").unbind( "click" );
                    $('#pacmanBgif').on({
                        'click': function(){
                            $('#pacmanBgif').attr('src',"images/"+E.currentPair[0]+ ".gif");

                        }
                    });
                    E.betterAgent = 'a'; //set the correct answer
                    servlog("currPair",E.currentPair);

                }
				$("#experiment.page").show()
                $("#preferenceInstructions").hide();
                $("#selectionInstructions").show();
                $("#pacmans").show()
                $("#choose").show()
                $("#preference").hide()

                $(window).scrollTop(0,0);
                // Update the count down every 1 second

            }

			break;

        case 6:
            E.endTime=msTime();
            if (!E.selectionsCompleted) {
                var timeSelection = E.endTime-E.startTime
                servlog("timeSelection_"+E.currentPair[0]+"_"+E.currentPair[1], timeSelection);
                submit_selection();
            }
            if (onContinue.curPage==6) {

                E.currentPair = E.summaryPairs[E.currAgentPairIdx];
                E.currAgentPairIdx++;
                shuffleArray(E.currentPair);
                $("#pacmanAgif").attr("src","images/"+E.currentPair[0]+ ".gif");
                $( "#pacmanAgif").unbind( "click" );
                $('#pacmanAgif').on({
                    'click': function(){
                        $('#pacmanAgif').attr('src',"images/"+E.currentPair[0]+ ".gif");
                    }
                });
                $("#pacmanBgif").attr("src","images/"+E.currentPair[1]+ ".gif");
                $( "#pacmanBgif").unbind( "click" );
                $('#pacmanBgif').on({
                    'click': function(){
                        $('#pacmanBgif').attr('src',"images/"+E.currentPair[1]+ ".gif");
                    }
                });
                $("#experiment.page").show()
                $("#preferenceInstructions").show();
                $("#selectionInstructions").hide();
                $("#pref").hide();
                $("#pacmans").show()
                $("#choose").hide()
                $("#preference").show()
                E.startTime = msTime();
            }
            break;


		case 7:
            E.endTime=msTime();
            if (!E.preferenceCompleted) {
                var timePreference = E.endTime-E.startTime
                servlog("timePreference_"+E.currentPair[0]+"_"+E.currentPair[1], timePreference);
                submit_preference();
            }

            if (onContinue.curPage==7) {

                var timeGame = E.endTime - E.startTime
                // submit_solution();
                servlog("timeGame", timeGame);
                // var timeVote = E.endTime - E.startTime
                // servlog("timeVote", timeVote)
                show_page_final()
            }

	}
}


//TODO check for screen size
