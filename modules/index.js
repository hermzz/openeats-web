import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { IntlProvider } from 'react-intl'
import { BrowserRouter, Routes, Route, redirect } from "react-router-dom";
import history from './common/history'
import store from './common/store'
import registerServiceWorker from './registerServiceWorker';

// Load components
import Header from './header/containers/Header'
import Demo from './base/components/Demo'
import Footer from './base/components/Footer'
import NotFound from './base/components/NotFound'
import Login from './account/containers/Login'
import News from './news/components/News'
import List from './list/containers/List'
import Browse from './browse/containers/Browse'
import Form from './recipe_form/containers/Form'
import RecipeView from './recipe/components/RecipeView'
import Menu from './menu/containers/Menu'

// Load required polyfills
import {
  browserSupportsAllFeatures,
  loadPolyFills
} from './common/polyfill'

import "./base/css/core.scss";
import "./base/css/print.scss";

// Load default locale data;
/*import en from 'react-intl/locale-data/en';
import es from 'react-intl/locale-data/es';
import de from 'react-intl/locale-data/de';
import fr from 'react-intl/locale-data/fr';
addLocaleData([...en, ...es, ...de, ...fr]);*/
const messages = require('./locale/'+process.env.NODE_LOCALE+'.json');

const main = (
  <IntlProvider locale={ process.env.NODE_LOCALE } messages={ messages }>
    <Provider store={ store }>
      <div>
        <div id="content">
          <BrowserRouter history={ history }>
            <div>
              <Header />
              { process.env.NODE_ENV === 'demo' ? <Demo /> : '' }
              <Routes>
                <Route exact path='/' element={<News />} />
                <Route path='/news' element={<News />} />
                <Route path='/login' element={<Login />} />
                <Route path='/browse' element={<Browse />} />

                <Route path='/recipe/create' element={<Form />} />
                <Route path='/recipe/edit/:recipe' element={<Form />} />
                <Route path='/recipe/:recipe' element={<RecipeView />} />

                <Route path='/list/:list' element={<List />} />
                <Route path='/list' element={<List />} />

                <Route path='/Menu' element={<Menu />} />

                <Route path='/NotFound' element={<NotFound />} />
                <Route path="*" action={ redirect("/NotFound") } />
              </Routes>
            </div>
          </BrowserRouter>
        </div>
        <Footer />
      </div>
    </Provider>
  </IntlProvider>
);

const entryPoint = () => {
  render(main, document.getElementById('app'));
  // registerServiceWorker();
};

if (browserSupportsAllFeatures()) {
  // Browsers that support all features run `entryPoint()` immediately.
  entryPoint();
} else {
  // All other browsers loads polyfills and then run `entryPoint()`.
  loadPolyFills(entryPoint);
}

registerServiceWorker();
