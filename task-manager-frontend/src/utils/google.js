function getGoogleOAuth() {
    const root = 'https://accounts.google.com/o/oauth2/v2/auth';

    const options = {
        redirect_uri: process.env.REACT_APP_OAUTH_REDIRECT_URL,
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        access_type: "offline",
        response_type: "code",
        prompt: "consent",
        scope: [
            "https://www.googleapis.com/auth/userinfo.profile",
            "https://www.googleapis.com/auth/userinfo.email",
            "openid"
        ].join(" "),
    }

    console.log(options);
    const qs = new URLSearchParams(options).toString();
    console.log(qs);
    return `${root}?${qs}`;
}

export default getGoogleOAuth;