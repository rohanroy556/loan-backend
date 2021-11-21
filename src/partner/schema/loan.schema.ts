import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Loan extends Document {
    @Prop({ type: Number, required: true })
    amount: number;

    @Prop({ type: Date, required: true })
    time: Date;
}

export const LoanSchema = SchemaFactory.createForClass(Loan);