import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";
import { PortalLayout } from "./PortalLayout";

interface FormField {
  id: string;
  label: string;
  type: "text" | "email" | "select" | "checkbox" | "textarea";
  required: boolean;
  options?: string[];
  placeholder?: string;
}

interface FormTemplate {
  id: string;
  name: string;
  description: string;
  fields: FormField[];
}

const formTemplates: FormTemplate[] = [
  {
    id: "FT-001",
    name: "Access Request",
    description: "Request access to systems, applications, or resources",
    fields: [
      {
        id: "f1",
        label: "Resource Type",
        type: "select",
        required: true,
        options: ["VPN", "Cloud Storage", "Database", "Application", "Other"],
      },
      {
        id: "f2",
        label: "Justification",
        type: "textarea",
        required: true,
        placeholder: "Explain why you need this access",
      },
      {
        id: "f3",
        label: "Urgency",
        type: "select",
        required: true,
        options: ["Low", "Medium", "High", "Critical"],
      },
      {
        id: "f4",
        label: "Manager Approval",
        type: "checkbox",
        required: true,
      },
    ],
  },
  {
    id: "FT-002",
    name: "Device Request",
    description: "Request new hardware or device replacement",
    fields: [
      {
        id: "f1",
        label: "Device Type",
        type: "select",
        required: true,
        options: ["Laptop", "Desktop", "Monitor", "Printer", "Phone"],
      },
      {
        id: "f2",
        label: "Replacement / New Device",
        type: "select",
        required: true,
        options: ["Replacement (existing device)", "New Device"],
      },
      {
        id: "f3",
        label: "Specifications Needed",
        type: "textarea",
        required: false,
        placeholder: "Any specific requirements?",
      },
    ],
  },
  {
    id: "FT-003",
    name: "Onboarding Request",
    description: "Submit new employee onboarding information",
    fields: [
      {
        id: "f1",
        label: "Full Name",
        type: "text",
        required: true,
        placeholder: "First and Last Name",
      },
      {
        id: "f2",
        label: "Email",
        type: "email",
        required: true,
        placeholder: "name@company.com",
      },
      {
        id: "f3",
        label: "Department",
        type: "select",
        required: true,
        options: ["Sales", "Marketing", "Engineering", "Operations", "HR"],
      },
      {
        id: "f4",
        label: "Start Date",
        type: "text",
        required: true,
        placeholder: "MM/DD/YYYY",
      },
    ],
  },
];

export function PortalAdvancedForms() {
  const [selectedTemplate, setSelectedTemplate] = useState<FormTemplate | null>(
    null
  );
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleFieldChange = (fieldId: string, value: any) => {
    setFormData((prev) => ({ ...prev, [fieldId]: value }));
  };

  const handleSubmit = () => {
    const allRequired = selectedTemplate?.fields
      .filter((f) => f.required)
      .every((f) => formData[f.id]);

    if (!allRequired) {
      alert("Please fill in all required fields");
      return;
    }

    console.log("Form submitted:", {
      template: selectedTemplate?.id,
      data: formData,
      submittedAt: new Date(),
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setSelectedTemplate(null);
      setFormData({});
    }, 3000);
  };

  const renderContent = () => {
    if (submitted) {
      return (
        <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
          <CardContent className="pt-6 text-center">
            <CheckCircle className="mx-auto mb-2 text-green-600" size={40} />
            <p className="text-green-700 dark:text-green-300 font-medium">
              ✅ Form submitted successfully!
            </p>
            <p className="text-sm text-green-600 dark:text-green-400 mt-1">
              A ticket has been created and sent for processing.
            </p>
          </CardContent>
        </Card>
      );
    }

    if (!selectedTemplate) {
      return (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Service Request Forms</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Select a form template to submit your request
          </p>

          <div className="grid gap-4 md:grid-cols-2">
            {formTemplates.map((template) => (
              <Card
                key={template.id}
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => setSelectedTemplate(template)}
                data-testid={`form-template-${template.id}`}
              >
                <CardHeader>
                  <CardTitle className="text-lg">{template.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {template.description}
                  </p>
                  <Badge variant="outline">
                    {template.fields.length} fields
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{selectedTemplate.name}</h2>
        <Button
          variant="outline"
          onClick={() => setSelectedTemplate(null)}
          data-testid="button-back-to-forms"
        >
          Back to Forms
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            {selectedTemplate.description}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {selectedTemplate.fields.map((field) => (
            <div key={field.id} className="space-y-2">
              <label className="block text-sm font-medium">
                {field.label}
                {field.required && <span className="text-red-600 ml-1">*</span>}
              </label>

              {field.type === "text" && (
                <Input
                  type="text"
                  placeholder={field.placeholder}
                  value={formData[field.id] || ""}
                  onChange={(e) =>
                    handleFieldChange(field.id, e.target.value)
                  }
                  data-testid={`input-form-${field.id}`}
                />
              )}

              {field.type === "email" && (
                <Input
                  type="email"
                  placeholder={field.placeholder}
                  value={formData[field.id] || ""}
                  onChange={(e) =>
                    handleFieldChange(field.id, e.target.value)
                  }
                  data-testid={`input-form-${field.id}`}
                />
              )}

              {field.type === "select" && (
                <select
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  value={formData[field.id] || ""}
                  onChange={(e) =>
                    handleFieldChange(field.id, e.target.value)
                  }
                  data-testid={`select-form-${field.id}`}
                >
                  <option value="">Select an option...</option>
                  {field.options?.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              )}

              {field.type === "textarea" && (
                <Textarea
                  placeholder={field.placeholder}
                  value={formData[field.id] || ""}
                  onChange={(e) =>
                    handleFieldChange(field.id, e.target.value)
                  }
                  className="min-h-24"
                  data-testid={`textarea-form-${field.id}`}
                />
              )}

              {field.type === "checkbox" && (
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData[field.id] || false}
                    onChange={(e) =>
                      handleFieldChange(field.id, e.target.checked)
                    }
                    className="w-4 h-4 rounded border-gray-300"
                    data-testid={`checkbox-form-${field.id}`}
                  />
                  <span className="text-sm">I confirm this information</span>
                </label>
              )}
            </div>
          ))}

          <Button
            onClick={handleSubmit}
            className="w-full bg-blue-600 hover:bg-blue-700"
            data-testid="button-submit-advanced-form"
          >
            Submit Request
          </Button>
        </CardContent>
      </Card>
    </div>
    );
  };

  return (
    <PortalLayout title="Request Forms">
      {renderContent()}
    </PortalLayout>
  );
}
