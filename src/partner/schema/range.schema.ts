import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Range extends Document {
    @Prop({ type: Number, required: true })
    amount: number;

    @Prop({ type: Number, required: true })
    numberOfLoans: number;    
}

export const RangeSchema = SchemaFactory.createForClass(Range);