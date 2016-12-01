App.Components.ErrorNotification = React.createClass({
  render: function(){
    var message;

    if (this.props.status == 404) {
      message = 'Sorry, no questions can be found at this moment. Please try to create a question first';
    } else {
      message = 'Something went wrong while requesting question data to the server';
    }

    return (
      <div className="container">
        <div className="alert alert-info">
          <h4>Notification:</h4>
          <p>{message}</p>
        </div>
      </div>
    );
  }
});