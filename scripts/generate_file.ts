import { faker } from '@faker-js/faker'
import { statSync, writeFileSync } from 'node:fs'

/**
 * Generate a class with a given number of methods
 */
function generateClass(options: { numberOfMethods: number; withJsDoc: boolean; filename: string }) {
  let classContent = `export class GeneratedClass {\n`

  for (let i = 0; i < options.numberOfMethods; i++) {
    if (options.withJsDoc) {
      classContent += `  /**\n   * ${faker.lorem.sentence({ min: 5, max: 20 })}\n`
      classContent += `   * @param ${faker.lorem.words(2)}\n`
      classContent += `   * @param ${faker.lorem.words(2)}\n`
      classContent += `   * @returns ${faker.lorem.sentence()}\n   */\n`
    }

    classContent += `  method${i + 1}() {\n    // method implementation\n  }\n\n`
  }

  classContent += `}\n`

  writeFileSync(options.filename, classContent)
}

/**
 * Generate files
 */
const numberOfMethods = 5000
generateClass({ filename: 'generated/with_js_doc.js', numberOfMethods, withJsDoc: true })
generateClass({ filename: 'generated/without_js_doc.js', numberOfMethods, withJsDoc: false })

/**
 * Compute size of generated files
 */
const withJsDocSize = statSync('generated/with_js_doc.js').size
const withoutJsDocSize = statSync('generated/without_js_doc.js').size

console.log(`with js doc: ${Math.round(withJsDocSize / 1024)}kb`)
console.log(`without js doc: ${Math.round(withoutJsDocSize / 1024)}kb`)
