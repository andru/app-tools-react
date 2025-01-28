import type { Route } from "./+types/questionnaire";
import { Questionnaire } from "../questionnaire/questionnaire";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "NMNBio App - Questionnaire" },
    { name: "description", content: "" },
  ];
}

export default function QuestionnaireRoute() {
  return <Questionnaire />;
}
