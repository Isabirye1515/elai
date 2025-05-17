export default class Menu {
    public name: string;
    public description: string;
    public hasChildren: boolean;
    public children: Menu[];
    public parentId: number;
    public url: string;
    public isActive: boolean;
    public isDeleted: boolean;

    constructor(
        name: string,
        description: string,
        hasChildren: boolean,
        children: Menu[],
        parentId: number,
        url: string,
        isActive: boolean,
        isDeleted: boolean
    ) {
        this.name = name;
        this.description = description;
        this.hasChildren = hasChildren;
        this.children = children;
        this.parentId = parentId;
        this.url=url
        this.isActive = isActive;
        this.isDeleted = isDeleted;
    }


    getName() {
        return this.name;
    }
    getDescription() {
        return this.description;
    }
    getHasChildren() {
        return this.hasChildren;
    }
    getChildren() {
        return this.children;
    }
    getParentId() {
        return this.parentId;
    }

    setParentId(parentId: number) {
        this.parentId = parentId;
    }
    setName(name: string) {
        this.name = name;
    }
    setDescription(description: string) {
        this.description = description;
    }
    setHasChildren(hasChildren: boolean) {
        this.hasChildren = hasChildren;
    }
    setChildren(children: Menu[]) {
        this.children = children;
    }
    setIsActive(isActive: boolean) {
        this.isActive = isActive;
    }
    setIsDeleted(isDeleted: boolean) {
        this.isDeleted = isDeleted;
    }

    getUrl() {
        return this.url;
    }
    setUrl(url: string) {
        this.url = url;
    }
    toString() {
        return `Menu [ name=${this.name}, description=${this.description}, hasChildren=${this.hasChildren}, parentId=${this.parentId}, isActive=${this.isActive}, isDeleted=${this.isDeleted}]`;
    }
}
