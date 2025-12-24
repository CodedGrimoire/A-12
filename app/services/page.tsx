import Services from "../components/services";

export const metadata = 


{
  title: "Care.xyz | Services",
  description:
    "Browse all Care.xyz services for babysitting, elderly support, and specialized care at home.",
};

export default function ServicesPage() 


{
  return (
    <div
    
    
    className="min-h-screen bg-[#f6fbff]">
      <div className="mx-auto max-w-6xl 
      
      
      px-6 pb-16 pt-10">
        <div
        
        
        className="mb-6 space-y-2">
          <p className="text-xs 
          
          
          font-semibold 
          
          text-emerald-700">
            All services
          </p>
          <h1 className="text-4xl font-bold 
          
          
          text-slate-900">
            Explore every care service
          </h1>
          <p 
          
          
          className="max-w-2xl text-slate-700">
            Babysitting, elderly support, recovery care, overnight care, and
            more—find the right fit and book with confidence.
          </p>
        </div>
        <Services 
        
        
        hideCta title="All Care.xyz services" 
        description="" 
        />
      </div>
    </div>
  );
}
