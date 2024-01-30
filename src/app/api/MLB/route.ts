import { InputObject, OutputObject, mapObjects } from './../../../functions/eventsMapper';
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const today = new Date();
  const isoDateString = today.toISOString().split('T')[0];

  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL + `/3/events/${isoDateString}?offset=500&affiliate_ids=19` as string;
    const apiKey = process.env.NEXT_PUBLIC_API_KEY as string;
    const apiHost = process.env.NEXT_PUBLIC_API_HOST as string;

    console.log('Base URL:', baseUrl);

    const response = await axios.get(baseUrl, {
      headers: {
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': apiHost,
      },
    });

    if (response) {
      const inputArray: InputObject[] = response.data.events
      const mappedArray: OutputObject[] = mapObjects(inputArray);
      console.log(mappedArray);


      return NextResponse.json({message: mappedArray})
    }
  } catch (err) {
    console.error('Error:', err);
  }
}