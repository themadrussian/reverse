import './css/bootstrap.min.css';
//import './css/reverse.css';
import './css/custom.css';


import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import { Tab } from 'react-bootstrap';
import { Tabs } from 'react-bootstrap';
import { PageHeader } from 'react-bootstrap';
import { Glyphicon } from 'react-bootstrap';

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

	reShape: function(num) {
		if (num > 0) {
			console.log("reShape (rows x cols): ", num, "x", num);
			this.setState({ rows: num, cols: num, update: 1});
		} else if (num === -1 ){
			//open modal for From color
			this.setState({ showModalA: true, showModalB: false, update: 0})
		} else {
			//open modal for To color
			this.setState({ showModalA: false, showModalB: true, update: 0})
		}
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
			<div className="big-center">
					<PageHeader>
						Reverse All
						<br/>
							<span
								className="boxie"
								onClick={() => this.setState({ showModalA: true, showModalB: false, update: 0})}
								style={{backgroundColor: this.state.colorA}}>
							</span>
							&#10143;
							<span
								className="boxie"
								onClick={() => this.setState({ showModalA: false, showModalB: true, update: 0})}
								style={{backgroundColor: this.state.colorB}}>
							</span>
					</PageHeader>
					<Board
						rows={this.state.rows}
						cols={this.state.cols}
						update={this.state.update}
						colorA={this.state.colorA}
						colorB={this.state.colorB}
					/>

					<div className="modal-container">
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

					<div className="bottom">
						<div
							className="circle"
							onClick={this.reShape.bind(this,3)}
							style={{backgroundColor: this.state.colorA}}>
	      		</div>
						<div className="spacer">&nbsp;</div>
						<div
							className="circle"
							onClick={this.reShape.bind(this,4)}
							style={{backgroundColor: "#000"}}>
	      		</div>
						<div className="spacer">&nbsp;</div>
						<div
							className="circle"
							onClick={this.reShape.bind(this,5)}
							style={{backgroundColor: this.state.colorB}}>
	      		</div>
					</div>
			</div>
		);
	},
});

ReactDOM.render(<App />, document.getElementById('app'));
