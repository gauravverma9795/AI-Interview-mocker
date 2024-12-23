"use client"

import { Button } from '@/components/ui/button';
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import { desc, eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronsUpDown } from 'lucide-react'
import { chatSession } from '@/utils/GeminiAIModel';

function Questions() {

  //   const {user}=useUser();
  //   const[interviewList,setInterviewList] =useState([]);



  //   const onSubmit=async()=>{
  //     // setLoading(true);
  //     // event.preventDefault();
  //     // console.log(jobPosition,jobDesc,jobExperience);
  //     const InputPrompt="Please provide the 10 most commonly asked questions in job interviews along with sample answers for each. Structure the answers to showcase how a candidate can effectively respond to each question in JSON format, Give us question and answer field on JSON";

  //     const result=await chatSession.sendMessage(InputPrompt);

  //     const MockJsonResp=(result.response.text()).replace('```json','').replace('```','')
  //     console.log(MockJsonResp); 

  //     setInterviewList(MockJsonResp);
  //   }

  //   console.log(interviewList[1]);

  //   useEffect(()=>{
  //     user&&onSubmit();

  // },[user])

  const interviewData = [
    {
      question: "Tell me about yourself.",
      answer: "This is your chance to make a great first impression. Briefly highlight your relevant skills, experience, and career goals. Focus on what makes you a strong candidate for this specific role. For example, you could say:\n\n\"I'm a highly motivated and results-oriented professional with 5 years of experience in marketing. I'm passionate about using data-driven strategies to achieve business objectives. In my previous role at [Previous Company], I successfully increased lead generation by 20% through targeted social media campaigns. I'm eager to leverage my skills and experience to contribute to [Company Name]'s success.\""
    },
    {
      question: "Why are you interested in this position?",
      answer: "Demonstrate genuine interest and research about the company and the role. Show how your skills and experience align with the job requirements and how you can make a valuable contribution. For example, you could say:\n\n\"I've been following [Company Name]'s work in [Industry/Area] for some time now, and I'm truly impressed by [Specific Achievement or Project]. I'm particularly interested in [Specific aspect of the role] because it aligns with my passion for [Your area of expertise] and my desire to [Your career goal]. I believe my skills in [Specific skills] would be a great asset to your team.\""
    },
    {
      question: "What are your strengths?",
      answer: "Choose strengths that are relevant to the job and provide specific examples of how you've demonstrated them. Be honest and avoid overselling yourself. For example, you could say:\n\n\"One of my strengths is my strong communication skills. I'm able to effectively convey complex ideas both verbally and in writing. In my previous role, I led a team of 5 to develop a new product launch strategy, and my clear and concise communication helped ensure everyone was on the same page and working towards the same goal.\""
    },
    {
      question: "What are your weaknesses?",
      answer: "This is a tricky question, but it's an opportunity to show your self-awareness and growth mindset. Choose a weakness that you're actively working on improving and provide examples of how you're addressing it. For example, you could say:\n\n\"I'm always striving to improve my public speaking skills. I find that presenting in front of large groups can sometimes make me nervous. To address this, I've joined a public speaking group and I'm actively practicing my presentation skills. I'm confident that with continued practice, I'll be able to overcome this weakness.\""
    },
    {
      question: "Where do you see yourself in 5 years?",
      answer: "Demonstrate ambition and career goals that align with the company's direction. Show that you're planning for your future and that this role fits into your long-term aspirations. For example, you could say:\n\n\"In 5 years, I see myself as a leading expert in [Your field] and a valuable contributor to [Company Name]'s continued success. I'm eager to learn and grow within the organization and contribute to [Company's mission]. I believe this role is a great stepping stone for me to achieve my professional goals.\""
    },
    {
      question: "Why should we hire you?",
      answer: "This is your opportunity to reiterate your value proposition. Briefly summarize your key skills, experience, and accomplishments that make you the best candidate for the job. For example, you could say:\n\n\"I'm confident that my strong analytical skills, proven track record of success in [Specific area], and passion for [Industry/Area] make me an ideal candidate for this role. I'm eager to contribute to your team and help [Company Name] achieve its goals.\""
    },
    {
      question: "Tell me about a time you failed.",
      answer: "Be honest about a genuine failure but focus on what you learned from it and how you've grown. This demonstrates your resilience and ability to learn from your mistakes. For example, you could say:\n\n\"In my previous role, I took on a challenging project that required me to learn a new software program. Despite my best efforts, I encountered some technical difficulties and the project fell behind schedule. However, I learned a valuable lesson about the importance of thorough planning and resource allocation. I've since made it a point to invest more time in research and preparation for new projects, and I'm confident that I can now handle similar challenges more effectively.\""
    },
    {
      question: "What are your salary expectations?",
      answer: "Research industry standards and the company's salary range before the interview. Be prepared to give a range based on your experience and qualifications. You can say something like:\n\n\"Based on my research and experience, I am seeking a salary range of [Salary range] for this position. I am also flexible and open to discussing this further based on the specific details of the role and responsibilities.\""
    },
    {
      question: "Do you have any questions for me?",
      answer: "Always have questions prepared. This shows that you are engaged and eager to learn more. Ask insightful questions about the company, the role, or the team. For example, you could ask:\n\n\"What are the biggest challenges the team is currently facing?\", \"What are the opportunities for professional development within the company?\", or \"What are the company's long-term goals and how would this role contribute to achieving them?\"."
    },
    {
      question: "What is your availability?",
      answer: "Be honest and specific about your availability. Consider your current commitments and desired start date. For example, you could say:\n\n\"I am available to start [Start date], but I am flexible and willing to discuss alternative options. I am also available for a [Number] week notice period from my current role.\""
    }
  ];


  return (

    <div className='p-10'>

      {/* <h1 className='text-xl font-bold mb-4'>Interview Questions</h1> */}
      <h2 className='text-3xl font-bold text-green-500'>Interview Questions</h2>

      <h2 className='text-sm text-gray-500 p-2'>Most commonly Questions ask in Interview !</h2>

      {/* Map through interviewList if it's an array */}
      {(interviewData.length > 0) ? (
        interviewData.map((item, index) => (
          <Collapsible key={index} className='mt-7'>
            <CollapsibleTrigger className='p-2 bg-secondary rounded-lg flex justify-between
         my-2 text-left gap-7 w-full'>
              {item.question} <ChevronsUpDown className='h-5 w-5' />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className='flex flex-col gap-2'>
                {/* <h2 className='text-red-500 p-2 border rounded-lg'><strong>Rating:</strong>{item.rating}</h2> */}
                {/* <h2 className='p-2 border rounded-lg bg-red-50 text-sm text-red-900'><strong>Your Answer: </strong>{item.userAns}</h2> */}

                <h2 className='p-2 border rounded-lg bg-green-50 text-sm text-green-900'><strong>Correct Answer: </strong>{item.answer}</h2>

                {/* <h2 className='p-2 border rounded-lg bg-blue-50 text-sm text-primary'><strong>Feedback: </strong>{item.feedback}</h2> */}
              </div>
            </CollapsibleContent>
          </Collapsible>


        ))
      ) : (
        <p>No interview questions available</p>
      )}
    </div>
  )
}

export default Questions