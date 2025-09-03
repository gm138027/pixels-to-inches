import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslations } from '../../lib/translations';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumb({ items, className = '' }: BreadcrumbProps) {
  const router = useRouter();
  const t = useTranslations('breadcrumb');

  // 如果没有提供自定义items，则根据当前路径自动生成
  const breadcrumbItems = items || generateBreadcrumbItems(router.pathname, t);

  if (breadcrumbItems.length <= 1) {
    return null; // 如果只有首页，不显示面包屑
  }

  return (
    <nav 
      className={`flex items-center space-x-2 text-sm text-neutral-600 ${className}`}
      aria-label="Breadcrumb"
    >
      {breadcrumbItems.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && (
            <span className="text-neutral-400" aria-hidden="true">
              /
            </span>
          )}
          {item.href && index < breadcrumbItems.length - 1 ? (
            <Link 
              href={item.href}
              className="hover:text-neutral-900 transition-colors duration-200"
            >
              {item.label}
            </Link>
          ) : (
            <span 
              className={index === breadcrumbItems.length - 1 ? 'text-neutral-900 font-medium' : ''}
              aria-current={index === breadcrumbItems.length - 1 ? 'page' : undefined}
            >
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}

/**
 * 根据路径自动生成面包屑项目
 */
function generateBreadcrumbItems(pathname: string, t: (key: string) => string): BreadcrumbItem[] {
  const items: BreadcrumbItem[] = [
    {
      label: t('home'),
      href: '/'
    }
  ];

  // 根据路径添加相应的面包屑项目
  switch (pathname) {
    case '/privacy':
      items.push({
        label: t('privacy')
      });
      break;
    case '/terms':
      items.push({
        label: t('terms')
      });
      break;
    default:
      // 对于其他路径，可以根据需要添加更多逻辑
      break;
  }

  return items;
}

/**
 * 面包屑容器组件，提供标准的样式和间距
 */
export function BreadcrumbContainer({ 
  children, 
  className = '' 
}: { 
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`bg-neutral-50 border-b border-neutral-200 py-3 ${className}`}>
      <div className="container mx-auto px-4">
        {children}
      </div>
    </div>
  );
}
