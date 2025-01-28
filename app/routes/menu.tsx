import type { Route } from "./+types/menu";
import { Menu } from "../menu/menu";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "NMNBio App Tools" },
    { name: "description", content: "" },
  ];
}

export default function MenuRoute() {
  return <Menu />;
}
