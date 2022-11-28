export interface Staffel {
    title: string;
    teams: Team[];
}

export interface Trikot {
    imageUrl: string;
    mainColor?: string;
}

export interface Team {
    name: string;
    logo?: string;
    groupImage?: string;
    trainer?: string;
    trikots?: Trikot[];
}   