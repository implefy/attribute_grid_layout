# Attribute Grid Layout for Odoo 18

This module changes the layout of product attributes with multi-checkbox display type from a vertical list to a responsive 3-column grid, including attribute value images.

## Features

- **3-Column Grid Layout**: Displays multi-checkbox attribute values in a clean grid format
- **Attribute Value Images**: Shows product attribute value images alongside each checkbox
- **Responsive Design**: Adapts to 2 columns on tablets and mobile devices
- **Visual Feedback**: Hover and selected states with Odoo-themed styling
- **Price Extra Display**: Shows additional pricing when applicable

## Installation

1. Copy the `attribute_grid_layout` folder to your Odoo addons directory
2. Update the app list in Odoo (Settings > Apps > Update Apps List)
3. Search for "Attribute Grid Layout" and install

## Configuration

No additional configuration required. The module automatically applies to all product attributes configured with the "Multi-checkbox" display type.

## Adding Images to Attribute Values

To add images to your attribute values:

1. Go to **Website > eCommerce > Product Attributes**
2. Select an attribute and open its values
3. Upload an image for each attribute value

## Requirements

- Odoo 18.0
- `website_sale` module

## Screenshots

### Before (Default List Layout)
```
☐ Value 1
☐ Value 2
☐ Value 3
☐ Value 4
```

### After (Grid Layout with Images)
```
┌─────────┐ ┌─────────┐ ┌─────────┐
│  [img]  │ │  [img]  │ │  [img]  │
│   ☐     │ │   ☐     │ │   ☐     │
│ Value 1 │ │ Value 2 │ │ Value 3 │
└─────────┘ └─────────┘ └─────────┘
```

## License

LGPL-3
