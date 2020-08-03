import React from 'react'
import page404 from '../../Images/404.JPG';

const PageNotFound = () => {
        return (
                <>
                        <img className="mr-3 page-not-found rounded mx-auto d-block"
                                alt="poster"
                                src={page404}
                        />
                        <a href="/" class="badge badge-success page-not-found-home-btn mx-auto d-block">
                                ...back to home...
                        </a>
                </>
        )
}



export default PageNotFound;