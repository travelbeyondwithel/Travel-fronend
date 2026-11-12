import '../../styles/Views.css';

// import { useEffect, useState } from 'react';

import { FaEye } from 'react-icons/fa6';

function Views({ article }) {

    if (!article) return null

    return(

        <div className="views">
            <FaEye className='views-icon' />

            <span className="views-count">
                {article.views ?? 0}
            </span>

            <span className="views-label">
                {article.views === 1 ? 'View' : 'Views'}
            </span>
        </div>

    );
}

export default Views;