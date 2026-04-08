"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Application_1 = __importDefault(require("../models/Application"));
const auth_1 = require("../middleware/auth");
const ai_1 = require("../services/ai");
const router = express_1.default.Router();
router.use(auth_1.authenticateToken);
router.get('/', async (req, res) => {
    try {
        const applications = await Application_1.default.find({ userId: req.userId });
        res.json(applications);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch applications' });
    }
});
router.post('/', async (req, res) => {
    try {
        const { company, role, jdLink, notes, dateApplied, status, salaryRange, parsedData, aiSuggestions } = req.body;
        const application = new Application_1.default({
            userId: req.userId,
            company,
            role,
            jdLink,
            notes,
            dateApplied,
            status,
            salaryRange,
            parsedData,
            aiSuggestions
        });
        await application.save();
        res.status(201).json(application);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create application' });
    }
});
router.post('/parse', async (req, res) => {
    try {
        const { jd } = req.body;
        const result = await (0, ai_1.parseJobDescription)(jd);
        res.json(result);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to parse JD' });
    }
});
router.put('/:id', async (req, res) => {
    try {
        const application = await Application_1.default.findOneAndUpdate({ _id: req.params.id, userId: req.userId }, req.body, { new: true });
        res.json(application);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to update application' });
    }
});
router.delete('/:id', async (req, res) => {
    try {
        await Application_1.default.findOneAndDelete({ _id: req.params.id, userId: req.userId });
        res.json({ message: 'Application deleted' });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete application' });
    }
});
exports.default = router;
//# sourceMappingURL=applications.js.map