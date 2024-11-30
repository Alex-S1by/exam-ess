
import {  NextRequest, NextResponse } from 'next/server';

import { GoogleGenerativeAI } from "@google/generative-ai";

export const POST = async (req: NextRequest) => {
    try{

        const body = await req.json();
        
        
        
        const extractedTexts: { [key: string]: string } = {};
        body.forEach((item: { text: string }, index: number) => {
          extractedTexts[`set${index + 1}`] = item.text;
        });
        
        
        
        const combinedTexts = Object.values(extractedTexts).join('\n');
        
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        
        
        


const prompt = `Here are the previous years' question papers:\n${combinedTexts}\n\nPlease find repeated questions[exact question with count not other content],repeated topics and a sample question paper [only the part a,b,c ] from the above question paper sets.`;



const result = await model.generateContent(prompt);
const responseText = result.response.text();



const jsonResponse = {
  res: [''],

 
};


const lines = responseText.split('\n');

lines.forEach(line => {
  
    const questionOrTopic = line.replace('*','').trim();
    
        jsonResponse.res.push(questionOrTopic);
   
       
    
     
   
  })





  return NextResponse.json({jsonResponse}); 
}
  catch (error) {
    console.error("Error parsing JSON:", error);
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }};









