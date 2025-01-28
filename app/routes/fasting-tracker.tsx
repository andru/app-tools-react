import type { Route } from "./+types/fasting-tracker";
import { FastingTracker } from "../fasting-tracker/tracker";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "NMNBio App - Fasting Tracker" },
    { name: "description", content: "" },
  ];
}

export default function FastingTrackerRoute() {
  return <FastingTracker />;
}
