import './css/bootstrap.min.css';
import './css/reverse.css';

import React from 'react';
import ReactDOM from 'react-dom';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import Tappable from 'react-tappable';
//import {ModalContainer, ModalDialog} from 'react-modal-dialog';
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
		// if(document.getElementById("rows").value != null &&
		//	 document.getElementById("cols").value != null){
		//}
		console.log("Updating with: ", rows, "rows and ", cols, "cols");
		this.setState({ rows: rows, cols: cols, update: 1});
		//this.state.cols = cols;
		//this.state.update = 1;

		console.log("rows:", this.state.rows, "cols:", this.state.cols);
	},

	handleColorchange: function(which, color) {
		console.log("selected color:", color.hex);

		if (which === "colorFrom") {
			this.setState({ colorA: color.hex, update: 0});
			console.log("and change ColorA to:", this.state.colorA)
		}
		if (which === "colorTo") {
			this.setState({ colorB: color.hex, update: 0});
			console.log("and change ColorB to:", this.state.colorB)
		}

	},

	render() {
    const { animationName } = this.state;
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
	          onClick={() => this.setState({ showModalA: true, showModalB: false})}
						style={{ backgroundColor: this.state.colorA, width: "80px"}}
	        >
	          From
	        </Button>
					&nbsp;&nbsp;
					<Button
	          bsStyle="primary"
	          bsSize="large"
	          onClick={() => this.setState({ showModalB: true, showModalA: false})}
						style={{ backgroundColor: this.state.colorB, width: "80px"}}
	        >
	          To
	        </Button>

	        <Modal
	          show={this.state.showModalA}
	          onHide={close}
	          container={this}
	          aria-labelledby="contained-modal-title"
	        >
	          <Modal.Header closeButton>
	            <Modal.Title id="contained-modal-title">From Color</Modal.Title>
	          </Modal.Header>
	          <Modal.Body>
								<SliderPicker onChange={this.handleColorchange.bind(this,"colorFrom")} color={this.state.colorA}/>
	          </Modal.Body>
	        </Modal>
					<Modal
	          show={this.state.showModalB}
	          onHide={close}
	          container={this}
	          aria-labelledby="contained-modal-title"
	        >
	          <Modal.Header closeButton>
	            <Modal.Title id="contained-modal-title">To Color</Modal.Title>
	          </Modal.Header>
	          <Modal.Body>
								<SliderPicker onChange={this.handleColorchange.bind(this,"colorTo")} color={this.state.colorB}/>
	          </Modal.Body>
	        </Modal>

	      </div>
				<div className="board">
	        <CSSTransitionGroup transitionName={ animationName }
	            transitionEnterTimeout={ 300 } transitionLeaveTimeout={ 300 }>
							<Board
								rows={this.state.rows}
								cols={this.state.cols}
								update={this.state.update}
								colorA={this.state.colorA}
								colorB={this.state.colorB}
								/>
	        </CSSTransitionGroup>
				</div>


			</div>
		);
	},
});

ReactDOM.render(<App />, document.getElementById('app'));
