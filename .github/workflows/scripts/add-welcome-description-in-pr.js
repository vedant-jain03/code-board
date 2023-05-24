const { Octokit } = require("@octokit/rest");

const octokit = new Octokit({
  auth: process.argv[5]
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

const owner = process.argv[2];
const repo = process.argv[3];
const PRnumber = process.argv[4];

const comment = "Thankyou for adding PR, this is just testing comment, so you can go now else!";
addCommentToPR(owner, repo, PRnumber, comment);
