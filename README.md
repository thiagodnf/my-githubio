# my-githubio
 List all your projects on your github.io

## Environment Variables

Before running this app, you need to be careful about the following environment variables:

| Name             | Type    | Default Value | Required |
|------------------|:-------:|---------------|:--------:|
| GITHUB_TOKEN     | string  |               | *        |
| GITHUB_USER      | string  | `thiagodnf`   |          |
| GITHUB_SORT_KEY  | string  | `pushed_at`   |          |
| GITHUB_SORT_DIR  | integer | `1`           |          |

These are the possible values for some variables:

- GITHUB_SORT_DIR

  - `-1` : Ascending Order

  - `1`  : Descending Order

- GITHUB_SORT_KEY:

  - `forks_count`, `open_issues`, `stargazers_count`, `size`, `created_at`, `updated_at`, `pushed_at`

