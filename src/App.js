import './assets/scss/main.scss';
import { HashRouter as Router, Redirect, Route, Switch } from 'react-router-dom'

import { AppHeader } from './cmps/AppHeader'

//PAGES
import { HomePage } from './views/HomePage'
import { StatisticPage } from './views/StatisticPage'
import { ContactPage } from './views/ContactPage'
import { ContactDetails } from './views/ContactDetails'
import { ContactEdit } from './views/ContactEdit'
import { LoginSignupPage } from './views/LoginSignupPage'
import { userService } from './services/user.service'
import { useDispatch } from 'react-redux';
import { loadLoggedInUser } from './store/actions/user.actions';

function PrivateRoute(props) {
  const user = userService.getLoggedInUser()
  const dispatch = useDispatch()
  if(!user) return <Redirect to='/loginSignup' />
  dispatch(loadLoggedInUser())
  return <Route {...props} />
}

function App() {
  return (
    <Router>
      <div className="main-app">
        <AppHeader />

        <section className='main-container'>
          <Switch>
            <Route path="/contact/edit/:id?" component={ContactEdit} />
            <Route path="/contact/:id" component={ContactDetails} />
            <PrivateRoute path="/contact/" component={ContactPage} />
            <Route path="/loginSignup/" component={LoginSignupPage} />
            <PrivateRoute path="/dashboard/" component={StatisticPage} />
            {/* <Route path="/about" component={About} /> */}
            <PrivateRoute path="/" component={HomePage} />
          </Switch>
        </section>

        <footer className='app-footer'>
          <small>
            CR ...
          </small>
        </footer>
      </div>
    </Router>
  )
}

export default App;
