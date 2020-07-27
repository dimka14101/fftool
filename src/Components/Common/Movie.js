import React from 'react'


const Movie = ( { match } ) => {
        return(
            <>
                <h1> Movie </h1>
                <h2> ID-- { match.params.id } </h2>
            </>
        )
}



export default Movie;