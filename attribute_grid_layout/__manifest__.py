{
    'name': 'Attribute Grid Layout',
    'version': '19.0.1.2.0',
    'category': 'Website/Website',
    'summary': 'Display multi-checkbox attributes in a 3-column grid with images and defect picker',
    'description': """
        This module changes the layout of product attributes with multi-checkbox display type.

        Features:
        - Displays attribute values in a 3-column grid instead of a vertical list
        - Shows attribute value images alongside the checkbox
        - Responsive design that adapts to smaller screens
        - Backend grid position selector for attribute values
        - Defect picker for marking defect locations on products during sales quoting
    """,
    'author': 'Custom',
    'website': '',
    'license': 'LGPL-3',
    'depends': [
        'website_sale',
        'product',
        'sale_product_configurator',
    ],
    'data': [
        'security/ir.model.access.csv',
        'views/templates.xml',
        'views/product_attribute_value_views.xml',
        'views/product_template_views.xml',
        'views/sale_order_line_views.xml',
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
            'attribute_grid_layout/static/src/js/defect_picker.js',
            'attribute_grid_layout/static/src/xml/defect_picker.xml',
            'attribute_grid_layout/static/src/css/defect_picker.css',
            'attribute_grid_layout/static/src/js/defect_positions_field.js',
            'attribute_grid_layout/static/src/xml/defect_positions_field.xml',
            'attribute_grid_layout/static/src/js/product_configurator_defect.js',
            'attribute_grid_layout/static/src/xml/product_configurator_defect.xml',
        ],
    },
    'installable': True,
    'auto_install': False,
    'application': False,
}
