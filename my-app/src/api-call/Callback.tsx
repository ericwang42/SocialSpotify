import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Callback() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const token = urlParams.get('access_token');

    if (token) {
      // Store the token somewhere (e.g. in your app's context, or in local storage)

      // Redirect to the profile page
      navigate('/profile');
    }
  }, [location, navigate]);

  return <div>Processing...</div>;
}
