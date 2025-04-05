export type LoginType = {
    email: string;
    password: string;
};

export type RegisterType = {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
};

export type UserResponseType = {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: string;
    address: string;
    gender: string;
    avatar: string;
};
