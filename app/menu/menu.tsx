import { useEffect, useState } from 'react';
import { NavLink } from 'react-router';

export function Menu() {

  const [userError, setUserError] = useState<string | null>(null);
  useEffect(() => {
    if (typeof Tapcart === 'undefined') {
      setUserError('Failed to load user data. (TC-NF)');
    } else {
      const tc = Tapcart;
      if (!tc.isInitialized) {
        setUserError('Failed to load user data. (TC-NI)');
      } else {
        if (!tc.variables?.customer?.id) {
          setUserError('Failed to load user data. (TC-UNF)');
        } else {
          setUserError(`Failed to load user data. (TC-BU) ${tc.variables?.customer?.id}`);
        }
      }
    }
  })


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
      </ul>
    </main>
  );
}
