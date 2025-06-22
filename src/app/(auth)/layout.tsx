"use client";

import { useLottie } from "lottie-react";
import animation1 from "../../../public/lotties/1.json";
import animation2 from "../../../public/lotties/2.json";
import animation3 from "../../../public/lotties/3.json";
import animation4 from "../../../public/lotties/4.json";
import type { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

// Predefined positions that look random but are fixed (no hydration issues)
const animationConfigs = [
  {
    data: animation1,
    className: "absolute top-12 left-8 w-28 h-28 opacity-60",
  },
  {
    data: animation2,
    className: "absolute top-20 right-12 w-24 h-24 opacity-50",
  },
  {
    data: animation3,
    className: "absolute bottom-16 left-16 w-32 h-32 opacity-40",
  },
  {
    data: animation4,
    className: "absolute bottom-12 right-8 w-26 h-26 opacity-70",
  },
];

export default function AuthLayout({ children }: AuthLayoutProps) {
  // Create all Lottie instances at top level
  const lottie1 = useLottie({ animationData: animation1, loop: true });
  const lottie2 = useLottie({ animationData: animation2, loop: true });
  const lottie3 = useLottie({ animationData: animation3, loop: true });
  const lottie4 = useLottie({ animationData: animation4, loop: true });

  const lottieViews = [lottie1.View, lottie2.View, lottie3.View, lottie4.View];

  return (
    <div className="min-h-screen bg-[#E6DCE7] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Lottie Animations in predefined positions */}
      {lottieViews.map((View, index) => (
        <div
          key={index}
          className={`${animationConfigs[index].className} z-0 pointer-events-none`}
        >
          {View}
        </div>
      ))}

      {/* Content wrapper */}
      <div className="relative z-10 w-full max-w-md">{children}</div>
    </div>
  );
}
