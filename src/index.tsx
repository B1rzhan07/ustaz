import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.scss'
import { I18nextProvider } from 'react-i18next'
import i18n from './models/18n/18n'
import { Provider } from 'react-redux'
import { store } from './store/store'
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>{' '}
    </Provider>
  </BrowserRouter>,
)
