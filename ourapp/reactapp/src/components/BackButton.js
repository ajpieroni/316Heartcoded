// import { useLocation, useHistory } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';

export function BackButton() {
    const navigate = useNavigate();
  
    return (
      <button onClick={() => navigate(-1)}>Go Back</button>
    );
}
