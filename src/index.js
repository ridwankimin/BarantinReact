import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './assets/vendor/fonts/fontawesome.css'
import './assets/vendor/css/rtl/core.css'
import './assets/vendor/css/rtl/theme-default.css'
import './assets/css/demo.css'
import './assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.css'
import './assets/vendor/libs/flatpickr/flatpickr.css'
import './assets/vendor/libs/rateyo/rateyo.css'
// import './assets/vendor/libs/spinkit/spinkit.css'
import './assets/vendor/css/pages/wizard-ex-checkout.css'
import './assets/vendor/libs/jquery/jquery.js'
import './assets/vendor/js/bootstrap.js'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <App />
  </>
  // <React.StrictMode>
  // </React.StrictMode>
);
