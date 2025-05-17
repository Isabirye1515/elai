import express from "express";
import cors from "cors";

import dashboardRouter from "./components/dashboard/dashboardController";
import socialRouter from "./components/social/socialController";
import menuRouter from "./components/menu/menuController";
import tagRouter from "./components/tag/tagController";
import messageRouter from "./components/message/messageController";
import personRouter from "./components/person/personController";
import contactRouter from "./components/contact/contactController";
import aboutRouter from "./components/about/aboutController";
import productRouter from "./components/product/productCotroller";

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

app.use("/api/dashboard", dashboardRouter);
app.use("/api/socials", socialRouter);
app.use("/api/menu", menuRouter);
app.use("/api/tags", tagRouter);
app.use("/api/messages", messageRouter);
app.use("/api/person", personRouter);
app.use("/api/contact", contactRouter);
app.use("/api/about", aboutRouter);
app.use("/api/product", productRouter);

app.listen(4000, () => {
  console.log("Server is running on http://localhost:4000");
});
