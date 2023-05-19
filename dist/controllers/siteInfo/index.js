"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.websiteSiteInfoRouter = exports.panelSiteInfoRouter = void 0;
const express_1 = require("express");
const mainPage_1 = require("./mainPage");
const aboutUs_1 = require("./aboutUs");
const contactUs_1 = require("./contactUs");
exports.panelSiteInfoRouter = (0, express_1.Router)();
exports.websiteSiteInfoRouter = (0, express_1.Router)();
exports.panelSiteInfoRouter.use('/main-page', mainPage_1.panelMainPageRouter);
exports.panelSiteInfoRouter.use('/about-us', aboutUs_1.panelAboutUsRouter);
exports.panelSiteInfoRouter.use('/contact-us', contactUs_1.panelContactUsRouter);
exports.websiteSiteInfoRouter.use('/main-page', mainPage_1.websiteMainPageRouter);
exports.websiteSiteInfoRouter.use('/about-us', aboutUs_1.websiteAboutUsRouter);
exports.websiteSiteInfoRouter.use('/contact-us', contactUs_1.websiteContactUsRouter);
