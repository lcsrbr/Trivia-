import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getInfoRanking } from '../redux/actions';

class Ranking extends React.Component {
  componentDidMount() {
    this.handlePlayers();
  }

  handlePlayers = () => {
    const storage = JSON.parse(localStorage.getItem('newPlayerRankink'));
    const { getInfo } = this.props;
    getInfo(storage);
  }

  render() {
    const { history, infoRedux } = this.props;
    localStorage.setItem('ranking', JSON.stringify(infoRedux));
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    console.log(ranking);
    return (
      <div className="div-ranking">
        <h1 data-testid="ranking-title">Ranking</h1>
        <div className="tabela shadow p-3 mb-5 bg-body rounded">
          {ranking[0] && ranking.sort((a, b) => b.score - a.score)
            .map((e, index) => (
              <div key={ index } className="ranking">
                <img src={ e.imagem } alt="gravatar" />
                <p data-testid={ `player-name-${index}` }>{e.nome}</p>
                <p data-testid={ `player-score-${index}` }>{ e.score }</p>
              </div>
            ))}
        </div>
        <button
          type="button"
          onClick={ () => history.push('/') }
          data-testid="btn-go-home"
          className="btn btn-success"
        >
          Home
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.string.isRequired,
  getInfo: PropTypes.func.isRequired,
  infoRedux: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  infoRedux: state.game.infoRanking,
});

const mapDispatchToProps = (dispatch) => ({
  getInfo: (payload) => dispatch(getInfoRanking(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Ranking));
