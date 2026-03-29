import React from 'react';

function ButtonGithub() {
  return (
    <div className="group relative bg-white px-6 py-4 flex items-center gap-2 w-fit border-3 border-neutral-200 rounded-[24px] overflow-hidden cursor-pointer">
      {/* This is the hover gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-neutral-100 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      
      {/* Keep content above the overlay */}
      <span className="outfit-medium text-neutral-800 relative z-10 flex items-center gap-2">
        Sign in with GitHub
        <img src="/logos/github-logo.png" alt="" className="w-5 h-5" />
      </span>
    </div>
  );
}

export default ButtonGithub
