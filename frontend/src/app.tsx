import './assets/Main.scss';
import { useState, useEffect, useRef } from 'preact/hooks';
import Cookies from 'js-cookie';
import { Upgrade } from './components/upgrade';

export function App() {
  const [clicks, setClicks] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [perTap, setPerTap] = useState<number>(1);
  const [perHour, setPerHour] = useState<number>(0);
  const [showUpgrade, setShowUpgrade] = useState<boolean>(false);
  const [perHourCount, setPerHourCount] = useState<number>(500);
  const [perTapCount, setPerTapCount] = useState<number>(2500);
  const clicksRef = useRef(clicks); 

  function handleClick() {
    setClicks(prevClicks => {
      const newClicks = prevClicks + perTap;
      Cookies.set('clicks', newClicks.toString(), { expires: 365 });
      clicksRef.current = newClicks; 
      return newClicks;
    });
  }  

  function setPerTapFunc() {
    if (Math.floor(clicks) > perTapCount) {
      setClicks(clicks - perTapCount);
      setPerTapCount(perTapCount * 1.00099);
      setPerTap(perTap + 1);
      Cookies.set('perTap', perTap.toString(), { expires: 365 });
      Cookies.set('perTapCount', perTapCount.toString(), { expires: 365 });
    }
  }

  function setPerHourFunc() {
    if (Math.floor(clicks) > perHourCount) {
      setClicks(clicks - perHourCount);
      setPerHourCount(perHourCount * 1.00099);
      setPerHour(perHour + 1);
      Cookies.set('perHour', perHour.toString(), { expires: 365 });
      Cookies.set('perHourCount', perHourCount.toString(), { expires: 365 });
    }
  }

  const toggleUpgrade = () => {
    setShowUpgrade((prevState) => !prevState);
  }

  useEffect(() => {
    clicksRef.current = clicks;
    
    if (perHour > 0) {
      const loop = () => {
        setTimeout(() => {
          setClicks(prevClicks => {
            const newClicks = prevClicks + perHour / 3600;
            clicksRef.current = newClicks; 
            Cookies.set('clicks', newClicks.toString(), { expires: 365 });
            return newClicks;
          });
          loop();
        }, 1000); 
      }
      loop();
    }

    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);

    const clicksFromCookie = Cookies.get('clicks');
    if (clicksFromCookie) {
      setClicks(parseInt(clicksFromCookie, 10));
    }
    const perTapFromCookie = Cookies.get('perTap');
    if (perTapFromCookie) {
      setPerTap(parseInt(perTapFromCookie, 10));
    }
    const perHourFromCookie = Cookies.get('perHour');
    if (perHourFromCookie) {
      setPerHour(parseInt(perHourFromCookie, 10));
    }
    const perTapCountFromCookie = Cookies.get('perTapCount');
    if (perTapCountFromCookie) {
      setPerTapCount(parseInt(perTapCountFromCookie, 10));
    }
    const perHourCountFromCookie = Cookies.get('perHourCount');
    if (perHourCountFromCookie) {
      setPerHourCount(parseInt(perHourCountFromCookie, 10));
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
    <h1>⚡{Math.floor(clicks)}</h1>
    </div>
      {showUpgrade ? (
        <Upgrade perTap={setPerTapFunc} perHour={setPerHourFunc} taps={perTapCount} hours={perHourCount}/>
      ) : (
        <>
      <div className="click-radius">
        <button onClick={handleClick}>🐷</button>
      </div>
      </>
      )}
            <div className="footer centered-div">
        <div className="bottom-div">
          <div className="bottom-div-divs">
            <h5>per hour</h5>
            <h6>⚡{perHour}</h6>
          </div>
          <div className="bottom-div-divs">
            <h5>per tap</h5>
            <h6>⚡{perTap}</h6>
          </div>
        </div>
      </div>
      <div className="upgrade-button" onClick={toggleUpgrade}>
        <span>
          {showUpgrade ? 'Main' : 'Upgrade'}
        </span>
      </div>      
    </>
  );
}
