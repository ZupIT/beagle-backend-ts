import fs from 'fs/promises'
import { constants } from 'fs'

async function executeFsToBooleanPromise(fn: Promise<any>): Promise<boolean> {
  try {
    await fn
    return true
  } catch (error) {
    return false
  }
}

export const folderNameIsValid = (folderName: string) =>
  (/^[^\s^\x00-\x1f\\?*:"";<>|\/.][^\x00-\x1f\\?*:"";<>|\/]*[^\s^\x00-\x1f\\?*:"";<>|\/.]+$/g).test(folderName)

export const pathExists = async (path: string) =>
  executeFsToBooleanPromise(fs.access(path, constants.F_OK))

export const createFolder = async (folderName: string) =>
  executeFsToBooleanPromise(fs.mkdir(folderName))
