// api/trigger-django-api.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    // Fetch NDVI data
    const ndviResult = await fetch(`${process.env.VITE_API_BASE_URL}/ndvi/getAll/`);
    const ndviData = await ndviResult.json();

    // Trigger the backend API to post NDVI data
    const response = await fetch(`${process.env.VITE_API_BASE_URL}/facebook/post/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ndvi: ndviData }),
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: 'Failed to trigger backend' });
    }

    return res.status(200).json({ message: 'Django API triggered successfully!' });
  } catch (error) {
    return res.status(500).json({ error: 'Unexpected server error', detail: error.message });
  }
}
