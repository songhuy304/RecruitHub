"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useFormFields } from "@/components/ui/tanstack-form";
import type { JobFormValues } from "../../schemas/job.schema";
import { useState } from "react";
import { TextEditor } from "@/components/rte-editor/text-editor";

export function JobDescriptionCard() {
  const [content, setContent] = useState("");
  const { FormTextareaField } = useFormFields<JobFormValues>();

  return (
    <Card className="border-border/80 border shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Job description</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-1">
          {/* <FormTextareaField
            name="description"
            label="Description"
            required
            placeholder="Describe the role, responsibilities, and what the candidate will be doing..."
            rows={5}
            className="focus-visible:ring-offset-0 rounded-b-none border-b-0 focus:border-border focus-visible:ring-0"
          /> */}

          <TextEditor value={content} onChange={setContent} />
        </div>

        <div className="space-y-1">
          <FormTextareaField
            name="requirements"
            label="Requirements"
            required
            placeholder="List the must-have skills, experience, and qualifications..."
            rows={5}
            className="focus-visible:ring-offset-0 rounded-b-none border-b-0 focus:border-border focus-visible:ring-0"
          />
        </div>

        <div className="space-y-1">
          <FormTextareaField
            name="benefits"
            label="Benefits "
            placeholder="List the benefits, perks, and why candidates will love working with you..."
            rows={4}
            className="focus-visible:ring-offset-0 rounded-b-none border-b-0 focus:border-border focus-visible:ring-0"
          />
        </div>
      </CardContent>
    </Card>
  );
}
