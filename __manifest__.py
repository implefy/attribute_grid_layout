{
    'name': 'Attribute Grid Layout',
    'version': '18.0.1.0.0',
    'category': 'Website/Website',
    'summary': 'Display multi-checkbox attributes in a 3-column grid with images',
    'description': """
        This module changes the layout of product attributes with multi-checkbox display type.

        Features:
        - Displays attribute values in a 3-column grid instead of a vertical list
        - Shows attribute value images alongside the checkbox
        - Responsive design that adapts to smaller screens
    """,
    'author': 'Custom',
    'website': '',
    'license': 'LGPL-3',
    'depends': [
        'website_sale',
    ],
    'data': [
        'views/templates.xml',
    ],
    'assets': {
        'web.assets_frontend': [
            'attribute_grid_layout/static/src/css/attribute_grid.css',
            'attribute_grid_layout/static/src/xml/attribute_grid.xml',
        ],
    },
    'installable': True,
    'auto_install': False,
    'application': False,
}
