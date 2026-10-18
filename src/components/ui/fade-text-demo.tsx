import React from "react";
import { FadeText } from "@/components/ui/fade-text";

export function FadeTextDemo() {
  return (
    <div className="flex flex-col space-y-8 text-center py-6">
      <FadeText
        className="text-4xl font-serif text-[#F4EFE5]"
        direction="up"
        framerProps={{
          show: { transition: { delay: 0.2 } },
        }}
        text="Fade Up"
      />
      <FadeText
        className="text-4xl font-serif text-[#E6D2A0]"
        direction="right"
        framerProps={{
          show: { transition: { delay: 0.4 } },
        }}
        text="Fade Right"
      />
      <FadeText
        className="text-4xl font-serif text-[#C6A15B]"
        direction="down"
        framerProps={{
          show: { transition: { delay: 0.6 } },
        }}
        text="Fade Down"
      />
      <FadeText
        className="text-4xl font-serif text-[#C9B18A]"
        direction="left"
        framerProps={{
          show: { transition: { delay: 0.8 } },
        }}
        text="Fade Left"
      />
    </div>
  );
}
