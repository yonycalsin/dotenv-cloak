import { AstNode, AstNodeTypes } from '@dotenv-cloak/parse'

export function cloakAst(ast: AstNode[], cloakConfig: Record<string, any>) {
  const cloakedAst = ast.map(astNode => {
    if (astNode.type === AstNodeTypes.COMMENT_LINE) {
      return astNode
    }

    if (astNode.type === AstNodeTypes.UNKNOWN_LINE) {
      return astNode
    }

    const cannotCloakTheLine = cloakConfig.ignoreEnvVars.includes(astNode.name)

    if (cannotCloakTheLine) {
      return astNode
    }

    return {
      ...astNode,
      value: '',
    }
  })

  return { cloakedAst }
}

export function stringifyAst(ast: AstNode[]) {
  const stringifiedAst = ast
    .map(astNode => {
      if (astNode.type === AstNodeTypes.COMMENT_LINE) {
        return astNode.value
      }

      if (astNode.type === AstNodeTypes.UNKNOWN_LINE) {
        return astNode.value
      }

      return `${astNode.name}=${astNode.value}`
    })
    .join('\n')

  return { stringifiedAst }
}
