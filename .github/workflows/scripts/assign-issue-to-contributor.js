#!/bin/bash

const { Octokit } = require("@octokit/rest");

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN
})

const owner = process.env.OWNER
const repo = process.env.REPO_NAME
const issue_number = process.env.ISSUE_NUMBER
const github_actor = process.env.GITHUB_ACTOR

const assignOrComment = async () => {
  try {
    const { data: issue } = await octokit.issues.get({
      owner: owner,
      repo: repo,
      issue_number: issue_number
    })
    const hasPendingTriagLabel = issue.labels.some((label) => {
      return (label.name === "bug")
    })
    const assignees = issue.assignees;
    if (hasPendingTriagLabel) {
      await octokit.issues.createComment({
        owner: owner,
        repo: repo,
        issue_number: issue_number,
        body: "This issue is not being approved by core-team, wait for them"
      })
      console.log("Message sent")
    }
    else if (assignees.length !== 0) {
      await octokit.issues.createComment({
        owner: owner,
        repo: repo,
        issue_number: issue_number,
        body: `This issue is assigned to @${assignees[0].login}. You can have a look on other open issues.`
      })
    }
    else {
      await octokit.issues.update({
        owner: owner,
        repo: repo,
        issue_number: issue_number,
        assignees: [github_actor]
      })
    }
  } catch (e) {
    console.log(e);
  }
}

assignOrComment();
