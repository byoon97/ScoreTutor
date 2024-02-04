import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import { InputObject, OutputObject, mapObjects } from './../../../functions/eventsMapper';


export async function GET() {
    const today = new Date();
    const isoDateString = today.toISOString().split('T')[0];
  
    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL + `/2/events/2024-02-11?affiliate_ids=19` as string;
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
  
  
      return NextResponse.json(mappedArray)
      }
    } catch (err) {
      console.error('Error:', err);
    }
  }
  