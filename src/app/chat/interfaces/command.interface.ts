export interface CommandResponse {
  author: string;
  command: Command;
}

export interface Command {
  type: string;
  data: GeoCoords | [number, number] | [string, string] | string;
}

export interface GeoCoords {
  lat: number;
  lng: number;
}
