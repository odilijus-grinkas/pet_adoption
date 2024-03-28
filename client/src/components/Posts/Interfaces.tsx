export interface Post {
    pet_name: string;
    city_id: number;
    city: City;
    description: string;
    created: Date;
    user: User;
}
export interface User {
    id: number;
    user: string;
    email: string;
}

export interface City {
    city: string;
    name: string;
}