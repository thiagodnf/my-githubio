import Head from "next/head";

function Component({user}) {

    return (
        <Head>
            <meta charSet="utf-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>

            <title>{user.name}</title>

            <meta name="author" content={user.name} />
            <meta name="description" content={user.bio} />
            <meta name="keywords" content="my-githubio, thiagodnf, github" />
            <meta name="robots" content="index, follow" />
            <meta name="theme-color" content="#021329" />
            <meta name="mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-status-bar-style" content="black" />
            <meta name="apple-mobile-web-app-title" content={user.name}/>

            <meta property="og:title" content={user.name} />
            <meta property="og:url" content={`https://github.com/${user.login}`}  />
            <meta property="og:description" content={user.bio} />
            <meta property="og:image" content={user.avatar_url} />
            <meta property="og:locale" content="en_US" />
            <meta property="og:locale:alternate" content="pt_BR" />

        </Head>
    );
}

export default Component;
