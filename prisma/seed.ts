import { Photon } from '@prisma/photon';

const photon = new Photon();

async function populateMakers() {
  // does nothing yet
}

async function main() {
  await populateMakers();
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await photon.disconnect();
  });
