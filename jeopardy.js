
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
          app.displayResults(res);
          // console.log(res);
          
     });
}



//Print results

app.displayResults = function (questions) {
     app.questionsListLength = questions.length;
     app.fiveQuestions = questions.slice(0,1);
     
          app.fiveQuestions.forEach((q) => {

               $('.questions-list').html(
          `<div class="question">
               <div class="clue">
                    <p>Question: ${q.question}<p> 
               </div>
               <div class="answer">
                    <p>Answer: ${q.answer}<p>
                    <p>Air Date: ${q.airdate.substring(0,10)}</p>
               </div>
          </div>
          `          
               )
               $('.question-category').html(
          `${q.category.title}`          
               )
          }); 
     }

//-------------------------Change offset FUNCTION--------------------

app.changeOffset = function() {
     app.offsetValue = 0
     $('.next-question').on('click', function(){
          // console.log(app.offsetValue);
          if (app.offsetValue < 50) {
               app.offsetValue++; 
          } else {
               app.offsetValue = 0;
          }
          $('.questions-list').empty();
          app.call(app.categoryChoice, app.offsetValue)
          return app.offsetValue;
     })
}


app.changeOffset();

//-------------------------SELECT CATEGORY FUNCTION--------------------

app.click = function(){

     $('.category').on('click', function() {

          $('.questions-list').empty();
          app.categoryChoice = $(this)[0].id;          
          app.call(app.categoryChoice, app.offsetValue)
          $('.next-question').removeClass('visually-hidden');
          $('.category-p').removeClass('visually-hidden');
     })

}





//-------------------------APP INIT---------------------------

app.init = function(){
     // app.call();
     app.click();
};

//-------------------------DOCUMENT READY----------------------

$(function () {
     app.init();

});