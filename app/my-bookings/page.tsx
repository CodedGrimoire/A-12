"use client";
import toast from "react-hot-toast";



import { useEffect, useState } from "react";
import Link from "next/link";

import { useAuth } from "@/app/providers/auth-context";

 import PrivateRoute from "@/app/components/private-route";


type Booking = 


{
  _id: string;
  serviceName: string;
  duration: { value: number; unit: "hours" | "days" };
  location: { division: string; district: string; city: string; area: string };
  totalCost: number;
  status: "Pending" | "Confirmed" | "Completed" | "Cancelled";
  createdAt: string;
};

export default function MyBookingsPage() 


{


   const [loading, setLoading] = useState(false);
  const { user } = useAuth();
 
  const [expanded, setExpanded] = useState<string | null>(null);

    const [bookings, setBookings] = useState<Booking[]>([]);


 

  useEffect(() => {
    const load = async () => 
      
      
      {
      if (!user) return;
      setLoading(true);
      try 
      
      
      {
        const res = await fetch(`/api/bookings?userUid=${user.uid}`);
        if (!res.ok) throw new Error("Failed to load bookings");
        const data = await res.json();
        // Hide cancelled bookings from the list.
        const list: Booking[] = (data.bookings || []).filter(
          (b: Booking) => b.status !== "Cancelled",
        );
        setBookings(list);
      }
      
      
      catch (err)
      
      
      {
        toast.error(
          err instanceof Error ? err.message : "Unable to load bookings",
        );
      }
      
      
      finally
      
      
      {
        setLoading(false);
      }
    };
    load();
  }, [user]);

  const handleCancel = async (id: string) => 
    
    
    {
    try 
    
    
    {
      const res = await fetch(`/api/bookings/${id}/cancel`,
        
        
        {
        method: "POST",
      });
      if (!res.ok) throw new Error("Failed to cancel booking");
      await res.json();
      // Remove the cancelled booking from the list immediately.
      setBookings((prev) => prev.filter((b) => b._id !== id));
      setExpanded((prev) => (prev === id ? null : prev));
      toast.success("Booking cancelled");
    }
    
    
    catch (err) 
    
    
    {
      toast.error(err instanceof Error ? err.message : "Unable to cancel booking");
    }
  };

  return (
    <PrivateRoute>
      <div 
      
      
      className="min-h-screen 
      
      
      bg-[#f6fbff] px-6 py-12">
        <div 
        
        
        className="mx-auto max-w-6xl space-y-6">
          <div className="flex items-center 
          
          
          justify-between">
            <div>
              <p 
              
              
              className="text-xs font-semibold tracking-wide
              
              
              text-emerald-700">
                My bookings
              </p>
              <h1 
              
              
              className="text-3xl 
              
              
              
              font-bold text-slate-900">
                Your Care.xyz requests
              </h1>
            </div>
            <Link
              href="/services"
              className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-emerald-700"
            >
              New booking
            </Link>
          </div>

          {loading ? (
            <div className="rounded-3xl
            
            
            border border-slate-200 
            
            
            
            bg-white p-6 text-center shadow">
              <p 
              
              
              
              className="text-sm text-slate-700">
                
                
                Loading your bookings......
                </p>
            </div>
          ) : bookings.length === 0 ? (
            <div
            
            
            
            className="rounded-3xl border border-slate-200 
            
            
            
            bg-white p-6 text-center shadow">
              <p className="text-lg font-semibold text-slate-900">
                No bookings yet
              </p>
              <p 
              
              
              className="mt-2 text-sm 
              
              
              
              text-slate-600">
                Book baby care, elderly service, or sick care to see them here.
              </p>
              <Link
                href="/services"
                className="mt-4 inline-flex items-center 
                
                
                justify-center rounded-full bg-emerald-600 px-4 py-2
                
                
                
                text-sm font-semibold text-white 
                
                
                hover:bg-emerald-700"
              >
                Browse services
              </Link>
            </div>
          ) : (
            <div className="grid gap-4">
              {bookings.map((booking) => {
                const isOpen = expanded === booking._id;
                return (
                  <div
                    key={booking._id}
                    className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
                  >
                    <div 
                    
                    
                    className="flex flex-col 
                    
                    
                    gap-3 md:flex-row md:items-center
                    
                    
                    md:justify-between">
                      <div>
                        <p 
                        
                        
                        className="text-sm uppercase tracking-wide text-slate-500">
                          {booking.serviceName}
                        </p>
                        <p 
                        
                        
                        className="text-lg font-semibold text-slate-900">
                          {booking.duration.value} {booking.duration.unit}
                        </p>




                        <p className="text-sm text-slate-600">
                          {booking.location.city}, {booking.location.district}
                        </p>
                      </div>
                      <div
                       className="flex items-center gap-3">
                        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-100">
                          {booking.status}
                        </span>
                        <span className="rounded-full bg-slate-50
                        
                        
                        
                        
                        px-3 py-1 text-xs font-semibold text-slate-800 ring-1 
                        
                        
                        
                        
                        ring-slate-200">
                          ৳{booking.totalCost}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            setExpanded(isOpen ? null : booking._id)
                          }
                          className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-800 hover:border-emerald-200 hover:text-emerald-700"
                        >
                          {isOpen ? "Hide details" : "View details"}
                        </button>
                        {booking.status !== "Cancelled" ? (
                          <button
                            onClick={() => handleCancel(booking._id)}
                            className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-slate-800"
                          >
                            Cancel booking
                          </button>
                        ) : null}
                      </div>
                    </div>
                    {isOpen ? (
                      <div className="mt-4 grid gap-2 
                      
                      
                      border-t border-slate-100 pt-4 text-sm 
                      
                      
                      
                      text-slate-700 md:grid-cols-4">
                        <Info label="Division" 
                        
                        
                        value={booking.location.division} 
                        
                        />
                        <Info label="District" 
                        
                        
                        
                        value={booking.location.district} />
                        <Info label="City" 
                        
                        
                        
                        value={booking.location.city} />
                        <Info label="Area / Address" 
                        
                        
                        value={booking.location.area} />
                        <Info
                          label="Duration"
                          value={`${booking.duration.value} ${booking.duration.unit}`}
                        />
                        <Info
                          label="Created"
                          value={new Date(booking.createdAt).toLocaleString()}
                        />
                        <Info label="Status" 
                        
                        
                        
                        value={booking.status} />
                        <Info
                        
                        
                        
                        label="Total Cost" 
                        
                        
                        
                        value={`৳${booking.totalCost}`} />
                      </div>
                    ) : null
                    
                    
                    }
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </PrivateRoute>
  );
}

function Info({ label, value }: { label: string; value: string })


{
  return (
    <div className="flex flex-col">
      <span
      
      
      className="text-xs font-semibold 
      
      
      uppercase tracking-wide 
      
      
      text-slate-500">
        {label}
      </span>
      <span
      
      
      className="text-slate-800">
        
        
        {value}
        
        
        </span>
    </div>
  );
}
