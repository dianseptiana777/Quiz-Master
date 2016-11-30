var BackboneMixin = {
  componentDidMount: function () {
    this.getBackboneCollections().forEach(function (collection) {
      collection.on('add remove change', this.forceUpdate.bind(this, null));
    }, this);
  },

  componentWillUnmount: function () {
    this.getBackboneCollections().forEach(function (collection) {
      collection.off(null, null, this);
    }, this);
  }
};

App.Components.QuestionsPage = React.createClass({
  mixins: [BackboneMixin],

  getInitialState() {
    return { editedQuestionId: null, question: null };
  },

  componentDidMount() {
    this.props.questions.fetch();
    $(this.refs.questionEditor).summernote({ height: 150 });
  },

  getBackboneCollections: function(){
    return [this.props.questions];
  },

  showQuestionForm: function(event){
    this.refs.questionModalTitle.innerHTML = "New Question";
    this.setState({ editedQuestionId: null });
    $(this.refs.questionEditor).summernote('code', '');
    $(this.refs.answerField).val('');
    $(this.refs.questionModal).modal('show');
  },

  showEditQuestionForm: function(id){
    this.refs.questionModalTitle.innerHTML = "Edit Question";
    var currentQuestion = this.props.questions.get(id);
    this.setState({ editedQuestionId: currentQuestion.get('_id') });
    $(this.refs.questionEditor).summernote('code', currentQuestion.get('question'));
    $(this.refs.answerField).val(currentQuestion.get('answer'));
    $(this.refs.questionModal).modal('show');
  },

  submitQuestionForm: function(event){
    if ($(this.refs.questionEditor).summernote('isEmpty')) {
      alert('Question can\'t be blank');
      return false;
    }

    if (!this.refs.answerField.value.trim()) {
      alert('Answer can\'t be blank');
      return false;
    }

    var params = {
      question: $(this.refs.questionEditor).summernote('code'),
      answer: $(this.refs.answerField).val().trim()
    };

    if (this.state.editedQuestionId) {
      var currentQuestion = this.props.questions.get(this.state.editedQuestionId);
      params.updated_at = new Date();
      currentQuestion.set(params);
      currentQuestion.save({ wait: true });
      this.setState({ editedQuestionId: null });
      this.props.questions.sort();
    } else {
      this.props.questions.create(params, { wait: true });
    }

    $(this.refs.questionModal).modal('hide');
  },

  showQuestionDetails: function(id){
    var currentQuestion = this.props.questions.get(id);
    this.setState({ question: currentQuestion });
    $(this.refs.questionDetailsModal).modal('show');
  },

  render: function(){
    var items = this.props.questions.map((question) => {
      return React.createElement(
        App.Components.QuestionItem,
        {
          key: question.get('_id'),
          question: question,
          editQuestion: this.showEditQuestionForm,
          showQuestion: this.showQuestionDetails
        }
      );
    });

    return (
      <div className="container">
        <h1>Question List</h1>

        <hr/>

        <div className="row">
          <div className="col-md-12">
            <a className="btn btn-primary" onClick={this.showQuestionForm}>Add New Question</a>
          </div>
        </div>

        <br/>

        <div className="row">
          <div className="col-md-12">
            {items}
          </div>
        </div>

        <div ref="questionModal" className="modal fade" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
                <h4 className="modal-title" ref="questionModalTitle">Form Question</h4>
              </div>
              <div className="modal-body">
                <form ref="questionForm">
                  <div className="form-group">
                    <label>Question</label>
                    <div ref="questionEditor"></div>
                  </div>
                  <div className="form-group">
                    <label>Answer</label>
                    <input type="text" ref="answerField" className="form-control" placeholder="Answer"/>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary" onClick={this.submitQuestionForm}>Save changes</button>
              </div>
            </div>
          </div>
        </div>

        <div ref="questionDetailsModal" className="modal fade" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
                <h4 className="modal-title">Question Details</h4>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <div
                      dangerouslySetInnerHTML={{ __html: (this.state.question && this.state.question.get('question')) }}></div>
                  </div>
                  <div className="form-group">
                    <label>Answer:</label> {this.state.question && this.state.question.get('answer')}
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});
