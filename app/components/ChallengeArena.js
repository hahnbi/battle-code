var React = require('react');
var io = require('socket.io-client');
var socket = require('../sockets/socket-helper');
var ChallengeArena = React.createClass({
  componentDidMount: function(){
    var editor = ace.edit('editor');
    editor.setTheme("ace/theme/solarized_light");
    editor.session.setMode("ace/mode/javascript");
    this.props.arenaActions.storeEditor(editor);
    editor.getSession().setUseWrapMode(true);
    editor.$blockScrolling = Infinity;
    var editor2 = ace.edit('editor2');
    editor2.$blockScrolling = Infinity;
    editor2.getSession().setUseWrapMode(true);
    editor2.setOptions({
    readOnly: true,
    highlightActiveLine: false,
    highlightGutterLine: false
})
    editor2.setTheme("ace/theme/solarized_dark")
    this.props.arenaActions.storeEditor(editor2);


    this.props.arena.socket.on('keypress', function(data){
      var array = data.split('');
      var obf = [];
      for(var i =0; i<array.length;i++){
        if(array[i] === ' ' || array[i] === '\n' || array[i] === ')' || array[i] === '(' || array[i] === '{' || array[i] === '}'){
          obf.push(array[i])
        }  else {
           obf.push(String.fromCharCode(Math.floor(Math.random() * 52) + 65 ))

         }

      }
      this.props.arena.editorOpponent.setValue(obf.join(''))
    }.bind(this))


  },
  render: function() {
    var emitSocket = function () {

      if(this.props.arena.editorSolo.getSession().getValue()){
        console.log('emitting socket')
        this.props.arena.socket.emit('update', this.props.arena.editorSolo.getSession().getValue())
      }
    }.bind(this)
    return (
      <div>
      <div id="editor" onKeyPress={emitSocket}className='player'>
      </div>
      <div id="editor2" className='opponent'>
      </div>
    </div>
    )
  },

  componentDidUpdate: function(){

  }
});

module.exports = ChallengeArena;
