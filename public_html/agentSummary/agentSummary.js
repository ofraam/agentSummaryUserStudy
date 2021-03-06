


logger_url = "../logger/logger.py"
experiment = "tictactoe"

E = {}
E.comparisons = {
    // pairs5: [ //the one on the right is always the better agent
    //     ["merged5f200","merged5f2000"],
    //     ["merged5f200","merged5f400"],
    //     ["merged5f400","merged5f2000"],
    //     ["merged5m200","merged5m2000"],
    //     ["merged5m200","merged5m400"],
    //     ["merged5m400","merged5m2000"],
    //     ["merged5r200","merged5r2000"],
    //     ["merged5r200","merged5r400"],
    //     ["merged5r400","merged5r2000"],
    // ],
    // pairs5: [ //the one on the right is always the better agent
    //     {summary: "first", agent1: "200", agent2: "2000", file1:"merged5f200", file2: "merged5f2000"},
    //     {summary: "first", agent1: "200", agent2: "400", file1:"merged5f200", file2: "merged5f400"},
    //     {summary: "first", agent1: "400", agent2: "2000", file1:"merged5f400", file2: "merged5f2000"},
    //     {summary: "max", agent1: "200", agent2: "2000", file1:"merged5m200", file2: "merged5m2000"},
    //     {summary: "max", agent1: "200", agent2: "400", file1:"merged5m200", file2: "merged5m400"},
    //     {summary: "max", agent1: "400", agent2: "2000", file1:"merged5m400", file2: "merged5m2000"},
    //     {summary: "random", agent1: "200", agent2: "2000", file1:"merged5r200", file2: "merged5r2000"},
    //     {summary: "random", agent1: "200", agent2: "400", file1:"merged5r200", file2: "merged5r400"},
    //     {summary: "random", agent1: "400", agent2: "2000", file1:"merged5r400", file2: "merged5r2000"}
    // ],
    pairs5: [ //the one on the right is always the better agent
        // [{summary: "first", agent: "200", file:"merged5f200"},{summary: "first", agent: "2000", file: "merged5f2000"}],
        // [{summary: "first", agent: "200", file:"merged5f200"},{summary: "first", agent: "400", file: "merged5f400"}],
        // [{summary: "first", agent: "400", file:"merged5f400"},{summary: "first", agent: "2000", file: "merged5f2000"}],
        [{summary: "maxdiv", agent: "200", file:"merged5md200"},{summary: "maxdiv", agent: "2000", file: "merged5md2000"}],
        [{summary: "maxdiv", agent: "200", file:"merged5md200"},{summary: "maxdiv", agent: "400", file: "merged5md400"}],
        [{summary: "maxdiv", agent: "400", file:"merged5md400"},{summary: "maxdiv", agent: "2000", file: "merged5md2000"}],
        [{summary: "max", agent: "200", file:"merged5m200"},{summary: "max", agent: "2000", file: "merged5m2000"}],
        [{summary: "max", agent: "200", file:"merged5m200"},{summary: "max", agent: "400", file: "merged5m400"}],
        [{summary: "max", agent: "400", file:"merged5m400"},{summary: "max", agent: "2000", file: "merged5m2000"}],
        [{summary: "random", agent: "200", file:"merged5r200"},{summary: "random", agent: "2000", file: "merged5r2000"}],
        [{summary: "random", agent: "200", file:"merged5r200"},{summary: "random", agent: "400", file: "merged5r400"}],
        [{summary: "random", agent: "400", file:"merged5r400"},{summary: "random", agent: "2000", file: "merged5r2000"}]
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
        // ["merged5f200","merged5r200"],
        // [{summary: "first", agent: "400", file:"merged5f400"},{summary: "max", agent: "400", file: "merged5m400"}],
        [{summary: "maxdiv", agent: "400", file:"merged5md400"},{summary: "max", agent: "400", file: "merged5m400"}],
        [{summary: "random", agent: "400", file:"merged5r400"},{summary: "max", agent: "400", file: "merged5m400"}],
        // [{summary: "first", agent: "2000", file:"merged5f2000"},{summary: "max", agent: "2000", file: "merged5m2000"}],
        [{summary: "maxdiv", agent: "2000", file:"merged5md2000"},{summary: "max", agent: "2000", file: "merged5m2000"}],
        [{summary: "random", agent: "2000", file:"merged5r2000"},{summary: "max", agent: "2000", file: "merged5m2000"}]
        // ["merged5f200","merged5m200"],
        // ["merged5r200","merged5m200"],
        // ["merged5f400","merged5r400"],
        // ["merged5f400","merged5m400"],
        // ["merged5r400","merged5m400"],
        // ["merged5f2000","merged5r2000"],
        // ["merged5f2000","merged5m2000"],
        // ["merged5r2000","merged5m2000"]
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
E.bonus = 0;





$(document).ready(function() {

	initialize_experiment();


	onContinue();
});

function chooseRandomGifs() {
    gifIdx = Math.floor(Math.random() * 12);
    // alert(gifIdx)
    for (i=0;i<E.pairs.length;i++) {
        for (j=0;j<E.pairs[i].length;j++) {
            if (E.pairs[i][j].summary=="random" & gifIdx>0) {
                E.pairs[i][j].file = "randomVideos/"+E.pairs[i][j].agent+"/merged5_"+gifIdx;
                // alert(E.pairs[i][j].file)
            }
        }
    }

    for (i=0;i<E.summaryPairs.length;i++) {
        for (j=0;j<E.summaryPairs[i].length;j++) {
            if (E.summaryPairs[i][j].summary=="random" & gifIdx>0) {
                E.summaryPairs[i][j].file = "randomVideos/"+E.summaryPairs[i][j].agent+"/merged5_"+gifIdx;
                // alert(E.summaryPairs[i][j].file)
            }
        }
    }
}

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
    E.summaryPairs = shuffleArray(E.summaryPairs); // randomly order the pairs we show users
    chooseRandomGifs();
    $("#prefTotalRounds").text(parseInt(E.summaryPairs.length));
    // alert(E.summaryPairs.length)
    $("#selectTotalRounds").text(parseInt(E.pairs.length));
  	// servlog("start_position",E.position)
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
    $("#bonus").text(parseInt(E.bonus));
    servlog("bonus",E.bonus);
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
    // var q6 = $("#q6").val()

	
	servlog("quiz1", q1);
	servlog("quiz2", q2);
	servlog("quiz3", q3);
	servlog("quiz4", q4);
	servlog("quiz5", q5);
    // servlog("quiz6", q6);
	
	var passed = false;
	if( q1 == '3' && q2 == '2' && q3 =='2' && q4 == '1' && q5=='2'){
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
    if (conf ==  undefined) {
        conf = "";
    }
    var explanationSelect = $("#selectExpText").val();
    servlog("selection_"+E.currentPair[0].summary+"_"+ +E.currentPair[0].agent+ "_"+E.currentPair[1].agent+"_"+selected,
        selected == E.betterAgent);
    servlog("confidence_"+E.currentPair[0].summary+"_"+ +E.currentPair[0].agent+ "_"+E.currentPair[1].agent+"_"+selected, conf);
    servlog("explanationSelction_"+E.currentPair[0].summary+"_"+ +E.currentPair[0].agent+ "_"+E.currentPair[1].agent+"_"+selected, explanationSelect);
    servlog("correct_"+E.currentPair[0].summary+"_"+ +E.currentPair[0].agent+ "_"+E.currentPair[1].agent+"_"+selected, selected == E.betterAgent)
    // alert("selected =" + selected)
    // alert("better agent =" + E.betterAgent)
    if (selected == E.betterAgent) {
        E.bonus = E.bonus +10;
    }
    if (E.currAgentPairIdx<E.pairs.length) {
        $("#agentSelection").val(0);
        $('input[name=confidence]:checked', '#experiment').prop("checked",false);
        $("#selectExpText").val("");
        onContinue.curPage = 4;
        onContinue();
    }
    else {
        E.selectionsCompleted = true;
        E.currAgentPairIdx = 0;
        alert("You completed the pacman player selection phase! Next, you will be shown pairs of video summaries " +
            "of the *same* pacman player and will be asked which video is more helpful")
    }
}

function submit_preference() {

    var pref = $('input[name=helpful]:checked', '#experiment').val()
    if (pref ==  undefined) {
        pref = "";
    }
    var explanationPref = $("#prefExpText").val()

    servlog("preference_"+E.currentPair[0].agent+"_"+E.currentPair[0].summary+"_"+E.currentPair[1].summary, pref);
    servlog("preferenceExplanation_"+E.currentPair[0].agent+"_"+E.currentPair[0].summary+"_"+E.currentPair[1].summary, explanationPref);
    if (E.currAgentPairIdx<E.summaryPairs.length) {
        $("#prefExpText").val("")
        $('input[name=helpful]:checked', '#experiment').prop("checked",false);
        onContinue.curPage = 5;
        onContinue();
    }
    else {
        E.preferenceCompleted = true;
    }
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
                $("#selectRound").text(parseInt(E.currAgentPairIdx));
                // gifs = [E.currentPair[0], E.currentPair[1]]
                E.betterAgent = E.currentPair[1].agent
                shuffleArray(E.currentPair) //randomize which gif goes where
                $("#pacmanAgif").attr("src","images/startPacman.bmp");
                document.getElementById('agentSelection').options[1].value = E.currentPair[0].agent;
                $( "#pacmanAgif").unbind( "click" );
                $('#pacmanAgif').on({
                    'click': function(){
                        $('#pacmanAgif').attr('src',"images/"+E.currentPair[0].file+ ".gif");
                        servlog("clikedVideoA",E.currentPair[0].agent)

                    }
                });

                $("#pacmanBgif").attr("src","images/startPacman.bmp");
                $( "#pacmanBgif").unbind( "click" );
                document.getElementById('agentSelection').options[2].value = E.currentPair[1].agent;
                $('#pacmanBgif').on({
                    'click': function(){
                        $('#pacmanBgif').attr('src',"images/"+E.currentPair[1].file+ ".gif");
                        servlog("clikedVideoB",E.currentPair[1].agent)


                    }
                });



                //randomize which gif goes on left and which goes on the right
                //////////OLD/////////////////////////////
                // if (Math.random()<0.5) {
                //     $("#pacmanAgif").attr("src","images/startPacman.bmp");
                //     document.getElementById('agentSelection').options[1].value = E.currentPair[0];
                //     $( "#pacmanAgif").unbind( "click" );
                //     $('#pacmanAgif').on({
                //         'click': function(){
                //             $('#pacmanAgif').attr('src',"images/"+E.currentPair[0]+ ".gif");
                //             servlog("clikedVideoA",E.currentPair[0])
                //
                //         }
                //     });
                //     $("#pacmanBgif").attr("src","images/startPacman.bmp");
                //     $( "#pacmanBgif").unbind( "click" );
                //     document.getElementById('agentSelection').options[2].value = E.currentPair[1];
                //     $('#pacmanBgif').on({
                //         'click': function(){
                //             $('#pacmanBgif').attr('src',"images/"+E.currentPair[1]+ ".gif");
                //             servlog("clikedVideoB",E.currentPair[1])
                //
                //
                //         }
                //     });
                //     E.betterAgent = E.currentPair[1]; //set the correct answer
                // }
                // else {
                //     $("#pacmanAgif").attr("src","images/startPacman.bmp");
                //     document.getElementById('agentSelection').options[1].value = E.currentPair[1];
                //     $( "#pacmanAgif").unbind( "click" );
                //     $('#pacmanAgif').on({
                //         'click': function(){
                //             $('#pacmanAgif').attr('src',"images/"+E.currentPair[1]+ ".gif");
                //             servlog("clikedVideoA",E.currentPair[1]);
                //         }
                //     });
                //     $("#pacmanBgif").attr("src","images/startPacman.bmp");
                //     document.getElementById('agentSelection').options[2].value = E.currentPair[0];
                //     $( "#pacmanBgif").unbind( "click" );
                //     $('#pacmanBgif').on({
                //         'click': function(){
                //             $('#pacmanBgif').attr('src',"images/"+E.currentPair[0]+ ".gif");
                //             servlog("clikedVideoB",E.currentPair[0])
                //         }
                //     });
                //     E.betterAgent = E.currentPair[1]; //set the correct answer
                //     servlog("currPair",E.currentPair);
                //
                // }
                //////////END OLD/////////////////////////////
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
                servlog("timeSelection_"+E.currentPair[0].summary+"_"+E.currentPair[0].agent+"_"+E.currentPair[1].agent, timeSelection);
                submit_selection();
            }
            if (onContinue.curPage==6) {
                E.currentPair = E.summaryPairs[E.currAgentPairIdx];
                E.currAgentPairIdx++;
                $("#prefRound").text(parseInt(E.currAgentPairIdx));
                shuffleArray(E.currentPair);
                 $("#pacmanAgif").attr("src","images/startPacman.bmp");
                $( "#pacmanAgif").unbind( "click" );
                $('#pacmanAgif').on({
                    'click': function(){
                        $('#pacmanAgif').attr('src',"images/"+E.currentPair[0].file+ ".gif");
                        servlog("clikedVideoA",E.currentPair[0].summary)
                    }
                });
                $("#pacmanBgif").attr("src","images/startPacman.bmp");
                $( "#pacmanBgif").unbind( "click" );
                $('#pacmanBgif').on({
                    'click': function(){
                        $('#pacmanBgif').attr('src',"images/"+E.currentPair[1].file+ ".gif");
                        servlog("clikedVideoB",E.currentPair[1].summary)
                    }
                });
                $("#experiment.page").show()
                $("#preferenceInstructions").show();
                $("#selectionInstructions").hide();
                $("#pref").hide();
                $("#pacmans").show()
                $("#choose").hide()
                $("#preference").show()
                $(window).scrollTop(0,0);
                E.startTime = msTime();
            }
            break;


		case 7:
            E.endTime=msTime();
            if (!E.preferenceCompleted) {
                var timePreference = E.endTime-E.startTime
                servlog("timePreference_"+E.currentPair[0].agent+"_"+E.currentPair[0].summary+"_"+E.currentPair[1].summary, timePreference);
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
