import urllib2
import urlparse

from rest_framework.views import APIView
from rest_framework.response import Response


class CurlCommand(APIView):
    """
    Emulates the bash curl command
    """
    def get(self, request, format=None):
        data = urllib2.urlopen('http://yahoo.com').read()
        return Response(data)

    def post(self, request, format=None):
        url = request.body
        if '//' not in url:
            url = '//' + url
        url = urlparse.urlparse(url, 'http').geturl()
        data = urllib2.urlopen(url).read()
        return Response({'data': data})
