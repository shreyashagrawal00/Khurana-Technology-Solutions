import express from 'express';
import Application from '../models/Application';
import { authenticateToken, AuthRequest } from '../middleware/auth';
import { parseJobDescription } from '../services/ai';

const router = express.Router();

router.use(authenticateToken);

router.get('/', async (req: AuthRequest, res) => {
  try {
    const applications = await Application.find({ userId: req.userId as any });
    res.json(applications);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch applications' });
  }
});

router.post('/', async (req: AuthRequest, res) => {
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
  } catch (error) {
    res.status(500).json({ error: 'Failed to create application' });
  }
});

router.post('/parse', async (req: AuthRequest, res) => {
  try {
    const { jd } = req.body;
    const result = await parseJobDescription(jd);
    res.json(result);
  } catch (error) {
    console.error('AI Parsing Error:', error);
    res.status(500).json({ error: 'Failed to parse JD' });
  }
});

router.put('/:id', async (req: AuthRequest, res) => {
  try {
    const application = await Application.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true }
    );
    res.json(application);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update application' });
  }
});

router.delete('/:id', async (req: AuthRequest, res) => {
  try {
    await Application.findOneAndDelete({ _id: req.params.id as any, userId: req.userId as any });
    res.json({ message: 'Application deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete application' });
  }
});

export default router;
