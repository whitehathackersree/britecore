from django.contrib.sitemaps import Sitemap
from app.models import User


class StaticSitemap(Sitemap):
    """Reverse 'static' views for XML sitemap."""
    changefreq = "monthly"
    priority = 0.5

    def items(self):
        # Return list of url names for views to include in sitemap
        return ['', '/login/', '/signup/', '/help/how-it-works/', '/help/tips-and-tricks/',
            '/help/promotions/', '/help/payments/', '/help/orders-and-shipping/',
            '/help/faq/', '/coins/',
             '/company/about/', '/company/leadership/', '/company/terms-of-service/', '/company/careers/', '/company/support/',
            '/company/referral-program/', '/company/events/', '/company/press/', '/company/legal-and-security/',
         ]

    def location(self, item):
        return item

class appUserSitemap(Sitemap):
    changefreq = "always"
    priority = 0.5

    def items(self):
        return User.objects.filter().exclude(username=None)

    def lastmod(self, obj):
        return obj.date_created
