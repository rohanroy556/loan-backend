import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Limit, LimitSchema } from "./limit.schema";
import { Loan, LoanSchema } from "./loan.schema";

export interface LimitLeft {
    daily: { amount: number, numberOfLoans: number },
    monthly: { amount: number, numberOfLoans: number }
}

export function sameDay(date: Date) {
    const now = new Date();
    return date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth() && date.getDate() === now.getDate();
}

export function sameMonth(date: Date) {
    const now = new Date();
    return date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth();
}

export function limitLeft(limit: Limit, loans: Array<Loan>) {
    const sameDayLoans = loans.filter(loan => sameDay(loan.time)),
        sameMonthLoans = loans.filter(loan => sameMonth(loan.time)),
        daily = {
            amount: limit.daily.amount - sameDayLoans.reduce((s, a) => s + a.amount, 0),
            numberOfLoans: limit.daily.numberOfLoans - sameDayLoans.length
        },
        monthly = {
            amount: limit.monthly.amount - sameMonthLoans.reduce((s, a) => s + a.amount, 0),
            numberOfLoans: limit.monthly.numberOfLoans - sameMonthLoans.length
        };
    return { daily, monthly };
}

@Schema()
export class Partner extends Document {
    @Prop({ type: String, required: true })
    name: string;

    @Prop({ type: LimitSchema, required: true })
    limit: Limit;

    @Prop({
        type: [LoanSchema],
        validate: function(value: Array<Loan>) {
            const left = limitLeft(this.limit, value);
            return left.daily.amount >= 0 && left.daily.numberOfLoans >= 0
                && left.monthly.amount >= 0 && left.monthly.numberOfLoans >= 0;
        }
    })
    loans: Array<Loan>;

    limitLeft: LimitLeft;
}

export const PartnerSchema = SchemaFactory.createForClass(Partner);
PartnerSchema.virtual('limitLeft').get(function (): LimitLeft {
    return limitLeft(this.limit, this.loans);
});