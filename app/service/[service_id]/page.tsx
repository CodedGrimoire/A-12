import Link from "next/link";



import { notFound } from "next/navigation";
import

{
  ensureSeededServices,
  getServiceBySlug,
} from "@/lib/server/services";

export const dynamic = "force-dynamic";

type Props =


{
  params: Promise<{ service_id: string }>;
};

export default async function ServiceDetail({ params }: Props) 


{
  const { service_id } = await params;
  await ensureSeededServices();
  const service = await getServiceBySlug(service_id);

  if (!service) 
    
    
    {
    notFound();
  }

  return (
    <div
    
    
    className="min-h-screen bg-[#f6fbff] 
    
    
    text-slate-900">
      <div 
      
      
      className="mx-auto max-w-5xl 
      
      
      px-6 py-12">
        <div
        
        
        className="mb-6 flex items-center
        
        
        gap-2 text-sm text-slate-600">
          <Link href="/" 
          
          
          className="hover:text-emerald-700">
            Home
          </Link>
          <span>›



          </span>
          <Link href="/#services" 
          
          
          className="hover:text-emerald-700">
            Services
          </Link>


          <span>›</span>
          <span 
          
          
          className="text-slate-900 
          
          
          font-semibold">
            
            
            {service.name}
            
            
            </span>
        </div>

        <div
        
        
        className="overflow-hidden rounded-3xl border
        
        
        
        border-slate-200 bg-white shadow-xl">
          <div className="bg-gradient-to-r from-emerald-50 
          
          
          via-white to-sky-50 px-8 py-10">
            <p 
            
            
            className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
              {service.category === "baby"
                ? "Baby Care"
                : service.category === "elderly"
                  ? "Elderly Service"
                  : "Sick People Service"}
            </p>
            <h1 
            
            
            className="mt-2 text-4xl font-bold tracking-tight text-slate-900">
              {service.name}
            </h1>


            <p
            
            
            className="mt-3 max-w-3xl text-lg
            
            
            text-slate-700">
              {service.description}
            </p>
            <div 
            
            className="mt-5 flex flex-wrap gap-3 text-sm text-emerald-800">
              <span className="rounded-full bg-emerald-50 px-3 py-2 ring-1 ring-emerald-100">
                ৳{service.hourlyRate}/hour
              </span>
              <span className="rounded-full
              
              
              bg-emerald-50 px-3 py-2 ring-1 
              
              
              ring-emerald-100">
                ৳{service.dailyRate}/day
              </span>
              {service.notes ? (
                <span className="rounded-full bg-white px-3 py-2 ring-1 ring-emerald-100 text-slate-700">
                  {service.notes}
                </span>
              ) : null}
            </div>
          </div>

          <div 
          
          
          className="grid 
          gap-8 px-8 py-10 lg:grid-cols-[1.4fr_1fr]">
            <div className="space-y-4">
              <h2 
              
              
              className="text-xl font-semibold
              
              
              
              text-slate-900">
                What you get
              </h2>
              <ul className="grid gap-3 sm:grid-cols-2">
                {service.features.map((feature: string) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 rounded-2xl 
                    
                    
                    
                    
                    
                    bg-slate-50 px-4 py-3 text-sm text-slate-800 ring-1 ring-slate-200"
                  >
                    <span className="mt-1 h-2 w-2 rounded-full bg-emerald-600" />
                    <span>
                      
                      
                      {feature}
                      
                      
                      
                      </span>
                  </li>
                ))}
              </ul>
              <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm">
                <p className="font-semibold text-emerald-700">
                  Booking tips
                </p>
                <ul className="mt-2 space-y-1">
                  <li>• Share routines, medications, and emergency contacts.

                    
                  </li>
                  <li>
                    
                    
                    • Set preferred schedule (hours or days) and location.
                    </li>
                  <li>• Care team confirms availability before moving to confirmed status.



                  </li>
                </ul>
              </div>
            </div>

            <div className="rounded-2xl
            
            
            
            border border-emerald-100 bg-gradient-to-b from-emerald-50 
            
            
            
            via-white to-sky-50 p-6 shadow-inner">
              <h3 className="text-lg font-semibold text-slate-900">
                Ready to book?
              </h3>
              <p className="mt-2 text-sm text-slate-700">
                Choose duration and location on the booking page. You will be
                asked to sign in before confirming.
              </p>
              <div className="mt-4 flex flex-col gap-3">
                <Link
                  href={`/booking/${service.id}`}
                  className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-200 transition hover:-translate-y-0.5 hover:bg-emerald-700"
                >
                  Book this service
                </Link>
                <Link
                  href="/my-bookings"
                  className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 transition hover:-translate-y-0.5 hover:border-emerald-200 hover:text-emerald-700"
                >
                  View my bookings
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function generateMetadata({ params }: Props) {
  const { service_id } = await params;
  await ensureSeededServices();
  const service = await getServiceBySlug(service_id);
  if (!service) {
    return {
      title: "Service not found | Care.xyz",
      description: "The requested service could not be found.",
    };
  }
  return {
    title: `${service.name} | Care.xyz`,
    description: service.summary,
  };
}
