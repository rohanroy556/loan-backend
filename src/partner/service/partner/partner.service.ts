import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoanDto, PartnerDto } from 'src/partner/dto';
import { Partner } from 'src/partner/schema';

@Injectable()
export class PartnerService {
    constructor(@InjectModel(Partner.name) private _partnerModel: Model<Partner>) {}

    create(partnerDto: PartnerDto): Promise<Partner> {
        const partner = new this._partnerModel(partnerDto);
        return partner.save();
    }

    update(id: string, partnerDto: PartnerDto): Promise<Partner> {
        return this._partnerModel.findByIdAndUpdate(id, { $set: partnerDto }).exec();
    }

    find(): Promise<Array<Partner>> {
        return this._partnerModel.find().exec();
    }

    findById(id: string): Promise<Partner> {
        return this._partnerModel.findById(id).exec();
    }

    delete(id: string): Promise<{ acknowledged: boolean, deletedCount: number }> {
        return this._partnerModel.deleteOne({ id }).exec();
    }

    findLoanLeft() {
        return this._partnerModel.find().exec().then(result => result.map(
            partner => ({ _id: partner._id, name: partner.name, limitLeft: partner.limitLeft })
        ));
    }

    findLoanLeftById(id: string) {
        return this._partnerModel.findById(id).exec().then(
            partner => ({ _id: partner._id, name: partner.name, limitLeft: partner.limitLeft })
        );
    }

    pushLoanById(id: string, loan: LoanDto) {
        return this._partnerModel.findByIdAndUpdate(id, { $push: { loans: loan } }).exec();
    }
}
