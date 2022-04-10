import fs from 'fs'

const MATCH_EVERY_LINE = /\n/g

const MATCH_ENV_VAR_LINE = /^\s*([\w.-]+)\s*=\s*(.*)?\s*$/

const MATCH_ENV_VAR_LINE_VALUE_MASK = /[a-z\s\D\d\w\_\-]/g

const INVALID_LINE_SYMBOL = Symbol('invalid-line')

const ENV_VAR_LINE_MASK_VALUE = 'x'

interface LineItem {
  name: string | Symbol
  value: string
}

function getFileContent(filePath: string) {
  const envContent = fs.readFileSync(filePath, {
    encoding: 'utf8',
  })

  const sanitizeContent = envContent.toString().trim()

  return sanitizeContent
}

function transformPlainContentToAst(content: string): LineItem[] {
  const lines = content.trim().split(MATCH_EVERY_LINE)

  const results = lines.reduce((acc, line) => {
    const lineMatch = line.match(MATCH_ENV_VAR_LINE)

    if (!lineMatch) {
      acc.push({
        name: INVALID_LINE_SYMBOL,
        value: line,
      })
    } else {
      acc.push({
        name: lineMatch[1],
        value: lineMatch[2],
      })
    }

    return acc
  }, [] as LineItem[])

  return results
}

function isValidLineItem(item: LineItem): boolean {
  return item.name !== INVALID_LINE_SYMBOL
}

function transformAstToPlainContent(astState: LineItem[]): string {
  const lines = astState.reduce((acc, line) => {
    if (isValidLineItem(line)) {
      acc.push(`${line.name}=${line.value}`)
    } else {
      acc.push(line.value)
    }

    return acc
  }, [] as string[])

  return lines.join('\n').trim()
}

function maskAstState(astState: LineItem[]): LineItem[] {
  return astState.map(line => {
    if (!isValidLineItem(line)) {
      return line
    }

    return {
      name: line.name,
      value: line.value.replace(MATCH_ENV_VAR_LINE_VALUE_MASK, ENV_VAR_LINE_MASK_VALUE),
    }
  })
}

export { transformAstToPlainContent, maskAstState, transformPlainContentToAst, getFileContent, INVALID_LINE_SYMBOL }
