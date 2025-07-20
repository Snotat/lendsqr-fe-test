import React from 'react';
import ReactDOM from 'react-dom';

interface UserMenuCardPortalProps {
  children: React.ReactNode;
  buttonRect: DOMRect | null;
}

const UserMenuCardPortal: React.FC<UserMenuCardPortalProps> = ({ children, buttonRect }) => {
  const el = document.getElementById('menu-root') as HTMLElement;
  if (!buttonRect) return null;
  const portalStyle: React.CSSProperties = {
    position: 'absolute',
    zIndex: 10000, 
    width:'fit-content',
    height:'fit-content',
    top: buttonRect.top + buttonRect.height + window.scrollY + 5,
    left: buttonRect.left + window.scrollX - 180 + buttonRect.width,
  };

  return ReactDOM.createPortal(
    <div style={portalStyle}>
      {children}
    </div>,
    el
  );
};

export default UserMenuCardPortal;