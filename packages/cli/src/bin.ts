#!/usr/bin/env node
import { cloak } from '@dotenv-cloak/core'

async function cli() {
  await cloak()

  console.info('[@dotenv-cloak/cli] Done!')
}

cli()
