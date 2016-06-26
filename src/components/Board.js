import React from 'react';
import { Modal } from 'react-bootstrap';

import '../css/bootstrap.min.css';
import '../css/custom.css';

var Board = React.createClass({
  getInitialState: function(){
    return {
      color: [],    //array to hold color values
      win: false,   //show victory modal
      steps: 0,     //count steps
    };
  },

  componentWillMount: function() {
    // fill colors array; first time;
    for (var i = 0; i < this.props.cols*this.props.rows; i++) {
      this.state.color[i]=this.props.colorA;
    }
  },

  componentWillReceiveProps: function(nextProps){

    //Update the Board size
    if (nextProps.update === 1){
      console.log("New size, resetting to (rows x cols):", nextProps.rows, "x", nextProps.cols);

      //empty out
      this.state.color=[];
      //refill with current colorA
      for (var i = 0; i < nextProps.rows*nextProps.cols; i++) {
         this.state.color[i]=this.props.colorA;
      }
      //reset step counter and winning flag
      this.state.steps = 0;
      this.state.win=false;
    }

    // Do not upgade the Board size
    if (nextProps.update === 0){
      console.log("New colors:", nextProps.colorA, "or", nextProps.colorB);

      //recolor to match current colors
      for (var i = 0; i < this.props.cols*this.props.rows; i++) {
        if (this.state.color[i] === this.props.colorA) {
          this.state.color[i] =nextProps.colorA;
        } else if (this.state.color[i] === this.props.colorB) {
          this.state.color[i] =nextProps.colorB;
        }
      }
    }
  },

  changeColor: function(id) {
    if (this.state.color[id] === this.props.colorA) {
      this.state.color[id] = this.props.colorB;
    } else {
      this.state.color[id] = this.props.colorA;
    }
  },

  handleTap: function(id, row, col){
    console.log('pressed {row, col, id}:', row, col, id);

    //step counter
    this.state.steps++;

    // Change the pressed button
    this.changeColor(id);

    // Change colors on all neighbors

    // one to the right: same row, col+1. check col+1 < this.props.cols.
    if ( (col + 1) < this.props.cols ) {
      this.changeColor(this.props.rows*row + (col + 1));
      //console.log('changing: right', this.props.rows*row + (col + 1));
    }
    // one to the left: same row, col-1. check col-1 >= 0
    if ( (col - 1) >= 0 ) {
      this.changeColor(this.props.rows*row + (col - 1));
      //console.log('changing: left', this.props.rows*row + (col - 1));
    }
    // one on top: same col, row-1. check row-1 >= 0
    if ( (row - 1) >= 0 ) {
      this.changeColor(this.props.rows*(row-1) + col);
      //console.log('changing: top', this.props.rows*(row-1) + col);
    }
    // one below: same col, row+1, check row+1 < this.props.rows
    if ( (row + 1) < this.props.rows ) {
      this.changeColor(this.props.rows*(row+1) + col);
      //console.log('changing: bottom', this.props.rows*(row+1) + col);
    }

    // and re-render the Board
    this.forceUpdate();


    // check victory condition
    this.checkVictory();
  },

  checkVictory: function() {
    this.state.win = !this.state.color.reduce((a,b)=> (a || (b === this.props.colorA)), false);

    if (this.state.win === true) {
      console.log('Victory!');
    }
  },

  render: function() {

    let closeme = () => {
      this.setState({ win: false, steps: 0});
      this.props.victory();
    }

    var k = 0;
    var row = new Array;

    for (var i=0; i<this.props.cols*this.props.rows; i+=Number(this.props.cols)) {
      row[k] = [...Array(Number(this.props.cols)).keys()].map(function(item,index){
        return (
          <span
            key={((Number(this.props.cols)*k)+index)}
            className="boxie_large"
            onClick={this.handleTap.bind(null, ((this.props.cols*k)+index), k, index)}
            style={{backgroundColor: this.state.color[((Number(this.props.cols)*k)+index)]}}>
          </span>

        );
      }.bind(this));
      k = k + 1;
    };

    return (
        <div className="container game">
          {
            row.map(function(_row,index){
              return (
                  <div className="rowww" key={index}>
                  {_row}
                  </div>
                )
            })

          }
          <div className="modal-container">
            <Modal
  	          show={this.state.win}
  	          onHide={closeme}
  	          container={this}
  	          aria-labelledby="contained-modal-title">
  	          <Modal.Body>
  								Well Done!<br />
                  It only took you {this.state.steps} steps.
  	          </Modal.Body>
  	        </Modal>
          </div>

        </div>
    );
  }
});

module.exports = Board;
