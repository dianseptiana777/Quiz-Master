class App.Collections.Questions extends Backbone.Collection
  url: '/questions'
  model: App.Models.Question
  comparator: (question)->
    -(new Date(question.get('updated_at')))

