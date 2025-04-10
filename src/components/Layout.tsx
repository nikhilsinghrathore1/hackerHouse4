import React, { ReactNode } from 'react';
import { Menu, X } from 'lucide-react';
import { Navbar } from './Navbar';

type LayoutProps = {
  children: ReactNode;
  sidebar: ReactNode;
  showSidebar: boolean;
  toggleSidebar: () => void;
};

export const Layout: React.FC<LayoutProps> = ({
  children,
  sidebar,
  showSidebar,
  toggleSidebar,
}) => {
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Navbar toggleSidebar={toggleSidebar} />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div 
          className={`bg-white border-r w-72 transition-all duration-300 flex-shrink-0 ${
            showSidebar ? 'translate-x-0' : '-translate-x-full'
          } md:translate-x-0 fixed md:static h-[calc(100vh-64px)] z-20`}
        >
          <div className="flex justify-end p-2 md:hidden">
            <button 
              onClick={toggleSidebar}
              className="p-1 rounded-md hover:bg-gray-100"
            >
              <X size={20} />
            </button>
          </div>
          <div className="overflow-y-auto h-full">
            {sidebar}
          </div>
        </div>

        {/* Mobile sidebar overlay */}
        {showSidebar && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
            onClick={toggleSidebar}
          />
        )}

        {/* Main content */}
        <div className="flex-1 overflow-hidden bg-white">
          {children}
        </div>
      </div>
    </div>
  );
};
