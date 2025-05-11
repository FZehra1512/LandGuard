// /pages/api/sendPlace.js
import { getNDVIData } from "@/api/mapDataEndpoints";
import { formatNDVIData } from "@/lib/utils";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Fetch NDVI data
      const { code, data } = await getNDVIData();

      if (code !== 200 || !data?.length) {
        return res.status(400).json({ message: 'No NDVI data found' });
      }

      const formatted = formatNDVIData(data);
      const randomPlace = formatted[Math.floor(Math.random() * formatted.length)];

      if (!randomPlace?.name) {
        return res.status(400).json({ message: 'Invalid place data' });
      }

      const placeName = randomPlace.name;

      // 🟡 Commented out the backend call for testing
      // await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/create-land-post/`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ placeName }),
      // });

      // 🔵 For testing, just print to console
      console.log("🟢 Random place selected:", placeName);

      return res.status(200).json({ message: 'Place selected successfully (testing)', placeName });
    } catch (error) {
      console.error('sendPlace error:', error);
      return res.status(500).json({ message: 'Failed to select place' });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
