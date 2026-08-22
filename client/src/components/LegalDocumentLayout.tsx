import { PageTemplate } from "@/components/PageTemplate";
import { useSEO } from "@/hooks/useSEO";

type LegalDocumentLayoutProps = {
  title: string;
  subtitle?: string;
  description: string;
  canonical: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
};

export function LegalDocumentLayout({
  title,
  subtitle,
  description,
  canonical,
  icon,
  children,
}: LegalDocumentLayoutProps): JSX.Element {
  useSEO({ title, description, canonical });

  return (
    <PageTemplate
      title={title}
      subtitle={subtitle}
      icon={icon}
      breadcrumbs={[{ label: "Legal" }, { label: title }]}
    >
      <div className="prose prose-lg prose-invert max-w-4xl">{children}</div>
    </PageTemplate>
  );
}
