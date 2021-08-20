### Assignment ###

This is an assigment app implemented for my application to Reaktor. The app transforms a text file containing the rules of a board game into an interactive rulebook with a chapter menu and a search bar. Users can upload files or enter a link that leads to the file.

## Proxy for file fetching using URL ##

Because not all servers and sites are responding with Access-Control-Allow-Origin header, the app requires a proxy that will help it process data that comes without it. Use of third-party services imposes a security threat and is not reliable in terms of uptime, therefore a self-hosted alternative is a better choice. This app uses a simple WebServer written in Python that fetches the file and sends it back to the frontend with the necessary header. However, any other suitable webserver can be used. Python was chosen due to its simplicity of prototyping and only to demonstrate the concept. Proxy can be hosted locally in development or on the same server as frontend in production.