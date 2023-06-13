# Percy Github Status with a Monorepo

## SETUP ENVIRONMENT VARIABLES

Forked from BrowserStackCE org.
Need to mention about these: 
const GITHUB_TOKEN = process.env.PERCY_MONO_REPO_GIT_TOKEN
const REPO = process.env.REPO
const SHA = process.env.SHA

chromedriver to stable in test.yml and package.json 
npm i

You need to setup following secrets for Github Actions
PT_PROJECT_1 - This is your percy token for project 1
PT_PROJECT_2 - This is your percy token for project 2
PT_PROJECT_3 - This is your percy token for project 3
SECRET_TOKEN - This is your github access token

## Run

* Create a pull request and your should see that on affected projects have a percy build running while unaffected projects will have a checkmark for percy.