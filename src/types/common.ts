export interface Image {
  url: string;
  path: string;
}

export type AsyncPageParams<T extends Record<string, any>> = {
  params: Promise<T>;
};

interface IDParam {
  id: string;
}

export type PageIDParams = AsyncPageParams<IDParam>;
