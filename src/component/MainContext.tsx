import React, { Dispatch, useEffect } from 'react';
import { connect } from 'react-redux';
import { IDispatch, IRootState } from '../store/store';

const mapState = (state: IRootState) => ({
	count: state.count,
	annotation: state.annotation,
});
const mapDispatch = (dispatch: IDispatch) => ({
	increment: () => dispatch.count.increment(1),
	incrementAsync: () => dispatch.count.incrementAsync(1),
	updateAnnotation: dispatch.annotation.update,
});

type IStateProps = ReturnType<typeof mapState>;
type IDispatchProps = ReturnType<typeof mapDispatch>;
type IMainContext = IStateProps & IDispatchProps;

const MainContext = (props: IMainContext) => {
	const { increment, annotation, updateAnnotation, count } = props;
	const handleNe = ()=>{
		updateAnnotation({show: !annotation.show});
	}

	// useEffect(()=>{
	// 	console.log('count modified');
		
	// }, [count])

	useEffect(()=>{
		console.log('annotation modified');
		
	}, [annotation])
	return (
		<div className='ss'>
			<h2>Total Count: {count}</h2>
            <button onClick={increment}> Add </button>
			<h2>Annotasion: {annotation.show && 'ss'}</h2>
            <button onClick={handleNe}> toggle anootaion </button>
		</div>
	);
};

export default connect(mapState, mapDispatch)(MainContext);
