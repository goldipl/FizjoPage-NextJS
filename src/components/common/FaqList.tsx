import { Plus } from "lucide-react";

import type { FaqItem } from "@/src/data/content";

export default function FaqList({ items }: { items: FaqItem[] }) {
  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <details
          key={item.question}
          open={index === 0}
          className="group bg-white rounded-2xl border border-gray-100 open:shadow-lg open:shadow-gray-200/50 transition-shadow"
        >
          <summary className="flex items-center justify-between gap-4 cursor-pointer list-none px-6 py-5 font-semibold text-navy-900">
            {item.question}
            <span className="w-8 h-8 shrink-0 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center group-open:rotate-45 transition-transform">
              <Plus size={18} />
            </span>
          </summary>
          <p className="px-6 pb-6 -mt-1 text-gray-500 text-sm leading-relaxed">
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  );
}
