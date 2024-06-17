import { InputObject, OutputObject, mapObjects } from '../../../util/eventsMapper';
import axios from 'axios';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const today = new Date();
  const utcHour = today.getUTCHours();
  const isoDateString = today.toISOString().split('T')[0];

  let baseUrl = process.env.NEXT_PUBLIC_BASE_URL + `/6/events/affiliate_ids=19` as string;

  if (utcHour > 12) {
    baseUrl += '&offset=500';
  }

  try {
    const apiKey = process.env.NEXT_PUBLIC_API_KEY as string;
    const apiHost = process.env.NEXT_PUBLIC_API_HOST as string;

    const response = await axios.get(baseUrl, {
      headers: {
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': apiHost,
      },
    });

    if (response) {
      const inputArray: InputObject[] = response.data.events
      const mappedArray: OutputObject[] = mapObjects(inputArray);

      return !mappedArray.length ? NextResponse.json({message : 'Currently no games'}) : NextResponse.json(mappedArray)
    }
  } catch (err) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })

  }
}