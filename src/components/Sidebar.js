import Link from "next/link";

import { Container } from "react-bootstrap";

function Info({ icon, children }) {
    return (
        <div className="d-flex flex-row mb-2 small">
            <div className="pe-2"><i className={`bi ${icon}`}></i></div>
            <div className="">{children}</div>
        </div>
    );
}

function Sidebar({ user, repos }) {

    const stats = {
        forks: 0,
        stargazers: 0,
        open_issues: 0
    };

    for (const repo of repos) {
        stats.forks += repo.forks_count;
        stats.stargazers += repo.stargazers_count;
        stats.open_issues += repo.open_issues;
    }

    console.log(stats);
    // repos.map(e =>

    return (
        <aside>
            <Container fluid >
                <img className="profile-picture d-inline" src={user.avatar_url} height="180px" width="180px" />
                <div className="d-inline">
                    <p className="fullname mt-3 mb-0">{user.name}</p>
                    <p className="usernam text-muted">{user.login}</p>
                    <p className="small bio">{user.bio}</p>
                    <Info icon="bi-building">{user.company}</Info>
                    <Info icon="bi-geo-alt">{user.location}</Info>
                    <Info icon="bi-link">
                        <Link href={user.blog}>
                            {user.blog}
                        </Link>
                    </Info>
                    <hr />
                    <h5>Stats</h5>

                    <div className="smalls d-flex aligh-content-start">
                        <i className="me-2 bi bi-star text-primary" title="Stargazers"></i>{stats.stargazers}
                        <i className="mx-2 bi bi-shuffle text-success" title="Forks"></i>{stats.forks}
                        <i className="mx-2 bi bi-record-circle text-danger" title="Open Issues"></i>{stats.open_issues}
                    </div>
                </div>
            </Container>
        </aside>
    );
}

export default Sidebar;
