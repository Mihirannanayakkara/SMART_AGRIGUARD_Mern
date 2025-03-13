import mongoose from "mongoose";

const farmerSchema = mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            match: /^[A-Za-z]+$/,
        },
        lastName: {
            type: String,
            required: true,
            match: /^[A-Za-z]+$/,
        },
        email: {
            type: String,
            required:true,
            unique: true,

        },
        role: {
            type: String,
            required: true,
            enum: ['farmer', 'home gardner','agriculutre officer']
        },
        gender: {
            type: String,
            required: true,
            enum: ['Male','Female'],
        },
        dob: {
            type: Date,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        contactNumber: {
            type: String,
            required: true,
            validate: {
                validator: function(value) {
                    return /^[0-9]{10}$/.test(value);
                },
                message: 'Contact number should be 10 digit number without letters.'
            }
        }
    }
);


export const Farmer = mongoose.model('Farmer',farmerSchema);
