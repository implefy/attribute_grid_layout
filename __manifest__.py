{
    'name': 'Attribute Grid Layout',
    'version': '19.0.1.1.0',
    'category': 'Website/Website',
    'summary': 'Display multi-checkbox attributes in a 3-column grid with images',
    'description': """
        This module changes the layout of product attributes with multi-checkbox display type.

        Features:
        - Displays attribute values in a 3-column grid instead of a vertical list
        - Shows attribute value images alongside the checkbox
        - Responsive design that adapts to smaller screens
        - Backend grid position selector for attribute values
    """,
    'author': 'Custom',
    'website': '',
    'license': 'LGPL-3',
    'depends': [
        'website_sale',
        'product',
    ],
    'data': [
        'views/templates.xml',
        'views/product_attribute_value_views.xml',
    ],
    'assets': {
        'web.assets_frontend': [
            'attribute_grid_layout/static/src/css/attribute_grid.css',
            'attribute_grid_layout/static/src/xml/attribute_grid.xml',
        ],
        'web.assets_backend': [
            'attribute_grid_layout/static/src/js/grid_position_widget.js',
            'attribute_grid_layout/static/src/xml/grid_position_widget.xml',
            'attribute_grid_layout/static/src/css/grid_position_widget.css',
        ],
    },
    'installable': True,
    'auto_install': False,
    'application': False,
}
