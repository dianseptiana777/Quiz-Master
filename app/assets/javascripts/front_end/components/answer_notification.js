App.Components.AnswerNotification = React.createClass({
  render: function(){
    var notificationClass, message;

    if (this.props.answerCorrect) {
      notificationClass = 'alert alert-success';
      message = 'Congratulations! Your answer is correct';
    } else {
      notificationClass = 'alert alert-danger';
      message = 'Oops! it\'s seems that your answer is incorrect';
    }

    return (
      <div className={notificationClass}>
        <h4>Notification</h4>
        <p>{message}</p>
      </div>
    );
  }
});