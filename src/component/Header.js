import React from 'react';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  state = {
    gravatar: '',
  }

  componentDidMount() {
    this.gravatar();
  }

  componentDidUpdate() {
    const { gravatar } = this.state;
    return gravatar && localStorage.setItem('imagem', gravatar);
  }

  gravatar = () => {
    const { emailDoUsuário } = this.props;
    this.setState({ gravatar: `https://www.gravatar.com/avatar/${md5(emailDoUsuário).toString()}` });
  }

  render() {
    const { nomeDoUsuário, score } = this.props;
    const { gravatar } = this.state;
    localStorage.setItem('nome', nomeDoUsuário);
    return (
      <header className="shadow p-3 mb-5 rounded">
        <img
          data-testid="header-profile-picture"
          src={ gravatar }
          alt="imagem gravatar"
        />

        <h3 data-testid="header-player-name" className="headerName">{nomeDoUsuário}</h3>
        <h3 data-testid="header-score" className="headerScore">{ score }</h3>
      </header>
    );
  }
}

Header.propTypes = ({
  emailDoUsuário: PropTypes.string.isRequired,
  nomeDoUsuário: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
});

const mapStateToProps = (state) => ({
  emailDoUsuário: state.user.email,
  nomeDoUsuário: state.user.user,
  score: state.player.score,
});

export default connect(mapStateToProps)(Header);
