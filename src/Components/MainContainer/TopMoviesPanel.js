import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { getTopMovies } from "../../Actions";
import loading from '../../Images/inProgress.gif';

class TopMoviesPanel extends Component {
  componentDidMount = () => {
    this.props.getTopMoviesAction();
  };

  render = () => {
    const { topMoviesLoaded, topMovies } = this.props;

    return (
      <>
        <div className="panel">
          <div className="panel-heading"></div>
          <div className="panel-body">
            <h3> Upcoming </h3>
            {!topMoviesLoaded ? ( 
               <img className="mr-3 rounded mx-auto d-block" style={{ width: '45%', height: 'auto' }}
               alt="poster"
               src={loading} />
            ) : (
                <>
                  {topMovies.map((item) => (

                    <div key={item.id} className="card border-primary" style={{ width: '10rem', margin: '1%' }}>
                      <img
                        className="card-img-top"
                        style={{ width: '100%', height: 'auto' }}
                        alt="poster"
                        src={"https://image.tmdb.org/t/p/w500" + item.poster_path}
                      ></img>
                      <div className="card-body">
                        <NavLink to={`/${item.id}`}>
                          <p className="text-center font-weight-bold" style={{fontSize:'12px', margin:0}}>{item.title+' ('+item.release_date+')'}</p>
                        </NavLink>
                      </div>
                    </div>

                  ))}
                </>
              )}
          </div>
        </div>
      </>
    );
  };
}

const mapStateToProps = (state) => ({
  topMovies: state.topMovies.topMovies,
  topMoviesLoaded: state.topMovies.topMoviesLoaded,
});

const mapDispatchToProps = (dispatch) => ({
  getTopMoviesAction: () => {
    dispatch(getTopMovies);
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TopMoviesPanel);
