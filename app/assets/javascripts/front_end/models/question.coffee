class App.Models.Question extends Backbone.Model
  urlRoot: '/questions'

  idAttribute: "_id"

  parse: (model)->
    if model.id
      model._id = model.id.$oid;
      delete model['id'];

    if model.updated_at
      model.formatted_updated_at = new Date(model.updated_at).toString();

    # check if the question text is just a string or contains html tags
    short_question = $("<div>#{model.question}</div>").text();

    model.short_question = short_question.substring(0, 200);
    model.short_question += '...' if short_question.length > 200

    return model;

  toJSON: ()->
    question: _.clone(this.attributes)

  getRandom: (options)->
    options = _.extend({parse: true}, options)
    options.url = this.url() + '/get_random'
    model = this
    success = options.success
    options.success = (resp)->
      serverAttrs = if options.parse then model.parse(resp, options) else resp

      if !model.set(serverAttrs, options)
        return false

      if (success)
        success.call(options.context, model, resp, options)

      model.trigger('sync', model, resp, options)

    return this.sync('read', this, options);

  checkAnswer: (options)->
    options = _.extend({validate: true, parse: true}, options)
    options.url = this.url() + '/check_answer'
    wait = options.wait
    attributes = this.attributes

    xhr = this.sync('create', this, options)

    this.attributes = attributes

    return xhr
