import React, { ReactElement } from 'react';
import "./layout.scss"
interface LayoutProps {
  children: ReactElement;
}
// Used for consistent styling throughout site.
export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-vh-100">
      {children}
    </div>
  );
}
