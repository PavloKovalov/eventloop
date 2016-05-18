import React from "react";

const FakeAjaxExample = React.createClass({
  getInitialState: function() {
    return {
      users: []
    };
  },
  alert: function() {
    alert('he there!');
  },
  clean: function() {
    this.setState({
      users: []
    });
  },
  loadUsers: function() {
  	const now = Date.now();
    while (Date.now() - now < 3000) {

    }

    this.setState({
      users: [
        { firstname: 'Walter', lastname: 'White' },
        { firstname: 'Jessy', lastname: 'Pinkman' },
        { firstname: 'Saul', lastname: 'Goodman' }
      ]
    });
  },
  render: function() {
    const containerStyles={
      position: 'relative',
      minHeight: '50vh',
      backgroundColor: '#999',
      border: '5px solid #eee',
      borderTopWidth: '20px',
      borderRadius: '4px 4px 0 0',
      paddingTop: '20px'
    };

    const users = this.state.users;
    let resetButton;
    if (users.length) {
      resetButton = <button onClick={this.clean}>reset</button>
    }

    return (
    	<div style={containerStyles}>
        {resetButton}
        <button onClick={this.loadUsers}>load users</button>
        <button onClick={this.alert}>alert</button>
        <ul>
          {users.map(user =>
              <li>{user.firstname} {user.lastname}</li>
          )}
        </ul>
    	</div>
    );
  },
});

export default FakeAjaxExample;
