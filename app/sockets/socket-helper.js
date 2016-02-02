var io = require('socket.io-client');
var arenaAction = require('../actions/arenaActions');
var actions = require('../constants').action;
//var stagingActions = require('../actions/stagingActions');

var socket = io();
// should be stored on state herestore.dispatch(stagingActions.createSocket());

socket.on('start', function(data){
  store.dispatch({
    type: actions.GET_PROBLEM_SUCCESS,
    payload: data
  });
});

socket.on('eval', function(submissionMessage){
  console.log('eval here', submissionMessage);
  store.dispatch(arenaAction.handleSubmissionResponse(submissionMessage));
});

module.exports = socket;