import './css/reverse.css';

import React from 'react';
import ReactDOM from 'react-dom';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import Tappable from 'react-tappable';

import Board from './components/Board';

const App = React.createClass({
	getInitialState() {
		//return StepStore.getState();
		return {
			animationName: 'push',
			rows: 3,
			cols: 3
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
		this.state.rows = rows;
		this.state.cols = cols;

		console.log("rows:", this.state.rows, "cols:", this.state.cols);

		this.forceUpdate();
	},

	render() {
    const { animationName } = this.state;
		return (
			<div className="big">
        <CSSTransitionGroup transitionName={ animationName }
            transitionEnterTimeout={ 300 } transitionLeaveTimeout={ 300 }>
						<Board rows={this.state.rows} cols={this.state.cols}/>
        </CSSTransitionGroup>
				<div className="bottom">

					<Tappable onTap={this.reShape.bind(null, 3, 3)}>3x3</Tappable><br />
					<Tappable onTap={this.reShape.bind(null, 4, 4)}>4x4</Tappable><br />
					<Tappable onTap={this.reShape.bind(null, 5, 5)}>5x5</Tappable><br />

    		</div>
			</div>
		);
	},
});

ReactDOM.render(<App />, document.getElementById('app'));
