export class Users{
    constructor(
        public _id:string,
        public name: string,
        public nick: string,
        public email: string,
        public password: string,
        public role:string,
        public image:string
    ){}
}