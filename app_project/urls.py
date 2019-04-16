from django.urls import path, include
from django.contrib import admin
from django.conf.urls.static import static
from django.conf import settings
from django.contrib.sitemaps.views import sitemap
from django.contrib.sitemaps import views as sitemap_views
admin.autodiscover()
from .sitemap import StaticSitemap, appUserSitemap
sitemaps = {
    'static': StaticSitemap,
    'user': appUserSitemap
}

urlpatterns = [
    path('sitemap.xml', sitemap_views.index, {'sitemaps': sitemaps}),
    path('sitemap-<section>.xml', sitemap_views.sitemap, {'sitemaps': sitemaps},
         name='django.contrib.sitemaps.views.sitemap'),
    path(r'appsocket/', include('appsocket.urls')),
    path(r'api-auth/', include('rest_framework.urls')),
    path(r'admin/', admin.site.urls),
    path(r'api/', include('api.urls')),
    path(r'', include('app.urls')),
]

if settings.DEBUG:
    urlpatterns = static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)+urlpatterns
