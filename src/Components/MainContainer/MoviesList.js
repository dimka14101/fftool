import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { getMovies } from "../../Actions";

class MoviesList extends Component {
  pageId = 1;
  nextPageId = 2;
  previousPageId = 0;

  componentDidMount = () => {
    this.props.getMoviesAction(this.pageId);
  };

  recalculatePages = () => {
    this.nextPageId = this.pageId;
    this.nextPageId++;
    this.previousPageId = this.pageId;
    this.previousPageId--;
  }

  nextPage = () => {
    window.scrollTo(0, 0);
    this.pageId++;
    this.recalculatePages();
    if (this.pageId >= 1000 && this.pageId <= 0)
      return;
    this.props.getMoviesAction(this.pageId)
  }

  previousPage = () => {
    window.scrollTo(0, 0);
    this.pageId--;
    this.recalculatePages();
    if (this.pageId >= 1000 && this.pageId <= 0)
      return;
    this.props.getMoviesAction(this.pageId)
  }

  

  render = () => {
    const { loaded, movies } = this.props;
    const { nextPage, previousPage,nextPageId, previousPageId } = this;
    return (
      <>
        <div className="panel">
          <div className="panel-heading"></div>
          <div className="panel-body">
            <h3> Top rated </h3>
            {!loaded ? (
              <h2> Loading ... </h2>
            ) : (
                <>
                  {
                    movies.map((item) => (

                      <div key={item.id} className="card border-primary mb-3" style={{ maxWidth: '100%' }}>

                        <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', height: '50px' }}>
                          <NavLink to={`/${item.id}`}>
                            <p className="text-left">{item.title+' ('+item.release_date+')'}</p>
                          </NavLink>
                          <span className="badge badge-secondary text-right" style={{ height: '20px' }}>{item.popularity}</span>
                        </div>

                        <div className="card-body text-primary media">

                          <img
                            className="mr-3"
                            style={{ width: "15%", height: "auto" }}
                            alt="poster"
                            src={"https://image.tmdb.org/t/p/w500" + item.poster_path}
                          ></img>
                          <div className="media-body">
                            {item.overview}
                          </div>

                        </div>
                      </div>


                    ))}
                  <div className="d-flex justify-content-center">
                    { previousPageId >=1 ? (
                       <button type="button" className="btn btn-md btn-primary" onClick={previousPage} style={{width:'20%', margin:'1%'}}>Previous Page ({previousPageId})</button>
                    ) : (
                      <></>
                    )
                    }
                    <br></br>
                    <button type="button" className="btn btn-md btn-primary" onClick={nextPage} style={{width:'20%', margin:'1%'}}>Next Page ({nextPageId})</button>
                  </div>

                </>
              )}
          </div>
        </div>
      </>
    );
  };
}

const mapStateToProps = (state) => ({
  movies: state.movies.movies,
  loaded: state.movies.moviesLoaded,
});

const mapDispatchToProps = (dispatch) => ({
  getMoviesAction: (pageId) => {
    dispatch(getMovies(pageId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MoviesList);
