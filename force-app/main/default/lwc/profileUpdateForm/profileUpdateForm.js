import { LightningElement, api, track } from 'lwc';
import { updateRecord } from 'lightning/uiRecordApi';
import PERSON_ACCOUNT_OBJECT from '@salesforce/schema/Account';
import PHONE_FIELD from '@salesforce/schema/Account.Phone';
import BIRTHDATE_FIELD from '@salesforce/schema/Account.PersonBirthdate';
import TSHIRT_SIZE_FIELD from '@salesforce/schema/Account.T_shirt_size__c';
import SHOE_SIZE_FIELD from '@salesforce/schema/Account.Shoe_size__c';
import SECURE_TOKEN_FIELD from '@salesforce/schema/Account.Secure_Token__c';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class ProfileUpdateForm extends LightningElement {
    @track phone;
    @track birthdate;
    @track tshirtSize;
    @track shoeSize;

    @api token;

    handleChange(event) {
        if (event.target.name === 'phone') {
            this.phone = event.target.value;
        } else if (event.target.name === 'birthdate') {
            this.birthdate = event.target.value;
        } else if (event.target.name === 'tshirtSize') {
            this.tshirtSize = event.target.value;
        } else if (event.target.name === 'shoeSize') {
            this.shoeSize = event.target.value;
        }
    }

    handleSubmit() {
        const fields = {};
        fields[PHONE_FIELD.fieldApiName] = this.phone;
        fields[BIRTHDATE_FIELD.fieldApiName] = this.birthdate;
        fields[TSHIRT_SIZE_FIELD.fieldApiName] = this.tshirtSize;
        fields[SHOE_SIZE_FIELD.fieldApiName] = this.shoeSize;
        fields[SECURE_TOKEN_FIELD.fieldApiName] = this.token;

        const recordInput = { fields };

        updateRecord(recordInput)
            .then(() => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Profile updated successfully',
                        variant: 'success'
                    })
                );
            })
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error updating record',
                        message: error.body.message,
                        variant: 'error'
                    })
                );
            });
    }
}