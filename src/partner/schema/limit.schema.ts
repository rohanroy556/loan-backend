import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Range, RangeSchema } from "./range.schema";

@Schema()
export class Limit extends Document {
    @Prop({ type: RangeSchema, required: true })
    daily: Range;

    @Prop({ type: RangeSchema, required: true })
    monthly: Range;
}

export const LimitSchema = SchemaFactory.createForClass(Limit);