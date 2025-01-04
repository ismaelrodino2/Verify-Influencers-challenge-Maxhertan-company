interface PageWrapperProps {
  children: React.ReactNode;
}

export function PageWrapper({ children }: PageWrapperProps) {
  return (
    <div className="pt-16"> {/* pt-16 corresponde à altura da navbar (h-16) */}
      {children}
    </div>
  );
} 