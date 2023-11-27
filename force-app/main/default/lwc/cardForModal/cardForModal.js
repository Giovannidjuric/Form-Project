import { LightningElement, track, wire} from 'lwc';
import Id from "@salesforce/user/Id";
import getUserFullname from '@salesforce/apex/UserClass.getUserFullname'
import { getPicklistValues } from "lightning/uiObjectInfoApi";
import CASE_STATUS from "@salesforce/schema/Case.Status";
import CASE_REASON from "@salesforce/schema/Case.Reason";
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import CASE_OBJECT from '@salesforce/schema/Case';

export default class CardForModal extends LightningElement {
    @track showModal = false; 
    userId = Id;
    fullName;
    masterRecordTypeId = "012000000000000AAA";
    caseStatusValues;
    caseReasonValues;
    recordTypes;
    showSpinner = false;

    handleSubjectChange(event){
        console.log('handling on change for subject');
        console.log(event.target.value);
    }

    @wire(getObjectInfo, { objectApiName: CASE_OBJECT })
    objectInfo({error, data}) {
        if(data) {
             this.recordTypes = data.recordTypeInfos;
            console.log(JSON.stringify(this.recordTypes));
        } else {
            console.log('error getting case info');
            console.log(JSON.stringify(error));
        }
    }

    @wire(getPicklistValues, { recordTypeId: "012000000000000AAA", fieldApiName: CASE_STATUS})
    getStatusValues({error, data}){
        if(data){
            console.log('yes, we found case status values!')
            console.log(JSON.stringify(data));
            console.dir(data);
            this.caseStatusValues = data.values.map((item) => {
                return {'label': item.label, 'value': item.value}
            })
            console.log('caseStatusValues ' + JSON.stringify(this.caseStatusValues));


        } else if(error){
            console.log('oohnee, error retrieving case status values..');
            console.log(JSON.stringify(error));
            this.caseStatusValues = undefined;

        }
    }

    @wire(getPicklistValues, { recordTypeId: "012000000000000AAA", fieldApiName: CASE_REASON})
    getReasonValues({error, data}){
        if(data){
            console.log('yes, we found reason status values!')
            console.log(JSON.stringify(data));
            console.dir(data);
            this.caseReasonValues = data.values.map((item) => {
                return {'label': item.label, 'value': item.value}
            })
            console.log('caseReasonValues ' + JSON.stringify(this.caseReasonValues));


        } else if(error){
            console.log('oohnee, error retrieving case reason values..');
            console.log(error);
            this.caseReasonValues = undefined;

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

    asyncReset(){
        return new Promise((resolve, reject) => {
            const inputElements = this.template.querySelectorAll('input, textarea, lightning-combobox');
            if(inputElements){
            setTimeout(() => {
                inputElements.forEach(input => {
                    input.value = '';
                    resolve(true);
                })
            }, 1000)
        } else {
                reject(false);
            }
        })
    }
    
    handleReset(){
        this.showSpinner = true;
        this.asyncReset()
        .then((value) => {
            this.showSpinner = false;
            console.log(value);
        })
        .catch((error) => {
            this.showSpinner = false; 
            console.log(error);
        })
        
    }

    
}