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


