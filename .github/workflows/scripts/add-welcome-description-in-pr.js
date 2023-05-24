const { Octokit } = require("@octokit/rest");

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN
})

const addCommentToPR = async (owner, repo, PRnumber, comment) => {
  try {
    const response = await octokit.issues.createComment({
      owner,
      repo,
      issue_number: PRnumber,
      body: comment,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    })
    console.log("Comment added successfully:", response.data.html_url);
  } catch (e) {
    console.log("Error", e)
  }
}

const reviewRequests = async (owner, repo, PRnumber, requestReviewers) => {
  try {
    const response = await octokit.pulls.requestReviewers({
      owner,
      repo,
      pull_number: PRnumber,
      reviewers: requestReviewers
    })
    console.log("Request Reviews from maintainer")
  } catch (e) {
    console.log(e);
  }
}

const owner = process.env.OWNER
const repo = process.env.REPO_NAME
const PRnumber = process.env.PR
const reviewers = ['yashikajotwani12', 'vedant-jain03']
const requestReviewers = reviewers.filter((user) => user != owner)

const comment = "@yashikajotwani12. This is just me testing my GitHub Action workflows, if you are reading this, you can do your own businses now, ahahahahahahah. If you think there is need to change something, raise a PR hahahah";
addCommentToPR(owner, repo, PRnumber, comment);
reviewRequests(owner, repo, PRnumber, requestReviewers)
