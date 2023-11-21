export interface ICountry {
  id: number;
  name: string;
  description: string;
}

export interface IUpdateCountry {
  id: number;
  data: ICountry;
}
export interface IAddCountry {
  data: ICountry;
}
