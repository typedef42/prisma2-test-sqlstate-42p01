import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Photon } from '@prisma/photon';

@Injectable()
export class PhotonService extends Photon
  implements OnModuleInit, OnModuleDestroy {
  constructor() {
    super();
  }
  async onModuleInit() {
    await this.connect();
  }

  async onModuleDestroy() {
    await this.disconnect();
  }
}
