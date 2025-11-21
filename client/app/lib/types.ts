export interface searchSongResult {
    success: boolean;
    data: data;
}
export interface data {
    total: number;
    start: number;
    results: searchResults[];
}
export interface searchResults {
    id: string;
    name: string;
    artists: { primary: artists[] };
    image: downloadUrl[];
    addedBy: string;
    source?: "youtube";
    downloadUrl: downloadUrl[];


}
export interface downloadUrl {
    quality: string;
    url: string;
}

export interface artists {
    id: number;
    name: string;
    role: string;
    image: [];
    type: "artist";
    url: string;
}