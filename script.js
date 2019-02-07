let count = 1;
let answer = [];
let correct = [];
let playTimes = 0;
let stat = 0;
let w_stat = 0;
let allStat = 0;
let qOn = false;
let min = 0;
let sek = 0;
let sumTime = "00:00";


/* Get data from API */
function getData(){
  $(".main__main").addClass("main__box--scroll-on");
  $(".main__main").scrollTop(0);
    axios.get("https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple")
  .then(function (response) {
    let data = response.data;
      return data;
  })
  .then(function(data){
    let objData = data.results;
      renderQuiz(objData);
  });
}
/* ---------- End ----------- */

function renderFirstPage(){
  $("body").removeClass("body__back--dark");
  $(".main__main").removeClass("main__box--scroll-on");
  $(".main__main").empty();
  $(".main__main").append("<div tabindex='-1' class='rotate-scale-up bg-primary'><p tabindex='-1' class='center'>Quiz</p></div>");
  $(".main__main").append("<button id='startBtn' tabindex='0' aria-label='Start Quiz' class='btn btn-primary main__box--btn' onclick='getData(); startTimer();'>Start Quiz</button>");    
}

function renderQuiz(data){
  $(".main__main").empty();
  qOn = true;
  count = 1;
  console.clear();
for (let q of data){
  /* Skriver ut rätt svar i consolen */
  console.log(q.correct_answer);
  /* ----------- END --------------- */
  answer = q.incorrect_answers;
  correct.push(q.correct_answer);
  answer.push(q.correct_answer);
  answer.sort(() => Math.random() - 0.5);

  $(".main__main").append("<div tabindex='0' class='main__box--quiz font-weight-bold'>Q " + count + " - " + q.category + "</div><div tabindex='0' class='main__box--quiz'>" + q.question + "</div>");
  $(".main__main").append("<form id='question" + count + "' required='required'><ul class='main__box--quiz'>" + 
  "<li aria-label='" + answer[0] + "' class='custom-control custom-radio'><input role='radio' id='defaultUnchecked" + count + "' class='custom-control-input' type='radio' value='" + answer[0] + "' name='quiz" + count + "'><label class='custom-control-label' for='defaultUnchecked" + count + "'>" + answer[0] + "</label></li>" + 
  "<li aria-label='" + answer[1] + "' class='custom-control custom-radio'><input role='radio' id='defaultUnchecked" + count+1 + "' class='custom-control-input' type='radio' value='" + answer[1] + "' name='quiz" + count + "'><label class='custom-control-label' for='defaultUnchecked" + count+1 + "'>" + answer[1] + "</label></li>" +  
  "<li aria-label='" + answer[2] + "' class='custom-control custom-radio'><input role='radio' id='defaultUnchecked" + count+2 + "' class='custom-control-input' type='radio' value='" + answer[2] + "' name='quiz" + count + "'><label class='custom-control-label' for='defaultUnchecked" + count+2 + "'>" + answer[2] + "</label></li>" + 
  "<li aria-label='" + answer[3] + "' class='custom-control custom-radio'><input role='radio' id='defaultUnchecked" + count+3 + "' class='custom-control-input' type='radio' value='" + answer[3] + "' name='quiz" + count + "'><label class='custom-control-label' for='defaultUnchecked" + count+3 + "'>" + answer[3] + "</label></li>" +
  "</ul></form>");
  
   count++;
 }
 $(".main__main").append("<p class='main__box--mess main__box--center'></p>");
 $(".main__main").append("<button id='checkBtn' class='btn btn-primary main__box--center' onclick='checkAnswer(correct)' data-toggle='modal' data-backdrop='static' data-keyboard='false' tabindex='0'>Get Answers</button>");
 $("body").addClass("body__back--dark");
}

function checkAnswer(data){
  count = 1;
  stat = 0;
  let modalBody = $(".modal-body");
  modalBody.empty();

  let question1Answer = $("input[name='quiz1']:checked").val();
  let question2Answer = $("input[name='quiz2']:checked").val();
  let question3Answer = $("input[name='quiz3']:checked").val();
  let question4Answer = $("input[name='quiz4']:checked").val();
  let question5Answer = $("input[name='quiz5']:checked").val();
  let question6Answer = $("input[name='quiz6']:checked").val();
  let question7Answer = $("input[name='quiz7']:checked").val();
  let question8Answer = $("input[name='quiz8']:checked").val();
  let question9Answer = $("input[name='quiz9']:checked").val();;
  let question10Answer = $("input[name='quiz10']:checked").val();

  if (question1Answer !== undefined && question2Answer !== undefined && question3Answer !== undefined && question4Answer !== undefined && question5Answer !== undefined && question6Answer !== undefined && question7Answer !== undefined && question8Answer !== undefined && question9Answer !== undefined && question10Answer !== undefined){
    playTimes++;
    /* Render Right or Wrong answer */
    $("#checkBtn").attr("data-target", "#exampleModal2");

  function checkRoW(questionAnswer, data, question){
    if (questionAnswer === data){
      stat++
      modalBody.append("<span>" + question + " - </span><span class='text-success'>Right:</span><span>" + " " + questionAnswer + "</span><br><br>");
    }
    else{
      modalBody.append("<span>" + question + " - </span><span class='text-danger'>Wrong:</span><span>" + " " + questionAnswer + "</span><br><br>");
      w_stat++
    }
  }

  checkRoW(question1Answer, data[0], "Question 1");
  checkRoW(question2Answer, data[1], "Question 2");
  checkRoW(question3Answer, data[2], "Question 3");
  checkRoW(question4Answer, data[3], "Question 4");
  checkRoW(question5Answer, data[4], "Question 5");
  checkRoW(question6Answer, data[5], "Question 6");
  checkRoW(question7Answer, data[6], "Question 7");
  checkRoW(question8Answer, data[7], "Question 8");
  checkRoW(question9Answer, data[8], "Question 9");
  checkRoW(question10Answer, data[9], "Question 10");

  allStat += stat;

  modalBody.append("<span>Correct Answer/s: " + stat + " av 10</span>");
  correct = [];
  renderFirstPage();
  $(".main__box--mess").text("");
  $("body").removeClass("body__back--dark");
  stopTimer();
  
  }
  else{
    $(".main__box--mess").text("Must answer all questions!!");
  }
}

function renderStat(allStat, playTimes, wrongStat, time){
  stopTimer();
  qOn = false;
  $("body").removeClass("body__back--dark");
  let percentR = allStat/playTimes*10;
  let percentW = wrongStat/playTimes*10;
  let average = allStat/playTimes;

  function roundNaN(num){
    if (isNaN(num)){
       return 0;
    } 
    else{
      return Math.round(num);
    }
  }
  $(".main__main").empty();
  $(".main__main").append("<h4 class='main__box--center'>Stats:</h4><p class='main__box--text'><b>All Right Answer:</b>" + " " + allStat + "p</p><p class='main__box--text'><b>All Wrong Answer:</b>" + " " + wrongStat + "p</p><p class='main__box--text'><b>Play Times:</b>" 
  + " " + playTimes + "st</p><p class='main__box--text'><b>Right Answer In Percent:</b>" + " " + roundNaN(percentR) + "%</p><p class='main__box--text'><b>Wrong Answer In Percent:</b>" + " " + roundNaN(percentW) + "%</p>"
  + "<p class='main__box--text'><b>Average:</b>" + " " + roundNaN(average) + "p</p>");
  $(".main__main").append("<p class='main__box--text'><b>Play Time:</b>" + " " + time + "</p>");
  $(".main__main").append("<button id='startBtn' tabindex='0' aria-label='Reset' class='btn btn-danger main__box--btnD' onclick='resetStat()'>Reset Stats</button>");    
}

function resetStat(){
  playTimes = 0;
  stat = 0;
  w_stat = 0;
  allStat = 0;
  sec = 0;
  renderStat(allStat, playTimes, w_stat, sumTime);
}

function renderAbout(){
  stopTimer();
  qOn = false;
  $("body").removeClass("body__back--dark");
  $(".main__main").empty();
  $(".main__main").append("<h4 class='main__box--center'>About:</h4><p class='main__box--text'>Lorem Ipsum är en utfyllnadstext från" + 
  " tryck- och förlagsindustrin. Lorem ipsum har varit standard ända sedan 1500-talet, när en okänd boksättare tog att antal bokstäver och blandade dem för att göra ett provexemplar " + 
  " av en bok. Lorem ipsum har inte bara överlevt fem århundraden, utan även övergången till elektronisk typografi utan större förändringar. Det blev allmänt känt på 1960-talet i samband " + 
  " med lanseringen av Letraset-ark med avsnitt av Lorem Ipsum, och senare med mjukvaror som Aldus PageMaker.</p>");
}

function openNav() {
  $("#mySidenav").css("width", "250px");
  $("#mySidenav").attr("aria-hidden", "false");
  $("#mySidenav > button").attr("tabindex", "0");
  $("#startBtn").attr("tabindex", "-1");
  $(".rotate-scale-up").css("opacity", "0");
  if (qOn !== true){
    $("body").removeClass("body__back--dark");
    
  }
}

function closeNav() {
  $("#mySidenav").css("width", "0px");
  $("#mySidenav").attr("aria-hidden", "true");
  $("#mySidenav > button").attr("tabindex", "-1");
  $("#startBtn").attr("tabindex", "0");
  $(".rotate-scale-up").css("opacity", "1");
  if (qOn !== true){
    $("body").removeClass("body__back--dark");
  }
}
/* -------------- Timer ---------------- */
let sec = 0;
function startTimer(){
    function pad (val) { return val > 9 ? val : "0" + val; }
    timer = setInterval(() => {
        $("#seconds").html(pad(++sec%60));
        $("#minutes").html(pad(parseInt(sec/60,10)));
    }, 1000);
    $(".timer").css("opacity", "1");

}
function stopTimer() {
    clearInterval(timer);
    min = $("#minutes").html(); 
    sek = $("#seconds").html();

    sumTime = min + ":" + sek;
    console.log(sumTime);
    $(".timer").css("opacity", "0");
  }
/* ------------------ End ---------------- */




renderFirstPage();
