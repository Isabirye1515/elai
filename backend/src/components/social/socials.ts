export default class Socials {          
    public name: string;
    public url: string;
    public icon: string;
    public isActive: boolean;
    public isDeleted: boolean;
    public about_id: string;

    constructor(
        name: string,
        url: string,
        icon: string,
        isActive: boolean,
        isDeleted: boolean,
        about_id: string
    ) {
        this.name = name;
        this.url = url;
        this.icon = icon;
        this.isActive = isActive;
        this.isDeleted = isDeleted;
        this.about_id = about_id
    }


    getName() {
        return this.name;
    }
    getUrl() {
        return this.url;
    }
    getIcon() {
        return this.icon;
    }

    getIsActive() {
        return this.isActive;
    }

    getIsDeleted(){
        return this.isDeleted;
    }


    setName(name:string){
        this.name=name;
    }
    
    setUrl(url:string){
        this.url=url;
    }
    
    setIcon(icon:string){
        this.icon=icon; 
    }
    
    setIsActive(isActive:boolean){
        this.isActive=isActive;
    }
    getAboutId(){
        return this.about_id;
    }
    setAboutId(about_id:string){
        this.about_id=about_id
    }


    

    }