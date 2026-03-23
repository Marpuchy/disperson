self.__BUILD_MANIFEST = {
  "__rewrites": {
    "afterFiles": [
      {
        "source": "/login"
      },
      {
        "source": "/logout"
      },
      {
        "source": "/register"
      },
      {
        "source": "/profile"
      },
      {
        "source": "/quiz/:path*"
      },
      {
        "source": "/admin/:path*"
      },
      {
        "source": "/css/:path*"
      },
      {
        "source": "/js/:path*"
      },
      {
        "source": "/resources/:path*"
      },
      {
        "source": "/bundles/:path*"
      }
    ],
    "beforeFiles": [],
    "fallback": []
  },
  "sortedPages": [
    "/_app",
    "/_error"
  ]
};self.__BUILD_MANIFEST_CB && self.__BUILD_MANIFEST_CB()