
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

app.call = function (categoryID) {
     $.ajax({
          url: `${app.url}clues`,
          method: 'GET',
          data: {
               category: categoryID,
               // offset: 100,
               // value: 400,
               // count: 4,
          }
     }).then((res) => {
          app.displayResults(res);
          // console.log(res);
          
     });
}


// console.log(app.questionList)
//Print results

app.displayResults = function (questions) {
     app.fiveQuestions = questions.slice(0,1);
     
          app.fiveQuestions.forEach((q) => {
               $('.questions-list').append(
          `<li class="question">
               <p>ID: ${q.id}<p> 
               <p>Catagory: ${q.category.id} -- ${q.category.title} <p> 
               <p>---</p>
               <p>Question: ${q.question}<p> 
               <p>Answer: ${q.answer}<p> 
               <p>-------------------------------------------------</p>
          </li>`
               )
          }); 
}

//-------------------------SELECT CATEGORY FUNCTION--------------------

app.click = function(){

     $('.category').on('click', function() {
          $('.questions-list').empty();
          app.categoryChoice = $(this)[0].id;
          console.log(app.categoryChoice);
          // console.log($(this));
          app.call(app.categoryChoice)
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