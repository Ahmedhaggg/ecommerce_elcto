let productRoutes = require("./product.router")
let authRoutes = require("./auth.router")
let authAdminRoutes = require("./auth.admin.router")
let categoryRoutes = require("./category.router")
let orderRoutes = require("./order.router")
let notificationRoutes = require("./notification.router")
let statisticsRoutes = require("./statistics.router")
let userRoutes = require("./user.router");

module.exports = app => {
    app.use("/api/v1/admins/auth", authAdminRoutes)
    app.use("/api/v1/auth", authRoutes)
    app.use("/api/v1/products", productRoutes)
    app.use("/api/v1/categories", categoryRoutes)
    app.use("/api/v1/orders", orderRoutes)
    app.use("/api/v1/notifications", notificationRoutes)
    app.use("/api/v1/statistics", statisticsRoutes)
    app.use("/api/v1/users", userRoutes)
}