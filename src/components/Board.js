import React from 'react';
import Tappable from 'react-tappable';

import { SliderPicker } from 'react-color';


var Board = React.createClass({
  getInitialState: function(){
    return {
      color: [],
      won: "",
      steps: 0,
      colorA: 'red',
      colorB: 'green',
      //update: this.props.update,
    };
  },

  resetColors: function(reset) {
    for (var i = 0; i < this.props.cols*this.props.rows; i++) {
      if(reset === 0) {
        //force reset on everything
       this.state.color[i]=this.state.colorA;
      } else {
        //only fill out undefined
        if (this.state.color[i] === undefined) {
          this.state.color[i]=this.state.colorA;
        }
      }
    };

  },

  componentWillMount: function() {
    this.resetColors(0);
    console.log('Inside Board componentWillMount: ', this.state.color);
  },

  componentWillReceiveProps: function(nextProps){
    //compare new and old props
    console.log("new props update:", nextProps.update);
    if (nextProps.update === 1){
      //refill the Array
      this.resetColors(0);
      this.state.steps = 0; //reset step counter
      this.state.won="";

    }
  },

  changeColor: function(id) {
    if (this.state.color[id] === this.state.colorA) {
      this.state.color[id] = this.state.colorB;
    } else {
      this.state.color[id] = this.state.colorA;
    }

  },

  handleTap: function(id, row, col){
    console.log('pressed row:', row, ' col: ', col, ' id: ', id, 'and color was: ', this.state.color[id]);

    //step counter
    this.state.steps++;
    this.state.won="";

    // change the pressed button
    this.changeColor(id);

    // now change colors on all neighbors

    // one to the right: same row, col+1. check col+1 < this.props.cols.
    if ( (col + 1) < this.props.cols ) {
      this.changeColor(this.props.rows*row + (col + 1));
      console.log('changing: right', this.props.rows*row + (col + 1));
    }
    // one to the left: same row, col-1. check col-1 >= 0
    if ( (col - 1) >= 0 ) {
      this.changeColor(this.props.rows*row + (col - 1));
      console.log('changing: left', this.props.rows*row + (col - 1));
    }
    // one on top: same col, row-1. check row-1 >= 0
    if ( (row - 1) >= 0 ) {
      this.changeColor(this.props.rows*(row-1) + col);
      console.log('changing: top', this.props.rows*(row-1) + col);
    }
    // one below: same col, row+1, check row+1 < this.props.rows
    if ( (row + 1) < this.props.rows ) {
      this.changeColor(this.props.rows*(row+1) + col);
      console.log('changing: bottom', this.props.rows*(row+1) + col);
    }

    // and re-render the Board
    this.forceUpdate();
  },

  componentDidUpdate: function() {
    // check that we have an all green event!
    var checker = new Array(this.props.cols*this.props.rows);
    for (var i=0; i<this.props.cols*this.props.rows; i+=1){
      checker[i] = this.state.color[i];
    }

    // now see if there is 'colorA' anywhere in checker
    if (!checker.includes(this.state.colorA)) {
      // No 'colorA' found? VICTORY
      console.log('Checker dimensions: ', this.props.cols, 'by', this.props.rows);
      //alert("Well Done! Steps: ", this.state.steps);
      this.state.won = "Well Done!";

      //Now, reset back to default
      this.resetColors(0);

      //re-render
      this.forceUpdate();
    }

  },

  render: function() {
    //fix this.state.color and fill undefined with 'this.state.colorA'
    if (this.props.update === 1 && this.state.update === 0){
      this.resetColors(0);
      this.state.update = 1;
    } else {
      this.resetColors(1);
    }

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
          <br />
          Steps: {this.state.steps}
          <div className="ColorPicker" >
            <br />
            <SliderPicker />
          </div>
          <div className="won">
            {this.state.won}
          </div>
        </div>
    );
  }
});

module.exports = Board;
