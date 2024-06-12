import axios from 'axios';
import { NextResponse } from 'next/server';
import { InputObject, OutputObject, mapObjects } from '../../../util/eventsMapper';

export async function GET(request: Request) {
  const today = new Date();
  const utcHour = today.getUTCHours();
  const isoDateString = today.toISOString().split('T')[0];

  let baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/3/events/${isoDateString}?affiliate_ids=19`;

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
      const inputArray: InputObject[] = response.data.events;

      // Current time in UTC
      const currentTime = new Date();

      // Filter out past events
      const upcomingEvents = inputArray.filter(event => {
        return event.score.event_status === 'STATUS_SCHEDULED'
      });

      const mappedArray: OutputObject[] = mapObjects(upcomingEvents);

      return NextResponse.json(mappedArray);
    }
  } catch (err) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
