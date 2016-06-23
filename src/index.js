import './css/bootstrap.min.css';
import './css/reverse.css';

import React from 'react';
import ReactDOM from 'react-dom';
import Tappable from 'react-tappable';
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';

import Board from './components/Board';
import { SliderPicker } from 'react-color';

const App = React.createClass({
	getInitialState() {
		//return StepStore.getState();
		return {
			animationName: 'push',
			rows: 3,
			cols: 3,
			update: 0,
			colorA: 'red',
			colorB: 'blue',
			showModalA: false,
			showModalB: false
		}
	},
	componentWillMount() {
		// Lifecycle function that is triggered just before a component mounts
	},
	componentWillUnmount() {
		// Lifecycle function that is triggered just before a component unmounts
	},

	reShape: function(rows, cols) {
		console.log("reShape (rows x cols): ", rows, "x", cols);
		this.setState({ rows: rows, cols: cols, update: 1});
	},

	handleColorChange: function(which, color) {
		this.setState({update: 0}); //reset this
		if (which === "colorFrom") {
			this.setState({ colorA: color.hex, update: 0});
			console.log("Change ColorA to:", this.state.colorA)
		} else if (which === "colorTo") {
			this.setState({ colorB: color.hex, update: 0});
			console.log("and change ColorB to:", this.state.colorB)
		} else {
			console.log("handleColorChange: recieved incorrect 'which': ", which);
		}
	},

	render() {
		let close = () => this.setState({ showModalA: false, showModalB: false});

		return (
			<div className="_all">
				<div className="top_bar">
					<Tappable className="button" component="button" onTap={this.reShape.bind(null, 3, 3)}>3x3</Tappable>&nbsp;
					<Tappable className="button" component="button" onTap={this.reShape.bind(null, 4, 4)}>4x4</Tappable>&nbsp;
					<Tappable className="button" component="button" onTap={this.reShape.bind(null, 5, 5)}>5x5</Tappable>
    		</div>
				<div className="modal-container">
	        <Button
	          bsStyle="primary"
	          bsSize="large"
	          onClick={() => this.setState({ showModalA: true, showModalB: false, update: 0})}
						style={{ backgroundColor: this.state.colorA, width: "80px"}}>
	          From
	        </Button>
					&nbsp;&nbsp;
					<Button
	          bsStyle="primary"
	          bsSize="large"
	          onClick={() => this.setState({ showModalB: true, showModalA: false, update: 0})}
						style={{ backgroundColor: this.state.colorB, width: "80px"}}>
	          To
	        </Button>

	        <Modal
	          show={this.state.showModalA}
	          onHide={close}
	          container={this}
	          aria-labelledby="contained-modal-title">
	          <Modal.Body>
								<SliderPicker onChange={this.handleColorChange.bind(this,"colorFrom")} color={this.state.colorA}/>
	          </Modal.Body>
	        </Modal>

					<Modal
	          show={this.state.showModalB}
	          onHide={close}
	          container={this}
	          aria-labelledby="contained-modal-title">
	          <Modal.Body>
								<SliderPicker onChange={this.handleColorChange.bind(this,"colorTo")} color={this.state.colorB}/>
	          </Modal.Body>
	        </Modal>

	      </div>
				<div className="board">
					<Board
						rows={this.state.rows}
						cols={this.state.cols}
						update={this.state.update}
						colorA={this.state.colorA}
						colorB={this.state.colorB}
					/>
				</div>
			</div>
		);
	},
});

ReactDOM.render(<App />, document.getElementById('app'));
