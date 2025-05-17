export default class dashboardItem{
    public title:string;
    public description:string
    public url:string
    public value:number
    constructor(title:string,desciption:string,url:string,value:number){
        this.title=title
        this.description=desciption
        this.url=url
        this.value=value

    }
  
    getTitle(){
        return this.title
    }
    setTitle(title:string){
        this.title=title
    }
    
    
}