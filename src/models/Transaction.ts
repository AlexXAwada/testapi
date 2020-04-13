import { Schema, model } from 'mongoose';

const TransactionSchema = new Schema({
    title: { type: String, required: true },
    url: { type: String, required: true},
    amount: { type: Number, required: true},
    content: { type: String, required: true, },
},{
    timestamps:true,
});

export default model('Transaction', TransactionSchema);