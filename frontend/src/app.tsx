import './assets/Main.scss';
import { useState, useEffect } from 'preact/hooks';
import Cookies from 'js-cookie';

export function App() {
  const [clicks, setClicks] = useState<number>(0);

  function handleClick() {
    setClicks(prevClicks => {
      const newClicks = prevClicks + 1;
      Cookies.set('clicks', newClicks.toString(), { expires: 999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999 });
      return newClicks;
    });
  }

  useEffect(() => {
    const clicksFromCookie = Cookies.get('clicks');
    if (clicksFromCookie) {
      setClicks(parseInt(clicksFromCookie, 10));
    }
  }, []);

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
