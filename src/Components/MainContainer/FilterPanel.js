import React, { Component } from "react";
import { connect } from "react-redux";
import { getGenres, filterByGenre } from "../../Actions";

class FilterPanel extends Component {

    componentDidMount = () => {
        this.props.getGenresAction();
    };

    render = () => {
        const { loaded, genres } = this.props;
        const { getByGenreAction } = this.props;

        return (
            <>
                <div className="panel">
                    <div className="panel-heading"></div>
                    <div className="panel-body">
                        <h3> FilterPanel </h3>
                        {
                            !loaded ? (
                                <h2> Loading ... </h2>
                            ) : (
                                    <div>
                                        <label htmlFor="genres">Choose a genre:</label>
                                        <select id="genres" name="genres"
                                            onChange={getByGenreAction()}
                                        >
                                            {
                                                genres.map(item => {
                                                    return (
                                                        <option
                                                            key={item.id}
                                                            value={item.id}
                                                        >
                                                            {item.name}
                                                        </option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                )
                        }
                    </div>
                </div>
            </>
        );
    }
};

const mapStateToProps = (state) => ({
    genres: state.genres.genres,
    loaded: state.genres.genresLoaded,
});

const mapDispatchToProps = (dispatch) => ({
    getGenresAction: () => {
        dispatch(getGenres);
    },
    getByGenreAction: () => (e) => {
        dispatch(filterByGenre(e.target.value))
    }
});


export default connect(mapStateToProps, mapDispatchToProps)(FilterPanel);
