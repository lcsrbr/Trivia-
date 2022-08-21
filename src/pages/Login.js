import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { loginUser as loginUserAction,
  loginEmail as loginEmailAction, fetchAPI } from '../redux/actions';
import logo from '../imgs/persons.png';
// import trivia from '../imgs/trivia.png';

class Login extends Component {
state = {
  user: '',
  email: '',
  changeOfButton: true,
  redirect: false,
};

componentDidMount() {
  const { fetch } = this.props;
  fetch();
}

    handleChange = ({ target }) => {
      const { name, value } = target;
      this.setState({
        [name]: value,
      }, this.handleEnableButton);
    };

    handleEnableButton = () => {
      const { email, user } = this.state;
      if (email.length >= 1
        && user.length >= 1) {
        this.setState({
          changeOfButton: false,
        });
      } else {
        this.setState({
          changeOfButton: true,
        });
      }
    };

    clickEventButton = () => {
      const { user, email } = this.state;
      const { loginUser, loginEmail } = this.props;
      loginUser(user);
      loginEmail(email);
      this.setState({ redirect: true });
    }

    renderSettings = () => {
      const { history } = this.props;
      history.push('/settings');
    }

    render() {
      const { user, changeOfButton, email, redirect } = this.state;
      const { token } = this.props;
      return (
        <div className="loginPai">
          <img src={ logo } alt="logo trivia" />
          <form>
            <fieldset className="shadow-lg bg-body rounded">
              {/* <img src={ trivia } className="App-logo" alt="logo trivia" /> */}
              <p className="text-sm-start fw-light fs-1"> Trivia Game !</p>
              <label htmlFor="user">
                <input
                  className="input-user form-control"
                  placeholder="User Name"
                  name="user"
                  data-testid="input-player-name"
                  type="text"
                  onChange={ this.handleChange }
                  value={ user }
                />
              </label>
              <label htmlFor="email">
                <input
                  className="input-email form-control"
                  placeholder="E-mail"
                  name="email"
                  data-testid="input-gravatar-email"
                  type="text"
                  onChange={ this.handleChange }
                  value={ email }
                />
              </label>
              <button
                type="button"
                className="btn btn-success"
                data-testid="btn-play"
                disabled={ changeOfButton }
                onClick={ this.clickEventButton }
                name="Entrar"
                value="Entrar"
              >
                Play
              </button>

              <button
                type="button"
                data-testid="btn-settings"
                className="btn btn-light"
                onClick={ this.renderSettings }
                name="settings"
              >
                Settings
              </button>
              { redirect && token && <Redirect to="/game" /> }
            </fieldset>
          </form>
        </div>
      );
    }
}

const mapDispatchToProps = (dispatch) => ({
  loginUser: (user) => (
    dispatch(loginUserAction(user))),
  loginEmail: (email) => (
    dispatch(loginEmailAction(email))),
  fetch: () => (
    dispatch(fetchAPI())),
});

const mapStateToProps = (state) => ({
  token: state.api.token,
});

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  loginEmail: PropTypes.func.isRequired,
  history: PropTypes.shape(PropTypes.obj).isRequired,
  fetch: PropTypes.func.isRequired,
  // questions: PropTypes.shape(PropTypes.obj).isRequired,
  token: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
