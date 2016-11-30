App.Components.QuestionItem = React.createClass({
  deleteQuestion: function(){
    var confirmed = confirm("Are you sure you want to delete this question?");

    if (confirmed) {
      this.props.question.set('_id', this.props.question.get('_id'));
      this.props.question.destroy({ wait: true });
    }
  },

  render: function(){
    var question = this.props.question;

    return(
      <div className="panel panel-default">
        <div className="panel-body">{question.get('short_question')}</div>
        <div className="panel-footer">
          <a className="btn btn-sm btn-info" onClick={() => this.props.showQuestion(question.get('_id')) }>Details</a>
          &nbsp;
          <a className="btn btn-sm btn-primary" onClick={() => this.props.editQuestion(question.get('_id')) }>Edit</a>
          &nbsp;
          <a className="btn btn-sm btn-danger" onClick={this.deleteQuestion}>Delete</a>

          <p className="pull-right">
            <small>Last updated at: {question.get('formatted_updated_at')}</small>
          </p>
        </div>
      </div>
    );
  }
});
