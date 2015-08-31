'use strict';
var React = require('react');
var QuestionCard= React.createClass({
  componentDidMount: function() {
    this.record()
  },
  record: function() {
    this.ans = null;
    var node = React.findDOMNode(this.refs['q']);
    this.originalX = node.offsetLeft;
    this.originalY = node.offsetTop;
    this.width = node.clientWidth;
    this.height = node.clientHeight;
  },
  reset: function() {
    this.setState({
      x: 0,
      y: 0,
      dragging: false
    });
    this.ans = null;
  },
  getInitialState: function () {
    return {
      x: 0,
      y: 0,
      dragging: false
    }
  },
  setPosition: function (e) {
    if (!this.state.dragging) return
    this.setState({
      x: this.state.x + (e.pageX - this.drag.x),
      y: this.state.y + (e.pageY - this.drag.y)
    })
    this.drag.x = e.pageX;
    this.drag.y = e.pageY;
    e.stopPropagation()
    e.preventDefault()
  },
  resetPosition: function(e) {
    this.setState({
      dragging: false
    });

    for (var ans in this.props.parent.coords) {
      var mments = this.props.parent.coords[ans];
      var lowerX = mments["x"];
      var lowerY = mments["y"];
      var higherX = lowerX + mments["width"];
      var higherY = lowerY + mments["height"];
      var adjX = this.state.x + this.originalX;
      var adjY = this.state.y + this.originalY;

      if(adjX > lowerX && adjX + this.width < higherX && adjY > lowerY && adjY + this.height < higherY) {
        this.ans = ans;

        var data = { val: this.props.info.id, zone: ans, top: adjY, left: adjX };
        console.log(data);
        var url = this.props.parent.props.runtime.handlerUrl(this.props.parent.props.element, 'do_attempt');
        $.ajax({
          type: 'POST',
          url: url,
          data: JSON.stringify(data),
          success: function(data) {
            this.props.parent.setFeedback(data['feedback']);
          }.bind(this),
        });

        return;
      }
    }

    this.setState({
      x: 0,
      y: 0
    })
    this.ans = null;
    e.stopPropagation()
    e.preventDefault()
  },
  componentDidUpdate: function (props, state) {
    if (this.state.dragging && !state.dragging) {
      document.addEventListener('mousemove', this.setPosition)
      document.addEventListener('mouseup', this.resetPosition)
    } else if (!this.state.dragging && state.dragging) {
      document.removeEventListener('mousemove', this.setPosition)
      document.removeEventListener('mouseup', this.resetPosition)
    }
  },
  _onStartShouldSetResponder: function (e) {
    this.setState({
      dragging: true
    });
    this.drag = {
      x: e.pageX,
      y: e.pageY
    }

    this.props.parent.publishEvent({
        event_type: 'xblock.drag-and-drop-v2.item.picked-up',
        item_id: this.props.info.displayName
    });

    e.stopPropagation()
    e.preventDefault()
  },
  render: function () {
    return (
      <div 
      ref = "q"
      onMouseDown={this._onStartShouldSetResponder}
      style= {{
        transform: 'translate(' + this.state.x + 'px, ' + this.state.y + 'px)',
        borderStyle: 'solid',
        borderWidth: '3px',
        borderColor: '#000',
        height: 100,
        width: 100,
        margin: 3,
        padding: 10,
        backgroundColor: 'white',
        display: 'inline-block'
      }}>
      {this.props.info.displayName}
      </div>
    )}
});
         
module.exports = QuestionCard;