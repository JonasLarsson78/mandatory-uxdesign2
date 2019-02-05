
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
  //console.log(objData);
  renderQuiz(objData);

});
}

function renderFirstPage(){
  $(".main__main").removeClass("main__box--scroll-on");
  
  $(".main__main").empty();
  $(".main__main").append("<div class='rotate-scale-up bg-primary'><p class='center'>Quiz</p></div>");
  $(".main__main").append("<button tabindex='1' aria-label='Start Quiz' class='btn btn-primary main__box--btn' onclick='getData()'>Start Quiz</button>");    
}

let count = 1;
let answer = [];
let correct = [];
let playTimes = 0;
let stat = 0;
let allStat = 0;

function renderQuiz(data){
  
  $(".main__main").empty();
for (let q of data){
  console.log(q.correct_answer);
  answer = q.incorrect_answers;
  correct.push(q.correct_answer);
  answer.push(q.correct_answer);
  answer.sort(() => Math.random() - 0.5);
  
   

  $(".main__main").append("<div tabindex='0' class='main__box--quiz font-weight-bold'>" + q.category + "</div><div tabindex='0' class='main__box--quiz'>" + q.question + "</div>");
  $(".main__main").append("<form id='question" + count + "' required='required'><ul class='main__box--quiz'>" + 
  "<li aria-label='" + answer[0] + "' class='custom-control custom-radio'><input id='defaultUnchecked" + count + "' class='custom-control-input' type='radio' value='" + answer[0] + "' name='quiz" + count + "'><label class='custom-control-label' for='defaultUnchecked" + count + "'>" + answer[0] + "</label></li>" + 
  "<li class='custom-control custom-radio'><input id='defaultUnchecked" + count+1 + "' class='custom-control-input' type='radio' value='" + answer[1] + "' name='quiz" + count + "'><label class='custom-control-label' for='defaultUnchecked" + count+1 + "'>" + answer[1] + "</label></li>" +  
  "<li class='custom-control custom-radio'><input id='defaultUnchecked" + count+2 + "' class='custom-control-input' type='radio' value='" + answer[2] + "' name='quiz" + count + "'><label class='custom-control-label' for='defaultUnchecked" + count+2 + "'>" + answer[2] + "</label></li>" + 
  "<li class='custom-control custom-radio'><input id='defaultUnchecked" + count+3 + "' class='custom-control-input' type='radio' value='" + answer[3] + "' name='quiz" + count + "'><label class='custom-control-label' for='defaultUnchecked" + count+3 + "'>" + answer[3] + "</label></li>" +
  "</ul></form>");
  
   count++;
 }
 $(".main__main").append("<p class='main__box--mess main__box--center'></p>");
 $(".main__main").append("<button id='checkBtn' class='btn btn-primary main__box--center' onclick='checkAnswer(correct)' data-toggle='modal' data-backdrop='static' data-keyboard='false' tabindex='-1'>Right Answer</button>");
 
 playTimes++;
{/* <button class='btn btn-primary main__box--btn menu_btn--x' onclick='checkAnswer(correct)' data-toggle='modal' data-target='#exampleModal2' data-backdrop='static' data-keyboard='false'>Rätta</button>
 */}}
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
    
    $("#checkBtn").attr("data-target", "#exampleModal2");
  if (question1Answer === data[0]){
    console.log("Rätt");
    stat++
    modalBody.append("<p>Question 1 - Right:" + " " + question1Answer + "</p>");
  }
  else{
    console.log("Fel");
    modalBody.append("<p>Question 1 - Wrong:" + " " + question1Answer + "</p>");
  }
  if (question2Answer === data[1]){
    console.log("Rätt");
    stat++
    modalBody.append("<p>Question 2 - Right:" + " " + question2Answer + "</p>");
  }
  else{
    console.log("Fel");
    modalBody.append("<p>Question 2 - Wrong:" + " " + question2Answer + "</p>");
  }
  if (question3Answer === data[2]){
    console.log("Rätt");
    stat++
    modalBody.append("<p>Question 3 - Right:" + " " + question3Answer + "</p>");
  }
  else{
    console.log("Fel");
    modalBody.append("<p>Question 3 - Wrong:" + " " + question3Answer + "</p>");
  }
  if (question4Answer === data[3]){
    console.log("Rätt");
    stat++
    modalBody.append("<p>Question 4 - Right:" + " " + question4Answer + "</p>");
  }
  else{
    console.log("Fel");
    modalBody.append("<p>Question 4 - Wrong:" + " " + question4Answer + "</p>");
  }
  if (question5Answer === data[4]){
    console.log("Rätt");
    stat++
    modalBody.append("<p>Question 5 - Right:" + " " + question5Answer + "</p>");
  }
  else{
    console.log("Fel");
    modalBody.append("<p>Question 5 - Wrong:" + " " + question5Answer + "</p>");
  }
  if (question6Answer === data[5]){
    console.log("Rätt");
    stat++
    modalBody.append("<p>Question 6 - Right:" + " " + question6Answer + "</p>");
  }
  else{
    console.log("Fel");
    modalBody.append("<p>Question 6 - Wrong:" + " " + question6Answer + "</p>");
  }
  if (question7Answer === data[6]){
    console.log("Rätt");
    stat++
    modalBody.append("<p>Question 7 - Right:" + " " + question7Answer + "</p>");
  }
  else{
    console.log("Fel");
    modalBody.append("<p>Question 7 - Wrong:" + " " + question7Answer + "</p>");
  }
  if (question8Answer === data[7]){
    console.log("Rätt");
    stat++
    modalBody.append("<p>Question 8 - Right:" + " " + question8Answer + "</p>");
  }
  else{
    console.log("Fel");
    modalBody.append("<p>Question 8 - Wrong:" + " " + question8Answer + "</p>");
  }
  if (question9Answer === data[8]){
    console.log("Rätt");
    stat++
    modalBody.append("<p>Question 9 - Right:" + " " + question9Answer + "</p>");
  }
  else{
    console.log("Fel");
    modalBody.append("<p>Question 9 - Wrong:" + " " + question9Answer + "</p>");
  }
  if (question10Answer === data[9]){
    console.log("Rätt");
    stat++
    modalBody.append("<p>Question 10 - Right:" + " " + question10Answer + "</p>");
  }
  else{
    console.log("Fel");
    modalBody.append("<p>Question 10 - Wrong:" + " " + question10Answer + "</p>");
  }
  allStat += stat;

  console.log(stat + " " + "Rätt");
  console.log(allStat + " " + "AllA Rätt");
  console.log(playTimes + " " + "Play times");
  modalBody.append("<hr><p>Correct Answer/s: " + stat + " av 10</p>");
  correct = [];
  renderFirstPage();
  $(".main__box--mess").text("");
  }
  else{
    console.log("Måste svara på frågorna");
    $(".main__box--mess").text("Must answer all questions!!");

  }
}
function renderStat(allStat, playTimes){
  
  $(".main__main").empty();
  $(".main__main").append("<h4 class='main__box--center'>Stats</h4><p class='main__box--center'>All Right Answer:" + " " + allStat + "</p><p class='main__box--center'>Play Times:" 
  + " " + playTimes + "</p><p class='main__box--center'>Right Answer In %:" + " " + allStat/playTimes*10 + "%</p>");
  
}
function renderAbout(){
  $(".main__main").empty();
  $(".main__main").append("<h4 class='main__box--center'>About</h4><p class='main__box--center'>Lorem Ipsum är en utfyllnadstext från tryck- och förlagsindustrin. Lorem ipsum har varit standard ända sedan 1500-talet, när en okänd boksättare tog att antal bokstäver och blandade dem för att göra ett provexemplar av en bok. Lorem ipsum har inte bara överlevt fem århundraden, utan även övergången till elektronisk typografi utan större förändringar. Det blev allmänt känt på 1960-talet i samband med lanseringen av Letraset-ark med avsnitt av Lorem Ipsum, och senare med mjukvaror som Aldus PageMaker.</p>");
}

function openNav() {
  $("#mySidenav").css("width", "250px");
  $("#mySidenav").attr("aria-hidden", "false");
}

function closeNav() {
  $("#mySidenav").css("width", "0px");
  $("#mySidenav").attr("aria-hidden", "true");
   
  
  
}

renderFirstPage();


