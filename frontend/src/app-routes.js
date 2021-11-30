import { withNavigationWatcher } from "./contexts/navigation";
import { TasksPage } from "./pages";

const routes = [
  {
    path: "/tasks",
    component: TasksPage,
  },
];

export default routes.map((route) => {
  return {
    ...route,
    component: withNavigationWatcher(route.component),
  };
});
