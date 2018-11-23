
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
     });
}

//CALL CATEGORIES:

app.callCategories = function (offset) {
     $.ajax({
          url: `${app.url}categories`,
          method: 'GET',
          data: {
               count: 3,
               offset: offset,
          }
     }).then((res) => {
          console.log(res);
          app.displayCategories(res);          
     });
}


//-------------------------API CALL FUNCTIONS--------------------

//Print question results

app.displayResults = function (questions) {
     app.fiveQuestions = questions.slice(0,1);
     
          app.fiveQuestions.forEach((q) => {
               if (q.question !== "") {
               $('.clue').html(
               `    <div class="question">
                         <p class="points">$${q.value}</p>
                         <p>${q.question} <p> 
                    </div>`)

               $('.answer').html(
               `<div>
                    <p>${q.answer}</p>
                    <p>Jeopardy Air Date: ${q.airdate.substring(0,10)}</p>
               </div>`)

               $('.question-category').html(`${q.category.title}`);
          }


          }); 
     }

//Print category results

app.displayCategories = function (categories) {     
     $('.category1').html(`<p id="${categories[0].id}">${categories[0].title} </p>`);
     $('.category2').html(`<p id="${categories[1].id}">${categories[1].title} </p>`);
     $('.category3').html(`<p id="${categories[2].id}">${categories[2].title} </p>`);
 }; 

//-------------------------Change offset of categories and questions --------------------

app.changeOffset = function() {
     app.offsetValue = 0
     $('.next-question').on('click', function(){
          $('.answer').removeClass('show');
          $('.answer').addClass('hide');
          if (app.offsetValue < 5) {
               app.offsetValue++; 
          } else {
               app.offsetValue = 0;
          }
          app.call(app.categoryChoice, app.offsetValue)
          return app.offsetValue;
     })
}


app.catoffsetValue = 10 // category call offset

app.newCategories = function(){
     $('.change-category').on('click', function() {
          $('.answer').removeClass('show');
          $('.answer').addClass('hide');
          if (app.catoffsetValue < 1000) {
               app.catoffsetValue = app.catoffsetValue + 3;
          } else {
               app.catoffsetValue = 0;
          }
          app.callCategories(app.catoffsetValue)
          return app.catoffsetValue;
     })
}



//-------------------------SELECT CATEGORY FUNCTION--------------------

app.click = function(){

     $('.category').on('click', function() {

          // console.log($(this).find('p')[0].id);          
          app.categoryChoice = $(this).find('p')[0].id;          
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



//-------------------------APP INIT---------------------------

app.init = function(){
     app.click();
     app.changeOffset();
     app.callCategories(app.catoffsetValue);
     app.answerToggle();
     app.newCategories();


};

//-------------------------DOCUMENT READY----------------------

$(function () {
     app.init();
});
