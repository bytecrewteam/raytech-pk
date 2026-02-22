import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
  fullWidth?: boolean; // If true, content takes full width (for backgrounds)
}

/**
 * Layout wrapper with configurable width restriction
 * Use fullWidth={true} for sections that should extend to edges (like hero, categories)
 * Use fullWidth={false} (default) for content areas at 90% width
 */
export const Layout = ({ children, fullWidth = false }: LayoutProps) => {
  return (
    <div 
      className={`mx-auto ${fullWidth ? 'w-full' : 'w-[90%]'} transition-all duration-300`}
      style={{ maxWidth: fullWidth ? '100%' : '90%' }}
    >
      {children}
    </div>
  );
};

export default Layout;
