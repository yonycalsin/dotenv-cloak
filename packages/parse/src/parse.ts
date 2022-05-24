const MATCH_EVERY_LINE = /\n/g

const MATCH_ENV_VAR_LINE = /^\s*([\w.-]+)\s*=\s*(.*)?\s*$/

export const AstNodeTypes = {
  ENV_VAR_LINE: Symbol('ENV_VAR_LINE'),
  COMMENT_LINE: Symbol('COMMENT_LINE'),
  UNKNOWN_LINE: Symbol('UNKNOWN_LINE'),
}

export interface AstNode {
  type: string | symbol
  name: string
  value: string
}

export function parse(envContent: string) {
  const lines = envContent.split(MATCH_EVERY_LINE)

  const ast = lines.reduce((acc, line) => {
    const match = line.match(MATCH_ENV_VAR_LINE)

    if (match) {
      const [, key, value] = match

      const node: AstNode = {
        type: AstNodeTypes.ENV_VAR_LINE,
        name: key,
        value: value ?? '',
      }

      return [...acc, node]
    }

    if (line.startsWith('#')) {
      const node: AstNode = {
        type: AstNodeTypes.COMMENT_LINE,
        name: '',
        value: line,
      }

      return [...acc, node]
    }

    const node: AstNode = {
      type: AstNodeTypes.UNKNOWN_LINE,
      name: '',
      value: line,
    }

    return [...acc, node]
  }, [] as AstNode[])

  return { ast }
}
