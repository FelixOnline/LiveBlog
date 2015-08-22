# LiveBlog

This is a node.js app to run a simple live blog.

## Installation

Just set up the configuration, showing what URL the server should use to obtain the latest blog posts (see blogdata.php in the example implementation) and on what port the app listens on. You should also set an API key for security.

## Usage

The endpoints are:

* /newpost - Load the latest posts from the URL specified in the config and push them to the client
* /clientcount - Show the number of connected clients (access this via your web browser)
* /matchupdate - Tweaked version of newpost relevant to the Varsity live blog only
* /reset - Tell clients to clear all their data and load the latest information which the app loads from the config URL. This is relevant when a post is deleted

All endpoints require the API key passing as a parameter.

When running, clints connecting and disconnecting will be shown.

## Example implementation

A PHP frontend is available here: https://github.com/FelixOnline/Varsity - this is for the varsity liveblog and makes use of the matchdata feature

An admin interface for it is available here: https://github.com/FelixOnline/Varsity-Engine
