import axios from 'axios';
import { InputObject, OutputObject, mapObjects } from './../../../functions/eventsMapper';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const today = new Date();
  const utcHour = today.getUTCHours();
  const isoDateString = today.toISOString().split('T')[0];
  let urlData

  let baseUrl = process.env.NEXT_PUBLIC_BASE_URL + `/4/events/${isoDateString}?affiliate_ids=19` as string;

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

    urlData = {apiKey, apiHost, baseUrl}

    if (response) {
      const inputArray: InputObject[] = response.data.events
      const mappedArray: OutputObject[] = mapObjects(inputArray);

      return NextResponse.json(mappedArray)
    }
  } catch (err) {
    console.error(err); // Log the error for debugging purposes
    return NextResponse.json({ error: 'Internal Server Error', msg: err, urlData }, { status: 500 })
  }
}