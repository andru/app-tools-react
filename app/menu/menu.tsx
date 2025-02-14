import { useEffect, useState } from 'react';
import { NavLink } from 'react-router';
// import { useVariables, useTapcart } from '~/webbridge-react/dist/webbridge-react.es';

export function Menu() {

  const [userError, setUserError] = useState<string | null>(null);
  // const { loaded, customer } = useVariables();
  // const { isInitialized } = useTapcart();

  useEffect(() => {

    // FOR THE VANILLA JS TAPCART BUILD 
    const tcInterval = setInterval(() => {
      if (typeof Tapcart === 'undefined') {
        setUserError('Failed to load user data. (TC-NF)');
      } else {
        const tc = Tapcart;
        if (!tc.isInitialized) {
          setUserError(`Failed to load user data. (TC-NI) [${tc.variables?.customer?.id}]`);
        } else {
          if (!tc.variables?.customer?.id) {
            setUserError('Failed to load user data. (TC-USER-NF)');
          } else {
            setUserError(null);
          }
        }
      }
    }, 1000);

    // const tcListener = () => {
    //   setUserError(`TC Initialized: [${Tapcart.variables?.customer?.id}]`);
    // };
    // window.addEventListener("webbridge-loaded", tcListener);

    return () => {
      // window.removeEventListener("webbridge-loaded", tcListener);
      window.clearInterval(tcInterval);
    }

  }, [])

  return (
    <main className="h-full flex pt-4 pb-4 bg-gray-200">
      <ul className="list-none p-5 w-full">
        <li className="bg-white p-2 mb-2">
          <NavLink to="brain-gym/" className="flex border-2 border-purple-700/50 p-5 text-xl text-purple-700 no-underline">
            <span className="flex-1">Brain Gym</span>
            <span className="w-10">+</span>
          </NavLink>
        </li>
        <li className="bg-white p-2 mb-2">
          <NavLink to="fasting-tracker/" className="flex border-2 border-purple-700/50 p-5 text-xl text-purple-700 no-underline">
            <span className="flex-1">Fasting Tracker</span>
            <span className="w-10">+</span>
          </NavLink>
        </li>
        <li className="bg-white p-2 mb-2">
          <NavLink to="questionnaire/" className="flex border-2 border-purple-700/50 p-5 text-xl text-purple-700 no-underline">
            <span className="flex-1">Questionnaire</span>
            <span className="w-10">+</span>
          </NavLink>
        </li>
        {userError ? <div className="w-full p-5 bg-red-50 text-red-500 text-center">
        {userError}
      </div> : null}
      {/* <div className="w-full p-5 bg-red-50 text-red-500 text-center">{loaded} {isInitialized} {customer}</div> */}
      </ul>
    </main>
  );
}
