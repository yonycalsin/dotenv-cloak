import path from 'node:path'
import fs from 'node:fs'

interface LoadConfigOptions {
  cwdPath?: string
  envPath?: string
  packagePath?: string
}

export interface CloakConfig {
  ignoreEnvVars: string[]
  outputPath: string
}

const DEFAULT_CWD_PATH = process.cwd()

const DEFAULT_ENV_FILE_NAME = '.env'

const DEFAULT_PACKAGE_FILE_NAME = 'package.json'

const DEFAULT_CLOAK_CONFIG = {
  ignoreEnvVars: ['NODE_ENV', 'DEBUG'],
  outputPath: '.env.example',
}

export function loadConfig(options = {} as LoadConfigOptions) {
  const cwdPath = options.cwdPath ?? DEFAULT_CWD_PATH

  const envFileName = options.envPath ?? DEFAULT_ENV_FILE_NAME

  const envFileFullPath = path.join(cwdPath, envFileName)

  const packageFileName = options.packagePath ?? DEFAULT_PACKAGE_FILE_NAME

  const packageFileFullPath = path.join(cwdPath, packageFileName)

  try {
    const envFileContent = fs.readFileSync(envFileFullPath, {
      encoding: 'utf-8',
    })

    const packageFileContent = require(packageFileFullPath)

    const cloakConfig = Object.assign({}, DEFAULT_CLOAK_CONFIG, packageFileContent?.dotenvCloak ?? {})

    return {
      info: {
        cwdPath,
        envFileName,
        envFileFullPath,
        packageFileName,
        packageFileFullPath,
        packageFileContent,
      },
      envContent: envFileContent,
      configContent: {
        ...cloakConfig,
        ignoreEnvVars: [...new Set([...DEFAULT_CLOAK_CONFIG.ignoreEnvVars, ...cloakConfig.ignoreEnvVars])],
      },
    }
  } catch (error: any) {
    console.error(error?.message)

    return {
      error,
    }
  }
}
