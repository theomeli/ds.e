import React from 'react';
import { Spacing } from '@ds.e/foundation';

const Color = ({ hexCode, width = Spacing.sm, height = Spacing.sm }) => {
    const className = `dse-width-${width} dse-height-${height}`;
    return React.createElement("div", { style: {
            backgroundColor: hexCode,
        }, className: className });
};

export { Color as default };
//# sourceMappingURL=Color.js.map
