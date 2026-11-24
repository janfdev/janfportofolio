export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  year: string;
  category: "Award" | "Certificate";
  credentialId?: string;
  url?: string;
  image?: string;
  description?: string;
}

export const CERTIFICATES_DATA: CertificateItem[] = [
  {
    id: "cert-1",
    title: "1st Place Winner - National Web Innovation Hackathon",
    issuer: "TechFest / Indonesian Developer Community",
    year: "2024",
    category: "Award",
    credentialId: "AWARD-HCK-2024-01",
    url: "https://github.com/janfdev",
    description:
      "Awarded 1st place for architecting high-performance real-time web solutions with autonomous AI retrieval and resilient database design.",
  },
  {
    id: "cert-2",
    title: "Certified Fullstack Web Developer",
    issuer: "Dicoding Indonesia",
    year: "2024",
    category: "Certificate",
    credentialId: "DCD-FSW-98214",
    url: "https://www.dicoding.com/",
    description:
      "Comprehensive certification covering modern frontend architecture, RESTful API engineering, SQL/NoSQL databases, and cloud deployment.",
  },
  {
    id: "cert-3",
    title: "Cloud Infrastructure & Backend Specialization",
    issuer: "Google Cloud Skills / Dicoding",
    year: "2024",
    category: "Certificate",
    credentialId: "GCP-BE-44129",
    url: "https://cloud.google.com/",
    description:
      "Specialization in architecting containerized microservices, serverless functions, database indexing, and low-latency API gateways.",
  },
  {
    id: "cert-4",
    title: "AI Engineer: Prompting & LLM Agent Orchestration",
    issuer: "Digital Hero Academy",
    year: "2024",
    category: "Certificate",
    credentialId: "DHA-AI-7721",
    url: "https://digitalhero.id",
    description:
      "Advanced certification in integrating LLM APIs, function calling, speech-to-text workflows, and multi-agent systems.",
  },
  {
    id: "cert-5",
    title: "Outstanding Undergraduate Informatics Researcher",
    issuer: "Universitas Muhammadiyah Cirebon",
    year: "2023",
    category: "Award",
    credentialId: "UMC-AWD-2023",
    description:
      "Recognized for research and development contributions to the University Library operational management system.",
  },
];
