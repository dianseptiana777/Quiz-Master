//= require ./config/init
//= require_tree ./models/
//= require_tree ./collections/
//= require_tree ./routers/
//= require_tree ./components/

$(document).ready(function(){
  var app_router = new App.Routers.Questions()

  app_router.on('route:renderQuestionsPage', function (actions) {
    var questions = new App.Collections.Questions();

    ReactDOM.render(
      React.createElement(App.Components.QuestionsPage, { questions: questions }),
      $('#quizApp')[0]
    );
  });

  app_router.on('route:renderQuizPage', function (actions) {
    var question = new App.Models.Question();

    ReactDOM.render(
      React.createElement(App.Components.QuizPage, { question: question }),
      $('#quizApp')[0]
    );
  });

  Backbone.history.start();
});
