import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { LoanDto } from 'src/partner/dto';
import { PartnerService } from 'src/partner/service';

@Controller('loan')
export class LoanController {
    constructor(private readonly _partnerService: PartnerService) {}

    @Get()
    get() {
        return this._partnerService.findLoanLeft();
    }

    @Get(':partnerId')
    getById(@Param('partnerId') partnerId: string) {
        return this._partnerService.findLoanLeftById(partnerId);
    }

    @Patch(':partnerId')
    pushLoanById(@Param('partnerId') partnerId: string, @Body() { amount = 0 }: LoanDto) {
        return this._partnerService.pushLoanById(partnerId, { amount, time: new Date });
    }
}
