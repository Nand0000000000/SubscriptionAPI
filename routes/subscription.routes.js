import { Router } from "express";
import authRouter from "./auth.routes.js";
import { authorize } from "../middlewares/auth.middleware.js";
import { createSub } from "../controllers/subscription.controller.js";

const subscriptionRouter = Router();

subscriptionRouter.get("/", (req, res) => {
    res.send({Title: "Get subscriptions"})
})

subscriptionRouter.get("/:id", (req, res) => {
    res.send({Title: "Get specific subscriptions"})
})

subscriptionRouter.post("/", authorize,  createSub)

subscriptionRouter.put("/:id", (req, res) => {
    res.send({Title: "update subscription"})
})

subscriptionRouter.delete("/:id", (req, res) => {
    res.send({Title: "Delete subscriptions"})
})

subscriptionRouter.get("/user/:id", (req, res) => {
    res.send({Title: "Get specific user subscriptions"})
})

subscriptionRouter.delete("/:id/cancel", (req, res) => {
    res.send({Title: "Cancel specific subscription"})
})

subscriptionRouter.get("/upcoming-renewals", (req, res) => {
    res.send({Title: "Get upcoming-renewals"})
})

export default subscriptionRouter;