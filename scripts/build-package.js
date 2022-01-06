const { readFile, writeFile } = require('fs/promises')

const DEV_PACKAGE = 'package.json'
const PROD_PACKAGE = 'package.prod.json'
const TARGET = 'dist/package.json'

async function readPackages() {
  const dev = JSON.parse(await readFile(DEV_PACKAGE, { encoding: 'utf-8' }))
  try {
    prod = JSON.parse(await readFile(PROD_PACKAGE, { encoding: 'utf-8' }))
    return { dev, prod }
  } catch {
    return { dev, prod: {} }
  }
}

async function start() {
  try {
    const { dev, prod } = await readPackages()
    const result = { ...dev, ...prod }
    await writeFile(TARGET, JSON.stringify(result, null, 2))
    process.exit(0)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

start()
