
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
               // value: 400,
               // count: 4,
          }
     }).then((res) => {
          app.questionList = res;
          console.log(app.questionList);
          // app.questionList.map((item) => {
          //      console.log(`CATEGORY: ${item.category.title}`)
          //      console.log(`HERE IS THE QUESTION: ${item.question}
          //                ANSWER: ${item.answer}  ${item.value}
          //                `)
          // })
     });
}


app.click = function(){

     $('.category').on('click', function() {
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