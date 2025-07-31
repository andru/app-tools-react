import type { Route } from "./+types/brain-gym";
import Game from "../brain-gym/entry";
import { useRouteLoaderData } from "react-router";

import { routeId } from "~/root";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "NMNBio Brain Gym" },
    { name: "description", content: "" },
  ];
}

export default function MenuRoute() {
  const tcData = useRouteLoaderData<typeof import("~/root").clientLoader>(routeId);

  return <Game />;
}
