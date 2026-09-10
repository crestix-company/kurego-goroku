'use client';
import { pageUrl } from '@/lib/site-url';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
export function PageBreadcrumb({ label }: { label: string }) {
  return (
    <Breadcrumb className="page-breadcrumb" aria-label="現在位置">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href={pageUrl('/')}>トップ</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{label}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
