Title: Redeploy / Safe Browsing remediation steps

This file contains ready-to-copy drafts for contacting Google Safe Browsing and Vercel support, and quick steps to redeploy the project under a fresh Vercel project name.

1) Quick context (copy into support tickets):

Repository: https://github.com/razzy-max/AAU-NightlifeVotingPlatform
Commit SHA: (paste your latest commit here)
Preview URL previously flagged: https://aau-nightlife-voting-platform.vercel.app

2) Google Safe Browsing report / request review (copy to https://safebrowsing.google.com/safebrowsing/report_error/):

Hello Google Safe Browsing team,

My site at https://aau-nightlife-voting-platform.vercel.app is being blocked by Google Safe Browsing (Chrome "Dangerous site" interstitial). This is a public preview of a Next.js application deployed from my GitHub repository. I have audited the repository and found no malware or phishing content. The app returns valid HTTPS responses and the codebase includes only legitimate dependencies and a placeholder OPAY integration for payments.

Please review this site and remove it from Safe Browsing blocklists if this is a false positive. I can provide the Vercel deployment ID, commit SHA, or any other evidence upon request.

Thank you.

3) Vercel support draft (copy into Vercel support ticket):

Subject: Preview deployment flagged by Google Safe Browsing — request history/assistance

Hi Vercel Support,

My Vercel preview deploy at https://aau-nightlife-voting-platform.vercel.app is currently being blocked by Google Safe Browsing. The repository is: https://github.com/razzy-max/AAU-NightlifeVotingPlatform. The latest commit SHA: (paste commit).

Could you please check whether this preview subdomain was previously used by another Vercel project or if there is any history of abuse associated with that subdomain? If so, can you advise on remediation or help with reassigning a fresh preview domain?

Thanks for any help,

(Your name)

4) Quick redeploy steps (fast workaround)

- In Vercel, create a NEW Project and link the same GitHub repo. Choose a different project name (this yields a different preview domain) and deploy. This usually bypasses reputation flags attached to a previously used preview subdomain.
- Alternatively, assign a custom domain (recommended) and verify ownership. Once verified you can request Google review for the custom domain which is faster to clear.

5) Proof-of-control artifacts added to this repo

- `public/status.html` — simple status page that will be published at the site root. Use this to show Vercel support or Google that you control the content.
- `.well-known/security.txt` — a small ownership/contact file under the standard path.

6) Notes

- After redeploying to a fresh Vercel project, check the new preview URL in an incognito window and, if still blocked, open the Google Transparency Report in a browser and use the "report a detection error" option.
