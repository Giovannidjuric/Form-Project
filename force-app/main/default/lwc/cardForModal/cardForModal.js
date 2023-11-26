import { LightningElement, track, wire} from 'lwc';
import Id from "@salesforce/user/Id";
import getUserFullname from '@salesforce/apex/UserClass.getUserFullname'

export default class CardForModal extends LightningElement {
    @track showModal = false; 
    userId = Id;
    fullName;

    @wire(getUserFullname, {userId:'$userId'})
    handleGetFullname({error, data}){
        if(data){
            console.log('we have data');
            console.log(data);
            this.fullName = data; 
        } else if(error){
            console.log('ohno, we have an exception');
            console.log(error);
            this.fullName = undefined; 
        }
    }

    openModal(){
        console.log('something is happening..');
        console.log(`value of showModal before onclick: ${this.showModal}`);
        
        this.showModal = !this.showModal; 
        console.log(`value of showModal after onclick: ${this.showModal}`);
    }
}