"use strict";
import './index.sass';
import regeneratorRuntime from 'regenerator-runtime';
import App from 'components/App';

const appContainer = document.getElementById('app');
const adToDoForm = document.getElementById('to-do__add_form');

const app = new App({
    name: 'app',
    appContainer,
    adToDoForm,
});

app.render();