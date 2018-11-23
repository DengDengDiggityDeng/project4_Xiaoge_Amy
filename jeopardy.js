
//CONTENT: 

     //Master object
     //App Init
     //Document Ready

//-------------------------MASTER APP OBJECT AND STEADY VARIABLES--------------------
const app = {};
app.url = "http://jservice.io/api/";

/*----------------------------------------------*/

console.log("hey there")

//-------------------------API CALL FUNCTION--------------------

app.call = function (categoryID, changed) {
     $.ajax({
          url: `${app.url}clues`,
          method: 'GET',
          data: {
               category: categoryID,
               offset: changed,
          }
     }).then((res) => {
          app.filteredRes = res.filter(question => question.question !== "");
          app.displayResults(app.filteredRes);
          console.log(app.filteredRes);
          
     });
}



//Print results

app.displayResults = function (questions) {
     app.questionsListLength = questions.length;
     app.fiveQuestions = questions.slice(0,1);
     
          app.fiveQuestions.forEach((q) => {
               if (q.question !== "") {
               $('.clue').html(
               `    <div class="question">
                         <p>Question: ${q.question} <p> 
                    </div>`)

               $('.answer').html(
          `    <div>
                    <p>Answer: ${q.answer}</p>
                    <p>Air Date: ${q.airdate.substring(0,10)}</p>
               </div>`)

               $('.question-category').html(`${q.category.title}`);
          }


          }); 
     }

//-------------------------Change offset FUNCTION--------------------

app.changeOffset = function() {
     app.offsetValue = 0
     $('.next-question').on('click', function(){
          $('.answer').removeClass('show');
          $('.answer').addClass('hide');
          // console.log(app.offsetValue);
          if (app.offsetValue < 50) {
               app.offsetValue++; 
          } else {
               app.offsetValue = 0;
          }
          app.call(app.categoryChoice, app.offsetValue)
          return app.offsetValue;
     })
}



//-------------------------SELECT CATEGORY FUNCTION--------------------

app.click = function(){

     $('.category').on('click', function() {
          app.categoryChoice = $(this)[0].id;          
          app.call(app.categoryChoice, app.offsetValue)
          $('.show-answer').removeClass('hide');
          $('.next-question').removeClass('hide');
          $('.category-p').removeClass('hide');
     })

}
//-------------------------Show answer---------------------------

app.answerToggle = function () {
     $('.show-answer').on('click', function () {
          $('.answer').removeClass('hide');
          $('.answer').addClass('show');
     });
}
app.answerToggle();



//-------------------------APP INIT---------------------------

app.init = function(){
     app.click();
     app.changeOffset();

};

//-------------------------DOCUMENT READY----------------------

$(function () {
     app.init();

});