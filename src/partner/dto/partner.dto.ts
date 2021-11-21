export class LimitDto {
    readonly daily: Range;
    readonly monthly: Range;
}

export class LoanDto {
    readonly amount: number;
    readonly time: Date;
}

export class PartnerDto {
    readonly name: string;
    readonly limit: LimitDto;
    readonly loans: Array<LoanDto>;
}

export class RangeDto {
    readonly amount: number;
    readonly numberOfLoans: number;    
}
