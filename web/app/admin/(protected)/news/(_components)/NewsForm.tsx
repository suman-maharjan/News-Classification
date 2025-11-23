"use client";

import InputField from "@/components/form/InputField";
import SelectField from "@/components/form/SelectField";
import TextareaField from "@/components/form/TextareaField";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { createNewsFormSchema, TCreateNewsForm } from "@/lib/form/newsForm";
import { useAutoDetectNewsCategory } from "@/services/newsService";
import { EContentType, ENewsType } from "@/types/news.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "@radix-ui/react-separator";
import { useFieldArray, useForm } from "react-hook-form";

type NewsFormProps = {
  onSubmit: (values: TCreateNewsForm) => void;
  formTitle: string;
  defaultValue?: TCreateNewsForm;
};

const NewsForm = ({ onSubmit, formTitle, defaultValue }: NewsFormProps) => {
  const initialFormValue = defaultValue?.title
    ? defaultValue
    : {
        author: "",
        title: "",
        category: "",
        description: "",
        image: "",
        place: "",
        type: ENewsType.NORMAL,
        content: [
          {
            data: "",
            type: EContentType.TEXT,
          },
        ],
      };

  const form = useForm<TCreateNewsForm>({
    resolver: zodResolver(createNewsFormSchema),
    defaultValues: initialFormValue,
    reValidateMode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "content",
  });

  const mutation = useAutoDetectNewsCategory();

  const handleAutoDetectCategory = async () => {
    const isValid = await form.trigger(["title", "description", "content"]);

    if (!isValid) {
      console.warn(
        "Validation failed. Fix errors before auto-detecting category."
      );
      return;
    }

    const { title, content, description } = form.getValues();

    const textContent = content
      .filter((c) => c.type === EContentType.TEXT)
      .map((c) => c.data)
      .join(" ");

    const mergedData = `${title} ${textContent} ${description}`;

    mutation.mutate(mergedData, {
      onSuccess: (response) => {
        console.log({ response }, "This might need");
        const result = response.data.prediction;
        form.setValue("category", result, { shouldValidate: true });
      },
    });
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-4xl mx-auto">
        <Card className="bg-white shadow-xl border-0 overflow-hidden py-0">
          <div className="bg-linear-to-r from-blue-600 to-indigo-600 p-8 text-white">
            <CardTitle className="text-3xl font-bold">{formTitle}</CardTitle>
          </div>

          <CardContent className="px-8 py-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                {/* Basic Information */}
                <section className="space-y-4">
                  <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
                    Basic Information
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <InputField
                      control={form.control}
                      name="title"
                      label="News Title"
                      placeholder="Enter headline..."
                    />

                    <InputField
                      control={form.control}
                      name="author"
                      label="Author"
                      placeholder="Enter author name..."
                    />
                  </div>

                  <TextareaField
                    control={form.control}
                    name="description"
                    label="Short Description"
                    placeholder="Write a compelling summary..."
                  />

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <InputField
                      control={form.control}
                      name="place"
                      label="Location"
                      placeholder="City / Country"
                    />

                    <SelectField
                      control={form.control}
                      name="type"
                      label="News Type"
                      options={Object.entries(ENewsType).map(([k, v]) => ({
                        label: k,
                        value: v,
                      }))}
                    />

                    <InputField
                      control={form.control}
                      name="image"
                      label="Main Image URL"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                </section>

                <Separator className="bg-gray-200 h-px" />

                {/* Dynamic Content Blocks */}
                <section className="space-y-5">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                      <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
                      Content Blocks
                    </h2>
                  </div>

                  <div className="space-y-4">
                    {fields.map((fieldItem, index) => (
                      <div
                        key={fieldItem.id}
                        className="border-2 border-gray-200 rounded-xl p-6 bg-linear-to-br from-white to-gray-50 hover:border-blue-300 transition-all shadow-sm hover:shadow-md space-y-4"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-semibold text-gray-500 bg-gray-200 px-3 py-1 rounded-full">
                            Block {index + 1}
                          </span>
                          {index !== 0 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => remove(index)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              Remove
                            </Button>
                          )}
                        </div>

                        <SelectField
                          control={form.control}
                          name={`content.${index}.type`}
                          label="Content Type"
                          options={[
                            { label: "📝 Text", value: EContentType.TEXT },
                            { label: "🖼️ Image", value: EContentType.IMAGE },
                          ]}
                        />

                        {form.watch(`content.${index}.type`) ===
                        EContentType.TEXT ? (
                          <TextareaField
                            control={form.control}
                            name={`content.${index}.data`}
                            label="Text Content"
                            placeholder="Write your paragraph..."
                          />
                        ) : (
                          <InputField
                            control={form.control}
                            name={`content.${index}.data`}
                            label="Image URL"
                            placeholder="https://example.com/photo.jpg"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                  <Button
                    type="button"
                    onClick={() =>
                      append({ type: EContentType.TEXT, data: "" })
                    }
                    className="bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-all"
                  >
                    + Add Block
                  </Button>
                </section>

                <Separator className="bg-gray-200 h-px" />

                {/* Category */}
                <section className="space-y-4">
                  <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
                    Category
                  </h2>

                  <div className="flex gap-3 items-end">
                    <div className="flex-1">
                      <InputField
                        control={form.control}
                        name="category"
                        label="Category"
                        placeholder="e.g., Politics, Technology, Health"
                      />
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleAutoDetectCategory}
                      className="h-11 border-2 border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 transition-all"
                    >
                      ✨ Auto-Detect
                    </Button>
                  </div>
                </section>

                {/* Submit */}
                <Button type="submit" className="w-full">
                  Publish Article
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NewsForm;
