import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { reducer } from './store';
import { Button } from 'antd';
import Style from '@src/index.module.scss';

if (module && module.hot) {
    module.hot.accept();
}

const storeInstance = createStore(reducer);

export { storeInstance as store };

ReactDOM.render(
    <React.StrictMode>
        <Provider store={storeInstance}></Provider>
        <div className={Style['webpack-root']}>
            <p>hello, webpack, typescript, and react_with_redux.</p> <Button type="primary">with antd</Button>
        </div>
    </React.StrictMode>,
    document.getElementById('root'),
);
