# node-cluster-example

Sample Node project demonstrating the use of the 'cluster-role' npm module to easily start up two clusters
of HTTP servers, one group serving a public web server, and another running an admin web console

## Usage

```sh
git clone https://github.com/leonardw/node-cluster-example.git
cd node-cluster-example
node start.js
```

## Demo
In web browser, visit the three ports 8000, 8001, 8002 at `localhost` and see three different applications, each
reporting its OS process ID and the environment variables. Try terminate any of the processes
and see respawning in action.
 
* Web HTTP: [http://localhost:8000](http://localhost:8000)
 
* Admin HTTP: [http://localhost:8001](http://localhost:8001)
 
* Extra HTTP: [http://localhost:8002](http://localhost:8002)


##License

(The MIT License)

Copyright (c) 2014 Leonard Wu <leonard.wu92@alumni.imperial.ac.uk>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
