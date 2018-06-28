import React from 'react'
import ReactDOM from 'react-dom'
import configureStore from '../../store'
import { Provider } from 'react-redux'
import AppRouter from '../../routes/AppRouter'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Provider store={configureStore()}>
      <AppRouter />
    </Provider>, 
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
