import { Body, Controller, Delete, Get, Param, Post, Put, Res } from '@nestjs/common';
import { PartnerDto } from 'src/partner/dto';
import { Partner } from 'src/partner/schema';
import { PartnerService } from 'src/partner/service';

@Controller('partner')
export class PartnerController {
    constructor(private readonly _partnerService: PartnerService) {}

    @Post()
    create(@Body() partnerDto: PartnerDto): Promise<Partner> {
        return this._partnerService.create(partnerDto);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() partnerDto: PartnerDto): Promise<Partner> {
        return this._partnerService.update(id, partnerDto);
    }

    @Get()
    get(): Promise<Array<Partner>> {
        return this._partnerService.find();
    }

    @Get(':id')
    getById(@Param('id') id: string): Promise<Partner> {
        return this._partnerService.findById(id);
    }

    @Delete(':id')
    delete(@Param('id') id: string): Promise<{ acknowledged: boolean, deletedCount: number }> {
        return this._partnerService.delete(id);
    }
}
