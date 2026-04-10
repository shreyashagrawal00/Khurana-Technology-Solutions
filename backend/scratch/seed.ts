import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

async function run() {
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/jobtracker');
  const Application = mongoose.connection.collection('applications');
  
  const existingDoc = await Application.findOne({});
  if (!existingDoc) {
    console.log('No existing app found');
    process.exit(0);
  }
  
  const userId = existingDoc.userId;
  
  const dummyApps = [
    {
      userId,
      company: 'Google',
      role: 'Full Stack Engineer Intern',
      status: 'Phone Screen',
      dateApplied: new Date(),
      parsedData: { skills: ['React', 'Node.js', 'Typescript'] }
    },
    {
      userId,
      company: 'Microsoft',
      role: 'SDE Intern',
      status: 'Interview',
      dateApplied: new Date(),
      parsedData: { skills: ['C#', 'SQL', 'Algorithms'] }
    },
    {
      userId,
      company: 'Stripe',
      role: 'Frontend Engineering Intern',
      status: 'Offer',
      dateApplied: new Date(Date.now() - 86400000 * 10),
      parsedData: { skills: ['React', 'CSS', 'Framer Motion'] },
      salaryRange: '$10,000/month'
    },
    {
      userId,
      company: 'Amazon',
      role: 'SDE Intern',
      status: 'Rejected',
      dateApplied: new Date(Date.now() - 86400000 * 30),
      parsedData: { skills: ['AWS', 'Java'] }
    }
  ];
  
  await Application.insertMany(dummyApps);
  console.log('Dummy applications inserted successfully!');
  process.exit(0);
}

run().catch(console.error);
