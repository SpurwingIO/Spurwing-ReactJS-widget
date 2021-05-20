# The Spurwing Booking Widget

This is an example of a booking widget built on top of [the Spurwing API](https://spurwing.io).
The widget lets a client select an appointment type, find an available appointment slot, provide personal info, and book the appointment.
This is the same widget that we host automatically for all Spurwing customers. You can host this widget yourself as-is, fork it and make modifications, or just use it as an example of how to make different API calls.

![demo](https://user-images.githubusercontent.com/1649883/105534553-461ae080-5cb3-11eb-85d3-91690ca9901d.png)

# Usage

First, make sure you have a Spurwing API key and account. If you don't have one, you can go to https://spurwing.io and chat with one of our developers to see if you're a fit.

Second, clone the repository to your computer, and install dependencies.

```bash
git clone https://github.com/Spurwing/spurwing_widget.git
cd spurwing_widget
npm install
```

Third, adjust config options in (App.tsx)[https://github.com/Spurwing/spurwing_widget/blob/master/src/App.tsx]. They can either be set directly in the code, or passed in via URL params. You can get your provider ID from [your Spurwing Dashboard](https://dashboard.spurwing.io).

To run the project locally, just do

```bash
npm start
```
# Deploying to Production

When you are ready to deploy, you can run

```bash
npm build
```

This will generate a production-ready build that can be hosted with any static website host.
We really like Netlify and S3/Cloudfront ourselves.

## Support
- Our website: https://www.spurwing.io/
- For public issues and bugs please use the GitHub Issues Page.
- For enquiries and private issues reach out to us at support@spurwing.io
- Join our Discord Community Server: https://discord.gg/j3gd5Qk5uW

### Submitting a PR

We welcome any contributions! Please create an issue before submitting a pull request.

When creating a pull request, be sure to include a screenshot! 🎨

## License

MIT © Spurwing

![image](https://user-images.githubusercontent.com/9488406/119051429-6fc6e880-b9c3-11eb-9b19-957ed535b4a3.png)










