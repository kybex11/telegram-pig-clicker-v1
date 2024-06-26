import './assets/Main.scss';
import { useState, useEffect } from 'preact/hooks';
import Cookies from 'js-cookie';

export function App() {
  const [clicks, setClicks] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [perTap, setPerTap] = useState<number>(1);
  const [perHour, setPerHour] = useState<number>(0);

  function handleClick() {
    setClicks(prevClicks => {
      const newClicks = prevClicks + perTap;
      Cookies.set('clicks', newClicks.toString(), { expires: 999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999 });
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
      <div className="loadingScreen">
        <div className="centered-div">
          <h1 className="pig">🐷</h1>
          <h1>Pig</h1>
          <h2>Earner</h2>
        </div>
        <div className="footer">
          <h3>Designed for Phone's</h3>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="clicks-view">
        <h1>⚡{clicks}</h1>
      </div>
      <div className="click-radius">
        <button onClick={handleClick}>🐷</button>
      </div>
      <div className="footer centered-div">
        <div className="bottom-div">
          <div className="bottom-div-divs">
            <h5>per hour</h5>
            <h6>⚡0</h6>
          </div>
          <div className="bottom-div-divs">
            <h5>per tap</h5>
            <h6>⚡{perTap}</h6>
          </div>
        </div>
      </div>
    </>
  );
}
