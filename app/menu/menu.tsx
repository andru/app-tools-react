import { useEffect, useState } from 'react';
import { NavLink, useRouteLoaderData } from 'react-router';
// import { useVariables, useTapcart } from '~/webbridge-react/dist/webbridge-react.es';
import { routeId } from "~/root"; // Import the route ID

export function Menu() {

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
      </ul>
    </main>
  );
}
