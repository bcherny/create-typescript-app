#!/usr/bin/env node

import { execSync } from 'child_process'
import copy from 'copy-template-dir'
import { basename, join } from 'path'

main()

function main() {

  let input = join(__dirname, 'template')
  let output = process.cwd()

  let email = $('npm config get init.author.email')
  enforce(email, 'npm config set init.author.email [email]')

  let license = $('npm config get init.license') || 'MIT'

  let name = $('npm config get init.author.name')
  enforce(name, 'npm config set init.author.name [full name]')

  let username = $('git config --global github.user')
  enforce(username, 'git config --add github.user [username]')

  let vars = {
    email,
    license,
    name,
    projectname: basename(output),
    username
  }

  copy(input, output, vars, err => {
    if (err) {
      throw err
    }
    try {
      $('yarn install')
    } catch (e) {
      $('npm install')
    }
  })
}

function enforce(value: string, command: string) {
  if (value === '') {
    throw 'Please run: "' + command + '"'
  }
}

function $(command: string) {
  try {
    let _ = execSync(command, { cwd: process.cwd() })
    return _.toString().trim()
  } catch (e) {
    return ''
  }
}
