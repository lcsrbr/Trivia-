import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import Header from '../component/Header';
import faustaoIndignado from '../imgs/faustaoIndignado.gif';
import faustaoFeliz from '../imgs/faustaoFeliz.gif';

class Feedback extends React.Component {
    state = {
      login: false,
      ranking: false,
    }

    redToLogin = () => {
      this.setState({ login: true });
    }

    redToRanking = () => {
      this.setState({ ranking: true });
    }

    render() {
      const { hit, score } = this.props;
      const { ranking, login } = this.state;
      const three = 3;
      return (
        <div className="div-feedback">
          <Header />
          {hit < three && (
            <p data-testid="feedback-text" className="fs-2">Could be better...</p>
          )}
          {hit >= three && (
            <p data-testid="feedback-text" className="fs-2"> Well Done!</p>
          )}
          <div className="feedback-body">
            {hit < three && (
              <img src={ faustaoIndignado } alt="faustão triste" />
            )}
            {hit >= three && (
              <img src={ faustaoFeliz } alt="faustão feliz" />
            )}
            <div className="placarEBotoes">
              <div className="divPlacar shadow-sm p-3 mb-5 rounded">
                <p data-testid="feedback-total-score">{`Pontuação: ${score}`}</p>
                <p data-testid="feedback-total-question">
                  { `Acertos: ${hit}` }
                </p>
              </div>
              <div className="divBotoes">
                <button
                  type="button"
                  onClick={ this.redToLogin }
                  data-testid="btn-play-again"
                  className="btn btn-secondary"
                >
                  Play Again
                </button>
                <button
                  type="button"
                  onClick={ this.redToRanking }
                  data-testid="btn-ranking"
                  className="btn btn-secondary"

                >
                  Ranking
                </button>
              </div>
            </div>
          </div>
          { ranking && <Redirect to="/ranking" />}
          { login && <Redirect to="/" />}

        </div>
      );
    }
}

const mapStateToProps = (state) => ({
  hit: state.player.assertions,
  score: state.player.score,

});

Feedback.propTypes = {
  hit: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);
