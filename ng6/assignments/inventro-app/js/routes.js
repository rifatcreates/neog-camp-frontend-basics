import { AtomRouter } from "./lib/atom-router.js";
import home from "./pages/home.js";
import details from "./pages/details.js";

const router = new AtomRouter({ rootId: "app", debug: false });

router.add([
  { url: "/", handler: home },
  { url: "/product", handler: details },
]);

export default router;
