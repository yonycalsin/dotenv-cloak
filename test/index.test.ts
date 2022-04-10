/* eslint-disable */
import path from 'path'
import {
  transformPlainContentToAst,
  transformAstToPlainContent,
  maskAstState,
  getFileContent,
  INVALID_LINE_SYMBOL,
} from '../src'

describe('dotenv-cloak', () => {
  let exampleContent: string

  beforeAll(async () => {
    exampleContent = getFileContent(path.resolve(__dirname, 'fixtures', '.env'))
  })

  it('transforms plain content to ast', () => {
    const astState = transformPlainContentToAst(exampleContent)

    expect(astState).toEqual([
      { name: INVALID_LINE_SYMBOL, value: '# App Configuration\r' },
      { name: 'APP_NAME', value: 'Application' },
      { name: 'APP_PORT', value: '4444' },
      { name: INVALID_LINE_SYMBOL, value: '\r' },
      { name: INVALID_LINE_SYMBOL, value: '# Search Configuration\r' },
      { name: 'ALGOLIA_API_KEY', value: 'aksdihasidhaskdjalskdjalskdjk' },
      { name: 'ELASTIC_SEARCH_SECRET_KEY', value: 'lkajsdlkasdjlkasdj' },
      { name: INVALID_LINE_SYMBOL, value: '\r' },
      { name: INVALID_LINE_SYMBOL, value: '# Payments\r' },
      { name: 'STRIPE_PUBLIC_KEY', value: 'sp_kasjdhaksjdhakjsdh' },
      { name: 'STRIPE_SECRET_KEY', value: 'ss_askdjhaskdjhaksjdh' },
      { name: INVALID_LINE_SYMBOL, value: '\r' },
      { name: INVALID_LINE_SYMBOL, value: '# Database Configuration\r' },
      { name: 'DATABASE_USER', value: 'root' },
      { name: 'DATABASE_PASSWORD', value: '123' },
      { name: 'DATABASE_PORT', value: '3606' },
    ])
  })

  it('transforms plain content to ast and mask their values', () => {
    const astState = transformPlainContentToAst(exampleContent)

    const newAstState = maskAstState(astState)

    expect(newAstState).toEqual([
      { name: INVALID_LINE_SYMBOL, value: '# App Configuration\r' },
      { name: 'APP_NAME', value: 'xxxxxxxxxxx' },
      { name: 'APP_PORT', value: 'xxxx' },
      { name: INVALID_LINE_SYMBOL, value: '\r' },
      { name: INVALID_LINE_SYMBOL, value: '# Search Configuration\r' },
      { name: 'ALGOLIA_API_KEY', value: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxx' },
      { name: 'ELASTIC_SEARCH_SECRET_KEY', value: 'xxxxxxxxxxxxxxxxxx' },
      { name: INVALID_LINE_SYMBOL, value: '\r' },
      { name: INVALID_LINE_SYMBOL, value: '# Payments\r' },
      { name: 'STRIPE_PUBLIC_KEY', value: 'xxxxxxxxxxxxxxxxxxxxx' },
      { name: 'STRIPE_SECRET_KEY', value: 'xxxxxxxxxxxxxxxxxxxxx' },
      { name: INVALID_LINE_SYMBOL, value: '\r' },
      { name: INVALID_LINE_SYMBOL, value: '# Database Configuration\r' },
      { name: 'DATABASE_USER', value: 'xxxx' },
      { name: 'DATABASE_PASSWORD', value: 'xxx' },
      { name: 'DATABASE_PORT', value: 'xxxx' },
    ])
  })

  it.skip('transforms ast to plain content', () => {
    const astState = transformPlainContentToAst(exampleContent)

    const plainContent = transformAstToPlainContent(astState)

    console.log({ astState, plainContent, exampleContent })

    expect(exampleContent).toEqual(plainContent)
  })

  it.skip('transforms ast to plain content and mask their values', () => {
    const astState = transformPlainContentToAst(exampleContent)

    const plainContent = transformAstToPlainContent(maskAstState(astState))

    expect(exampleContent).toEqual(plainContent)
  })
})
