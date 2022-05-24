import fs from 'node:fs/promises'
import { loadConfig } from '@dotenv-cloak/config'
import { cloakAst, stringifyAst } from '@dotenv-cloak/stringify'
import { parse, AstNode, AstNodeTypes } from '@dotenv-cloak/parse'

function addCommentToAst(ast: AstNode[]) {
  return [
    {
      type: AstNodeTypes.COMMENT_LINE,
      name: '',
      value: '# ------------------------------------------------------'.trim(),
    },
    {
      type: AstNodeTypes.COMMENT_LINE,
      name: '',
      value: '# THIS FILE WAS AUTOMATICALLY GENERATED'.trim(),
    },
    {
      type: AstNodeTypes.COMMENT_LINE,
      name: '',
      value: '# BY @dotenv-cloak/core (DO NOT MODIFY)'.trim(),
    },
    {
      type: AstNodeTypes.COMMENT_LINE,
      name: '',
      value: '# ------------------------------------------------------'.trim(),
    },
    {
      type: AstNodeTypes.UNKNOWN_LINE,
      name: '',
      value: '\n'.trim(),
    },
    ...ast,
  ]
}

export async function cloak() {
  const config = loadConfig()

  const { ast } = parse(config.envContent as string)

  const { cloakedAst } = cloakAst(ast, config.configContent)

  const { stringifiedAst } = stringifyAst(addCommentToAst(cloakedAst))

  try {
    await fs.writeFile(config.configContent.outputPath, stringifiedAst)

    console.log(`Successfully wrote to ${config.configContent.outputPath}`)
  } catch (error: any) {
    console.error(error?.name)

    return {
      error,
    }
  }
}
