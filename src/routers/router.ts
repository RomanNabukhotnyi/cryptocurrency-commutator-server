import { Router } from "express";
import { controller } from "../controllers/controller"
export const createRouter = () => {
    const router = Router();
    router.get("/", controller.getAll);
    router.get("/:cryptocurrensyName", controller.get);
    router.delete("/", controller.deleteAll);
    router.delete("/:cryptocurrensyName", controller.delete);
    router.post("/", controller.post);
    router.put("/:cryptocurrensyName", controller.update);
    return router;
}