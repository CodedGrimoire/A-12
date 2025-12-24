export default function Footer() 


{
  return (
    <footer
      id="contact"
      className="border-t border-slate-200 bg-white/90 backdrop-blur"
    >
      <div 
      
      className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-lg font-semibold text-slate-900">
            
            
            Care.xyz
            
            
            </p>
          <p 
          
          
          className="text-sm text-slate-600">
            Reliable care for children, elderly, and loved ones at home.
          </p>


        </div>
        <div
        
        
        className="flex flex-col gap-2 text-sm 
        
        text-slate-700 sm:flex-row sm:items-center sm:gap-6">
          <a href="mailto:hello@care.xyz" className="hover:text-emerald-700">


            hello@care.xyz
          </a>
          <span
          
          
          className="hidden h-4 w-px bg-slate-200 sm:block" />
          <a href="tel:+8801700000000" 
          
          
          className="hover:text-emerald-700">
            +880 17 0000 0000
          </a>
          <span className="hidden h-4 w-px bg-slate-200 sm:block" />
          <a href="#book" 
          
          
          className="font-semibold text-emerald-700">
            Book a visit
          </a>
        </div>
      </div>
    </footer>
  );
}
