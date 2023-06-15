import { exec } from 'child_process';
import axios from 'axios';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

global.fetch = fetch;
dotenv.config();

const GITHUB_TOKEN = process.env.SECRET_TOKEN;
const REPO = process.env.REPO;
const SHA = process.env.SHA;

async function GetAffected() {
  return new Promise((resolve, reject) => {
    exec('npx nx print-affected', (err, result) => {
      if (err) reject(err);
      resolve(JSON.parse(result));
    });
  });
}

async function MarkStatus(project_slug) {
  let endpoint = `https://api.github.com/repos/${REPO}/statuses/${SHA}`;
  console.log(endpoint);
  return fetch(endpoint, {
    method: 'POST',
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      'X-GitHub-Api-Version': '2022-11-28',
    },
    body: JSON.stringify({
      state: 'success',
      context: `percy/${project_slug}`,
    }),
  })
    .then(async (res) => {
      console.log(await res.text());
    })
    .catch((error) => {
      console.error(error);
    });
}

(async () => {
  let affected = await GetAffected();
  let affectedProjects = affected.projects;
  let allProjects = affected.projectGraph.nodes;
  let unaffectedProjects = allProjects.filter(
    (p) => !affectedProjects.some((q) => p == q)
  );

  unaffectedProjects.forEach((project) => {
    MarkStatus(project);
  });
})();