export interface BannerProps {
  id: number;
  title: string;
  banner_image: string;
  cretaed_at: string;
  updated_at: string;
}

export interface CategoriesDataProps {
  id: number;
  parent_id: number;
  name: string;
  icon: string;
  created_at: string;
  updated_at: string;
  subcategory: CategoriesDataProps[];
}

export interface CategoriesWithPaginationProps {
  data: CategoriesDataProps[];
  totalRecords: number;
  totalPages: number;
  currentPage: number;
}

export interface CategoriesProps {
  status: number;
  data: CategoriesWithPaginationProps;
  message: string;
}

export interface HotBrandaDataProps {
  id: number;
  category_id: string;
  name: string;
  icon: string;
  created_at: string;
  updated_at: string;
}

export interface BrandsWithPaginationProps {
  data: HotBrandaDataProps[];
  totalRecords: number;
  totalPages: number;
  currentPage: number;
}

export interface BrandsProps {
  status: number;
  data: BrandsWithPaginationProps;
  message: string;
}

export interface DashboardDataProps {
  banners: BannerProps[];
  categories: CategoriesDataProps[];
  brands: HotBrandaDataProps[];
  unread_notifications: number;
  unread_alerts: number;
}

export interface DashboardProps {
  status: number;
  data: DashboardDataProps;
  message: string;
}
