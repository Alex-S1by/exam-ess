'use client'

import { useState, useEffect } from 'react'

import { Button } from "@/components/ui/button"
import { PlusCircle } from 'lucide-react'

import { Card, CardContent } from "@/components/ui/card"
import { useRouter } from 'next/navigation'




// const AnalysisSection = (items:Array) => (
//   <Card className="w-full mb-4">
//     {/* <CardHeader>
//       <CardTitle className="text-xl font-semibold text-primary">{title}</CardTitle>
//     </CardHeader> */}
//     <CardContent>
//       <ul className="space-y-2">
//         {items.map(({item, index}:{item:String,index:any}) => (
//           <li key={index} className="text-sm">
//             {item.split('**').map((part, i) => 
//               i % 2 === 0 ? part : <strong key={i} className="text-primary">{part}</strong>
//             )}
//           </li>
//         ))}
//       </ul>
//     </CardContent>
//   </Card>
// )






export default function Component() {
  const [analysisData, setAnalysisData] = useState({})
  
  const router=useRouter()
  useEffect(() => {
    const fetchDataFromCookies = () => {
      const cookidata=sessionStorage.getItem('analysisResults');
      if(cookidata)
      {
      const cookieData =JSON.parse(cookidata)
       
      setAnalysisData(cookieData.jsonResponse);

     
      
      

         if (!cookieData||cookieData.jsonResponse.length===0) {
           router.push('/upload'); 
         }
     
    }
    else{
      
      router.push('/upload')
    }
    }

    fetchDataFromCookies()
  }, [router])



  const renderContent = () => {
    // Assuming analysisData is an object with multiple properties containing text
    return Object.entries(analysisData).flatMap(([key, value]) => {
      // Check if value is an array and map through it
      if (Array.isArray(value)) {
        return value.map((text, index) => {
          if (typeof text !== 'string') return null; // Skip non-string values
  
          const formattedText = text
          .replace(/##\s*(.*)/gm, '<span class="text-xl font-semibold text-primary">$1</span>') 
          .replace(/\*\*(.*?)\*\*/g, '<strong  className="text-primary">$1</strong>') // Convert **text** to <strong>text</strong>
          .replace(/\*(.*?)\*/g, '<li className="text-sm text-slate-400">$1</li>') // Convert *text* to <em>text</em>.replace(/\n/g, '<br/>') // Replace line breaks with <br>
        
          return (
            <li key={`${key}-${index}`} className="mb-4">
              <div dangerouslySetInnerHTML={{ __html: formattedText }} />
            </li>
          )


        });
      }
  
     
  
      return null; // Skip any other types
    });
  };

  const handleNewAnalysis = () => {
    router.push('/upload')
      }
   
 
  if (!analysisData) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto p-4 space-y-8">
        <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-lg shadow-md">
          <h1 className="text-2xl md:text-3xl font-bold text-primary" onClick={handleNewAnalysis}>ExamEssentials</h1>
          <Button onClick={handleNewAnalysis} className="bg-primary text-white hover:bg-primary/90">
            <PlusCircle className="mr-2 h-4 w-4" /> New
          </Button>
        </div>
        <Card className="w-full bg-white shadow-lg">
          <CardContent className="p-6">
            <ul className="space-y-4 ">
              {renderContent()}
            </ul>
          </CardContent>
        </Card>
        
      </div>
    </div>
  )
}