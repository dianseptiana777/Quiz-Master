App.Components.QuizPage = React.createClass({
  getInitialState: function(){
    return { loading: false };
  },

  componentDidMount: function(){
    var that = this;
    this.props.question.getRandom({
      error: function(res){
        that.setState({ error_code: res.status })
      }
    }).done(function(){
      that.setState({ question: that.props.question });
    });

  },

  submitAnswer: function(event){
    if (!this.refs.userAnswer.value.trim()) {
      alert('Answer can\'t be blank');
      return false;
    }

    var userQuestion = new App.Models.Question();
    userQuestion.set('_id', this.state.question.get('_id'));
    userQuestion.set('answer', this.refs.userAnswer.value);
    this.setState({ 'loading': true });

    var that = this;

    userQuestion.checkAnswer({
      success: function(res){
        that.setState({ answerCorrect: res.correct });
        that.refs.userAnswer.value = '';
        that.setState({ 'loading': false });
      }
    });
  },

  changeQuestion: function(){
    var question = new App.Models.Question({ parse: true });
    this.setState({ 'loading': true });

    var that = this;

    question.getRandom().done(function(){
      that.setState({ 'loading': false });

      that.setState({ question: question });
      that.refs.userAnswer.value = '';
      that.setState({ answerCorrect: undefined });
    });
  },

  render: function(){
    var notification, loading;

    // render error notification if error happened when request question to server
    if (this.state.error_code) {
      return React.createElement(App.Components.ErrorNotification, { status: this.state.error_code });
    }

    // render loading if question state hasn't been defined yet
    if (typeof this.state.question == 'undefined') {
      return React.createElement('div', { className: 'loading' });
    }

    // render question page
    if (this.state.loading){
      loading = React.createElement('div', { className: 'loading' });
    }

    if (typeof this.state.answerCorrect != 'undefined'){
      notification = React.createElement(App.Components.AnswerNotification, { answerCorrect: this.state.answerCorrect });
    }

    return (
      <div className="container">
        {loading}

        <div className="col-md-12">
          <h1>Welcome to Quiz Page</h1>
          <h4>In this page, you need to answer to random question displayed</h4>
          <br/>
        </div>

        <div className="col-md-12">
          <div className="panel panel-default">
            <div className="panel-body">
              <div className="col-md-12">
                {notification}

                <h4>Question:</h4>
                <div
                  dangerouslySetInnerHTML={{ __html: this.state.question.get('question') }}>
                </div>
              </div>
              <div className="col-md-12 form-group">
                <h4>Your answer:</h4>
                <input type='text' ref='userAnswer' className="form-control" placeholder='Type your answer here...'/>
              </div>
            </div>

            <div className="panel-footer">
              <a className="btn btn-primary" onClick={this.submitAnswer}>Submit Answer</a>
              &nbsp;
              <a className="btn btn-default" onClick={this.changeQuestion}>Change Question</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
});
