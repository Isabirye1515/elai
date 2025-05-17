import socials from '../social/socials'
export default class About {
  public name: string;
  public status: boolean;
  public contact: string;
  public email: string;
  public address: string;
  public phone: string;
  public website: string;
  public description: string;
  public social: socials[];
  public image: string;

  constructor(name: string, status: boolean, contact: string, email: string, address: string, phone: string, website: string, description: string, social: socials[], image: string) {
    this.name = name;
    this.status = status;
    this.contact = contact;
    this.email = email;
    this.address = address;
    this.phone = phone;
    this.website = website;
    this.description = description;
    this.social = social;
    this.image = image;

  }

  getName() {
    return this.name;
  }
  getStatus() {
    return this.status;
  }
  getContact() {
    return this.contact;
  }
  getEmail() {
    return this.email;
  }
  getAddress() {
    return this.address;
  }
  getPhone() {
    return this.phone;
  }
  getWebsite() {
    return this.website;
  }
  getDescription() {
    return this.description;
  }
  getSocial() {
    return this.social;
  }
  getImage() {
    return this.image;
  }
  setName(name: string) {
    this.name = name;
  }
  setStatus(status: boolean) {
    this.status = status;
  }
  setContact(contact: string) {
    this.contact = contact;
  }
  setEmail(email: string) {
    this.email = email;
  }
  setAddress(address: string) {
    this.address = address;
  }
  setPhone(phone: string) {
    this.phone = phone;
  }
  setWebsite(website: string) {
    this.website = website;
  }
  setDescription(description: string) {
    this.description = description;
  }
  setSocial(social: []) {
    this.social = social;
  }
  setImage(image: string) {
    this.image = image;
  }
  toString() {
    return `About: ${this.name}, ${this.status}, ${this.contact}, ${this.email}, ${this.address}, ${this.phone}, ${this.website}, ${this.description}, ${this.social}, ${this.image}`;
  }

}
