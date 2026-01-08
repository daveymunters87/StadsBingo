export interface MenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  action?: "navigate" | "close";
}

export interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "danger" | "warning" | "info";
}

export interface ImageModalProps {
  imageUrl: string;
  onClose: () => void;
  title?: string;
}

export interface HamburgerMenuProps {
  isOpen: boolean;
  onClose: () => void;
  currentPath?: string;
}

export interface HamburgerTriggerProps {
  onClick: () => void;
  className?: string;
}

export interface PageHeaderProps {
  title: string;
  subtitle: string;
}

export interface ActionButtonsProps {
  onAdd: () => void;
  onCancel: () => void;
  showCancel: boolean;
  addLabel: string;
}

export interface StatusFilterProps {
  value: string;
  onChange: (value: string) => void;
  options: Array<{
    value: string;
    label: string;
  }>;
}

export interface AdminLayoutProps {
  children: React.ReactNode;
}