import { LightningElement, track, wire} from 'lwc';
import Id from "@salesforce/user/Id";
import getUserFullname from '@salesforce/apex/UserClass.getUserFullname'
import { getPicklistValues } from "lightning/uiObjectInfoApi";
import CASE_STATUS from "@salesforce/schema/Case.Status";
import CASE_REASON from "@salesforce/schema/Case.Reason";

export default class CardForModal extends LightningElement {
    @track showModal = false; 
    userId = Id;
    fullName;
    masterRecordTypeId = "012000000000000AAA";
    caseStatusValues;
    caseReasonValues;
    error;

    @wire(getPicklistValues, { recordTypeId: this.masterRecordTypeId, fieldApiName: CASE_STATUS})
    getStatusValues({error, data}){
        if(data){
            console.log('yes, we found case status values!')
            console.log(data);
            this.caseStatusValues = data;
            this.error = undefined;
        } else if(error){
            console.log('oohnee, error retrieving case status values..');
            console.log(error);
            this.error = error;
            this.caseStatusValues = undefined;

        }
    }

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