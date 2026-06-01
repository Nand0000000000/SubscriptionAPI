import { Router } from "express";

const subscriptionRouter = Router();

subscriptionRouter.get("/", (req, res) => {
    res.send({Title: "Get subscriptions"})
})

subscriptionRouter.get("/:id", (req, res) => {
    res.send({Title: "Get specific subscriptions"})
})

subscriptionRouter.post("/", (req, res) => {
    res.send({Title: "Create subscriptions"})
})

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