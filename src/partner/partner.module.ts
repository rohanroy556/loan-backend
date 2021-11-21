import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LoanController, PartnerController } from './controller';
import { Partner, PartnerSchema } from './schema';
import { PartnerService } from './service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Partner.name, schema: PartnerSchema }
        ])
    ],
    controllers: [
      LoanController,
      PartnerController
    ],
    providers: [PartnerService]
})
export class PartnerModule {}
