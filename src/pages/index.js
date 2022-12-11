import { useState } from "react";
import Link from "next/link";

import { Row, Col, Card } from "react-bootstrap";

import Layout from "../components/Layout";
import GitHubApi from "../utils/GitHubApi";
import ArrayUtils from "../utils/ArrayUtils";
import NumberUtils from "../utils/NumberUtils";

function IndexPage({ user, repos }) {

    const [sortKey, setSortKey] = useState("updated_at");
    const [sortDirection, setSortDirection] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");

    function handleSearchTerm(event) {
        setSearchTerm(event.target.value);
    }

    function handleSortKey(event) {
        setSortKey(event.target.value);
    }

    function handlSortDirection() {
        setSortDirection(sortDirection * -1);
    }

    repos = ArrayUtils.filter(repos, searchTerm);
    repos = ArrayUtils.sort(repos, sortKey, sortDirection);

    const projectsAsHtml = repos.map(e =>
        <Col xs="12" sm="6" md="4" lg="3" xl="2" key={e.repo}>
            <Card className="mb-3" >
                <img src={e.screenshotUrl} width="100%" height={100} />
                <Card.Body>
                    <div className="module line-clamp mb-2">
                        <Link href={`https://github.com/${e.owner}/${e.repo}`} target="_blank" className="stretched-links">
                            <p className="card-title fw-bold">{e.repo}</p>
                        </Link>
                    </div>
                    <div className="small module line-clamp text-muted mb-2">
                        <p title={e.description} className="card-text">{e.description ? e.description : <span className="text-danger">Missing</span>}</p>
                    </div>
                    <div className="small d-flex aligh-content-start">
                        <div><i className="mx-1 bi bi-star text-primary" title="Stargazers"></i>{e.stargazers_count}</div>
                        <div><i className="mx-1 bi bi-shuffle text-success" title="Forks"></i>{e.forks_count}</div>
                        <div><i className="mx-1 bi bi-record-circle text-danger" title="Open Issues"></i>{e.open_issues}</div>
                        <div title={e.size}><i className="mx-1 bi bi-hdd text-warning"></i>{NumberUtils.formatter(e.size * 1000, 1)}b</div>
                    </div>
                </Card.Body>
            </Card>
        </Col>
    );

    return (
        <Layout user={user} repos={repos}>
            <Row>
                <Col>
                    <form autoComplete="off" className="mb-3">
                        <div className="d-flex">
                            <div className="me-auto align-self-center">
                                <h3 className="m-0">Projects</h3>
                            </div>
                            <div className="ms-2 align-self-center">
                                <input type="search" className="form-control form-control-sm btn-outline-danger" placeholder="Search projects" autoComplete="off" value={searchTerm} onChange={handleSearchTerm} />
                            </div>
                            <div className="ms-2 align-self-center">
                                <select className="form-select form-select-sm " value={sortKey} onChange={handleSortKey}>
                                    <optgroup label="Sorted By">
                                        <option value="forks_count">Forks</option>
                                        <option value="open_issues">Open Issues</option>
                                        <option value="stargazers_count">Stargazers</option>
                                        <option value="size">Size</option>
                                        <option value="created_at">Created At</option>
                                        <option value="updated_at">Updated At</option>
                                        <option value="pushed_at">Pushed At</option>
                                    </optgroup>
                                </select>
                            </div>
                            <div className="ms-2 align-self-center">
                                <a className="btn btn-sm btn-outline-secondary" href="#" onClick={handlSortDirection}>
                                    {sortDirection == 1 ? <i className="bi bi-sort-up"></i> : <i className="bi bi-sort-down"></i>}
                                </a>
                            </div>
                        </div>
                    </form>
                    <hr />
                    <Row>
                        {projectsAsHtml}
                    </Row>
                </Col>
            </Row>
        </Layout>
    );
}

export async function getStaticProps() {

    const owner = process.env.GITHUB_USER || "thiagodnf";

    const user = await GitHubApi.getUser(owner).catch(error => { throw new Error(error); });
    const repos = await GitHubApi.getListOfRepos(owner).catch(error => { throw new Error(error); });

    return {
        props: { repos, user }
    };
}

export default IndexPage;
