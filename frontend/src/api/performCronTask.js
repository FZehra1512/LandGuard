// /pages/api/performCronTask.js
export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/sendPlace`, {
        method: 'POST',
      });

      const result = await response.json();
      return res.status(200).json({ message: 'Triggered sendPlace', result });
    } catch (err) {
      console.error('Cron job error:', err);
      return res.status(500).json({ message: 'Cron job failed' });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
