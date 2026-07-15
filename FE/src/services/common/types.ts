export interface ILocation {
  id: number;
  code: string;
  name: string;
  englishName: string;
  administrativeLevel: string;
}
export interface IDepartment {
  id: number;
  code: string;
  name: string;
  slug: string;
  isActive: boolean;
}
