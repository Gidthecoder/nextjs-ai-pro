import {NextRequest, NextResponse} from 'next/server';
import OpenAI from 'openai';

import {authOptions} from "@/app/helper/authOption";
import { getServerSession} from "next-auth";

const API_KEY = process.env.API_KEY;

const client = new OpenAI({ apiKey: API_KEY });

export async function POST (req: NextRequest) {

    let session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({content: 'Unauthorized access. Authentication required'}, {status: 401})
    }

    let {prompt} = await req.json();

    if (!prompt) {
      return NextResponse.json({ content: 'Prompt is required' }, {status: 400});
    }

    try {
      let completion = await client.chat.completions.create({
        messages: [
          { role: 'system', content: 'Your job is to write about any topic asked by the user' },
          { role: 'user', content: prompt }
        ],
        model: 'gpt-3.5-turbo',
      });
      return NextResponse.json(completion.choices[0].message, {status: 200});
    } catch (error) {
      console.error(error)
      return NextResponse.json({ content: 'Internal Server Error' }, {status: 500});
    }  
};
