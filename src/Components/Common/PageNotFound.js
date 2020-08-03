import React from 'react'
import loading from '../../Images/404.JPG';


const PageNotFound = (  ) => {
        return(
            <>
              <img className="mr-3 rounded mx-auto d-block" style={{ width: '30%', height: 'auto' }}
               alt="poster"
               src={loading} />
              <a href="/" class="badge badge-success mx-auto d-block" style={{width: '10%',
    height: '20px'}}>...back to home...</a>
            </>
        )
}
    
    
    
export default PageNotFound;