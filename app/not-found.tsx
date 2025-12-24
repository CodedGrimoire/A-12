import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen
    
    items-center justify-center bg-[#f6fbff] px-6">
      <div className="max-w-md space-y-4 rounded-3xl border 
      
      
      border-slate-200 bg-white p-8 text-center shadow-xl">
        <p className="text-sm font-semibold
        
        
        uppercase tracking-wide text-emerald-700">
          404 Error
        </p>
        <h1 className="text-3xl font-bold text-slate-900">
          
          
          Page not found
          
          
          </h1>
        <p className="text-sm text-slate-600">
          We couldn’t find what you were looking for. Try heading back to the
          homepage and browsing services again.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center
          
          
          rounded-full bg-emerald-600 px-4 py-2 
          text-sm font-semibold 
          
          
          text-white shadow hover:bg-emerald-700"
        >
          Return home
        </Link>
      </div>
    </div>
  );
}
