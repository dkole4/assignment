from http.server import BaseHTTPRequestHandler, HTTPServer
import requests

HOST = "localhost"
PORT = 8082

class Handler(BaseHTTPRequestHandler):
    def do_GET(self):
        path = self.path[1:]
        response = requests.get(path)
        response.encoding = 'utf-8'
        self.send_response(200)
        self.send_header("Content-Type", "text/html")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.end_headers()
        self.wfile.write(bytes(response.text, "utf-8"))

if __name__ == "__main__":
    webServer = HTTPServer((HOST, PORT), Handler)
    print(f"Server started http://{HOST}:{PORT}")

    try:
        webServer.serve_forever()
    except KeyboardInterrupt:
        pass

    webServer.server_close()
    print("Server stopped.")
