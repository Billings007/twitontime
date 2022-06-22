interface PageLayoutProps {
  children: React.ReactNode;
}

export default function PageLayout({ children }: PageLayoutProps) {
  return <div className="max-w-9xl mx-auto px-2 sm:px-6 lg:px-8">{children}</div>;
}
