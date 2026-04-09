import express from 'express';
import Application from '../models/Application.js';
import { authenticateToken } from '../middleware/auth.js';
import { parseJobDescription } from '../services/ai.js';
const router = express.Router();
router.use(authenticateToken);
router.get('/', async (req, res) => {
    try {
        if (!req.userId) {
            res.status(401).json({ error: 'Unauthorized' });
            return;
        }
        const applications = await Application.find({ userId: req.userId });
        res.json(applications);
    }
    catch (error) {
        console.error('Fetch Applications Error:', error);
        res.status(500).json({ error: 'Failed to fetch applications', details: error });
    }
});
router.post('/', async (req, res) => {
    try {
        const { company, role, jdLink, notes, dateApplied, status, salaryRange, parsedData, aiSuggestions } = req.body;
        const application = new Application({
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
        console.error('Create Application Error:', error);
        res.status(500).json({ error: 'Failed to create application', details: error });
    }
});
router.post('/parse', async (req, res) => {
    try {
        const { jd } = req.body;
        const result = await parseJobDescription(jd);
        res.json(result);
    }
    catch (error) {
        console.error('AI Parsing Error:', error);
        res.status(500).json({ error: 'Failed to parse JD', details: error });
    }
});
router.put('/:id', async (req, res) => {
    try {
        const application = await Application.findOneAndUpdate({ _id: req.params.id, userId: req.userId }, req.body, { new: true });
        res.json(application);
    }
    catch (error) {
        console.error('Update Application Error:', error);
        res.status(500).json({ error: 'Failed to update application', details: error });
    }
});
router.delete('/:id', async (req, res) => {
    try {
        if (!req.userId) {
            res.status(401).json({ error: 'Unauthorized' });
            return;
        }
        await Application.findOneAndDelete({ _id: req.params.id, userId: req.userId });
        res.json({ message: 'Application deleted' });
    }
    catch (error) {
        console.error('Delete Application Error:', error);
        res.status(500).json({ error: 'Failed to delete application', details: error });
    }
});
export default router;
