export type KnowledgeScope = "public" | "internal" | "client";

export type KnowledgeType =
  | "client_documentation"
  | "sop"
  | "kb_article"
  | "microsoft_365_documentation"
  | "network_topology"
  | "product_documentation"
  | "internal_procedure"
  | "ticket_resolution"
  | "client_context"
  | "contract_policy"
  | "document"
  | "troubleshooting_guide";

export type KnowledgeStatus = "active" | "draft" | "superseded" | "expired";

export type KnowledgeSource = {
  kind: "canonical" | "policy" | "website" | "vendor" | "ticket" | "document" | "procedure";
  label: string;
  url?: string;
};

export type KnowledgeRecord = {
  id: string;
  title: string;
  summary: string;
  content: string;
  scope: KnowledgeScope;
  type: KnowledgeType;
  status: KnowledgeStatus;
  /** 0-100. Higher values win when sources disagree. */
  authority: number;
  effectiveDate?: string;
  reviewedAt?: string;
  clientId?: string;
  vendor?: string;
  product?: string;
  service?: string;
  tags: string[];
  modes?: string[];
  pageTypes?: string[];
  source: KnowledgeSource;
};

export type KnowledgeRetrievalRequest = {
  query: string;
  scope: KnowledgeScope;
  clientId?: string;
  mode?: string;
  pageType?: string;
  limit?: number;
};

export type KnowledgeRetrievalHit = {
  record: KnowledgeRecord;
  score: number;
  reasons: string[];
};
