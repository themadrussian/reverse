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

  changeColor: function(id) {
    if (this.state.color[id] === 'red') {
      this.state.color[id] = 'green';
    } else {
      this.state.color[id] = 'red';
    }

  },

  handleTap: function(id, col, row){
    /*
        Sample: 5, 1, 1
        ID=this.props.cols*col(4*1) + row(1) = 5
        So, neighbors are:
          row+1, col: this.props.cols*col + (row + 1) = 6
          row-1, col: this.props.cols*col + (row - 1) = 4
          row, col+1: this.props.cols*(col+1) + row  = 9
          row, col-1: this.props.cols*(col-1) + row  = 1

        Need to check for positive values
    */
    console.log('pressed row:', row, ' col: ', col, ' id: ', id, 'and color was: ', this.state.color[id]);

    // change the pressed button
    this.changeColor(id);

    // now change colors on all neighbors
    // one to the right
    if ( (this.props.cols*col + (row + 1)) >= 0 ) {
      this.changeColor(this.props.cols*col + (row + 1));
    }
    // one to the left
    if ( (this.props.cols*col + (row - 1)) >= 0 ) {
      this.changeColor(this.props.cols*col + (row - 1));
    }
    // one on top
    if ( (this.props.cols*(col-1) + row) >= 0 ) {
      this.changeColor(this.props.cols*(col-1) + row);
    }
    // one below
    if ( (this.props.cols*(col+1) + row) >= 0 ) {
      this.changeColor(this.props.cols*(col+1) + row);
    }

    // and re-render the Board
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
              onTap={this.handleTap.bind(null, ((this.props.cols*k)+index), k, index)}
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
