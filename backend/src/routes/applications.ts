import express from 'express';
import Application from '../models/Application';
import { authenticateToken, AuthRequest } from '../middleware/auth';
import { parseJobDescription, generateCoverLetter } from '../services/ai';

const router = express.Router();

router.use(authenticateToken);

router.get('/', async (req: AuthRequest, res) => {
  try {
    const applications = await Application.find({ userId: req.userId });
    res.json(applications);
  } catch (error) {
    console.error('Fetch Applications Error:', error);
    res.status(500).json({ error: 'Failed to fetch applications', details: error });
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
    console.error('Create Application Error:', error);
    res.status(500).json({ error: 'Failed to create application', details: error });
  }
});

router.post('/parse', async (req: AuthRequest, res) => {
  try {
    const { jd } = req.body;
    const result = await parseJobDescription(jd);
    res.json(result);
  } catch (error) {
    console.error('AI Parsing Error:', error);
    res.status(500).json({ error: 'Failed to parse JD', details: error });
  }
});

router.post('/generate-cover-letter', async (req: AuthRequest, res) => {
  try {
    const { company, role, jd } = req.body;
    const coverLetter = await generateCoverLetter(company, role, jd);
    res.json({ coverLetter });
  } catch (error) {
    console.error('AI Cover Letter Error:', error);
    res.status(500).json({ error: 'Failed to generate cover letter', details: error });
  }
});

router.put('/:id', async (req: AuthRequest, res) => {
  try {
    const { _id, userId, ...updateData } = req.body;
    const application = await Application.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      updateData,
      { new: true }
    );
    if (!application) {
      return res.status(404).json({ error: 'Application not found or unauthorized' });
    }
    res.json(application);
  } catch (error) {
    console.error('Update Application Error:', error);
    res.status(500).json({ error: 'Failed to update application', details: error });
  }
});

router.delete('/:id', async (req: AuthRequest, res) => {
  try {
    const application = await Application.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    if (!application) {
      return res.status(404).json({ error: 'Application not found or unauthorized' });
    }
    res.json({ message: 'Application deleted successfully' });
  } catch (error) {
    console.error('Delete Application Error:', error);
    res.status(500).json({ error: 'Failed to delete application', details: error });
  }
});

export default router;
