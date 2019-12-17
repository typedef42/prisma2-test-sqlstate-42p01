/* eslint-disable @typescript-eslint/no-var-requires */

const { Client } = require('pg');
const NodeEnvironment = require('jest-environment-node');
const nanoid = require('nanoid');
const util = require('util');
const path = require('path');
const exec = util.promisify(require('child_process').exec);

const prismaBinary = path.join('node_modules/.bin/prisma2');

class PrismaTestEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config);

    this.schema = `test_${nanoid()}`;
    this.connectionString = `${process.env.POSTGRES_TEST_URL}${this.schema}`;
  }

  async setup() {
    process.env.POSTGRES_URL = this.connectionString;
    this.global.process.env.POSTGRES_URL = this.connectionString;

    await exec(`${prismaBinary} lift up`);
    return super.setup();
  }

  async teardown() {
    const client = new Client({
      connectionString: this.connectionString,
    });
    await client.connect();
    await client.query(`DROP SCHEMA IF EXISTS "${this.schema}" CASCADE`);
    await client.end();
  }
}

module.exports = PrismaTestEnvironment;
