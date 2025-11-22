"use client";

import InputField from "@/components/form/InputField";
import SelectField from "@/components/form/SelectField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { createNewsFormSchema, TCreateNewsForm } from "@/lib/form/newsForm";
import { EContentType, ENewsType } from "@/types/news.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";

export default function CreateNewsAdmin() {
  const form = useForm<TCreateNewsForm>({
    resolver: zodResolver(createNewsFormSchema),
    defaultValues: {
      title: "",
      summary: "",
      category: "",
      description: "",
      image: "",
      location: "",
      type: ENewsType.NORMAL,
      content: [
        {
          data: "",
          type: EContentType.TEXT,
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "content",
  });

  const onSubmit = (data: any) => {
    console.log("FORM DATA:", data);
  };

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <h1 className="text-3xl font-bold mb-4">Create News</h1>
          <InputField
            control={form.control}
            name="title"
            placeholder="News Title"
            label="News Title"
          />

          <InputField
            control={form.control}
            name="summary"
            placeholder="Short summary"
            label="Summary"
          />

          <InputField
            control={form.control}
            name="category"
            placeholder="Category name"
            label="Category"
          />

          <InputField
            control={form.control}
            name="description"
            placeholder="Description"
            label="Description"
          />

          <SelectField
            control={form.control}
            name="type"
            label="News Type"
            options={Object.entries(ENewsType).map(([key, value]) => {
              return { label: key, value };
            })}
          />

          <InputField
            control={form.control}
            name="location"
            placeholder="Country/City"
            label="Location"
          />

          <InputField
            control={form.control}
            name="image"
            placeholder="https://example.com/image.jpg"
            label="Main Image URL"
          />

          {/* Dynamic Content Blocks */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Content Blocks</h3>
              <Button
                type="button"
                onClick={() => append({ type: EContentType.TEXT, data: "" })}
              >
                Add Block
              </Button>
            </div>

            {fields.map((fieldItem, index) => (
              <div
                key={fieldItem.id}
                className="border p-4 rounded-md space-y-3"
              >
                <SelectField
                  options={[
                    {
                      label: "Text",
                      value: EContentType.TEXT,
                    },

                    {
                      label: "Image",
                      value: EContentType.IMAGE,
                    },
                  ]}
                  control={form.control}
                  name={`content.${index}.type`}
                  label="Content Type"
                />
                <InputField
                  control={form.control}
                  name={`content.${index}.data`}
                  placeholder="Enter content…"
                  label={
                    form.watch(`content.${index}.type`) === EContentType.TEXT
                      ? "Text Content"
                      : "Image URL"
                  }
                />

                {/* Remove Button */}
                {index !== 0 && (
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => remove(index)}
                  >
                    Remove
                  </Button>
                )}
              </div>
            ))}
          </div>

          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
