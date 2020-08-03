import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import mainLogo from '../../Images/mainLogo.png';
import '../../Styles/Common.css';

class Search extends Component {

  searchQuery = '';

  getBySearch = (e) => {
    this.searchQuery = e.target.value.toLowerCase();
    if (e.keyCode === 13) {
      this.openSearchPage();
    }

  };

  openSearchPage = () => {
    if (this.searchQuery && this.searchQuery.length > 2) {
      const { history } = this.props;
      history.push("/search/" + this.searchQuery)
    }
  }

  render() {
    const { openSearchPage, getBySearch } = this;

    return (
      <div className="row">
        <div className="col-md-3" />
        <div className="col-md-6">
          <nav className="navbar navbar-light bg-light">
            <a className="navbar-brand" href="/">
              <img src={mainLogo} width="30" height="30" className="d-inline-block align-top" alt="" />
              Home
            </a>
            <div className="input-group mb-3 search-input">
              <input
                type="text"
                className="form-control"
                onKeyUp={getBySearch}
                placeholder="Enter at least 3 chars for search"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
              />
              <div className="input-group-append">
                <button
                  className="input-group-text"
                  id="basic-addon2"
                  onClick={openSearchPage}
                >
                  Search
                </button>
              </div>
            </div>
          </nav>
        </div>
        <div className="col-md-3" />
      </div>
    );
  }
}

export default withRouter(Search);
