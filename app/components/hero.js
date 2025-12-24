"use client";

import { useEffect, useState } from "react";

const slides = 



[
  {
    title: "Trusted caregiving for every generation",
    description:
      "From first steps to golden years, our vetted caregivers bring warmth, professionalism, and safety to every home visit.",
    tag: "24/7 verified caretakers",
  },


  {
    title: "Book reliable care in minutes",
    description:
      "Choose baby sitting, elderly support, or recovery care with flexible schedules that fit your family rhythm.",
    tag: "Fast matching • Secure bookings",
  },


  {
    title: "Care that feels personal",
    description:
      "We pair you with caregivers who understand your routine, culture, and medical needs—so everyone feels at ease.",
    tag: "Local & language-friendly",
  },
];

export default function Hero() 


{
  const [index, setIndex] = useState(0);

  useEffect(() => 
    
    
    {
    const timer = setInterval(
      () => setIndex((prev) => (prev + 1) % slides.length),


      5200,
    );



    return () => clearInterval(timer);
  }, []);

  const active = slides[index];

  return (
    <section
      id="book"
      className="relative isolate 
      
      
      overflow-hidden px-6 
      
      pb-16 pt-12 sm:pt-20"
    >
      <div 
      
      
      className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,#d9f5ff_0,transparent_32%),radial-gradient(circle_at_80%_10%,#e6fffa_0,transparent_28%),linear-gradient(180deg,#f6fbff,#ffffff)]" />
     
     
      <div 
      
      className="mx-auto flex max-w-6xl 
      
      flex-col gap-12 lg:flex-row lg:items-center">
        
        
        <div 
        
        
        className="max-w-xl space-y-6">
          <div 
          
          
          className="inline-flex items-center
          
          
          
          gap-3 rounded-full bg-white/80 px-4 py-2 text-sm font-medium 
          
          
          
          text-emerald-700 shadow-sm ring-1 ring-emerald-100">
            <span className="h-2 w-2 rounded-full 
            
            
            
            bg-emerald-500" />
            Reliable home care that adapts to you
          </div>
          <h1 className="text-4xl font-bold 
          
          
          leading-tight tracking-tight text-slate-900 sm:text-5xl">



            Baby sitting & elderly care, booked with confidence.
          </h1>
          <p className="text-lg leading-relaxed text-slate-700">



            Care.xyz connects you with trusted caregivers for children, elders,
            and loved ones needing special attention—so every family member
            feels safe, supported, and seen.
          </p>
          <div 
          
          
          className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#services"
              className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-200 transition hover:-translate-y-0.5 hover:bg-emerald-700"
            >
              Browse services
            </a>
            <div 
            
            
            
            className="text-sm text-slate-600">
             
              <div className="text-emerald-700">
               Care.IO একটি ওয়েব অ্যাপ্লিকেশন যা ব্যবহারকারীদের শিশু,
                বৃদ্ধ বা অসুস্থ ব্যক্তির জন্য নির্ভরযোগ্য ও trusted care service
                বুক করতে সাহায্য করে।
              </div>
            </div>
          </div>
          <dl className="grid grid-cols-2 gap-4 sm:max-w-lg sm:grid-cols-3">

            <Metric value="5k+" label="Families supported" />
            <Metric value="98%" label="On-time visits" />
            <Metric value="30 min" label="Avg. booking setup" />
          </dl>
        </div>
        <div className="w-full max-w-xl">
          <div
          
          
          className="relative overflow-hidden rounded-3xl border
          
          
          border-slate-200 bg-white shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-br 
            
            
            
            from-emerald-50/70 via-white to-sky-50/70" />


            <div className="relative flex flex-col gap-6 p-8">
              <div 
              
              
              className="flex items-center justify-between">
                <div className="rounded-full bg-emerald-100 px-3 py-1 
                
                
                
                text-xs font-semibold text-emerald-700">
                  {active.tag}
                </div>
                <div className="flex items-center gap-2">
                  {slides.map((_, i) => (
                    <button
                      key={i}
                      aria-label={`Show slide ${i + 1}`}
                      onClick={() => setIndex(i)}
                      className={`h-2.5 w-2.5 rounded-full transition ${
                        i === index
                          ? "bg-emerald-600"
                          : "bg-emerald-100 hover:bg-emerald-200"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-slate-900">
                  {active.title}


                </h2>
                <p
                
                
                className="text-base leading-relaxed text-slate-700">
                  {active.description}
                </p>
              </div>
              <div 
              
              
              className="grid grid-cols-2 gap-4
              
              
              
              rounded-2xl border border-emerald-100 bg-white/70 p-4 text-sm 
              
              
              font-medium text-slate-800 shadow-inner">
                <div className="flex flex-col gap-1">
                  <span className="text-xs uppercase tracking-wide text-emerald-600">
                    Book a visit
                  </span>


                  <span>
                    
                    
                    Pick dates, share routine, confirm instantly.
                    
                    
                    </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs  
                  
                  tracking-wide text-emerald-600">



                    Stay informed
                  </span>
                  <span>
                    
                    
                    Live updates, notes, and secure chat.
                    
                    
                    
                    </span>
                </div>
              </div>
            </div>



          </div>
        </div>
      </div>
    </section>
  );
}

function Metric({ value, label })



{
  return (
    <div className="rounded-2xl border border-slate-200 
    
    
    
    bg-white px-4 py-3 text-left shadow-sm">
      <dt
      
      
      className="text-xs font-semibold 
      
      
      
      tracking-wide text-emerald-700">
        {label}
      </dt>
      <dd className="text-xl font-bold text-slate-900">
        
        
        {value}
        
        
        </dd>
    </div>
  );
}
