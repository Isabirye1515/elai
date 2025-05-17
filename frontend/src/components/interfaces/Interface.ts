export interface MenuItem {
  id?: number;
  name: string;
  description: string;
  hasChildren: boolean;
  children?: MenuItem[];
  parentId?: number;
  url?: string;
  isActive: boolean;
  isDeleted: boolean;
}

export interface About {
  id?:number,
  name: string;
  status: boolean;
  contact: string;
  email: string;
  address: string;
  phone: string;
  website: string;
  description: string;
  social: socials[];
  image: string;
}
export interface socials {
  id?: number;
  name: string;
  url: string;
  icon: string;
  isActive: boolean;
  isDeleted: boolean;
  about_id: number;
}
export interface Contacts {
  id?: number;
  name:string;
  uniqId:string;
}

export interface Persons {
  id?: number;
  image: string;
  name: string;
  username: string;
  email: string;
  phone: string;
  occupation: string;
  contact_id: string
}

export interface Dashboards {
  id?: number;
  title: string;
  description: string;
  url: string;
  value: number;
}
export interface Message {
  id?: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: Date;
  updatedAt: Date;
  type: 'email' | 'websocket';
}
export interface dashboardItem {
  id?: number;
  title: string;
  description: string;
  url: string;
  value: number;
}
export interface Product {
  id?:number
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  stock: number;
  rating: number;
  reviews: number;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  discount: number;
  manufacturer: string;
  warranty: string;
}
