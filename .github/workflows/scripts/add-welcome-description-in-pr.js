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

const reviewRequests = async (owner, repo, PRnumber) => {
  try {
    const response = await octokit.pulls.requestReviewers({
      owner,
      repo,
      issue_number: PRnumber,
      reviewers: ['vedant-jain03', 'yashikajotwani12']
    })
    console.log("Request Reviews from maintainer")
  } catch (e) {
    console.log(e);
  }
}

const owner = process.env.OWNER
const repo = process.env.REPO_NAME
const PRnumber = process.env.PR

const comment = "Thankyou for adding PR, this is just testing comment, so you can go now else!";
addCommentToPR(owner, repo, PRnumber, comment);
reviewRequests(owner, repo, PRnumber)
