
//CONTENT: 

     //Master object
     //App Init
     //Document Ready

//-------------------------MASTER APP OBJECT AND STEADY VARIABLES--------------------
const app = {};
app.url = "http://jservice.io/api/";

/*----------------------------------------------*/

// console.log("hey there")

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
          // console.log(res);
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

//-------------------------Change offset of questions and categories --------------------

//Question offset change function

app.changeOffset = function() {
     app.offsetValue = 0
     $('.next-question').on('click', function(e){
          e.preventDefault();
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

//category offset change function

app.catoffsetValue = 10 // category call offset

app.newCategories = function(){
     $('.change-category').on('click', function(e) {
          e.preventDefault();
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

          app.offsetValue = 0;
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
     $('.show-answer').on('click', function (e) {
          e.preventDefault();
          $('.answer').removeClass('hide');
          $('.answer').addClass('show');
     });
}

//------------------------- parallax effect --------------------

document.addEventListener('scroll', () => {
     let parent = document.getElementById('parallax-container');
     let children = parent.getElementsByTagName('div');
     for (let i = 0; i < children.length; i++) {
          children[i].style.transform = 'translateY(-' + (window.pageYOffset * i / children.length) + 'px)';
     }
}, false)

//------------ change opacity of start "hand" on scroll down -------

$(window).scroll(function () {
     let heightFromTop = $(this).scrollTop();

     $('.start').css({
          opacity: function () {
               let handHeight = $(this).height(),
                    /* opacity changes based on height of the hand from the height from the top, 
                    multiplied by 0.5 on scroll height from the top,
                    3 + to give some more space for the opacity transition so its not too sudden */
                    opacity = ((3 + (handHeight - heightFromTop) / handHeight) * 0.5);
               return opacity;
          }
     });
});




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
