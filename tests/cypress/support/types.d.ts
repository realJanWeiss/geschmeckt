interface User {
    name: string;
    mail: string;
    password: string;
}

interface RegisteredUser extends User {
    id: string;
    token: string;
}