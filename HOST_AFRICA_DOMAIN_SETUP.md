# Host Africa Domain to Firebase Hosting Setup Guide

This guide will help you connect your Host Africa domain to Firebase hosting for the Ambassador Academy website.

## Prerequisites
- ✅ Firebase project configured (`ambassador-academy-website`)
- ✅ App deployed to Firebase hosting
- ✅ Domain purchased from Host Africa

## Step 1: Add Custom Domain in Firebase Console

1. Go to [Firebase Console](https://console.firebase.google.com/project/ambassador-academy-website/hosting)
2. Click on **"Add custom domain"**
3. Enter your domain name (e.g., `www.yourdomain.com`)
4. Firebase will provide DNS configuration instructions

## Step 2: Configure DNS Records in Host Africa

### Access Host Africa Control Panel
1. Log in to your Host Africa account
2. Go to your domain management section
3. Find your domain and click on "Manage DNS" or "DNS Settings"

### Add DNS Records

#### A Records (for root domain)
Add these A records to point your root domain to Firebase:

| Type | Name | Value | TTL |
|------|------|-------|-----|
| A | @ (or blank) | 151.101.1.195 | 3600 |
| A | @ (or blank) | 151.101.65.195 | 3600 |

#### CNAME Record (for www subdomain)
Add this CNAME record to point www to Firebase:

| Type | Name | Value | TTL |
|------|------|-------|-----|
| CNAME | www | ambassador-academy-website.web.app | 3600 |

#### TXT Record (for domain verification)
Add the TXT record provided by Firebase for domain verification:

| Type | Name | Value | TTL |
|------|------|-------|-----|
| TXT | @ (or blank) | [Firebase verification string] | 3600 |

## Step 3: Wait for DNS Propagation

- DNS changes can take 15 minutes to 48 hours to propagate
- You can check propagation using tools like:
  - [whatsmydns.net](https://www.whatsmydns.net/)
  - [dnschecker.org](https://dnschecker.org/)

## Step 4: Verify Domain in Firebase

1. Return to Firebase Console
2. Check the status of your custom domain
3. Once verified, your domain will show as "Connected"

## Step 5: SSL Certificate

Firebase automatically provides SSL certificates for custom domains. This may take a few hours to activate.

## Troubleshooting

### Common Issues:

1. **DNS Not Propagated**
   - Wait up to 48 hours for full propagation
   - Check with multiple DNS lookup tools

2. **Domain Not Verifying**
   - Ensure TXT record is correctly added
   - Check for typos in the verification string

3. **Website Not Loading**
   - Verify A and CNAME records are correct
   - Check if Firebase hosting is properly deployed

### Host Africa Specific Notes:

- If you can't find DNS settings, look for "Zone Editor" or "DNS Management"
- Some Host Africa plans may require contacting support for DNS changes
- Ensure your domain is not parked or redirected elsewhere

## Final Steps

Once your domain is connected:

1. Test your website at your custom domain
2. Update any hardcoded URLs in your application
3. Consider setting up redirects (www to non-www or vice versa)

## Support

If you encounter issues:
- Check Host Africa's DNS documentation
- Contact Host Africa support for DNS configuration help
- Verify Firebase hosting status in the console

---

**Your Ambassador Academy website will be accessible at your custom domain once DNS propagation is complete!** 