import React from 'react';
import Tappable from 'react-tappable';

var Board = React.createClass({
  getInitialState: function(){
    return {
      color: [],
    };
  },

  componentWillMount: function() {
    this.setState({red: this.props.cols*this.props.rows});
    this.setState({green: 0});
    for (var i = 0; i < this.props.cols*this.props.rows; i++) {
       this.state.color[i]='red';
    };
    console.log('Inside Board componentWillMount: ', this.state.color);
  },

  changeColor: function(value, row, col) {
    if (this.state.color[value] === 'red') {
      this.state.color[value] = 'green';
    } else {
      this.state.color[value] = 'red';
    }
    console.log('pressed row:', row, ' col: ', col, ' id: ', value, 'and color is now: ', this.state.color[value]);
    this.forceUpdate();
  },

  render: function() {
    var k = 0;
    var row = new Array;

    for (var i=0; i<this.props.cols*this.props.rows; i+=Number(this.props.cols)) {
      row[k] = [...Array(Number(this.props.cols)).keys()].map(function(item,index){
        return (
          <Tappable
              key={((Number(this.props.cols)*k)+index)}
              onTap={this.changeColor.bind(null, ((this.props.cols*k)+index), k, index)}
              className="cell"
              style={{backgroundColor: this.state.color[((Number(this.props.cols)*k)+index)]}}>
              {((Number(this.props.cols)*k)+index)}
          </Tappable>
        );
      }.bind(this));
      k = k + 1;
    };

    return (
        <div className="table">
          {
            row.map(function(_row,index){
              return (
                  <div className="row" key={index}>
                  {_row}
                  </div>
                )
            })
          }
        </div>
    );
  }
});

module.exports = Board;
