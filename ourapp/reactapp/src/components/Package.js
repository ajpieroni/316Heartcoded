import React from 'react';
import "./Package.css";

const Package = ({pkgNum = 1, trackingNum = "Error Loading"}) => {
    return <div className="Package">
        <p>
        Package {pkgNum}
        <br aria-hidden = "true" />
        Tracking: {trackingNum}
        </p>
    </div>
}

export default Package;