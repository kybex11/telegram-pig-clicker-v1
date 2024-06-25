import './assets/Main.scss';
import { useState, useEffect } from 'preact/hooks';
import Cookies from 'js-cookie';

export function App() {
  const [clicks, setClicks] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  function handleClick() {
    setClicks(prevClicks => {
      const newClicks = prevClicks + 1;
      Cookies.set('clicks', newClicks.toString(), { expires: 999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999 });
      return newClicks;
    });
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);

    const clicksFromCookie = Cookies.get('clicks');
    if (clicksFromCookie) {
      setClicks(parseInt(clicksFromCookie, 10));
    }

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <>
        <div className="loadingScreen">
          <h1>coming soon...</h1>
        </div>
      </>
    )
  }

  return (
    <>
      <div className="clicks-view">
        <h1>{clicks}</h1>
      </div>
      <div className="click-radius">
        <button onClick={handleClick}>🐷</button>
      </div>
    </>
  );
}
