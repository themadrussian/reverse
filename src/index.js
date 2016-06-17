import './css/reverse.css';

import React from 'react';
import ReactDOM from 'react-dom';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import Tappable from 'react-tappable';

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
			colorB: 'green'
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

	handleColorchange: function(color) {
		this.setState({ colorA: color.hex, update: 0});
		console.log("selected color:", color.hex);
		console.log("and change ColorA to:", this.state.colorA)
	},


	render() {
    const { animationName } = this.state;
		return (
			<div className="_all">
				<div className="settings">
    			<a href="settings.js"><img src="./img/Gear.png" height="30"/></a>
    		</div>
				<div className="top_bar">
					<Tappable className="button" component="button" onTap={this.reShape.bind(null, 3, 3)}>3x3</Tappable>&nbsp;
					<Tappable className="button" component="button" onTap={this.reShape.bind(null, 4, 4)}>4x4</Tappable>&nbsp;
					<Tappable className="button" component="button" onTap={this.reShape.bind(null, 5, 5)}>5x5</Tappable>
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
				<div className="ColorPicker" >
					<br />
					<SliderPicker onChange={this.handleColorchange} color={this.state.colorA}/>
				</div>
			</div>
		);
	},
});

ReactDOM.render(<App />, document.getElementById('app'));
