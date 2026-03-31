

import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenAI } from '@google/genai'
import { userInput } from '@/app/data/aiPrompt'

type Content = {
  type: string
  text: string
}
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const voiceChat = body.voiceChat
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        { type: 'system ', text: `you have to follow this prompt ${JSON.stringify(userInput)}` },
        {
          type: 'user',
          text:
            ` user notes/ symptoms: ${voiceChat}` +
            'depend on the voiceChat and symptoms ,create a list of reports for the patient in json formate only ',
        },
      ] as Content[],
    })
    console.log(response.text)
    const Rawdata = response.text
    const data = Rawdata?.trim().replace('```json', '').replace('```', '')

    return NextResponse.json(data)
  } catch (error: any) {
    console.error('🔥 Full server error:', error)
    return NextResponse.json(
      {
        message: 'Internal server error',
        details: error.message,
        stack: error.stack,
        response: error.response?.data || null,
      },
      { status: 500 }
    )
  }
}
