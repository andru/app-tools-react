import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("./routes/menu.tsx"),
  route("questionnaire", "./routes/questionnaire.tsx"),
  route("fasting-tracker", "./routes/fasting-tracker.tsx")
] satisfies RouteConfig;
