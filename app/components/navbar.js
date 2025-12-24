"use client";

import Link from "next/link";

import { useAuth } from "../providers/auth-context";

 import { usePathname } from "next/navigation";

export default function Navbar()


{
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const links = 
  
  
  [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    ...(user ? [{ href: "/my-bookings", label: "My Bookings" }] : []),
  ];

  return (
    <header
    
    
    className="sticky top-0 z-30 backdrop-blur
     bg-white/80 border-b border-slate-200">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">


        <Link href="/"
        
        
        className="flex items-center 
        
        
        gap-3 text-slate-900">
          <img
            src="/logo.png"
            alt=""
            className="h-12 w-auto rounded-full 
            
            
            
            border border-emerald-100
            
            
            bg-white p-1.5 shadow-sm"
          />
          <span className="text-lg font-semibold tracking-tight">
            Care.xyz — Baby & Elderly Care
          </span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-700 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative pb-1 transition-colors 
                
                
                hover:text-emerald-700 ${
                isActive(pathname, link.href)
                  ? "text-emerald-700"
                  : "text-slate-700"
              }`}
            >
              {link.label}
              {isActive(pathname, link.href) ? (
                <span className="absolute inset-x-0 -bottom-1 h-0.5 
                
                
                rounded-full
                
                
                bg-emerald-600" />
              ) : null}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <div 
              
              
              className="flex items-center
              
              
              gap-3 rounded-full border border-slate-200 bg-white px-3 py-2 shadow-sm">
                <Avatar name={user.name || user.email} photoUrl={user.photoUrl} />
                <div className="text-left">
                  <div className="text-sm 
                  font-semibold text-slate-900


                   line-clamp-1">
                    {user.name || user.email}
                  </div>
                  <div className="text-[12px] text-slate-500 line-clamp-1">
                    Signed in
                  </div>
                </div>
              </div>
              <button
                onClick={logout}


                className="rounded-full
                
                border border-slate-200 
                
                
                bg-slate-900 px-4 py-2 text-sm font-semibold
                
                
                text-white  transition hover:-translate-y-0.5 hover:bg-slate-800"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="hidden rounded-full border border-slate-200 px-4
                
                
                py-2 text-sm font-semibold text-slate-800 transition hover:-translate-y-0.5 hover:border-emerald-200 hover:text-emerald-700 sm:inline-flex"
              >
                Sign in
              </Link>
              <Link
                href="/register"
                className="hidden rounded-full border 
                
                
                border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold 
                
                
                
                text-emerald-800 shadow-sm transition hover:-translate-y-0.5
                
                
                hover:bg-emerald-100 sm:inline-flex"
              >
                Register
              </Link>
              <Link
                href="/booking/baby-care"
                className="rounded-full bg-emerald-600 px-4 py-2 text-sm 
                
                
                font-semibold text-white shadow-md shadow-emerald-200 transition
                
                
                hover:-translate-y-0.5 hover:bg-emerald-700"
              >
                Book Care
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

function Avatar({ name, photoUrl })

{
  if (photoUrl) 
    
    
    {
    return (
      <span className="inline-flex 
      
      h-9 w-9 overflow-hidden rounded-full border border-slate-200 
      
      
      bg-slate-100">
        <img
          src={photoUrl}
          alt=""
          className="h-full w-full object-cover"
        />
      </span>
    );
  }
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <span className="inline-flex h-9 
    
    
    w-9 items-center justify-center rounded-full
    
    
    bg-emerald-100 text-sm font-semibold
    
    text-emerald-700">
      {initials}
    </span>
  );
}

function isActive(pathname, href) 


{
  if (href === "/") 
    
    
    {
    return pathname === "/";
  }
  if (href === "/services") 
    
    
    {
    return (
      pathname === "/services" ||
      pathname.startsWith("/services/") ||
      pathname.startsWith("/service/")
    );
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}
