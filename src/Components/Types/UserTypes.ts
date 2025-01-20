export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  fullName: string;
};

export type ListType = {
  data: User[];
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
};
