import type { Route } from "./+types/brain-gym";
import Game from "../brain-gym/entry";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "NMNBio Brain Gym" },
    { name: "description", content: "" },
  ];
}

export default function MenuRoute() {
  return <Game />;
}
