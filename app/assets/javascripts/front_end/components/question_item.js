App.Components.QuestionItem = React.createClass({
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
          <a className="btn btn-sm btn-danger" onClick={() => this.props.deleteQuestion(question.get('_id')) }>Delete</a>

          <p className="pull-right">
            <small>Last updated at: {question.get('formatted_updated_at')}</small>
          </p>
        </div>
      </div>
    );
  }
});
