export interface NavItem {
  key: string;
  href: string;
}

export interface ServicePlan {
  key: string;
  featured?: boolean;
}

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  text: string;
  initials: string;
}

export interface PortfolioItem {
  title: string;
  category: string;
  categoryKey: string;
  description: string;
  tags: string[];
  color: string;
}
