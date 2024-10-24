"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sectionRouter = void 0;
const express_1 = require("express");
const section_controller_1 = require("../controller/section.controller");
const sectionRouter = (0, express_1.Router)();
exports.sectionRouter = sectionRouter;
const sectionController = new section_controller_1.SectionController();
sectionRouter.post("/", sectionController.register);
sectionRouter.get("/", sectionController.search);
sectionRouter.put("/", sectionController.update);
sectionRouter.delete("/", sectionController.remove);
