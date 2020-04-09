# Resume
Interactive and personal resume for private use only.

## Requirements
- Any browser

## Push website online via Github pages
- Go to **Settings**
- On **GitHub Pages** section, select **master branch** as **Source**
- Put `www.vincent-candappane.ga` as **Custom domain**
- Do not activate this option **Enforce HTTPS** for the moment.

## Set custom dns
- Create domain on [freenom](https://my.freenom.com/)
- Click **Services**, and go to **Domains**
- Click **Manage domains**, and go to **Manage Freenom DNS**
- Configure by adding these informations :

| Name | Type  | TTL   | Target                |
|------|-------|-------|-----------------------|
|      | A     | 14440 | 185.199.109.153       |
|      | A     | 14440 | 192.30.252.153        |
| WWW  | CNAME | 14440 | vincent-candappane.ga |

- Once configurations, wait the website is published (max 48h).
- Go back to **GitHub Pages** section
- Change `www.vincent-candappane.ga` to `vincent-candappane.ga` as **Custom domain**
- Now activate **Enforce HTTPS**

## Contact Form script
Here the configuration to send an email from a static HTML page with Google sheets and Javascript.

1. The first thing you have to do is to open the link below: [Google Sheet Copy Link](https://docs.google.com/spreadsheets/d/1LyqAplh068LL2fwdE_9HwtbWjxxK6-1-EkPkY3AfV2c/copy)
2. Click on make a copy
3. Rename the file if you want
4. Click on tools > script editor
5. Go to line number 8, uncomment and send the target email you want to send to
6. Now save the script then click on file > manage versions > write any description and click on save version
7. Click on publish > Deploy as a web app.
Make sure to select the project version( in your case must be one) but when you save a different version of the script, select the right one. And leave access to anyone, even anonymous. Click update and if it asks for authenticating just click allow.
8. Copy the generated script (we will use this in our page) and past it [here](https://github.com/vrakosky/resume/blob/master/assets/js/contact/contact.js)

## Going further
- https://blog.h-educate.com/how-to-send-an-email-in-a-static-html-page-using-google-sheets-scripts/
- https://www.youtube.com/watch?v=GMXFMVg5E4U




