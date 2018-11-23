
//CONTENT: 

     //Master object
     //App Init
     //Document Ready

//-------------------------MASTER APP OBJECT AND STEADY VARIABLES--------------------
const app = {};
app.url = "http://jservice.io/api/";

/*----------------------------------------------*/

console.log("hey there")

//-------------------------API CALL FUNCTIONS--------------------

//CALL QUESTIONS:

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
          // console.log(app.filteredRes);
          
     });
}

//CALL CATEGORIES:

app.callCategories = function () {
     $.ajax({
          url: `${app.url}categories`,
          method: 'GET',
          data: {
               count: 100,
               offset: 200,
          }
     }).then((res) => {
          console.log(res);
          app.categoryIDsList = res.filter((category)=>{
               if (category.clues_count > 40){
                    console.log(category.id, category.title);
                    return(category)
               }
          })
          console.log(app.categoryIDsList);
          
     });
}

app.callCategories();

//Print results

app.displayResults = function (questions) {
     app.questionsListLength = questions.length;
     app.fiveQuestions = questions.slice(0,1);
     
          app.fiveQuestions.forEach((q) => {
               if (q.question !== "") {
               $('.clue').html(
               `    <div class="question">
                         <p>${q.question} <p> 
                    </div>`)

               $('.answer').html(
          `    <div>
                    <p>${q.answer}</p>
                    <p>Jeopardy Air Date: ${q.airdate.substring(0,10)}</p>
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
          $('.pick-first').addClass('display-none');
          $('.show-answer').removeClass('hide');
          $('.answer').removeClass('show');
          $('.answer').addClass('hide');
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