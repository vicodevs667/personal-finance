"use client";

export const AmbientBackground = () => {
  return (
    <div className="fixed inset-0 -z-10" aria-hidden>
      <div className="absolute top-[-40%] left-[-20%] w-[80%] aspect-square rounded-full bg-violet-500/20 blur-[128px] pointer-events-none" />
      <div className="absolute top-[-20%] right-[-10%] w-[60%] aspect-square rounded-full bg-cyan-500/15 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-30%] left-[30%] w-[50%] aspect-square rounded-full bg-fuchsia-500/10 blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,119,198,0.08),transparent_50%)]" />
      <div className="absolute inset-0 bg-[#030712]" />
    </div>
  );
};
