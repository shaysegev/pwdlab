import React from 'react'
import ReactDOM from 'react-dom'
import store from '../../store'
import { Provider } from 'react-redux'
import AppRouter from '../../routes/AppRouter'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Provider store={store}>
      <AppRouter />
    </Provider>, 
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
