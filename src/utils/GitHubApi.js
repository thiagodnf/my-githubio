import { Octokit } from "octokit";
import StringUtils from "./StringUtils";

class GitHubApi {

    static octokit = new Octokit({
        auth: process.env.GITHUB_TOKEN || ""
    });

    static async getUser(owner = "thiagodnf") {

        const resource = "GET /users/{owner}";

        return new Promise(async (resolve, reject) => {

            try {
                const response = await GitHubApi.octokit.request(resource, { owner });
                resolve(response.data);
            } catch (error) {
                reject(error);
            }
        });
    }

    static async getListOfRepos(owner = "thiagodnf") {

        return new Promise((resolve) => {

            const resource = "GET /users/{owner}/repos{?sort}";

            GitHubApi.octokit.paginate(resource, { owner, sort: "updated" }, (response) => response.data.map((item) => {

                return {
                    owner,
                    repo: item.name,
                    description: item.description,
                    size: item.size,
                    language: item.language,
                    topics: item.topics,
                    stargazers_count: item.stargazers_count,
                    watchers_count: item.watchers_count,
                    forks_count: item.forks_count,
                    open_issues: item.open_issues,
                    created_at: item.created_at,
                    updated_at: item.updated_at,
                    pushed_at: item.pushed_at,
                };

            })).then((projects) => {

                const promises = [];

                projects.forEach((project) => {
                    promises.push(GitHubApi.getFileContentAsPromise(project, "README.md"));
                });

                Promise.all(promises).then((values) => {
                    resolve(values);
                });
            });
        });
    }

    static async getFileContentAsPromise(project, filename) {

        return new Promise(async (resolve) => {

            const resource = "GET /repos/{owner}/{repo}/contents/{path}";

            try {
                const response = await GitHubApi.octokit.request(resource, {
                    owner: project.owner,
                    repo: project.repo,
                    path: filename
                });

                let buff = new Buffer.from(response.data.content, "base64");
                let fileContent = buff.toString("ascii");

                const screenshotUrl = StringUtils.getScreenshotUrl(fileContent);

                resolve({ ...project, screenshotUrl });
            } catch (error) {
                resolve({ ...project, screenshotUrl: null });
            }
        });
    }
}

export default GitHubApi;
