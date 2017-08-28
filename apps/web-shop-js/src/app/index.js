import React from 'react';
import { render } from 'react-dom';
import AppRouter from './utils/AppRouter';

import 'jquery';
import 'babel-polyfill';
import 'animate.css';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import '../style/index.scss';
import '../style/navbar.scss';
import '../style/toolbar.scss';
import '../style/products.scss';
import '../style/cart.scss';
import '../style/bootstrap-float-label.min.css';
import '../style/dialog.scss';
import '../style/product-dialog.scss';




render((
	<AppRouter />
), document.getElementById('root'));
