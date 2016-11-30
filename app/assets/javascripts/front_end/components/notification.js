App.Components.Notification = React.createClass({
  render: function(){
    var notificationClass, message;

    if (this.props.answerCorrect) {
      notificationClass = 'alert alert-success';
      message = 'Congratulations! Your answer is correct';
    } else {
      notificationClass = 'alert alert-danger';
      message = 'Oops! Good luck next time';
    }

    return (
      <div className={notificationClass}>
        <strong>Notification</strong>
        <p>{message}</p>
      </div>
    )
  }
});