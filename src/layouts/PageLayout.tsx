interface PageLayoutProps {
  children: React.ReactNode;
}

export default function PageLayout({ children }: PageLayoutProps) {
  return <div className="max-w-9xl bg-darkMode-1">{children}</div>;
}
