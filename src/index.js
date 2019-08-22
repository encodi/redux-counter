import React, { Component } from 'react';
import { render } from 'react-dom';

import { createStore, bindActionCreators } from 'redux';
import { connect, Provider } from 'react-redux';

import './styles.scss';

// Initial State
const initialState = {
  count: 0,
};

// ACTIONS
const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

// ACTION CREATOR
const increment = () => ({
  type: INCREMENT,
});

const decrement = () => ({
  type: DECREMENT,
});

// REDUCER
const reducer = (state = initialState, action) => {
  if (action.type === INCREMENT) {
    return {
      count: state.count + 1,
    };
  } else if (action.type === DECREMENT) {
    return {
      count: state.count - 1,
    };
  }

  return state;
};

// STORE
const store = createStore(reducer);

// COMPONENT
class Counter extends Component {
  render() {
    const { count, increment, decrement } = this.props;
    console.log(count, increment, decrement);
    return (
      <main className="Counter">
        <p className="count">{count}</p>
        <section className="controls">
          <button onClick={increment}>Increment</button>
          <button onClick={decrement}>Decrement</button>
          <button>Reset</button>
        </section>
      </main>
    );
  }
}

// State for the component only
const mapStateToProps = state => {
  return state; // World state since there is only one thing we care about
};

// Actions auto-binded to dispatcher, Best ever, new versions of react-redux, only if dont need to do other stuff
const mapDispatchToProps = {
  increment,
  decrement,
};

// // Actions binded to the dispatcher, better
// const mapDispatchToProps = dispatch => {
//   return bindActionCreators(
//     {
//       increment,
//       decrement,
//     },
//     dispatch,
//   );
// };

// // Actions for the component only, raw looks ugly
// const mapDispatchToProps = dispatch => {
//   return {
//     increment() {
//       dispatch(increment());
//     },
//     decrement() {
//       dispatch(decrement());
//     },
//   };
// };

// GENERATES HOC for Counter with the state and actions needed
const CounterContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Counter);
// RENDER W PROVIDER store
render(
  <Provider store={store}>
    <CounterContainer />
  </Provider>,
  document.getElementById('root'),
);
