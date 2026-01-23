"use client";

import { SectionCards } from "@/components/earn/section-cards";
import { DataTable } from "@/components/earn/data-table";
import data from "./data.json";

export default function EarnPage() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <SectionCards />
          <DataTable data={data} />
        </div>
      </div>
    </div>
  );
}
